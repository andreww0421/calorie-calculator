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
    // ... (其他語言省略以節省篇幅，保留之前的翻譯即可) ...
    "en": {
        dateLabel: "📅 Date:", totalIntake: "Total Intake", goal: "Goal",
        // ... (省略)
        msgNormal: "What are we eating today?", msgHappy: "I feel great!", msgFat: "Ugh... too much food...", msgThirsty: "Water... please...", msgSad: "Don't forget me..."
    }
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

// --- 🐶 寵物系統變數 ---
// GIF 檔案路徑設定
const PET_DB = {
    dog: { 
        normal: 'dog_animation/dog_idle.gif', 
        happy: 'dog_animation/dog_happy.gif', 
        sad: 'dog_animation/dog_sad.gif', 
        fat: 'dog_animation/dog_fat.gif',
        eat: 'dog_animation/dog_eat.gif',
        walk: 'dog_animation/dog_walk.gif'
    }
    // 未來可以新增 cat: { ... }
};

const UNLOCKS = [
    { id: 'scarf', name: '領巾', day: 3, type: 'acc', icon: '🧣' },
    { id: 'glasses', name: '墨鏡', day: 7, type: 'acc', icon: '🕶️' }
    // 可以繼續擴充
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

// --- 🐶 寵物系統核心 ---
function initPetSystem() {
    if (!myPet) {
        document.getElementById('pet-modal').style.display = 'flex';
    } else {
        // 檢查簽到
        const todayStr = new Date().toISOString().split('T')[0];
        if (myPet.lastLog !== todayStr) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            if (myPet.lastLog === yesterdayStr) {
                myPet.streak = (myPet.streak || 0) + 1;
            } else if (myPet.lastLog < yesterdayStr) {
                myPet.streak = 1; // 斷簽
            } else {
                myPet.streak = 1; // 首次
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
    
    // 經驗值條
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
    
    // 預設語言包兜底
    const t = i18n[curLang] || i18n['zh-TW'];
    
    let mood = 'normal';
    let msg = t.msgNormal;

    // 情緒邏輯
    if (ratio > 1.1) {
        mood = 'fat'; msg = t.msgFat;
    } else if (ratio >= 0.8 && ratio <= 1.1) {
        mood = 'happy'; msg = t.msgHappy;
    } else if (ratio < 0.2) {
        mood = 'normal'; 
    }

    // 圖片路徑切換
    // 如果有正在進行的特殊動作 (例如吃飯)，則不覆蓋
    if (!avatarEl.dataset.isBusy) {
        avatarEl.src = PET_DB['dog'][mood];
    }
    
    // 配件
    const accEl = document.getElementById('pet-accessory');
    accEl.innerText = myPet.equipAcc ? UNLOCKS.find(u=>u.id===myPet.equipAcc)?.icon || '' : '';

    msgEl.innerText = msg;
}

function petInteraction() {
    // 點擊互動：播放開心動畫 2 秒
    const avatarEl = document.getElementById('pet-avatar');
    const originalSrc = avatarEl.src;
    
    avatarEl.src = PET_DB['dog']['happy'];
    avatarEl.dataset.isBusy = true;
    
    // 隨機對話
    const msgs = ["汪！", "❤️", "我要吃肉肉！", "加油！"];
    document.getElementById('pet-msg').innerText = msgs[Math.floor(Math.random()*msgs.length)];

    setTimeout(() => {
        avatarEl.dataset.isBusy = false;
        updatePetStateDisplay(); // 回復原本狀態
    }, 2000);
}

function playEatAnimation() {
    // 吃飯動畫：播放 3 秒
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

// --- 收藏視窗 ---
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

        div.innerHTML = `
            <span class="collection-icon">${isUnlocked ? item.icon : '🔒'}</span>
            <span class="collection-name">${item.name}</span>
            <span class="lock-hint">${hint}</span>
        `;
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
    // ... (這裡省略了重複的 mapping 代碼，請使用前面的 mapping 邏輯) ...
    const t = i18n[lang];
    document.getElementById('txt-date-label').innerText = t.dateLabel;
    // ... 請確保這裡有完整的文字更新邏輯 ...
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
    playEatAnimation(); // 播放吃飯動畫
}

function addManualFood() {
    const name = document.getElementById('manual-name').value; const cal = parseFloat(document.getElementById('manual-cal').value); const type = document.getElementById('manual-type').value;
    if (name && cal) {
        foodItems.push({ type: type, name: name, nutri: { calories: cal, protein:0, fat:0, carbohydrate:0, sugar:0, sodium:0, saturatedFat:0, transFat:0 } });
        saveFoodData(); renderListAndStats();
        document.getElementById('manual-name').value = ''; document.getElementById('manual-cal').value = '';
        addExp(10);
        playEatAnimation(); // 播放吃飯動畫
    } else { alert(i18n[curLang].alertNameCal); }
}

// --- PWA 與檔案處理 ---
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

// --- AI 呼叫 ---
async function callCloudflareAI(base64, userDesc) {
    const url = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";
    const prompt = `Analyze food image. Return JSON: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat. ${userDesc ? 'Note: '+userDesc : ''}`;
    
    const resp = await fetch(url, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ contents: [{ parts: [ { text: prompt }, { inline_data: { mime_type: "image/jpeg", data: base64 } } ] }] })
    });
    const data = await resp.json();
    let text = data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
    return JSON.parse(text);
}

// --- 其他核心邏輯 (計算、圖表等) ---
// ... (保留上一版 script.js 中的 initCharts, updateCharts, loadProfile, calculateProfile, renderListAndStats, changeDate, saveFoodData, loadFoodData, deleteItem, toBase64 等函式) ...
// 為了版面簡潔，這些邏輯完全不用變，請直接從上一版複製過來放在下面。
