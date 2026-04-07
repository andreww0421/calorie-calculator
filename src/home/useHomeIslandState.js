import { useAppState } from '../react/hooks/useAppState.js';
import { buildHomeIslandViewModel } from './home-view-model.js';

export function useHomeIslandState() {
    const state = useAppState();
    return buildHomeIslandViewModel(state);
}
