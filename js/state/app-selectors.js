import {
    getFoodCalorieHistory,
    getFoodProteinHistory
} from '../repositories/food-log-repository.js';
import { getWeightTrend } from '../repositories/weight-repository.js';
import { buildDailyCoaching, summarizeNutrition } from '../domain/nutrition-domain.js';
import { getAppState } from './app-state.js';

export function selectNutritionTotals(state = getAppState()) {
    return summarizeNutrition(state?.foodItems || []);
}

export function createDashboardChartsViewModel(state = getAppState(), { range = 7, weightDays = 30 } = {}) {
    const totals = selectNutritionTotals(state);

    return {
        totals: totals.totals,
        mealTotals: totals.mealTotals,
        weeklyCalories: getFoodCalorieHistory(7),
        calorieTrend: getFoodCalorieHistory(range),
        proteinTrend: getFoodProteinHistory(range),
        weightTrend: getWeightTrend(weightDays)
    };
}

export function createPetCoachingViewModel(state = getAppState()) {
    const totals = selectNutritionTotals(state);
    const weightKg = Math.max(0, Number(state?.profile?.weight) || 0);

    return {
        totals: totals.totals,
        coach: buildDailyCoaching({
            total: totals.totals,
            targetCalories: Number(state?.targetCalories) || 0,
            calorieHistory: getFoodCalorieHistory(7),
            goalType: state?.currentGoalType || 'lose',
            weightKg
        })
    };
}
