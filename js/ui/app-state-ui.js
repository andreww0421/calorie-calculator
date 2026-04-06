import { calculateProfilePlan } from '../domain/profile-domain.js';
import { getLocaleTranslations } from '../locales/index.js';
import { createDailyViewModel } from '../state/app-state.js';
import { renderListAndStats } from './charts-ui.js';
import { openFavModal } from './favorites-ui.js';
import { renderManualFoodPresetPanel } from './food-preset-ui.js';
import { getDisplayDateLabel, getGoalUiText } from './locale-ui.js';
import {
    renderOnboardingCard,
    renderProfileGoalResult,
    syncProfilePreferenceInputs
} from './profile-ui.js';
import { setLang, setTheme, updateMealUI } from './settings-ui.js';
import { closeModal } from './shared-ui.js';
import { renderAnalysisModalState, syncAnalysisView } from './analysis-ui.js';

function setInputValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value;
    }
}

function setTextById(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.innerText = value;
    }
}

function applyDateInputs(state) {
    setInputValue('current-date', state.selectedDate);
    setTextById('display-date-text', getDisplayDateLabel(state.selectedDate, state.curLang));
    setInputValue('daily-weight-input', state.loggedWeight ?? '');
}

function syncProfileGoalPresentation(state) {
    const goalResult = document.getElementById('goal-result');
    const plan = calculateProfilePlan(state.profile || {});

    if (!plan) {
        if (goalResult) {
            goalResult.style.display = 'none';
        }
        setTextById('target-cal-display', '--');
        return false;
    }

    renderProfileGoalResult(
        plan,
        getLocaleTranslations(state.curLang),
        getGoalUiText(state.curLang)
    );
    return true;
}

function syncProfilePreferencePresentation(state) {
    syncProfilePreferenceInputs(state.curLang, state.profile || {});
    renderOnboardingCard(state.profile || {}, state.curLang);
}

function syncFavoriteModal(state, reason) {
    if ((reason === 'favorite:add' || reason === 'favorite:delete')
        && document.getElementById('fav-modal')?.style.display === 'flex'
        && Array.isArray(state.favoriteFoods)) {
        openFavModal();
    }
}

function syncAnalysisModal(state, meta = {}) {
    const modal = document.getElementById('analysis-modal');
    if (!modal) return;

    if (!state.tempAIResult) {
        if (modal.style.display === 'flex') {
            closeModal('analysis-modal');
        }
        return;
    }

    if (String(meta.reason || '').startsWith('ai-result:') && meta.syncModal === false) {
        return;
    }

    if (meta.openModal || modal.style.display === 'flex') {
        renderAnalysisModalState(state, meta);
    }
}

export function syncAppStateUI(state, previousState, meta = {}) {
    const reason = meta.reason || 'state:sync';
    const isBootstrapSync = reason.startsWith('bootstrap:');
    const themeChanged = isBootstrapSync || !previousState || state.curTheme !== previousState.curTheme || reason === 'theme:set';
    const langChanged = isBootstrapSync || !previousState || state.curLang !== previousState.curLang || reason === 'lang:set';
    const shouldSyncProfile = isBootstrapSync || !previousState || reason === 'profile:apply' || reason === 'state:sync' || langChanged;
    const shouldSyncMealPlan = isBootstrapSync
        || !previousState
        || state.currentMealMode !== previousState.currentMealMode
        || state.targetCalories !== previousState.targetCalories
        || reason === 'profile:apply'
        || langChanged;
    const shouldSyncDaily = isBootstrapSync
        || !previousState
        || state.selectedDate !== previousState.selectedDate
        || state.loggedWeight !== previousState.loggedWeight
        || state.targetCalories !== previousState.targetCalories
        || reason === 'profile:apply'
        || reason === 'food:add'
        || reason === 'food:delete'
        || reason === 'date:set'
        || reason === 'weight:save'
        || langChanged
        || reason === 'state:sync';

    if (themeChanged) {
        setTheme(state.curTheme, { persist: false });
    }

    if (shouldSyncProfile) {
        syncProfilePreferencePresentation(state);
    }

    if (langChanged) {
        setLang(state.curLang);
    }

    syncAnalysisView(state);

    if (shouldSyncMealPlan) {
        updateMealUI();
        if (reason === 'profile:apply') {
            renderManualFoodPresetPanel({
                surface: 'modal',
                actionMode: 'quick-add',
                showRegionSelect: false,
                showRegionMeta: false,
                showSecondaryAction: true,
                selection: {
                    region: state.profile?.region || '',
                    presetId: '',
                    modifiers: {}
                }
            });
        }
        syncProfileGoalPresentation(state);
    }

    if (shouldSyncDaily) {
        applyDateInputs(state);
        renderListAndStats(createDailyViewModel(state));
    }

    syncFavoriteModal(state, reason);
    syncAnalysisModal(state, meta);
}
