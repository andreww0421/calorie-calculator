import { DIAGNOSTICS_KEY, MAX_DIAGNOSTIC_EVENTS } from './env.js';
import { safeParseJSON } from './utils.js';

let diagnosticsRegistered = false;

function readDiagnosticsStore() {
    const parsed = safeParseJSON(localStorage.getItem(DIAGNOSTICS_KEY), []);
    return Array.isArray(parsed) ? parsed : [];
}

function writeDiagnosticsStore(entries) {
    localStorage.setItem(
        DIAGNOSTICS_KEY,
        JSON.stringify(entries.slice(-MAX_DIAGNOSTIC_EVENTS))
    );
}

function normalizeMessage(value) {
    if (typeof value === 'string') return value;
    if (value instanceof Error) return value.stack || value.message || String(value);
    try {
        return JSON.stringify(value);
    } catch (error) {
        return String(value);
    }
}

export function captureDiagnostic(level, message, context = {}) {
    try {
        const entries = readDiagnosticsStore();
        entries.push({
            timestamp: new Date().toISOString(),
            level: level || 'info',
            message: normalizeMessage(message),
            context: context && typeof context === 'object' ? context : {}
        });
        writeDiagnosticsStore(entries);
    } catch (error) {
        console.warn('Failed to persist diagnostic entry.', error);
    }
}

export function getDiagnostics() {
    return readDiagnosticsStore();
}

export function clearDiagnostics() {
    localStorage.removeItem(DIAGNOSTICS_KEY);
}

export function registerGlobalDiagnostics() {
    if (diagnosticsRegistered || typeof window === 'undefined') return;
    diagnosticsRegistered = true;

    window.addEventListener('error', (event) => {
        captureDiagnostic('error', event.message || 'Unhandled window error', {
            source: event.filename || '',
            line: event.lineno || 0,
            column: event.colno || 0
        });
    });

    window.addEventListener('unhandledrejection', (event) => {
        captureDiagnostic('error', event.reason || 'Unhandled promise rejection');
    });
}
