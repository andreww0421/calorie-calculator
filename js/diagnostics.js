import { MAX_DIAGNOSTIC_EVENTS } from './env.js';
import {
    clearDiagnosticEntries,
    loadDiagnosticEntries,
    saveDiagnosticEntries
} from './repositories/diagnostics-repository.js';

let diagnosticsRegistered = false;

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
        const entries = loadDiagnosticEntries();
        entries.push({
            timestamp: new Date().toISOString(),
            level: level || 'info',
            message: normalizeMessage(message),
            context: context && typeof context === 'object' ? context : {}
        });
        saveDiagnosticEntries(entries.slice(-MAX_DIAGNOSTIC_EVENTS));
    } catch (error) {
        console.warn('Failed to persist diagnostic entry.', error);
    }
}

export function getDiagnostics() {
    return loadDiagnosticEntries();
}

export function clearDiagnostics() {
    clearDiagnosticEntries();
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
