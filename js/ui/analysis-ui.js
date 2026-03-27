import { recalculateFromItems } from '../api.js';
import { dispatchAppAction } from '../state/app-actions.js';
import { getAppState } from '../state/app-state.js';
import { formatAIRequestError } from '../analysis-errors.js';
import { normalizeAIAnalysisResult } from '../domain/ai-analysis-domain.js';
import { createButton, createElement, clearElement } from './dom-ui.js';
import { getTexts, showToast } from './shared-ui.js';
import { createNutritionGrid, createScoreBadge } from './modal-content-ui.js';
import { getExtraUiText } from './locale-ui.js';

function setAnalysisActionVisibility(isVisible) {
    const btnFavSave = document.getElementById('btn-ai-fav-save');
    const askText = document.getElementById('txt-modal-ask');
    const modalBtns = document.getElementById('modal-meal-buttons');

    [btnFavSave, askText, modalBtns].forEach((element) => {
        if (element) element.style.display = isVisible ? '' : 'none';
    });
}

function collectAIItemsFromDOM() {
    const rows = document.querySelectorAll('#ai-items-container .ai-item-row');
    const items = [];

    rows.forEach((row) => {
        const name = row.querySelector('.ai-item-name')?.value.trim() || '';
        const weight = row.querySelector('.ai-item-weight')?.value.trim() || '';
        if (name) items.push({ name, weight });
    });

    return items;
}

function createAIItemEditorRow(item, index) {
    const row = createElement('div', {
        className: 'ai-item-row',
        dataset: { idx: index }
    });

    row.appendChild(createElement('input', {
        className: 'ai-item-name',
        attrs: { type: 'text', value: item?.name || '' },
        style: { flex: '2' }
    }));
    row.appendChild(createElement('input', {
        className: 'ai-item-weight',
        attrs: { type: 'text', value: item?.weight || '' },
        style: { flex: '1' }
    }));
    row.appendChild(createButton('X', () => removeAIItem(index), {
        className: 'btn-delete',
        style: { flex: '0' }
    }));

    return row;
}

function renderAnalysisContent(result = getAppState().tempAIResult) {
    const data = result;
    if (!data) return;

    const t = getTexts();
    const content = document.getElementById('analysis-content');
    const btnFavSave = document.getElementById('btn-ai-fav-save');
    const modalBtns = document.getElementById('modal-meal-buttons');
    if (!content) return;

    clearElement(content);

    const wrapper = createElement('div', {
        style: { textAlign: 'left' }
    });

    wrapper.appendChild(createElement('h3', {
        text: data.name || '--',
        style: { margin: '0 0 10px' }
    }));
    wrapper.appendChild(createScoreBadge(data.healthScore, t.healthScoreLabel || 'Health Score'));
    wrapper.appendChild(createNutritionGrid(data.nutri || {}, t, { caloriePrefix: 'Cal ' }));

    const itemsSection = createElement('div', { style: { marginTop: '15px' } });
    itemsSection.appendChild(createElement('strong', {
        text: t.aiItemsLabel || 'Estimated Food Items'
    }));
    itemsSection.appendChild(createElement('div', {
        text: `${t.itemName || 'Item'} / ${(t.itemWeight || 'Weight')} (g)`,
        style: {
            marginTop: '5px',
            fontSize: '0.8em',
            opacity: '0.6',
            marginBottom: '8px'
        }
    }));

    const itemContainer = createElement('div', { attrs: { id: 'ai-items-container' } });
    (Array.isArray(data.items) ? data.items : []).forEach((item, index) => {
        itemContainer.appendChild(createAIItemEditorRow(item, index));
    });
    itemsSection.appendChild(itemContainer);
    itemsSection.appendChild(createButton(t.addItem || 'Add Item', addAIItem, {
        style: { marginTop: '8px', padding: '8px', fontSize: '13px', background: '#74b9ff' }
    }));
    itemsSection.appendChild(createButton(t.recalculate || 'Recalculate', recalculateAI, {
        style: { marginTop: '8px', padding: '8px', fontSize: '13px', background: '#a29bfe' }
    }));

    wrapper.appendChild(itemsSection);
    content.appendChild(wrapper);

    if (btnFavSave || modalBtns) setAnalysisActionVisibility(true);
}

export function showModal() {
    const { tempAIResult } = getAppState();
    if (!tempAIResult) return;
    renderAnalysisContent(tempAIResult);
    document.getElementById('analysis-modal').style.display = 'flex';
}

export function addAIItem() {
    const { tempAIResult } = getAppState();
    if (!tempAIResult) return;
    const nextItems = collectAIItemsFromDOM();
    nextItems.push({ name: '', weight: '' });
    dispatchAppAction('SET_TEMP_AI_ITEMS', { items: nextItems, saved: false });
}

export function removeAIItem(index) {
    const { tempAIResult } = getAppState();
    if (!tempAIResult?.items) return;
    const nextItems = tempAIResult.items.filter((_, idx) => idx !== index);
    dispatchAppAction('SET_TEMP_AI_ITEMS', { items: nextItems, saved: false });
}

export async function recalculateAI() {
    const { tempAIResult } = getAppState();
    if (!tempAIResult) return;

    const t = getTexts();
    const extra = getExtraUiText();
    const items = collectAIItemsFromDOM();
    if (items.length === 0) {
        showToast(t.aiItemsRequired || extra.aiItemsRequired || 'Please keep at least one item.', 'error');
        return;
    }

    const content = document.getElementById('analysis-content');
    setAnalysisActionVisibility(false);

    if (content) {
        clearElement(content);
        content.appendChild(createElement('div', {
            text: t.aiLoading || 'AI is analyzing...',
            style: { textAlign: 'center', padding: '30px' }
        }));
    }

    dispatchAppAction('SET_TEMP_AI_ITEMS', {
        items,
        saved: false,
        syncModal: false
    });

    try {
        const result = await recalculateFromItems(items);
        if (result) {
            const normalized = normalizeAIAnalysisResult(result, {
                fallbackName: tempAIResult.name,
                fallbackItems: items
            });
            dispatchAppAction('SET_TEMP_AI_RESULT', {
                result: {
                    name: normalized.foodName,
                    nutri: {
                        calories: normalized.calories,
                        protein: normalized.protein,
                        fat: normalized.fat,
                        carbohydrate: normalized.carbohydrate,
                        sugar: normalized.sugar,
                        sodium: normalized.sodium,
                        saturatedFat: normalized.saturatedFat,
                        transFat: normalized.transFat,
                        fiber: normalized.fiber
                    },
                    items: normalized.items.length > 0 ? normalized.items : items,
                    healthScore: normalized.healthScore
                },
                saved: false
            });
        }
    } catch (error) {
        showToast(formatAIRequestError(error, t), 'error');
    }

}
