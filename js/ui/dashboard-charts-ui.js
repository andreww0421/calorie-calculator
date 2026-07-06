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
let macroSnapshotHistory = [];
let calorieTrendHistory = [];
let proteinTrendHistory = [];
let weightTrendHistory = [];
let selectedMacroSnapshotDate = '';

function roundDisplayValue(value, digits = 1) {
    const factor = 10 ** digits;
    return Math.round((Number(value) || 0) * factor) / factor;
}

function setCaption(id, text = '') {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = String(text ?? '').replaceAll(' 路 ', ' | ');
    }
}

function formatTrendCaption(entry, field, unit = '') {
    if (!entry) return '';
    const label = entry.date || entry.label || '--';
    const value = roundDisplayValue(entry?.[field], field === 'weight' ? 1 : 1);
    return `${label} · ${value}${unit}`;
}

function formatMacroDateCaption(entry) {
    if (!entry) return '';
    const label = entry.label || String(entry.date || '').slice(5) || '--';
    return `${label} · ${Math.round(Number(entry.calories) || 0)} kcal`;
}

function formatMacroHint(entry, texts = getTexts()) {
    if (!entry) return '';
    const label = entry.label || String(entry.date || '').slice(5) || '--';
    const protein = roundDisplayValue(entry.protein, 1);
    const fat = roundDisplayValue(entry.fat, 1);
    const carb = roundDisplayValue(entry.carb, 1);
    return `${label} · ${texts.pro || 'Protein'} ${protein}g · ${texts.fat || 'Fat'} ${fat}g · ${texts.carb || 'Carbs'} ${carb}g`;
}

function getLatestHistoryEntry(history = []) {
    if (!Array.isArray(history) || history.length === 0) return null;
    return history[history.length - 1] || null;
}

function resolveSelectedMacroEntry(history = macroSnapshotHistory) {
    if (!Array.isArray(history) || history.length === 0) return null;
    return history.find((entry) => entry.date === selectedMacroSnapshotDate) || history[history.length - 1] || null;
}

function syncTrendCaptions() {
    setCaption('calTrendHoverValue', formatTrendCaption(getLatestHistoryEntry(calorieTrendHistory), 'calories', ' kcal'));
    setCaption('proteinTrendHoverValue', formatTrendCaption(getLatestHistoryEntry(proteinTrendHistory), 'protein', 'g'));
    setCaption('weightTrendHoverValue', formatTrendCaption(getLatestHistoryEntry(weightTrendHistory), 'weight', ' kg'));
}

function syncMacroFocus(entry = resolveSelectedMacroEntry()) {
    if (!macroChart) return;

    const protein = Math.max(Number(entry?.protein) || 0, 0);
    const fat = Math.max(Number(entry?.fat) || 0, 0);
    const carb = Math.max(Number(entry?.carb) || 0, 0);
    const total = protein + fat + carb;
    const texts = getTexts();

    macroChart.data.labels = [texts.pro, texts.fat, texts.carb];
    macroChart.data.datasets[0].data = total === 0 ? [1, 1, 1] : [protein, fat, carb];
    macroChart.data.datasets[0].backgroundColor = total === 0
        ? ['#ddd8f6', '#f9dfb3', '#d6f0df']
        : ['#5db27d', '#ff9a6b', '#7a6fe0'];
    macroChart.data.datasets[0].placeholder = total === 0;
    macroChart.update();

    setCaption('macroChartDate', formatMacroDateCaption(entry));
    setCaption('weeklyChartHint', formatMacroHint(entry, texts));
}

function syncMacroSelection(history = macroSnapshotHistory) {
    const selectedEntry = resolveSelectedMacroEntry(history);
    selectedMacroSnapshotDate = selectedEntry?.date || '';

    if (weeklyChart?.options?.interaction) {
        weeklyChart.options.interaction.selectedIndex = history.findIndex((entry) => entry.date === selectedMacroSnapshotDate);
    }

    syncMacroFocus(selectedEntry);
    if (weeklyChart) {
        weeklyChart.update();
    }
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

    const texts = getTexts();

    macroChart = new LocalChart(macroCanvas.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: [texts.pro, texts.fat, texts.carb],
            datasets: [{
                data: [1, 1, 1],
                backgroundColor: ['#ddd8f6', '#f9dfb3', '#d6f0df'],
                placeholder: true,
                borderWidth: 2,
                borderColor: 'var(--card-bg)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });

    weeklyChart = new LocalChart(weeklyCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: [],
            items: [],
            datasets: [
                { label: texts.pro, data: [], backgroundColor: '#5db27d', borderRadius: 8 },
                { label: texts.fat, data: [], backgroundColor: '#ff9a6b', borderRadius: 8 },
                { label: texts.carb, data: [], backgroundColor: '#7a6fe0', borderRadius: 8 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } },
                y: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-color') } }
            },
            plugins: { legend: { display: false } },
            interaction: {
                mode: 'group',
                selectedIndex: -1,
                onHover: ({ payload }) => {
                    if (payload) setCaption('weeklyChartHint', formatMacroHint(payload));
                },
                onLeave: () => {
                    setCaption('weeklyChartHint', formatMacroHint(resolveSelectedMacroEntry()));
                },
                onSelect: ({ payload }) => {
                    if (!payload) return;
                    selectedMacroSnapshotDate = payload.date || '';
                    syncMacroSelection();
                }
            }
        }
    });

    calTrendChart = new LocalChart(calTrendCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            items: [],
            datasets: [{
                label: texts.cal,
                data: [],
                borderColor: '#ff9a6b',
                backgroundColor: 'rgba(255, 154, 107, 0.18)',
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
            },
            interaction: {
                onHover: ({ payload }) => {
                    if (payload) setCaption('calTrendHoverValue', formatTrendCaption(payload, 'calories', ' kcal'));
                },
                onLeave: () => {
                    setCaption('calTrendHoverValue', formatTrendCaption(getLatestHistoryEntry(calorieTrendHistory), 'calories', ' kcal'));
                },
                onSelect: ({ payload }) => {
                    if (payload) setCaption('calTrendHoverValue', formatTrendCaption(payload, 'calories', ' kcal'));
                }
            }
        }
    });

    proteinTrendChart = new LocalChart(proteinTrendCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            items: [],
            datasets: [{
                label: texts.pro,
                data: [],
                borderColor: '#5db27d',
                backgroundColor: 'rgba(93, 178, 125, 0.18)',
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
            },
            interaction: {
                onHover: ({ payload }) => {
                    if (payload) setCaption('proteinTrendHoverValue', formatTrendCaption(payload, 'protein', 'g'));
                },
                onLeave: () => {
                    setCaption('proteinTrendHoverValue', formatTrendCaption(getLatestHistoryEntry(proteinTrendHistory), 'protein', 'g'));
                },
                onSelect: ({ payload }) => {
                    if (payload) setCaption('proteinTrendHoverValue', formatTrendCaption(payload, 'protein', 'g'));
                }
            }
        }
    });

    weightChart = new LocalChart(weightCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            items: [],
            datasets: [{
                label: texts.weight,
                data: [],
                borderColor: '#6358c8',
                backgroundColor: 'rgba(122, 111, 224, 0.16)',
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
            },
            interaction: {
                onHover: ({ payload }) => {
                    if (payload) setCaption('weightTrendHoverValue', formatTrendCaption(payload, 'weight', ' kg'));
                },
                onLeave: () => {
                    setCaption('weightTrendHoverValue', formatTrendCaption(getLatestHistoryEntry(weightTrendHistory), 'weight', ' kg'));
                },
                onSelect: ({ payload }) => {
                    if (payload) setCaption('weightTrendHoverValue', formatTrendCaption(payload, 'weight', ' kg'));
                }
            }
        }
    });

    chartsInitialized = true;
    updateTrendCharts(dashboardChartRange);
    updateWeightChart();
    return true;
}

export function updateTrendCharts(days, chartData = createDashboardChartsViewModel(getAppState(), { range: days })) {
    calorieTrendHistory = Array.isArray(chartData.calorieTrend) ? chartData.calorieTrend : [];
    proteinTrendHistory = Array.isArray(chartData.proteinTrend) ? chartData.proteinTrend : [];

    if (calTrendChart) {
        calTrendChart.data.labels = calorieTrendHistory.map((item) => item.date);
        calTrendChart.data.items = calorieTrendHistory;
        calTrendChart.data.datasets[0].data = calorieTrendHistory.map((item) => item.calories);
        calTrendChart.update();
    }

    if (proteinTrendChart) {
        proteinTrendChart.data.labels = proteinTrendHistory.map((item) => item.date);
        proteinTrendChart.data.items = proteinTrendHistory;
        proteinTrendChart.data.datasets[0].data = proteinTrendHistory.map((item) => item.protein);
        proteinTrendChart.update();
    }

    syncTrendCaptions();
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

export function updateCharts(totalNutri, chartData = createDashboardChartsViewModel(getAppState(), { range: dashboardChartRange })) {
    if (!macroChart || !weeklyChart) return;

    const texts = getTexts();
    macroSnapshotHistory = Array.isArray(chartData.macroSnapshot) ? chartData.macroSnapshot : [];

    weeklyChart.data.labels = macroSnapshotHistory.map((item) => item.label);
    weeklyChart.data.items = macroSnapshotHistory;
    weeklyChart.data.datasets[0].label = texts.pro;
    weeklyChart.data.datasets[0].data = macroSnapshotHistory.map((item) => item.protein);
    weeklyChart.data.datasets[1].label = texts.fat;
    weeklyChart.data.datasets[1].data = macroSnapshotHistory.map((item) => item.fat);
    weeklyChart.data.datasets[2].label = texts.carb;
    weeklyChart.data.datasets[2].data = macroSnapshotHistory.map((item) => item.carb);

    if (!selectedMacroSnapshotDate && macroSnapshotHistory.length > 0) {
        selectedMacroSnapshotDate = macroSnapshotHistory[macroSnapshotHistory.length - 1].date || '';
    }

    if (macroSnapshotHistory.length > 0) {
        syncMacroSelection(macroSnapshotHistory);
        return;
    }

    syncMacroFocus({
        date: '',
        label: '',
        protein: Number(totalNutri.pro) || 0,
        fat: Number(totalNutri.fat) || 0,
        carb: Number(totalNutri.carb) || 0,
        calories: Number(totalNutri.cal) || 0
    });
}

export function updateWeightChart(weightHistory = createDashboardChartsViewModel(getAppState()).weightTrend) {
    if (!weightChart) return;
    weightTrendHistory = Array.isArray(weightHistory) ? weightHistory.map((item) => ({
        ...item,
        weight: Number(item?.weight) || 0
    })) : [];
    weightChart.data.labels = weightTrendHistory.map((item) => item.date);
    weightChart.data.items = weightTrendHistory;
    weightChart.data.datasets[0].data = weightTrendHistory.map((item) => item.weight);
    weightChart.update();
    setCaption('weightTrendHoverValue', formatTrendCaption(getLatestHistoryEntry(weightTrendHistory), 'weight', ' kg'));
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
    if (!macroChart || !weeklyChart) return;
    macroChart.data.labels = [translations.pro, translations.fat, translations.carb];
    weeklyChart.data.datasets[0].label = translations.pro;
    weeklyChart.data.datasets[1].label = translations.fat;
    weeklyChart.data.datasets[2].label = translations.carb;
    syncMacroSelection(macroSnapshotHistory);
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
