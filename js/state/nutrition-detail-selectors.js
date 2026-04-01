import { calculateMacroGoals, summarizeNutrition } from '../domain/nutrition-domain.js';
import {
    buildNutritionDetailModel,
    buildNutritionFocusModel
} from '../domain/nutrition-presentation-domain.js';
import { cloneNutrition } from '../domain/nutrition-schema.js';
import { getFoodLogHistory } from '../repositories/food-log-repository.js';
import { createDailyViewModel, getAppState } from './app-state.js';

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

function createLoggedNutritionHistory(days = 7) {
    return getFoodLogHistory(days)
        .map((entry) => {
            const dailyTotals = summarizeNutrition(entry?.items || []);
            return mapTotalsToNutrition(dailyTotals.totals);
        })
        .filter((entry) => Object.values(entry).some((value) => Number(value) > 0));
}

export function createDailyNutritionDetailViewModel(state = getAppState()) {
    const daily = createDailyViewModel(state);
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

export function createDashboardNutritionFocusViewModel(state = getAppState(), { days = 7 } = {}) {
    const resolvedState = state || getAppState();
    const daily = createDailyViewModel(resolvedState);
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
            nutritionHistory: createLoggedNutritionHistory(days),
            proteinTarget: macroGoals.protein,
            fiberTarget: 25,
            sodiumLimit: 2300
        })
    };
}
