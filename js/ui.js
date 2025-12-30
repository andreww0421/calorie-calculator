let macroChart = null;
let weeklyChart = null;

function initCharts() {
    // 確保圖表初始化時有預設文字，避免報錯
    const t = (typeof i18n !== 'undefined' && i18n[curLang]) ? i18n[curLang] : i18n['zh-TW'];
    
    const ctxMacro = document.getElementById('macroChart').getContext('2d');
    macroChart = new Chart(ctxMacro, {
        type: 'doughnut',
        data: {
            labels: [t.pro, t.fat, t.carb],
            datasets: [{
                data: [1, 1, 1], // 預設灰色空圈
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
    
    updateChartTheme(curTheme);
}

function updateChartTheme(theme) {
    const textColor = theme === 'dark' ? '#e0e0e0' : '#2c3e50';
    const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    Chart.defaults.color = textColor;
    if(weeklyChart) {
        weeklyChart.options.scales.x.ticks.color = textColor;
        weeklyChart.options.scales.y.ticks.color = textColor;
        weeklyChart.options.scales.y.grid.color = gridColor;
        weeklyChart.update();
    }
    if(macroChart) {
        macroChart.options.plugins.legend.labels.color = textColor;
        macroChart.update();
    }
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
            if(stored) { JSON.parse(stored).forEach(item => dayCal += (item.nutri.calories || 0)); }
            data.push(Math.round(dayCal));
        }
        weeklyChart.data.labels = labels; weeklyChart.data.datasets[0].data = data; weeklyChart.update();
    }
}

function renderListAndStats() {
    ['breakfast', 'lunch', 'dinner', 'snack'].forEach(type => { const el = document.getElementById(`list-${type}`); if(el) el.innerHTML = ''; });
    let total = { cal:0, pro:0, fat:0, carb:0, sugar:0, sod:0, sat:0, trans:0 };
    let mealTotals = { breakfast:0, lunch:0, dinner:0, snack:0 };

    foodItems.forEach((item, index) => {
        total.cal += (Number(item.nutri.calories) || 0); total.pro += (Number(item.nutri.protein) || 0);
        total.fat += (Number(item.nutri.fat) || 0); total.carb += (Number(item.nutri.carbohydrate) || 0);
        total.sugar += (Number(item.nutri.sugar) || 0); total.sod += (Number(item.nutri.sodium) || 0);
        total.sat += (Number(item.nutri.saturatedFat) || 0); total.trans += (Number(item.nutri.transFat) || 0);
        if(mealTotals[item.type] !== undefined) mealTotals[item.type] += (Number(item.nutri.calories) || 0);
        const li = document.createElement('li');
        li.innerHTML = `<div class="food-info"><div class="name">${item.name}</div><div class="detail">🔥${Math.round(item.nutri.calories)} | P:${item.nutri.protein} F:${item.nutri.fat} C:${item.nutri.carbohydrate}</div></div><button class="btn-delete" onclick="deleteItem(${index})">X</button>`;
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
}

function updateMealUI() {
    const t = (typeof i18n !== 'undefined' && i18n[curLang]) ? i18n[curLang] : i18n['zh-TW'];
    const configs = {
        "4": { sections: ['breakfast', 'lunch', 'dinner', 'snack'], titles: { breakfast: t.breakfast, lunch: t.lunch, dinner: t.dinner, snack: t.snack }, ratios: { breakfast: 0.25, lunch: 0.35, dinner: 0.30, snack: 0.10 } },
        "3": { sections: ['breakfast', 'lunch', 'dinner'], titles: { breakfast: t.breakfast, lunch: t.lunch, dinner: t.dinner }, ratios: { breakfast: 0.30, lunch: 0.40, dinner: 0.30 } },
        "2": { sections: ['lunch', 'dinner'], titles: { lunch: t.meal1, dinner: t.meal2 }, ratios: { lunch: 0.50, dinner: 0.50 } },
        "1": { sections: ['dinner'], titles: { dinner: t.mealBig }, ratios: { dinner: 1.0 } }
    };
    const config = configs[currentMealMode];
    const container = document.getElementById('meal-sections-container');
    const manualSelect = document.getElementById('manual-type');
    const modalBtns = document.getElementById('modal-meal-buttons');

    container.innerHTML = ''; manualSelect.innerHTML = ''; modalBtns.innerHTML = '';

    config.sections.forEach(type => {
        const section = document.createElement('div');
        section.className = 'meal-section';
        section.innerHTML = `<div class="meal-header"><div><span class="meal-title">${config.titles[type]}</span> <span class="meal-goal">(<span class="txt-suggest">${t.suggest}</span>: <span id="goal-${type}">0</span>)</span></div><div class="meal-progress" id="prog-${type}">0 kcal</div></div><ul class="meal-list" id="list-${type}"></ul>`;
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
    curTheme = theme;
    localStorage.setItem('appTheme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    updateChartTheme(theme);
}
function openLangModal() { document.getElementById('lang-modal').style.display = 'flex'; toggleFabMenu(); }

// ✨ 核心修正：setLang 只更新文字，不重整頁面
function setLang(lang) {
    curLang = lang;
    localStorage.setItem('appLang', lang);
    const t = i18n[lang] || i18n['zh-TW'];
    
    // 更新所有 ID 文字
    const mapping = {
        'txt-date-label': t.dateLabel, 'txt-total-intake': t.totalIntake, 'txt-goal-label': t.goal,
        'lbl-pro': t.pro, 'lbl-fat': t.fat, 'lbl-carb': t.carb, 'lbl-sugar': t.sugar, 'lbl-sod': t.sod, 'lbl-sat': t.sat, 'lbl-trans': t.trans, 'lbl-water': t.water,
        'txt-chart-title': t.chartTitle, 'txt-chart-macro': t.chartMacro, 'txt-chart-weekly': t.chartWeekly,
        'txt-ai-title': t.aiTitle, 'btn-take-photo': t.btnPhoto, 'txt-analyze-btn': t.btnAnalyze, 'txt-ai-loading': t.aiLoading,
        'txt-record-title': t.recordTitle, 'txt-manual-label': t.manualLabel, 'btn-add-record': t.btnAdd, 'btn-fav-save-main': t.btnFavSave, 'btn-fav-load-main': t.btnFavLoad, 'btn-ai-fav-save': t.btnFavAi,
        'txt-settings-title': t.settingsTitle, 'lbl-gender': t.gender, 'opt-male': t.male, 'opt-female': t.female,
        'lbl-age': t.age, 'lbl-height': t.height, 'lbl-weight': t.weight, 'lbl-activity': t.activity,
        'opt-act-1': t.act1, 'opt-act-2': t.act2, 'opt-act-3': t.act3, 'opt-act-4': t.act4,
        'lbl-meal-mode': t.mealMode, 'opt-mode-4': t.mode4, 'opt-mode-3': t.mode3, 'opt-mode-2': t.mode2, 'opt-mode-1': t.mode1,
        'btn-calc': t.btnCalc, 'txt-res-tdee': t.resTdee, 'txt-res-target': t.resTarget,
        'txt-modal-title': t.modalTitle, 'txt-modal-ask': t.modalAsk, 'btn-cancel': t.btnCancel,
        'txt-fav-title': t.favTitle, 'btn-fav-close': t.btnClose, 'menu-import': t.menuImport, 'menu-export': t.menuExport, 'menu-theme': t.menuTheme, 'menu-lang': t.menuLang, 'suggest': t.suggest,
        'txt-lang-title': t.langTitle, 'btn-lang-cancel': t.langCancel
    };

    for(let id in mapping) {
        const el = document.getElementById(id);
        if(el) el.innerText = mapping[id];
    }

    // 更新 Placeholder
    if(document.getElementById('manual-name')) document.getElementById('manual-name').placeholder = t.placeholderName;
    if(document.getElementById('manual-cal')) document.getElementById('manual-cal').placeholder = t.placeholderCal;
    if(document.getElementById('ai-desc')) document.getElementById('ai-desc').placeholder = t.aiDescPlaceholder;
    
    // 更新動態產生的餐點標題
    updateMealUI();
    
    // 更新圖表標籤
    if(macroChart) { 
        macroChart.data.labels = [t.pro, t.fat, t.carb]; 
        macroChart.update(); 
    }
}

function showModal() {
    const d = tempAIResult;
    document.getElementById('analysis-content').innerHTML = `<strong>${d.name}</strong><br>🔥 熱量：${d.nutri.calories}<br>🥩 蛋白：${d.nutri.protein} | 🥑 脂肪：${d.nutri.fat} | 🍞 碳水：${d.nutri.carbohydrate}`;
    document.getElementById('analysis-modal').style.display = 'flex';
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function toggleFabMenu() { document.getElementById('fab-menu').classList.toggle('show'); }
