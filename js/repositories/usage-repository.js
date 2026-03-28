import { loadUsageState, saveUsageState } from '../storage.js';

export function loadDailyUsage() {
    return loadUsageState();
}

export function saveDailyUsage(usage) {
    return saveUsageState(usage);
}
