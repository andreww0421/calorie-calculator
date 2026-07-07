import {
    SERVICE_WORKER_PATH,
    TURNSTILE_ALLOWED_HOSTNAMES,
    TURNSTILE_SITE_KEY,
    TURNSTILE_WIDGET_SELECTOR
} from './env.js';

let previewObjectUrl = null;
let turnstileScriptPromise = null;
let turnstileInitPromise = null;
let turnstileTokenRequest = null;

const TURNSTILE_TOKEN_TIMEOUT_MS = 20000;

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

function settleTurnstileTokenRequest(method, value) {
    const request = turnstileTokenRequest;
    if (!request) return;

    turnstileTokenRequest = null;
    clearTimeout(request.timeoutId);
    request[method](value);
}

function rejectTurnstileTokenRequest(reason = 'TURNSTILE_UNAVAILABLE') {
    settleTurnstileTokenRequest('reject', new Error(String(reason || 'TURNSTILE_UNAVAILABLE')));
}

export function isRetryableTurnstileError(errorCode = '') {
    const code = String(errorCode || '');
    return code === '110600'
        || code === '110620'
        || code === '200500'
        || code.startsWith('300')
        || code.startsWith('600');
}

function loadTurnstileScript() {
    const instance = getTurnstileInstance();
    if (instance) return Promise.resolve(instance);
    if (turnstileScriptPromise) return turnstileScriptPromise;

    const loadPromise = new Promise((resolve, reject) => {
        if (typeof document === 'undefined') {
            resolve(null);
            return;
        }

        const existingScript = document.querySelector('script[data-turnstile-loader="true"]');
        if (existingScript) {
            existingScript.addEventListener('load', () => {
                const loadedInstance = getTurnstileInstance();
                if (loadedInstance) {
                    resolve(loadedInstance);
                    return;
                }
                reject(new Error('TURNSTILE_SCRIPT_LOAD_FAILED'));
            }, { once: true });
            existingScript.addEventListener('error', () => {
                existingScript.remove();
                reject(new Error('TURNSTILE_SCRIPT_LOAD_FAILED'));
            }, { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.dataset.turnstileLoader = 'true';
        script.onload = () => {
            const loadedInstance = getTurnstileInstance();
            if (loadedInstance) {
                resolve(loadedInstance);
                return;
            }
            script.remove();
            reject(new Error('TURNSTILE_SCRIPT_LOAD_FAILED'));
        };
        script.onerror = () => {
            script.remove();
            reject(new Error('TURNSTILE_SCRIPT_LOAD_FAILED'));
        };
        document.head.appendChild(script);
    });

    turnstileScriptPromise = loadPromise.catch((error) => {
        turnstileScriptPromise = null;
        throw error;
    });

    return turnstileScriptPromise;
}

export function markTurnstileUnavailable(reason = 'TURNSTILE_UNAVAILABLE') {
    const instance = getTurnstileInstance();
    if (instance && turnstileState.widgetId !== null) {
        try {
            instance.remove(turnstileState.widgetId);
        } catch {}
    }

    turnstileInitPromise = null;
    turnstileState.widgetId = null;
    turnstileState.unavailableReason = String(reason || 'TURNSTILE_UNAVAILABLE');
    turnstileState.lastErrorCode = String(reason || 'TURNSTILE_UNAVAILABLE');
    turnstileState.initialized = false;
    turnstileState.isExecuting = false;
    turnstileState.lastToken = '';
    rejectTurnstileTokenRequest(turnstileState.unavailableReason);
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
    if (!isAllowedTurnstileHostname()) {
        markTurnstileUnavailable('TURNSTILE_UNSUPPORTED_DOMAIN');
        return getTurnstileStatus();
    }

    if (!turnstileInitPromise) {
        turnstileInitPromise = (async () => {
            await waitForDomReady();

            const container = getTurnstileContainer(selector);
            if (!container) {
                markTurnstileUnavailable('TURNSTILE_CONTAINER_MISSING');
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
                    retry: 'auto',
                    'retry-interval': 3000,
                    'refresh-expired': 'auto',
                    'refresh-timeout': 'auto',
                    callback: (token) => {
                        turnstileState.isExecuting = false;
                        turnstileState.lastToken = String(token || '');
                        turnstileState.lastErrorCode = '';
                        settleTurnstileTokenRequest('resolve', turnstileState.lastToken);
                        window.onTurnstileSuccess?.(turnstileState.lastToken);
                    },
                    'expired-callback': () => {
                        turnstileState.isExecuting = false;
                        turnstileState.lastToken = '';
                    },
                    'timeout-callback': () => window.onTurnstileTimeout?.(),
                    'error-callback': (errorCode) => {
                        turnstileState.isExecuting = false;
                        turnstileState.lastToken = '';
                        turnstileState.lastErrorCode = String(errorCode || '');

                        const retryable = isRetryableTurnstileError(errorCode);
                        if (!retryable) {
                            rejectTurnstileTokenRequest(errorCode || 'TURNSTILE_UNAVAILABLE');
                        }

                        const callbackResult = window.onTurnstileError?.(errorCode);
                        return typeof callbackResult === 'boolean' ? callbackResult : !retryable;
                    }
                });
            }

            turnstileState.initialized = true;
            return getTurnstileStatus();
        })().catch((error) => {
            markTurnstileUnavailable(error?.message || 'TURNSTILE_SCRIPT_LOAD_FAILED');
            return getTurnstileStatus();
        });
    }

    const currentInitPromise = turnstileInitPromise;
    const status = await currentInitPromise;
    if (!status.initialized && turnstileInitPromise === currentInitPromise) {
        turnstileInitPromise = null;
    }
    return status;
}

export function getTurnstileToken(selector = TURNSTILE_WIDGET_SELECTOR) {
    const instance = getTurnstileInstance();
    if (!instance || !turnstileState.initialized || turnstileState.widgetId === null) return null;
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
    if (!instance || !turnstileState.initialized || turnstileState.widgetId === null || turnstileState.unavailableReason) return;
    turnstileState.isExecuting = false;
    turnstileState.lastToken = '';
    try {
        instance.reset(getTurnstileHandle(selector));
    } catch {}
}

export function executeTurnstile(selector = TURNSTILE_WIDGET_SELECTOR) {
    const instance = getTurnstileInstance();
    if (
        !instance
        || !turnstileState.initialized
        || turnstileState.widgetId === null
        || turnstileState.unavailableReason
        || turnstileState.isExecuting
    ) return false;
    turnstileState.isExecuting = true;
    try {
        instance.execute(getTurnstileHandle(selector));
        return true;
    } catch {
        turnstileState.isExecuting = false;
        return false;
    }
}

export async function requestTurnstileToken(selector = TURNSTILE_WIDGET_SELECTOR, {
    timeoutMs = TURNSTILE_TOKEN_TIMEOUT_MS
} = {}) {
    const status = await initializeTurnstileWidget(selector);
    if (!status.supportedHost) {
        throw new Error('TURNSTILE_UNSUPPORTED_DOMAIN');
    }
    if (!status.initialized || status.unavailableReason) {
        const reason = status.lastErrorCode || status.unavailableReason || 'TURNSTILE_UNAVAILABLE';
        throw new Error(reason === '110200' ? 'TURNSTILE_UNSUPPORTED_DOMAIN' : 'TURNSTILE_UNAVAILABLE');
    }

    const existingToken = getTurnstileToken(selector);
    if (existingToken) return existingToken;
    if (turnstileTokenRequest) return turnstileTokenRequest.promise;

    let resolveRequest;
    let rejectRequest;
    const promise = new Promise((resolve, reject) => {
        resolveRequest = resolve;
        rejectRequest = reject;
    });

    turnstileTokenRequest = {
        promise,
        resolve: resolveRequest,
        reject: rejectRequest,
        timeoutId: setTimeout(() => {
            resetTurnstile(selector);
            rejectTurnstileTokenRequest('TURNSTILE_UNAVAILABLE');
        }, Math.max(Number(timeoutMs) || TURNSTILE_TOKEN_TIMEOUT_MS, 1000))
    };

    if (!executeTurnstile(selector)) {
        rejectTurnstileTokenRequest('TURNSTILE_UNAVAILABLE');
    }

    return promise;
}

export function refreshTurnstile(selector = TURNSTILE_WIDGET_SELECTOR) {
    if (turnstileState.unavailableReason) return;
    resetTurnstile(selector);
    executeTurnstile(selector);
}

export function registerTurnstileCallbacks({ onSuccess, onTimeout, onError } = {}) {
    window.onTurnstileSuccess = (token) => {
        turnstileState.isExecuting = false;
        turnstileState.lastToken = String(token || '');
        if (typeof onSuccess === 'function') onSuccess(turnstileState.lastToken);
        return true;
    };

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
        if (typeof onError === 'function') return onError(errorCode);
        return !isRetryableTurnstileError(errorCode);
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
    if (typeof location !== 'undefined' && ['127.0.0.1', 'localhost'].includes(location.hostname)) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));

        if (typeof caches !== 'undefined' && typeof caches.keys === 'function') {
            const keys = await caches.keys();
            await Promise.all(
                keys
                    .filter((key) => String(key || '').startsWith('woof-cal-'))
                    .map((key) => caches.delete(key))
            );
        }

        return null;
    }
    return navigator.serviceWorker.register(scriptPath);
}

export function reloadApp() {
    location.reload();
}
