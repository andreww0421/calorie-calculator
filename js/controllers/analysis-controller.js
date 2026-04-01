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

export function setupTurnstileHandlers() {
    registerTurnstileCallbacks({
        onTimeout: () => {
            console.warn('Turnstile token expired. Refreshing widget.');
            refreshTurnstile();
        },
        onError: (errorCode) => {
            console.error(`Turnstile failed to initialize (${errorCode || 'unknown'}).`);
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
    const { file, textDesc, imageDesc } = readAnalysisInputs();
    const hasContent = Boolean(file || textDesc || imageDesc);
    const source = file ? 'image' : (textDesc || imageDesc ? 'text' : 'none');

    if (['analyzing', 'recalculating', 'cooldown'].includes(state.analysisFlow?.status)) {
        return;
    }

    setAnalysisFlow({
        status: hasContent ? 'ready' : 'idle',
        source,
        lastError: hasContent ? state.analysisFlow?.lastError || '' : '',
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

    const { file, textDesc, imageDesc } = readAnalysisInputs();
    const t = getTranslations();

    if (!file && !textDesc) {
        showToast(t.alertSelImgOrText || 'Please select an image or enter a description.', 'error');
        return;
    }
    if (!applyUsageLimitState(true)) return;

    setAnalysisFlow({
        status: 'analyzing',
        source: file ? 'image' : 'text',
        cooldownRemaining: 0,
        isSoftError: false,
        lastError: ''
    }, 'analysis:start');
    trackAiAnalysisStarted({
        source: file ? 'image' : 'text',
        lang: state.curLang,
        hasImage: Boolean(file),
        hasText: Boolean(textDesc)
    });

    let isSoftError = false;
    const handleResult = (result) => {
        if (!result) return;
        incrementUsageCount();
        dispatchAppAction('SET_TEMP_AI_RESULT', {
            result: buildAnalysisResultPayload(result),
            saved: false,
            openModal: true
        });
    };

    const handleError = (error) => {
        reportControllerError('Analysis Error', error);
        const feedback = buildAIErrorFeedback(error, t);
        isSoftError = feedback.isSoftError;
        trackAiAnalysisFailed({
            source: file ? 'image' : 'text',
            lang: state.curLang,
            error: error?.message || feedback.message,
            isSoftError: feedback.isSoftError
        });
        setAnalysisFlow({
            status: feedback.isSoftError ? 'ready' : 'error',
            isSoftError: feedback.isSoftError,
            lastError: feedback.message
        }, 'analysis:error');
        showToast(feedback.message, feedback.type);
    };

    const handleFinally = () => {
        if (isSoftError) {
            applyUsageLimitState();
            return;
        }

        resetAnalysisInputs();
        startCooldown();
    };

    if (file) {
        const finalDesc = imageDesc + (textDesc ? ` ${textDesc}` : '');
        toBase64(file)
            .then((base64) => callCloudflareAI(base64, finalDesc, file.type || 'image/jpeg'))
            .then(handleResult)
            .catch(handleError)
            .finally(handleFinally);
    } else {
        callCloudflareAIText(textDesc)
            .then(handleResult)
            .catch(handleError)
            .finally(handleFinally);
    }
}
