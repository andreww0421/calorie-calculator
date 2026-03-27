import { i18n } from '../config.js';
import { calculateProfilePlan } from '../domain/profile-domain.js';
import { createDailyViewModel } from '../state/app-state.js';
import { renderListAndStats } from './charts-ui.js';
import { openFavModal } from './favorites-ui.js';
import { getDisplayDateLabel, getGoalUiText } from './locale-ui.js';
import { renderProfileGoalResult } from './profile-ui.js';
import { setLang, setTheme, updateMealUI } from './settings-ui.js';
import { closeModal } from './shared-ui.js';
import { showModal } from './analysis-ui.js';

function applyDateInputs(state) {
    const currentDateInput = document.getElementById('current-date');
    if (currentDateInput) {
        currentDateInput.value = state.selectedDate;
    }

    const displayDateText = document.getElementById('display-date-text');
    if (displayDateText) {
        displayDateText.innerText = getDisplayDateLabel(state.selectedDate, state.curLang);
    }

    const weightInput = document.getElementById('daily-weight-input');
    if (weightInput) {
        weightInput.value = state.loggedWeight ?? '';
    }
}

function syncProfileGoalPresentation(state) {
    const goalResult = document.getElementById('goal-result');
    const targetDisplayEl = document.getElementById('target-cal-display');
    const plan = calculateProfilePlan(state.profile || {});

    if (!plan) {
        if (goalResult) {
            goalResult.style.display = 'none';
        }
        if (targetDisplayEl) {
            targetDisplayEl.innerText = '--';
        }
        return false;
    }

    renderProfileGoalResult(
        plan,
        i18n[state.curLang] || i18n['zh-TW'],
        getGoalUiText(state.curLang)
    );
    return true;
}

function syncFavoriteModal(state, reason) {
    if ((reason === 'favorite:add' || reason === 'favorite:delete')
        && document.getElementById('fav-modal')?.style.display === 'flex'
        && Array.isArray(state.favoriteFoods)) {
        openFavModal();
    }
}

function syncAnalysisModal(state, meta = {}) {
    const modal = document.getElementById('analysis-modal');
    if (!modal) return;

    if (!state.tempAIResult) {
        if (modal.style.display === 'flex') {
            closeModal('analysis-modal');
        }
        return;
    }

    if (meta.reason === 'ai-result:update-items' && meta.syncModal === false) {
        return;
    }

    if (meta.openModal || modal.style.display === 'flex') {
        showModal();
    }
}

export function syncAppStateUI(state, previousState, meta = {}) {
    const reason = meta.reason || 'state:sync';
    const bootstrapSync = reason.startsWith('bootstrap:');
    const themeChanged = bootstrapSync || !previousState || state.curTheme !== previousState.curTheme || reason === 'theme:set';
    const langChanged = bootstrapSync || !previousState || state.curLang !== previousState.curLang || reason === 'lang:set';
    const mealPlanChanged = bootstrapSync
        || !previousState
        || state.currentMealMode !== previousState.currentMealMode
        || state.targetCalories !== previousState.targetCalories
        || reason === 'profile:apply'
        || langChanged;
    const dailyChanged = bootstrapSync
        || !previousState
        || state.selectedDate !== previousState.selectedDate
        || state.loggedWeight !== previousState.loggedWeight
        || state.targetCalories !== previousState.targetCalories
        || reason === 'profile:apply'
        || reason === 'food:add'
        || reason === 'food:delete'
        || reason === 'date:set'
        || reason === 'weight:save'
        || langChanged
        || reason === 'state:sync';

    if (themeChanged) {
        setTheme(state.curTheme, { persist: false });
    }

    if (langChanged) {
        setLang(state.curLang);
    }

    if (mealPlanChanged) {
        updateMealUI();
        syncProfileGoalPresentation(state);
    }

    if (dailyChanged) {
        applyDateInputs(state);
        renderListAndStats(createDailyViewModel(state));
    }

    syncFavoriteModal(state, reason);
    syncAnalysisModal(state, meta);
}
