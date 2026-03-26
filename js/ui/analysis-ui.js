import { recalculateFromItems } from '../api.js';
import {
    tempAIResult,
    setTempAIResult,
    setTempAIResultSaved
} from '../data.js';
import { formatAIRequestError } from '../analysis-errors.js';
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

function renderAnalysisContent() {
    const data = tempAIResult;
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
    if (!tempAIResult) return;
    renderAnalysisContent();
    document.getElementById('analysis-modal').style.display = 'flex';
}

export function addAIItem() {
    if (!tempAIResult) return;
    const nextItems = collectAIItemsFromDOM();
    nextItems.push({ name: '', weight: '' });
    setTempAIResult({ ...tempAIResult, items: nextItems });
    setTempAIResultSaved(false);
    renderAnalysisContent();
}

export function removeAIItem(index) {
    if (!tempAIResult?.items) return;
    const nextItems = tempAIResult.items.filter((_, idx) => idx !== index);
    setTempAIResult({ ...tempAIResult, items: nextItems });
    setTempAIResultSaved(false);
    renderAnalysisContent();
}

export async function recalculateAI() {
    if (!tempAIResult) return;

    const t = getTexts();
    const extra = getExtraUiText();
    const items = collectAIItemsFromDOM();
    if (items.length === 0) {
        showToast(t.aiItemsRequired || extra.aiItemsRequired || 'Please keep at least one item.', 'error');
        return;
    }

    setTempAIResult({ ...tempAIResult, items });
    setTempAIResultSaved(false);

    const content = document.getElementById('analysis-content');
    setAnalysisActionVisibility(false);

    if (content) {
        clearElement(content);
        content.appendChild(createElement('div', {
            text: t.aiLoading || 'AI is analyzing...',
            style: { textAlign: 'center', padding: '30px' }
        }));
    }

    try {
        const result = await recalculateFromItems(items);
        if (result) {
            setTempAIResult({
                name: result.foodName || tempAIResult.name,
                nutri: {
                    calories: Number(result.calories) || 0,
                    protein: Number(result.protein) || 0,
                    fat: Number(result.fat) || 0,
                    carbohydrate: Number(result.carbohydrate) || 0,
                    sugar: Number(result.sugar) || 0,
                    sodium: Number(result.sodium) || 0,
                    saturatedFat: Number(result.saturatedFat) || 0,
                    transFat: Number(result.transFat) || 0,
                    fiber: Number(result.fiber) || 0
                },
                items: Array.isArray(result.items) ? result.items : items,
                healthScore: Number(result.healthScore) || 0
            });
            setTempAIResultSaved(false);
        }
    } catch (error) {
        showToast(formatAIRequestError(error, t), 'error');
    }

    renderAnalysisContent();
}
