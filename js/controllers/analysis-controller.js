import { toBase64 } from '../utils.js';
import { dispatchAppAction } from '../state/app-actions.js';
import { getAppState } from '../state/app-state.js';
import { callCloudflareAI, callCloudflareAIText } from '../api.js';
import { normalizeAIAnalysisResult } from '../domain/ai-analysis-domain.js';
import { cloneNutrition } from '../domain/nutrition-schema.js';
import { DAILY_LIMIT, isDevMode } from '../env.js';
import {
    clearPreviewImage,
    getTurnstileStatus,
    initializeTurnstileWidget,
    markTurnstileUnavailable,
    refreshTurnstile,
    registerTurnstileCallbacks,
    showPreviewImage
} from '../platform.js';
import { buildAIErrorFeedback } from '../analysis-errors.js';
import { closeModal, showToast } from '../ui.js';
import { getTranslations, reportControllerError } from './controller-shared.js';
import { loadDailyUsage, saveDailyUsage } from '../repositories/usage-repository.js';
import { trackAiAnalysisFailed, trackAiAnalysisStarted } from '../analytics/product-events.js';

const isDev = isDevMode();
let cooldownTimer = null;
let pendingAnalysisRequest = null;
let isResumingPendingAnalysis = false;

function setAnalysisFlow(flow, reason = 'analysis:state') {
    dispatchAppAction('SET_ANALYSIS_FLOW', { flow, reason });
}

function readAnalysisInputs() {
    const input = document.getElementById('image-upload');
    const file = input?.files?.[0] || null;
    const textOnlyInput = document.getElementById('ai-text-desc');
    const imageDescInput = document.getElementById('ai-desc');

    return {
        file,
        textDesc: textOnlyInput ? textOnlyInput.value.trim() : '',
        imageDesc: imageDescInput ? imageDescInput.value.trim() : ''
    };
}

function createAnalysisRequestSnapshot({ file = null, textDesc = '', imageDesc = '' } = {}) {
    return {
        file: file || null,
        textDesc: String(textDesc || ''),
        imageDesc: String(imageDesc || ''),
        source: file ? 'image' : (textDesc || imageDesc ? 'text' : 'none')
    };
}

function matchesAnalysisRequestInputs(request, { file = null, textDesc = '', imageDesc = '' } = {}) {
    if (!request) return false;
    return request.file === (file || null)
        && request.textDesc === String(textDesc || '')
        && request.imageDesc === String(imageDesc || '');
}

function clearPendingAnalysisRequest() {
    pendingAnalysisRequest = null;
}

function storePendingAnalysisRequest(request) {
    pendingAnalysisRequest = request
        ? {
            file: request.file || null,
            textDesc: String(request.textDesc || ''),
            imageDesc: String(request.imageDesc || ''),
            source: String(request.source || 'none')
        }
        : null;
}

function discardPendingAnalysisRequestIfStale(inputs = readAnalysisInputs()) {
    if (!pendingAnalysisRequest) return false;
    if (matchesAnalysisRequestInputs(pendingAnalysisRequest, inputs)) return false;
    clearPendingAnalysisRequest();
    return true;
}

function clearAnalysisSoftError(inputs = readAnalysisInputs(), reason = 'analysis:ready') {
    const hasContent = Boolean(inputs.file || inputs.textDesc || inputs.imageDesc);
    setAnalysisFlow({
        status: hasContent ? 'ready' : 'idle',
        source: inputs.file ? 'image' : (inputs.textDesc || inputs.imageDesc ? 'text' : 'none'),
        isSoftError: false,
        lastError: ''
    }, reason);
}

function resetAnalysisInputs() {
    const imageUpload = document.getElementById('image-upload');
    const imageDesc = document.getElementById('ai-desc');
    const preview = document.getElementById('image-preview');
    const textGroup = document.getElementById('ai-text-only-group');
    const descGroup = document.getElementById('ai-desc-group');
    const textInput = document.getElementById('ai-text-desc');

    if (imageUpload) imageUpload.value = '';
    if (imageDesc) imageDesc.value = '';
    if (textInput) textInput.value = '';
    if (descGroup) descGroup.style.display = 'none';
    if (textGroup) textGroup.style.display = 'block';
    clearPreviewImage(preview);
}

function getUsageState() {
    return loadDailyUsage();
}

function incrementUsageCount() {
    if (isDev) return;
    const usage = getUsageState();
    saveDailyUsage({ ...usage, count: usage.count + 1 });
}

function clearCooldownTimer() {
    if (!cooldownTimer) return;
    clearInterval(cooldownTimer);
    cooldownTimer = null;
}

function startCooldown(seconds = 15) {
    clearCooldownTimer();
    setAnalysisFlow({
        status: 'cooldown',
        cooldownRemaining: seconds,
        isSoftError: false,
        lastError: ''
    }, 'analysis:cooldown');

    cooldownTimer = setInterval(() => {
        const remaining = (getAppState().analysisFlow?.cooldownRemaining || 0) - 1;
        if (remaining > 0) {
            setAnalysisFlow({
                status: 'cooldown',
                cooldownRemaining: remaining
            }, 'analysis:cooldown');
            return;
        }

        clearCooldownTimer();
        setAnalysisFlow({
            status: 'idle',
            cooldownRemaining: 0,
            isSoftError: false,
            lastError: ''
        }, 'analysis:ready');
        applyUsageLimitState();
    }, 1000);
}

function getTurnstileUnavailableMessage(errorCode = '') {
    const t = getTranslations();
    const normalizedCode = String(errorCode || '').toUpperCase();

    if (normalizedCode === '110200' || normalizedCode === 'TURNSTILE_UNSUPPORTED_DOMAIN') {
        return t.turnstileUnavailable
            || 'Security verification is unavailable on this domain. Use the production site or add this hostname to Turnstile.';
    }

    return t.turnstileSetupError
        || 'Security verification could not be initialized. Reload the page and try again.';
}

function syncTurnstileAvailability(errorCode = '') {
    const status = getTurnstileStatus();
    const unavailableReason = errorCode || status.unavailableReason || status.lastErrorCode;

    if (!status.supportedHost || unavailableReason) {
        setAnalysisFlow({
            verificationUnavailable: true,
            verificationMessage: getTurnstileUnavailableMessage(unavailableReason)
        }, 'analysis:turnstile-unavailable');
        return;
    }

    setAnalysisFlow({
        verificationUnavailable: false,
        verificationMessage: ''
    }, 'analysis:turnstile-ready');
}

function runAnalysisRequest(request) {
    if (request.file) {
        const finalDesc = request.imageDesc + (request.textDesc ? ` ${request.textDesc}` : '');
        return toBase64(request.file)
            .then((base64) => callCloudflareAI(base64, finalDesc, request.file.type || 'image/jpeg'));
    }

    return callCloudflareAIText(request.textDesc);
}

function shouldTrackAnalysisFailure(error) {
    return String(error?.message || '') !== 'Turnstile_Pending';
}

async function executeAnalysisRequest(request, translations) {
    let isSoftError = false;
    let keepPendingRequest = false;

    try {
        const result = await runAnalysisRequest(request);
        if (result) {
            incrementUsageCount();
            dispatchAppAction('SET_TEMP_AI_RESULT', {
                result: buildAnalysisResultPayload(result),
                saved: false,
                openModal: true
            });
        }
    } catch (error) {
        const trackFailure = shouldTrackAnalysisFailure(error);
        if (!trackFailure) {
            storePendingAnalysisRequest(request);
            keepPendingRequest = true;
        } else {
            clearPendingAnalysisRequest();
            reportControllerError('Analysis Error', error);
        }

        const feedback = buildAIErrorFeedback(error, translations);
        isSoftError = feedback.isSoftError;

        if (trackFailure) {
            trackAiAnalysisFailed({
                source: request.source,
                lang: getAppState().curLang,
                error: error?.message || feedback.message,
                isSoftError: feedback.isSoftError
            });
        }

        setAnalysisFlow({
            status: feedback.isSoftError ? 'ready' : 'error',
            isSoftError: feedback.isSoftError,
            lastError: feedback.message
        }, 'analysis:error');
        showToast(feedback.message, feedback.type);
    } finally {
        if (isSoftError) {
            if (!keepPendingRequest) {
                clearPendingAnalysisRequest();
            }
            applyUsageLimitState();
            return;
        }

        clearPendingAnalysisRequest();
        resetAnalysisInputs();
        startCooldown();
    }
}

async function resumePendingAnalysisRequestIfReady() {
    if (isResumingPendingAnalysis || !pendingAnalysisRequest) return false;

    const currentInputs = readAnalysisInputs();
    if (!matchesAnalysisRequestInputs(pendingAnalysisRequest, currentInputs)) {
        clearPendingAnalysisRequest();
        clearAnalysisSoftError(currentInputs, 'analysis:resume-discarded');
        return false;
    }

    const request = pendingAnalysisRequest;
    clearPendingAnalysisRequest();
    isResumingPendingAnalysis = true;

    try {
        setAnalysisFlow({
            status: 'analyzing',
            source: request.source,
            cooldownRemaining: 0,
            isSoftError: false,
            lastError: ''
        }, 'analysis:resume');
        await executeAnalysisRequest(request, getTranslations());
        return true;
    } finally {
        isResumingPendingAnalysis = false;
    }
}

export function setupTurnstileHandlers() {
    registerTurnstileCallbacks({
        onSuccess: () => {
            syncTurnstileAvailability();
            void resumePendingAnalysisRequestIfReady();
        },
        onTimeout: () => {
            console.warn('Turnstile token expired. Refreshing widget.');
            refreshTurnstile();
        },
        onError: (errorCode) => {
            console.error(`Turnstile failed to initialize (${errorCode || 'unknown'}).`);
            clearPendingAnalysisRequest();
            markTurnstileUnavailable(errorCode || 'TURNSTILE_UNAVAILABLE');
            syncTurnstileAvailability(errorCode);
        }
    });

    initializeTurnstileWidget()
        .then(() => syncTurnstileAvailability())
        .catch((error) => {
            console.error('Turnstile bootstrap failed.', error);
            markTurnstileUnavailable(error?.message || 'TURNSTILE_UNAVAILABLE');
            syncTurnstileAvailability(error?.message);
        });
}

export function tryCloseAnalysisModal() {
    const t = getTranslations();
    const state = getAppState();
    if (state.tempAIResult && !state.tempAIResultSaved) {
        if (!confirm(t.unsavedWarning || 'Your AI analysis is not saved yet. Close anyway?')) {
            return;
        }
    }

    dispatchAppAction('CLEAR_TEMP_AI_RESULT');
    closeModal('analysis-modal');
}

export function syncAnalysisInputState() {
    const state = getAppState();
    const inputs = readAnalysisInputs();
    const { file, textDesc, imageDesc } = inputs;
    const hasContent = Boolean(file || textDesc || imageDesc);
    const source = file ? 'image' : (textDesc || imageDesc ? 'text' : 'none');
    const clearedPendingRequest = discardPendingAnalysisRequestIfStale(inputs);

    if (['analyzing', 'recalculating', 'cooldown'].includes(state.analysisFlow?.status)) {
        return;
    }

    setAnalysisFlow({
        status: hasContent ? 'ready' : 'idle',
        source,
        lastError: hasContent && !clearedPendingRequest ? state.analysisFlow?.lastError || '' : '',
        isSoftError: false
    }, 'analysis:input');
}

export function handleFileSelect(input) {
    const file = input?.files?.[0];
    if (!file) {
        syncAnalysisInputState();
        return;
    }

    const preview = document.getElementById('image-preview');
    showPreviewImage(file, preview);

    const textOnlyGroup = document.getElementById('ai-text-only-group');
    const descGroup = document.getElementById('ai-desc-group');
    const textDescEl = document.getElementById('ai-text-desc');
    const imgDescEl = document.getElementById('ai-desc');

    if (textDescEl && imgDescEl && textDescEl.value.trim() && !imgDescEl.value.trim()) {
        imgDescEl.value = textDescEl.value;
    }
    if (textDescEl) textDescEl.value = '';
    if (textOnlyGroup) textOnlyGroup.style.display = 'none';
    if (descGroup) descGroup.style.display = 'block';
    clearPendingAnalysisRequest();

    setAnalysisFlow({
        status: 'ready',
        source: 'image',
        lastError: '',
        isSoftError: false
    }, 'analysis:file-selected');
}

export function applyUsageLimitState(showLimitToast = false) {
    const t = getTranslations();
    if (isDev) {
        setAnalysisFlow({ quotaExceeded: false }, 'analysis:quota');
        return true;
    }

    const usage = getUsageState();
    const isExhausted = usage.count >= DAILY_LIMIT;

    setAnalysisFlow({ quotaExceeded: isExhausted }, 'analysis:quota');

    if (showLimitToast && isExhausted) {
        showToast(
            t.aiQuotaExceededToast || `Today's AI limit (${DAILY_LIMIT}) has been used up.`,
            'error'
        );
    }

    return !isExhausted;
}

function buildAnalysisResultPayload(result) {
    const normalized = normalizeAIAnalysisResult(result);
    return {
        name: normalized.foodName,
        nutri: cloneNutrition(normalized),
        items: normalized.items,
        healthScore: normalized.healthScore
    };
}

export function startAnalysis() {
    const state = getAppState();
    if (['analyzing', 'recalculating', 'cooldown'].includes(state.analysisFlow?.status)) return;

    const inputs = readAnalysisInputs();
    const request = createAnalysisRequestSnapshot(inputs);
    const t = getTranslations();

    if (!request.file && !request.textDesc) {
        showToast(t.alertSelImgOrText || 'Please select an image or enter a description.', 'error');
        return;
    }
    if (!applyUsageLimitState(true)) return;
    clearPendingAnalysisRequest();

    setAnalysisFlow({
        status: 'analyzing',
        source: request.source,
        cooldownRemaining: 0,
        isSoftError: false,
        lastError: ''
    }, 'analysis:start');
    trackAiAnalysisStarted({
        source: request.source,
        lang: state.curLang,
        hasImage: Boolean(request.file),
        hasText: Boolean(request.textDesc)
    });
    void executeAnalysisRequest(request, t);
}
