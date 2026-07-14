import { useMemo } from 'react';
import { useAppState } from '../react/hooks/useAppState.js';
import { buildHomeIslandViewModel } from './home-view-model.js';

export function useHomeIslandState() {
    const state = useAppState();
    return useMemo(
        () => buildHomeIslandViewModel(state),
        [
            state.selectedDate,
            state.curLang,
            state.targetCalories,
            state.currentMealMode,
            state.currentGoalType,
            state.foodItems,
            state.profile
        ]
    );
}
