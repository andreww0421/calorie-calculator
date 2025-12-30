let foodItems = []; 
let targetCalories = 2000;
let tempAIResult = null;
let selectedDate = new Date().toISOString().split('T')[0];
let currentMealMode = "4";
let favoriteFoods = JSON.parse(localStorage.getItem('myFavorites') || "[]");
let curLang = localStorage.getItem('appLang') || "zh-TW";
let curTheme = localStorage.getItem('appTheme') || "light";

function saveFoodData() {
    localStorage.setItem(`record_${selectedDate}`, JSON.stringify(foodItems));
}

function loadFoodData(date) {
    const stored = localStorage.getItem(`record_${date}`);
    foodItems = stored ? JSON.parse(stored) : [];
}

function saveProfile() {
    const profile = {
        gender: document.getElementById('gender').value,
        age: document.getElementById('age').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        activity: document.getElementById('activity').value,
        mealMode: document.getElementById('meal-mode').value
    };
    localStorage.setItem('myProfile_v5', JSON.stringify(profile));
}

function loadProfile() {
    const stored = localStorage.getItem('myProfile_v5');
    if (stored) {
        const p = JSON.parse(stored);
        document.getElementById('gender').value = p.gender;
        document.getElementById('age').value = p.age;
        document.getElementById('height').value = p.height;
        document.getElementById('weight').value = p.weight;
        document.getElementById('activity').value = p.activity;
        if(p.mealMode) document.getElementById('meal-mode').value = p.mealMode;
        return true;
    }
    return false;
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
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `nutrition_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
}

function importData(input) {
    const file = input.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            for(let key in data) localStorage.setItem(key, data[key]);
            alert(i18n[curLang].alertImportOk);
            location.reload();
        } catch(err) {
            alert(i18n[curLang].alertImportFail);
        }
    };
    reader.readAsText(file);
}
