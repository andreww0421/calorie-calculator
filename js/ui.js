import { i18n } from './config.js';
import { 
    targetCalories, tempAIResult, tempAIResultSaved, foodItems, favoriteFoods, 
    curLang, curTheme, setTempAIResult, setCurTheme, setCurLang, 
    getWeightHistory, getCalorieHistory, getProteinHistory, setTempAIResultSaved 
} from './data.js';
import { recalculateFromItems } from './api.js';
import { confirmAddFood } from './app.js';

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
    
    setTimeout(() => { toast.classList.add('show'); }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

let macroChart = null;
let weeklyChart = null;
let weightChart = null;
let calTrendChart = null;   // Phase 4
let proteinTrendChart = null; // Phase 4
let petTimeout = null;
let dashboardChartRange = 7; // Phase 4: 預設 7 天

// ✨ 視圖切換邏輯
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
        if(nav.getAttribute('data-target') === targetId) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });

    if (targetId === 'view-dashboard') {
        const total = {
            pro: parseFloat(document.getElementById('sum-protein').innerText) || 0,
            fat: parseFloat(document.getElementById('sum-fat').innerText) || 0,
            carb: parseFloat(document.getElementById('sum-carb').innerText) || 0
        };
        updateCharts(total);
        updateWeightChart();
        updateTrendCharts(dashboardChartRange);
    }
}

// Phase 4: 切換圖表範圍
function setChartRange(days) {
    dashboardChartRange = days;
    const t = i18n[curLang] || i18n['zh-TW'];
    // 更新按鈕樣式
    const btn7 = document.getElementById('btn-chart-7d');
    const btn30 = document.getElementById('btn-chart-30d');
    if(btn7 && btn30) {
        btn7.classList.toggle('active-range', days === 7);
        btn30.classList.toggle('active-range', days === 30);
    }
    updateTrendCharts(days);
}

function initCharts() {
    const t = (typeof i18n !== 'undefined' && i18n[curLang]) ? i18n[curLang] : i18n['zh-TW'];
    
    const ctxMacro = document.getElementById('macroChart').getContext('2d');
    macroChart = new Chart(ctxMacro, {
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

    const ctxWeekly = document.getElementById('weeklyChart').getContext('2d');
    const labels = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        labels.push(d.toISOString().split('T')[0].slice(5));
    }

    weeklyChart = new Chart(ctxWeekly, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'kcal',
                data: [0,0,0,0,0,0,0],
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
    
    // 體重圖表
    const ctxWeight = document.getElementById('weightChart').getContext('2d');
    weightChart = new Chart(ctxWeight, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '體重 (kg)',
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

    // Phase 4: 熱量趨勢折線圖
    const ctxCalTrend = document.getElementById('calTrendChart');
    if(ctxCalTrend) {
        calTrendChart = new Chart(ctxCalTrend.getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: t.cal || 'Calories',
                        data: [],
                        borderColor: '#e17055',
                        backgroundColor: 'rgba(225, 112, 85, 0.1)',
                        borderWidth: 2, pointRadius: 3, fill: true, tension: 0.3
                    },
                    {
                        label: t.chartTdeeTarget || 'TDEE',
                        data: [],
                        borderColor: '#636e72',
                        borderWidth: 2, borderDash: [6, 4],
                        pointRadius: 0, fill: false
                    }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // Phase 4: 蛋白質長條圖
    const ctxProtein = document.getElementById('proteinTrendChart');
    if(ctxProtein) {
        proteinTrendChart = new Chart(ctxProtein.getContext('2d'), {
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
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    updateChartTheme(curTheme);
}

// Phase 4: 更新趨勢圖表
function updateTrendCharts(days) {
    if(calTrendChart) {
        const calHist = getCalorieHistory(days);
        calTrendChart.data.labels = calHist.map(h => h.date);
        calTrendChart.data.datasets[0].data = calHist.map(h => h.calories);
        // TDEE 目標線
        const tdee = targetCalories > 0 ? targetCalories : 2000;
        calTrendChart.data.datasets[1].data = calHist.map(() => tdee);
        calTrendChart.update();
    }
    if(proteinTrendChart) {
        const proHist = getProteinHistory(days);
        proteinTrendChart.data.labels = proHist.map(h => h.date);
        proteinTrendChart.data.datasets[0].data = proHist.map(h => h.protein);
        proteinTrendChart.update();
    }
}

function updateChartTheme(theme) {
    const textColor = theme === 'dark' ? '#e0e0e0' : '#2c3e50';
    const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    Chart.defaults.color = textColor;
    [weeklyChart, weightChart, calTrendChart, proteinTrendChart].forEach(chart => {
        if(chart && chart.options.scales) {
            if(chart.options.scales.x) { chart.options.scales.x.ticks.color = textColor; }
            if(chart.options.scales.y) { chart.options.scales.y.ticks.color = textColor; chart.options.scales.y.grid.color = gridColor; }
            chart.update();
        }
    });
    if(macroChart) {
        macroChart.options.plugins.legend.labels.color = textColor;
        macroChart.update();
    }
}

function updatePetStatus(currentCal) {
    const petImg = document.getElementById('pet-img');
    const petMsg = document.getElementById('pet-msg');
    if(!petImg || !petMsg) return;

    if (petImg.dataset.animating === "true") return;

    const target = (typeof targetCalories !== 'undefined' && targetCalories > 0) ? targetCalories : 2000;
    const ratio = currentCal / target;

    let src = 'dog_animation/dog_idle.gif';
    let msg = '汪！今天想吃什麼呢？';

    const t = (typeof i18n !== 'undefined' && i18n[localStorage.getItem('appLang')]) ? i18n[localStorage.getItem('appLang')] : i18n['zh-TW'];

    if (currentCal === 0) {
         src = 'dog_animation/dog_sad.gif';
         msg = t.petMsg1 || '汪... 肚子好餓喔... (0%)';
    } else if (ratio < 0.3) {
         src = 'dog_animation/dog_idle.gif';
         msg = t.petMsg2 || '有點力氣了，但還想再吃一點...';
    } else if (ratio < 0.5) {
         src = 'dog_animation/dog_walk.gif';
         msg = t.petMsg3 || '聞到香味了，正在尋找食物！';
    } else if (ratio >= 0.5 && ratio <= 1.1) {
         src = 'dog_animation/dog_happy.gif';
         msg = t.petMsg4 || '營養剛剛好，太棒了！';
    } else {
         src = 'dog_animation/dog_fat.gif';
         msg = t.petMsg5 || '嗝... 吃太多了啦！';
    }
    
    if(!petImg.src.includes(src)) petImg.src = src;
    petMsg.innerText = msg;
}

function showEatingAnimation() {
    const petImg = document.getElementById('pet-img');
    const petMsg = document.getElementById('pet-msg');
    if(!petImg) return;

    petImg.dataset.animating = "true";
    
    const t = (typeof i18n !== 'undefined' && i18n[localStorage.getItem('appLang')]) ? i18n[localStorage.getItem('appLang')] : i18n['zh-TW'];
    
    petImg.src = 'dog_animation/dog_eat.gif';
    petMsg.innerText = t.petEatMsg || '阿姆阿姆... 好吃！';

    if (petTimeout) clearTimeout(petTimeout);

    petTimeout = setTimeout(() => {
        petImg.dataset.animating = "false";
        const currentCal = parseFloat(document.getElementById('total-cal-display').innerText) || 0;
        updatePetStatus(currentCal);
    }, 3000);
}

function petInteraction() {
    const petMsg = document.getElementById('pet-msg');
    const t = (typeof i18n !== 'undefined' && i18n[localStorage.getItem('appLang')]) ? i18n[localStorage.getItem('appLang')] : i18n['zh-TW'];
    const messages = [
        t.petInteractMsg1 || "汪！你今天喝水了嗎？",
        t.petInteractMsg2 || "保持健康，我們一起加油！",
        t.petInteractMsg3 || "我最喜歡吃健康的食物了！",
        t.petInteractMsg4 || "摸我也不會變瘦喔，去運動吧！ XD",
        t.petInteractMsg5 || "記得要細嚼慢嚥喔！"
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    petMsg.innerText = randomMsg;
}

function updateCharts(totalNutri) {
    const hasData = totalNutri.pro > 0 || totalNutri.fat > 0 || totalNutri.carb > 0;
    if (macroChart) {
        if (hasData) {
            macroChart.data.datasets[0].data = [Math.round(totalNutri.pro), Math.round(totalNutri.fat), Math.round(totalNutri.carb)];
            macroChart.data.datasets[0].backgroundColor = ['#ff7675', '#fdcb6e', '#74b9ff'];
        } else {
            macroChart.data.datasets[0].data = [1, 1, 1];
            macroChart.data.datasets[0].backgroundColor = ['#e0e0e0', '#e0e0e0', '#e0e0e0'];
        }
        macroChart.update();
    }
    if (weeklyChart) {
        const labels = []; const data = []; const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(); d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            labels.push(dateStr.slice(5)); 
            const stored = localStorage.getItem(`record_${dateStr}`);
            let dayCal = 0;
            if(stored) { JSON.parse(stored).forEach(item => dayCal += (Number(item.nutri && item.nutri.calories) || 0)); }
            data.push(Math.round(dayCal));
        }
        weeklyChart.data.labels = labels; weeklyChart.data.datasets[0].data = data; weeklyChart.update();
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
    ['breakfast', 'lunch', 'dinner', 'snack'].forEach(type => { const el = document.getElementById(`list-${type}`); if(el) el.innerHTML = ''; });
    let total = { cal:0, pro:0, fat:0, carb:0, sugar:0, sod:0, sat:0, trans:0 };
    let mealTotals = { breakfast:0, lunch:0, dinner:0, snack:0 };

    foodItems.forEach((item, index) => {
        const n = item.nutri || {};
        total.cal += (Number(n.calories) || 0); total.pro += (Number(n.protein) || 0);
        total.fat += (Number(n.fat) || 0); total.carb += (Number(n.carbohydrate) || 0);
        total.sugar += (Number(n.sugar) || 0); total.sod += (Number(n.sodium) || 0);
        total.sat += (Number(n.saturatedFat) || 0); total.trans += (Number(n.transFat) || 0);
        if(mealTotals[item.type] !== undefined) mealTotals[item.type] += (Number(n.calories) || 0);
        
        const li = document.createElement('li');
        // Phase 4: 點擊食物名稱開啟詳細彈窗
        li.innerHTML = `
            <div class="food-info" onclick="showDetailModal(${index})" style="cursor:pointer;">
                <div class="name">${item.name}</div>
                <div class="detail">🔥${Math.round(n.calories || 0)} | P:${n.protein || 0} F:${n.fat || 0} C:${n.carbohydrate || 0}</div>
            </div>
            <div style="display: flex; gap: 5px;">
                <button class="btn-delete" style="background-color: #ff7675;" onclick="addRecordToFav(${index})">❤️</button>
                <button class="btn-delete" onclick="deleteItem(${index})">X</button>
            </div>
        `;
        const listEl = document.getElementById(`list-${item.type}`); if(listEl) listEl.appendChild(li);
    });

    for(let type in mealTotals) {
        const el = document.getElementById(`prog-${type}`);
        if(el) el.innerText = `${Math.round(mealTotals[type])} kcal`;
    }

    document.getElementById('total-cal-display').innerText = Math.round(total.cal);
    document.getElementById('sum-protein').innerText = total.pro.toFixed(1);
    document.getElementById('sum-fat').innerText = total.fat.toFixed(1);
    document.getElementById('sum-carb').innerText = total.carb.toFixed(1);
    document.getElementById('sum-sugar').innerText = total.sugar.toFixed(1);
    document.getElementById('sum-sodium').innerText = Math.round(total.sod);
    document.getElementById('sum-sat-fat').innerText = total.sat.toFixed(1);
    document.getElementById('sum-trans-fat').innerText = total.trans.toFixed(1);
    const weight = parseFloat(document.getElementById('weight').value) || 60;
    document.getElementById('water-val').innerText = Math.round(weight * 35);

    updateCharts(total);
    updatePetStatus(total.cal);
}

function updateMealUI() {
    const t = (typeof i18n !== 'undefined' && i18n[curLang]) ? i18n[curLang] : i18n['zh-TW'];
    const m = t.meals || {}; 

    const configs = {
        "4": { sections: ['breakfast', 'lunch', 'dinner', 'snack'], titles: { breakfast: m.breakfast, lunch: m.lunch, dinner: m.dinner, snack: m.snack }, ratios: { breakfast: 0.25, lunch: 0.35, dinner: 0.30, snack: 0.10 } },
        "3": { sections: ['breakfast', 'lunch', 'dinner'], titles: { breakfast: m.breakfast, lunch: m.lunch, dinner: m.dinner }, ratios: { breakfast: 0.30, lunch: 0.40, dinner: 0.30 } },
        "2": { sections: ['lunch', 'dinner'], titles: { lunch: m.meal1, dinner: m.meal2 }, ratios: { lunch: 0.50, dinner: 0.50 } },
        "1": { sections: ['dinner'], titles: { dinner: m.mealBig }, ratios: { dinner: 1.0 } }
    };
    const config = configs[currentMealMode];
    const container = document.getElementById('meal-sections-container');
    const manualSelect = document.getElementById('manual-type');
    const modalBtns = document.getElementById('modal-meal-buttons');

    container.innerHTML = ''; manualSelect.innerHTML = ''; modalBtns.innerHTML = '';

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
            <ul class="meal-list" id="list-${type}"></ul>`;
        container.appendChild(section);

        const option = document.createElement('option');
        option.value = type; option.text = config.titles[type];
        manualSelect.appendChild(option);

        const btn = document.createElement('button');
        btn.className = `meal-btn ${type}`; btn.innerText = config.titles[type];
        btn.onclick = () => confirmAddFood(type);
        modalBtns.appendChild(btn);
    });
}

function toggleTheme() {
    const newTheme = curTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
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
function openLangModal() { document.getElementById('lang-modal').style.display = 'flex'; toggleFabMenu(); }

function setLang(lang) {
    setCurLang(lang);
    localStorage.setItem('appLang', lang);
    const t = i18n[lang] || i18n['zh-TW'];
    
    document.title = t.appTitle || "Woof Cal 汪卡管家";
    
    const mapping = {
        'txt-date-label': t.dateLabel, 'txt-total-intake': t.totalIntake, 'txt-goal-label': t.goal,
        'lbl-pro': t.pro, 'lbl-fat': t.fat, 'lbl-carb': t.carb, 'lbl-sugar': t.sugar, 'lbl-sod': t.sod, 'lbl-sat': t.sat, 'lbl-trans': t.trans, 'lbl-water': t.water,
        'txt-chart-title': t.chartTitle, 'txt-chart-macro': t.chartMacro, 'txt-chart-weekly': t.chartWeekly,
        'txt-ai-title': t.aiTitle, 'btn-take-photo': t.btnPhoto, 'txt-analyze-btn': t.btnAnalyze, 'txt-ai-loading': t.aiLoading,
        'txt-record-title': t.txtRecordTitle || t.recordTitle, 'txt-manual-label': t.txtManualLabel || t.manualLabel, 'btn-add-record': t.btnAddRecord || t.btnAdd, 'btn-fav-save': t.btnFavSave, 'btn-fav-load': t.btnFavLoad, 'btn-ai-fav-save': t.btnFavAi,
        'txt-settings-title': t.settingsTitle, 'lbl-gender': t.gender, 'opt-male': t.male, 'opt-female': t.female,
        'lbl-age': t.age, 'lbl-height': t.height, 'lbl-weight': t.weight, 'lbl-activity': t.activity,
        'opt-act-1': t.act1, 'opt-act-2': t.act2, 'opt-act-3': t.act3, 'opt-act-4': t.act4,
        'lbl-meal-mode': t.mealMode, 'opt-mode-4': t.mode4, 'opt-mode-3': t.mode3, 'opt-mode-2': t.mode2, 'opt-mode-1': t.mode1,
        'btn-calc': t.btnCalc, 'txt-res-tdee': t.resTdee, 'txt-res-target': t.resTarget,
        'txt-modal-title': t.modalTitle, 'txt-modal-ask': t.modalAsk, 'btn-cancel': t.btnCancel,
        'txt-fav-title': t.favTitle, 'btn-fav-close': t.btnClose, 'menu-import-setting': t.menuImport, 'menu-export-setting': t.menuExport, 'menu-theme-setting': t.menuTheme, 'menu-lang-setting': t.menuLang, 'suggest': t.suggest,
        'txt-lang-title': t.langTitle, 'btn-lang-cancel': t.langCancel,
        'txt-weight-title': t.weightTitle, 'btn-save-weight': t.btnSaveWeight, 'txt-weight-chart-title': t.weightChartTitle,
        'txt-text-ai-label': t.textAiLabel, 'txt-app-settings-title': t.appSettingsTitle,
        'nav-daily': t.navDaily, 'nav-dashboard': t.navDashboard, 'nav-settings': t.navSettings, 'lbl-weight': t.txtWeightSettingsTitle,
        'txt-target-cal-display-label': t.txtTargetCalDisplayUnit, 'txt-tdee-unit': t.txtTdeeUnit,
        // Phase 4 新增
        'txt-cal-trend-title': t.chartCalTrend, 'txt-protein-trend-title': t.chartProteinTrend,
        'btn-chart-7d': t.chart7d, 'btn-chart-30d': t.chart30d,
        'btn-detail-close': t.btnDetailClose
    };

    for(let id in mapping) {
        const el = document.getElementById(id);
        if(el) el.innerText = mapping[id];
    }
    
    const navAiBadge = document.querySelector('.nav-item.nav-ai .ai-badge');
    if(navAiBadge) navAiBadge.innerText = t.navAi || "AI";

    if(document.getElementById('manual-name')) document.getElementById('manual-name').placeholder = t.phFoodName || "Food Name (Required)";
    if(document.getElementById('manual-cal')) document.getElementById('manual-cal').placeholder = t.phFoodCal || "Calories kcal (Req)";
    if(document.getElementById('ai-desc')) document.getElementById('ai-desc').placeholder = t.aiDescPlaceholder;
    if(document.getElementById('daily-weight-input')) document.getElementById('daily-weight-input').placeholder = t.weightInputPlaceholder;
    if(document.getElementById('ai-text-desc')) document.getElementById('ai-text-desc').placeholder = t.textAiPlaceholder;

    if(t.phPro) {
        if(document.getElementById('manual-pro')) document.getElementById('manual-pro').placeholder = t.phPro;
        if(document.getElementById('manual-fat')) document.getElementById('manual-fat').placeholder = t.phFat;
        if(document.getElementById('manual-carb')) document.getElementById('manual-carb').placeholder = t.phCarb;
        if(document.getElementById('manual-sugar')) document.getElementById('manual-sugar').placeholder = t.phSugar;
        if(document.getElementById('manual-sod')) document.getElementById('manual-sod').placeholder = t.phSod;
        if(document.getElementById('manual-sat')) document.getElementById('manual-sat').placeholder = t.phSat;
        if(document.getElementById('manual-trans')) document.getElementById('manual-trans').placeholder = t.phTrans;
    }
    
    if(typeof updateProfileStats === 'function') updateProfileStats();
    
    updateMealUI();
    if(macroChart) { 
        macroChart.data.labels = [t.pro, t.fat, t.carb]; 
        macroChart.update(); 
    }
    updatePetStatus(parseFloat(document.getElementById('total-cal-display').innerText) || 0);
}

function openFavModal() {
    const list = document.getElementById('fav-list-container');
    const t = i18n[curLang] || i18n['zh-TW'];
    list.innerHTML = '';
    if(favoriteFoods.length === 0) { list.innerHTML = '<p style="color:#888; text-align:center;">(Empty)</p>'; } 
    else {
        favoriteFoods.forEach((item, index) => {
            const n = item.nutri || {};
            const cal = n.calories || item.cal || 0;
            const pro = n.protein || 0;
            const fat = n.fat || 0;
            const carb = n.carbohydrate || 0;

            const div = document.createElement('div');
            div.className = 'fav-item-row';
            // Phase 4: 點擊常吃食物開啟詳細彈窗
            div.innerHTML = `
                <div class="fav-item-name" onclick="showFavDetailModal(${index})" style="cursor:pointer;">
                    ${item.name} 
                    <span style="font-size:0.85em; opacity:0.8; display:block; font-weight:normal;">
                        🔥${cal} | P:${pro} F:${fat} C:${carb}
                    </span>
                </div>
                <div style="display:flex; gap:5px;">
                    <button class="btn-delete" style="background-color:#0984e3;" onclick="pickFav(${index})">📥</button>
                    <button class="btn-delete" onclick="deleteFav(${index})">X</button>
                </div>
            `;
            list.appendChild(div);
        });
    }
    document.getElementById('fav-modal').style.display = 'flex';
}

function pickFav(index) {
    const item = favoriteFoods[index];
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
    const t = i18n[curLang] || i18n['zh-TW'];
    if(confirm(t.alertDel || "確定要刪除？")) {
        favoriteFoods.splice(index, 1);
        localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
        openFavModal();
    }
}

// Phase 4: 全新 AI 分析結果彈窗 (含八大營養+成分列表+健康評分+編輯+重算)
function showModal() {
    const d = tempAIResult;
    const t = i18n[curLang] || i18n['zh-TW'];
    const nd = t.noData || '--';
    const n = d.nutri;
    
    // 健康評分顏色
    const score = d.healthScore || 0;
    let scoreColor = '#e17055';
    if(score >= 7) scoreColor = '#2ecc71';
    else if(score >= 4) scoreColor = '#fdcb6e';

    // 成分列表 HTML
    let itemsHtml = '';
    if(d.items && d.items.length > 0) {
        d.items.forEach((item, i) => {
            itemsHtml += `
            <div class="ai-item-row" data-idx="${i}">
                <input type="text" class="ai-item-name" value="${item.name || ''}" style="flex:2;">
                <input type="text" class="ai-item-weight" value="${item.weight || ''}" style="flex:1;">
                <button class="btn-delete" onclick="removeAIItem(${i})" style="flex:0;">✕</button>
            </div>`;
        });
    }

    const content = `
        <div style="text-align:left;">
            <h3 style="margin:0 0 10px;">${d.name}</h3>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                <span style="font-size:2em; font-weight:bold; color:${scoreColor};">${score}/10</span>
                <span style="opacity:0.8;">${t.healthScoreLabel || '🏅 健康評分'}</span>
            </div>
            
            <div class="ai-nutri-grid">
                <div class="ai-nutri-item"><span class="ai-n-val">🔥 ${n.calories}</span><span class="ai-n-lbl">${t.cal}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${n.protein}g</span><span class="ai-n-lbl">${t.pro}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${n.fat}g</span><span class="ai-n-lbl">${t.fat}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${n.carbohydrate}g</span><span class="ai-n-lbl">${t.carb}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${n.sugar}g</span><span class="ai-n-lbl">${t.sugar}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${n.sodium}mg</span><span class="ai-n-lbl">${t.sod}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${n.saturatedFat}g</span><span class="ai-n-lbl">${t.sat}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${(n.fiber || 0)}g</span><span class="ai-n-lbl">${t.fiber || '纖維'}</span></div>
            </div>
            
            <div style="margin-top:15px;">
                <strong>${t.aiItemsLabel || '📋 食物成分估算'}</strong>
                <div style="margin-top:5px; font-size:0.8em; opacity:0.6; margin-bottom:8px;">
                    ${t.itemName || '食物'} / ${t.itemWeight || '重量'}
                </div>
                <div id="ai-items-container">${itemsHtml}</div>
                <button onclick="addAIItem()" style="margin-top:8px; padding:8px; font-size:13px; background:#74b9ff;">${t.addItem || '＋新增成分'}</button>
                <button onclick="recalculateAI()" style="margin-top:8px; padding:8px; font-size:13px; background:#a29bfe;">${t.recalculate || '🔄 重新計算'}</button>
            </div>
        </div>
    `;
    
    document.getElementById('analysis-content').innerHTML = content;
    document.getElementById('analysis-modal').style.display = 'flex';
}

// Phase 4: 編輯成分 - 新增項目
function addAIItem() {
    const container = document.getElementById('ai-items-container');
    if(!container || !tempAIResult) return;
    const idx = tempAIResult.items ? tempAIResult.items.length : 0;
    tempAIResult.items = tempAIResult.items || [];
    tempAIResult.items.push({ name: '', weight: '' });
    const div = document.createElement('div');
    div.className = 'ai-item-row';
    div.setAttribute('data-idx', idx);
    div.innerHTML = `
        <input type="text" class="ai-item-name" value="" style="flex:2;">
        <input type="text" class="ai-item-weight" value="" style="flex:1;">
        <button class="btn-delete" onclick="removeAIItem(${idx})" style="flex:0;">✕</button>
    `;
    container.appendChild(div);
}

// Phase 4: 編輯成分 - 刪除項目
function removeAIItem(idx) {
    if(!tempAIResult || !tempAIResult.items) return;
    tempAIResult.items.splice(idx, 1);
    showModal(); // 重新渲染
}

// Phase 4: 重新計算
async function recalculateAI() {
    if(!tempAIResult) return;
    const t = i18n[curLang] || i18n['zh-TW'];
    
    // 從 DOM 讀取目前的成分
    const rows = document.querySelectorAll('#ai-items-container .ai-item-row');
    const items = [];
    rows.forEach(row => {
        const name = row.querySelector('.ai-item-name').value.trim();
        const weight = row.querySelector('.ai-item-weight').value.trim();
        if(name) items.push({ name, weight });
    });
    
    if(items.length === 0) { showToast('請至少保留一項成分', 'error'); return; }
    
    // 顯示載入中
    document.getElementById('analysis-content').innerHTML = `<div style="text-align:center; padding:30px;">${t.aiLoading || 'AI 正在分析...'}</div>`;
    
    try {
        const result = await recalculateFromItems(items);
        if(result) {
            setTempAIResult({
                name: result.foodName || tempAIResult.name,
                nutri: {
                    calories: Number(result.calories) || 0, protein: Number(result.protein) || 0, fat: Number(result.fat) || 0,
                    carbohydrate: Number(result.carbohydrate) || 0, sugar: Number(result.sugar) || 0, sodium: Number(result.sodium) || 0,
                    saturatedFat: Number(result.saturatedFat) || 0, transFat: Number(result.transFat) || 0,
                    fiber: Number(result.fiber) || 0
                },
                items: Array.isArray(result.items) ? result.items : items,
                healthScore: Number(result.healthScore) || 0
            });
            setTempAIResultSaved(false);
            showModal();
        }
    } catch(e) {
        console.error(e);
        showModal(); // 恢復顯示
    }
}

// Phase 4: 詳細營養彈窗 (日記食物)
function showDetailModal(index) {
    const item = foodItems[index];
    if(!item) return;
    _renderDetailModal(item);
}

// Phase 4: 詳細營養彈窗 (常吃食物)
function showFavDetailModal(index) {
    const item = favoriteFoods[index];
    if(!item) return;
    _renderDetailModal(item);
}

// Phase 4: 共用詳細彈窗渲染
function _renderDetailModal(item) {
    const t = i18n[curLang] || i18n['zh-TW'];
    const nd = t.noData || '--';
    const n = item.nutri || {};
    
    const v = (val) => (val !== undefined && val !== null) ? val : nd;
    
    const score = item.healthScore || 0;
    let scoreColor = '#e17055';
    if(score >= 7) scoreColor = '#2ecc71';
    else if(score >= 4) scoreColor = '#fdcb6e';
    
    let itemsHtml = '';
    if(item.items && item.items.length > 0) {
        item.items.forEach(it => {
            itemsHtml += `<div style="padding:4px 0; display:flex; justify-content:space-between;"><span>${it.name}</span><span style="opacity:0.7;">${it.weight}</span></div>`;
        });
    } else {
        itemsHtml = `<p style="opacity:0.5; text-align:center;">${nd}</p>`;
    }

    const content = `
        <div style="text-align:left;">
            <h3 style="margin:0 0 10px;">${item.name}</h3>
            ${score > 0 ? `<div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                <span style="font-size:1.5em; font-weight:bold; color:${scoreColor};">${score}/10</span>
                <span style="opacity:0.8;">${t.healthScoreLabel || '🏅 健康評分'}</span>
            </div>` : ''}
            
            <div class="ai-nutri-grid">
                <div class="ai-nutri-item"><span class="ai-n-val">🔥 ${v(n.calories)}</span><span class="ai-n-lbl">${t.cal}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${v(n.protein)}g</span><span class="ai-n-lbl">${t.pro}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${v(n.fat)}g</span><span class="ai-n-lbl">${t.fat}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${v(n.carbohydrate)}g</span><span class="ai-n-lbl">${t.carb}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${v(n.sugar)}g</span><span class="ai-n-lbl">${t.sugar}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${v(n.sodium)}mg</span><span class="ai-n-lbl">${t.sod}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${v(n.saturatedFat)}g</span><span class="ai-n-lbl">${t.sat}</span></div>
                <div class="ai-nutri-item"><span class="ai-n-val">${v(n.fiber)}g</span><span class="ai-n-lbl">${t.fiber || '纖維'}</span></div>
            </div>
            
            <div style="margin-top:15px;">
                <strong>${t.aiItemsLabel || '📋 食物成分估算'}</strong>
                <div style="margin-top:8px;">${itemsHtml}</div>
            </div>
        </div>
    `;
    
    document.getElementById('detail-content').innerHTML = content;
    document.getElementById('detail-modal').style.display = 'flex';
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function toggleFabMenu() { const el = document.getElementById('fab-menu'); if(el) el.classList.toggle('show'); }

window.showDetailModal = showDetailModal;
window.showFavDetailModal = showFavDetailModal;
window.pickFav = pickFav;
window.deleteFav = deleteFav;
window.removeAIItem = removeAIItem;
window.addAIItem = addAIItem;
window.recalculateAI = recalculateAI;

export { 
    macroChart, weeklyChart, weightChart, calTrendChart, proteinTrendChart, petTimeout, dashboardChartRange,
    switchView, setChartRange, initCharts, updateTrendCharts, updateChartTheme, updatePetStatus, showEatingAnimation, petInteraction, updateCharts, updateWeightChart, renderListAndStats, updateMealUI, toggleTheme, setTheme, openLangModal, setLang, openFavModal, pickFav, deleteFav, showModal, addAIItem, removeAIItem, recalculateAI, showDetailModal, showFavDetailModal, _renderDetailModal, closeModal, toggleFabMenu
};
