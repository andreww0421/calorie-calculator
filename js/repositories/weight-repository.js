import { getWeightHistory, loadWeightData, saveWeightData } from '../storage.js';

export function loadWeight(date) {
    return loadWeightData(date);
}

export function saveWeight(date, value) {
    return saveWeightData(date, value);
}

export function getWeightTrend(days = 30) {
    return getWeightHistory(days);
}
