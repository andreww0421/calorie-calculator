import {
    foodItems,
    targetCalories,
    curLang,
    getWeightHistory,
    getCalorieHistory,
    getProteinHistory
} from '../data.js';
import { createElement, clearElement } from './dom-ui.js';
import { getTexts, uiActions } from './shared-ui.js';
import { showDailyNutritionSummary, showDetailModal } from './detail-ui.js';

let macroChart = null;
let weeklyChart = null;
let weightChart = null;
let calTrendChart = null;
let proteinTrendChart = null;
let petTimeout = null;
let dashboardChartRange = 7;

const PET_FRAMES = {
    hungry: 'dog_animation/dog_sad.gif',
    low: 'dog_animation/dog_idle.gif',
    mid: 'dog_animation/dog_walk.gif',
    balanced: 'dog_animation/dog_happy.gif',
    full: 'dog_animation/dog_fat.gif',
    eating: 'dog_animation/dog_eat.gif'
};

function roundValue(value, digits = 1) {
    const factor = 10 ** digits;
    return Math.round((Number(value) || 0) * factor) / factor;
}

function getDailySummaryStrings(progressPercent, remainingCalories) {
    const isEnglish = curLang === 'en';

    if (progressPercent >= 110) {
        return {
            progress: `${Math.round(progressPercent)}%`,
            status: isEnglish
                ? `${Math.abs(remainingCalories)} kcal over target`
                : `已超過目標 ${Math.abs(remainingCalories)} kcal`
        };
    }

    if (progressPercent >= 85) {
        return {
            progress: `${Math.round(progressPercent)}%`,
            status: isEnglish
                ? `${Math.max(remainingCalories, 0)} kcal left to goal`
                : `快達標了，還差 ${Math.max(remainingCalories, 0)} kcal`
        };
    }

    if (progressPercent > 0) {
        return {
            progress: `${Math.round(progressPercent)}%`,
            status: isEnglish
                ? `${Math.max(remainingCalories, 0)} kcal left today`
                : `目前還差 ${Math.max(remainingCalories, 0)} kcal`
        };
    }

    return {
        progress: '0%',
        status: isEnglish ? 'Start logging today\'s meals' : '開始記錄今天的飲食吧'
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
    if (statusEl) statusEl.innerText = copy.status;

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
        const total = {
            pro: parseFloat(document.getElementById('sum-protein')?.innerText) || 0,
            fat: parseFloat(document.getElementById('sum-fat')?.innerText) || 0,
            carb: parseFloat(document.getElementById('sum-carb')?.innerText) || 0
        };
        updateCharts(total);
        updateWeightChart();
        updateTrendCharts(dashboardChartRange);
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

export function initCharts() {
    const t = getTexts();
    const macroCanvas = document.getElementById('macroChart');
    const weeklyCanvas = document.getElementById('weeklyChart');
    const calTrendCanvas = document.getElementById('calTrendChart');
    const proteinTrendCanvas = document.getElementById('proteinTrendChart');
    const weightCanvas = document.getElementById('weightChart');

    if (!macroCanvas || !weeklyCanvas || !calTrendCanvas || !proteinTrendCanvas || !weightCanvas) {
        return;
    }

    macroChart = new Chart(macroCanvas.getContext('2d'), {
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
    weeklyChart = new Chart(weeklyCanvas.getContext('2d'), {
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

    calTrendChart = new Chart(calTrendCanvas.getContext('2d'), {
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

    proteinTrendChart = new Chart(proteinTrendCanvas.getContext('2d'), {
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

    weightChart = new Chart(weightCanvas.getContext('2d'), {
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

    updateTrendCharts(dashboardChartRange);
    updateWeightChart();
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
    const ratio = Math.min(currentCal / target, 1.4);
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

    petImg.onerror = () => {
        petImg.onerror = null;
        petImg.src = PET_FRAMES.low;
    };
    petImg.src = frame;
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

    petImg.onerror = () => {
        petImg.onerror = null;
        petImg.src = PET_FRAMES.low;
    };
    petImg.src = PET_FRAMES.eating;
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
    const messages = [
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
    const isEnglish = curLang === 'en';
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
    const dateText = document.getElementById('display-date-text')?.innerText || 'Today';

    showDailyNutritionSummary({
        title: isEnglish ? `${dateText} Nutrition Summary` : `${dateText} 營養總覽`,
        goalLabel: t.goal || 'Goal',
        goalValue: target > 0 ? `${target} kcal` : '--',
        remainingLabel: isEnglish ? 'Remaining' : '剩餘熱量',
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
    ['breakfast', 'lunch', 'dinner', 'snack'].forEach((type) => {
        clearElement(document.getElementById(`list-${type}`));
    });

    const total = { cal: 0, pro: 0, fat: 0, carb: 0, sugar: 0, sod: 0, sat: 0, trans: 0, fiber: 0 };
    const mealTotals = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };

    foodItems.forEach((item, index) => {
        const n = item.nutri || {};
        total.cal += Number(n.calories) || 0;
        total.pro += Number(n.protein) || 0;
        total.fat += Number(n.fat) || 0;
        total.carb += Number(n.carbohydrate) || 0;
        total.sugar += Number(n.sugar) || 0;
        total.sod += Number(n.sodium) || 0;
        total.sat += Number(n.saturatedFat) || 0;
        total.trans += Number(n.transFat) || 0;
        total.fiber += Number(n.fiber) || 0;

        if (mealTotals[item.type] !== undefined) {
            mealTotals[item.type] += Number(n.calories) || 0;
        }

        const info = createElement('div', {
            className: 'food-info',
            style: { cursor: 'pointer' }
        });
        info.addEventListener('click', () => showDetailModal(index));
        info.appendChild(createElement('div', { className: 'name', text: item.name || '--' }));
        info.appendChild(createElement('div', {
            className: 'detail',
            text: `Cal ${Math.round(n.calories || 0)} | P:${n.protein || 0} F:${n.fat || 0} C:${n.carbohydrate || 0}`
        }));

        const actionWrap = createElement('div', {
            style: { display: 'flex', gap: '5px' }
        });

        const favBtn = createElement('button', {
            className: 'btn-delete',
            text: 'Save',
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

    updateCharts(total);
    updatePetStatus(total.cal);
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
