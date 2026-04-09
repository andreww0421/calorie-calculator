import { getFoodCalorieHistory } from '../repositories/food-log-repository.js';
import { buildDailyCoaching, summarizeNutrition } from '../domain/nutrition-domain.js';
import {
    buildPetState,
    calculatePetLoggingStreak,
    PET_DEFAULT_INTERACTION_KEYS
} from '../domain/pet-domain.js';
import { getAppState } from './app-state.js';

export function createPetViewModel(state = getAppState()) {
    const totals = summarizeNutrition(state?.foodItems || []);
    const calorieHistory = getFoodCalorieHistory(7, state?.selectedDate);
    const targetCalories = Number(state?.targetCalories) || 0;
    const weightKg = Math.max(0, Number(state?.profile?.weight) || 0);
    const currentGoalType = state?.currentGoalType || 'lose';
    const coach = buildDailyCoaching({
        total: totals.totals,
        targetCalories,
        calorieHistory,
        goalType: currentGoalType,
        weightKg
    });
    const streak = calculatePetLoggingStreak(calorieHistory);
    const pet = buildPetState({
        totalCalories: totals.totals.cal,
        targetCalories,
        loggedMeals: Array.isArray(state?.foodItems) ? state.foodItems.length : 0,
        streak
    });

    return {
        totals: totals.totals,
        coach,
        calorieHistory,
        statusKey: pet.key,
        frameKey: pet.frameKey,
        messageKey: pet.messageKey,
        progress: pet.progress,
        interactionMessageKeys: PET_DEFAULT_INTERACTION_KEYS
    };
}

export function createPetCoachingViewModel(state = getAppState()) {
    const viewModel = createPetViewModel(state);
    return {
        totals: viewModel.totals,
        coach: viewModel.coach
    };
}
