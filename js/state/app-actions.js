import {
    loadFoodLog,
    saveFoodLog
} from '../repositories/food-log-repository.js';
import { saveFavoriteFoods } from '../repositories/favorites-repository.js';
import { saveProfileRecord } from '../repositories/profile-repository.js';
import { saveAppLanguage, saveAppTheme } from '../repositories/settings-repository.js';
import { getAppState, refreshAppState } from './app-state.js';

function cloneEntry(entry = {}) {
    return {
        type: String(entry.type || 'snack'),
        name: String(entry.name || ''),
        nutri: {
            calories: Number(entry?.nutri?.calories) || 0,
            protein: Number(entry?.nutri?.protein) || 0,
            fat: Number(entry?.nutri?.fat) || 0,
            carbohydrate: Number(entry?.nutri?.carbohydrate) || 0,
            sugar: Number(entry?.nutri?.sugar) || 0,
            sodium: Number(entry?.nutri?.sodium) || 0,
            saturatedFat: Number(entry?.nutri?.saturatedFat) || 0,
            transFat: Number(entry?.nutri?.transFat) || 0,
            fiber: Number(entry?.nutri?.fiber) || 0
        },
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
        goalType: String(profile.goalType || 'lose')
    };
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
        const date = String(payload.date || '');
        if (!date) {
            return refreshAppState({}, { reason: 'date:noop' });
        }

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
        return refreshAppState({
            foodItems: nextItems
        }, {
            reason: 'food:add',
            entryName: entry.name
        });
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
        const entry = cloneEntry(payload.result || {});
        const result = payload.result
            ? {
                name: entry.name,
                nutri: entry.nutri,
                items: entry.items,
                healthScore: entry.healthScore
            }
            : null;

        return refreshAppState({
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
    }

    case 'SET_TEMP_AI_ITEMS': {
        if (!state.tempAIResult) {
            return refreshAppState({}, { reason: 'ai-result:noop' });
        }

        const nextResult = {
            ...state.tempAIResult,
            items: Array.isArray(payload.items)
                ? payload.items.map((item) => ({
                    name: String(item?.name || ''),
                    weight: String(item?.weight || '')
                }))
                : []
        };

        return refreshAppState({
            tempAIResult: nextResult,
            tempAIResultSaved: Boolean(payload.saved),
            analysisFlow: {
                ...state.analysisFlow,
                status: payload.syncModal === false ? state.analysisFlow.status : 'editing',
                lastError: '',
                isSoftError: false
            }
        }, {
            reason: 'ai-result:update-items',
            syncModal: payload.syncModal !== false
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
        if (payload.persist !== false) {
            saveProfileRecord(profile);
        }

        return refreshAppState({
            profile,
            targetCalories: Number(payload.targetCalories) || 0,
            currentMealMode: profile.mealMode || payload.mealMode || '4',
            currentGoalType: String(payload.goalType || profile.goalType || 'lose')
        }, {
            reason: 'profile:apply'
        });
    }

    default:
        return refreshAppState({}, { reason: 'state:sync' });
    }
}
