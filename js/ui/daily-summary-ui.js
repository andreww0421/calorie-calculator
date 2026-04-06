import { getAppState } from '../state/app-state.js';
import { getTexts } from './shared-ui.js';
import { getDisplayDateLabel, getExtraUiText } from './locale-ui.js';
import { showDailyNutritionSummary } from './detail-ui.js';
import { createDailyNutritionDetailViewModel } from '../state/nutrition-detail-selectors.js';

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
    const ringFill = document.getElementById('progress-ring-fill');
    const copy = getDailySummaryStrings(progressPercent, remainingCalories);

    if (progressEl) progressEl.innerText = copy.progress;
    if (statusEl) {
        statusEl.innerText = copy.status;
        statusEl.dataset.dynamic = 'true';
    }

    // Animate the SVG progress ring
    if (ringFill) {
        const radius = 60;
        const circumference = 2 * Math.PI * radius;
        const clampedPercent = Math.min(progressPercent, 100);
        const offset = circumference - (clampedPercent / 100) * circumference;
        ringFill.style.strokeDasharray = String(circumference);
        ringFill.style.strokeDashoffset = String(offset);
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
    const detailViewModel = createDailyNutritionDetailViewModel(state);
    const currentDate = document.getElementById('current-date')?.value;
    const dateText = getDisplayDateLabel(currentDate, state.curLang);

    showDailyNutritionSummary({
        title: extra.dailySummaryTitle(dateText),
        goalLabel: t.goal || 'Goal',
        goalValue: detailViewModel.targetCalories > 0 ? `${detailViewModel.targetCalories} kcal` : '--',
        remainingLabel: extra.remainingLabel,
        remainingValue: detailViewModel.targetCalories > 0 ? `${detailViewModel.remainingCalories} kcal` : '--',
        waterLabel: t.water || 'Water',
        waterValue: detailViewModel.waterTarget > 0 ? `${detailViewModel.waterTarget} ml` : '--',
        nutri: detailViewModel.nutrition
    });
}
