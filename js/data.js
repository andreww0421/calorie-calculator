import { showToast } from './ui.js';
import { i18n } from './config.js';
import { getLocalDateString } from './utils.js';

export let foodItems = []; 
export let targetCalories = 2000;
export let tempAIResult = null;
export let tempAIResultSaved = false; // Phase 4: 防呆旗標
export let selectedDate = getLocalDateString();
export let currentMealMode = "4";
export let favoriteFoods = JSON.parse(localStorage.getItem('myFavorites') || "[]");
export let curLang = localStorage.getItem('appLang') || "zh-TW";
export let curTheme = localStorage.getItem('appTheme') || "light";

export function setTargetCalories(v) { targetCalories = v; }
export function setTempAIResult(v) { tempAIResult = v; }
export function setTempAIResultSaved(v) { tempAIResultSaved = v; }
export function setSelectedDate(v) { selectedDate = v; }
export function setCurrentMealMode(v) { currentMealMode = v; }
export function setCurLang(v) { curLang = v; }
export function setCurTheme(v) { curTheme = v; }

export function saveFoodData() {
    localStorage.setItem(`record_${selectedDate}`, JSON.stringify(foodItems));
}

export function loadFoodData(date) {
    const stored = localStorage.getItem(`record_${date}`);
    foodItems = stored ? JSON.parse(stored) : [];
}

// ✨ 新增：儲存每日體重
export function saveWeightData(date, weightValue) {
    const w = parseFloat(weightValue);
    if (!isNaN(w) && w > 0) {
        localStorage.setItem(`weight_${date}`, w);
        return true;
    }
    return false;
}

// ✨ 新增：讀取特定日期體重
export function loadWeightData(date) {
    const stored = localStorage.getItem(`weight_${date}`);
    return stored ? parseFloat(stored) : null;
}

// ✨ 新增：讀取近期體重資料(給圖表用)
export function getWeightHistory(days = 30) {
    const history = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = getLocalDateString(d);
        const w = loadWeightData(dateStr);
        history.push({
            date: dateStr.slice(5), // MM-DD
            weight: w
        });
    }
    return history;
}

export function saveProfile() {
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

export function loadProfile() {
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

export function exportData() {
    const data = {};
    for(let i=0; i<localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
            key.startsWith('record_') ||
            key.startsWith('weight_') ||
            key.startsWith('myProfile') ||
            key === 'myFavorites' ||
            key === 'appLang' ||
            key === 'appTheme'
        ) {
            data[key] = localStorage.getItem(key);
        }
    }
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `nutrition_backup_${getLocalDateString()}.json`;
    a.click();
}

export function importData(input) {
    const file = input.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            for(let key in data) localStorage.setItem(key, data[key]);
            showToast(i18n[curLang].alertImportOk, 'success');
            setTimeout(() => location.reload(), 1500);
        } catch(err) {
            showToast(i18n[curLang].alertImportFail, 'error');
        }
    };
    reader.readAsText(file);
}

// Phase 4: 取得近 N 天每日熱量
export function getCalorieHistory(days = 7) {
    const history = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(); d.setDate(today.getDate() - i);
        const dateStr = getLocalDateString(d);
        const stored = localStorage.getItem(`record_${dateStr}`);
        let dayCal = 0;
        if (stored) { JSON.parse(stored).forEach(item => dayCal += (Number(item.nutri && item.nutri.calories) || 0)); }
        history.push({ date: dateStr.slice(5), calories: Math.round(dayCal) });
    }
    return history;
}

// Phase 4: 取得近 N 天每日蛋白質
export function getProteinHistory(days = 7) {
    const history = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(); d.setDate(today.getDate() - i);
        const dateStr = getLocalDateString(d);
        const stored = localStorage.getItem(`record_${dateStr}`);
        let dayPro = 0;
        if (stored) { JSON.parse(stored).forEach(item => dayPro += (Number(item.nutri && item.nutri.protein) || 0)); }
        history.push({ date: dateStr.slice(5), protein: Math.round(dayPro * 10) / 10 });
    }
    return history;
}
