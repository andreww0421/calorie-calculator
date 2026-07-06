import { getAppState } from '../state/app-state.js';

const ADD_MODES = Object.freeze(['photo', 'text', 'manual']);
const MEAL_ORDER = Object.freeze(['breakfast', 'lunch', 'dinner', 'snack']);
let currentAddMode = 'photo';
let currentAddMealType = 'breakfast';

function isReactIslandMounted(rootId) {
    return document.getElementById(rootId)?.dataset.mounted === 'true';
}

function emitAddShellEvent(name, detail) {
    if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') return;
    window.dispatchEvent(new CustomEvent(name, { detail }));
}

export function syncAddMealTypeSelect() {
    const select = document.getElementById('manual-type');
    if (!select) return currentAddMealType;

    const optionValues = [...select.options].map((option) => option.value);
    if (optionValues.includes(currentAddMealType)) {
        select.value = currentAddMealType;
        select.dataset.preferredType = currentAddMealType;
        return currentAddMealType;
    }

    if (optionValues.length > 0) {
        currentAddMealType = optionValues[0];
        select.value = currentAddMealType;
        select.dataset.preferredType = currentAddMealType;
    }

    return currentAddMealType;
}

export function getAddMode() {
    return currentAddMode;
}

export function getAddMealType() {
    return currentAddMealType;
}

export function setAddMealType(type = 'breakfast') {
    currentAddMealType = MEAL_ORDER.includes(type) ? type : 'breakfast';

    document.querySelectorAll('[data-add-meal-type]').forEach((button) => {
        const isActive = button.getAttribute('data-add-meal-type') === currentAddMealType;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });

    syncAddMealTypeSelect();
    emitAddShellEvent('woof:add-meal-type-change', { mealType: currentAddMealType });
}

export function setAddMode(mode = 'photo') {
    currentAddMode = ADD_MODES.includes(mode) ? mode : 'photo';

    document.querySelectorAll('[data-add-mode]').forEach((button) => {
        const isActive = button.getAttribute('data-add-mode') === currentAddMode;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });

    ADD_MODES.forEach((entry) => {
        const panel = document.getElementById(`add-panel-${entry}`);
        if (panel) panel.hidden = entry !== currentAddMode;
    });

    const textOnlyGroup = document.getElementById('ai-text-only-group');
    const photoDescGroup = document.getElementById('ai-desc-group');
    if (textOnlyGroup) textOnlyGroup.style.display = currentAddMode === 'text' ? 'block' : 'none';
    if (photoDescGroup) photoDescGroup.style.display = currentAddMode === 'photo' ? 'grid' : 'none';
    emitAddShellEvent('woof:add-mode-change', { mode: currentAddMode });
}

export function initializeAppShellInteractions() {
    if (isReactIslandMounted('add-react-root')) {
        setAddMode(currentAddMode);
        setAddMealType(currentAddMealType);
        return;
    }

    document.querySelectorAll('[data-add-mode]').forEach((button) => {
        if (button.dataset.bound === 'true') return;
        button.dataset.bound = 'true';
        button.addEventListener('click', () => {
            setAddMode(button.getAttribute('data-add-mode') || 'photo');
        });
    });

    document.querySelectorAll('[data-add-meal-type]').forEach((button) => {
        if (button.dataset.bound === 'true') return;
        button.dataset.bound = 'true';
        button.addEventListener('click', () => {
            setAddMealType(button.getAttribute('data-add-meal-type') || 'breakfast');
        });
    });

    setAddMode(currentAddMode);
    setAddMealType(currentAddMealType);
}
