import { getAppState } from '../state/app-state.js';
import { getTexts } from './shared-ui.js';
import { getDisplayDateLabel, getExtraUiText } from './locale-ui.js';
import { showDailyNutritionSummary } from './detail-ui.js';
import { createDailyNutritionDetailViewModel } from '../state/nutrition-detail-selectors.js';

function setTextById(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.innerText = value;
    }
}

function getDailySummaryStrings(progressPercent, remainingCalories, lang) {
    const extra = getExtraUiText(lang);

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

function roundValue(value, digits = 1) {
    const factor = 10 ** digits;
    return Math.round((Number(value) || 0) * factor) / factor;
}

export function buildDailySummaryCardState(total, waterTarget, targetCaloriesValue, lang = getAppState().curLang) {
    const effectiveTarget = Number(targetCaloriesValue) || 0;
    const progressPercent = effectiveTarget > 0 ? Math.min((total.cal / effectiveTarget) * 100, 199) : 0;
    const remainingCalories = effectiveTarget > 0 ? Math.round(effectiveTarget - total.cal) : 0;
    const copy = getDailySummaryStrings(progressPercent, remainingCalories, lang);

    return {
        progress: copy.progress,
        status: copy.status,
        progressState:
            progressPercent >= 110 ? 'over' :
            progressPercent >= 85 ? 'good' :
            progressPercent > 0 ? 'active' :
            'empty',
        strokeDashoffset: progressPercent > 0
            ? `${(2 * Math.PI * 60) - (Math.min(progressPercent, 100) / 100) * (2 * Math.PI * 60)}`
            : '0',
        strokeDasharray: `${2 * Math.PI * 60}`,
        waterTarget
    };
}

export function buildDailySummaryMetricsViewModel(total, waterTarget, targetCaloriesValue, lang = getAppState().curLang) {
    const cardState = buildDailySummaryCardState(total, waterTarget, targetCaloriesValue, lang);

    return {
        ...cardState,
        totalCalories: Math.round(Number(total?.cal) || 0),
        protein: roundValue(total?.pro).toFixed(1),
        fat: roundValue(total?.fat).toFixed(1),
        carb: roundValue(total?.carb).toFixed(1),
        sugar: roundValue(total?.sugar).toFixed(1),
        sodium: String(Math.round(Number(total?.sod) || 0)),
        saturatedFat: roundValue(total?.sat).toFixed(1),
        transFat: roundValue(total?.trans).toFixed(1),
        fiber: roundValue(total?.fiber).toFixed(1)
    };
}

export function updateDailySummaryCard(total, waterTarget, targetCaloriesValue, lang = getAppState().curLang) {
    const state = buildDailySummaryCardState(total, waterTarget, targetCaloriesValue, lang);

    setTextById('daily-summary-progress', state.progress);
    const statusEl = document.getElementById('daily-summary-status');
    if (statusEl) {
        statusEl.innerText = state.status;
        statusEl.dataset.dynamic = 'true';
    }

    const ringFill = document.getElementById('progress-ring-fill');
    if (ringFill) {
        ringFill.style.strokeDasharray = state.strokeDasharray;
        ringFill.style.strokeDashoffset = state.strokeDashoffset;
    }

    const cardEl = document.getElementById('daily-summary-card');
    if (cardEl) {
        cardEl.dataset.progressState = state.progressState;
        cardEl.dataset.waterTarget = String(state.waterTarget);
    }
}

export function buildDailySummaryDetailViewModel(state = getAppState()) {
    const t = getTexts();
    const extra = getExtraUiText(state.curLang);
    const detailViewModel = createDailyNutritionDetailViewModel(state);
    const dateText = getDisplayDateLabel(state.selectedDate, state.curLang);

    return {
        title: extra.dailySummaryTitle(dateText),
        goalLabel: t.goal || 'Goal',
        goalValue: detailViewModel.targetCalories > 0 ? `${detailViewModel.targetCalories} kcal` : '--',
        remainingLabel: extra.remainingLabel,
        remainingValue: detailViewModel.targetCalories > 0 ? `${detailViewModel.remainingCalories} kcal` : '--',
        waterLabel: t.water || 'Water',
        waterValue: detailViewModel.waterTarget > 0 ? `${detailViewModel.waterTarget} ml` : '--',
        nutri: detailViewModel.nutrition
    };
}

export function openDailySummaryDetails() {
    showDailyNutritionSummary(buildDailySummaryDetailViewModel(getAppState()));
}
