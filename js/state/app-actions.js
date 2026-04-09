import {
    loadFoodLog,
    saveFoodLog
} from '../repositories/food-log-repository.js';
import { saveFavoriteFoods } from '../repositories/favorites-repository.js';
import { saveProfileRecord } from '../repositories/profile-repository.js';
import { saveAppLanguage, saveAppTheme } from '../repositories/settings-repository.js';
import { getAppState, refreshAppState } from './app-state.js';
import { cloneNutrition } from '../domain/nutrition-schema.js';
import { createOnboardingConfig } from '../domain/profile-domain.js';
import { clampDateString } from '../utils.js';
import {
    appendAICorrectionHistory,
    createAICorrectionEntry,
    normalizeAIDraftItem,
    normalizeTempAIResult
} from '../domain/ai-analysis-domain.js';
import {
    trackAiResultCorrected,
    trackFirstLogCompleted,
    trackOnboardingCompleted
} from '../analytics/product-events.js';

function cloneEntry(entry = {}) {
    return {
        type: String(entry.type || 'snack'),
        name: String(entry.name || ''),
        nutri: cloneNutrition(entry),
        items: Array.isArray(entry.items)
            ? entry.items.map((item) => ({
                name: String(item?.name || ''),
                weight: String(item?.weight || '')
            }))
            : [],
        healthScore: Number(entry.healthScore) || 0
    };
}

function cloneFavorite(favorite = {}) {
    const entry = cloneEntry({
        ...favorite,
        type: 'favorite'
    });

    return {
        name: entry.name,
        nutri: entry.nutri,
        items: entry.items,
        healthScore: entry.healthScore
    };
}

function cloneProfile(profile = {}) {
    return {
        gender: String(profile.gender || 'male'),
        age: String(profile.age ?? ''),
        height: String(profile.height ?? ''),
        weight: String(profile.weight ?? ''),
        activity: String(profile.activity || '1.2'),
        mealMode: String(profile.mealMode || '4'),
        goalType: String(profile.goalType || 'lose'),
        region: String(profile.region || '').trim(),
        diningOutFrequency: String(profile.diningOutFrequency || 'sometimes').trim() || 'sometimes'
    };
}

function buildTempAiCorrectionState(state, {
    result = state.tempAIResult,
    saved = state.tempAIResultSaved,
    syncModal = true,
    reason = 'ai-result:update',
    status = 'editing',
    historyEntry = null,
    preserveHistory = true,
    preferredName = ''
} = {}) {
    const baseHistory = preserveHistory ? state.tempAIResult?.correctionHistory || [] : [];
    const correctionHistory = appendAICorrectionHistory(baseHistory, historyEntry);
    const nextResult = normalizeTempAIResult(result, {
        correctionHistory,
        preferredName
    });

    return refreshAppState({
        tempAIResult: nextResult,
        tempAIResultSaved: Boolean(saved),
        analysisFlow: {
            ...state.analysisFlow,
            status,
            lastError: '',
            isSoftError: false
        }
    }, {
        reason,
        syncModal
    });
}

export function dispatchAppAction(type, payload = {}) {
    const state = getAppState();

    switch (type) {
    case 'SET_LANGUAGE': {
        const lang = String(payload.lang || state.curLang || 'zh-TW');
        saveAppLanguage(lang);
        return refreshAppState({
            curLang: lang
        }, {
            reason: 'lang:set',
            lang
        });
    }

    case 'SET_THEME': {
        const theme = String(payload.theme || state.curTheme || 'light');
        saveAppTheme(theme);
        return refreshAppState({
            curTheme: theme
        }, {
            reason: 'theme:set',
            theme
        });
    }

    case 'SET_SELECTED_DATE': {
        const requestedDate = String(payload.date || '').trim();
        if (!requestedDate) {
            return refreshAppState({}, { reason: 'date:noop' });
        }
        const date = clampDateString(requestedDate);

        return refreshAppState({
            selectedDate: date,
            foodItems: loadFoodLog(date)
        }, {
            reason: 'date:set',
            date
        });
    }

    case 'ADD_FOOD_ITEM': {
        const entry = cloneEntry(payload.entry);
        const nextItems = [...state.foodItems, entry];
        saveFoodLog(state.selectedDate, nextItems);
        const nextState = refreshAppState({
            foodItems: nextItems
        }, {
            reason: 'food:add',
            entryName: entry.name
        });
        trackFirstLogCompleted(entry, {
            source: payload.source || 'manual',
            selectedDate: state.selectedDate
        });
        return nextState;
    }

    case 'DELETE_FOOD_ITEM': {
        const index = Number(payload.index);
        if (!Number.isInteger(index) || index < 0 || index >= state.foodItems.length) {
            return refreshAppState({}, { reason: 'food:noop' });
        }

        const nextItems = state.foodItems.filter((_, itemIndex) => itemIndex !== index);
        saveFoodLog(state.selectedDate, nextItems);
        return refreshAppState({
            foodItems: nextItems
        }, {
            reason: 'food:delete',
            index
        });
    }

    case 'ADD_FAVORITE': {
        const favorite = cloneFavorite(payload.favorite);
        const nextFavorites = [...state.favoriteFoods, favorite];
        saveFavoriteFoods(nextFavorites);
        return refreshAppState({
            favoriteFoods: nextFavorites
        }, {
            reason: 'favorite:add',
            favoriteName: favorite.name
        });
    }

    case 'DELETE_FAVORITE': {
        const index = Number(payload.index);
        if (!Number.isInteger(index) || index < 0 || index >= state.favoriteFoods.length) {
            return refreshAppState({}, { reason: 'favorite:noop' });
        }

        const nextFavorites = state.favoriteFoods.filter((_, favoriteIndex) => favoriteIndex !== index);
        saveFavoriteFoods(nextFavorites);
        return refreshAppState({
            favoriteFoods: nextFavorites
        }, {
            reason: 'favorite:delete',
            index
        });
    }

    case 'SET_TEMP_AI_RESULT': {
        const result = payload.result
            ? normalizeTempAIResult(payload.result, {
                correctionHistory: appendAICorrectionHistory(
                    payload.preserveHistory ? state.tempAIResult?.correctionHistory || [] : [],
                    payload.historyEntry || null
                ),
                preferredName: payload.preferredName || ''
            })
            : null;

        const nextState = refreshAppState({
            tempAIResult: result,
            tempAIResultSaved: payload.saved !== undefined ? Boolean(payload.saved) : state.tempAIResultSaved,
            analysisFlow: {
                ...state.analysisFlow,
                status: 'result',
                isSoftError: false,
                lastError: ''
            }
        }, {
            reason: 'ai-result:set',
            openModal: Boolean(payload.openModal)
        });
        if (payload.historyEntry?.type === 'recalculate' && result) {
            trackAiResultCorrected({
                itemCount: result.items?.length || 0,
                correctionCount: result.correctionHistory?.length || 0,
                selectedDate: state.selectedDate,
                source: 'items'
            });
        }
        return nextState;
    }

    case 'SET_TEMP_AI_ITEMS': {
        if (!state.tempAIResult) {
            return refreshAppState({}, { reason: 'ai-result:noop' });
        }

        const nextItems = Array.isArray(payload.items)
            ? payload.items.map(normalizeAIDraftItem)
            : [];

        return buildTempAiCorrectionState(state, {
            result: {
                ...state.tempAIResult,
                items: nextItems
            },
            saved: payload.saved,
            syncModal: payload.syncModal !== false,
            reason: 'ai-result:update-items',
            historyEntry: payload.historyEntry || null,
            preserveHistory: true
        });
    }

    case 'UPDATE_TEMP_AI_ITEM': {
        if (!state.tempAIResult) {
            return refreshAppState({}, { reason: 'ai-result:noop' });
        }

        const index = Number(payload.index);
        if (!Number.isInteger(index) || index < 0 || index >= state.tempAIResult.items.length) {
            return refreshAppState({}, { reason: 'ai-result:noop' });
        }

        const currentItem = state.tempAIResult.items[index] || { name: '', weight: '' };
        const nextItem = normalizeAIDraftItem({
            ...currentItem,
            ...(payload.patch || {})
        });

        const previousValue = payload.field ? currentItem?.[payload.field] ?? '' : '';
        const nextValue = payload.field ? nextItem?.[payload.field] ?? '' : '';
        const nextItems = state.tempAIResult.items.map((item, itemIndex) => (itemIndex === index ? nextItem : item));

        return buildTempAiCorrectionState(state, {
            result: {
                ...state.tempAIResult,
                items: nextItems
            },
            saved: payload.saved,
            syncModal: payload.syncModal !== false,
            reason: 'ai-result:update-item',
            historyEntry: payload.trackHistory && previousValue !== nextValue
                ? createAICorrectionEntry('item:update', {
                    itemIndex: index,
                    field: payload.field || '',
                    previousValue,
                    nextValue
                })
                : null,
            preserveHistory: true
        });
    }

    case 'MARK_TEMP_AI_SAVED':
        return refreshAppState({
            tempAIResultSaved: Boolean(payload.saved),
            analysisFlow: {
                ...state.analysisFlow,
                status: 'saved'
            }
        }, {
            reason: 'ai-result:saved'
        });

    case 'CLEAR_TEMP_AI_RESULT':
        return refreshAppState({
            tempAIResult: null,
            tempAIResultSaved: false
        }, {
            reason: 'ai-result:clear'
        });

    case 'SET_ANALYSIS_FLOW': {
        const nextFlow = {
            ...state.analysisFlow,
            ...(payload.flow || payload)
        };
        return refreshAppState({
            analysisFlow: nextFlow
        }, {
            reason: payload.reason || 'analysis:state'
        });
    }

    case 'APPLY_PROFILE_PLAN': {
        const profile = cloneProfile(payload.profile);
        const wasComplete = createOnboardingConfig(state.profile || {}, state.curLang).isComplete;
        const nextOnboarding = createOnboardingConfig(profile, state.curLang);
        if (payload.persist !== false) {
            saveProfileRecord(profile);
        }

        const nextState = refreshAppState({
            profile,
            targetCalories: Number(payload.targetCalories) || 0,
            currentMealMode: profile.mealMode || payload.mealMode || '4',
            currentGoalType: String(payload.goalType || profile.goalType || 'lose')
        }, {
            reason: 'profile:apply'
        });
        if (!wasComplete && nextOnboarding.isComplete) {
            trackOnboardingCompleted(profile);
        }
        return nextState;
    }

    default:
        return refreshAppState({}, { reason: 'state:sync' });
    }
}
