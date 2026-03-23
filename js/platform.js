import { SERVICE_WORKER_PATH, TURNSTILE_WIDGET_SELECTOR } from './env.js';

let previewObjectUrl = null;

function getTurnstileInstance() {
    return typeof turnstile !== 'undefined' ? turnstile : null;
}

export function getTurnstileToken(selector = TURNSTILE_WIDGET_SELECTOR) {
    const instance = getTurnstileInstance();
    return instance ? instance.getResponse(selector) : null;
}

export function resetTurnstile(selector = TURNSTILE_WIDGET_SELECTOR) {
    const instance = getTurnstileInstance();
    if (!instance) return;
    instance.reset(selector);
}

export function executeTurnstile(selector = TURNSTILE_WIDGET_SELECTOR) {
    const instance = getTurnstileInstance();
    if (!instance) return;
    try { instance.execute(selector); } catch (e) {}
}

export function refreshTurnstile(selector = TURNSTILE_WIDGET_SELECTOR) {
    resetTurnstile(selector);
    executeTurnstile(selector);
}

export function registerTurnstileCallbacks({ onTimeout, onError } = {}) {
    window.onTurnstileTimeout = () => {
        if (typeof onTimeout === 'function') onTimeout();
    };

    window.onTurnstileError = () => {
        if (typeof onError === 'function') onError();
    };
}

export function clickFileInput(input) {
    if (input) input.click();
}

export function showPreviewImage(file, imageElement) {
    if (!file || !imageElement) return;
    if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
    }
    previewObjectUrl = URL.createObjectURL(file);
    imageElement.src = previewObjectUrl;
    imageElement.style.display = 'block';
}

export function clearPreviewImage(imageElement) {
    if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
        previewObjectUrl = null;
    }
    if (imageElement) {
        imageElement.removeAttribute('src');
        imageElement.style.display = 'none';
    }
}

export async function registerAppServiceWorker(scriptPath = SERVICE_WORKER_PATH) {
    if (!('serviceWorker' in navigator)) return null;
    return navigator.serviceWorker.register(scriptPath);
}

export function reloadApp() {
    location.reload();
}
