import {
    initializeBackupStorage
} from '../repositories/backup-repository.js';
import { loadFoodLog } from '../repositories/food-log-repository.js';
import { loadProfileRecord } from '../repositories/profile-repository.js';
import { loadWeight } from '../repositories/weight-repository.js';
import { registerAppServiceWorker } from '../platform.js';
import { getAppState, initializeAppState, refreshAppState, subscribeAppState } from '../state/app-state.js';
import { syncAppStateUI } from '../ui/app-state-ui.js';
import { reportControllerError, applyProfileToForm } from './controller-shared.js';
import { calculateProfile } from './profile-controller.js';
import { applyUsageLimitState } from './analysis-controller.js';

let hasRegisteredAppStateSubscription = false;

export function registerAppStateSubscription() {
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

export function scheduleServiceWorkerRegistration() {
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

export function initializeBootstrapData() {
    initializeBackupStorage();
    initializeAppState();
}

export function hydrateProfileForm() {
    const profile = loadProfileRecord();
    applyProfileToForm(profile);
}

export function hydrateSelectedDateRecords() {
    const selectedDate = getAppState().selectedDate;
    refreshAppState({
        foodItems: loadFoodLog(selectedDate),
        loggedWeight: loadWeight(selectedDate)
    }, { reason: 'bootstrap:hydrate' });
}

export function hydrateProfilePlan() {
    const profile = loadProfileRecord();
    if (applyProfileToForm(profile)) {
        calculateProfile(true, {
            persist: false,
            refreshMeals: false,
            renderList: false
        });
    }
}

export function hydrateUsageLimitState() {
    applyUsageLimitState();
}
