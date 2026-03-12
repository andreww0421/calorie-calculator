let macroChart = null;
let weeklyChart = null;
let weightChart = null; // ✨ 新增：體重圖表
let petTimeout = null; // 用來控制動畫計時

// ✨ 新增：視圖切換邏輯
function switchView(targetId) {
    // 隱藏所有視圖
    document.querySelectorAll('.view-section').forEach(view => {
        view.classList.remove('active-view');
        view.classList.add('hidden');
    });
    
    // 顯示目標視圖
    const targetView = document.getElementById(targetId);
    if (targetView) {
        targetView.classList.remove('hidden');
        targetView.classList.add('active-view');
    }

    // 更新導覽列狀態
    document.querySelectorAll('.nav-item').forEach(nav => {
        if(nav.getAttribute('data-target') === targetId) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });

    // 如果切換到 Dashboard，更新圖表
    if (targetId === 'view-dashboard') {
        const total = {
            pro: parseFloat(document.getElementById('sum-protein').innerText) || 0,
            fat: parseFloat(document.getElementById('sum-fat').innerText) || 0,
            carb: parseFloat(document.getElementById('sum-carb').innerText) || 0
        };
        updateCharts(total);
        updateWeightChart();
    }
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
    
    // ✨ 新增：初始化體重圖表
    const ctxWeight = document.getElementById('weightChart').getContext('2d');
    weightChart = new Chart(ctxWeight, {
        type: 'line',
        data: {
            labels: [], // 將由 updateWeightChart 填入
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
            plugins: {
                legend: { display: false }
            },
            scales: { 
                y: { 
                    // 不從 0 開始，讓變化更明顯
                    beginAtZero: false 
                } 
            }
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
    if(weightChart) {
        weightChart.options.scales.x.ticks.color = textColor;
        weightChart.options.scales.y.ticks.color = textColor;
        weightChart.options.scales.y.grid.color = gridColor;
        weightChart.update();
    }
    if(macroChart) {
        macroChart.options.plugins.legend.labels.color = textColor;
        macroChart.update();
    }
}

// ✨ 優化版：加入 Idle 狀態的寵物邏輯
function updatePetStatus(currentCal) {
    const petImg = document.getElementById('pet-img');
    const petMsg = document.getElementById('pet-msg');
    if(!petImg || !petMsg) return;

    // 如果正在播放吃東西動畫，暫時不要更新狀態
    if (petImg.dataset.animating === "true") return;

    const target = (typeof targetCalories !== 'undefined' && targetCalories > 0) ? targetCalories : 2000;
    const ratio = currentCal / target;

    let src = 'dog_animation/dog_idle.gif';
    let msg = '汪！今天想吃什麼呢？';

    const t = (typeof i18n !== 'undefined' && i18n[localStorage.getItem('appLang')]) ? i18n[localStorage.getItem('appLang')] : i18n['zh-TW'];

    if (currentCal === 0) {
         // 狀態 1: 完全沒吃 -> 難過
         src = 'dog_animation/dog_sad.gif';
         msg = t.petMsg1 || '汪... 肚子好餓喔... (0%)';
    } else if (ratio < 0.3) {
         // ✨ 狀態 2: 吃很少 (1%-30%) -> 閒置/發呆 (新增的 Idle 應用)
         // 代表有點東西墊胃了，不難過但還沒力氣動
         src = 'dog_animation/dog_idle.gif';
         msg = t.petMsg2 || '有點力氣了，但還想再吃一點...';
    } else if (ratio < 0.5) {
         // 狀態 3: 吃一半 (30%-50%) -> 走路覓食
         src = 'dog_animation/dog_walk.gif';
         msg = t.petMsg3 || '聞到香味了，正在尋找食物！';
    } else if (ratio >= 0.5 && ratio <= 1.1) {
         // 狀態 4: 達標 (50%-110%) -> 開心
         src = 'dog_animation/dog_happy.gif';
         msg = t.petMsg4 || '營養剛剛好，太棒了！';
    } else {
         // 狀態 5: 超標 -> 變胖
         src = 'dog_animation/dog_fat.gif';
         msg = t.petMsg5 || '嗝... 吃太多了啦！';
    }
    
    // 只有在圖片路徑改變時才更新，避免閃爍
    if(!petImg.src.includes(src)) petImg.src = src;
    petMsg.innerText = msg;
}

// ✨ 新功能：餵食動畫
function showEatingAnimation() {
    const petImg = document.getElementById('pet-img');
    const petMsg = document.getElementById('pet-msg');
    if(!petImg) return;

    // 標記正在動畫中，避免被 updatePetStatus 覆蓋
    petImg.dataset.animating = "true";
    
    const t = (typeof i18n !== 'undefined' && i18n[localStorage.getItem('appLang')]) ? i18n[localStorage.getItem('appLang')] : i18n['zh-TW'];
    
    // 切換成吃東西圖
    petImg.src = 'dog_animation/dog_eat.gif';
    petMsg.innerText = t.petEatMsg || '阿姆阿姆... 好吃！';

    // 清除舊的計時器（如果有的話）
    if (petTimeout) clearTimeout(petTimeout);

    // 3秒後恢復正常狀態
    petTimeout = setTimeout(() => {
        petImg.dataset.animating = "false";
        // 強制更新回正確狀態
        const currentCal = parseFloat(document.getElementById('total-cal-display').innerText) || 0;
        updatePetStatus(currentCal);
    }, 3000);
}

// ✨ 新功能：點擊互動
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
    // 隨機選一句
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
            if(stored) { JSON.parse(stored).forEach(item => dayCal += (item.nutri.calories || 0)); }
            data.push(Math.round(dayCal));
        }
        weeklyChart.data.labels = labels; weeklyChart.data.datasets[0].data = data; weeklyChart.update();
    }
}

// ✨ 新增：更新體重圖表
function updateWeightChart() {
    if (!weightChart) return;
    
    // 取得近30天的資料
    const history = getWeightHistory(30);
    
    // 過濾掉沒有資料的點，或者補上前一天的資料 (這裡我們選擇只顯示有輸入的日子，並用線連起來)
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
    
    // 動態調整 Y 軸範圍
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
        total.cal += (Number(item.nutri.calories) || 0); total.pro += (Number(item.nutri.protein) || 0);
        total.fat += (Number(item.nutri.fat) || 0); total.carb += (Number(item.nutri.carbohydrate) || 0);
        total.sugar += (Number(item.nutri.sugar) || 0); total.sod += (Number(item.nutri.sodium) || 0);
        total.sat += (Number(item.nutri.saturatedFat) || 0); total.trans += (Number(item.nutri.transFat) || 0);
        if(mealTotals[item.type] !== undefined) mealTotals[item.type] += (Number(item.nutri.calories) || 0);
        
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="food-info">
                <div class="name">${item.name}</div>
                <div class="detail">🔥${Math.round(item.nutri.calories)} | P:${item.nutri.protein} F:${item.nutri.fat} C:${item.nutri.carbohydrate}</div>
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
    curTheme = theme;
    localStorage.setItem('appTheme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    updateChartTheme(theme);
}
function openLangModal() { document.getElementById('lang-modal').style.display = 'flex'; toggleFabMenu(); }

function setLang(lang) {
    curLang = lang;
    localStorage.setItem('appLang', lang);
    const t = i18n[lang] || i18n['zh-TW'];
    
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
        'txt-target-cal-display-label': t.txtTargetCalDisplayUnit, 'txt-tdee-unit': t.txtTdeeUnit
    };

    for(let id in mapping) {
        const el = document.getElementById(id);
        if(el) el.innerText = mapping[id];
    }
    
    // 特別處理 nav-ai，因為它在一個 .ai-badge 內
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
    
    // Also trigger macro updates based on user settings when language changes
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
    list.innerHTML = '';
    if(favoriteFoods.length === 0) { list.innerHTML = '<p style="color:#888; text-align:center;">(Empty)</p>'; } 
    else {
        favoriteFoods.forEach((item, index) => {
            const cal = item.nutri ? item.nutri.calories : item.cal;
            const pro = item.nutri ? item.nutri.protein : 0;
            const fat = item.nutri ? item.nutri.fat : 0;
            const carb = item.nutri ? item.nutri.carbohydrate : 0;

            const div = document.createElement('div');
            div.className = 'fav-item-row';
            div.innerHTML = `
                <div class="fav-item-name" onclick="pickFav(${index})">
                    ${item.name} 
                    <span style="font-size:0.85em; opacity:0.8; display:block; font-weight:normal;">
                        🔥${cal} | P:${pro} F:${fat} C:${carb}
                    </span>
                </div>
                <button class="btn-delete" onclick="deleteFav(${index})">X</button>
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

function showModal() {
    const d = tempAIResult;
    const t = i18n[curLang] || i18n['zh-TW'];
    document.getElementById('analysis-content').innerHTML = `<strong>${d.name}</strong><br>🔥 ${t.cal}：${d.nutri.calories}<br>🥩 ${t.pro}：${d.nutri.protein} | 🥑 ${t.fat}：${d.nutri.fat} | 🍞 ${t.carb}：${d.nutri.carbohydrate}`;
    document.getElementById('analysis-modal').style.display = 'flex';
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function toggleFabMenu() { document.getElementById('fab-menu').classList.toggle('show'); }

