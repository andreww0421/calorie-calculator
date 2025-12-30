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

    if (!h || !w || !a) { if(!auto) alert(t.alertFill || "請填寫完整資料"); return; }

    let bmr = (g === 'male') ? (10*w + 6.25*h - 5*a + 5) : (10*w + 6.25*h - 5*a - 161);
    let tdee = Math.round(bmr * act);
    targetCalories = Math.round(tdee - 500);
    if(targetCalories < bmr) targetCalories = Math.round(bmr);
    
    currentMealMode = mode;
    document.getElementById('tdee-val').innerText = tdee;
    document.getElementById('target-cal-val').innerText = targetCalories;
    document.getElementById('target-cal-display').innerText = targetCalories;
    
    saveProfile();
    
    // ✨ 關鍵修正：先建立 UI，才能填入目標熱量文字
    updateMealUI();      

    const configs = {
        "4": { breakfast: 0.25, lunch: 0.35, dinner: 0.30, snack: 0.10 },
        "3": { breakfast: 0.30, lunch: 0.40, dinner: 0.30 },
        "2": { lunch: 0.50, dinner: 0.50 },
        "1": { dinner: 1.0 }
    };
    const ratios = configs[mode];
    for (let type in ratios) {
        const goalEl = document.getElementById(`goal-${type}`);
        if(goalEl) goalEl.innerText = Math.round(targetCalories * ratios[type]);
    }

    // ✨ 新增：計算並顯示八大營養建議
    // 簡單估算：P 15-20%, F 25-30%, C 50-60%
    const p_g = Math.round((targetCalories * 0.2) / 4); // 蛋白質 20%
    const f_g = Math.round((targetCalories * 0.3) / 9); // 脂肪 30%
    const c_g = Math.round((targetCalories * 0.5) / 4); // 碳水 50%
    const sugar_g = Math.round((targetCalories * 0.1) / 4); // 糖 < 10%
    const sat_g = Math.round((targetCalories * 0.1) / 9); // 飽和脂肪 < 10%
    
    const macroBox = document.getElementById('macro-goals');
    if (macroBox) {
        macroBox.innerHTML = `
            <strong>📊 營養攝取建議 (估算值)：</strong><br>
            🥩 蛋白質：約 ${p_g}g | 🥑 脂肪：約 ${f_g}g | 🍞 碳水：約 ${c_g}g<br>
            🍬 糖：< ${sugar_g}g | 🧂 鈉：< 2300mg | 🧈 飽和脂：< ${sat_g}g
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
}

// ✨ 手動新增功能擴充：讀取所有欄位
function addManualFood() {
    const name = document.getElementById('manual-name').value;
    const cal = parseFloat(document.getElementById('manual-cal').value);
    const type = document.getElementById('manual-type').value;
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];

    if (name && !isNaN(cal)) {
        // 讀取其他營養素，如果沒填則預設為 0
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
        
        // 清空欄位
        document.getElementById('manual-name').value = '';
        document.getElementById('manual-cal').value = '';
        document.getElementById('manual-pro').value = '';
        document.getElementById('manual-fat').value = '';
        document.getElementById('manual-carb').value = '';
        document.getElementById('manual-sugar').value = '';
        document.getElementById('manual-sod').value = '';
        document.getElementById('manual-sat').value = '';
        document.getElementById('manual-trans').value = '';

    } else { alert(t.alertNameCal || "請輸入名稱與熱量"); }
}

function saveToFavorites() {
    const name = document.getElementById('manual-name').value;
    const cal = document.getElementById('manual-cal').value;
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    if(!name || !cal) { alert(t.alertNameCal || "請輸入名稱與熱量"); return; }
    if(favoriteFoods.some(f => f.name === name)) { alert(t.alertFavExist || "已在最愛清單中！"); return; }
    favoriteFoods.push({ name: name, cal: parseFloat(cal) });
    localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
    alert(t.alertFavAdded || "已加入最愛！");
}

function saveAIResultToFavorites() {
    if(!tempAIResult) return;
    const name = tempAIResult.name;
    const cal = tempAIResult.nutri.calories;
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    if(favoriteFoods.some(f => f.name === name)) { alert(t.alertFavExist || "已在最愛清單中！"); return; }
    favoriteFoods.push({ name: name, cal: cal });
    localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
    alert(t.alertFavAdded || "已加入最愛！");
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
    const t = i18n[localStorage.getItem('appLang')] || i18n['zh-TW'];
    if(confirm(t.alertDel || "確定要刪除？")) {
        favoriteFoods.splice(index, 1);
        localStorage.setItem('myFavorites', JSON.stringify(favoriteFoods));
        openFavModal();
    }
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
