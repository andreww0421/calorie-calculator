import {
    appendAnalyticsEvent,
    clearAnalyticsRepository,
    loadAnalyticsEvents,
    loadAnalyticsMeta,
    saveAnalyticsMeta
} from '../repositories/analytics-repository.js';
import { isKnownProductAnalyticsEvent } from './event-taxonomy.js';

const analyticsProviders = new Set();

function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function normalizePrimitive(value) {
    if (value === null) return null;
    if (['string', 'number', 'boolean'].includes(typeof value)) {
        return value;
    }
    return undefined;
}

function sanitizePayload(value, depth = 0) {
    const primitive = normalizePrimitive(value);
    if (primitive !== undefined) return primitive;
    if (depth >= 2) return undefined;

    if (Array.isArray(value)) {
        return value
            .map((entry) => sanitizePayload(entry, depth + 1))
            .filter((entry) => entry !== undefined);
    }

    if (!isPlainObject(value)) return undefined;

    return Object.fromEntries(
        Object.entries(value)
            .map(([key, entry]) => [key, sanitizePayload(entry, depth + 1)])
            .filter(([, entry]) => entry !== undefined)
    );
}

function deliverToProviders(record) {
    analyticsProviders.forEach((provider) => {
        try {
            if (typeof provider === 'function') {
                provider(record);
                return;
            }
            if (provider && typeof provider.track === 'function') {
                provider.track(record);
            }
        } catch {
            // Analytics hooks must stay non-blocking even if a future provider fails.
        }
    });
}

export function registerAnalyticsProvider(provider) {
    if (!provider || (typeof provider !== 'function' && typeof provider.track !== 'function')) {
        return () => {};
    }

    analyticsProviders.add(provider);
    return () => {
        analyticsProviders.delete(provider);
    };
}

export function resetAnalyticsProviders() {
    analyticsProviders.clear();
}

export function trackProductEvent(name, payload = {}, options = {}) {
    if (!isKnownProductAnalyticsEvent(name)) return null;

    const onceKey = options.onceKey ? `${name}:${String(options.onceKey)}` : '';
    if (onceKey) {
        const meta = loadAnalyticsMeta();
        if (meta.once[onceKey]) {
            return null;
        }
        meta.once[onceKey] = new Date().toISOString();
        saveAnalyticsMeta(meta);
    }

    const record = appendAnalyticsEvent({
        name,
        timestamp: new Date().toISOString(),
        payload: sanitizePayload(payload) || {}
    });

    if (record) {
        deliverToProviders(record);
    }

    return record;
}

export function trackProductEventOnce(name, payload = {}, onceKey = 'global') {
    return trackProductEvent(name, payload, { onceKey });
}

export function getTrackedProductEvents() {
    return loadAnalyticsEvents();
}

export function clearTrackedProductEvents() {
    clearAnalyticsRepository();
}
