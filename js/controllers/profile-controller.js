import {
    saveWeightData,
    selectedDate,
    saveProfile,
    importData,
    setTargetCalories,
    setCurrentMealMode,
    setCurrentGoalType,
    loadWeightData,
    loadFoodData,
    setSelectedDate
} from '../data.js';
import { reloadApp } from '../platform.js';
import { renderListAndStats, showToast, updateMealUI } from '../ui.js';
import { getTranslations, readProfileForm, reportControllerError } from './controller-shared.js';
import { getDisplayDateLabel, getGoalUiText } from '../ui/locale-ui.js';
import { calculateProfilePlan } from '../domain/profile-domain.js';
import { renderProfileGoalResult } from '../ui/profile-ui.js';

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
    const goalUi = getGoalUiText();
    const formProfile = readProfileForm();
    const profilePlan = calculateProfilePlan(formProfile);

    if (!profilePlan) {
        if (!auto) showToast(t.alertFill || 'Please fill in the required profile fields.', 'error');
        return null;
    }

    setTargetCalories(profilePlan.targetCalories);
    setCurrentMealMode(formProfile.mealMode || profilePlan.mealMode || '4');
    setCurrentGoalType(profilePlan.goalType);

    renderProfileGoalResult(profilePlan, t, goalUi);

    if (options.persist !== false) {
        saveProfile(formProfile);
    }

    if (options.refreshMeals !== false) {
        updateMealUI();
    }

    if (options.renderList !== false) {
        renderListAndStats();
    }

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
    setSelectedDate(nextDate);
    document.getElementById('display-date-text').innerText = getDisplayDateLabel(nextDate);
    loadFoodData(nextDate);

    const weight = loadWeightData(nextDate);
    document.getElementById('daily-weight-input').value = weight !== null ? weight : '';
    renderListAndStats();
}

export function saveCurrentWeight() {
    const weightValue = document.getElementById('daily-weight-input').value;
    const t = getTranslations();

    if (saveWeightData(selectedDate, weightValue)) {
        showToast(t.alertWeightSaved || 'Weight saved.', 'success');
        document.getElementById('weight').value = weightValue;
        saveProfile(readProfileForm());
        if (document.getElementById('goal-result')?.style.display === 'block') {
            calculateProfile(true);
        }
        if (typeof updateProfileStats === 'function') updateProfileStats();
        return true;
    }

    showToast(t.alertInvalidWeight || 'Please enter a valid weight.', 'error');
    return false;
}
