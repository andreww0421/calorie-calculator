import React from 'react';
import App from './App.jsx';
import { useAppState } from './hooks/useAppState.js';
import { dispatchAppAction } from '../../js/state/app-actions.js';
import { calculateProfilePlan } from '../../js/domain/profile-domain.js';
import { shiftLocalDateString } from '../../js/utils.js';
import { getLocaleTranslations } from '../../js/locales/index.js';
import { getHomeUiCopy } from '../../js/locales/home-ui-copy.js';
import { getProfileUiCopy } from '../../js/locales/profile-ui-copy.js';
import { getStandaloneUiCopy } from '../../js/locales/standalone-ui-copy.js';
import { getStatsUiCopy } from '../../js/locales/stats-ui-copy.js';
import { BRIDGE_FALLBACK, getNavItems } from './shell/constants.js';
import {
    buildMealEntries,
    createEmptyMealDraft,
    createProfileDraft,
    formatNumber
} from './shell/utils.js';
import AddView from './shell/views/AddView.jsx';
import HistoryView from './shell/views/HistoryView.jsx';
import StatsView from './shell/views/StatsView.jsx';
import ProfileView from './shell/views/ProfileView.jsx';

function getUiBridge() {
    return globalThis.window?.__woofUiBridge || BRIDGE_FALLBACK;
}

export default function StandaloneApp() {
    const state = useAppState();
    const bridge = getUiBridge();
    const [activeView, setActiveView] = React.useState('today');
    const [mealDraft, setMealDraft] = React.useState(createEmptyMealDraft);
    const [profileDraft, setProfileDraft] = React.useState(() => createProfileDraft(state.profile));
    const [feedback, setFeedback] = React.useState({ add: '', profile: '' });
    const translations = getLocaleTranslations(state.curLang);
    const homeCopy = getHomeUiCopy(state.curLang);
    const profileCopy = getProfileUiCopy(state.curLang);
    const statsCopy = getStatsUiCopy(state.curLang);
    const shellCopy = getStandaloneUiCopy(state.curLang);
    const entries = buildMealEntries(state.foodItems, shellCopy.history.untitledMeal);

    React.useEffect(() => {
        setProfileDraft(createProfileDraft(state.profile));
    }, [state.profile]);

    React.useEffect(() => {
        setFeedback({ add: '', profile: '' });
    }, [state.curLang]);

    const handleFavoriteMeal = React.useCallback((index) => {
        const entry = state.foodItems?.[Number(index)];
        if (!entry) return;
        dispatchAppAction('ADD_FAVORITE', { favorite: entry });
    }, [state.foodItems]);

    const handleDeleteMeal = React.useCallback((index) => {
        dispatchAppAction('DELETE_FOOD_ITEM', { index: Number(index) });
    }, []);

    const uiBridge = React.useMemo(() => ({
        openHomeLogModal: () => {
            setActiveView('add');
            setFeedback((current) => ({ ...current, add: '' }));
            bridge.openHomeLogModal();
        },
        openAIView: () => {
            setActiveView('add');
            bridge.openAIView();
        },
        openFavorites: () => {
            setActiveView('history');
            bridge.openFavorites();
        },
        setSelectedDate: (date) => dispatchAppAction('SET_SELECTED_DATE', { date }),
        shiftSelectedDate: (offsetDays) => {
            dispatchAppAction('SET_SELECTED_DATE', {
                date: shiftLocalDateString(state.selectedDate, offsetDays)
            });
            bridge.shiftSelectedDate(offsetDays);
        },
        addRecordToFavorites: handleFavoriteMeal,
        deleteMealRecord: handleDeleteMeal,
        openDailySummaryDetail: () => bridge.openDailySummaryDetail()
    }), [bridge, handleDeleteMeal, handleFavoriteMeal, state.selectedDate]);

    const handleAddMeal = React.useCallback(() => {
        if (!mealDraft.name.trim()) {
            setFeedback((current) => ({ ...current, add: shellCopy.feedback.mealNameRequired }));
            return;
        }

        dispatchAppAction('ADD_FOOD_ITEM', {
            entry: {
                type: mealDraft.type,
                name: mealDraft.name.trim(),
                nutri: {
                    calories: mealDraft.calories,
                    protein: mealDraft.protein,
                    carbohydrate: mealDraft.carbohydrate,
                    fat: mealDraft.fat
                }
            }
        });

        setMealDraft(createEmptyMealDraft());
        setFeedback((current) => ({ ...current, add: shellCopy.feedback.mealSaved }));
        setActiveView('history');
    }, [mealDraft, shellCopy.feedback]);

    const handleSaveProfile = React.useCallback(() => {
        const plan = calculateProfilePlan(profileDraft);
        if (!plan) {
            setFeedback((current) => ({ ...current, profile: shellCopy.feedback.profileRequired }));
            return;
        }

        dispatchAppAction('APPLY_PROFILE_PLAN', {
            profile: profileDraft,
            goalType: plan.goalType,
            targetCalories: plan.targetCalories,
            persist: true
        });

        setFeedback((current) => ({
            ...current,
            profile: shellCopy.feedback.profileSaved(formatNumber(plan.targetCalories))
        }));
    }, [profileDraft, shellCopy.feedback]);

    let content = (
        <App
            onQuickLog={() => uiBridge.openHomeLogModal()}
            onOpenAI={() => setActiveView('add')}
            onOpenFavorites={() => uiBridge.openFavorites()}
            onSetSelectedDate={(date) => uiBridge.setSelectedDate(date)}
            onShiftDate={(offsetDays) => uiBridge.shiftSelectedDate(offsetDays)}
            onFavoriteMealItem={(index) => uiBridge.addRecordToFavorites(index)}
            onDeleteMealItem={(index) => uiBridge.deleteMealRecord(index)}
            onOpenDailySummary={() => uiBridge.openDailySummaryDetail()}
        />
    );

    if (activeView === 'add') {
        content = (
            <AddView
                draft={mealDraft}
                onDraftChange={(field, value) => {
                    setMealDraft((current) => ({ ...current, [field]: value }));
                    setFeedback((current) => ({ ...current, add: '' }));
                }}
                onAddMeal={handleAddMeal}
                onJumpToLegacyAdd={() => bridge.openAIView()}
                savedMessage={feedback.add}
                copy={shellCopy.add}
            />
        );
    } else if (activeView === 'history') {
        content = (
            <HistoryView
                entries={entries}
                selectedDate={state.selectedDate}
                onDelete={handleDeleteMeal}
                onFavorite={handleFavoriteMeal}
                copy={shellCopy.history}
                translations={translations}
            />
        );
    } else if (activeView === 'stats') {
        content = (
            <StatsView
                entries={entries}
                targetCalories={state.targetCalories}
                copy={shellCopy.stats}
                statsCopy={statsCopy}
            />
        );
    } else if (activeView === 'profile') {
        content = (
            <ProfileView
                profile={state.profile || {}}
                profileDraft={profileDraft}
                onProfileDraftChange={(field, value) => {
                    setProfileDraft((current) => ({ ...current, [field]: value }));
                    setFeedback((current) => ({ ...current, profile: '' }));
                }}
                onSaveProfile={handleSaveProfile}
                targetCalories={state.targetCalories}
                goalType={state.currentGoalType}
                feedback={feedback.profile}
                copy={shellCopy.profile}
                profileCopy={profileCopy}
            />
        );
    }

    return (
        <div className="react-shell">
            <div className="react-shell__chrome">
                <div className="react-shell__brand">
                    <div className="react-shell__brand-mark">W</div>
                    <div>
                        <div className="react-shell__brand-title">{shellCopy.brandTitle}</div>
                        <div className="react-shell__brand-copy">{shellCopy.brandCopy || homeCopy.summary}</div>
                    </div>
                </div>
                <div className="react-shell__date-chip">{state.selectedDate || shellCopy.today}</div>
            </div>

            <div className="react-shell__viewport">
                {content}
            </div>

            <nav className="react-shell__nav" aria-label={shellCopy.primaryNavLabel}>
                {getNavItems(state.curLang).map((item) => (
                    <button
                        id={`nav-${item.id}`}
                        key={item.id}
                        type="button"
                        className={`react-shell__nav-item${activeView === item.id ? ' is-active' : ''}`}
                        onClick={() => setActiveView(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </div>
    );
}
