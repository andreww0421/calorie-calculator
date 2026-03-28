import { getAppState } from '../state/app-state.js';
import { createElement, clearElement } from './dom-ui.js';
import { getTexts } from './shared-ui.js';
import { createItemSummaryList, createNutritionGrid, createScoreBadge } from './modal-content-ui.js';

export function showDetailModal(index) {
    const item = getAppState().foodItems[index];
    if (item) renderDetailModal(item);
}

export function showFavDetailModal(index) {
    const item = getAppState().favoriteFoods[index];
    if (item) renderDetailModal(item);
}

export function renderDetailModal(item) {
    const t = getTexts();
    const nd = t.noData || '--';
    const nutri = item.nutri || {};
    const content = document.getElementById('detail-content');
    if (!content) return;

    clearElement(content);

    const wrapper = createElement('div', {
        style: { textAlign: 'left' }
    });

    wrapper.appendChild(createElement('h3', {
        text: item.name || nd,
        style: { margin: '0 0 10px' }
    }));

    if (Number(item.healthScore) > 0) {
        wrapper.appendChild(createScoreBadge(item.healthScore, t.healthScoreLabel || 'Health Score'));
    }

    wrapper.appendChild(createNutritionGrid(nutri, t, { fallback: nd, caloriePrefix: 'Cal ' }));

    const section = createElement('div', { style: { marginTop: '15px' } }, [
        createElement('strong', { text: t.aiItemsLabel || 'Estimated Food Items' }),
        createItemSummaryList(item.items, nd)
    ]);
    wrapper.appendChild(section);

    content.appendChild(wrapper);
    document.getElementById('detail-modal').style.display = 'flex';
}

export function showDailyNutritionSummary(summary) {
    if (!summary) return;

    const t = getTexts();
    const nd = t.noData || '--';
    const content = document.getElementById('detail-content');
    if (!content) return;

    clearElement(content);

    const wrapper = createElement('div', {
        style: { textAlign: 'left' }
    });

    wrapper.appendChild(createElement('h3', {
        text: summary.title || 'Daily Nutrition Summary',
        style: { margin: '0 0 10px' }
    }));

    const highlights = createElement('div', { className: 'ai-nutri-grid ai-nutri-grid--summary' });
    [
        [summary.goalLabel || 'Goal', summary.goalValue ?? nd],
        [summary.remainingLabel || 'Remaining', summary.remainingValue ?? nd],
        [summary.waterLabel || 'Water', summary.waterValue ?? nd]
    ].forEach(([label, value]) => {
        highlights.appendChild(createElement('div', { className: 'ai-nutri-item ai-nutri-item--soft' }, [
            createElement('span', { className: 'ai-n-val', text: String(value) }),
            createElement('span', { className: 'ai-n-lbl', text: label })
        ]));
    });

    wrapper.appendChild(highlights);
    wrapper.appendChild(createNutritionGrid(summary.nutri || {}, t, { fallback: nd, caloriePrefix: 'Cal ' }));

    content.appendChild(wrapper);
    document.getElementById('detail-modal').style.display = 'flex';
}

export { renderDetailModal as _renderDetailModal };
