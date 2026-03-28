import { registerGlobalDiagnostics } from '../diagnostics.js';
import { reportControllerError } from './controller-shared.js';
import { setupEventListeners } from './bootstrap-events.js';
import {
    hydrateProfileForm,
    hydrateProfilePlan,
    hydrateSelectedDateRecords,
    hydrateUsageLimitState,
    initializeBootstrapData,
    registerAppStateSubscription,
    scheduleServiceWorkerRegistration
} from './bootstrap-runtime.js';

export function bootstrapApp() {
    registerGlobalDiagnostics();

    try {
        initializeBootstrapData();
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
        hydrateProfileForm();
    } catch (error) {
        reportControllerError('Profile Form Hydration Error', error);
    }

    try {
        hydrateSelectedDateRecords();
    } catch (error) {
        reportControllerError('Load Food Data Error', error);
    }

    try {
        hydrateProfilePlan();
    } catch (error) {
        reportControllerError('Profile Plan Hydration Error', error);
    }

    try {
        hydrateUsageLimitState();
    } catch (error) {
        reportControllerError('Usage Limit UI Error', error);
    }

    scheduleServiceWorkerRegistration();
}
