import {
    closeModal,
    openModal,
    openFavModal,
    openLangModal,
    openDailySummaryDetails,
    previewWeightChart,
    petInteraction,
    switchView,
    setChartRange
} from '../ui.js';
import {
    initializeAppShellInteractions,
    setAddMode
} from '../ui/app-shell-ui.js';
import { getAppState } from '../state/app-state.js';
import { exportBackup } from '../repositories/backup-repository.js';
import { dispatchAppAction } from '../state/app-actions.js';
import { calculateProfile, changeDate, handleImportData, saveCurrentWeight } from './profile-controller.js';
import { tryCloseAnalysisModal } from './analysis-controller.js';
import {
    saveAIResultToFavorites
} from './record-controller.js';
import { clearDetailSurfaceState } from '../ui/detail-surface-bridge.js';
import { clampDateString, shiftLocalDateString } from '../utils.js';

function bindEventListener(id, eventName, handler) {
    document.getElementById(id)?.addEventListener(eventName, handler);
}

function isReactIslandMounted(rootId) {
    return document.getElementById(rootId)?.dataset.mounted === 'true';
}

function shiftSelectedDate(offsetDays) {
    const { selectedDate } = getAppState();
    const nextDate = clampDateString(shiftLocalDateString(selectedDate, offsetDays));
    dispatchAppAction('SET_SELECTED_DATE', { date: nextDate });
}

export function setupEventListeners() {
    const statsReactMounted = isReactIslandMounted('stats-react-root');

    initializeAppShellInteractions();
    bindEventListener('current-date', 'change', changeDate);
    document.getElementById('btn-home-ai')?.addEventListener('click', () => {
        switchView('view-add');
    });
    document.getElementById('btn-home-log-hub')?.addEventListener('click', () => {
        openModal('home-log-modal');
    });
    document.getElementById('btn-home-favorites')?.addEventListener('click', () => {
        openFavModal();
    });
    document.getElementById('btn-home-log-close')?.addEventListener('click', () => {
        closeModal('home-log-modal');
    });
    document.getElementById('btn-home-log-favorites')?.addEventListener('click', () => {
        closeModal('home-log-modal');
        openFavModal();
    });
    document.getElementById('btn-home-log-manual')?.addEventListener('click', () => {
        closeModal('home-log-modal');
        setAddMode('photo');
        switchView('view-add');
    });
    document.getElementById('btn-dashboard-date-prev')?.addEventListener('click', () => shiftSelectedDate(-1));
    document.getElementById('btn-dashboard-date-next')?.addEventListener('click', () => shiftSelectedDate(1));
    bindEventListener('meal-mode', 'change', () => calculateProfile());
    document.getElementById('goal-type')?.addEventListener('change', () => calculateProfile());
    bindEventListener('btn-calc', 'click', () => calculateProfile());
    bindEventListener('btn-ai-fav-save', 'click', saveAIResultToFavorites);
    bindEventListener('btn-cancel', 'click', tryCloseAnalysisModal);
    bindEventListener('btn-fav-close', 'click', () => {
        closeModal('fav-modal');
    });

    const favMealCloseBtn = document.getElementById('btn-fav-meal-close');
    if (favMealCloseBtn) {
        favMealCloseBtn.addEventListener('click', () => {
            closeModal('favorite-meal-modal');
        });
    }

    const detailCloseBtn = document.getElementById('btn-detail-close');
    if (detailCloseBtn) {
        detailCloseBtn.addEventListener('click', () => {
            clearDetailSurfaceState();
            closeModal('detail-modal');
        });
    }

    document.querySelectorAll('.nav-item').forEach((nav) => {
        nav.addEventListener('click', function onNavClick(event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-target');
            if (targetId) switchView(targetId);
        });
    });

    const petImg = document.getElementById('pet-img');
    if (petImg) petImg.addEventListener('click', petInteraction);

    document.getElementById('onboarding-card')?.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (target.id !== 'btn-open-onboarding') return;

        switchView('view-profile');
        requestAnimationFrame(() => {
            document.getElementById('age')?.focus();
        });
    });

    if (!statsReactMounted) {
        const btnSaveWeight = document.getElementById('btn-save-weight');
        if (btnSaveWeight) btnSaveWeight.addEventListener('click', saveCurrentWeight);
        document.getElementById('daily-weight-input')?.addEventListener('input', (event) => {
            const target = event.target;
            if (!(target instanceof HTMLInputElement)) return;
            previewWeightChart(target.value, { state: getAppState() });
        });
    }

    bindEventListener('btn-open-lang-setting', 'click', openLangModal);
    bindEventListener('btn-export-setting', 'click', exportBackup);
    bindEventListener('import-file', 'change', function onImportChange() {
        handleImportData(this);
    });
    bindEventListener('btn-lang-cancel', 'click', () => {
        closeModal('lang-modal');
    });

    document.querySelectorAll('.lang-option').forEach((option) => {
        option.addEventListener('click', function onLangOptionClick() {
            const lang = this.getAttribute('data-lang');
            closeModal('lang-modal');
            dispatchAppAction('SET_LANGUAGE', { lang });
        });
    });

    if (!statsReactMounted) {
        const toggle7 = document.getElementById('btn-chart-7d');
        const toggle30 = document.getElementById('btn-chart-30d');
        const toggle90 = document.getElementById('btn-chart-90d');
        if (toggle7) toggle7.addEventListener('click', () => setChartRange(7));
        if (toggle30) toggle30.addEventListener('click', () => setChartRange(30));
        if (toggle90) toggle90.addEventListener('click', () => setChartRange(90));
    }
}
