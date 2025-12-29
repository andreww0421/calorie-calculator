// --- 多國語言設定 (i18n) ---
const i18n = {
    "zh-TW": {
        dateLabel: "📅 紀錄日期：", totalIntake: "今日攝取", goal: "目標",
        pro: "蛋白質", fat: "脂肪", carb: "碳水", sugar: "糖", sod: "鈉(mg)", sat: "飽和脂", trans: "反式脂", water: "目標水",
        chartTitle: "📊 營養與熱量分析", chartMacro: "今日三大營養素 (PFC)", chartWeekly: "本週熱量趨勢",
        aiTitle: "📸 AI 飲食分析", btnPhoto: "📸 1. 拍照 / 選擇圖片", btnAnalyze: "送出圖片分析", aiLoading: "AI 正在分析食物營養，請稍候...",
        aiDescPlaceholder: "📝 補充說明 (例如：這是一碗牛肉麵，沒加蔥)...",
        recordTitle: "飲食紀錄", manualLabel: "手動補充 (僅熱量)", placeholderName: "食物名稱", placeholderCal: "卡路里",
        btnAdd: "➕ 加入紀錄", btnFavSave: "加入最愛", btnFavLoad: "選擇常吃食物", btnFavAi: "加入最愛",
        settingsTitle: "⚙️ 個人數據設定", gender: "性別", male: "男", female: "女", age: "年齡", height: "身高", weight: "體重",
        activity: "活動量", act1: "久坐 (辦公室)", act2: "輕度 (每週運動1-3天)", act3: "中度 (每週運動3-5天)", act4: "高度 (每週運動6-7天)",
        mealMode: "🍽️ 每日餐數模式", mode4: "標準 (3餐+點心)", mode3: "3餐 (無點心)", mode2: "2餐 (168斷食)", mode1: "1餐 (OMAD)",
        btnCalc: "🔄 儲存並更新介面", resTdee: "TDEE", resTarget: "減重目標",
        modalTitle: "AI 分析報告", modalAsk: "請問這是哪一餐？", btnCancel: "取消",
        favTitle: "常吃食物清單", btnClose: "關閉",
        menuImport: "匯入還原", menuExport: "匯出備份", menuTheme: "切換主題", menuLang: "語言", menuCollection: "收藏系統", suggest: "建議",
        langTitle: "語言", langCancel: "取消",
        meals: { breakfast: "🍳 早餐", lunch: "🍱 午餐", dinner: "🍲 晚餐", snack: "🍪 點心", meal1: "🍽️ 第一餐", meal2: "🍽️ 第二餐", mealBig: "🏆 唯一大餐" },
        alertDel: "確定要刪除？", alertFavAdded: "已加入最愛！", alertFavExist: "這個食物已經在最愛清單囉！", alertSelImg: "請先選擇圖片！", alertAiFail: "AI 分析失敗：", alertFill: "請填寫資料", alertNameCal: "請輸入名稱與熱量", alertImportOk: "🎉 資料還原成功！", alertImportFail: "❌ 檔案格式錯誤",
        msgNormal: "主人，今天吃什麼？", msgHappy: "太棒了！我覺得充滿活力！", msgFat: "呃...我好像吃太飽了...", msgThirsty: "水...我要喝水...", msgSad: "主人...別忘了照顧我..."
    },
    // ... 其他語言保留 ...
    "en": {
        dateLabel: "📅 Date:", totalIntake: "Total Intake", goal: "Goal",
        // ... (省略)
        msgNormal: "What are we eating today?", msgHappy: "I feel great!", msgFat: "Ugh... too much food...", msgThirsty: "Water... please...", msgSad: "Don't forget me..."
    }
    // ... 
};

let curLang = localStorage.getItem('appLang') || "zh-TW";
let curTheme = localStorage.getItem('appTheme') || "light";

// --- 全域變數 ---
let foodItems = []; 
let targetCalories = 2000;
let tempAIResult = null;
let selectedDate = new Date().toISOString().split('T')[0];
let currentMealMode = "4";
let favoriteFoods = JSON.parse(localStorage.getItem('myFavorites') || "[]");

const PET_DB = {
    dog: { 
        normal: 'dog_animation/dog_idle.gif', 
        happy: 'dog_animation/dog_happy.gif', 
        sad: 'dog_animation/dog_sad.gif', 
        fat: 'dog_animation/dog_fat.gif',
        eat: 'dog_animation/dog_eat.gif',
        walk: 'dog_animation/dog_walk.gif'
    }
};

const UNLOCKS = [
    { id: 'scarf', name: '領巾', day: 3, type: 'acc', icon: '🧣' },
    { id: 'glasses', name: '墨鏡', day: 7, type: 'acc', icon: '🕶️' }
];

let myPet = JSON.parse(localStorage.getItem('myPetProfile_v3') || "null");
let macroChart = null;
let weeklyChart = null;

// --- 初始化 ---
document.addEventListener('DOMContentLoaded', () => {
    setTheme(curTheme);
    setLang(curLang);
    initPetSystem();
    document.getElementById('current-date').value = selectedDate;
    loadProfile();
    loadFoodData(selectedDate);
    initCharts();
    setupEventListeners();
});

// --- 事件綁定 ---
function setupEventListeners() {
    document.getElementById('current-date').addEventListener('change', changeDate);
    document.getElementById('image-upload').addEventListener('change', function() { handleFileSelect(this); });
    document.getElementById('btn-take-photo').addEventListener('click', () => document.getElementById('image-upload').click());
    document.getElementById('analyze-btn').addEventListener('click', startAnalysis);
    
    document.getElementById('btn-add-record').addEventListener('click', addManualFood);
    document.getElementById('btn-fav-save-main').addEventListener('click', saveToFavorites);
    document.getElementById('btn-fav-load-main').addEventListener('click', openFavModal);
    
    document.getElementById('meal-mode').addEventListener('change', () => calculateProfile());
    document.getElementById('btn-calc').addEventListener('click', () => calculateProfile());
    
    document.getElementById('btn-ai-fav-save').addEventListener('click', saveAIResultToFavorites);
    document.getElementById('btn-cancel').addEventListener('click', () => closeModal('analysis-modal'));
    document.getElementById('btn-fav-close').addEventListener('click', () => closeModal('fav-modal'));
    
    document.getElementById('btn-toggle-theme').addEventListener('click', toggleTheme);
    document.getElementById('btn-open-lang').addEventListener('click', openLangModal);
    document.getElementById('btn-open-collection').addEventListener('click', openCollectionModal);
    document.getElementById('import-file').addEventListener('change', function() { importData(this); });
    document.getElementById('btn-export').addEventListener('click', exportData);
    document.getElementById('btn-fab-main').addEventListener('click', toggleFabMenu);
    document.getElementById('btn-lang-cancel').addEventListener('click', () => closeModal('lang-modal'));
    document.getElementById('btn-collection-close').addEventListener('click', () => closeModal('collection-modal'));
    document.getElementById('btn-pet-start').addEventListener('click', savePetProfile);

    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', function() {
            setLang(this.getAttribute('data-lang'));
            closeModal('lang-modal');
        });
    });
}

// --- 🐶 寵物系統 ---
function initPetSystem() {
    if (!myPet) {
        document.getElementById('pet-modal').style.display = 'flex';
    } else {
        const todayStr = new Date().toISOString().split('T')[0];
        if (myPet.lastLog !== todayStr) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            if (myPet.lastLog === yesterdayStr) {
                myPet.streak = (myPet.streak || 0) + 1;
            } else if (myPet.lastLog < yesterdayStr) {
                myPet.streak = 1;
            } else {
                myPet.streak = 1;
            }
            myPet.lastLog = todayStr;
            savePetData();
            checkUnlocks();
        }
        renderPet();
    }
}

function savePetProfile() {
    const name = document.getElementById('pet-name-input').value.trim();
    if (!name) { alert("請幫牠取個名字！"); return; }
    myPet = { 
        type: 'dog', name: name, 
        level: 1, exp: 0, streak: 1, lastLog: new Date().toISOString().split('T')[0],
        unlocked: [], equipPet: 'dog', equipAcc: ''
    };
    savePetData();
    document.getElementById('pet-modal').style.display = 'none';
    renderPet();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
}

function savePetData() {
    localStorage.setItem('myPetProfile_v3', JSON.stringify(myPet));
}

function checkUnlocks() {
    let newUnlock = false;
    UNLOCKS.forEach(item => {
        if (myPet.streak >= item.day && !myPet.unlocked.includes(item.id)) {
            myPet.unlocked.push(item.id);
            alert(`🎉 恭喜！連續紀錄 ${item.day} 天，解鎖了「${item.icon} ${item.name}」！`);
            newUnlock = true;
        }
    });
    if(newUnlock) savePetData();
}

function renderPet() {
    if(!myPet) return;
    document.getElementById('pet-name-display').innerText = myPet.name;
    document.getElementById('pet-level').innerText = myPet.level;
    document.getElementById('streak-days').innerText = myPet.streak;
    
    const maxExp = myPet.level * 100;
    const expPct = Math.min(100, (myPet.exp / maxExp) * 100);
    document.getElementById('exp-bar').style.width = `${expPct}%`;

    updatePetStateDisplay();
}

function updatePetStateDisplay() {
    const currentCal = parseFloat(document.getElementById('total-cal-display').innerText) || 0;
    const targetCal = parseFloat(document.getElementById('target-cal-display').innerText) || 2000;
    const ratio = currentCal / targetCal;
    
    const avatarEl = document.getElementById('pet-avatar');
    const msgEl = document.getElementById('pet-msg');
    
    const t = i18n[curLang] || i18n['zh-TW'];
    let mood = 'normal';
    let msg = t.msgNormal;

    if (ratio > 1.1) {
        mood = 'fat'; msg = t.msgFat;
    } else if (ratio >= 0.8 && ratio <= 1.1) {
        mood = 'happy'; msg = t.msgHappy;
    } else if (ratio < 0.2) {
        mood = 'normal'; 
    }

    if (!avatarEl.dataset.isBusy) {
        avatarEl.src = PET_DB['dog'][mood];
    }
    
    const accEl = document.getElementById('pet-accessory');
    accEl.innerText = myPet.equipAcc ? UNLOCKS.find(u=>u.id===myPet.equipAcc)?.icon || '' : '';
    msgEl.innerText = msg;
}

function petInteraction() {
    const avatarEl = document.getElementById('pet-avatar');
    avatarEl.src = PET_DB['dog']['happy'];
    avatarEl.dataset.isBusy = true;
    const msgs = ["汪！", "❤️", "我要吃肉肉！", "加油！"];
    document.getElementById('pet-msg').innerText = msgs[Math.floor(Math.random()*msgs.length)];
    setTimeout(() => {
        avatarEl.dataset.isBusy = false;
        updatePetStateDisplay();
    }, 2000);
}

function playEatAnimation() {
    const avatarEl = document.getElementById('pet-avatar');
    avatarEl.src = PET_DB['dog']['eat'];
    avatarEl.dataset.isBusy = true;
    setTimeout(() => {
        avatarEl.dataset.isBusy = false;
        updatePetStateDisplay();
    }, 3000);
}

function addExp(amount) {
    myPet.exp += amount;
    const maxExp = myPet.level * 100;
    if (myPet.exp >= maxExp) {
        myPet.level++;
        myPet.exp -= maxExp;
        alert(`🎉 ${myPet.name} 升級了！變成了 Lv.${myPet.level}！`);
        confetti({ particleCount: 150, spread: 60 });
    }
    savePetData();
    renderPet();
}

function openCollectionModal() {
    document.getElementById('streak-count-modal').innerText = myPet.streak;
    const grid = document.getElementById('collection-grid');
    grid.innerHTML = '';
    const defaults = [{ id: 'dog', name: '狗狗', type: 'pet', icon: '🐶' }];
    const allItems = [...defaults, ...UNLOCKS];
    allItems.forEach(item => {
        const isDefault = (item.id === 'dog');
        const isUnlocked = isDefault || myPet.unlocked.includes(item.id);
        const isActive = (item.type === 'pet' && myPet.equipPet === item.id) || (item.type === 'acc' && myPet.equipAcc === item.id);
        const div = document.createElement('div');
        div.className = `collection-item ${isUnlocked ? 'unlocked' : ''} ${isActive ? 'active' : ''}`;
        div.onclick = () => equipItem(item, isUnlocked);
        let hint = isUnlocked ? '已擁有' : `連續 ${item.day} 天`;
        if (isDefault) hint = '預設';
        div.innerHTML = `<span class="collection-icon">${isUnlocked ? item.icon : '🔒'}</span><span class="collection-name">${item.name}</span><span class="lock-hint">${hint}</span>`;
        grid.appendChild(div);
    });
    document.getElementById('collection-modal').style.display = 'flex';
    toggleFabMenu();
}

function equipItem(item, isUnlocked) {
    if (!isUnlocked) { alert(`還沒解鎖喔！需要連續紀錄 ${item.day} 天。`); return; }
    if (item.type === 'acc') {
        myPet.equipAcc = (myPet.equipAcc === item.id) ? '' : item.id;
    }
    savePetData();
    openCollectionModal();
    renderPet();
}

// --- 核心與工具函式 ---
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
    const t = i18n[lang];
    // 文字更新 (僅列出部分示例)
    document.getElementById('txt-date-label').innerText = t.dateLabel;
    updateMealUI();
    if(macroChart) { macroChart.data.labels = [t.pro, t.fat, t.carb]; macroChart.update(); }
}

function toggleFabMenu() { document.getElementById('fab-menu').classList.toggle('show'); }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function confirmAddFood(type) { 
    foodItems.push({ type: type, name: tempAIResult.name, nutri: tempAIResult.nutri }); 
    saveFoodData(); 
    renderListAndStats(); 
    closeModal('analysis-modal');
    addExp(20); 
    playEatAnimation(); 
}

function addManualFood() {
    const name = document.getElementById('manual-name').value; const cal = parseFloat(document.getElementById('manual-cal').value); const type = document.getElementById('manual-type').value;
    if (name && cal) {
        foodItems.push({ type: type, name: name, nutri: { calories: cal, protein:0, fat:0, carbohydrate:0, sugar:0, sodium:0, saturatedFat:0, transFat:0 } });
        saveFoodData(); renderListAndStats();
        document.getElementById('manual-name').value = ''; document.getElementById('manual-cal').value = '';
        addExp(10);
        playEatAnimation(); 
    } else { alert(i18n[curLang].alertNameCal); }
}

function exportData() {
    const data = {};
    for(let i=0; i<localStorage.length; i++) {
        const key = localStorage.key(i);
        if(key.startsWith('record_') || key.startsWith('myProfile') || key === 'myFavorites' || key.startsWith('myPetProfile')) {
            data[key] = localStorage.getItem(key);
        }
    }
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `nutrition_backup_${new Date().toISOString().slice(0,10)}.json`; a.click(); toggleFabMenu();
}
function importData(input) {
    const file = input.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            for(let key in data) localStorage.setItem(key, data[key]);
            alert(i18n[curLang].alertImportOk); location.reload();
        } catch(err) { alert(i18n[curLang].alertImportFail); }
    }; reader.readAsText(file); toggleFabMenu();
}

// --- AI 呼叫 (恢復強大指令) ---
async function callCloudflareAI(base64, userDesc) {
    const url = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";
    const promptMap = {
        "zh-TW": "你是一位營養師。請分析圖片食物的「八大營養指標」。回傳純 JSON 格式。欄位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要規則：\n1. 請勿高估份量，若不確定請採用「標準市售份量」或「保守估計」。\n2. 除非圖片中有明顯大份量特徵，否則請以「一人份」為基準。\n",
        "zh-CN": "你是一位营养师。请分析图片食物的「八大营养指标」。回传纯 JSON 格式。栏位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要规则：\n1. 请勿高估份量，若不确定请采用「标准市售份量」或「保守估计」。\n2. 除非图片中有明显大份量特征，否则请以「一人份」为基准。\n",
        "en": "You are a nutritionist. Analyze the image for 8 nutritional metrics. Return PURE JSON. Fields: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat.\n\nCRITICAL INSTRUCTIONS:\n1. Do NOT overestimate portion sizes. Be conservative.\n2. Assume 'standard single serving' unless the image clearly shows a huge portion.\n",
        "ja": "あなたは栄養士です。画像の食品の8つの栄養指標を分析してください。純粋なJSONで返してください。フィールド：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要なルール：\n1. 分量を過大評価しないでください。確信が持てない場合は「標準的な一人前」または「控えめな見積もり」を採用してください。\n"
    };
    
    let prompt = promptMap[curLang] || promptMap['en'];
    if(userDesc) {
        prompt += `\n\n[User's supplementary description]: ${userDesc}\n(Please adjust the estimation based on this description.)`;
    }

    const resp = await fetch(url, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ contents: [{ parts: [ { text: prompt }, { inline_data: { mime_type: "image/jpeg", data: base64 } } ] }] })
    });
    const data = await resp.json();
    let text = data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
    return JSON.parse(text);
}

// --- 其他核心邏輯 ---
function updateMealUI() {
    const t = i18n[curLang].meals;
    const config = {
        "4": { sections: ['breakfast', 'lunch', 'dinner', 'snack'], titles: { breakfast: t.breakfast, lunch: t.lunch, dinner: t.dinner, snack: t.snack } },
        "3": { sections: ['breakfast', 'lunch', 'dinner'], titles: { breakfast: t.breakfast, lunch: t.lunch, dinner: t.dinner } },
        "2": { sections: ['lunch', 'dinner'], titles: { lunch: t.meal1, dinner: t.meal2 } },
        "1": { sections: ['dinner'], titles: { dinner: t.mealBig } }
    }[currentMealMode];

    const container = document.getElementById('meal-sections-container');
    container.innerHTML = '';
    const manualSelect = document.getElementById('manual-type');
    manualSelect.innerHTML = '';
    const modalBtns = document.getElementById('modal-meal-buttons');
    modalBtns.innerHTML = '';

    config.sections.forEach(type => {
        const section = document.createElement('div');
        section.className = 'meal-section';
        section.innerHTML = `<div class="meal-header"><div><span class="meal-title">${config.titles[type]}</span></div><div class="meal-progress" id="prog-${type}">0 kcal</div></div><ul class="meal-list" id="list-${type}"></ul>`;
        container.appendChild(section);

        const opt = document.createElement('option');
        opt.value = type; opt.text = config.titles[type];
        manualSelect.appendChild(opt);

        const btn = document.createElement('button');
        btn.className = `meal-btn ${type}`;
        btn.innerText = config.titles[type];
        btn.onclick = () => confirmAddFood(type);
        modalBtns.appendChild(btn);
    });
}

function calculateProfile(auto=false) {
    const h = parseFloat(document.getElementById('height').value);
    const w = parseFloat(document.getElementById('weight').value);
    const a = parseFloat(document.getElementById('age').value);
    const act = parseFloat(document.getElementById('activity').value);
    const g = document.getElementById('gender').value;
    const mode = document.getElementById('meal-mode').value;

    if (!h || !w || !a) { if(!auto) alert("請填寫資料"); return; }

    let bmr = (g === 'male') ? (10*w + 6.25*h - 5*a + 5) : (10*w + 6.25*h - 5*a - 161);
    let tdee = Math.round(bmr * act);
    targetCalories = Math.round(tdee - 500); 
    if(targetCalories < bmr) targetCalories = Math.round(bmr);
    
    currentMealMode = mode;
    document.getElementById('tdee-val').innerText = tdee;
    document.getElementById('target-cal-val').innerText = targetCalories;
    document.getElementById('target-cal-display').innerText = targetCalories;
    document.getElementById('water-val').innerText = Math.round(w * 35);
    document.getElementById('goal-result').style.display = 'block';

    saveProfile(); updateMealUI(); renderListAndStats(); 
}

function handleFileSelect(input) {
    const file = input.files[0]; if (!file) return;
    const preview = document.getElementById('image-preview');
    preview.src = URL.createObjectURL(file); preview.style.display = 'block';
    document.getElementById('analyze-btn').style.display = 'inline-block';
    document.getElementById('ai-desc-group').style.display = 'block';
    document.getElementById('ai-loading').style.display = 'none';
}

function startAnalysis() {
    // ... (同上方實作)
}

function changeDate() { selectedDate = document.getElementById('current-date').value; document.getElementById('display-date-text').innerText = selectedDate; loadFoodData(selectedDate); }
function saveFoodData() { localStorage.setItem(`record_${selectedDate}`, JSON.stringify(foodItems)); }
function loadFoodData(date) { const stored = localStorage.getItem(`record_${date}`); foodItems = stored ? JSON.parse(stored) : []; renderListAndStats(); }

function saveProfile() {
    const profile = { gender: document.getElementById('gender').value, age: document.getElementById('age').value, height: document.getElementById('height').value, weight: document.getElementById('weight').value, activity: document.getElementById('activity').value, mealMode: document.getElementById('meal-mode').value };
    localStorage.setItem('myProfile_v5', JSON.stringify(profile));
}
function loadProfile() {
    const stored = localStorage.getItem('myProfile_v5');
    if (stored) {
        const p = JSON.parse(stored);
        document.getElementById('gender').value = p.gender; document.getElementById('age').value = p.age; document.getElementById('height').value = p.height;
        document.getElementById('weight').value = p.weight; document.getElementById('activity').value = p.activity;
        if(p.mealMode) document.getElementById('meal-mode').value = p.mealMode;
        calculateProfile(true);
    } else { updateMealUI(); }
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
    
    // 更新所有營養指標 (修復)
    document.getElementById('sum-protein').innerText = total.pro.toFixed(1);
    document.getElementById('sum-fat').innerText = total.fat.toFixed(1);
    document.getElementById('sum-carb').innerText = total.carb.toFixed(1);
    document.getElementById('sum-sugar').innerText = total.sugar.toFixed(1);
    document.getElementById('sum-sodium').innerText = Math.round(total.sod);
    document.getElementById('sum-sat-fat').innerText = total.sat.toFixed(1);
    document.getElementById('sum-trans-fat').innerText = total.trans.toFixed(1);
    
    // 水分
    const weight = parseFloat(document.getElementById('weight').value) || 60;
    document.getElementById('water-val').innerText = Math.round(weight * 35);

    updateCharts(total);
    updatePetStateDisplay(); 
}

function deleteItem(index) { if(confirm("確定要刪除？")) { foodItems.splice(index, 1); saveFoodData(); renderListAndStats(); } }
function toBase64(file) { return new Promise((r, j) => { const reader = new FileReader(); reader.readAsDataURL(file); reader.onload = () => r(reader.result.split(',')[1]); reader.onerror = j; }); }
