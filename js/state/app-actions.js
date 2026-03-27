import {
    curLang,
    curTheme,
    favoriteFoods,
    foodItems,
    loadFoodData,
    persistLang,
    persistFavorites,
    persistTheme,
    saveProfile,
    saveFoodData,
    setCurLang,
    setCurTheme,
    setCurrentGoalType,
    setCurrentMealMode,
    setFoodItems,
    setFavoriteFoods,
    setSelectedDate,
    setTargetCalories,
    setTempAIResult,
    setTempAIResultSaved,
    tempAIResult
} from '../data.js';
import { refreshAppState } from './app-state.js';

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
    switch (type) {
    case 'SET_LANGUAGE': {
        const lang = String(payload.lang || curLang || 'zh-TW');
        setCurLang(lang);
        persistLang(lang);
        return refreshAppState({}, {
            reason: 'lang:set',
            lang
        });
    }

    case 'SET_THEME': {
        const theme = String(payload.theme || curTheme || 'light');
        setCurTheme(theme);
        persistTheme(theme);
        return refreshAppState({}, {
            reason: 'theme:set',
            theme
        });
    }

    case 'SET_SELECTED_DATE': {
        const date = String(payload.date || '');
        if (!date) {
            return refreshAppState({}, { reason: 'date:noop' });
        }
        setSelectedDate(date);
        loadFoodData(date);
        return refreshAppState({}, {
            reason: 'date:set',
            date
        });
    }

    case 'ADD_FOOD_ITEM': {
        const entry = cloneEntry(payload.entry);
        const nextItems = [...foodItems, entry];
        setFoodItems(nextItems);
        saveFoodData();
        return refreshAppState({}, {
            reason: 'food:add',
            entryName: entry.name
        });
    }

    case 'DELETE_FOOD_ITEM': {
        const index = Number(payload.index);
        if (!Number.isInteger(index) || index < 0 || index >= foodItems.length) {
            return refreshAppState({}, { reason: 'food:noop' });
        }
        const nextItems = foodItems.filter((_, itemIndex) => itemIndex !== index);
        setFoodItems(nextItems);
        saveFoodData();
        return refreshAppState({}, {
            reason: 'food:delete',
            index
        });
    }

    case 'ADD_FAVORITE': {
        const favorite = cloneFavorite(payload.favorite);
        const nextFavorites = [...favoriteFoods, favorite];
        setFavoriteFoods(nextFavorites);
        persistFavorites();
        return refreshAppState({}, {
            reason: 'favorite:add',
            favoriteName: favorite.name
        });
    }

    case 'DELETE_FAVORITE': {
        const index = Number(payload.index);
        if (!Number.isInteger(index) || index < 0 || index >= favoriteFoods.length) {
            return refreshAppState({}, { reason: 'favorite:noop' });
        }

        const nextFavorites = favoriteFoods.filter((_, favoriteIndex) => favoriteIndex !== index);
        setFavoriteFoods(nextFavorites);
        persistFavorites();
        return refreshAppState({}, {
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
        setTempAIResult(result);
        if (payload.saved !== undefined) {
            setTempAIResultSaved(Boolean(payload.saved));
        }
        return refreshAppState({}, {
            reason: 'ai-result:set',
            openModal: Boolean(payload.openModal)
        });
    }

    case 'SET_TEMP_AI_ITEMS': {
        if (!tempAIResult) {
            return refreshAppState({}, { reason: 'ai-result:noop' });
        }
        const nextResult = {
            ...tempAIResult,
            items: Array.isArray(payload.items)
                ? payload.items.map((item) => ({
                    name: String(item?.name || ''),
                    weight: String(item?.weight || '')
                }))
                : []
        };
        setTempAIResult(nextResult);
        setTempAIResultSaved(Boolean(payload.saved));
        return refreshAppState({}, {
            reason: 'ai-result:update-items',
            syncModal: payload.syncModal !== false
        });
    }

    case 'MARK_TEMP_AI_SAVED': {
        setTempAIResultSaved(Boolean(payload.saved));
        return refreshAppState({}, {
            reason: 'ai-result:saved'
        });
    }

    case 'CLEAR_TEMP_AI_RESULT': {
        setTempAIResult(null);
        setTempAIResultSaved(false);
        return refreshAppState({}, {
            reason: 'ai-result:clear'
        });
    }

    case 'APPLY_PROFILE_PLAN': {
        const profile = cloneProfile(payload.profile);
        setTargetCalories(Number(payload.targetCalories) || 0);
        setCurrentMealMode(profile.mealMode || payload.mealMode || '4');
        setCurrentGoalType(String(payload.goalType || profile.goalType || 'lose'));
        if (payload.persist !== false) {
            saveProfile(profile);
        }
        return refreshAppState({ profile }, {
            reason: 'profile:apply'
        });
    }

    default:
        return refreshAppState({}, { reason: 'state:sync' });
    }
}
