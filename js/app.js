import { bindUIActions, closeModal, openDailySummaryDetails, openFavModal, openModal, switchView } from './ui.js';
import {
    handleFileSelect,
    setupTurnstileHandlers,
    startAnalysis,
    syncAnalysisInputState
} from './controllers/analysis-controller.js';
import { dispatchAppAction } from './state/app-actions.js';
import { getAppState, subscribeAppState } from './state/app-state.js';
import {
    addRecordToFav,
    addManualFood,
    applySelectedFoodPreset,
    confirmAddFood,
    deleteItem,
    quickAddSelectedFoodPreset,
    saveToFavorites,
    syncManualFoodPresetUI
} from './controllers/record-controller.js';
import { bootstrapApp } from './controllers/bootstrap-controller.js';
import {
    clearDetailSurfaceState,
    getDetailSurfaceState,
    subscribeDetailSurfaceState
} from './ui/detail-surface-bridge.js';
import { clickFileInput } from './platform.js';
import { clampDateString, shiftLocalDateString } from './utils.js';

function openTodayMealsDatePicker() {
    const input = document.getElementById('current-date');
    if (!input) return;
    input.focus?.({ preventScroll: true });
    if (typeof input.showPicker === 'function') {
        input.showPicker();
        return;
    }
    input.click();
}

function setSelectedDate(date) {
    const requestedDate = String(date || '').trim();
    if (!requestedDate) return;
    dispatchAppAction('SET_SELECTED_DATE', {
        date: clampDateString(requestedDate)
    });
}

function shiftSelectedDate(offsetDays) {
    const { selectedDate } = getAppState();
    setSelectedDate(shiftLocalDateString(selectedDate, offsetDays));
}

if (typeof window !== 'undefined') {
    window.__woofAppStateBridge = {
        getAppState,
        subscribeAppState
    };
    window.__woofDetailSurfaceBridge = {
        getState: getDetailSurfaceState,
        subscribe: subscribeDetailSurfaceState,
        clear: clearDetailSurfaceState
    };
    window.__woofAddBridge = {
        clickFileInput,
        handleFileSelect,
        syncAnalysisInputState,
        startAnalysis,
        addManualFood,
        saveToFavorites,
        openFavorites() {
            openFavModal();
        },
        syncManualFoodPresetUI,
        quickAddSelectedFoodPreset,
        applySelectedFoodPreset
    };
    window.__woofUiBridge = {
        openHomeLogModal() {
            openModal('home-log-modal');
        },
        openDashboardView() {
            switchView('view-stats');
        },
        openAIView() {
            switchView('view-add');
        },
        openSettingsView() {
            switchView('view-profile');
        },
        openFavorites() {
            openFavModal();
        },
        openTodayMealsDatePicker,
        setSelectedDate,
        shiftSelectedDate,
        addRecordToFavorites(index) {
            addRecordToFav(index);
        },
        deleteMealRecord(index) {
            deleteItem(index);
        },
        openRhythmView() {
            switchView('view-stats');
        },
        openDailySummaryDetail() {
            openDailySummaryDetails();
        },
        closeDetailModal() {
            clearDetailSurfaceState();
            closeModal('detail-modal');
        }
    };
}

setupTurnstileHandlers();

bindUIActions({
    confirmAddFood,
    deleteItem,
    addRecordToFav
});

document.addEventListener('DOMContentLoaded', bootstrapApp);
