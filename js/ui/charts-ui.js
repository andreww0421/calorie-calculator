import { createDailyViewModel, getAppState } from '../state/app-state.js';
import { createPetViewModel } from '../state/pet-selectors.js';
import { createDashboardChartsViewModel } from '../state/app-selectors.js';
import { getTexts } from './shared-ui.js';
import { executeTurnstile, initializeTurnstileWidget } from '../platform.js';
import { getExtraUiText } from './locale-ui.js';
import {
    dashboardChartRange,
    ensureDashboardChartsReady,
    initCharts,
    macroChart,
    proteinTrendChart,
    previewWeightChart,
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
    buildDashboardSummaryMetrics,
    renderCoachCard,
    renderDashboardNutritionFocusCard,
    renderDashboardSummary,
    renderMealRhythmCards,
    trackVisibleRhythmSummaryViews
} from './dashboard-summary-ui.js';
import {
    petInteraction,
    petTimeout,
    showEatingAnimation,
    updatePetStatus
} from './pet-ui.js';
import {
    renderMealListRows,
    renderMealProgressCards
} from './meal-list-ui.js';
import { openDailySummaryDetails } from './daily-summary-ui.js';

const VIEW_ORDER = ['view-daily', 'view-dashboard', 'view-ai', 'view-settings'];

export function switchView(targetId) {
    const currentView = document.querySelector('.view-section.active-view');
    const currentId = currentView?.id || '';
    const fromIndex = VIEW_ORDER.indexOf(currentId);
    const toIndex = VIEW_ORDER.indexOf(targetId);
    const direction = toIndex >= fromIndex ? 'right' : 'left';

    document.querySelectorAll('.view-section').forEach((view) => {
        view.classList.remove('active-view', 'view-enter-left', 'view-enter-right');
        view.classList.add('hidden');
    });

    const targetView = document.getElementById(targetId);
    if (targetView) {
        targetView.classList.remove('hidden');
        targetView.classList.add('active-view');
        if (currentId && currentId !== targetId) {
            const animClass = direction === 'right' ? 'view-enter-right' : 'view-enter-left';
            targetView.classList.add(animClass);
            targetView.addEventListener('animationend', () => {
                targetView.classList.remove(animClass);
            }, { once: true });
        }
    }

    document.querySelectorAll('.nav-item').forEach((nav) => {
        nav.classList.toggle('active', nav.getAttribute('data-target') === targetId);
    });

    if (targetId === 'view-dashboard') {
        trackVisibleRhythmSummaryViews(getAppState());
        void ensureDashboardChartsReady();
        return;
    }

    if (targetId === 'view-ai') {
        void initializeTurnstileWidget().then(() => {
            executeTurnstile();
        });
        return;
    }

    trackVisibleRhythmSummaryViews(getAppState());
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
    const state = getAppState();
    renderDailySurface(viewModel, extra, t);
    renderCompanionSurface(state, viewModel);
}

function renderDailySurface(viewModel, extra, t) {
    renderMealListRows(viewModel, extra, t);
    renderMealProgressCards(viewModel);
}

function renderCompanionSurface(state, viewModel) {
    const chartData = createDashboardChartsViewModel(state, { range: dashboardChartRange });
    renderCoachCard(viewModel);
    renderMealRhythmCards(state);
    renderDashboardNutritionFocusCard(state);
    renderDashboardSummary(state);

    updateCharts(viewModel.totals, chartData);
    updateTrendCharts(dashboardChartRange, chartData);
    updateWeightChart(chartData.weightTrend);
    updatePetStatus(createPetViewModel(state));
}

export {
    buildDashboardSummaryMetrics,
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
    previewWeightChart,
    weightChart,
    weeklyChart
};
