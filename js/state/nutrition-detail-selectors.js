import { calculateMacroGoals, summarizeNutrition } from '../domain/nutrition-domain.js';
import {
    buildNutritionDetailModel,
    buildNutritionFocusModel
} from '../domain/nutrition-presentation-domain.js';
import { cloneNutrition } from '../domain/nutrition-schema.js';
import { getFoodLogHistory } from '../repositories/food-log-repository.js';

const EMPTY_NUTRITION_STATE = Object.freeze({
    selectedDate: '',
    targetCalories: 0,
    currentGoalType: 'lose',
    foodItems: Object.freeze([]),
    profile: null
});

function roundValue(value, digits = 1) {
    const factor = 10 ** digits;
    return Math.round((Number(value) || 0) * factor) / factor;
}

function mapTotalsToNutrition(totals = {}) {
    return cloneNutrition({
        calories: Math.round(Number(totals.cal) || 0),
        protein: roundValue(totals.pro),
        fat: roundValue(totals.fat),
        carbohydrate: roundValue(totals.carb),
        sugar: roundValue(totals.sugar),
        sodium: Math.round(Number(totals.sod) || 0),
        saturatedFat: roundValue(totals.sat),
        transFat: roundValue(totals.trans),
        fiber: roundValue(totals.fiber)
    });
}

function createLoggedNutritionHistory(days = 7, baseDate) {
    return getFoodLogHistory(days, baseDate)
        .map((entry) => {
            const dailyTotals = summarizeNutrition(entry?.items || []);
            return mapTotalsToNutrition(dailyTotals.totals);
        })
        .filter((entry) => Object.values(entry).some((value) => Number(value) > 0));
}

function resolveNutritionState(state) {
    return state && typeof state === 'object' ? state : EMPTY_NUTRITION_STATE;
}

function createDailyNutritionSummary(state = EMPTY_NUTRITION_STATE) {
    const resolvedState = resolveNutritionState(state);
    const totals = summarizeNutrition(resolvedState.foodItems);
    const profileWeight = Math.max(0, Number(resolvedState.profile?.weight) || 0);

    return {
        selectedDate: resolvedState.selectedDate,
        targetCalories: Number(resolvedState.targetCalories) || 0,
        waterTarget: Math.round((profileWeight || 60) * 35),
        totals: totals.totals
    };
}

export function createDailyNutritionDetailViewModel(state = EMPTY_NUTRITION_STATE) {
    const daily = createDailyNutritionSummary(state);
    const nutrition = mapTotalsToNutrition(daily.totals);
    const target = Number(daily.targetCalories) || 0;

    return {
        nutrition,
        detail: buildNutritionDetailModel(nutrition),
        targetCalories: target,
        remainingCalories: target > 0 ? Math.round(target - nutrition.calories) : 0,
        waterTarget: Number(daily.waterTarget) || 0
    };
}

export function createDashboardNutritionFocusViewModel(state = EMPTY_NUTRITION_STATE, { days = 7 } = {}) {
    const resolvedState = resolveNutritionState(state);
    const daily = createDailyNutritionSummary(resolvedState);
    const nutrition = mapTotalsToNutrition(daily.totals);
    const weightKg = Math.max(0, Number(resolvedState?.profile?.weight) || 0);
    const macroGoals = calculateMacroGoals(daily.targetCalories, {
        weightKg,
        goalType: resolvedState?.currentGoalType || resolvedState?.profile?.goalType || 'lose'
    });

    return {
        days,
        nutrition,
        ...buildNutritionFocusModel({
            todayNutrition: nutrition,
            nutritionHistory: createLoggedNutritionHistory(days, resolvedState.selectedDate),
            proteinTarget: macroGoals.protein,
            fiberTarget: 25,
            sodiumLimit: 2300
        })
    };
}
