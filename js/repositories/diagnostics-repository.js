import { DIAGNOSTICS_KEY, MAX_DIAGNOSTIC_EVENTS } from '../env.js';
import { loadSetting, removeSetting, saveSetting } from '../storage.js';
import { safeParseJSON } from '../utils.js';

function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function normalizeDiagnosticEntry(entry) {
    if (!isPlainObject(entry)) return null;

    return {
        timestamp: String(entry.timestamp || new Date().toISOString()),
        level: String(entry.level || 'info'),
        message: String(entry.message || ''),
        context: isPlainObject(entry.context) ? entry.context : {}
    };
}

export function loadDiagnosticEntries() {
    const parsed = safeParseJSON(loadSetting(DIAGNOSTICS_KEY, '[]'), []);
    const normalized = Array.isArray(parsed)
        ? parsed.map(normalizeDiagnosticEntry).filter(Boolean)
        : [];
    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
        saveDiagnosticEntries(normalized);
    }
    return normalized;
}

export function saveDiagnosticEntries(entries = []) {
    const normalized = Array.isArray(entries)
        ? entries.map(normalizeDiagnosticEntry).filter(Boolean).slice(-MAX_DIAGNOSTIC_EVENTS)
        : [];
    saveSetting(DIAGNOSTICS_KEY, JSON.stringify(normalized));
    return normalized;
}

export function clearDiagnosticEntries() {
    removeSetting(DIAGNOSTICS_KEY);
}
