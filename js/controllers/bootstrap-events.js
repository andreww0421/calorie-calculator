import {
    closeModal,
    openModal,
    openFavModal,
    openLangModal,
    openDailySummaryDetails,
    previewWeightChart,
    petInteraction,
    switchView,
    setChartRange,
    toggleTheme
} from '../ui.js';
import { getAppState } from '../state/app-state.js';
import { clickFileInput } from '../platform.js';
import { exportBackup } from '../repositories/backup-repository.js';
import { dispatchAppAction } from '../state/app-actions.js';
import { calculateProfile, changeDate, handleImportData, saveCurrentWeight } from './profile-controller.js';
import { handleFileSelect, startAnalysis, syncAnalysisInputState, tryCloseAnalysisModal } from './analysis-controller.js';
import {
    addManualFood,
    applySelectedFoodPreset,
    openManualEntryModal,
    quickAddSelectedFoodPreset,
    saveToFavorites,
    saveAIResultToFavorites,
    syncManualFoodPresetUI
} from './record-controller.js';
import { clearDetailSurfaceState } from '../ui/detail-surface-bridge.js';

function bindEventListener(id, eventName, handler) {
    document.getElementById(id)?.addEventListener(eventName, handler);
}

export function setupEventListeners() {
    bindEventListener('current-date', 'change', changeDate);
    bindEventListener('image-upload', 'change', function onFileChange() {
        handleFileSelect(this);
    });
    document.getElementById('ai-text-desc')?.addEventListener('input', syncAnalysisInputState);
    document.getElementById('ai-desc')?.addEventListener('input', syncAnalysisInputState);
    bindEventListener('btn-take-photo', 'click', () => {
        clickFileInput(document.getElementById('image-upload'));
    });
    bindEventListener('analyze-btn', 'click', startAnalysis);
    bindEventListener('btn-add-record', 'click', addManualFood);
    bindEventListener('btn-fav-save-main', 'click', saveToFavorites);
    bindEventListener('btn-fav-load-main', 'click', () => openFavModal());
    document.getElementById('btn-home-ai')?.addEventListener('click', () => {
        switchView('view-ai');
    });
    document.getElementById('btn-home-log-hub')?.addEventListener('click', () => {
        openModal('home-log-modal');
    });
    document.getElementById('btn-home-favorites')?.addEventListener('click', () => {
        openFavModal();
    });
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const quickLogButton = target.closest('.woof-home__action-button--primary');
        if (!quickLogButton) return;
        if (!quickLogButton.closest('#home-react-root')) return;
        openModal('home-log-modal');
    });
    document.getElementById('btn-home-log-close')?.addEventListener('click', () => {
        closeModal('home-log-modal');
    });
    document.getElementById('btn-home-log-common')?.addEventListener('click', () => {
        closeModal('home-log-modal');
        syncManualFoodPresetUI();
        openModal('food-preset-modal');
        document.getElementById('food-preset-select')?.focus();
    });
    document.getElementById('btn-home-log-favorites')?.addEventListener('click', () => {
        closeModal('home-log-modal');
        openFavModal();
    });
    document.getElementById('btn-home-log-manual')?.addEventListener('click', () => {
        closeModal('home-log-modal');
        openManualEntryModal();
    });
    document.getElementById('btn-manual-entry-close')?.addEventListener('click', () => {
        closeModal('manual-entry-modal');
    });
    document.getElementById('btn-food-preset-close')?.addEventListener('click', () => {
        closeModal('food-preset-modal');
    });
    document.getElementById('btn-change-log-date')?.addEventListener('click', () => {
        const input = document.getElementById('current-date');
        if (!input) return;
        input.focus?.({ preventScroll: true });
        if (typeof input.showPicker === 'function') {
            input.showPicker();
            return;
        }
        input.click();
    });
    document.getElementById('food-preset-panel')?.addEventListener('change', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (target.id === 'food-preset-region') {
            syncManualFoodPresetUI({ region: target.value, resetPreset: true, resetModifiers: true });
            return;
        }
        if (target.id === 'food-preset-select') {
            syncManualFoodPresetUI({ presetId: target.value, resetModifiers: true });
            return;
        }
        if (target.dataset.groupId) {
            syncManualFoodPresetUI();
        }
    });
    document.getElementById('food-preset-panel')?.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (target.id === 'btn-quick-add-food-preset') {
            quickAddSelectedFoodPreset();
            return;
        }
        if (target.id === 'btn-preset-advanced-fill') {
            applySelectedFoodPreset();
            closeModal('food-preset-modal');
            openManualEntryModal();
        }
    });
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

        switchView('view-settings');
        requestAnimationFrame(() => {
            document.getElementById('region')?.focus();
        });
    });

    const btnSaveWeight = document.getElementById('btn-save-weight');
    if (btnSaveWeight) btnSaveWeight.addEventListener('click', saveCurrentWeight);
    document.getElementById('daily-weight-input')?.addEventListener('input', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) return;
        previewWeightChart(target.value, { state: getAppState() });
    });

    bindEventListener('btn-toggle-theme-setting', 'click', toggleTheme);
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

    const toggle7 = document.getElementById('btn-chart-7d');
    const toggle30 = document.getElementById('btn-chart-30d');
    if (toggle7) toggle7.addEventListener('click', () => setChartRange(7));
    if (toggle30) toggle30.addEventListener('click', () => setChartRange(30));
}
