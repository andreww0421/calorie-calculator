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

export function getFoodCalorieHistory(days = 7) {
    return getCalorieHistory(days);
}

export function getFoodProteinHistory(days = 7) {
    return getProteinHistory(days);
}

export function getFoodLogHistory(days = 7) {
    return getStoredFoodLogHistory(days);
}
