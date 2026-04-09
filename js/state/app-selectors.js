import {
    getFoodCalorieHistory,
    getFoodProteinHistory
} from '../repositories/food-log-repository.js';
import { getWeightTrend } from '../repositories/weight-repository.js';
import { calculateMacroGoals, getMealPlan, summarizeNutrition } from '../domain/nutrition-domain.js';
import { createDailyViewModel, getAppState } from './app-state.js';
import { createMealRhythmViewModel } from './meal-rhythm-selectors.js';
import { createFoodPresetPickerViewModel } from './food-preset-selectors.js';
import { createPetViewModel } from './pet-selectors.js';
import { createDashboardNutritionFocusViewModel } from './nutrition-detail-selectors.js';

export { createPetCoachingViewModel, createPetViewModel } from './pet-selectors.js';
export { createMealRhythmViewModel } from './meal-rhythm-selectors.js';
export { createDashboardNutritionFocusViewModel } from './nutrition-detail-selectors.js';

export function selectNutritionTotals(state = getAppState()) {
    return summarizeNutrition(state?.foodItems || []);
}

export function createDashboardChartsViewModel(state = getAppState(), { range = 7, weightDays = 30 } = {}) {
    const totals = selectNutritionTotals(state);
    const baseDate = state?.selectedDate;

    return {
        totals: totals.totals,
        mealTotals: totals.mealTotals,
        weeklyCalories: getFoodCalorieHistory(7, baseDate),
        calorieTrend: getFoodCalorieHistory(range, baseDate),
        proteinTrend: getFoodProteinHistory(range, baseDate),
        weightTrend: getWeightTrend(weightDays, baseDate),
        mealRhythm: createMealRhythmViewModel(state, { days: 7 }),
        nutritionFocus: createDashboardNutritionFocusViewModel(state, { days: 7 })
    };
}

function roundValue(value, digits = 1) {
    const factor = 10 ** digits;
    return Math.round((Number(value) || 0) * factor) / factor;
}

function resolveMealCoverage(state, dailyViewModel) {
    const mealPlan = getMealPlan(String(state?.currentMealMode || '4'), {}, Number(state?.targetCalories) || 0);
    const plannedMealTypes = mealPlan.map((entry) => entry.type);
    const loggedMealTypes = new Set(
        (dailyViewModel?.foodItems || [])
            .map((item) => item?.type)
            .filter(Boolean)
    );
    const loggedMeals = plannedMealTypes.filter((type) => loggedMealTypes.has(type)).length;
    const nextMeal = mealPlan.find((entry) => !loggedMealTypes.has(entry.type)) || null;

    return {
        plannedMealTypes,
        loggedMealTypes: [...loggedMealTypes],
        loggedMeals,
        plannedMeals: mealPlan.length,
        nextMealType: nextMeal?.type || '',
        nextMealTitleKey: nextMeal?.titleKey || ''
    };
}

export function createHomeCompanionViewModel(state = getAppState()) {
    const resolvedState = state || getAppState();
    const daily = createDailyViewModel(resolvedState);
    const pet = createPetViewModel(resolvedState);
    const rhythm = createMealRhythmViewModel(resolvedState, { days: 7 });
    const weightKg = Math.max(0, Number(resolvedState?.profile?.weight) || 0);
    const macroGoals = calculateMacroGoals(daily.targetCalories, {
        weightKg,
        goalType: resolvedState?.currentGoalType || resolvedState?.profile?.goalType || 'lose'
    });
    const proteinTarget = Math.max(0, Number(macroGoals.protein) || 0);
    const proteinCurrent = roundValue(daily.totals.pro, 1);
    const proteinRemaining = Math.max(0, roundValue(proteinTarget - proteinCurrent, 1));
    const mealCoverage = resolveMealCoverage(resolvedState, daily);
    const remainingCalories = Math.round(Math.max(0, (daily.targetCalories || 0) - (daily.totals.cal || 0)));
    const presetPicker = createFoodPresetPickerViewModel({
        lang: resolvedState?.curLang || 'en',
        profileRegion: resolvedState?.profile?.region || ''
    });
    const selectedRegionOption = (presetPicker.regions || []).find((entry) => entry.id === presetPicker.selectedRegion);

    return {
        lang: resolvedState?.curLang || 'en',
        goalType: resolvedState?.currentGoalType || resolvedState?.profile?.goalType || 'lose',
        diningOutFrequency: String(resolvedState?.profile?.diningOutFrequency || 'sometimes'),
        targetCalories: daily.targetCalories,
        remainingCalories,
        calorieProgressPercent: daily.targetCalories > 0
            ? Math.min(Math.round((daily.totals.cal / daily.targetCalories) * 100), 199)
            : 0,
        presetRegion: presetPicker.selectedRegion,
        presetRegionLabel: selectedRegionOption?.label || presetPicker.selectedRegion || '',
        presetCount: presetPicker.presets?.length || 0,
        featuredPresetName: presetPicker.presets?.[0]?.label || '',
        proteinTarget,
        proteinCurrent,
        proteinRemaining,
        mealCoverage,
        daily,
        pet,
        rhythm
    };
}
