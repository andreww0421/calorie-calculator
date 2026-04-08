import { bindUIActions, closeModal, openDailySummaryDetails, openFavModal, openModal, switchView } from './ui.js';
import { setupTurnstileHandlers } from './controllers/analysis-controller.js';
import { getAppState, subscribeAppState } from './state/app-state.js';
import {
    addRecordToFav,
    confirmAddFood,
    deleteItem
} from './controllers/record-controller.js';
import { bootstrapApp } from './controllers/bootstrap-controller.js';
import {
    clearDetailSurfaceState,
    getDetailSurfaceState,
    subscribeDetailSurfaceState
} from './ui/detail-surface-bridge.js';

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
    window.__woofUiBridge = {
        openHomeLogModal() {
            openModal('home-log-modal');
        },
        openDashboardView() {
            switchView('view-dashboard');
        },
        openAIView() {
            switchView('view-ai');
        },
        openSettingsView() {
            switchView('view-settings');
        },
        openFavorites() {
            openFavModal();
        },
        openTodayMealsDatePicker,
        openRhythmView() {
            switchView('view-dashboard');
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
