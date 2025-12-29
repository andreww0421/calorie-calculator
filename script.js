// --- 多國語言設定 (i18n) - 完整版 ---
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
    "zh-CN": {
        dateLabel: "📅 记录日期：", totalIntake: "今日摄取", goal: "目标",
        pro: "蛋白质", fat: "脂肪", carb: "碳水", sugar: "糖", sod: "钠(mg)", sat: "饱和脂", trans: "反式脂", water: "目标水",
        chartTitle: "📊 营养与热量分析", chartMacro: "今日三大营养素 (PFC)", chartWeekly: "本周热量趋势",
        aiTitle: "📸 AI 饮食分析", btnPhoto: "📸 1. 拍照 / 选择图片", btnAnalyze: "发送图片分析", aiLoading: "AI 正在分析食物营养，请稍候...",
        aiDescPlaceholder: "📝 补充说明 (例如：这是一碗牛肉面，没加葱)...",
        recordTitle: "饮食记录", manualLabel: "手动补充 (仅热量)", placeholderName: "食物名称", placeholderCal: "卡路里",
        btnAdd: "➕ 加入记录", btnFavSave: "加入收藏", btnFavLoad: "选择常吃食物", btnFavAi: "加入收藏",
        settingsTitle: "⚙️ 个人数据设定", gender: "性别", male: "男", female: "女", age: "年龄", height: "身高", weight: "体重",
        activity: "活动量", act1: "久坐 (办公室)", act2: "轻度 (每周运动1-3天)", act3: "中度 (每周运动3-5天)", act4: "高度 (每周运动6-7天)",
        mealMode: "🍽️ 每日餐数模式", mode4: "标准 (3餐+点心)", mode3: "3餐 (无点心)", mode2: "2餐 (168断食)", mode1: "1餐 (OMAD)",
        btnCalc: "🔄 保存并更新界面", resTdee: "TDEE", resTarget: "减重目标",
        modalTitle: "AI 分析报告", modalAsk: "请问这是哪一餐？", btnCancel: "取消",
        favTitle: "常吃食物清单", btnClose: "关闭",
        menuImport: "导入还原", menuExport: "导出备份", menuTheme: "切换主题", menuLang: "语言", menuCollection: "收藏系统", suggest: "建议",
        langTitle: "语言", langCancel: "取消",
        meals: { breakfast: "🍳 早餐", lunch: "🍱 午餐", dinner: "🍲 晚餐", snack: "🍪 点心", meal1: "🍽️ 第一餐", meal2: "🍽️ 第二餐", mealBig: "🏆 唯一大餐" },
        alertDel: "确定要删除？", alertFavAdded: "已加入收藏！", alertFavExist: "这个食物已经在收藏清单啰！", alertSelImg: "请先选择图片！", alertAiFail: "AI 分析失败：", alertFill: "请填写资料", alertNameCal: "请输入名称与热量", alertImportOk: "🎉 资料还原成功！", alertImportFail: "❌ 档案格式错误",
        msgNormal: "主人，今天吃什么？", msgHappy: "太棒了！我觉得充满活力！", msgFat: "呃...我好像吃太饱了...", msgThirsty: "水...我要喝水...", msgSad: "主人...别忘了照顾我..."
    },
    "en": {
        dateLabel: "📅 Date:", totalIntake: "Total Intake", goal: "Goal",
        pro: "Protein", fat: "Fat", carb: "Carb", sugar: "Sugar", sod: "Sodium", sat: "Sat. Fat", trans: "Trans Fat", water: "Water",
        chartTitle: "📊 Nutrition Analysis", chartMacro: "Macros (PFC)", chartWeekly: "Weekly Calories",
        aiTitle: "📸 AI Analysis", btnPhoto: "📸 1. Select Photo", btnAnalyze: "Analyze", aiLoading: "AI is analyzing...",
        aiDescPlaceholder: "📝 Optional description (e.g. Beef noodles, no onions)...",
        recordTitle: "Food Log", manualLabel: "Manual Entry (Calorie only)", placeholderName: "Food Name", placeholderCal: "Calories",
        btnAdd: "➕ Add Log", btnFavSave: "Save Favorite", btnFavLoad: "Load Favorite", btnFavAi: "Save to Favorites",
        settingsTitle: "⚙️ Profile Settings", gender: "Gender", male: "Male", female: "Female", age: "Age", height: "Height", weight: "Weight",
        activity: "Activity Level", act1: "Sedentary", act2: "Lightly Active", act3: "Moderately Active", act4: "Very Active",
        mealMode: "🍽️ Meal Mode", mode4: "Standard (3+Snack)", mode3: "3 Meals", mode2: "2 Meals (168)", mode1: "OMAD",
        btnCalc: "🔄 Save & Update", resTdee: "TDEE", resTarget: "Target",
        modalTitle: "AI Report", modalAsk: "Which meal is this?", btnCancel: "Cancel",
        favTitle: "Favorite Foods", btnClose: "Close",
        menuImport: "Import Data", menuExport: "Export Data", menuTheme: "Switch Theme", menuLang: "Language", menuCollection: "Collection", suggest: "Goal",
        langTitle: "Language", langCancel: "Cancel",
        meals: { breakfast: "🍳 Breakfast", lunch: "🍱 Lunch", dinner: "🍲 Dinner", snack: "🍪 Snack", meal1: "🍽️ Meal 1", meal2: "🍽️ Meal 2", mealBig: "🏆 Big Meal" },
        alertDel: "Delete this item?", alertFavAdded: "Saved to favorites!", alertFavExist: "Already in favorites!", alertSelImg: "Select image first!", alertAiFail: "AI Failed: ", alertFill: "Fill all fields", alertNameCal: "Enter name and calories", alertImportOk: "🎉 Data Restored!", alertImportFail: "❌ Invalid File",
        msgNormal: "What are we eating today?", msgHappy: "I feel great!", msgFat: "Ugh... too much food...", msgThirsty: "Water... please...", msgSad: "Don't forget me..."
    },
    "ja": {
        dateLabel: "📅 日付：", totalIntake: "摂取カロリー", goal: "目標",
        pro: "タンパク質", fat: "脂質", carb: "炭水化物", sugar: "糖質", sod: "塩分", sat: "飽和脂肪", trans: "トランス脂肪", water: "水分目標",
        chartTitle: "📊 栄養分析", chartMacro: "三大栄養素 (PFC)", chartWeekly: "週間カロリー",
        aiTitle: "📸 AI食事分析", btnPhoto: "📸 1. 写真を選択", btnAnalyze: "分析開始", aiLoading: "AI分析中...",
        aiDescPlaceholder: "📝 補足説明 (例: 牛肉麺、ネギ抜き)...",
        recordTitle: "食事記録", manualLabel: "手動入力 (カロリーのみ)", placeholderName: "食品名", placeholderCal: "kcal",
        btnAdd: "➕ 記録追加", btnFavSave: "お気に入り保存", btnFavLoad: "お気に入りから選択", btnFavAi: "お気に入りに保存",
        settingsTitle: "⚙️ プロフィール設定", gender: "性別", male: "男性", female: "女性", age: "年齢", height: "身長", weight: "体重",
        activity: "活動レベル", act1: "座り仕事", act2: "軽い運動 (週1-3)", act3: "中程度の運動 (週3-5)", act4: "激しい運動 (週6-7)",
        mealMode: "🍽️ 食事回数", mode4: "標準 (3食+間食)", mode3: "3食のみ", mode2: "2食 (168断食)", mode1: "1食 (OMAD)",
        btnCalc: "🔄 保存して更新", resTdee: "TDEE", resTarget: "目標",
        modalTitle: "AI分析レポート", modalAsk: "どの食事ですか？", btnCancel: "キャンセル",
        favTitle: "お気に入りリスト", btnClose: "閉じる",
        menuImport: "復元", menuExport: "バックアップ", menuTheme: "テーマ切替", menuLang: "言語", menuCollection: "コレクション", suggest: "目安",
        langTitle: "言語", langCancel: "キャンセル",
        meals: { breakfast: "🍳 朝食", lunch: "🍱 昼食", dinner: "🍲 夕食", snack: "🍪 間食", meal1: "🍽️ 食事1", meal2: "🍽️ 食事2", mealBig: "🏆 大盛り" },
        alertDel: "削除しますか？", alertFavAdded: "お気に入りに保存しました！", alertFavExist: "既に保存されています", alertSelImg: "画像を選択してください", alertAiFail: "AIエラー: ", alertFill: "全ての項目を入力してください", alertNameCal: "名称とカロリーを入力", alertImportOk: "🎉 復元完了！", alertImportFail: "❌ ファイルエラー",
        msgNormal: "今日は何を食べますか？", msgHappy: "最高！元気いっぱいです！", msgFat: "うぅ...食べ過ぎました...", msgThirsty: "水...水をください...", msgSad: "忘れないで..."
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
    // 1. 先綁定事件
    setupEventListeners();
    
    // 2. 載入設定
    setTheme(curTheme);
    setLang(curLang);
    document.getElementById('current-date').value = selectedDate;
    
    // 3. 初始化功能
    initPetSystem();
    loadProfile();
    loadFoodData(selectedDate);
    initCharts();
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
    
    // 更新介面文字
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
        'txt-fav-title': t.favTitle, 'btn-fav-close': t.btnClose, 'menu-import': t.menuImport, 'menu-export': t.menuExport, 'menu-theme': t.menuTheme, 'menu-lang': t.menuLang, 'menu-collection': t.menuCollection,
        'txt-lang-title': t.langTitle, 'btn-lang-cancel': t.langCancel
    };

    for(let id in mapping) {
        const el = document.getElementById(id);
        if(el) el.innerText = mapping[id];
    }

    document.getElementById('manual-name').placeholder = t.placeholderName;
    document.getElementById('manual-cal').placeholder = t.placeholderCal;
    document.getElementById('ai-desc').placeholder = t.aiDescPlaceholder;
    document.querySelectorAll('.txt-suggest').forEach(el => el.innerText = t.suggest);
    
    updateMealUI(); 
    if(macroChart) {
        macroChart.data.labels = [t.pro, t.fat, t.carb];
        macroChart.update();
    }
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
        if(key.startsWith('record_') || key.startsWith('myProfile') || key === 'myFavorites') {
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
    const input = document.getElementById('image-upload');
    const file = input.files[0]; if (!file) { alert(i18n[curLang].alertSelImg); return; }
    const desc = document.getElementById('ai-desc').value.trim();

    document.getElementById('analyze-btn').style.display = 'none';
    document.getElementById('ai-loading').style.display = 'block';

    toBase64(file).then(base64 => {
        return callCloudflareAI(base64, desc);
    }).then(result => {
        if (result) {
            tempAIResult = {
                name: result.foodName,
                nutri: {
                    calories: Number(result.calories) || 0, protein: Number(result.protein) || 0, fat: Number(result.fat) || 0,
                    carbohydrate: Number(result.carbohydrate) || 0, sugar: Number(result.sugar) || 0, sodium: Number(result.sodium) || 0,
                    saturatedFat: Number(result.saturatedFat) || 0, transFat: Number(result.transFat) || 0
                }
            }; 
            showModal();
        }
    }).catch(e => {
        console.error(e); alert(i18n[curLang].alertAiFail + e.message);
        document.getElementById('analyze-btn').style.display = 'inline-block';
    }).finally(() => {
        document.getElementById('ai-loading').style.display = 'none';
    });
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
