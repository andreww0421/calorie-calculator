import { i18n } from '../config.js';
import { curLang } from '../data.js';

export let uiActions = {
    confirmAddFood: null,
    deleteItem: null,
    addRecordToFav: null
};

let pendingFavoriteIndex = null;

export function bindUIActions(nextActions = {}) {
    uiActions = { ...uiActions, ...nextActions };
}

export function getTexts() {
    return i18n[curLang] || i18n['zh-TW'];
}

export function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

export function getPendingFavoriteIndex() {
    return pendingFavoriteIndex;
}

export function setPendingFavoriteIndex(index) {
    pendingFavoriteIndex = index;
}

export function clearPendingFavoriteIndex() {
    pendingFavoriteIndex = null;
}

export function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
    if (id === 'favorite-meal-modal') clearPendingFavoriteIndex();
}

export function toggleFabMenu() {
    const element = document.getElementById('fab-menu');
    if (element) element.classList.toggle('show');
}
