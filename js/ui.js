import { i18n } from './config.js';
import {
    targetCalories,
    tempAIResult,
    foodItems,
    favoriteFoods,
    curLang,
    curTheme,
    currentMealMode,
    setTempAIResult,
    setCurTheme,
    setCurLang,
    getWeightHistory,
    getCalorieHistory,
    getProteinHistory,
    setTempAIResultSaved
} from './data.js';
import { recalculateFromItems } from './api.js';
import { getLocalDateString, getMonthDayLabel, safeParseJSON, escapeHTML } from './utils.js';
import { confirmAddFood, deleteItem, addRecordToFav } from './app.js';

export function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

let macroChart = null;
let weeklyChart = null;
let weightChart = null;
let calTrendChart = null;
let proteinTrendChart = null;
let petTimeout = null;
let dashboardChartRange = 7;

function getTexts() {
    return i18n[curLang] || i18n['zh-TW'];
}

function formatAIRequestError(error, t) {
    const rawMessage = error?.message || String(error);

    if (rawMessage === 'Turnstile_Pending') {
        return t.turnstilePending || 'Security verification is in progress. Please try again in a moment.';
    }

    const parsed = safeParseJSON(rawMessage, null);
    const payload = parsed?.error || parsed;
    if (payload?.message) return payload.message;

    return `${t.alertAiFail || 'AI analysis failed: '}${rawMessage}`;
}

function collectAIItemsFromDOM() {
    const rows = document.querySelectorAll('#ai-items-container .ai-item-row');
    const items = [];

    rows.forEach(row => {
        const name = row.querySelector('.ai-item-name')?.value.trim() || '';
        const weight = row.querySelector('.ai-item-weight')?.value.trim() || '';
        if (name) items.push({ name, weight });
    });

    return items;
}

function renderAIItemEditor(item, index) {
    return `
        <div class="ai-item-row" data-idx="${index}">
            <input type="text" class="ai-item-name" value="${escapeHTML(item?.name || '')}" style="flex:2;">
            <input type="text" class="ai-item-weight" value="${escapeHTML(item?.weight || '')}" style="flex:1;">
            <button class="btn-delete" onclick="removeAIItem(${index})" style="flex:0;">X</button>
        </div>
    `;
}

function renderAIItemSummary(item, fallbackText) {
    return `
        <div style="padding:4px 0; display:flex; justify-content:space-between;">
            <span>${escapeHTML(item?.name || fallbackText)}</span>
            <span style="opacity:0.7;">${escapeHTML(item?.weight || fallbackText)}</span>
        </div>
    `;
}

function getWeeklyCalories() {
    const labels = [];
    const data = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = getLocalDateString(d);
        const stored = localStorage.getItem(`record_${dateStr}`);
        const dayItems = safeParseJSON(stored, []);
        let dayCal = 0;

        dayItems.forEach(item => {
            dayCal += Number(item?.nutri?.calories) || 0;
        });

        labels.push(getMonthDayLabel(d));
        data.push(Math.round(dayCal));
    }

    return { labels, data };
}

function switchView(targetId) {
    document.querySelectorAll('.view-section').forEach(view => {
        view.classList.remove('active-view');
        view.classList.add('hidden');
    });

    const targetView = document.getElementById(targetId);
    if (targetView) {
        targetView.classList.remove('hidden');
        targetView.classList.add('active-view');
    }

    document.querySelectorAll('.nav-item').forEach(nav => {
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

function setChartRange(days) {
    dashboardChartRange = days;
    const btn7 = document.getElementById('btn-chart-7d');
    const btn30 = document.getElementById('btn-chart-30d');

    if (btn7 && btn30) {
        btn7.classList.toggle('active-range', days === 7);
        btn30.classList.toggle('active-range', days === 30);
    }

    updateTrendCharts(days);
}

function initCharts() {
    const t = getTexts();

    macroChart = new Chart(document.getElementById('macroChart').getContext('2d'), {
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
            cutout: '70%',
            plugins: { legend: { position: 'bottom' } }
        }
    });

    const weeklyData = getWeeklyCalories();
    weeklyChart = new Chart(document.getElementById('weeklyChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: weeklyData.labels,
            datasets: [{
                label: 'kcal',
                data: weeklyData.data,
                backgroundColor: '#2ecc71',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, suggestedMax: 1000 } }
        }
    });

    weightChart = new Chart(document.getElementById('weightChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Weight (kg)',
                data: [],
                borderColor: '#6c5ce7',
                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#6c5ce7',
                pointRadius: 4,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: false } }
        }
    });

    const calTrendCanvas = document.getElementById('calTrendChart');
    if (calTrendCanvas) {
        calTrendChart = new Chart(calTrendCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: t.cal || 'Calories',
                        data: [],
                        borderColor: '#e17055',
                        backgroundColor: 'rgba(225, 112, 85, 0.1)',
                        borderWidth: 2,
                        pointRadius: 3,
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: t.chartTdeeTarget || 'TDEE',
                        data: [],
                        borderColor: '#636e72',
                        borderWidth: 2,
                        borderDash: [6, 4],
                        pointRadius: 0,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    const proteinTrendCanvas = document.getElementById('proteinTrendChart');
    if (proteinTrendCanvas) {
        proteinTrendChart = new Chart(proteinTrendCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: t.pro || 'Protein',
                    data: [],
                    backgroundColor: 'rgba(255, 118, 117, 0.7)',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    updateChartTheme(curTheme);
}

function updateTrendCharts(days) {
    if (calTrendChart) {
        const calHist = getCalorieHistory(days);
        const tdeeTarget = targetCalories > 0 ? targetCalories : 2000;
        calTrendChart.data.labels = calHist.map(item => item.date);
        calTrendChart.data.datasets[0].data = calHist.map(item => item.calories);
        calTrendChart.data.datasets[1].data = calHist.map(() => tdeeTarget);
        calTrendChart.update();
    }

    if (proteinTrendChart) {
        const proteinHist = getProteinHistory(days);
        proteinTrendChart.data.labels = proteinHist.map(item => item.date);
        proteinTrendChart.data.datasets[0].data = proteinHist.map(item => item.protein);
        proteinTrendChart.update();
    }
}

function updateChartTheme(theme) {
    const textColor = theme === 'dark' ? '#e0e0e0' : '#2c3e50';
    const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    Chart.defaults.color = textColor;

    [weeklyChart, weightChart, calTrendChart, proteinTrendChart].forEach(chart => {
        if (!chart?.options?.scales) return;
        if (chart.options.scales.x) chart.options.scales.x.ticks.color = textColor;
        if (chart.options.scales.y) {
            chart.options.scales.y.ticks.color = textColor;
            chart.options.scales.y.grid.color = gridColor;
        }
        chart.update();
    });

    if (macroChart) {
        macroChart.options.plugins.legend.labels.color = textColor;
        macroChart.update();
    }
}

function updatePetStatus(currentCal) {
    const petImg = document.getElementById('pet-img');
    const petMsg = document.getElementById('pet-msg');
    if (!petImg || !petMsg) return;
    if (petImg.dataset.animating === 'true') return;

    const t = getTexts();
    const target = targetCalories > 0 ? targetCalories : 2000;
    const ratio = currentCal / target;

    let src = 'dog_animation/dog_idle.gif';
    let msg = t.petMsg1 || 'Woof!';

    if (currentCal === 0) {
        src = 'dog_animation/dog_sad.gif';
        msg = t.petMsg1 || 'Woof... So hungry...';
    } else if (ratio < 0.3) {
        src = 'dog_animation/dog_idle.gif';
        msg = t.petMsg2 || 'Need more energy...';
    } else if (ratio < 0.5) {
        src = 'dog_animation/dog_walk.gif';
        msg = t.petMsg3 || 'Looking for food...';
    } else if (ratio <= 1.1) {
        src = 'dog_animation/dog_happy.gif';
        msg = t.petMsg4 || 'Perfect nutrition!';
    } else {
        src = 'dog_animation/dog_fat.gif';
        msg = t.petMsg5 || 'Ate too much!';
    }

    if (!petImg.src.includes(src)) petImg.src = src;
    petMsg.innerText = msg;
}

function showEatingAnimation() {
    const petImg = document.getElementById('pet-img');
    const petMsg = document.getElementById('pet-msg');
    if (!petImg || !petMsg) return;

    const t = getTexts();
    petImg.dataset.animating = 'true';
    petImg.src = 'dog_animation/dog_eat.gif';
    petMsg.innerText = t.petEatMsg || 'Nom nom...';

    if (petTimeout) clearTimeout(petTimeout);
    petTimeout = setTimeout(() => {
        petImg.dataset.animating = 'false';
        const currentCal = parseFloat(document.getElementById('total-cal-display')?.innerText) || 0;
        updatePetStatus(currentCal);
    }, 3000);
}

function petInteraction() {
    const petMsg = document.getElementById('pet-msg');
    if (!petMsg) return;

    const t = getTexts();
    const messages = [
        t.petInteractMsg1 || 'Drank water today?',
        t.petInteractMsg2 || 'Let us stay healthy together!',
        t.petInteractMsg3 || 'I love healthy food!',
        t.petInteractMsg4 || 'Go exercise! XD',
        t.petInteractMsg5 || 'Remember to chew slowly!'
    ];
    petMsg.innerText = messages[Math.floor(Math.random() * messages.length)];
}

function updateCharts(totalNutri) {
    const hasData = totalNutri.pro > 0 || totalNutri.fat > 0 || totalNutri.carb > 0;

    if (macroChart) {
        if (hasData) {
            macroChart.data.datasets[0].data = [
                Math.round(totalNutri.pro),
                Math.round(totalNutri.fat),
                Math.round(totalNutri.carb)
            ];
            macroChart.data.datasets[0].backgroundColor = ['#ff7675', '#fdcb6e', '#74b9ff'];
        } else {
            macroChart.data.datasets[0].data = [1, 1, 1];
            macroChart.data.datasets[0].backgroundColor = ['#e0e0e0', '#e0e0e0', '#e0e0e0'];
        }
        macroChart.update();
    }

    if (weeklyChart) {
        const weeklyData = getWeeklyCalories();
        weeklyChart.data.labels = weeklyData.labels;
        weeklyChart.data.datasets[0].data = weeklyData.data;
        weeklyChart.update();
    }
}

function updateWeightChart() {
    if (!weightChart) return;

    const history = getWeightHistory(30);
    const labels = [];
    const data = [];

    history.forEach(item => {
        if (item.weight !== null) {
            labels.push(item.date);
            data.push(item.weight);
        }
    });

    weightChart.data.labels = labels;
    weightChart.data.datasets[0].data = data;

    if (data.length > 0) {
        const minW = Math.min(...data);
        const maxW = Math.max(...data);
        weightChart.options.scales.y.min = Math.max(0, Math.floor(minW - 2));
        weightChart.options.scales.y.max = Math.ceil(maxW + 2);
    }

    weightChart.update();
}

function renderListAndStats() {
    ['breakfast', 'lunch', 'dinner', 'snack'].forEach(type => {
        const el = document.getElementById(`list-${type}`);
        if (el) el.innerHTML = '';
    });

    const total = { cal: 0, pro: 0, fat: 0, carb: 0, sugar: 0, sod: 0, sat: 0, trans: 0 };
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

        if (mealTotals[item.type] !== undefined) {
            mealTotals[item.type] += Number(n.calories) || 0;
        }

        const li = document.createElement('li');

        const info = document.createElement('div');
        info.className = 'food-info';
        info.style.cursor = 'pointer';
        info.addEventListener('click', () => showDetailModal(index));

        const nameEl = document.createElement('div');
        nameEl.className = 'name';
        nameEl.textContent = item.name || '--';

        const detailEl = document.createElement('div');
        detailEl.className = 'detail';
        detailEl.textContent = `🔥${Math.round(n.calories || 0)} | P:${n.protein || 0} F:${n.fat || 0} C:${n.carbohydrate || 0}`;

        const actionWrap = document.createElement('div');
        actionWrap.style.display = 'flex';
        actionWrap.style.gap = '5px';

        const favBtn = document.createElement('button');
        favBtn.className = 'btn-delete';
        favBtn.style.backgroundColor = '#ff7675';
        favBtn.textContent = '❤';
        favBtn.addEventListener('click', () => addRecordToFav(index));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => deleteItem(index));

        info.appendChild(nameEl);
        info.appendChild(detailEl);
        actionWrap.appendChild(favBtn);
        actionWrap.appendChild(deleteBtn);
        li.appendChild(info);
        li.appendChild(actionWrap);

        const listEl = document.getElementById(`list-${item.type}`);
        if (listEl) listEl.appendChild(li);
    });

    Object.keys(mealTotals).forEach(type => {
        const el = document.getElementById(`prog-${type}`);
        if (el) el.innerText = `${Math.round(mealTotals[type])} kcal`;
    });

    document.getElementById('total-cal-display').innerText = Math.round(total.cal);
    document.getElementById('sum-protein').innerText = total.pro.toFixed(1);
    document.getElementById('sum-fat').innerText = total.fat.toFixed(1);
    document.getElementById('sum-carb').innerText = total.carb.toFixed(1);
    document.getElementById('sum-sugar').innerText = total.sugar.toFixed(1);
    document.getElementById('sum-sodium').innerText = Math.round(total.sod);
    document.getElementById('sum-sat-fat').innerText = total.sat.toFixed(1);
    document.getElementById('sum-trans-fat').innerText = total.trans.toFixed(1);

    const weight = parseFloat(document.getElementById('weight')?.value) || 60;
    document.getElementById('water-val').innerText = Math.round(weight * 35);

    updateCharts(total);
    updatePetStatus(total.cal);
}

function updateMealUI() {
    const t = getTexts();
    const m = t.meals || {};
    const configs = {
        '4': {
            sections: ['breakfast', 'lunch', 'dinner', 'snack'],
            titles: { breakfast: m.breakfast, lunch: m.lunch, dinner: m.dinner, snack: m.snack },
            ratios: { breakfast: 0.25, lunch: 0.35, dinner: 0.30, snack: 0.10 }
        },
        '3': {
            sections: ['breakfast', 'lunch', 'dinner'],
            titles: { breakfast: m.breakfast, lunch: m.lunch, dinner: m.dinner },
            ratios: { breakfast: 0.30, lunch: 0.40, dinner: 0.30 }
        },
        '2': {
            sections: ['lunch', 'dinner'],
            titles: { lunch: m.meal1, dinner: m.meal2 },
            ratios: { lunch: 0.50, dinner: 0.50 }
        },
        '1': {
            sections: ['dinner'],
            titles: { dinner: m.mealBig },
            ratios: { dinner: 1.0 }
        }
    };

    const config = configs[currentMealMode];
    const container = document.getElementById('meal-sections-container');
    const manualSelect = document.getElementById('manual-type');
    const modalBtns = document.getElementById('modal-meal-buttons');
    if (!container || !manualSelect || !modalBtns || !config) return;

    container.innerHTML = '';
    manualSelect.innerHTML = '';
    modalBtns.innerHTML = '';

    config.sections.forEach(type => {
        const suggested = targetCalories > 0 ? Math.round(targetCalories * config.ratios[type]) : 0;
        const section = document.createElement('div');
        section.className = 'meal-section';
        section.innerHTML = `
            <div class="meal-header">
                <div>
                    <span class="meal-title">${config.titles[type]}</span>
                    <span class="meal-goal">(<span class="txt-suggest">${t.suggest}</span>: <span id="goal-${type}">${suggested}</span>)</span>
                </div>
                <div class="meal-progress" id="prog-${type}">0 kcal</div>
            </div>
            <ul class="meal-list" id="list-${type}"></ul>
        `;
        container.appendChild(section);

        const option = document.createElement('option');
        option.value = type;
        option.text = config.titles[type];
        manualSelect.appendChild(option);

        const btn = document.createElement('button');
        btn.className = `meal-btn ${type}`;
        btn.innerText = config.titles[type];
        btn.onclick = () => confirmAddFood(type);
        modalBtns.appendChild(btn);
    });
}

function toggleTheme() {
    setTheme(curTheme === 'light' ? 'dark' : 'light');
}

function setTheme(theme) {
    setCurTheme(theme);
    localStorage.setItem('appTheme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    updateChartTheme(theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#121212' : '#f0f2f5');
    }
}

function openLangModal() {
    const modal = document.getElementById('lang-modal');
    if (modal) modal.style.display = 'flex';
    toggleFabMenu();
}

function setLang(lang) {
    setCurLang(lang);
    localStorage.setItem('appLang', lang);

    const t = i18n[lang] || i18n['zh-TW'];
    document.title = t.appTitle || 'Woof Cal';

    const mapping = {
        'txt-date-label': t.dateLabel,
        'txt-total-intake': t.totalIntake,
        'txt-kcal-unit': 'kcal',
        'lbl-pro': t.pro,
        'lbl-fat': t.fat,
        'lbl-carb': t.carb,
        'lbl-sugar': t.sugar,
        'lbl-sod': t.sod,
        'lbl-sat': t.sat,
        'lbl-trans': t.trans,
        'lbl-water': t.water,
        'txt-chart-title': t.chartTitle,
        'txt-ai-title': t.aiTitle,
        'btn-take-photo': t.btnPhoto,
        'txt-analyze-btn': t.btnAnalyze,
        'txt-ai-loading': t.aiLoading,
        'txt-record-title': t.txtRecordTitle || t.recordTitle,
        'txt-manual-label': t.txtManualLabel || t.manualLabel,
        'btn-add-record': t.btnAddRecord || t.btnAdd,
        'btn-fav-save': t.btnFavSave,
        'btn-fav-load': t.btnFavLoad,
        'btn-fav-ai': t.btnFavAi,
        'txt-settings-title': t.settingsTitle,
        'lbl-gender': t.gender,
        'opt-male': t.male,
        'opt-female': t.female,
        'lbl-age': t.age,
        'lbl-height': t.height,
        'lbl-weight': t.txtWeightSettingsTitle || t.weight,
        'lbl-activity': t.activity,
        'opt-act-1': t.act1,
        'opt-act-2': t.act2,
        'opt-act-3': t.act3,
        'opt-act-4': t.act4,
        'lbl-meal-mode': t.mealMode,
        'opt-mode-4': t.mode4,
        'opt-mode-3': t.mode3,
        'opt-mode-2': t.mode2,
        'opt-mode-1': t.mode1,
        'btn-calc': t.btnCalc,
        'txt-res-tdee': t.resTdee,
        'txt-res-target': t.resTarget,
        'txt-modal-title': t.modalTitle,
        'txt-modal-ask': t.modalAsk,
        'btn-cancel': t.btnCancel,
        'txt-fav-title': t.favTitle,
        'btn-fav-close': t.btnClose,
        'menu-import-setting': t.menuImport,
        'menu-export-setting': t.menuExport,
        'menu-theme-setting': t.menuTheme,
        'menu-lang-setting': t.menuLang,
        'txt-lang-title': t.langTitle,
        'btn-lang-cancel': t.langCancel,
        'txt-weight-title': t.weightTitle,
        'btn-save-weight': t.btnSaveWeight,
        'txt-weight-chart-title': t.weightChartTitle,
        'txt-text-ai-label': t.textAiLabel,
        'txt-app-settings-title': t.appSettingsTitle,
        'nav-daily': t.navDaily,
        'nav-dashboard': t.navDashboard,
        'nav-settings': t.navSettings,
        'txt-target-cal-display-label': t.txtTargetCalDisplayUnit,
        'txt-tdee-unit': t.txtTdeeUnit,
        'txt-cal-trend-title': t.chartCalTrend,
        'txt-protein-trend-title': t.chartProteinTrend,
        'btn-chart-7d': t.chart7d,
        'btn-chart-30d': t.chart30d,
        'txt-detail-title': t.detailTitle,
        'btn-detail-close': t.btnDetailClose
    };

    Object.entries(mapping).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value;
    });

    const navAiBadge = document.querySelector('.nav-item.nav-ai .ai-badge');
    if (navAiBadge) navAiBadge.innerText = t.navAi || 'AI';

    const placeholders = {
        'manual-name': t.phFoodName || 'Food Name (Required)',
        'manual-cal': t.phFoodCal || 'Calories (kcal)',
        'ai-desc': t.aiDescPlaceholder,
        'daily-weight-input': t.weightInputPlaceholder,
        'ai-text-desc': t.textAiPlaceholder,
        'manual-pro': t.phPro,
        'manual-fat': t.phFat,
        'manual-carb': t.phCarb,
        'manual-sugar': t.phSugar,
        'manual-sod': t.phSod,
        'manual-sat': t.phSat,
        'manual-trans': t.phTrans
    };

    Object.entries(placeholders).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el && value) el.placeholder = value;
    });

    if (typeof updateProfileStats === 'function') updateProfileStats();
    updateMealUI();

    if (macroChart) {
        macroChart.data.labels = [t.pro, t.fat, t.carb];
        macroChart.update();
    }

    updatePetStatus(parseFloat(document.getElementById('total-cal-display')?.innerText) || 0);
}

function openFavModal() {
    const list = document.getElementById('fav-list-container');
    if (!list) return;

    const t = getTexts();
    list.innerHTML = '';

    if (favoriteFoods.length === 0) {
        const empty = document.createElement('p');
        empty.style.color = '#888';
        empty.style.textAlign = 'center';
        empty.textContent = `(${t.noData || 'Empty'})`;
        list.appendChild(empty);
    } else {
        favoriteFoods.forEach((item, index) => {
            const n = item.nutri || {};
            const cal = n.calories || item.cal || 0;
            const pro = n.protein || 0;
            const fat = n.fat || 0;
            const carb = n.carbohydrate || 0;

            const row = document.createElement('div');
            row.className = 'fav-item-row';

            const info = document.createElement('div');
            info.className = 'fav-item-name';
            info.style.cursor = 'pointer';
            info.addEventListener('click', () => showFavDetailModal(index));

            const nameEl = document.createElement('div');
            nameEl.textContent = item.name || '--';

            const detailEl = document.createElement('span');
            detailEl.style.fontSize = '0.85em';
            detailEl.style.opacity = '0.8';
            detailEl.style.display = 'block';
            detailEl.style.fontWeight = 'normal';
            detailEl.textContent = `🔥${cal} | P:${pro} F:${fat} C:${carb}`;

            const actions = document.createElement('div');
            actions.style.display = 'flex';
            actions.style.gap = '5px';

            const pickBtn = document.createElement('button');
            pickBtn.className = 'btn-delete';
            pickBtn.style.backgroundColor = '#0984e3';
            pickBtn.textContent = '↺';
            pickBtn.addEventListener('click', () => pickFav(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.textContent = 'X';
            deleteBtn.addEventListener('click', () => deleteFav(index));

            info.appendChild(nameEl);
            info.appendChild(detailEl);
            actions.appendChild(pickBtn);
            actions.appendChild(deleteBtn);
            row.appendChild(info);
            row.appendChild(actions);
            list.appendChild(row);
        });
    }

    document.getElementById('fav-modal').style.display = 'flex';
}

function pickFav(index) {
    const item = favoriteFoods[index];
    if (!item) return;

    document.getElementById('manual-name').value = item.name;

    if (item.nutri) {
        document.getElementById('manual-cal').value = item.nutri.calories;
        document.getElementById('manual-pro').value = item.nutri.protein || 0;
        document.getElementById('manual-fat').value = item.nutri.fat || 0;
        document.getElementById('manual-carb').value = item.nutri.carbohydrate || 0;
        document.getElementById('manual-sugar').value = item.nutri.sugar || 0;
        document.getElementById('manual-sod').value = item.nutri.sodium || 0;
        document.getElementById('manual-sat').value = item.nutri.saturatedFat || 0;
        document.getElementById('manual-trans').value = item.nutri.transFat || 0;
    } else {
        document.getElementById('manual-cal').value = item.cal;
    }

    closeModal('fav-modal');
}

function deleteFav(index) {
    const t = getTexts();
    if (confirm(t.alertDel || 'Delete this item?')) {
        favoriteFoods.splice(index, 1);
        localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
        openFavModal();
    }
}

function showModal() {
    const d = tempAIResult;
    if (!d) return;

    const t = getTexts();
    const n = d.nutri || {};
    const score = Number(d.healthScore) || 0;

    let scoreColor = '#e17055';
    if (score >= 7) scoreColor = '#2ecc71';
    else if (score >= 4) scoreColor = '#fdcb6e';

    const itemsHtml = Array.isArray(d.items)
        ? d.items.map((item, index) => renderAIItemEditor(item, index)).join('')
        : '';

    const content = `
        <div style="text-align:left;">
            <h3 style="margin:0 0 10px;">${escapeHTML(d.name || '--')}</h3>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                <span style="font-size:2em; font-weight:bold; color:${scoreColor};">${score}/10</span>
                <span style="opacity:0.8;">${t.healthScoreLabel || 'Health Score'}</span>
            </div>

            <div class="ai-nutri-grid">
                <div class="ai-nutri-item"><span class="ai-n-val">🔥 ${Number(n.calories) || 0}</span><span class="ai-n-lbl">${t.cal}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${Number(n.protein) || 0}g</span><span class="ai-n-lbl">${t.pro}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${Number(n.fat) || 0}g</span><span class="ai-n-lbl">${t.fat}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${Number(n.carbohydrate) || 0}g</span><span class="ai-n-lbl">${t.carb}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${Number(n.sugar) || 0}g</span><span class="ai-n-lbl">${t.sugar}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${Number(n.sodium) || 0}mg</span><span class="ai-n-lbl">${t.sod}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${Number(n.saturatedFat) || 0}g</span><span class="ai-n-lbl">${t.sat}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${Number(n.fiber) || 0}g</span><span class="ai-n-lbl">${t.fiber || 'Fiber'}</span></div>
            </div>

            <div style="margin-top:15px;">
                <strong>${t.aiItemsLabel || 'Estimated Food Items'}</strong>
                <div style="margin-top:5px; font-size:0.8em; opacity:0.6; margin-bottom:8px;">
                    ${t.itemName || 'Item'} / ${t.itemWeight || 'Weight'}
                </div>
                <div id="ai-items-container">${itemsHtml}</div>
                <button onclick="addAIItem()" style="margin-top:8px; padding:8px; font-size:13px; background:#74b9ff;">${t.addItem || 'Add Item'}</button>
                <button onclick="recalculateAI()" style="margin-top:8px; padding:8px; font-size:13px; background:#a29bfe;">${t.recalculate || 'Recalculate'}</button>
            </div>
        </div>
    `;

    document.getElementById('analysis-content').innerHTML = content;
    document.getElementById('analysis-modal').style.display = 'flex';

    const btnFavSave = document.getElementById('btn-ai-fav-save');
    const modalBtns = document.getElementById('modal-meal-buttons');
    if (btnFavSave) btnFavSave.style.display = '';
    if (modalBtns) modalBtns.style.display = '';
}

function addAIItem() {
    if (!tempAIResult) return;
    const nextItems = collectAIItemsFromDOM();
    nextItems.push({ name: '', weight: '' });
    setTempAIResult({ ...tempAIResult, items: nextItems });
    setTempAIResultSaved(false);
    showModal();
}

function removeAIItem(idx) {
    if (!tempAIResult?.items) return;
    const nextItems = tempAIResult.items.filter((_, index) => index !== idx);
    setTempAIResult({ ...tempAIResult, items: nextItems });
    setTempAIResultSaved(false);
    showModal();
}

async function recalculateAI() {
    if (!tempAIResult) return;

    const t = getTexts();
    const items = collectAIItemsFromDOM();
    if (items.length === 0) {
        showToast(t.aiItemsRequired || 'Please keep at least one item.', 'error');
        return;
    }

    setTempAIResult({ ...tempAIResult, items });
    setTempAIResultSaved(false);

    const btnFavSave = document.getElementById('btn-ai-fav-save');
    const modalBtns = document.getElementById('modal-meal-buttons');
    if (btnFavSave) btnFavSave.style.display = 'none';
    if (modalBtns) modalBtns.style.display = 'none';

    document.getElementById('analysis-content').innerHTML = `<div style="text-align:center; padding:30px;">${t.aiLoading || 'AI is analyzing...'}</div>`;

    try {
        const result = await recalculateFromItems(items);
        if (result) {
            setTempAIResult({
                name: result.foodName || tempAIResult.name,
                nutri: {
                    calories: Number(result.calories) || 0,
                    protein: Number(result.protein) || 0,
                    fat: Number(result.fat) || 0,
                    carbohydrate: Number(result.carbohydrate) || 0,
                    sugar: Number(result.sugar) || 0,
                    sodium: Number(result.sodium) || 0,
                    saturatedFat: Number(result.saturatedFat) || 0,
                    transFat: Number(result.transFat) || 0,
                    fiber: Number(result.fiber) || 0
                },
                items: Array.isArray(result.items) ? result.items : items,
                healthScore: Number(result.healthScore) || 0
            });
            setTempAIResultSaved(false);
        }
    } catch (error) {
        console.error(error);
        showToast(formatAIRequestError(error, t), 'error');
    }

    showModal();
}

function showDetailModal(index) {
    const item = foodItems[index];
    if (item) _renderDetailModal(item);
}

function showFavDetailModal(index) {
    const item = favoriteFoods[index];
    if (item) _renderDetailModal(item);
}

function _renderDetailModal(item) {
    const t = getTexts();
    const nd = t.noData || '--';
    const n = item.nutri || {};
    const valueOrFallback = value => (value !== undefined && value !== null ? value : nd);

    const score = item.healthScore || 0;
    let scoreColor = '#e17055';
    if (score >= 7) scoreColor = '#2ecc71';
    else if (score >= 4) scoreColor = '#fdcb6e';

    let itemsHtml = '';
    if (Array.isArray(item.items) && item.items.length > 0) {
        itemsHtml = item.items.map(it => renderAIItemSummary(it, nd)).join('');
    } else {
        itemsHtml = `<p style="opacity:0.5; text-align:center;">${escapeHTML(nd)}</p>`;
    }

    const content = `
        <div style="text-align:left;">
            <h3 style="margin:0 0 10px;">${escapeHTML(item.name || nd)}</h3>
            ${score > 0 ? `
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                    <span style="font-size:1.5em; font-weight:bold; color:${scoreColor};">${score}/10</span>
                    <span style="opacity:0.8;">${t.healthScoreLabel || 'Health Score'}</span>
                </div>
            ` : ''}

            <div class="ai-nutri-grid">
                <div class="ai-nutri-item"><span class="ai-n-val">🔥 ${valueOrFallback(n.calories)}</span><span class="ai-n-lbl">${t.cal}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${valueOrFallback(n.protein)}g</span><span class="ai-n-lbl">${t.pro}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${valueOrFallback(n.fat)}g</span><span class="ai-n-lbl">${t.fat}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${valueOrFallback(n.carbohydrate)}g</span><span class="ai-n-lbl">${t.carb}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${valueOrFallback(n.sugar)}g</span><span class="ai-n-lbl">${t.sugar}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${valueOrFallback(n.sodium)}mg</span><span class="ai-n-lbl">${t.sod}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${valueOrFallback(n.saturatedFat)}g</span><span class="ai-n-lbl">${t.sat}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${valueOrFallback(n.fiber)}g</span><span class="ai-n-lbl">${t.fiber || 'Fiber'}</span></div>
            </div>

            <div style="margin-top:15px;">
                <strong>${t.aiItemsLabel || 'Estimated Food Items'}</strong>
                <div style="margin-top:8px;">${itemsHtml}</div>
            </div>
        </div>
    `;

    document.getElementById('detail-content').innerHTML = content;
    document.getElementById('detail-modal').style.display = 'flex';
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
}

function toggleFabMenu() {
    const el = document.getElementById('fab-menu');
    if (el) el.classList.toggle('show');
}

window.showDetailModal = showDetailModal;
window.showFavDetailModal = showFavDetailModal;
window.pickFav = pickFav;
window.deleteFav = deleteFav;
window.removeAIItem = removeAIItem;
window.addAIItem = addAIItem;
window.recalculateAI = recalculateAI;

export {
    macroChart,
    weeklyChart,
    weightChart,
    calTrendChart,
    proteinTrendChart,
    petTimeout,
    dashboardChartRange,
    switchView,
    setChartRange,
    initCharts,
    updateTrendCharts,
    updateChartTheme,
    updatePetStatus,
    showEatingAnimation,
    petInteraction,
    updateCharts,
    updateWeightChart,
    renderListAndStats,
    updateMealUI,
    toggleTheme,
    setTheme,
    openLangModal,
    setLang,
    openFavModal,
    pickFav,
    deleteFav,
    showModal,
    addAIItem,
    removeAIItem,
    recalculateAI,
    showDetailModal,
    showFavDetailModal,
    _renderDetailModal,
    closeModal,
    toggleFabMenu
};
