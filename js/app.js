import { i18n } from './config.js';
import { toBase64, getLocalDateString } from './utils.js';
import { foodItems, targetCalories, tempAIResult, tempAIResultSaved, selectedDate, currentMealMode, favoriteFoods, curLang, curTheme, saveFoodData, loadFoodData, saveWeightData, loadWeightData, getWeightHistory, saveProfile, loadProfile, exportData, importData, getCalorieHistory, getProteinHistory, setTargetCalories, setTempAIResult, setTempAIResultSaved, setSelectedDate, setCurrentMealMode, setCurLang, setCurTheme } from './data.js';
import { callCloudflareAI, callCloudflareAIText, recalculateFromItems } from './api.js';
import { showToast, switchView, setChartRange, initCharts, updateTrendCharts, updateChartTheme, updatePetStatus, showEatingAnimation, petInteraction, updateCharts, updateWeightChart, renderListAndStats, updateMealUI, toggleTheme, setTheme, openLangModal, setLang, openFavModal, pickFav, deleteFav, showModal, addAIItem, removeAIItem, recalculateAI, showDetailModal, showFavDetailModal, _renderDetailModal, closeModal, toggleFabMenu } from './ui.js';

window.onTurnstileTimeout = function() {
    console.warn("Turnstile Token 過期，自動重置中...");
    if (typeof turnstile !== 'undefined') {
        turnstile.reset('#turnstile-widget');
        try { turnstile.execute('#turnstile-widget'); } catch(e) {}
    }
};
window.onTurnstileError = function() {
    console.error("Turnstile 載入錯誤，自動重置中...");
    if (typeof turnstile !== 'undefined') {
        turnstile.reset('#turnstile-widget');
        try { turnstile.execute('#turnstile-widget'); } catch(e) {}
    }
};

window.deleteItem = deleteItem;
window.addRecordToFav = addRecordToFav;
window.confirmAddFood = confirmAddFood;

export function setupEventListeners() {
    document.getElementById('current-date').addEventListener('change', changeDate);
    document.getElementById('image-upload').addEventListener('change', function() { handleFileSelect(this); });
    document.getElementById('btn-take-photo').addEventListener('click', () => document.getElementById('image-upload').click());
    document.getElementById('analyze-btn').addEventListener('click', startAnalysis);
    
    document.getElementById('btn-add-record').addEventListener('click', addManualFood);
    document.getElementById('btn-fav-save-main').addEventListener('click', saveToFavorites);
    document.getElementById('btn-fav-load-main').addEventListener('click', () => {
        if(typeof openFavModal === 'function') openFavModal();
    });
    
    const petImg = document.getElementById('pet-img');
    if(petImg) {
        petImg.addEventListener('click', () => {
            if(typeof petInteraction === 'function') petInteraction();
        });
    }
    
    document.getElementById('meal-mode').addEventListener('change', () => calculateProfile());
    document.getElementById('btn-calc').addEventListener('click', () => calculateProfile());
    
    document.getElementById('btn-ai-fav-save').addEventListener('click', saveAIResultToFavorites);
    
    // Phase 4: 關閉 AI Modal 時的防呆 (取消按鈕)
    document.getElementById('btn-cancel').addEventListener('click', () => tryCloseAnalysisModal());
    
    document.getElementById('btn-fav-close').addEventListener('click', () => closeModal('fav-modal'));
    
    // Phase 4: 關閉詳細資訊彈窗
    const detailCloseBtn = document.getElementById('btn-detail-close');
    if(detailCloseBtn) detailCloseBtn.addEventListener('click', () => closeModal('detail-modal'));
    
    // Bottom Navigation
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            if (targetId) { switchView(targetId); }
        });
    });

    // 儲存體重按鈕
    const btnSaveWeight = document.getElementById('btn-save-weight');
    if(btnSaveWeight) {
        btnSaveWeight.addEventListener('click', () => {
            const w = document.getElementById('daily-weight-input').value;
            const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
            if(saveWeightData(selectedDate, w)) {
                showToast(t.alertWeightSaved || "體重紀錄已儲存！", 'success');
                document.getElementById('weight').value = w;
                saveProfile();
                if (typeof updateProfileStats === 'function') { updateProfileStats(); }
            } else {
                showToast(t.alertInvalidWeight || "請輸入有效的體重數值！", 'error');
            }
        });
    }

    // Settings view events
    document.getElementById('btn-toggle-theme-setting').addEventListener('click', toggleTheme);
    document.getElementById('btn-open-lang-setting').addEventListener('click', openLangModal);
    document.getElementById('btn-export-setting').addEventListener('click', exportData);
    document.getElementById('import-file').addEventListener('change', function() { importData(this); });
    
    document.getElementById('btn-lang-cancel').addEventListener('click', () => closeModal('lang-modal'));

    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            localStorage.setItem('appLang', lang);
            location.reload(); 
        });
    });

    // Phase 4: Dashboard 日期切換
    const toggle7 = document.getElementById('btn-chart-7d');
    const toggle30 = document.getElementById('btn-chart-30d');
    if(toggle7) toggle7.addEventListener('click', () => setChartRange(7));
    if(toggle30) toggle30.addEventListener('click', () => setChartRange(30));
}

// Phase 4: 防呆關閉 AI 彈窗
function tryCloseAnalysisModal() {
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    if (tempAIResult && !tempAIResultSaved) {
        if (!confirm(t.unsavedWarning || "注意，您的營養數據尚未保存，確定要離開嗎？")) {
            return; // 使用者按取消，不關閉
        }
    }
    setTempAIResult(null);
    setTempAIResultSaved(false);
    closeModal('analysis-modal');
}

function calculateProfile(auto=false) {
    const h = parseFloat(document.getElementById('height').value);
    const w = parseFloat(document.getElementById('weight').value);
    const a = parseFloat(document.getElementById('age').value);
    const act = parseFloat(document.getElementById('activity').value);
    const g = document.getElementById('gender').value;
    const mode = document.getElementById('meal-mode').value;

    const t = (typeof i18n !== 'undefined' && i18n[localStorage.getItem('appLang')]) ? i18n[localStorage.getItem('appLang')] : i18n['zh-TW'];

    if (!h || !w || !a) { 
        if(!auto) showToast(t.alertFill || "請填寫完整資料", 'error'); 
        return; 
    }

    let bmr = (g === 'male') ? (10*w + 6.25*h - 5*a + 5) : (10*w + 6.25*h - 5*a - 161);
    let tdee = Math.round(bmr * act);
    let computedTarget = Math.round(tdee - 500);
    if(computedTarget < bmr) computedTarget = Math.round(bmr);
    setTargetCalories(computedTarget);
    
    setCurrentMealMode(mode);
    
    document.getElementById('tdee-val').innerText = tdee;
    document.getElementById('target-cal-val').innerText = computedTarget;
    document.getElementById('target-cal-display').innerText = computedTarget;
    
    const goalResult = document.getElementById('goal-result');
    if (goalResult) { goalResult.style.display = 'block'; }
    
    saveProfile();
    updateMealUI();      

    const p_g = Math.round((computedTarget * 0.2) / 4);
    const f_g = Math.round((computedTarget * 0.3) / 9);
    const c_g = Math.round((computedTarget * 0.5) / 4);
    const sugar_g = Math.round((computedTarget * 0.1) / 4);
    const sat_g = Math.round((computedTarget * 0.1) / 9);
    
    const macroBox = document.getElementById('macro-goals');
    if (macroBox) {
        macroBox.innerHTML = `
            <strong>${t.macroGoalTitle || "📊 營養攝取建議 (估算值)："}</strong><br>
            🥩 ${t.pro}：~${p_g}g | 🥑 ${t.fat}：~${f_g}g | 🍞 ${t.carb}：~${c_g}g<br>
            🍬 ${t.sugar}：< ${sugar_g}g | 🧂 ${t.sod.replace('(mg)','')}：< 2300mg | 🧈 ${t.sat}：< ${sat_g}g
        `;
    }

    renderListAndStats(); 
}

function handleFileSelect(input) {
    const file = input.files[0]; if (!file) return;
    const preview = document.getElementById('image-preview');
    preview.src = URL.createObjectURL(file); preview.style.display = 'block';
    document.getElementById('analyze-btn').style.display = 'inline-block';
    // Phase 4 / Task 3 修復：上傳圖片時隱藏純文字輸入區，改顯示圖片補充說明區
    // 避免出現兩個描述框讓使用者混淆
    const textOnlyGroup = document.getElementById('ai-text-only-group');
    const descGroup = document.getElementById('ai-desc-group');
    // 修復：若使用者已在純文字框輸入描述，先將其內容帶入圖片補充說明框，避免文字消失
    const textDescEl = document.getElementById('ai-text-desc');
    const imgDescEl = document.getElementById('ai-desc');
    if (textDescEl && imgDescEl && textDescEl.value.trim()) {
        if (!imgDescEl.value.trim()) {
            imgDescEl.value = textDescEl.value;
        }
        textDescEl.value = '';
    }
    if (textOnlyGroup) textOnlyGroup.style.display = 'none';
    if (descGroup) descGroup.style.display = 'block';
    document.getElementById('ai-loading').style.display = 'none';
}

// ── 全域鎖定旗標（防止 Race Condition）────────────────────────────
let isAnalyzing = false;

// ── 開發者模式判斷 ──────────────────────────────────────────────
const IS_DEV_MODE = window.location.search.includes('dev=true');

// ── 每日使用額度管理 ─────────────────────────────────────────────
const DAILY_LIMIT = 20;
const USAGE_KEY   = 'woofCal_usage';

function getUsageState() {
    const today = getLocalDateString();
    let usage = {};
    try { usage = JSON.parse(localStorage.getItem(USAGE_KEY)) || {}; } catch(e) { usage = {}; }
    if (usage.date !== today) {
        return { date: today, count: 0 };
    }
    return { date: today, count: Number(usage.count) || 0 };
}

function incrementUsageCount() {
    if (IS_DEV_MODE) return;
    const usage = getUsageState();
    usage.count += 1;
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
}

function applyUsageLimitState(showLimitToast = false) {
    if (IS_DEV_MODE) return true;

    const usage = getUsageState();
    const isExhausted = usage.count >= DAILY_LIMIT;
    const btn = document.getElementById('analyze-btn');
    const photoBtn = document.getElementById('btn-take-photo');
    const imageUpload = document.getElementById('image-upload');

    if (btn && isExhausted) {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
        btn.style.display = 'inline-block';
        btn.innerHTML = '🛑 今日 AI 額度已用完';
    }
    if (photoBtn) {
        photoBtn.disabled = isExhausted;
        photoBtn.style.opacity = isExhausted ? '0.5' : '';
        photoBtn.style.cursor = isExhausted ? 'not-allowed' : '';
    }
    if (imageUpload) {
        imageUpload.disabled = isExhausted;
    }

    if (showLimitToast && isExhausted) {
        showToast(`今日 AI 分析額度（${DAILY_LIMIT} 次）已用完，請明天再來！`, 'error');
    }

    return !isExhausted;
}

function parseStructuredAIError(errorText) {
    if (!errorText || typeof errorText !== 'string') return null;
    try {
        return JSON.parse(errorText);
    } catch (e) {
        return null;
    }
}

function extractRetryDelaySeconds(details) {
    if (!Array.isArray(details)) return null;
    for (const detail of details) {
        if (typeof detail?.retryDelay === 'string') {
            const match = detail.retryDelay.match(/(\d+(?:\.\d+)?)s/i);
            if (match) return Math.ceil(Number(match[1]));
        }
    }
    return null;
}

function buildAIErrorFeedback(error, t) {
    let errorText = error?.message || String(error);
    if (errorText === "[object Object]") {
        try { errorText = JSON.stringify(error); } catch(err) { errorText = "無法解析的錯誤格式"; }
    }

    if (errorText === "Turnstile_Pending") {
        return {
            isSoftError: true,
            type: 'info',
            message: "🛡️ 安全防護載入中，請稍等 2 秒後再點擊一次！"
        };
    }

    if (errorText.includes("請求太頻繁") || errorText.includes("安全驗證失敗")) {
        return {
            isSoftError: true,
            type: 'error',
            message: errorText
        };
    }

    const structuredError = parseStructuredAIError(errorText);
    const structuredMessage = structuredError?.message || '';
    const combinedErrorText = `${errorText} ${structuredMessage}`.toLowerCase();
    const retrySeconds = Number(structuredError?.retryAfterSeconds) || extractRetryDelaySeconds(structuredError?.details);

    if (
        structuredError?.code === 429 ||
        structuredError?.status === 'RESOURCE_EXHAUSTED' ||
        combinedErrorText.includes('quota exceeded') ||
        combinedErrorText.includes('resource_exhausted') ||
        combinedErrorText.includes('rate limit') ||
        combinedErrorText.includes('ai_quota_exceeded')
    ) {
        const retryHint = retrySeconds
            ? `請約 ${retrySeconds} 秒後再試。`
            : "請稍後再試，或檢查後端 Gemini API 額度。";
        return {
            isSoftError: true,
            type: 'error',
            message: `AI 服務目前額度已滿，${retryHint}`
        };
    }

    return {
        isSoftError: false,
        type: 'error',
        message: (t.alertAiFail || "AI 分析失敗: ") + (structuredMessage || errorText)
    };
}

// ── 鎖定所有輸入控制項（分析進行中）────────────────────────────
function lockUIForAnalysis() {
    const analyzeBtn  = document.getElementById('analyze-btn');
    const photoBtn    = document.getElementById('btn-take-photo');
    const imageUpload = document.getElementById('image-upload');

    if (analyzeBtn)  { analyzeBtn.disabled = true;  analyzeBtn.style.opacity = '0.6'; analyzeBtn.style.cursor = 'not-allowed'; }
    if (photoBtn)    { photoBtn.disabled   = true;  photoBtn.style.opacity   = '0.6'; photoBtn.style.cursor   = 'not-allowed'; }
    if (imageUpload) { imageUpload.disabled = true; }
}

// ── 解鎖所有輸入控制項（冷卻結束後）────────────────────────────
function unlockUIAfterCooldown() {
    const analyzeBtn  = document.getElementById('analyze-btn');
    const photoBtn    = document.getElementById('btn-take-photo');
    const imageUpload = document.getElementById('image-upload');
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];

    isAnalyzing = false;

    if (analyzeBtn) {
        analyzeBtn.disabled = false;
        analyzeBtn.style.opacity = '';
        analyzeBtn.style.cursor  = '';
        analyzeBtn.style.display = 'inline-block';
        analyzeBtn.innerHTML = `✨ 2. <span id="txt-analyze-btn">${t.btnAnalyze || '送出分析 (圖片或文字)'}</span>`;
        if (!applyUsageLimitState()) return;
    }
    if (photoBtn) {
        photoBtn.disabled = false;
        photoBtn.style.opacity = '';
        photoBtn.style.cursor  = '';
    }
    if (imageUpload) { imageUpload.disabled = false; }
}

function startAnalysis() {
    // ── 防止重複點擊（全域鎖定）
    if (isAnalyzing) return;

    const input = document.getElementById('image-upload');
    const file = input.files[0]; 
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    
    const textOnlyInput = document.getElementById('ai-text-desc');
    const textDescVal = textOnlyInput ? textOnlyInput.value.trim() : "";
    
    const imageDescInput = document.getElementById('ai-desc');
    const imageDescVal = imageDescInput ? imageDescInput.value.trim() : "";

    if (!file && !textDescVal) { 
        showToast(t.alertSelImgOrText || "請選擇圖片，或輸入文字描述！", 'error'); 
        return; 
    }

    // ── 每日使用上限檢查
    if (!applyUsageLimitState(true)) return;

    // ── 設定全域鎖定，鎖死所有相關按鈕
    isAnalyzing = true;
    lockUIForAnalysis();

    document.getElementById('analyze-btn').style.display = 'none';
    document.getElementById('ai-loading').style.display = 'block';

    let isSoftError = false; // 追蹤是否為軟性錯誤（不刪照片、不冷卻）

    const handleResult = (result) => {
        if (result) {
            incrementUsageCount();
            setTempAIResult({
                name: result.foodName,
                nutri: {
                    calories: Number(result.calories) || 0, protein: Number(result.protein) || 0, fat: Number(result.fat) || 0,
                    carbohydrate: Number(result.carbohydrate) || 0, sugar: Number(result.sugar) || 0, sodium: Number(result.sodium) || 0,
                    saturatedFat: Number(result.saturatedFat) || 0, transFat: Number(result.transFat) || 0,
                    fiber: Number(result.fiber) || 0
                },
                items: Array.isArray(result.items) ? result.items : [],
                healthScore: Number(result.healthScore) || 0
            }); 
            setTempAIResultSaved(false);
            showModal();
        }
    };

    const handleError = (e) => {
        console.error("Analysis Error:", e);
        const feedback = buildAIErrorFeedback(e, t);
        isSoftError = feedback.isSoftError;
        showToast(feedback.message, feedback.type);
    };

    const handleFinally = () => {
        document.getElementById('ai-loading').style.display = 'none';
        
        if (isSoftError) {
            // 軟性錯誤：只解鎖 UI，保留照片與文字，不觸發 15 秒冷卻
            unlockUIAfterCooldown();
            return;
        }

        // 正常分析結束或嚴重錯誤：清空照片與文字，並觸發 15 秒冷卻
        document.getElementById('image-upload').value = '';
        if(document.getElementById('ai-desc')) document.getElementById('ai-desc').value = '';
        document.getElementById('image-preview').style.display = 'none';
        document.getElementById('ai-desc-group').style.display = 'none';
        
        const txtGroup = document.getElementById('ai-text-only-group');
        if(txtGroup) txtGroup.style.display = 'block';
        if(document.getElementById('ai-text-desc')) document.getElementById('ai-text-desc').value = '';

        startCooldown();
    };

    if (file) {
        const finalDesc = imageDescVal + (textDescVal ? " " + textDescVal : "");
        toBase64(file).then(base64 => {
            return callCloudflareAI(base64, finalDesc);
        }).then(handleResult).catch(handleError).finally(handleFinally);
    } else {
        callCloudflareAIText(textDescVal).then(handleResult).catch(handleError).finally(handleFinally);
    }
}

// AI 分析後冷卻計時（15 秒），結束後同時解鎖分析鍵與拍照鍵
function startCooldown() {
    const btn = document.getElementById('analyze-btn');
    if (!btn) return;

    const COOLDOWN = 15;
    let remaining = COOLDOWN;

    // 顯示按鈕並進入冷卻鎖定狀態
    btn.style.display = 'inline-block';
    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'not-allowed';
    btn.innerHTML = `⏳ 系統冷卻中 (${remaining}s)`;

    const timer = setInterval(() => {
        remaining -= 1;
        if (remaining > 0) {
            btn.innerHTML = `⏳ 系統冷卻中 (${remaining}s)`;
        } else {
            clearInterval(timer);
            // 冷卻結束：解鎖所有控制項並重置全域旗標
            unlockUIAfterCooldown();
        }
    }, 1000);
}

export function deleteItem(index) {
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    if(confirm(t.alertDel || "確定要刪除？")) {
        foodItems.splice(index, 1);
        saveFoodData();
        renderListAndStats();
    }
}

export function addRecordToFav(index) {
    const item = foodItems[index];
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    
    if(favoriteFoods.some(f => f.name === item.name)) { 
        showToast(t.alertFavExist || "已在最愛清單中！", 'error'); 
        return; 
    }
    
    favoriteFoods.push({ 
        name: item.name, 
        nutri: item.nutri,
        items: item.items || [],
        healthScore: item.healthScore || 0
    });
    localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
    showToast(t.alertFavAdded || "已加入最愛！", 'success');
}

function changeDate() {
    setSelectedDate(document.getElementById('current-date').value);
    document.getElementById('display-date-text').innerText = selectedDate;
    loadFoodData(selectedDate);
    
    const w = loadWeightData(selectedDate);
    if(w !== null) {
        document.getElementById('daily-weight-input').value = w;
    } else {
        document.getElementById('daily-weight-input').value = '';
    }
    
    renderListAndStats();
}

export function confirmAddFood(type) {
    foodItems.push({ 
        type: type, 
        name: tempAIResult.name, 
        nutri: tempAIResult.nutri,
        items: tempAIResult.items || [],
        healthScore: tempAIResult.healthScore || 0
    });
    saveFoodData();
    renderListAndStats();
    setTempAIResultSaved(true); // Phase 4: 標記已保存
    closeModal('analysis-modal');
    
    if(typeof showEatingAnimation === 'function') showEatingAnimation();
}

function addManualFood() {
    const name = document.getElementById('manual-name').value;
    const cal = parseFloat(document.getElementById('manual-cal').value);
    const type = document.getElementById('manual-type').value;
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];

    if (name && !isNaN(cal)) {
        const pro = parseFloat(document.getElementById('manual-pro').value) || 0;
        const fat = parseFloat(document.getElementById('manual-fat').value) || 0;
        const carb = parseFloat(document.getElementById('manual-carb').value) || 0;
        const sugar = parseFloat(document.getElementById('manual-sugar').value) || 0;
        const sod = parseFloat(document.getElementById('manual-sod').value) || 0;
        const sat = parseFloat(document.getElementById('manual-sat').value) || 0;
        const trans = parseFloat(document.getElementById('manual-trans').value) || 0;

        foodItems.push({ 
            type: type, name: name, 
            nutri: { 
                calories: cal, protein: pro, fat: fat, carbohydrate: carb, 
                sugar: sugar, sodium: sod, saturatedFat: sat, transFat: trans, fiber: 0
            },
            items: [],
            healthScore: 0
        });
        saveFoodData();
        renderListAndStats();
        
        document.getElementById('manual-name').value = '';
        document.getElementById('manual-cal').value = '';
        document.getElementById('manual-pro').value = '';
        document.getElementById('manual-fat').value = '';
        document.getElementById('manual-carb').value = '';
        document.getElementById('manual-sugar').value = '';
        document.getElementById('manual-sod').value = '';
        document.getElementById('manual-sat').value = '';
        document.getElementById('manual-trans').value = '';

        if(typeof showEatingAnimation === 'function') showEatingAnimation();

    } else { showToast(t.alertNameCal || "請輸入名稱與熱量", 'error'); }
}

function saveToFavorites() {
    const name = document.getElementById('manual-name').value;
    const cal = parseFloat(document.getElementById('manual-cal').value);
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    
    if(!name || isNaN(cal)) { showToast(t.alertNameCal || "請輸入名稱與熱量", 'error'); return; }
    if(favoriteFoods.some(f => f.name === name)) { showToast(t.alertFavExist || "已在最愛清單中！", 'error'); return; }
    
    const nutri = {
        calories: cal,
        protein: parseFloat(document.getElementById('manual-pro').value) || 0,
        fat: parseFloat(document.getElementById('manual-fat').value) || 0,
        carbohydrate: parseFloat(document.getElementById('manual-carb').value) || 0,
        sugar: parseFloat(document.getElementById('manual-sugar').value) || 0,
        sodium: parseFloat(document.getElementById('manual-sod').value) || 0,
        saturatedFat: parseFloat(document.getElementById('manual-sat').value) || 0,
        transFat: parseFloat(document.getElementById('manual-trans').value) || 0,
        fiber: 0
    };

    favoriteFoods.push({ name: name, nutri: nutri, items: [], healthScore: 0 });
    localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
    showToast(t.alertFavAdded || "已加入最愛！", 'success');
}

function saveAIResultToFavorites() {
    if(!tempAIResult) return;
    const name = tempAIResult.name;
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    
    if(favoriteFoods.some(f => f.name === name)) { showToast(t.alertFavExist || "已在最愛清單中！", 'error'); return; }
    
    favoriteFoods.push({ 
        name: name, 
        nutri: tempAIResult.nutri,
        items: tempAIResult.items || [],
        healthScore: tempAIResult.healthScore || 0
    });
    localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
    showToast(t.alertFavAdded || "已加入最愛！", 'success');
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('portrait').catch(err => console.log('螢幕鎖定不支援:', err));
        }
    } catch(e) {}

    try {
        setupEventListeners();
    } catch(e) { console.error("Event Listeners Error:", e); }
    
    try {
        setTheme(curTheme);
        setLang(curLang);
        const curDateEl = document.getElementById('current-date');
        if(curDateEl) curDateEl.value = selectedDate;
    } catch(e) { console.error("Theme/Lang UI Error:", e); }
    
    try {
        if(loadProfile()) {
            calculateProfile(true); 
        } else {
            updateMealUI(); 
        }
    } catch(e) { console.error("Profile/MealUI Error:", e); }
    
    try {
        loadFoodData(selectedDate);
    } catch(e) { console.error("Load Food Data Error:", e); }
    
    try {
        const w = loadWeightData(selectedDate);
        if(w !== null && document.getElementById('daily-weight-input')) {
            document.getElementById('daily-weight-input').value = w;
        }
    } catch(e) { console.error("Load Weight Error:", e); }
    
    try {
        initCharts();
    } catch(e) { console.error("Init Charts Error:", e); }
    
    try {
        renderListAndStats();
    } catch(e) { console.error("Render Stats Error:", e); }

    try {
        applyUsageLimitState();
    } catch(e) { console.error("Usage Limit UI Error:", e); }
});
