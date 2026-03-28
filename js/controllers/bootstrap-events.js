import {
    closeModal,
    openFavModal,
    openLangModal,
    openDailySummaryDetails,
    petInteraction,
    switchView,
    setChartRange,
    toggleTheme
} from '../ui.js';
import { clickFileInput } from '../platform.js';
import { exportBackup } from '../repositories/backup-repository.js';
import { dispatchAppAction } from '../state/app-actions.js';
import { calculateProfile, changeDate, handleImportData, saveCurrentWeight } from './profile-controller.js';
import { handleFileSelect, startAnalysis, syncAnalysisInputState, tryCloseAnalysisModal } from './analysis-controller.js';
import { addManualFood, saveToFavorites, saveAIResultToFavorites } from './record-controller.js';

export function setupEventListeners() {
    document.getElementById('current-date').addEventListener('change', changeDate);
    document.getElementById('image-upload').addEventListener('change', function onFileChange() {
        handleFileSelect(this);
    });
    document.getElementById('ai-text-desc')?.addEventListener('input', syncAnalysisInputState);
    document.getElementById('ai-desc')?.addEventListener('input', syncAnalysisInputState);
    document.getElementById('btn-take-photo').addEventListener('click', () => {
        clickFileInput(document.getElementById('image-upload'));
    });
    document.getElementById('analyze-btn').addEventListener('click', startAnalysis);
    document.getElementById('btn-add-record').addEventListener('click', addManualFood);
    document.getElementById('btn-fav-save-main').addEventListener('click', saveToFavorites);
    document.getElementById('btn-fav-load-main').addEventListener('click', () => openFavModal());
    document.getElementById('meal-mode').addEventListener('change', () => calculateProfile());
    document.getElementById('goal-type')?.addEventListener('change', () => calculateProfile());
    document.getElementById('btn-calc').addEventListener('click', () => calculateProfile());
    document.getElementById('btn-ai-fav-save').addEventListener('click', saveAIResultToFavorites);
    document.getElementById('btn-cancel').addEventListener('click', tryCloseAnalysisModal);
    document.getElementById('btn-fav-close').addEventListener('click', () => {
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

    const dailySummaryCard = document.getElementById('daily-summary-card');
    if (dailySummaryCard) {
        dailySummaryCard.addEventListener('click', openDailySummaryDetails);
        dailySummaryCard.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openDailySummaryDetails();
            }
        });
    }

    const btnSaveWeight = document.getElementById('btn-save-weight');
    if (btnSaveWeight) btnSaveWeight.addEventListener('click', saveCurrentWeight);

    document.getElementById('btn-toggle-theme-setting').addEventListener('click', toggleTheme);
    document.getElementById('btn-open-lang-setting').addEventListener('click', openLangModal);
    document.getElementById('btn-export-setting').addEventListener('click', exportBackup);
    document.getElementById('import-file').addEventListener('change', function onImportChange() {
        handleImportData(this);
    });
    document.getElementById('btn-lang-cancel').addEventListener('click', () => {
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
