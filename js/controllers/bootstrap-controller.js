import {
    initializeAppData,
    loadFoodData,
    loadProfile,
    exportData,
    selectedDate
} from '../data.js';
import {
    closeModal,
    openFavModal,
    openLangModal,
    openDailySummaryDetails,
    petInteraction,
    switchView,
    setChartRange,
    toggleTheme,
} from '../ui.js';
import { registerGlobalDiagnostics } from '../diagnostics.js';
import { registerAppServiceWorker, clickFileInput } from '../platform.js';
import { dispatchAppAction } from '../state/app-actions.js';
import { initializeAppState, refreshAppState, subscribeAppState } from '../state/app-state.js';
import { reportControllerError, applyProfileToForm } from './controller-shared.js';
import { calculateProfile, changeDate, handleImportData, saveCurrentWeight } from './profile-controller.js';
import { handleFileSelect, startAnalysis, tryCloseAnalysisModal, applyUsageLimitState } from './analysis-controller.js';
import { addManualFood, saveToFavorites, saveAIResultToFavorites } from './record-controller.js';
import { syncAppStateUI } from '../ui/app-state-ui.js';

let hasRegisteredAppStateSubscription = false;

function registerAppStateSubscription() {
    if (hasRegisteredAppStateSubscription) return;

    subscribeAppState((state, previousState, meta = {}) => {
        syncAppStateUI(state, previousState, meta);
    });

    hasRegisteredAppStateSubscription = true;
}

async function registerServiceWorker() {
    try {
        await registerAppServiceWorker();
    } catch (error) {
        reportControllerError('Service Worker Register Error', error);
    }
}

function scheduleServiceWorkerRegistration() {
    const runRegistration = () => {
        void registerServiceWorker();
    };

    if (typeof window === 'undefined') {
        runRegistration();
        return;
    }

    if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(runRegistration, { timeout: 2500 });
        return;
    }

    if (document.readyState === 'complete') {
        setTimeout(runRegistration, 400);
        return;
    }

    window.addEventListener('load', () => {
        setTimeout(runRegistration, 400);
    }, { once: true });
}

export function setupEventListeners() {
    document.getElementById('current-date').addEventListener('change', changeDate);
    document.getElementById('image-upload').addEventListener('change', function onFileChange() {
        handleFileSelect(this);
    });
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
    document.getElementById('btn-export-setting').addEventListener('click', exportData);
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

export function bootstrapApp() {
    registerGlobalDiagnostics();

    try {
        initializeAppData();
        initializeAppState();
    } catch (error) {
        reportControllerError('Initialize App Data Error', error);
    }

    try {
        if (screen.orientation?.lock) {
            screen.orientation.lock('portrait').catch(() => {});
        }
    } catch {}

    try {
        setupEventListeners();
        registerAppStateSubscription();
    } catch (error) {
        reportControllerError('Event Listeners Error', error);
    }

    try {
        const profile = loadProfile();
        applyProfileToForm(profile);
    } catch (error) {
        reportControllerError('Profile Form Hydration Error', error);
    }

    try {
        loadFoodData(selectedDate);
        refreshAppState({}, { reason: 'bootstrap:hydrate' });
    } catch (error) {
        reportControllerError('Load Food Data Error', error);
    }

    try {
        const profile = loadProfile();
        if (applyProfileToForm(profile)) {
            calculateProfile(true, {
                persist: false,
                refreshMeals: false,
                renderList: false
            });
        }
    } catch (error) {
        reportControllerError('Profile Plan Hydration Error', error);
    }

    try {
        applyUsageLimitState();
    } catch (error) {
        reportControllerError('Usage Limit UI Error', error);
    }

    scheduleServiceWorkerRegistration();
}
