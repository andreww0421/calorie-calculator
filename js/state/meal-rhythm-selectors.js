import { buildMealRhythmInsights } from '../domain/meal-rhythm-domain.js';
import { calculateMacroGoals } from '../domain/nutrition-domain.js';
import { getFoodLogHistory } from '../repositories/food-log-repository.js';
import { getAppState } from './app-state.js';

export function createMealRhythmViewModel(state = getAppState(), { days = 7 } = {}) {
    const resolvedState = state || getAppState();
    const weightKg = Math.max(0, Number(resolvedState?.profile?.weight) || 0);
    const targetCalories = Math.max(0, Number(resolvedState?.targetCalories) || 0);
    const goalType = String(resolvedState?.currentGoalType || resolvedState?.profile?.goalType || 'lose');
    const macroGoals = calculateMacroGoals(targetCalories, {
        weightKg,
        goalType
    });
    const insights = buildMealRhythmInsights({
        dayLogs: getFoodLogHistory(days, resolvedState.selectedDate),
        proteinTarget: macroGoals.protein
    });

    return {
        ...insights,
        proteinTarget: macroGoals.protein,
        lang: resolvedState?.curLang || 'en',
        hasData: insights.loggedDays > 0
    };
}
