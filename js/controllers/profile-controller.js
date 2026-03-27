import {
    saveWeightData,
    selectedDate,
    importData,
    saveProfile
} from '../data.js';
import { reloadApp } from '../platform.js';
import { showToast } from '../ui.js';
import { dispatchAppAction } from '../state/app-actions.js';
import { refreshAppState } from '../state/app-state.js';
import { getTranslations, readProfileForm, reportControllerError } from './controller-shared.js';
import { calculateProfilePlan } from '../domain/profile-domain.js';

export async function handleImportData(input) {
    const t = getTranslations();
    const file = input?.files?.[0];
    if (!file) return;

    try {
        await importData(file);
        showToast(t.alertImportOk || 'Data restored successfully.', 'success');
        setTimeout(() => reloadApp(), 1500);
    } catch (error) {
        showToast(t.alertImportFail || 'Invalid backup file.', 'error');
        reportControllerError('Import Data Error', error);
    } finally {
        input.value = '';
    }
}

export function calculateProfile(auto = false, options = {}) {
    const t = getTranslations();
    const formProfile = readProfileForm();
    const profilePlan = calculateProfilePlan(formProfile);

    if (!profilePlan) {
        if (!auto) showToast(t.alertFill || 'Please fill in the required profile fields.', 'error');
        return null;
    }

    dispatchAppAction('APPLY_PROFILE_PLAN', {
        profile: formProfile,
        goalType: profilePlan.goalType,
        targetCalories: profilePlan.targetCalories,
        persist: options.persist !== false
    });

    return profilePlan;
}

export function refreshProfilePresentation() {
    return calculateProfile(true, {
        persist: false,
        refreshMeals: false,
        renderList: false
    });
}

export function changeDate() {
    const nextDate = document.getElementById('current-date').value;
    dispatchAppAction('SET_SELECTED_DATE', { date: nextDate });
}

export function saveCurrentWeight() {
    const weightValue = document.getElementById('daily-weight-input').value;
    const t = getTranslations();

    if (saveWeightData(selectedDate, weightValue)) {
        showToast(t.alertWeightSaved || 'Weight saved.', 'success');
        document.getElementById('weight').value = weightValue;
        const profile = readProfileForm();
        if (document.getElementById('goal-result')?.style.display === 'block') {
            calculateProfile(true);
        } else {
            saveProfile(profile);
            refreshAppState({ profile }, { reason: 'weight:save' });
        }
        return true;
    }

    showToast(t.alertInvalidWeight || 'Please enter a valid weight.', 'error');
    return false;
}
