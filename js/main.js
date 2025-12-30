// --- 應用程式入口 ---
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
    targetCalories = Math.round(tdee - 500);
    if(targetCalories < bmr) targetCalories = Math.round(bmr);
    
    currentMealMode = mode;

    document.getElementById('tdee-val').innerText = tdee;
    document.getElementById('target-cal-val').innerText = targetCalories;
    document.getElementById('target-cal-display').innerText = targetCalories;
    
    // 更新各餐目標
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

    document.getElementById('water-val').innerText = Math.round(w * 35);
    document.getElementById('goal-result').style.display = 'block';

    saveProfile();
    updateMealUI();      
    renderListAndStats(); 
}

function deleteItem(index) {
    if(confirm(i18n[curLang].alertDel)) {
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

function addManualFood() {
    const name = document.getElementById('manual-name').value;
    const cal = parseFloat(document.getElementById('manual-cal').value);
    const type = document.getElementById('manual-type').value;
    if (name && cal) {
        foodItems.push({ 
            type: type, name: name, 
            nutri: { calories: cal, protein:0, fat:0, carbohydrate:0, sugar:0, sodium:0, saturatedFat:0, transFat:0 } 
        });
        saveFoodData();
        renderListAndStats();
        document.getElementById('manual-name').value = '';
        document.getElementById('manual-cal').value = '';
    } else { alert(i18n[curLang].alertNameCal); }
}

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

// 啟動監聽器
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
            setLang(this.getAttribute('data-lang'));
            closeModal('lang-modal');
        });
    });
}

// 程式進入點
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
