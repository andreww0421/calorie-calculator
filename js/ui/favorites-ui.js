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

function getFavoriteMealPrompt() {
    const t = getTexts();
    return t.modalAsk || 'Which meal is this?';
}

function getFavoriteQuickAddLabel() {
    const t = getTexts();
    return t.btnAddRecord || t.btnAdd || 'Add';
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

export function openFavModal() {
    const list = document.getElementById('fav-list-container');
    if (!list) return;

    const { favoriteFoods } = getAppState();
    const t = getTexts();
    clearElement(list);

    if (favoriteFoods.length === 0) {
        list.appendChild(createElement('p', {
            text: `(${t.noData || 'Empty'})`,
            style: { color: '#888', textAlign: 'center' }
        }));
    } else {
        favoriteFoods.forEach((item, index) => {
            const nutri = item.nutri || {};
            const cal = nutri.calories || item.cal || 0;
            const pro = nutri.protein || 0;
            const fat = nutri.fat || 0;
            const carb = nutri.carbohydrate || 0;

            const info = createElement('div', {
                className: 'fav-item-name',
                style: { cursor: 'pointer' }
            });
            info.addEventListener('click', () => showFavDetailModal(index));
            info.appendChild(createElement('div', { text: item.name || '--' }));
            info.appendChild(createElement('span', {
                text: formatNutritionInline({
                    calories: cal,
                    protein: pro,
                    fat,
                    carbohydrate: carb
                }, t),
                style: {
                    fontSize: '0.85em',
                    opacity: '0.8',
                    display: 'block',
                    fontWeight: 'normal'
                }
            }));

            const pickBtn = createElement('button', {
                className: 'btn-delete',
                text: '+',
                style: { backgroundColor: '#0984e3' },
                attrs: {
                    title: getFavoriteQuickAddLabel(),
                    'aria-label': getFavoriteQuickAddLabel()
                }
            });
            pickBtn.addEventListener('click', () => pickFav(index));

            const deleteBtn = createElement('button', {
                className: 'btn-delete',
                text: 'X'
            });
            deleteBtn.addEventListener('click', () => deleteFav(index));

            const actions = createElement('div', {
                style: { display: 'flex', gap: '5px' }
            }, [pickBtn, deleteBtn]);

            list.appendChild(createElement('div', { className: 'fav-item-row' }, [info, actions]));
        });
    }

    document.getElementById('fav-modal').style.display = 'flex';
}

export function openFavoriteMealModal(index) {
    const { favoriteFoods } = getAppState();
    const item = favoriteFoods[index];
    const modal = document.getElementById('favorite-meal-modal');
    const nameEl = document.getElementById('fav-meal-food-name');
    const titleEl = document.getElementById('txt-fav-meal-title');
    const askEl = document.getElementById('txt-fav-meal-ask');
    if (!item || !modal || !nameEl || !titleEl || !askEl) return;

    const prompt = getFavoriteMealPrompt();
    setPendingFavoriteIndex(index);
    titleEl.innerText = prompt;
    askEl.innerText = prompt;
    nameEl.textContent = item.name || '--';
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
