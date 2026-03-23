const runtimeConfig =
    typeof window !== 'undefined' && window.__WOOF_CAL_CONFIG__
        ? window.__WOOF_CAL_CONFIG__
        : {};

export const WORKER_URL =
    runtimeConfig.workerUrl ||
    "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";

export const TURNSTILE_WIDGET_SELECTOR =
    runtimeConfig.turnstileWidgetSelector ||
    '#turnstile-widget';

export const SERVICE_WORKER_PATH =
    runtimeConfig.serviceWorkerPath ||
    './sw.js';

export const DAILY_LIMIT =
    Number(runtimeConfig.dailyAiLimit) || 20;

export const USAGE_KEY =
    runtimeConfig.usageKey || 'woofCal_usage';

export const STORAGE_SCHEMA_KEY =
    runtimeConfig.storageSchemaKey || 'woofCal_schema_version';

export const APP_SCHEMA_VERSION =
    Number(runtimeConfig.appSchemaVersion) || 3;

export const DIAGNOSTICS_KEY =
    runtimeConfig.diagnosticsKey || 'woofCal_diagnostics';

export const MAX_DIAGNOSTIC_EVENTS =
    Number(runtimeConfig.maxDiagnosticEvents) || 50;

export function isDevMode() {
    if (runtimeConfig.devMode !== undefined) {
        return Boolean(runtimeConfig.devMode);
    }

    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('dev') === 'true';
}
