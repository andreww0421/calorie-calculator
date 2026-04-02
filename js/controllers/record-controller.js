import { dispatchAppAction } from '../state/app-actions.js';
import { getAppState } from '../state/app-state.js';
import { cloneNutrition } from '../domain/nutrition-schema.js';
import { closeModal, openModal, showEatingAnimation, showToast } from '../ui.js';
import { getTranslations } from './controller-shared.js';
import { createFoodPresetManualDraft } from '../domain/food-preset-domain.js';
import { findFoodPresetById } from '../repositories/food-preset-repository.js';
import {
    applyFoodPresetToManualForm,
    readManualFoodPresetSelection,
    renderManualFoodPresetPanel
} from '../ui/food-preset-ui.js';

let manualPresetDraft = null;

function cloneFoodItems(items) {
    if (!Array.isArray(items)) return [];
    return items.map((item) => ({
        name: item?.name || '',
        weight: item?.weight || ''
    }));
}

function appendFoodItem(entry, source = 'manual') {
    dispatchAppAction('ADD_FOOD_ITEM', { entry, source });
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
    manualPresetDraft = null;
}

function readManualNutrition() {
    return cloneNutrition({
        calories: parseFloat(document.getElementById('manual-cal').value) || 0,
        protein: parseFloat(document.getElementById('manual-pro').value) || 0,
        fat: parseFloat(document.getElementById('manual-fat').value) || 0,
        carbohydrate: parseFloat(document.getElementById('manual-carb').value) || 0,
        sugar: parseFloat(document.getElementById('manual-sugar').value) || 0,
        sodium: parseFloat(document.getElementById('manual-sod').value) || 0,
        saturatedFat: parseFloat(document.getElementById('manual-sat').value) || 0,
        transFat: parseFloat(document.getElementById('manual-trans').value) || 0,
        fiber: parseFloat(document.getElementById('manual-fiber').value) || 0
    });
}

export function deleteItem(index) {
    const t = getTranslations();
    if (confirm(t.alertDel || 'Delete this item?')) {
        dispatchAppAction('DELETE_FOOD_ITEM', { index });
    }
}

export function addRecordToFav(index) {
    const state = getAppState();
    const item = state.foodItems[index];
    const t = getTranslations();
    if (!item) return;

    if (state.favoriteFoods.some((favorite) => favorite.name === item.name)) {
        showToast(t.alertFavExist || 'This food is already saved in favorites.', 'error');
        return;
    }

    dispatchAppAction('ADD_FAVORITE', {
        favorite: {
            name: item.name,
            nutri: cloneNutrition(item),
            items: cloneFoodItems(item.items),
            healthScore: item.healthScore || 0
        }
    });
    showToast(t.alertFavAdded || 'Saved to favorites.', 'success');
}

export function confirmAddFood(type) {
    const { tempAIResult } = getAppState();
    if (!tempAIResult) return;

    appendFoodItem({
        type,
        name: tempAIResult.name,
        nutri: cloneNutrition(tempAIResult),
        items: cloneFoodItems(tempAIResult.items),
        healthScore: tempAIResult.healthScore || 0
    }, 'ai');
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
        nutri: readManualNutrition(),
        items: cloneFoodItems(manualPresetDraft?.items),
        healthScore: 0
    }, manualPresetDraft ? 'preset' : 'manual');
    clearManualInputs();
    closeModal('manual-entry-modal');
}

export function syncManualFoodPresetUI(options = {}) {
    const current = readManualFoodPresetSelection();
    const nextSelection = {
        region: options.region ?? current.region,
        presetId: options.resetPreset ? '' : (options.presetId ?? current.presetId),
        modifiers: options.resetModifiers ? {} : (options.modifiers ?? current.modifiers)
    };

    return renderManualFoodPresetPanel({
        selection: nextSelection,
        surface: 'modal',
        actionMode: 'quick-add',
        showRegionSelect: false,
        showSecondaryAction: true
    });
}

export function applySelectedFoodPreset() {
    const t = getTranslations();
    const state = getAppState();
    const { presetId, modifiers } = readManualFoodPresetSelection();
    const preset = findFoodPresetById(presetId);

    if (!preset) {
        showToast(t.presetSelectPrompt || 'Select a preset meal first.', 'error');
        return;
    }

    const draft = createFoodPresetManualDraft(preset, {
        lang: state.curLang,
        selectedModifiers: modifiers
    });

    manualPresetDraft = draft;
    applyFoodPresetToManualForm(draft);
    showToast(t.presetAppliedToast || 'Preset applied to manual entry.', 'success');
}

export function quickAddSelectedFoodPreset() {
    const t = getTranslations();
    const state = getAppState();
    const { presetId, modifiers } = readManualFoodPresetSelection();
    const preset = findFoodPresetById(presetId);

    if (!preset) {
        showToast(t.presetSelectPrompt || 'Select a preset meal first.', 'error');
        return;
    }

    const draft = createFoodPresetManualDraft(preset, {
        lang: state.curLang,
        selectedModifiers: modifiers
    });

    manualPresetDraft = draft;
    appendFoodItem({
        type: draft.type || preset.suggestedMealType || 'snack',
        name: draft.name,
        nutri: cloneNutrition(draft.nutri),
        items: cloneFoodItems(draft.items),
        healthScore: 0
    }, 'preset');
    clearManualInputs();
    closeModal('food-preset-modal');
    showToast(t.presetAppliedToast || 'Preset applied to manual entry.', 'success');
}

export function openManualEntryModal() {
    closeModal('home-log-modal');
    openModal('manual-entry-modal');
    document.getElementById('manual-name')?.focus();
}

export function saveToFavorites() {
    const name = document.getElementById('manual-name').value;
    const cal = parseFloat(document.getElementById('manual-cal').value);
    const t = getTranslations();

    if (!name || Number.isNaN(cal)) {
        showToast(t.alertNameCal || 'Enter name and calories.', 'error');
        return;
    }
    if (getAppState().favoriteFoods.some((favorite) => favorite.name === name)) {
        showToast(t.alertFavExist || 'This food is already saved in favorites.', 'error');
        return;
    }

    dispatchAppAction('ADD_FAVORITE', {
        favorite: {
            name,
            nutri: readManualNutrition(),
            items: cloneFoodItems(manualPresetDraft?.items),
            healthScore: 0
        },
    });
    showToast(t.alertFavAdded || 'Saved to favorites.', 'success');
}

export function saveAIResultToFavorites() {
    const { tempAIResult, favoriteFoods } = getAppState();
    if (!tempAIResult) return;
    const t = getTranslations();

    if (favoriteFoods.some((favorite) => favorite.name === tempAIResult.name)) {
        showToast(t.alertFavExist || 'This food is already saved in favorites.', 'error');
        return;
    }

    dispatchAppAction('ADD_FAVORITE', {
        favorite: {
            name: tempAIResult.name,
            nutri: cloneNutrition(tempAIResult),
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
