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
    
    // ✨ 新增：點擊狗狗互動
    const petImg = document.getElementById('pet-img');
    if(petImg) {
        petImg.addEventListener('click', () => {
            if(typeof petInteraction === 'function') petInteraction();
        });
    }
    
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

    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            localStorage.setItem('appLang', lang);
            location.reload(); 
        });
    });
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
    if (goalResult) {
        goalResult.style.display = 'block';
    }
    
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
            <strong>📊 營養攝取建議 (估算值)：</strong><br>
            🥩 蛋白質：約 ${p_g}g | 🥑 脂肪：約 ${f_g}g | 🍞 碳水：約 ${c_g}g<br>
            🍬 糖：< ${sugar_g}g | 🧂 鈉：< 2300mg | 🧈 飽和脂肪：< ${sat_g}g
        `;
    }

    renderListAndStats(); 
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
    const file = input.files[0]; 
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    if (!file) { alert(t.alertSelImg || "請先選擇圖片！"); return; }
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
        console.error(e); alert((t.alertAiFail || "AI 分析失敗: ") + e.message);
        document.getElementById('analyze-btn').style.display = 'inline-block';
    }).finally(() => {
        document.getElementById('ai-loading').style.display = 'none';
    });
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
        nutri: item.nutri 
    });
    localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
    alert(t.alertFavAdded || "已加入最愛！");
}

function changeDate() {
    selectedDate = document.getElementById('current-date').value;
    document.getElementById('display-date-text').innerText = selectedDate;
    loadFoodData(selectedDate);
    renderListAndStats();
}

function confirmAddFood(type) {
    foodItems.push({ type: type, name: tempAIResult.name, nutri: tempAIResult.nutri });
    saveFoodData();
    renderListAndStats();
    closeModal('analysis-modal');
    
    // ✨ 新增：觸發餵食動畫
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
                sugar: sugar, sodium: sod, saturatedFat: sat, transFat: trans 
            } 
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

        // ✨ 新增：觸發餵食動畫
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
        transFat: parseFloat(document.getElementById('manual-trans').value) || 0
    };

    favoriteFoods.push({ name: name, nutri: nutri });
    localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
    alert(t.alertFavAdded || "已加入最愛！");
}

function saveAIResultToFavorites() {
    if(!tempAIResult) return;
    const name = tempAIResult.name;
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    
    if(favoriteFoods.some(f => f.name === name)) { alert(t.alertFavExist || "已在最愛清單中！"); return; }
    
    favoriteFoods.push({ name: name, nutri: tempAIResult.nutri });
    localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
    alert(t.alertFavAdded || "已加入最愛！");
}

document.addEventListener('DOMContentLoaded', () => {
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
    initCharts();
});
