import { createDailyViewModel, getAppState } from '../state/app-state.js';
import { createElement, clearElement } from './dom-ui.js';
import { getTexts, uiActions } from './shared-ui.js';
import { executeTurnstile, initializeTurnstileWidget } from '../platform.js';
import { showDetailModal } from './detail-ui.js';
import { buildCoachContent, formatNutritionInline, getExtraUiText } from './locale-ui.js';
import { buildDailyCoaching } from '../domain/nutrition-domain.js';
import {
    dashboardChartRange,
    ensureDashboardChartsReady,
    initCharts,
    macroChart,
    proteinTrendChart,
    calTrendChart,
    setDashboardChartRange,
    updateChartTheme,
    updateCharts,
    updateMacroChartLanguage,
    updateTrendCharts,
    updateWeightChart,
    weightChart,
    weeklyChart
} from './dashboard-charts-ui.js';
import {
    petInteraction,
    petTimeout,
    showEatingAnimation,
    updatePetStatus
} from './pet-ui.js';
import { openDailySummaryDetails, updateDailySummaryCard } from './daily-summary-ui.js';

function roundValue(value, digits = 1) {
    const factor = 10 ** digits;
    return Math.round((Number(value) || 0) * factor) / factor;
}

function createEmptyMealRow(title, body) {
    const wrapper = createElement('div', {
        className: 'meal-empty-card'
    }, [
        createElement('div', {
            className: 'meal-empty-title',
            text: title
        }),
        createElement('div', {
            className: 'meal-empty-copy',
            text: body
        })
    ]);

    const item = document.createElement('li');
    item.className = 'meal-empty-row';
    item.appendChild(wrapper);
    return item;
}

function renderCoachCard(viewModel) {
    const card = document.getElementById('daily-coach-card');
    if (!card) return;

    const coach = buildDailyCoaching({
        total: viewModel.totals,
        targetCalories: viewModel.targetCalories,
        calorieHistory: viewModel.calorieHistory,
        goalType: viewModel.goalType,
        weightKg: viewModel.profileWeight || 0
    });
    const content = buildCoachContent(coach, viewModel.lang);
    const headlineEl = document.getElementById('coach-headline');
    const summaryEl = document.getElementById('coach-summary');
    const tipsEl = document.getElementById('coach-tips');
    const weeklyTitleEl = document.getElementById('coach-weekly-title');
    const statsEl = document.getElementById('coach-weekly-stats');
    const coachTitleEl = document.getElementById('txt-coach-title');

    if (coachTitleEl) coachTitleEl.innerText = content.cardTitle;
    if (headlineEl) headlineEl.innerText = content.headline;
    if (summaryEl) summaryEl.innerText = content.summary;
    if (weeklyTitleEl) weeklyTitleEl.innerText = content.weeklyTitle;

    if (tipsEl) {
        clearElement(tipsEl);
        content.tips.forEach((tip) => {
            tipsEl.appendChild(createElement('li', { text: tip }));
        });
    }

    if (statsEl) {
        clearElement(statsEl);
        content.weeklyStats.forEach((stat) => {
            statsEl.appendChild(createElement('div', {
                className: 'coach-stat-chip',
                text: stat
            }));
        });
    }

    card.dataset.coachStatus = coach.status;
}

export function switchView(targetId) {
    document.querySelectorAll('.view-section').forEach((view) => {
        view.classList.remove('active-view');
        view.classList.add('hidden');
    });

    const targetView = document.getElementById(targetId);
    if (targetView) {
        targetView.classList.remove('hidden');
        targetView.classList.add('active-view');
    }

    document.querySelectorAll('.nav-item').forEach((nav) => {
        nav.classList.toggle('active', nav.getAttribute('data-target') === targetId);
    });

    if (targetId === 'view-dashboard') {
        void ensureDashboardChartsReady();
        return;
    }

    if (targetId === 'view-ai') {
        void initializeTurnstileWidget().then(() => {
            executeTurnstile();
        });
    }
}

export function setChartRange(days) {
    setDashboardChartRange(days);
    const btn7 = document.getElementById('btn-chart-7d');
    const btn30 = document.getElementById('btn-chart-30d');

    if (btn7 && btn30) {
        btn7.classList.toggle('active-range', days === 7);
        btn30.classList.toggle('active-range', days === 30);
    }

    updateTrendCharts(days);
}

export function renderListAndStats(viewModel = createDailyViewModel(getAppState())) {
    const t = getTexts();
    const extra = getExtraUiText(viewModel.lang);

    ['breakfast', 'lunch', 'dinner', 'snack'].forEach((type) => {
        clearElement(document.getElementById(`list-${type}`));
    });

    viewModel.foodItems.forEach((item, index) => {
        const n = item.nutri || {};

        const info = createElement('div', {
            className: 'food-info',
            style: { cursor: 'pointer' }
        });
        info.addEventListener('click', () => showDetailModal(index));
        info.appendChild(createElement('div', { className: 'name', text: item.name || '--' }));
        info.appendChild(createElement('div', {
            className: 'detail',
            text: formatNutritionInline(n, t)
        }));

        const actionWrap = createElement('div', {
            style: { display: 'flex', gap: '5px' }
        });

        const favBtn = createElement('button', {
            className: 'btn-delete',
            text: t.btnFavSave || 'Save',
            style: { backgroundColor: '#ff7675' }
        });
        favBtn.addEventListener('click', () => uiActions.addRecordToFav?.(index));

        const deleteBtn = createElement('button', {
            className: 'btn-delete',
            text: 'X'
        });
        deleteBtn.addEventListener('click', () => uiActions.deleteItem?.(index));

        actionWrap.appendChild(favBtn);
        actionWrap.appendChild(deleteBtn);

        const listItem = document.createElement('li');
        listItem.appendChild(info);
        listItem.appendChild(actionWrap);

        const listEl = document.getElementById(`list-${item.type}`);
        if (listEl) listEl.appendChild(listItem);
    });

    ['breakfast', 'lunch', 'dinner', 'snack'].forEach((type) => {
        const listEl = document.getElementById(`list-${type}`);
        if (!listEl || listEl.children.length > 0) return;
        listEl.appendChild(createEmptyMealRow(extra.emptyMealTitle, extra.emptyMealBody));
    });

    Object.keys(viewModel.mealTotals).forEach((type) => {
        const el = document.getElementById(`prog-${type}`);
        if (el) el.innerText = `${Math.round(viewModel.mealTotals[type])} kcal`;
    });

    document.getElementById('total-cal-display').innerText = Math.round(viewModel.totals.cal);
    document.getElementById('sum-protein').innerText = roundValue(viewModel.totals.pro).toFixed(1);
    document.getElementById('sum-fat').innerText = roundValue(viewModel.totals.fat).toFixed(1);
    document.getElementById('sum-carb').innerText = roundValue(viewModel.totals.carb).toFixed(1);
    document.getElementById('sum-sugar').innerText = roundValue(viewModel.totals.sugar).toFixed(1);
    document.getElementById('sum-sodium').innerText = Math.round(viewModel.totals.sod);
    document.getElementById('sum-sat-fat').innerText = roundValue(viewModel.totals.sat).toFixed(1);
    document.getElementById('sum-trans-fat').innerText = roundValue(viewModel.totals.trans).toFixed(1);
    document.getElementById('sum-fiber').innerText = roundValue(viewModel.totals.fiber).toFixed(1);
    document.getElementById('water-val').innerText = viewModel.waterTarget;

    const emptyState = document.getElementById('daily-empty-state');
    if (emptyState) emptyState.hidden = viewModel.foodItems.length > 0;

    renderCoachCard(viewModel);

    updateCharts(viewModel.totals);
    updatePetStatus(viewModel.totals, { targetCalories: viewModel.targetCalories });
    updateDailySummaryCard(viewModel.totals, viewModel.waterTarget, viewModel.targetCalories);
}

export {
    calTrendChart,
    dashboardChartRange,
    initCharts,
    macroChart,
    openDailySummaryDetails,
    petInteraction,
    petTimeout,
    proteinTrendChart,
    showEatingAnimation,
    updateChartTheme,
    updateCharts,
    updateMacroChartLanguage,
    updatePetStatus,
    updateTrendCharts,
    updateWeightChart,
    weightChart,
    weeklyChart
};
