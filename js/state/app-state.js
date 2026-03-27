import {
    curLang,
    curTheme,
    currentGoalType,
    currentMealMode,
    favoriteFoods,
    foodItems,
    getCalorieHistory,
    loadWeightData,
    loadProfile,
    selectedDate,
    tempAIResult,
    tempAIResultSaved,
    targetCalories
} from '../data.js';
import { summarizeNutrition } from '../domain/nutrition-domain.js';

const listeners = new Set();

function cloneItems(items = []) {
    if (!Array.isArray(items)) return [];
    return items.map((item) => ({
        name: String(item?.name || ''),
        weight: String(item?.weight || '')
    }));
}

function cloneNutri(nutri = {}) {
    return {
        calories: Number(nutri?.calories) || 0,
        protein: Number(nutri?.protein) || 0,
        fat: Number(nutri?.fat) || 0,
        carbohydrate: Number(nutri?.carbohydrate) || 0,
        sugar: Number(nutri?.sugar) || 0,
        sodium: Number(nutri?.sodium) || 0,
        saturatedFat: Number(nutri?.saturatedFat) || 0,
        transFat: Number(nutri?.transFat) || 0,
        fiber: Number(nutri?.fiber) || 0
    };
}

function cloneFoodEntries(entries = []) {
    if (!Array.isArray(entries)) return [];
    return entries.map((entry) => ({
        type: String(entry?.type || 'snack'),
        name: String(entry?.name || ''),
        nutri: cloneNutri(entry?.nutri),
        items: cloneItems(entry?.items),
        healthScore: Number(entry?.healthScore) || 0
    }));
}

function cloneAiResult(result) {
    if (!result || typeof result !== 'object') return null;
    return {
        name: String(result.name || ''),
        nutri: cloneNutri(result.nutri),
        items: cloneItems(result.items),
        healthScore: Number(result.healthScore) || 0
    };
}

function cloneProfile(profile) {
    if (!profile || typeof profile !== 'object') return null;
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

function buildAppState(overrides = {}) {
    const profile = overrides.profile !== undefined
        ? cloneProfile(overrides.profile)
        : cloneProfile(loadProfile());

    return Object.freeze({
        selectedDate: selectedDate || '',
        curLang: curLang || 'zh-TW',
        curTheme: curTheme || 'light',
        targetCalories: Number(targetCalories) || 0,
        currentMealMode: currentMealMode || profile?.mealMode || '4',
        currentGoalType: currentGoalType || profile?.goalType || 'lose',
        loggedWeight: loadWeightData(selectedDate),
        foodItems: cloneFoodEntries(foodItems),
        favoriteFoods: cloneFoodEntries(favoriteFoods),
        tempAIResult: cloneAiResult(tempAIResult),
        tempAIResultSaved: Boolean(tempAIResultSaved),
        profile,
        updatedAt: Date.now()
    });
}

let appState = buildAppState();

export function initializeAppState(overrides = {}, meta = {}) {
    appState = buildAppState(overrides);
    listeners.forEach((listener) => listener(appState, null, meta));
    return appState;
}

export function refreshAppState(overrides = {}, meta = {}) {
    const previousState = appState;
    appState = buildAppState(overrides);
    listeners.forEach((listener) => listener(appState, previousState, meta));
    return appState;
}

export function getAppState() {
    return appState;
}

export function subscribeAppState(listener) {
    if (typeof listener !== 'function') {
        return () => {};
    }

    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function createDailyViewModel(state = appState) {
    const resolvedState = state || appState;
    const totals = summarizeNutrition(resolvedState.foodItems);
    const profileWeight = Math.max(0, Number(resolvedState.profile?.weight) || 0);

    return {
        selectedDate: resolvedState.selectedDate,
        lang: resolvedState.curLang,
        goalType: resolvedState.currentGoalType,
        targetCalories: Number(resolvedState.targetCalories) || 0,
        profileWeight,
        waterTarget: Math.round((profileWeight || 60) * 35),
        calorieHistory: getCalorieHistory(7),
        foodItems: resolvedState.foodItems,
        totals: totals.totals,
        mealTotals: totals.mealTotals
    };
}
