import {
    SERVICE_WORKER_PATH,
    TURNSTILE_ALLOWED_HOSTNAMES,
    TURNSTILE_SITE_KEY,
    TURNSTILE_WIDGET_SELECTOR
} from './env.js';

let previewObjectUrl = null;
let turnstileScriptPromise = null;
let turnstileInitPromise = null;

const turnstileState = {
    widgetId: null,
    initialized: false,
    unavailableReason: '',
    lastErrorCode: '',
    isExecuting: false,
    lastToken: ''
};

function getTurnstileInstance() {
    return typeof turnstile !== 'undefined' ? turnstile : null;
}

function waitForDomReady() {
    if (typeof document === 'undefined' || document.readyState !== 'loading') {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
    });
}

function getTurnstileContainer(selector = TURNSTILE_WIDGET_SELECTOR) {
    if (typeof document === 'undefined') return null;
    return document.querySelector(selector);
}

function getTurnstileHandle(selector = TURNSTILE_WIDGET_SELECTOR) {
    return turnstileState.widgetId ?? selector;
}

function isAllowedTurnstileHostname() {
    if (typeof window === 'undefined') return true;
    return TURNSTILE_ALLOWED_HOSTNAMES.includes(window.location.hostname.toLowerCase());
}

function setTurnstileContainerVisibility(isVisible, selector = TURNSTILE_WIDGET_SELECTOR) {
    const container = getTurnstileContainer(selector);
    if (!container) return;
    container.style.display = isVisible ? '' : 'none';
}

function clearTurnstileUnavailableState() {
    turnstileState.unavailableReason = '';
    turnstileState.lastErrorCode = '';
}

function loadTurnstileScript() {
    const instance = getTurnstileInstance();
    if (instance) return Promise.resolve(instance);
    if (turnstileScriptPromise) return turnstileScriptPromise;

    turnstileScriptPromise = new Promise((resolve, reject) => {
        if (typeof document === 'undefined') {
            resolve(null);
            return;
        }

        const existingScript = document.querySelector('script[data-turnstile-loader="true"]');
        if (existingScript) {
            existingScript.addEventListener('load', () => resolve(getTurnstileInstance()), { once: true });
            existingScript.addEventListener('error', () => reject(new Error('TURNSTILE_SCRIPT_LOAD_FAILED')), { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.dataset.turnstileLoader = 'true';
        script.onload = () => resolve(getTurnstileInstance());
        script.onerror = () => reject(new Error('TURNSTILE_SCRIPT_LOAD_FAILED'));
        document.head.appendChild(script);
    });

    return turnstileScriptPromise;
}

export function markTurnstileUnavailable(reason = 'TURNSTILE_UNAVAILABLE') {
    turnstileState.unavailableReason = String(reason || 'TURNSTILE_UNAVAILABLE');
    turnstileState.lastErrorCode = String(reason || 'TURNSTILE_UNAVAILABLE');
    turnstileState.initialized = false;
    turnstileState.isExecuting = false;
    turnstileState.lastToken = '';
    setTurnstileContainerVisibility(false);
}

export function getTurnstileStatus() {
    return {
        widgetId: turnstileState.widgetId,
        initialized: turnstileState.initialized,
        unavailableReason: turnstileState.unavailableReason,
        lastErrorCode: turnstileState.lastErrorCode,
        isExecuting: turnstileState.isExecuting,
        hasToken: Boolean(turnstileState.lastToken),
        supportedHost: isAllowedTurnstileHostname(),
        available: isAllowedTurnstileHostname()
            && Boolean(getTurnstileInstance())
            && !turnstileState.unavailableReason
    };
}

export async function initializeTurnstileWidget(selector = TURNSTILE_WIDGET_SELECTOR) {
    if (!turnstileInitPromise) {
        turnstileInitPromise = (async () => {
            await waitForDomReady();

            const container = getTurnstileContainer(selector);
            if (!container) {
                markTurnstileUnavailable('TURNSTILE_CONTAINER_MISSING');
                return getTurnstileStatus();
            }

            if (!isAllowedTurnstileHostname()) {
                markTurnstileUnavailable('TURNSTILE_UNSUPPORTED_DOMAIN');
                return getTurnstileStatus();
            }

            const instance = await loadTurnstileScript();
            if (!instance) {
                markTurnstileUnavailable('TURNSTILE_SCRIPT_LOAD_FAILED');
                return getTurnstileStatus();
            }

            clearTurnstileUnavailableState();
            setTurnstileContainerVisibility(true, selector);

            if (turnstileState.widgetId === null) {
                turnstileState.widgetId = instance.render(selector, {
                    sitekey: TURNSTILE_SITE_KEY,
                    size: 'invisible',
                    execution: 'execute',
                    retry: 'never',
                    callback: (token) => {
                        turnstileState.isExecuting = false;
                        turnstileState.lastToken = String(token || '');
                    },
                    'expired-callback': () => {
                        turnstileState.isExecuting = false;
                        turnstileState.lastToken = '';
                    },
                    'timeout-callback': () => window.onTurnstileTimeout?.(),
                    'error-callback': (errorCode) => window.onTurnstileError?.(errorCode)
                });
            }

            turnstileState.initialized = true;
            return getTurnstileStatus();
        })().catch((error) => {
            markTurnstileUnavailable(error?.message || 'TURNSTILE_SCRIPT_LOAD_FAILED');
            return getTurnstileStatus();
        });
    }

    return turnstileInitPromise;
}

export function getTurnstileToken(selector = TURNSTILE_WIDGET_SELECTOR) {
    const instance = getTurnstileInstance();
    if (!instance) return null;
    try {
        const token = instance.getResponse(getTurnstileHandle(selector)) || null;
        turnstileState.lastToken = token || '';
        return token;
    } catch {
        return null;
    }
}

export function resetTurnstile(selector = TURNSTILE_WIDGET_SELECTOR) {
    const instance = getTurnstileInstance();
    if (!instance || turnstileState.unavailableReason) return;
    turnstileState.isExecuting = false;
    turnstileState.lastToken = '';
    try {
        instance.reset(getTurnstileHandle(selector));
    } catch {}
}

export function executeTurnstile(selector = TURNSTILE_WIDGET_SELECTOR) {
    const instance = getTurnstileInstance();
    if (!instance || turnstileState.unavailableReason || turnstileState.isExecuting) return false;
    turnstileState.isExecuting = true;
    try {
        instance.execute(getTurnstileHandle(selector));
        return true;
    } catch {
        turnstileState.isExecuting = false;
        return false;
    }
}

export function refreshTurnstile(selector = TURNSTILE_WIDGET_SELECTOR) {
    if (turnstileState.unavailableReason) return;
    resetTurnstile(selector);
    executeTurnstile(selector);
}

export function registerTurnstileCallbacks({ onTimeout, onError } = {}) {
    window.onTurnstileTimeout = () => {
        turnstileState.isExecuting = false;
        turnstileState.lastToken = '';
        if (typeof onTimeout === 'function') onTimeout();
        return true;
    };

    window.onTurnstileError = (errorCode) => {
        turnstileState.isExecuting = false;
        turnstileState.lastToken = '';
        turnstileState.lastErrorCode = String(errorCode || '');
        if (typeof onError === 'function') onError(errorCode);
        return true;
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
