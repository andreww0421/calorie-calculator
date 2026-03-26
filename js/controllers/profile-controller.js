import {
    saveWeightData,
    selectedDate,
    saveProfile,
    importData,
    setTargetCalories,
    setCurrentMealMode,
    loadWeightData,
    loadFoodData,
    setSelectedDate
} from '../data.js';
import { reloadApp } from '../platform.js';
import { renderListAndStats, showToast, updateMealUI } from '../ui.js';
import { getTranslations, readProfileForm, reportControllerError } from './controller-shared.js';
import { getDisplayDateLabel } from '../ui/locale-ui.js';

function renderMacroGoals(container, translations, goals) {
    if (!container) return;
    container.replaceChildren(
        (() => {
            const strong = document.createElement('strong');
            strong.textContent = translations.macroGoalTitle || 'Recommended macro targets';
            return strong;
        })(),
        document.createElement('br'),
        document.createTextNode(
            `P ${translations.pro}: ${goals.protein}g | F ${translations.fat}: ${goals.fat}g | C ${translations.carb}: ${goals.carb}g`
        ),
        document.createElement('br'),
        document.createTextNode(
            `${translations.sugar}: ${goals.sugar}g | ${translations.sod.replace('(mg)', '')}: 2300mg | ${translations.sat}: ${goals.saturatedFat}g`
        )
    );
}

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

export function calculateProfile(auto = false) {
    const h = parseFloat(document.getElementById('height').value);
    const w = parseFloat(document.getElementById('weight').value);
    const a = parseFloat(document.getElementById('age').value);
    const act = parseFloat(document.getElementById('activity').value);
    const g = document.getElementById('gender').value;
    const mode = document.getElementById('meal-mode').value;
    const t = getTranslations();

    if (!h || !w || !a) {
        if (!auto) showToast(t.alertFill || 'Please fill in the required profile fields.', 'error');
        return;
    }

    const bmr = g === 'male'
        ? (10 * w + 6.25 * h - 5 * a + 5)
        : (10 * w + 6.25 * h - 5 * a - 161);
    const tdee = Math.round(bmr * act);
    let computedTarget = Math.round(tdee - 500);
    if (computedTarget < bmr) computedTarget = Math.round(bmr);

    setTargetCalories(computedTarget);
    setCurrentMealMode(mode);

    document.getElementById('tdee-val').innerText = tdee;
    document.getElementById('target-cal-val').innerText = computedTarget;
    document.getElementById('target-cal-display').innerText = computedTarget;

    const goalResult = document.getElementById('goal-result');
    if (goalResult) goalResult.style.display = 'block';

    saveProfile(readProfileForm());
    updateMealUI();

    renderMacroGoals(document.getElementById('macro-goals'), t, {
        protein: Math.round((computedTarget * 0.2) / 4),
        fat: Math.round((computedTarget * 0.3) / 9),
        carb: Math.round((computedTarget * 0.5) / 4),
        sugar: Math.round((computedTarget * 0.1) / 4),
        saturatedFat: Math.round((computedTarget * 0.1) / 9)
    });

    renderListAndStats();
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
        if (typeof updateProfileStats === 'function') updateProfileStats();
        return true;
    }

    showToast(t.alertInvalidWeight || 'Please enter a valid weight.', 'error');
    return false;
}
