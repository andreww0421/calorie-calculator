import {
    loadFoodData,
    saveFoodData,
    getCalorieHistory,
    getFoodLogHistory as getStoredFoodLogHistory,
    getProteinHistory
} from '../storage.js';

export function loadFoodLog(date) {
    return loadFoodData(date);
}

export function saveFoodLog(date, items) {
    saveFoodData(date, items);
}

export function getFoodCalorieHistory(days = 7, baseDate) {
    return getCalorieHistory(days, baseDate);
}

export function getFoodProteinHistory(days = 7, baseDate) {
    return getProteinHistory(days, baseDate);
}

export function getFoodLogHistory(days = 7, baseDate) {
    return getStoredFoodLogHistory(days, baseDate);
}
