import { loadSetting, saveSetting } from '../storage.js';
import { safeParseJSON } from '../utils.js';
import { isKnownProductAnalyticsEvent } from '../analytics/event-taxonomy.js';

const ANALYTICS_EVENTS_KEY = 'analytics_events_v1';
const ANALYTICS_META_KEY = 'analytics_meta_v1';
const MAX_ANALYTICS_EVENTS = 200;

function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function normalizePayload(payload) {
    return isPlainObject(payload) ? payload : {};
}

function normalizeEventRecord(record) {
    if (!isPlainObject(record) || !isKnownProductAnalyticsEvent(record.name)) {
        return null;
    }

    return {
        name: record.name,
        timestamp: String(record.timestamp || new Date().toISOString()),
        payload: normalizePayload(record.payload)
    };
}

function normalizeAnalyticsMeta(meta) {
    const once = isPlainObject(meta?.once) ? meta.once : {};
    return {
        once: Object.fromEntries(
            Object.entries(once).map(([key, value]) => [String(key), String(value || '')])
        )
    };
}

export function loadAnalyticsEvents() {
    const parsed = safeParseJSON(loadSetting(ANALYTICS_EVENTS_KEY, '[]'), []);
    const normalized = Array.isArray(parsed)
        ? parsed.map(normalizeEventRecord).filter(Boolean)
        : [];
    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
        saveAnalyticsEvents(normalized);
    }
    return normalized;
}

export function saveAnalyticsEvents(events = []) {
    const normalized = Array.isArray(events)
        ? events.map(normalizeEventRecord).filter(Boolean).slice(-MAX_ANALYTICS_EVENTS)
        : [];
    saveSetting(ANALYTICS_EVENTS_KEY, JSON.stringify(normalized));
    return normalized;
}

export function appendAnalyticsEvent(event) {
    const normalized = normalizeEventRecord(event);
    if (!normalized) return null;
    const nextEvents = [...loadAnalyticsEvents(), normalized].slice(-MAX_ANALYTICS_EVENTS);
    saveAnalyticsEvents(nextEvents);
    return normalized;
}

export function loadAnalyticsMeta() {
    const parsed = safeParseJSON(loadSetting(ANALYTICS_META_KEY, '{}'), {});
    const normalized = normalizeAnalyticsMeta(parsed);
    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
        saveAnalyticsMeta(normalized);
    }
    return normalized;
}

export function saveAnalyticsMeta(meta = {}) {
    const normalized = normalizeAnalyticsMeta(meta);
    saveSetting(ANALYTICS_META_KEY, JSON.stringify(normalized));
    return normalized;
}

export function clearAnalyticsRepository() {
    saveAnalyticsEvents([]);
    saveAnalyticsMeta({ once: {} });
}
