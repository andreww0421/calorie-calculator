export {
    foodItems,
    targetCalories,
    tempAIResult,
    tempAIResultSaved,
    selectedDate,
    currentMealMode,
    currentGoalType,
    favoriteFoods,
    curLang,
    curTheme,
    setFoodItems,
    setTargetCalories,
    setTempAIResult,
    setTempAIResultSaved,
    setSelectedDate,
    setCurrentMealMode,
    setCurrentGoalType,
    setFavoriteFoods,
    setCurLang,
    setCurTheme
} from './store.js';

import {
    foodItems,
    selectedDate,
    favoriteFoods,
    setFavoriteFoods,
    setCurLang,
    setCurTheme
} from './store.js';
import { setFoodItems } from './store.js';
import * as storage from './storage.js';

export function initializeAppData() {
    const result = storage.initializeStorage();
    setFavoriteFoods(storage.loadFavorites());
    setCurLang(storage.loadSetting('appLang', 'zh-TW'));
    setCurTheme(storage.loadSetting('appTheme', 'light'));
    return result;
}

export function saveFoodData() {
    storage.saveFoodData(selectedDate, foodItems);
}

export function loadFoodData(date) {
    const items = storage.loadFoodData(date);
    setFoodItems(items);
    return items;
}

export const saveWeightData = storage.saveWeightData;
export const loadWeightData = storage.loadWeightData;
export const getWeightHistory = storage.getWeightHistory;
export const getCalorieHistory = storage.getCalorieHistory;
export const getProteinHistory = storage.getProteinHistory;
export const saveProfile = storage.saveProfile;
export const loadProfile = storage.loadProfile;
export const exportData = storage.exportData;
export const importData = storage.importData;

export function persistFavorites() {
    storage.saveFavorites(favoriteFoods);
}

export function persistLang(lang) {
    storage.saveSetting('appLang', lang);
}

export function persistTheme(theme) {
    storage.saveSetting('appTheme', theme);
}
