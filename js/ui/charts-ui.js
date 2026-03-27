import {
    foodItems,
    targetCalories,
    curLang,
    currentGoalType,
    getWeightHistory,
    getCalorieHistory,
    getProteinHistory
} from '../data.js';
import { createElement, clearElement } from './dom-ui.js';
import { getTexts, uiActions } from './shared-ui.js';
import { showDailyNutritionSummary, showDetailModal } from './detail-ui.js';
import { buildCoachContent, formatNutritionInline, getDisplayDateLabel, getExtraUiText } from './locale-ui.js';
import { buildDailyCoaching, summarizeNutrition } from '../domain/nutrition-domain.js';

let macroChart = null;
let weeklyChart = null;
let weightChart = null;
let calTrendChart = null;
let proteinTrendChart = null;
let petTimeout = null;
let dashboardChartRange = 7;
let chartLibraryPromise = null;
let chartsInitialized = false;

const CHART_JS_SRC = 'https://cdn.jsdelivr.net/npm/chart.js';
const PET_PLACEHOLDER_SRC = 'pet_placeholder.svg';

const PET_FRAMES = {
    hungry: 'dog_animation/dog_sad.gif',
    low: 'dog_animation/dog_idle.gif',
    mid: 'dog_animation/dog_walk.gif',
    balanced: 'dog_animation/dog_happy.gif',
    full: 'dog_animation/dog_fat.gif',
    eating: 'dog_animation/dog_eat.gif'
};

function loadChartLibrary() {
    if (typeof globalThis.Chart === 'function') {
        return Promise.resolve(globalThis.Chart);
    }

    if (chartLibraryPromise) {
        return chartLibraryPromise;
    }

    chartLibraryPromise = new Promise((resolve, reject) => {
        let script = document.querySelector('script[data-chartjs-loader="true"]');

        const cleanupListeners = () => {
            script?.removeEventListener('load', handleLoad);
            script?.removeEventListener('error', handleError);
        };

        const handleLoad = () => {
            cleanupListeners();
            if (typeof globalThis.Chart === 'function') {
                resolve(globalThis.Chart);
                return;
            }
            chartLibraryPromise = null;
            reject(new Error('Chart.js loaded without exposing Chart.'));
        };

        const handleError = () => {
            cleanupListeners();
            chartLibraryPromise = null;
            reject(new Error('Chart.js failed to load.'));
        };

        if (!script) {
            script = document.createElement('script');
            script.src = CHART_JS_SRC;
            script.async = true;
            script.dataset.chartjsLoader = 'true';
            document.head.appendChild(script);
        }

        if (typeof globalThis.Chart === 'function') {
            handleLoad();
            return;
        }

        script.addEventListener('load', handleLoad);
        script.addEventListener('error', handleError);
    });

    return chartLibraryPromise;
}

function afterNextPaint(callback) {
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(callback);
        });
        return;
    }
    setTimeout(callback, 0);
}

function setPetFrame(petImg, frame, options = {}) {
    if (!petImg) return;

    const applyFrame = () => {
        petImg.onerror = () => {
            petImg.onerror = null;
            petImg.src = PET_FRAMES.low;
            petImg.dataset.petReady = 'true';
        };
        petImg.src = frame;
        petImg.dataset.petReady = 'true';
    };

    if (options.defer && petImg.dataset.petReady !== 'true') {
        afterNextPaint(applyFrame);
        return;
    }

    applyFrame();
}

async function ensureDashboardChartsReady() {
    try {
        await initCharts();
        const total = {
            pro: parseFloat(document.getElementById('sum-protein')?.innerText) || 0,
            fat: parseFloat(document.getElementById('sum-fat')?.innerText) || 0,
            carb: parseFloat(document.getElementById('sum-carb')?.innerText) || 0
        };
        updateCharts(total);
        updateWeightChart();
        updateTrendCharts(dashboardChartRange);
    } catch (error) {
        console.error('Dashboard chart initialization failed.', error);
    }
}

function roundValue(value, digits = 1) {
    const factor = 10 ** digits;
    return Math.round((Number(value) || 0) * factor) / factor;
}

function getDailySummaryStrings(progressPercent, remainingCalories) {
    const extra = getExtraUiText(curLang);

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

function updateDailySummaryCard(total, waterTarget) {
    const displayedTarget = Number(document.getElementById('target-cal-display')?.innerText);
    const target = Number.isFinite(displayedTarget) && displayedTarget > 0
        ? displayedTarget
        : (Number(targetCalories) || 0);
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

function getWeeklyCalories() {
    const history = getCalorieHistory(7);
    return {
        labels: history.map((item) => item.date),
        data: history.map((item) => item.calories)
    };
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

function renderCoachCard(total, target, calorieHistory) {
    const card = document.getElementById('daily-coach-card');
    if (!card) return;

    const coach = buildDailyCoaching({
        total,
        targetCalories: target,
        calorieHistory,
        goalType: currentGoalType,
        weightKg: parseFloat(document.getElementById('weight')?.value) || 0
    });
    const content = buildCoachContent(coach, curLang);
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
    }
}

export function setChartRange(days) {
    dashboardChartRange = days;
    const btn7 = document.getElementById('btn-chart-7d');
    const btn30 = document.getElementById('btn-chart-30d');

    if (btn7 && btn30) {
        btn7.classList.toggle('active-range', days === 7);
        btn30.classList.toggle('active-range', days === 30);
    }

    updateTrendCharts(days);
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

    const ChartConstructor = await loadChartLibrary();
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

export function updateTrendCharts(days) {
    const calorieHistory = getCalorieHistory(days);
    const proteinHistory = getProteinHistory(days);

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

export function updatePetStatus(currentCal) {
    const target = Number(targetCalories) || 2000;
    const totalCalories = typeof currentCal === 'object'
        ? Number(currentCal?.cal) || 0
        : Number(currentCal) || 0;
    const ratio = Math.min(totalCalories / target, 1.4);
    const petImg = document.getElementById('pet-img');
    const petMsg = document.getElementById('pet-msg');
    const t = getTexts();

    if (!petImg || !petMsg) return;

    let frame = PET_FRAMES.hungry;
    let message = t.petMsg1 || 'Hungry...';

    if (ratio >= 1.1) {
        frame = PET_FRAMES.full;
        message = t.petMsg5 || 'Too full!';
    } else if (ratio >= 0.85) {
        frame = PET_FRAMES.balanced;
        message = t.petMsg4 || 'Nice balance!';
    } else if (ratio >= 0.55) {
        frame = PET_FRAMES.mid;
        message = t.petMsg3 || 'Looking for food...';
    } else if (ratio >= 0.25) {
        frame = PET_FRAMES.low;
        message = t.petMsg2 || 'Getting better...';
    }

    setPetFrame(petImg, frame, {
        defer: petImg.getAttribute('src') === PET_PLACEHOLDER_SRC
    });
    petMsg.innerText = message;
}

export function showEatingAnimation() {
    const petImg = document.getElementById('pet-img');
    const petMsg = document.getElementById('pet-msg');
    const t = getTexts();
    if (!petImg || !petMsg) return;

    clearTimeout(petTimeout);
    const previousSrc = petImg.src;
    const previousMsg = petMsg.innerText;

    setPetFrame(petImg, PET_FRAMES.eating);
    petMsg.innerText = t.petEatMsg || 'Nom nom...';

    petTimeout = setTimeout(() => {
        petImg.src = previousSrc;
        petMsg.innerText = previousMsg;
    }, 1400);
}

export function petInteraction() {
    const petMsg = document.getElementById('pet-msg');
    if (!petMsg) return;
    const t = getTexts();
    const displayedTarget = Number(document.getElementById('target-cal-display')?.innerText);
    const target = Number.isFinite(displayedTarget) && displayedTarget > 0
        ? displayedTarget
        : (Number(targetCalories) || 0);
    const total = {
        cal: Number(document.getElementById('total-cal-display')?.innerText) || 0,
        pro: Number(document.getElementById('sum-protein')?.innerText) || 0,
        fiber: Number(document.getElementById('sum-fiber')?.innerText) || 0,
        sod: Number(document.getElementById('sum-sodium')?.innerText) || 0
    };
    const coach = buildDailyCoaching({
        total,
        targetCalories: target,
        calorieHistory: getCalorieHistory(7),
        goalType: currentGoalType,
        weightKg: parseFloat(document.getElementById('weight')?.value) || 0
    });
    const coachTips = buildCoachContent(coach, curLang).tips;
    const messages = [
        ...coachTips,
        t.petInteractMsg1,
        t.petInteractMsg2,
        t.petInteractMsg3,
        t.petInteractMsg4,
        t.petInteractMsg5
    ].filter(Boolean);

    if (messages.length === 0) return;
    petMsg.innerText = messages[Math.floor(Math.random() * messages.length)];
}

export function openDailySummaryDetails() {
    const t = getTexts();
    const extra = getExtraUiText(curLang);
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
        : (Number(targetCalories) || 0);
    const remaining = target > 0 ? Math.round(target - totalCal) : 0;
    const currentDate = document.getElementById('current-date')?.value;
    const dateText = getDisplayDateLabel(currentDate, curLang);

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

export function updateCharts(totalNutri) {
    if (!macroChart) return;

    const protein = Number(totalNutri.pro) || 0;
    const fat = Number(totalNutri.fat) || 0;
    const carb = Number(totalNutri.carb) || 0;
    const sum = protein + fat + carb;

    macroChart.data.datasets[0].data = sum === 0 ? [1, 1, 1] : [protein, fat, carb];
    macroChart.data.datasets[0].backgroundColor = sum === 0
        ? ['#e0e0e0', '#e0e0e0', '#e0e0e0']
        : ['#55efc4', '#ffeaa7', '#74b9ff'];
    macroChart.update();

    const weeklyData = getWeeklyCalories();
    if (weeklyChart) {
        weeklyChart.data.labels = weeklyData.labels;
        weeklyChart.data.datasets[0].data = weeklyData.data;
        weeklyChart.update();
    }
}

export function updateWeightChart() {
    if (!weightChart) return;
    const history = getWeightHistory(30);
    weightChart.data.labels = history.map((item) => item.date);
    weightChart.data.datasets[0].data = history.map((item) => item.weight);
    weightChart.update();
}

export function renderListAndStats() {
    const t = getTexts();
    const extra = getExtraUiText(curLang);

    ['breakfast', 'lunch', 'dinner', 'snack'].forEach((type) => {
        clearElement(document.getElementById(`list-${type}`));
    });

    const { totals: total, mealTotals } = summarizeNutrition(foodItems);

    foodItems.forEach((item, index) => {
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

    Object.keys(mealTotals).forEach((type) => {
        const el = document.getElementById(`prog-${type}`);
        if (el) el.innerText = `${Math.round(mealTotals[type])} kcal`;
    });

    document.getElementById('total-cal-display').innerText = Math.round(total.cal);
    document.getElementById('sum-protein').innerText = roundValue(total.pro).toFixed(1);
    document.getElementById('sum-fat').innerText = roundValue(total.fat).toFixed(1);
    document.getElementById('sum-carb').innerText = roundValue(total.carb).toFixed(1);
    document.getElementById('sum-sugar').innerText = roundValue(total.sugar).toFixed(1);
    document.getElementById('sum-sodium').innerText = Math.round(total.sod);
    document.getElementById('sum-sat-fat').innerText = roundValue(total.sat).toFixed(1);
    document.getElementById('sum-trans-fat').innerText = roundValue(total.trans).toFixed(1);
    document.getElementById('sum-fiber').innerText = roundValue(total.fiber).toFixed(1);

    const weight = parseFloat(document.getElementById('weight')?.value) || 60;
    const waterTarget = Math.round(weight * 35);
    document.getElementById('water-val').innerText = waterTarget;

    const emptyState = document.getElementById('daily-empty-state');
    if (emptyState) emptyState.hidden = foodItems.length > 0;

    const displayedTarget = Number(document.getElementById('target-cal-display')?.innerText);
    const target = Number.isFinite(displayedTarget) && displayedTarget > 0
        ? displayedTarget
        : (Number(targetCalories) || 0);
    renderCoachCard(total, target, getCalorieHistory(7));

    updateCharts(total);
    updatePetStatus(total);
    updateDailySummaryCard(total, waterTarget);
}

export function updateMacroChartLanguage(translations) {
    if (!macroChart) return;
    macroChart.data.labels = [translations.pro, translations.fat, translations.carb];
    macroChart.update();
}

export {
    macroChart,
    weeklyChart,
    weightChart,
    calTrendChart,
    proteinTrendChart,
    petTimeout,
    dashboardChartRange
};
