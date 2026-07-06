import { getMealPlan } from '../domain/nutrition-domain.js';
import { dispatchAppAction } from '../state/app-actions.js';
import { getAppState } from '../state/app-state.js';
import { cloneNutrition } from '../domain/nutrition-schema.js';
import { showEatingAnimation } from './charts-ui.js';
import { createElement, clearElement } from './dom-ui.js';
import {
    getTexts,
    getPendingFavoriteIndex,
    setPendingFavoriteIndex,
    clearPendingFavoriteIndex,
    closeModal
} from './shared-ui.js';
import { showFavDetailModal } from './detail-ui.js';
import { formatNutritionInline } from './locale-ui.js';

const FAVORITE_UI_COPY = Object.freeze({
    en: Object.freeze({
        modalCopy: 'Saved foods stay here so you can add them back to breakfast, lunch, dinner, or a snack in one tap.',
        emptyTitle: 'No saved foods yet',
        emptyCopy: 'Save a meal once, then it will show up here for quick logging.',
        viewLabel: 'View details',
        addLabel: 'Add to today',
        removeLabel: 'Remove from favorites',
        quickAddEyebrow: 'Saved meal',
        quickAddFallbackScore: 'Ready',
        quickAddItems: (count) => `${count} items`
    }),
    'zh-TW': Object.freeze({
        modalCopy: '收藏後的餐點會整理在這裡，之後可一鍵加入早餐、午餐、晚餐或點心。',
        emptyTitle: '還沒有收藏餐點',
        emptyCopy: '先收藏一筆常吃食物，之後就能從這裡快速加入今天的餐次。',
        viewLabel: '查看內容',
        addLabel: '加入今天',
        removeLabel: '從收藏移除',
        quickAddEyebrow: '收藏餐點',
        quickAddFallbackScore: '可加入',
        quickAddItems: (count) => `${count} 項`
    }),
    'zh-CN': Object.freeze({
        modalCopy: '收藏后的餐点会整理在这里，之后可一键加入早餐、午餐、晚餐或点心。',
        emptyTitle: '还没有收藏餐点',
        emptyCopy: '先收藏一笔常吃食物，之后就能从这里快速加入今天的餐次。',
        viewLabel: '查看内容',
        addLabel: '加入今天',
        removeLabel: '从收藏移除',
        quickAddEyebrow: '收藏餐点',
        quickAddFallbackScore: '可加入',
        quickAddItems: (count) => `${count} 项`
    })
});

function getFavoriteUiCopy(lang = getAppState().curLang || 'en') {
    return FAVORITE_UI_COPY[lang]
        || FAVORITE_UI_COPY[String(lang || 'en').split('-')[0]]
        || FAVORITE_UI_COPY.en;
}

function getFavoriteMealPrompt() {
    const t = getTexts();
    return t.modalAsk || 'Which meal is this?';
}

function getFavoriteQuickAddLabel() {
    const t = getTexts();
    return t.btnAddRecord || t.btnAdd || 'Add';
}

function getHealthScoreText(item, t, copy) {
    const score = Number(item?.healthScore) || 0;
    if (score > 0) {
        return `${score}/10`;
    }

    const itemCount = Array.isArray(item?.items) ? item.items.length : 0;
    if (itemCount > 0) {
        return copy.quickAddItems(itemCount);
    }

    return copy.quickAddFallbackScore;
}

function cloneFavoriteEntry(item, type) {
    return {
        type,
        name: item?.name || '',
        nutri: cloneNutrition(item),
        items: Array.isArray(item?.items)
            ? item.items.map((food) => ({
                name: String(food?.name || ''),
                weight: String(food?.weight || '')
            }))
            : [],
        healthScore: Number(item?.healthScore) || 0
    };
}

function createMetricPill(label, value) {
    return createElement('div', { className: 'favorite-card__metric' }, [
        createElement('span', { className: 'favorite-card__metric-label', text: label }),
        createElement('span', { className: 'favorite-card__metric-value', text: value })
    ]);
}

function formatMacroValue(value, unit = 'g') {
    const safeValue = Math.round((Number(value) || 0) * 10) / 10;
    return safeValue > 0 ? `${safeValue}${unit}` : '--';
}

function renderFavoriteMealButtons(container) {
    if (!container) return;

    const state = getAppState();
    const t = getTexts();
    const mealPlan = getMealPlan(state.currentMealMode, t.meals || {}, state.targetCalories);
    clearElement(container);

    mealPlan.forEach(({ type, title, suggestedCalories }) => {
        const button = createElement('button', {
            className: `favorite-meal-choice favorite-meal-choice--${type}`,
            attrs: { type: 'button' }
        }, [
            createElement('span', { className: 'favorite-meal-choice__title', text: title }),
            createElement('span', {
                className: 'favorite-meal-choice__meta',
                text: suggestedCalories > 0 ? `${suggestedCalories} kcal` : getFavoriteQuickAddLabel()
            })
        ]);
        button.addEventListener('click', () => confirmFavoriteMeal(type));
        container.appendChild(button);
    });
}

function syncFavoriteMealPreview(item) {
    const t = getTexts();
    const copy = getFavoriteUiCopy();
    const nutri = item?.nutri || {};
    const metrics = document.getElementById('fav-meal-metrics');
    const nameEl = document.getElementById('fav-meal-food-name');
    const scoreEl = document.getElementById('fav-meal-health-score');
    const eyebrowEl = document.getElementById('txt-fav-meal-eyebrow');
    const titleEl = document.getElementById('txt-fav-meal-title');
    const askEl = document.getElementById('txt-fav-meal-ask');

    if (eyebrowEl) {
        eyebrowEl.innerText = copy.quickAddEyebrow;
    }
    if (titleEl) {
        titleEl.innerText = getFavoriteMealPrompt();
    }
    if (askEl) {
        askEl.innerText = getFavoriteMealPrompt();
    }
    if (nameEl) {
        nameEl.textContent = item?.name || '--';
    }
    if (scoreEl) {
        scoreEl.textContent = getHealthScoreText(item, t, copy);
    }
    if (!metrics) return;

    clearElement(metrics);
    metrics.append(
        createMetricPill(t.cal || 'Calories', `${Math.round(Number(nutri.calories) || 0)} kcal`),
        createMetricPill(t.carb || 'Carb', formatMacroValue(nutri.carbohydrate)),
        createMetricPill(t.pro || 'Protein', formatMacroValue(nutri.protein)),
        createMetricPill(t.fat || 'Fat', formatMacroValue(nutri.fat))
    );
}

export function openFavModal() {
    const list = document.getElementById('fav-list-container');
    const copyEl = document.getElementById('txt-fav-copy');
    if (!list) return;

    const { favoriteFoods, curLang } = getAppState();
    const t = getTexts();
    const copy = getFavoriteUiCopy(curLang);
    clearElement(list);

    if (copyEl) {
        copyEl.textContent = copy.modalCopy;
    }

    if (favoriteFoods.length === 0) {
        list.appendChild(createElement('div', { className: 'favorite-empty-state' }, [
            createElement('div', { className: 'favorite-empty-state__title', text: copy.emptyTitle }),
            createElement('p', { className: 'favorite-empty-state__copy', text: copy.emptyCopy })
        ]));
    } else {
        favoriteFoods.forEach((item, index) => {
            const nutri = item.nutri || {};
            const calories = Math.round(Number(nutri.calories || item.cal || 0) || 0);
            const macroSummary = formatNutritionInline({
                calories,
                protein: nutri.protein || 0,
                fat: nutri.fat || 0,
                carbohydrate: nutri.carbohydrate || 0
            }, t);
            const card = createElement('article', { className: 'favorite-card' });
            const summaryButton = createElement('button', {
                className: 'favorite-card__summary',
                attrs: { type: 'button', 'aria-label': `${copy.viewLabel}: ${item.name || '--'}` }
            }, [
                createElement('div', { className: 'favorite-card__header' }, [
                    createElement('div', { className: 'favorite-card__name', text: item.name || '--' }),
                    createElement('div', { className: 'favorite-card__calories', text: calories > 0 ? `${calories} kcal` : '--' })
                ]),
                createElement('div', { className: 'favorite-card__nutrition-line', text: macroSummary }),
                createElement('div', { className: 'favorite-card__metrics-row' }, [
                    createMetricPill(t.pro || 'Protein', formatMacroValue(nutri.protein)),
                    createMetricPill(t.fat || 'Fat', formatMacroValue(nutri.fat)),
                    createMetricPill(t.carb || 'Carb', formatMacroValue(nutri.carbohydrate)),
                    createMetricPill(t.healthScoreLabel || 'Health Score', getHealthScoreText(item, t, copy))
                ])
            ]);
            summaryButton.addEventListener('click', () => showFavDetailModal(index));

            const actionRow = createElement('div', { className: 'favorite-card__actions' }, [
                createElement('button', {
                    className: 'favorite-card__action favorite-card__action--quiet',
                    text: copy.viewLabel,
                    attrs: { type: 'button' }
                }),
                createElement('button', {
                    className: 'favorite-card__action favorite-card__action--primary',
                    text: copy.addLabel,
                    attrs: { type: 'button' }
                }),
                createElement('button', {
                    className: 'favorite-card__delete',
                    text: '×',
                    attrs: { type: 'button', 'aria-label': copy.removeLabel, title: copy.removeLabel }
                })
            ]);

            actionRow.children[0].addEventListener('click', () => showFavDetailModal(index));
            actionRow.children[1].addEventListener('click', () => pickFav(index));
            actionRow.children[2].addEventListener('click', () => deleteFav(index));

            card.append(summaryButton, actionRow);
            list.appendChild(card);
        });
    }

    document.getElementById('fav-modal').style.display = 'flex';
}

export function openFavoriteMealModal(index) {
    const { favoriteFoods } = getAppState();
    const item = favoriteFoods[index];
    const modal = document.getElementById('favorite-meal-modal');
    const mealButtons = document.getElementById('favorite-meal-buttons');
    if (!item || !modal || !mealButtons) return;

    setPendingFavoriteIndex(index);
    syncFavoriteMealPreview(item);
    renderFavoriteMealButtons(mealButtons);
    modal.style.display = 'flex';
}

export function confirmFavoriteMeal(type) {
    const { favoriteFoods } = getAppState();
    const index = getPendingFavoriteIndex();
    if (index === null) return;
    const item = favoriteFoods[index];
    if (!item) return;

    dispatchAppAction('ADD_FOOD_ITEM', {
        entry: cloneFavoriteEntry(item, type)
    });
    showEatingAnimation?.();
    clearPendingFavoriteIndex();
    closeModal('favorite-meal-modal');
    closeModal('fav-modal');
}

export function pickFav(index) {
    openFavoriteMealModal(index);
}

export function deleteFav(index) {
    const t = getTexts();
    if (confirm(t.alertDel || 'Delete this item?')) {
        dispatchAppAction('DELETE_FAVORITE', { index });
    }
}
