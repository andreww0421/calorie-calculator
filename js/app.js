function setupEventListeners() {
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
                alert(t.alertWeightSaved || "體重紀錄已儲存！");
                document.getElementById('weight').value = w;
                saveProfile();
                if (typeof updateProfileStats === 'function') { updateProfileStats(); }
            } else {
                alert(t.alertInvalidWeight || "請輸入有效的體重數值！");
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
    tempAIResult = null;
    tempAIResultSaved = false;
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
        if(!auto) alert(t.alertFill || "請填寫完整資料"); 
        return; 
    }

    let bmr = (g === 'male') ? (10*w + 6.25*h - 5*a + 5) : (10*w + 6.25*h - 5*a - 161);
    let tdee = Math.round(bmr * act);
    targetCalories = Math.round(tdee - 500);
    if(targetCalories < bmr) targetCalories = Math.round(bmr);
    
    currentMealMode = mode;
    
    document.getElementById('tdee-val').innerText = tdee;
    document.getElementById('target-cal-val').innerText = targetCalories;
    document.getElementById('target-cal-display').innerText = targetCalories;
    
    const goalResult = document.getElementById('goal-result');
    if (goalResult) { goalResult.style.display = 'block'; }
    
    saveProfile();
    updateMealUI();      

    const p_g = Math.round((targetCalories * 0.2) / 4);
    const f_g = Math.round((targetCalories * 0.3) / 9);
    const c_g = Math.round((targetCalories * 0.5) / 4);
    const sugar_g = Math.round((targetCalories * 0.1) / 4);
    const sat_g = Math.round((targetCalories * 0.1) / 9);
    
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

function startAnalysis() {
    const input = document.getElementById('image-upload');
    const file = input.files[0]; 
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    
    const textOnlyInput = document.getElementById('ai-text-desc');
    const textDescVal = textOnlyInput ? textOnlyInput.value.trim() : "";
    
    const imageDescInput = document.getElementById('ai-desc');
    const imageDescVal = imageDescInput ? imageDescInput.value.trim() : "";

    if (!file && !textDescVal) { 
        alert(t.alertSelImgOrText || "請選擇圖片，或輸入文字描述！"); 
        return; 
    }

    document.getElementById('analyze-btn').style.display = 'none';
    document.getElementById('ai-loading').style.display = 'block';

    const handleResult = (result) => {
        if (result) {
            tempAIResult = {
                name: result.foodName,
                nutri: {
                    calories: Number(result.calories) || 0, protein: Number(result.protein) || 0, fat: Number(result.fat) || 0,
                    carbohydrate: Number(result.carbohydrate) || 0, sugar: Number(result.sugar) || 0, sodium: Number(result.sodium) || 0,
                    saturatedFat: Number(result.saturatedFat) || 0, transFat: Number(result.transFat) || 0,
                    fiber: Number(result.fiber) || 0
                },
                items: Array.isArray(result.items) ? result.items : [],
                healthScore: Number(result.healthScore) || 0
            }; 
            tempAIResultSaved = false; // Phase 4: 重設保存旗標
            showModal();
        }
    };

    const handleError = (e) => {
        console.error(e); alert((t.alertAiFail || "AI 分析失敗: ") + e.message);
        document.getElementById('analyze-btn').style.display = 'inline-block';
    };

    const handleFinally = () => {
        document.getElementById('ai-loading').style.display = 'none';
        document.getElementById('analyze-btn').style.display = 'inline-block';
        
        document.getElementById('image-upload').value = '';
        if(document.getElementById('ai-desc')) document.getElementById('ai-desc').value = '';
        document.getElementById('image-preview').style.display = 'none';
        document.getElementById('ai-desc-group').style.display = 'none';
        
        const txtGroup = document.getElementById('ai-text-only-group');
        if(txtGroup) txtGroup.style.display = 'block';
        if(document.getElementById('ai-text-desc')) document.getElementById('ai-text-desc').value = '';
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

function deleteItem(index) {
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    if(confirm(t.alertDel || "確定要刪除？")) {
        foodItems.splice(index, 1);
        saveFoodData();
        renderListAndStats();
    }
}

function addRecordToFav(index) {
    const item = foodItems[index];
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    
    if(favoriteFoods.some(f => f.name === item.name)) { 
        alert(t.alertFavExist || "已在最愛清單中！"); 
        return; 
    }
    
    favoriteFoods.push({ 
        name: item.name, 
        nutri: item.nutri,
        items: item.items || [],
        healthScore: item.healthScore || 0
    });
    localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
    alert(t.alertFavAdded || "已加入最愛！");
}

function changeDate() {
    selectedDate = document.getElementById('current-date').value;
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

function confirmAddFood(type) {
    foodItems.push({ 
        type: type, 
        name: tempAIResult.name, 
        nutri: tempAIResult.nutri,
        items: tempAIResult.items || [],
        healthScore: tempAIResult.healthScore || 0
    });
    saveFoodData();
    renderListAndStats();
    tempAIResultSaved = true; // Phase 4: 標記已保存
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

    } else { alert(t.alertNameCal || "請輸入名稱與熱量"); }
}

function saveToFavorites() {
    const name = document.getElementById('manual-name').value;
    const cal = parseFloat(document.getElementById('manual-cal').value);
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    
    if(!name || isNaN(cal)) { alert(t.alertNameCal || "請輸入名稱與熱量"); return; }
    if(favoriteFoods.some(f => f.name === name)) { alert(t.alertFavExist || "已在最愛清單中！"); return; }
    
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
    alert(t.alertFavAdded || "已加入最愛！");
}

function saveAIResultToFavorites() {
    if(!tempAIResult) return;
    const name = tempAIResult.name;
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    
    if(favoriteFoods.some(f => f.name === name)) { alert(t.alertFavExist || "已在最愛清單中！"); return; }
    
    favoriteFoods.push({ 
        name: name, 
        nutri: tempAIResult.nutri,
        items: tempAIResult.items || [],
        healthScore: tempAIResult.healthScore || 0
    });
    localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
    alert(t.alertFavAdded || "已加入最愛！");
}

document.addEventListener('DOMContentLoaded', () => {
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait').catch(err => console.log('螢幕鎖定不支援:', err));
    }

    setupEventListeners();
    
    setTheme(curTheme);
    setLang(curLang);
    document.getElementById('current-date').value = selectedDate;
    
    if(loadProfile()) {
        calculateProfile(true); 
    } else {
        updateMealUI(); 
    }
    
    loadFoodData(selectedDate);
    
    const w = loadWeightData(selectedDate);
    if(w !== null) {
        document.getElementById('daily-weight-input').value = w;
    }
    
    initCharts();
    
    renderListAndStats();
});
