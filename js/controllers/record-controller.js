import {
    foodItems,
    favoriteFoods,
    tempAIResult
} from '../data.js';
import { dispatchAppAction } from '../state/app-actions.js';
import { closeModal, showEatingAnimation, showToast } from '../ui.js';
import { getTranslations } from './controller-shared.js';

function normalizeNutri(source = {}) {
    const nutri = source.nutri || source || {};
    return {
        calories: Number(nutri.calories ?? source.cal ?? 0) || 0,
        protein: Number(nutri.protein) || 0,
        fat: Number(nutri.fat) || 0,
        carbohydrate: Number(nutri.carbohydrate) || 0,
        sugar: Number(nutri.sugar) || 0,
        sodium: Number(nutri.sodium) || 0,
        saturatedFat: Number(nutri.saturatedFat) || 0,
        transFat: Number(nutri.transFat) || 0,
        fiber: Number(nutri.fiber) || 0
    };
}

function cloneFoodItems(items) {
    if (!Array.isArray(items)) return [];
    return items.map((item) => ({
        name: item?.name || '',
        weight: item?.weight || ''
    }));
}

function appendFoodItem(entry) {
    dispatchAppAction('ADD_FOOD_ITEM', { entry });
    showEatingAnimation?.();
}

function clearManualInputs() {
    [
        'manual-name',
        'manual-cal',
        'manual-pro',
        'manual-fat',
        'manual-carb',
        'manual-sugar',
        'manual-sod',
        'manual-sat',
        'manual-trans',
        'manual-fiber'
    ].forEach((id) => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
}

export function deleteItem(index) {
    const t = getTranslations();
    if (confirm(t.alertDel || 'Delete this item?')) {
        dispatchAppAction('DELETE_FOOD_ITEM', { index });
    }
}

export function addRecordToFav(index) {
    const item = foodItems[index];
    const t = getTranslations();
    if (!item) return;

    if (favoriteFoods.some((favorite) => favorite.name === item.name)) {
        showToast(t.alertFavExist || 'This food is already saved in favorites.', 'error');
        return;
    }

    dispatchAppAction('ADD_FAVORITE', {
        favorite: {
            name: item.name,
            nutri: normalizeNutri(item),
            items: cloneFoodItems(item.items),
            healthScore: item.healthScore || 0
        }
    });
    showToast(t.alertFavAdded || 'Saved to favorites.', 'success');
}

export function confirmAddFood(type) {
    if (!tempAIResult) return;

    appendFoodItem({
        type,
        name: tempAIResult.name,
        nutri: normalizeNutri(tempAIResult),
        items: cloneFoodItems(tempAIResult.items),
        healthScore: tempAIResult.healthScore || 0
    });
    dispatchAppAction('MARK_TEMP_AI_SAVED', { saved: true });
    closeModal('analysis-modal');
}

export function addManualFood() {
    const name = document.getElementById('manual-name').value;
    const cal = parseFloat(document.getElementById('manual-cal').value);
    const type = document.getElementById('manual-type').value;
    const t = getTranslations();

    if (!name || Number.isNaN(cal)) {
        showToast(t.alertNameCal || 'Enter name and calories.', 'error');
        return;
    }

    appendFoodItem({
        type,
        name,
        nutri: {
            calories: cal,
            protein: parseFloat(document.getElementById('manual-pro').value) || 0,
            fat: parseFloat(document.getElementById('manual-fat').value) || 0,
            carbohydrate: parseFloat(document.getElementById('manual-carb').value) || 0,
            sugar: parseFloat(document.getElementById('manual-sugar').value) || 0,
            sodium: parseFloat(document.getElementById('manual-sod').value) || 0,
            saturatedFat: parseFloat(document.getElementById('manual-sat').value) || 0,
            transFat: parseFloat(document.getElementById('manual-trans').value) || 0,
            fiber: parseFloat(document.getElementById('manual-fiber').value) || 0
        },
        items: [],
        healthScore: 0
    });
    clearManualInputs();
}

export function saveToFavorites() {
    const name = document.getElementById('manual-name').value;
    const cal = parseFloat(document.getElementById('manual-cal').value);
    const t = getTranslations();

    if (!name || Number.isNaN(cal)) {
        showToast(t.alertNameCal || 'Enter name and calories.', 'error');
        return;
    }
    if (favoriteFoods.some((favorite) => favorite.name === name)) {
        showToast(t.alertFavExist || 'This food is already saved in favorites.', 'error');
        return;
    }

    dispatchAppAction('ADD_FAVORITE', {
        favorite: {
            name,
            nutri: {
                calories: cal,
                protein: parseFloat(document.getElementById('manual-pro').value) || 0,
                fat: parseFloat(document.getElementById('manual-fat').value) || 0,
                carbohydrate: parseFloat(document.getElementById('manual-carb').value) || 0,
                sugar: parseFloat(document.getElementById('manual-sugar').value) || 0,
                sodium: parseFloat(document.getElementById('manual-sod').value) || 0,
                saturatedFat: parseFloat(document.getElementById('manual-sat').value) || 0,
                transFat: parseFloat(document.getElementById('manual-trans').value) || 0,
                fiber: parseFloat(document.getElementById('manual-fiber').value) || 0
            },
            items: [],
            healthScore: 0
        },
    });
    showToast(t.alertFavAdded || 'Saved to favorites.', 'success');
}

export function saveAIResultToFavorites() {
    if (!tempAIResult) return;
    const t = getTranslations();

    if (favoriteFoods.some((favorite) => favorite.name === tempAIResult.name)) {
        showToast(t.alertFavExist || 'This food is already saved in favorites.', 'error');
        return;
    }

    dispatchAppAction('ADD_FAVORITE', {
        favorite: {
            name: tempAIResult.name,
            nutri: normalizeNutri(tempAIResult),
            items: cloneFoodItems(tempAIResult.items),
            healthScore: tempAIResult.healthScore || 0
        }
    });
    showToast(t.alertFavAdded || 'Saved to favorites.', 'success');
}

export function reloadSelectedDateRecords() {
    dispatchAppAction('SET_SELECTED_DATE', {
        date: document.getElementById('current-date').value
    });
}
