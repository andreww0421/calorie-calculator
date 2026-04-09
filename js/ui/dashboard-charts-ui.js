import { getAppState } from '../state/app-state.js';
import { createDashboardChartsViewModel } from '../state/app-selectors.js';
import { getTexts } from './shared-ui.js';
import { LocalChart } from './local-chart.js';

export let macroChart = null;
export let weeklyChart = null;
export let weightChart = null;
export let calTrendChart = null;
export let proteinTrendChart = null;
export let dashboardChartRange = 7;
export const dashboardChartRenderer = Object.freeze({
    name: 'local-canvas',
    chartType: LocalChart.name,
    supported: true
});

let chartsInitialized = false;

function getWeeklyCalories(state = getAppState()) {
    const history = createDashboardChartsViewModel(state).weeklyCalories;
    return {
        labels: history.map((item) => item.date),
        data: history.map((item) => item.calories)
    };
}

export function buildWeightTrendPreview(weightHistory, {
    selectedDate = '',
    previewWeight = null
} = {}) {
    if (!Array.isArray(weightHistory)) return [];
    const normalizedPreview = Number(previewWeight);
    if (!Number.isFinite(normalizedPreview) || normalizedPreview <= 0) {
        return [...weightHistory];
    }

    const dateLabel = String(selectedDate || '').slice(5);
    let applied = false;
    const nextHistory = weightHistory.map((item) => {
        if (item?.date !== dateLabel) return item;
        applied = true;
        return {
            ...item,
            weight: normalizedPreview
        };
    });

    return applied ? nextHistory : [...weightHistory];
}

export function setDashboardChartRange(days) {
    dashboardChartRange = days;
}

export async function initCharts() {
    if (chartsInitialized) {
        return true;
    }

    const macroCanvas = document.getElementById('macroChart');
    const weeklyCanvas = document.getElementById('weeklyChart');
    const calTrendCanvas = document.getElementById('calTrendChart');
    const proteinTrendCanvas = document.getElementById('proteinTrendChart');
    const weightCanvas = document.getElementById('weightChart');

    if (!macroCanvas || !weeklyCanvas || !calTrendCanvas || !proteinTrendCanvas || !weightCanvas) {
        return false;
    }

    const ChartConstructor = LocalChart;
    if (chartsInitialized) {
        return true;
    }

    const t = getTexts();

    macroChart = new ChartConstructor(macroCanvas.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: [t.pro, t.fat, t.carb],
            datasets: [{
                data: [1, 1, 1],
                backgroundColor: ['#e0e0e0', '#e0e0e0', '#e0e0e0'],
                placeholder: true,
                borderWidth: 2,
                borderColor: 'var(--card-bg)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } }
            }
        }
    });

    const weeklyData = getWeeklyCalories();
    weeklyChart = new ChartConstructor(weeklyCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: weeklyData.labels,
            datasets: [{
                label: t.cal,
                data: weeklyData.data,
                backgroundColor: '#74b9ff',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } },
                y: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } }
            },
            plugins: { legend: { display: false } }
        }
    });

    calTrendChart = new ChartConstructor(calTrendCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: t.cal,
                data: [],
                borderColor: '#ff7675',
                backgroundColor: 'rgba(255, 118, 117, 0.15)',
                borderWidth: 3,
                tension: 0.35,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } },
                y: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } }
            }
        }
    });

    proteinTrendChart = new ChartConstructor(proteinTrendCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: t.pro,
                data: [],
                borderColor: '#00b894',
                backgroundColor: 'rgba(0, 184, 148, 0.15)',
                borderWidth: 3,
                tension: 0.35,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } },
                y: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } }
            }
        }
    });

    weightChart = new ChartConstructor(weightCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: t.weight,
                data: [],
                borderColor: '#a29bfe',
                backgroundColor: 'rgba(162, 155, 254, 0.12)',
                borderWidth: 3,
                tension: 0.35,
                fill: true,
                spanGaps: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } },
                y: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } }
            }
        }
    });

    chartsInitialized = true;
    updateTrendCharts(dashboardChartRange);
    updateWeightChart();
    return true;
}

export function updateTrendCharts(days, chartData = createDashboardChartsViewModel(getAppState(), { range: days })) {
    const calorieHistory = chartData.calorieTrend;
    const proteinHistory = chartData.proteinTrend;

    if (calTrendChart) {
        calTrendChart.data.labels = calorieHistory.map((item) => item.date);
        calTrendChart.data.datasets[0].data = calorieHistory.map((item) => item.calories);
        calTrendChart.update();
    }

    if (proteinTrendChart) {
        proteinTrendChart.data.labels = proteinHistory.map((item) => item.date);
        proteinTrendChart.data.datasets[0].data = proteinHistory.map((item) => item.protein);
        proteinTrendChart.update();
    }
}

export function updateChartTheme() {
    const textColor = getComputedStyle(document.body).getPropertyValue('--text-color');
    [macroChart, weeklyChart, weightChart, calTrendChart, proteinTrendChart].forEach((chart) => {
        if (!chart) return;
        const scales = chart.options?.scales || {};
        Object.values(scales).forEach((scale) => {
            if (scale.ticks) scale.ticks.color = textColor;
            if (scale.grid) scale.grid.color = 'rgba(127, 127, 127, 0.15)';
        });
        if (chart.options?.plugins?.legend?.labels) {
            chart.options.plugins.legend.labels.color = textColor;
        }
        chart.update();
    });
}

export function updateCharts(totalNutri, chartData = createDashboardChartsViewModel(getAppState())) {
    if (!macroChart) return;

    const protein = Number(totalNutri.pro) || 0;
    const fat = Number(totalNutri.fat) || 0;
    const carb = Number(totalNutri.carb) || 0;
    const sum = protein + fat + carb;

    macroChart.data.datasets[0].data = sum === 0 ? [1, 1, 1] : [protein, fat, carb];
    macroChart.data.datasets[0].backgroundColor = sum === 0
        ? ['#e0e0e0', '#e0e0e0', '#e0e0e0']
        : ['#55efc4', '#ffeaa7', '#74b9ff'];
    macroChart.data.datasets[0].placeholder = sum === 0;
    macroChart.update();

    const weeklyData = {
        labels: chartData.weeklyCalories.map((item) => item.date),
        data: chartData.weeklyCalories.map((item) => item.calories)
    };
    if (weeklyChart) {
        weeklyChart.data.labels = weeklyData.labels;
        weeklyChart.data.datasets[0].data = weeklyData.data;
        weeklyChart.update();
    }
}

export function updateWeightChart(weightHistory = createDashboardChartsViewModel(getAppState()).weightTrend) {
    if (!weightChart) return;
    weightChart.data.labels = weightHistory.map((item) => item.date);
    weightChart.data.datasets[0].data = weightHistory.map((item) => item.weight);
    weightChart.update();
}

export function previewWeightChart(previewWeight, {
    state = getAppState()
} = {}) {
    const chartData = createDashboardChartsViewModel(state);
    const previewHistory = buildWeightTrendPreview(chartData.weightTrend, {
        selectedDate: state.selectedDate,
        previewWeight
    });
    updateWeightChart(previewHistory);
}

export function updateMacroChartLanguage(translations) {
    if (!macroChart) return;
    macroChart.data.labels = [translations.pro, translations.fat, translations.carb];
    macroChart.update();
}

export async function ensureDashboardChartsReady() {
    try {
        await initCharts();
        const chartData = createDashboardChartsViewModel(getAppState(), { range: dashboardChartRange });
        updateCharts(chartData.totals, chartData);
        updateWeightChart(chartData.weightTrend);
        updateTrendCharts(dashboardChartRange, chartData);
    } catch (error) {
        console.error('Dashboard chart initialization failed.', error);
    }
}

export function getDashboardChartRenderer() {
    return dashboardChartRenderer;
}
