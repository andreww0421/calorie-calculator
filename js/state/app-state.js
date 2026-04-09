import { getFoodCalorieHistory, loadFoodLog } from '../repositories/food-log-repository.js';
import { loadFavoriteFoods } from '../repositories/favorites-repository.js';
import { loadProfileRecord } from '../repositories/profile-repository.js';
import { loadAppLanguage, loadAppTheme } from '../repositories/settings-repository.js';
import { loadDailyUsage } from '../repositories/usage-repository.js';
import { loadWeight } from '../repositories/weight-repository.js';
import { normalizeTempAIResult } from '../domain/ai-analysis-domain.js';
import { summarizeNutrition } from '../domain/nutrition-domain.js';
import { cloneNutrition } from '../domain/nutrition-schema.js';
import { DAILY_LIMIT } from '../env.js';
import { getLocalDateString } from '../utils.js';

const listeners = new Set();

function cloneItems(items = []) {
    if (!Array.isArray(items)) return [];
    return items.map((item) => ({
        name: String(item?.name || ''),
        weight: String(item?.weight || '')
    }));
}

function cloneNutri(nutri = {}) {
    return cloneNutrition(nutri);
}

function cloneFoodEntries(entries = []) {
    if (!Array.isArray(entries)) return [];
    return entries.map((entry) => ({
        type: String(entry?.type || 'snack'),
        name: String(entry?.name || ''),
        nutri: cloneNutri(entry),
        items: cloneItems(entry?.items),
        healthScore: Number(entry?.healthScore) || 0
    }));
}

function cloneAiResult(result) {
    return normalizeTempAIResult(result);
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
        goalType: String(profile.goalType || 'lose'),
        region: String(profile.region || '').trim(),
        diningOutFrequency: String(profile.diningOutFrequency || 'sometimes').trim() || 'sometimes'
    };
}

function createDefaultAnalysisFlow(quotaExceeded = false) {
    return {
        status: 'idle',
        source: 'none',
        cooldownRemaining: 0,
        quotaExceeded: Boolean(quotaExceeded),
        isSoftError: false,
        lastError: '',
        verificationUnavailable: false,
        verificationMessage: ''
    };
}

function cloneAnalysisFlow(flow = {}, fallbackQuotaExceeded = false) {
    const base = createDefaultAnalysisFlow(fallbackQuotaExceeded);
    return {
        status: String(flow?.status || base.status),
        source: String(flow?.source || base.source),
        cooldownRemaining: Math.max(0, Number(flow?.cooldownRemaining) || 0),
        quotaExceeded: flow?.quotaExceeded !== undefined ? Boolean(flow.quotaExceeded) : base.quotaExceeded,
        isSoftError: Boolean(flow?.isSoftError),
        lastError: String(flow?.lastError || ''),
        verificationUnavailable: Boolean(flow?.verificationUnavailable),
        verificationMessage: String(flow?.verificationMessage || '')
    };
}

function normalizeNumber(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function buildInitialSource(overrides = {}) {
    const selectedDate = String(overrides.selectedDate || getLocalDateString());
    const profile = cloneProfile(overrides.profile !== undefined ? overrides.profile : loadProfileRecord());
    const currentMealMode = String(overrides.currentMealMode || profile?.mealMode || '4');
    const currentGoalType = String(overrides.currentGoalType || profile?.goalType || 'lose');
    const usage = loadDailyUsage();
    const quotaExceeded = usage.count >= DAILY_LIMIT;

    return {
        selectedDate,
        curLang: String(overrides.curLang || loadAppLanguage()),
        curTheme: String(overrides.curTheme || loadAppTheme()),
        targetCalories: normalizeNumber(overrides.targetCalories, 2000),
        currentMealMode,
        currentGoalType,
        loggedWeight: overrides.loggedWeight ?? loadWeight(selectedDate),
        foodItems: cloneFoodEntries(overrides.foodItems !== undefined ? overrides.foodItems : loadFoodLog(selectedDate)),
        favoriteFoods: cloneFoodEntries(overrides.favoriteFoods !== undefined ? overrides.favoriteFoods : loadFavoriteFoods()),
        tempAIResult: cloneAiResult(overrides.tempAIResult),
        tempAIResultSaved: Boolean(overrides.tempAIResultSaved),
        analysisFlow: cloneAnalysisFlow(overrides.analysisFlow, quotaExceeded),
        profile
    };
}

function normalizeStateSource(source) {
    const selectedDate = String(source?.selectedDate || getLocalDateString());
    const profile = cloneProfile(source?.profile) || cloneProfile(loadProfileRecord());
    const currentMealMode = String(source?.currentMealMode || profile?.mealMode || '4');
    const currentGoalType = String(source?.currentGoalType || profile?.goalType || 'lose');
    const usage = loadDailyUsage();
    const quotaExceeded = usage.count >= DAILY_LIMIT;

    return {
        selectedDate,
        curLang: String(source?.curLang || 'zh-TW'),
        curTheme: String(source?.curTheme || 'light'),
        targetCalories: normalizeNumber(source?.targetCalories, 2000),
        currentMealMode,
        currentGoalType,
        loggedWeight: source?.loggedWeight ?? loadWeight(selectedDate),
        foodItems: cloneFoodEntries(source?.foodItems),
        favoriteFoods: cloneFoodEntries(source?.favoriteFoods),
        tempAIResult: cloneAiResult(source?.tempAIResult),
        tempAIResultSaved: Boolean(source?.tempAIResultSaved),
        analysisFlow: cloneAnalysisFlow(source?.analysisFlow, quotaExceeded),
        profile
    };
}

function buildSnapshot(source) {
    return Object.freeze({
        ...source,
        foodItems: cloneFoodEntries(source.foodItems),
        favoriteFoods: cloneFoodEntries(source.favoriteFoods),
        tempAIResult: cloneAiResult(source.tempAIResult),
        profile: cloneProfile(source.profile),
        analysisFlow: cloneAnalysisFlow(source.analysisFlow),
        updatedAt: Date.now()
    });
}

let appStateSource = buildInitialSource();
let appState = buildSnapshot(appStateSource);

function emitState(previousState, meta = {}) {
    listeners.forEach((listener) => listener(appState, previousState, meta));
}

export function initializeAppState(overrides = {}, meta = {}) {
    const previousState = appState;
    appStateSource = buildInitialSource(overrides);
    appState = buildSnapshot(appStateSource);
    emitState(previousState, meta);
    return appState;
}

export function refreshAppState(overrides = {}, meta = {}) {
    const previousState = appState;
    const nextSource = {
        ...appStateSource,
        ...overrides
    };

    if (overrides.selectedDate !== undefined) {
        const selectedDate = String(overrides.selectedDate || getLocalDateString());
        nextSource.selectedDate = selectedDate;
        if (overrides.foodItems === undefined) {
            nextSource.foodItems = loadFoodLog(selectedDate);
        }
        if (overrides.loggedWeight === undefined) {
            nextSource.loggedWeight = loadWeight(selectedDate);
        }
    }

    appStateSource = normalizeStateSource(nextSource);
    appState = buildSnapshot(appStateSource);
    emitState(previousState, meta);
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
        calorieHistory: getFoodCalorieHistory(7, resolvedState.selectedDate),
        foodItems: resolvedState.foodItems,
        totals: totals.totals,
        mealTotals: totals.mealTotals
    };
}
