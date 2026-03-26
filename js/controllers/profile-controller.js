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
import { getDisplayDateLabel, getGoalUiText, getGoalSummaryText } from '../ui/locale-ui.js';
import { calculateNutritionTargets } from '../domain/nutrition-domain.js';

function renderMacroGoals(container, translations, goalUi, plan) {
    if (!container) return;
    const goals = plan?.macroGoals || {};
    container.replaceChildren(
        (() => {
            const strong = document.createElement('strong');
            strong.textContent = translations.macroGoalTitle || 'Recommended macro targets';
            return strong;
        })(),
        document.createElement('br'),
        document.createTextNode(
            `${goalUi.goalSummaryLabel || 'Goal'}: ${getGoalSummaryText(plan?.goalType || 'lose')} | ${goalUi.calorieTargetLabel || 'Calories'}: ${plan?.targetCalories || 0} kcal`
        ),
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
    const goalType = document.getElementById('goal-type')?.value || 'lose';
    const t = getTranslations();
    const goalUi = getGoalUiText();

    if (!h || !w || !a) {
        if (!auto) showToast(t.alertFill || 'Please fill in the required profile fields.', 'error');
        return;
    }

    const bmr = g === 'male'
        ? (10 * w + 6.25 * h - 5 * a + 5)
        : (10 * w + 6.25 * h - 5 * a - 161);
    const tdee = Math.round(bmr * act);
    const nutritionPlan = calculateNutritionTargets({
        weightKg: w,
        tdee,
        bmr,
        goalType
    });

    setTargetCalories(nutritionPlan.targetCalories);
    setCurrentMealMode(mode);
    setCurrentGoalType(nutritionPlan.goalType);

    document.getElementById('tdee-val').innerText = tdee;
    document.getElementById('target-cal-val').innerText = nutritionPlan.targetCalories;
    document.getElementById('target-cal-display').innerText = nutritionPlan.targetCalories;

    const goalResult = document.getElementById('goal-result');
    if (goalResult) goalResult.style.display = 'block';

    saveProfile(readProfileForm());
    updateMealUI();

    renderMacroGoals(document.getElementById('macro-goals'), t, goalUi, nutritionPlan);

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
        if (document.getElementById('goal-result')?.style.display === 'block') {
            calculateProfile(true);
        }
        if (typeof updateProfileStats === 'function') updateProfileStats();
        return true;
    }

    showToast(t.alertInvalidWeight || 'Please enter a valid weight.', 'error');
    return false;
}
