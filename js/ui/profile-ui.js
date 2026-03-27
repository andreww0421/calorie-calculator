import { getGoalSummaryText } from './locale-ui.js';

export function renderProfileGoalResult(plan, translations, goalUi) {
    if (!plan) return false;

    const tdeeEl = document.getElementById('tdee-val');
    const targetEl = document.getElementById('target-cal-val');
    const targetDisplayEl = document.getElementById('target-cal-display');
    const goalResult = document.getElementById('goal-result');
    const macroContainer = document.getElementById('macro-goals');

    if (tdeeEl) tdeeEl.innerText = String(plan.tdee || 0);
    if (targetEl) targetEl.innerText = String(plan.targetCalories || 0);
    if (targetDisplayEl) targetDisplayEl.innerText = String(plan.targetCalories || 0);
    if (goalResult) goalResult.style.display = 'block';

    if (!macroContainer) return true;

    const goals = plan.macroGoals || {};
    macroContainer.replaceChildren(
        (() => {
            const strong = document.createElement('strong');
            strong.textContent = translations.macroGoalTitle || 'Recommended macro targets';
            return strong;
        })(),
        document.createElement('br'),
        document.createTextNode(
            `${goalUi.goalSummaryLabel || 'Goal'}: ${getGoalSummaryText(plan.goalType || 'lose')} | ${goalUi.calorieTargetLabel || 'Calories'}: ${plan.targetCalories || 0} kcal`
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

    return true;
}
