import { toBase64 } from '../utils.js';
import {
    tempAIResult,
    tempAIResultSaved,
    setTempAIResult,
    setTempAIResultSaved
} from '../data.js';
import { callCloudflareAI, callCloudflareAIText } from '../api.js';
import { normalizeAIAnalysisResult } from '../domain/ai-analysis-domain.js';
import { DAILY_LIMIT, isDevMode } from '../env.js';
import {
    clearPreviewImage,
    refreshTurnstile,
    registerTurnstileCallbacks,
    showPreviewImage
} from '../platform.js';
import { buildAIErrorFeedback } from '../analysis-errors.js';
import { closeModal, showModal, showToast } from '../ui.js';
import { getTranslations, reportControllerError } from './controller-shared.js';
import { loadUsageState, saveUsageState } from '../storage.js';

let isAnalyzing = false;
const isDev = isDevMode();

function renderAnalyzeButtonLabel(button, label) {
    if (!button) return;
    button.replaceChildren(
        document.createTextNode('2. '),
        Object.assign(document.createElement('span'), {
            id: 'txt-analyze-btn',
            textContent: label
        })
    );
}

export function setupTurnstileHandlers() {
    registerTurnstileCallbacks({
        onTimeout: () => {
            console.warn('Turnstile token expired. Refreshing widget...');
            refreshTurnstile();
        },
        onError: () => {
            console.error('Turnstile failed to initialize. Refreshing widget...');
            refreshTurnstile();
        }
    });
}

export function tryCloseAnalysisModal() {
    const t = getTranslations();
    if (tempAIResult && !tempAIResultSaved) {
        if (!confirm(t.unsavedWarning || 'Your AI analysis is not saved yet. Close anyway?')) {
            return;
        }
    }

    setTempAIResult(null);
    setTempAIResultSaved(false);
    closeModal('analysis-modal');
}

export function handleFileSelect(input) {
    const file = input?.files?.[0];
    if (!file) return;

    const preview = document.getElementById('image-preview');
    showPreviewImage(file, preview);
    document.getElementById('analyze-btn').style.display = 'inline-block';

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
    document.getElementById('ai-loading').style.display = 'none';
}

function getUsageState() {
    return loadUsageState();
}

function incrementUsageCount() {
    if (isDev) return;
    const usage = getUsageState();
    saveUsageState({ ...usage, count: usage.count + 1 });
}

export function applyUsageLimitState(showLimitToast = false) {
    if (isDev) return true;

    const usage = getUsageState();
    const isExhausted = usage.count >= DAILY_LIMIT;
    const t = getTranslations();
    const analyzeBtn = document.getElementById('analyze-btn');
    const photoBtn = document.getElementById('btn-take-photo');
    const imageUpload = document.getElementById('image-upload');

    if (analyzeBtn && isExhausted) {
        analyzeBtn.disabled = true;
        analyzeBtn.style.opacity = '0.5';
        analyzeBtn.style.cursor = 'not-allowed';
        analyzeBtn.style.display = 'inline-block';
        analyzeBtn.textContent = t.aiQuotaExceededButton || 'AI daily limit reached';
    }
    if (photoBtn) {
        photoBtn.disabled = isExhausted;
        photoBtn.style.opacity = isExhausted ? '0.5' : '';
        photoBtn.style.cursor = isExhausted ? 'not-allowed' : '';
    }
    if (imageUpload) imageUpload.disabled = isExhausted;

    if (showLimitToast && isExhausted) {
        showToast(
            t.aiQuotaExceededToast || `Today's AI limit (${DAILY_LIMIT}) has been used up.`,
            'error'
        );
    }

    return !isExhausted;
}

function lockUIForAnalysis() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const photoBtn = document.getElementById('btn-take-photo');
    const imageUpload = document.getElementById('image-upload');

    if (analyzeBtn) {
        analyzeBtn.disabled = true;
        analyzeBtn.style.opacity = '0.6';
        analyzeBtn.style.cursor = 'not-allowed';
    }
    if (photoBtn) {
        photoBtn.disabled = true;
        photoBtn.style.opacity = '0.6';
        photoBtn.style.cursor = 'not-allowed';
    }
    if (imageUpload) imageUpload.disabled = true;
}

function unlockUIAfterCooldown() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const photoBtn = document.getElementById('btn-take-photo');
    const imageUpload = document.getElementById('image-upload');
    const t = getTranslations();

    isAnalyzing = false;

    if (analyzeBtn) {
        analyzeBtn.disabled = false;
        analyzeBtn.style.opacity = '';
        analyzeBtn.style.cursor = '';
        analyzeBtn.style.display = 'inline-block';
        renderAnalyzeButtonLabel(analyzeBtn, t.btnAnalyze || 'Analyze');
        if (!applyUsageLimitState()) return;
    }
    if (photoBtn) {
        photoBtn.disabled = false;
        photoBtn.style.opacity = '';
        photoBtn.style.cursor = '';
    }
    if (imageUpload) imageUpload.disabled = false;
}

function startCooldown() {
    const button = document.getElementById('analyze-btn');
    if (!button) return;

    let remaining = 15;
    button.style.display = 'inline-block';
    button.disabled = true;
    button.style.opacity = '0.6';
    button.style.cursor = 'not-allowed';
    button.textContent = `Cooldown (${remaining}s)`;

    const timer = setInterval(() => {
        remaining -= 1;
        if (remaining > 0) {
            button.textContent = `Cooldown (${remaining}s)`;
        } else {
            clearInterval(timer);
            unlockUIAfterCooldown();
        }
    }, 1000);
}

export function startAnalysis() {
    if (isAnalyzing) return;

    const input = document.getElementById('image-upload');
    const file = input.files[0];
    const t = getTranslations();
    const textOnlyInput = document.getElementById('ai-text-desc');
    const imageDescInput = document.getElementById('ai-desc');
    const textDescVal = textOnlyInput ? textOnlyInput.value.trim() : '';
    const imageDescVal = imageDescInput ? imageDescInput.value.trim() : '';

    if (!file && !textDescVal) {
        showToast(t.alertSelImgOrText || 'Please select an image or enter a description.', 'error');
        return;
    }
    if (!applyUsageLimitState(true)) return;

    isAnalyzing = true;
    lockUIForAnalysis();

    document.getElementById('analyze-btn').style.display = 'none';
    document.getElementById('ai-loading').style.display = 'block';

    let isSoftError = false;
    const handleResult = (result) => {
        if (!result) return;
        const normalized = normalizeAIAnalysisResult(result);
        incrementUsageCount();
        setTempAIResult({
            name: normalized.foodName,
            nutri: {
                calories: normalized.calories,
                protein: normalized.protein,
                fat: normalized.fat,
                carbohydrate: normalized.carbohydrate,
                sugar: normalized.sugar,
                sodium: normalized.sodium,
                saturatedFat: normalized.saturatedFat,
                transFat: normalized.transFat,
                fiber: normalized.fiber
            },
            items: normalized.items,
            healthScore: normalized.healthScore
        });
        setTempAIResultSaved(false);
        showModal();
    };

    const handleError = (error) => {
        reportControllerError('Analysis Error', error);
        const feedback = buildAIErrorFeedback(error, t);
        isSoftError = feedback.isSoftError;
        showToast(feedback.message, feedback.type);
    };

    const handleFinally = () => {
        document.getElementById('ai-loading').style.display = 'none';

        if (isSoftError) {
            unlockUIAfterCooldown();
            return;
        }

        document.getElementById('image-upload').value = '';
        if (document.getElementById('ai-desc')) document.getElementById('ai-desc').value = '';
        clearPreviewImage(document.getElementById('image-preview'));
        document.getElementById('ai-desc-group').style.display = 'none';

        const txtGroup = document.getElementById('ai-text-only-group');
        if (txtGroup) txtGroup.style.display = 'block';
        if (document.getElementById('ai-text-desc')) document.getElementById('ai-text-desc').value = '';

        startCooldown();
    };

    if (file) {
        const finalDesc = imageDescVal + (textDescVal ? ` ${textDescVal}` : '');
        toBase64(file)
            .then((base64) => callCloudflareAI(base64, finalDesc, file.type || 'image/jpeg'))
            .then(handleResult)
            .catch(handleError)
            .finally(handleFinally);
    } else {
        callCloudflareAIText(textDescVal)
            .then(handleResult)
            .catch(handleError)
            .finally(handleFinally);
    }
}
