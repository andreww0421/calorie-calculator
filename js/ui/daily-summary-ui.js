import { getAppState } from '../state/app-state.js';
import { getTexts } from './shared-ui.js';
import { getDisplayDateLabel, getExtraUiText } from './locale-ui.js';
import { showDailyNutritionSummary } from './detail-ui.js';

function roundValue(value, digits = 1) {
    const factor = 10 ** digits;
    return Math.round((Number(value) || 0) * factor) / factor;
}

function getDailySummaryStrings(progressPercent, remainingCalories) {
    const extra = getExtraUiText(getAppState().curLang);

    if (progressPercent >= 110) {
        return {
            progress: `${Math.round(progressPercent)}%`,
            status: extra.dailySummaryOverTarget(Math.abs(remainingCalories))
        };
    }

    if (progressPercent >= 85) {
        return {
            progress: `${Math.round(progressPercent)}%`,
            status: extra.dailySummaryLeftGoal(Math.max(remainingCalories, 0))
        };
    }

    if (progressPercent > 0) {
        return {
            progress: `${Math.round(progressPercent)}%`,
            status: extra.dailySummaryLeftToday(Math.max(remainingCalories, 0))
        };
    }

    return {
        progress: '0%',
        status: extra.dailySummaryEmpty
    };
}

export function updateDailySummaryCard(total, waterTarget, targetCaloriesValue) {
    const target = Number(targetCaloriesValue) || Number(getAppState().targetCalories) || 0;
    const progressPercent = target > 0 ? Math.min((total.cal / target) * 100, 199) : 0;
    const remainingCalories = target > 0 ? Math.round(target - total.cal) : 0;
    const progressEl = document.getElementById('daily-summary-progress');
    const statusEl = document.getElementById('daily-summary-status');
    const cardEl = document.getElementById('daily-summary-card');
    const copy = getDailySummaryStrings(progressPercent, remainingCalories);

    if (progressEl) progressEl.innerText = copy.progress;
    if (statusEl) {
        statusEl.innerText = copy.status;
        statusEl.dataset.dynamic = 'true';
    }

    if (cardEl) {
        cardEl.dataset.progressState =
            progressPercent >= 110 ? 'over' :
            progressPercent >= 85 ? 'good' :
            progressPercent > 0 ? 'active' :
            'empty';
        cardEl.dataset.waterTarget = String(waterTarget);
    }
}

export function openDailySummaryDetails() {
    const state = getAppState();
    const t = getTexts();
    const extra = getExtraUiText(state.curLang);
    const totalCal = Number(document.getElementById('total-cal-display')?.innerText) || 0;
    const protein = Number(document.getElementById('sum-protein')?.innerText) || 0;
    const fat = Number(document.getElementById('sum-fat')?.innerText) || 0;
    const carbohydrate = Number(document.getElementById('sum-carb')?.innerText) || 0;
    const sugar = Number(document.getElementById('sum-sugar')?.innerText) || 0;
    const sodium = Number(document.getElementById('sum-sodium')?.innerText) || 0;
    const saturatedFat = Number(document.getElementById('sum-sat-fat')?.innerText) || 0;
    const transFat = Number(document.getElementById('sum-trans-fat')?.innerText) || 0;
    const fiber = Number(document.getElementById('sum-fiber')?.innerText) || 0;
    const waterTarget = Number(document.getElementById('water-val')?.innerText) || 0;
    const displayedTarget = Number(document.getElementById('target-cal-display')?.innerText);
    const target = Number.isFinite(displayedTarget) && displayedTarget > 0
        ? displayedTarget
        : (Number(state.targetCalories) || 0);
    const remaining = target > 0 ? Math.round(target - totalCal) : 0;
    const currentDate = document.getElementById('current-date')?.value;
    const dateText = getDisplayDateLabel(currentDate, state.curLang);

    showDailyNutritionSummary({
        title: extra.dailySummaryTitle(dateText),
        goalLabel: t.goal || 'Goal',
        goalValue: target > 0 ? `${target} kcal` : '--',
        remainingLabel: extra.remainingLabel,
        remainingValue: target > 0 ? `${remaining} kcal` : '--',
        waterLabel: t.water || 'Water',
        waterValue: waterTarget > 0 ? `${waterTarget} ml` : '--',
        nutri: {
            calories: Math.round(totalCal),
            protein: roundValue(protein),
            fat: roundValue(fat),
            carbohydrate: roundValue(carbohydrate),
            sugar: roundValue(sugar),
            sodium: Math.round(sodium),
            saturatedFat: roundValue(saturatedFat),
            transFat: roundValue(transFat),
            fiber: roundValue(fiber)
        }
    });
}
