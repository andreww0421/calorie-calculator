import { captureDiagnostic } from '../diagnostics.js';
import { getLocaleTranslations } from '../locales/index.js';
import { getAppState } from '../state/app-state.js';

export function getTranslations() {
    return getLocaleTranslations(getAppState().curLang);
}

export function reportControllerError(scope, error, extra = {}) {
    console.error(scope, error);
    captureDiagnostic('error', scope, {
        error: error?.message || String(error),
        ...extra
    });
}

export function readProfileForm() {
    return {
        gender: document.getElementById('gender').value,
        age: document.getElementById('age').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        activity: document.getElementById('activity').value,
        mealMode: document.getElementById('meal-mode').value,
        goalType: document.getElementById('goal-type')?.value || 'lose'
    };
}

export function applyProfileToForm(profile) {
    if (!profile) return false;
    document.getElementById('gender').value = profile.gender || 'male';
    document.getElementById('age').value = profile.age || '';
    document.getElementById('height').value = profile.height || '';
    document.getElementById('weight').value = profile.weight || '';
    document.getElementById('activity').value = profile.activity || '1.2';
    if (profile.mealMode) document.getElementById('meal-mode').value = profile.mealMode;
    if (profile.goalType && document.getElementById('goal-type')) {
        document.getElementById('goal-type').value = profile.goalType;
    }
    return true;
}
