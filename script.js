// --- PWA Service Worker ---
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log('App 準備就緒'))
        .catch((error) => console.log('App 註冊失敗:', error));
}

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
        menuImport: "匯入還原", menuExport: "匯出備份", menuTheme: "切換主題", menuLang: "語言", suggest: "建議",
        langTitle: "語言", langCancel: "取消",
        meals: { breakfast: "🍳 早餐", lunch: "🍱 午餐", dinner: "🍲 晚餐", snack: "🍪 點心", meal1: "🍽️ 第一餐", meal2: "🍽️ 第二餐", mealBig: "🏆 唯一大餐" },
        alertDel: "確定要刪除？", alertFavAdded: "已加入最愛！", alertFavExist: "這個食物已經在最愛清單囉！", alertSelImg: "請先選擇圖片！", alertAiFail: "AI 分析失敗：", alertFill: "請填寫資料", alertNameCal: "請輸入名稱與熱量", alertImportOk: "🎉 資料還原成功！", alertImportFail: "❌ 檔案格式錯誤"
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
        menuImport: "导入还原", menuExport: "导出备份", menuTheme: "切换主题", menuLang: "语言", suggest: "建议",
        langTitle: "语言", langCancel: "取消",
        meals: { breakfast: "🍳 早餐", lunch: "🍱 午餐", dinner: "🍲 晚餐", snack: "🍪 点心", meal1: "🍽️ 第一餐", meal2: "🍽️ 第二餐", mealBig: "🏆 唯一大餐" },
        alertDel: "确定要删除？", alertFavAdded: "已加入收藏！", alertFavExist: "这个食物已经在收藏清单啰！", alertSelImg: "请先选择图片！", alertAiFail: "AI 分析失败：", alertFill: "请填写资料", alertNameCal: "请输入名称与热量", alertImportOk: "🎉 资料还原成功！", alertImportFail: "❌ 档案格式错误"
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
        menuImport: "Import Data", menuExport: "Export Data", menuTheme: "Switch Theme", menuLang: "Language", suggest: "Goal",
        langTitle: "Language", langCancel: "Cancel",
        meals: { breakfast: "🍳 Breakfast", lunch: "🍱 Lunch", dinner: "🍲 Dinner", snack: "🍪 Snack", meal1: "🍽️ Meal 1", meal2: "🍽️ Meal 2", mealBig: "🏆 Big Meal" },
        alertDel: "Delete this item?", alertFavAdded: "Saved to favorites!", alertFavExist: "Already in favorites!", alertSelImg: "Select image first!", alertAiFail: "AI Failed: ", alertFill: "Fill all fields", alertNameCal: "Enter name and calories", alertImportOk: "🎉 Data Restored!", alertImportFail: "❌ Invalid File"
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
        menuImport: "復元", menuExport: "バックアップ", menuTheme: "テーマ切替", menuLang: "言語", suggest: "目安",
        langTitle: "言語", langCancel: "キャンセル",
        meals: { breakfast: "🍳 朝食", lunch: "🍱 昼食", dinner: "🍲 夕食", snack: "🍪 間食", meal1: "🍽️ 食事1", meal2: "🍽️ 食事2", mealBig: "🏆 大盛り" },
        alertDel: "削除しますか？", alertFavAdded: "お気に入りに保存しました！", alertFavExist: "既に保存されています", alertSelImg: "画像を選択してください", alertAiFail: "AIエラー: ", alertFill: "全ての項目を入力してください", alertNameCal: "名称とカロリーを入力", alertImportOk: "🎉 復元完了！", alertImportFail: "❌ ファイルエラー"
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

let macroChart = null;
let weeklyChart = null;

// --- 初始化 ---
document.addEventListener('DOMContentLoaded', () => {
    setTheme(curTheme);
    setLang(curLang);
    document.getElementById('current-date').value = selectedDate;
    loadProfile();
    loadFoodData(selectedDate);
    initCharts();
    setupEventListeners();
});

function setupEventListeners() {
    // 按鈕事件綁定
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
    document.getElementById('import-file').addEventListener('change', function() { importData(this); });
    document.getElementById('btn-export').addEventListener('click', exportData);
    document.getElementById('btn-fab-main').addEventListener('click', toggleFabMenu);
    document.getElementById('btn-lang-cancel').addEventListener('click', () => closeModal('lang-modal'));

    // 語言選擇
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', function() {
            setLang(this.getAttribute('data-lang'));
            closeModal('lang-modal');
        });
    });
}

// --- 主題切換 ---
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

// --- 語言切換 ---
function openLangModal() {
    document.getElementById('lang-modal').style.display = 'flex';
    toggleFabMenu(); 
}

function setLang(lang) {
    curLang = lang;
    localStorage.setItem('appLang', lang);
    const t = i18n[lang];

    const mapping = {
        'txt-date-label': t.dateLabel, 'txt-total-intake': t.totalIntake, 'txt-goal-label': t.goal,
        'lbl-pro': t.pro, 'lbl-fat': t.fat, 'lbl-carb': t.carb, 'lbl-sugar': t.sugar, 'lbl-sod': t.sod, 'lbl-sat': t.sat, 'lbl-trans': t.trans, 'lbl-water': t.water,
        'txt-chart-title': t.chartTitle, 'txt-chart-macro': t.chartMacro, 'txt-chart-weekly': t.chartWeekly,
        'txt-ai-title': t.aiTitle, 'btn-take-photo': t.btnPhoto, 'txt-analyze-btn': t.btnAnalyze, 'txt-ai-loading': t.aiLoading,
        'txt-record-title': t.recordTitle, 'txt-manual-label': t.manualLabel, 'btn-add-record': t.btnAdd, 'btn-fav-save': t.btnFavSave, 'btn-fav-load': t.btnFavLoad, 'btn-fav-ai': t.btnFavAi,
        'txt-settings-title': t.settingsTitle, 'lbl-gender': t.gender, 'opt-male': t.male, 'opt-female': t.female,
        'lbl-age': t.age, 'lbl-height': t.height, 'lbl-weight': t.weight, 'lbl-activity': t.activity,
        'opt-act-1': t.act1, 'opt-act-2': t.act2, 'opt-act-3': t.act3, 'opt-act-4': t.act4,
        'lbl-meal-mode': t.mealMode, 'opt-mode-4': t.mode4, 'opt-mode-3': t.mode3, 'opt-mode-2': t.mode2, 'opt-mode-1': t.mode1,
        'btn-calc': t.btnCalc, 'txt-res-tdee': t.resTdee, 'txt-res-target': t.resTarget,
        'txt-modal-title': t.modalTitle, 'txt-modal-ask': t.modalAsk, 'btn-cancel': t.btnCancel,
        'txt-fav-title': t.favTitle, 'btn-fav-close': t.btnClose, 'menu-import': t.menuImport, 'menu-export': t.menuExport, 'menu-theme': t.menuTheme, 'menu-lang': t.menuLang,
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

// --- 我的最愛 (手動與AI) ---
function saveToFavorites() {
    const name = document.getElementById('manual-name').value;
    const cal = document.getElementById('manual-cal').value;
    if(!name || !cal) { alert(i18n[curLang].alertNameCal); return; }
    if(favoriteFoods.some(f => f.name === name)) { alert(i18n[curLang].alertFavExist); return; }
    favoriteFoods.push({ name: name, cal: parseFloat(cal) });
    localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
    alert(i18n[curLang].alertFavAdded);
}

function saveAIResultToFavorites() {
    if(!tempAIResult) return;
    const name = tempAIResult.name;
    const cal = tempAIResult.nutri.calories;
    
    if(favoriteFoods.some(f => f.name === name)) { alert(i18n[curLang].alertFavExist); return; }
    favoriteFoods.push({ name: name, cal: cal });
    localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
    alert(i18n[curLang].alertFavAdded);
}

function openFavModal() {
    const list = document.getElementById('fav-list-container');
    list.innerHTML = '';
    if(favoriteFoods.length === 0) { list.innerHTML = '<p style="color:#888; text-align:center;">(Empty)</p>'; } 
    else {
        favoriteFoods.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'fav-item-row';
            div.innerHTML = `<div class="fav-item-name" onclick="pickFav(${index})">${item.name} <span style="font-size:0.9em; opacity:0.8;">(${item.cal} kcal)</span></div><button class="btn-delete" onclick="deleteFav(${index})">X</button>`;
            list.appendChild(div);
        });
    }
    document.getElementById('fav-modal').style.display = 'flex';
}
function pickFav(index) {
    const item = favoriteFoods[index];
    document.getElementById('manual-name').value = item.name;
    document.getElementById('manual-cal').value = item.cal;
    closeModal('fav-modal');
}
function deleteFav(index) {
    if(confirm(i18n[curLang].alertDel)) {
        favoriteFoods.splice(index, 1);
        localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
        openFavModal();
    }
}

// --- 圖表 ---
function initCharts() {
    const t = i18n[curLang];
    Chart.defaults.color = curTheme === 'dark' ? '#e0e0e0' : '#2c3e50';
    
    const ctxMacro = document.getElementById('macroChart').getContext('2d');
    macroChart = new Chart(ctxMacro, {
        type: 'doughnut',
        data: {
            labels: [t.pro, t.fat, t.carb],
            datasets: [{ data: [0, 0, 0], backgroundColor: ['#ff7675', '#fdcb6e', '#74b9ff'], borderColor: 'transparent' }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    const ctxWeekly = document.getElementById('weeklyChart').getContext('2d');
    weeklyChart = new Chart(ctxWeekly, {
        type: 'bar',
        data: {
            labels: [], datasets: [{ label: 'kcal', data: [], backgroundColor: '#2ecc71', borderRadius: 5 }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.1)' } } } }
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
    if (macroChart) {
        macroChart.data.datasets[0].data = [Math.round(totalNutri.pro), Math.round(totalNutri.fat), Math.round(totalNutri.carb)];
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

// --- 核心運算 ---
function updateMealUI() {
    const t = i18n[curLang].meals;
    const configs = {
        "4": { sections: ['breakfast', 'lunch', 'dinner', 'snack'], titles: { breakfast: t.breakfast, lunch: t.lunch, dinner: t.dinner, snack: t.snack }, ratios: { breakfast: 0.25, lunch: 0.35, dinner: 0.30, snack: 0.10 } },
        "3": { sections: ['breakfast', 'lunch', 'dinner'], titles: { breakfast: t.breakfast, lunch: t.lunch, dinner: t.dinner }, ratios: { breakfast: 0.30, lunch: 0.40, dinner: 0.30 } },
        "2": { sections: ['lunch', 'dinner'], titles: { lunch: t.meal1, dinner: t.meal2 }, ratios: { lunch: 0.50, dinner: 0.50 } },
        "1": { sections: ['dinner'], titles: { dinner: t.mealBig }, ratios: { dinner: 1.0 } }
    };

    const config = configs[currentMealMode];
    const allTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

    allTypes.forEach(type => {
        const section = document.getElementById(`section-${type}`);
        if (config.sections.includes(type)) {
            section.style.display = 'block';
            document.getElementById(`title-${type}`).innerText = config.titles[type];
            const goal = Math.round(targetCalories * (config.ratios[type] || 0));
            document.getElementById(`goal-${type}`).innerText = goal;
        } else {
            section.style.display = 'none';
        }
    });

    const manualSelect = document.getElementById('manual-type');
    manualSelect.innerHTML = '';
    config.sections.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.text = config.titles[type];
        manualSelect.appendChild(option);
    });

    const modalBtns = document.getElementById('modal-meal-buttons');
    modalBtns.innerHTML = '';
    config.sections.forEach(type => {
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

    if (!h || !w || !a) { if(!auto) alert(i18n[curLang].alertFill); return; }

    let bmr = (g === 'male') ? (10*w + 6.25*h - 5*a + 5) : (10*w + 6.25*h - 5*a - 161);
    let tdee = Math.round(bmr * act);
    targetCalories = tdee - 500; if(targetCalories < bmr) targetCalories = Math.round(bmr);
    
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

async function startAnalysis() {
    const input = document.getElementById('image-upload');
    const file = input.files[0]; if (!file) { alert(i18n[curLang].alertSelImg); return; }
    const desc = document.getElementById('ai-desc').value.trim();

    document.getElementById('analyze-btn').style.display = 'none';
    document.getElementById('ai-loading').style.display = 'block';

    try {
        const base64 = await toBase64(file);
        const result = await callCloudflareAI(base64, desc);
        if (result) {
            tempAIResult = {
                name: result.foodName,
                nutri: {
                    calories: Number(result.calories) || 0, protein: Number(result.protein) || 0, fat: Number(result.fat) || 0,
                    carbohydrate: Number(result.carbohydrate) || 0, sugar: Number(result.sugar) || 0, sodium: Number(result.sodium) || 0,
                    saturatedFat: Number(result.saturatedFat) || 0, transFat: Number(result.transFat) || 0
                }
            }; showModal();
        }
    } catch (e) {
        console.error(e); alert(i18n[curLang].alertAiFail + e.message);
        document.getElementById('analyze-btn').style.display = 'inline-block';
    } finally { document.getElementById('ai-loading').style.display = 'none'; }
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
        const el = document.getElementById(`prog-${type}`); const goalEl = document.getElementById(`goal-${type}`);
        if(el && goalEl && el.offsetParent !== null) {
            const current = Math.round(mealTotals[type]); const goal = parseInt(goalEl.innerText) || 0;
            el.innerText = `${current} kcal`; el.style.color = (goal > 0 && current > goal) ? '#e74c3c' : 'var(--text-color)';
        }
    }
    document.getElementById('total-cal-display').innerText = Math.round(total.cal);
    ['pro','fat','carb','sugar','sod','sat','trans','water'].forEach((k,i) => {
        // 注意：這裡的索引對應需要根據上面 total 物件的順序調整，或是直接用 key
        // 這裡簡化處理，因為 total 物件順序與 HTML ID 不完全對應
        // 為求精確，建議手動對應：
    });
    // 手動更新營養素
    document.getElementById('sum-protein').innerText = total.pro.toFixed(1);
    document.getElementById('sum-fat').innerText = total.fat.toFixed(1);
    document.getElementById('sum-carb').innerText = total.carb.toFixed(1);
    document.getElementById('sum-sugar').innerText = total.sugar.toFixed(1);
    document.getElementById('sum-sodium').innerText = Math.round(total.sod);
    document.getElementById('sum-sat-fat').innerText = total.sat.toFixed(1);
    document.getElementById('sum-trans-fat').innerText = total.trans.toFixed(1);

    updateCharts(total);
}

function deleteItem(index) { if(confirm(i18n[curLang].alertDel)) { foodItems.splice(index, 1); saveFoodData(); renderListAndStats(); } }

function toggleFabMenu() { document.getElementById('fab-menu').classList.toggle('show'); }
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
function triggerImport() { document.getElementById('import-file').click(); }
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

async function callCloudflareAI(base64, userDesc) {
    const url = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";
    const promptMap = {
        "zh-TW": "你是一位營養師。請分析圖片食物的「八大營養指標」。回傳純 JSON 格式。欄位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要規則：\n1. 請勿高估份量，若不確定請採用「標準市售份量」或「保守估計」。\n2. 除非圖片中有明顯大份量特徵，否則請以「一人份」為基準。\n",
        "zh-CN": "你是一位营养师。请分析图片食物的「八大营养指标」。回传纯 JSON 格式。栏位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要规则：\n1. 请勿高估份量，若不确定请采用「标准市售份量」或「保守估计」。\n2. 除非图片中有明显大份量特征，否则请以「一人份」为基准。\n",
        "en": "You are a nutritionist. Analyze the image for 8 nutritional metrics. Return PURE JSON. Fields: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat.\n\nCRITICAL INSTRUCTIONS:\n1. Do NOT overestimate portion sizes. Be conservative.\n2. Assume 'standard single serving' unless the image clearly shows a huge portion.\n",
        "ja": "あなたは栄養士です。画像の食品の8つの栄養指標を分析してください。純粋なJSONで返してください。フィールド：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要なルール：\n1. 分量を過大評価しないでください。確信が持てない場合は「標準的な一人前」または「控えめな見積もり」を採用してください。\n"
    };
    
    let prompt = promptMap[curLang];
    if(userDesc) {
        prompt += `\n\n[User's supplementary description]: ${userDesc}\n(Please adjust the estimation based on this description.)`;
    }

    const resp = await fetch(url, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ contents: [{ parts: [ { text: prompt }, { inline_data: { mime_type: "image/jpeg", data: base64 } } ] }] })
    });
    const data = await resp.json();
    if (data.error) throw new Error(JSON.stringify(data.error));
    let text = data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
    return JSON.parse(text);
}

function showModal() {
    const d = tempAIResult;
    document.getElementById('analysis-content').innerHTML = `<strong>${d.name}</strong><br>🔥 ${d.nutri.calories}<br>🥩 ${d.nutri.protein} | 🥑 ${d.nutri.fat} | 🍞 ${d.nutri.carbohydrate}`;
    document.getElementById('analysis-modal').style.display = 'flex';
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; if(id==='analysis-modal') tempAIResult = null; }
function confirmAddFood(type) { foodItems.push({ type: type, name: tempAIResult.name, nutri: tempAIResult.nutri }); saveFoodData(); renderListAndStats(); closeModal('analysis-modal'); }
function addManualFood() {
    const name = document.getElementById('manual-name').value; const cal = parseFloat(document.getElementById('manual-cal').value); const type = document.getElementById('manual-type').value;
    if (name && cal) {
        foodItems.push({ type: type, name: name, nutri: { calories: cal, protein:0, fat:0, carbohydrate:0, sugar:0, sodium:0, saturatedFat:0, transFat:0 } });
        saveFoodData(); renderListAndStats();
        document.getElementById('manual-name').value = ''; document.getElementById('manual-cal').value = '';
    } else { alert(i18n[curLang].alertNameCal); }
}
function toBase64(file) { return new Promise((r, j) => { const reader = new FileReader(); reader.readAsDataURL(file); reader.onload = () => r(reader.result.split(',')[1]); reader.onerror = j; }); }
