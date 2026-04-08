import { createElement, clearElement } from './dom-ui.js';
import { getTexts, uiActions } from './shared-ui.js';
import { showDetailModal } from './detail-ui.js';
import { formatNutritionInline } from './locale-ui.js';

function createEmptyMealRow(title, body) {
    const wrapper = createElement('div', {
        className: 'meal-empty-card'
    }, [
        createElement('div', {
            className: 'meal-empty-title',
            text: title
        }),
        createElement('div', {
            className: 'meal-empty-copy',
            text: body
        })
    ]);

    const item = document.createElement('li');
    item.className = 'meal-empty-row';
    item.appendChild(wrapper);
    return item;
}

function calculateMealTargetPercent(mealCalories, targetCalories) {
    const mealTarget = targetCalories > 0 ? targetCalories * 0.3 : 500;
    return mealTarget > 0 ? Math.min((mealCalories / mealTarget) * 100, 100) : 0;
}

function setMealProgressLabel(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.innerText = value;
    }
}

export function renderMealListRows(viewModel, extra, t = getTexts()) {
    ['breakfast', 'lunch', 'dinner', 'snack'].forEach((type) => {
        clearElement(document.getElementById(`list-${type}`));
    });

    viewModel.foodItems.forEach((item, index) => {
        const n = item.nutri || {};

        const info = createElement('div', {
            className: 'food-info',
            style: { cursor: 'pointer' }
        });
        info.addEventListener('click', () => showDetailModal(index));
        info.appendChild(createElement('div', { className: 'name', text: item.name || '--' }));
        info.appendChild(createElement('div', {
            className: 'detail',
            text: formatNutritionInline(n, t)
        }));

        const actionWrap = createElement('div', {
            style: { display: 'flex', gap: '5px' }
        });

        const favBtn = createElement('button', {
            className: 'btn-delete',
            text: t.btnFavSave || 'Save',
            style: { backgroundColor: '#ff7675' }
        });
        favBtn.addEventListener('click', () => uiActions.addRecordToFav?.(index));

        const deleteBtn = createElement('button', {
            className: 'btn-delete',
            text: 'X'
        });
        deleteBtn.addEventListener('click', () => uiActions.deleteItem?.(index));

        actionWrap.appendChild(favBtn);
        actionWrap.appendChild(deleteBtn);

        const listItem = document.createElement('li');
        listItem.appendChild(info);
        listItem.appendChild(actionWrap);

        const listEl = document.getElementById(`list-${item.type}`);
        if (listEl) listEl.appendChild(listItem);
    });

    ['breakfast', 'lunch', 'dinner', 'snack'].forEach((type) => {
        const listEl = document.getElementById(`list-${type}`);
        if (!listEl || listEl.children.length > 0) return;
        listEl.appendChild(createEmptyMealRow(extra.emptyMealTitle, extra.emptyMealBody));
    });
}

export function renderMealProgressCards(viewModel) {
    Object.keys(viewModel.mealTotals).forEach((type) => {
        const mealCalories = viewModel.mealTotals[type] || 0;
        const percent = calculateMealTargetPercent(mealCalories, Number(viewModel.targetCalories) || 0);
        setMealProgressLabel(`prog-${type}`, `${Math.round(mealCalories)} kcal`);

        const missionCard = document.querySelector(`.mission-card[data-meal-type="${type}"]`);
        const progressFill = document.getElementById(`prog-fill-${type}`);
        if (!missionCard) {
            return;
        }

        missionCard.classList.add('meal-section');
        missionCard.classList.remove('mission-card--empty', 'mission-card--partial', 'mission-card--complete');
        if (mealCalories <= 0) {
            missionCard.classList.add('mission-card--empty');
        } else if (percent >= 80) {
            missionCard.classList.add('mission-card--complete');
        } else {
            missionCard.classList.add('mission-card--partial');
        }

        if (progressFill) {
            progressFill.style.width = `${percent}%`;
        }
    });
}
