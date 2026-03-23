export function parseStructuredAIError(errorText) {
    if (!errorText || typeof errorText !== 'string') return null;
    try {
        return JSON.parse(errorText);
    } catch (error) {
        return null;
    }
}

export function extractRetryDelaySeconds(details) {
    if (!Array.isArray(details)) return null;

    for (const detail of details) {
        if (typeof detail?.retryDelay === 'string') {
            const match = detail.retryDelay.match(/(\d+(?:\.\d+)?)s/i);
            if (match) return Math.ceil(Number(match[1]));
        }
    }

    return null;
}

export function buildAIErrorFeedback(error, translations = {}) {
    let errorText = error?.message || String(error);
    if (errorText === '[object Object]') {
        try {
            errorText = JSON.stringify(error);
        } catch (stringifyError) {
            errorText = 'Unknown AI error';
        }
    }

    if (errorText === 'Turnstile_Pending') {
        return {
            isSoftError: true,
            type: 'info',
            message: translations.turnstilePending || 'Security verification is in progress. Please try again in a moment.'
        };
    }

    const structuredError = parseStructuredAIError(errorText);
    const payload = structuredError?.error || structuredError || {};
    const structuredMessage = payload?.message || '';
    const combinedErrorText = `${errorText} ${structuredMessage}`.toLowerCase();
    const retrySeconds =
        Number(payload?.retryAfterSeconds) ||
        Number(structuredError?.retryAfterSeconds) ||
        extractRetryDelaySeconds(payload?.details || structuredError?.details);

    if (
        payload?.code === 429 ||
        payload?.status === 'RESOURCE_EXHAUSTED' ||
        structuredError?.status === 'RESOURCE_EXHAUSTED' ||
        combinedErrorText.includes('quota exceeded') ||
        combinedErrorText.includes('resource_exhausted') ||
        combinedErrorText.includes('rate limit') ||
        combinedErrorText.includes('ai_quota_exceeded')
    ) {
        const retryHint = retrySeconds
            ? `Please try again in ${retrySeconds} seconds.`
            : 'Please try again later.';

        return {
            isSoftError: true,
            type: 'error',
            message: translations.aiQuotaExceeded || `AI service quota is currently exhausted. ${retryHint}`
        };
    }

    if (
        combinedErrorText.includes('security verification') ||
        combinedErrorText.includes('request_cooldown')
    ) {
        return {
            isSoftError: true,
            type: 'error',
            message: structuredMessage || errorText
        };
    }

    return {
        isSoftError: false,
        type: 'error',
        message: (translations.alertAiFail || 'AI analysis failed: ') + (structuredMessage || errorText)
    };
}

export function formatAIRequestError(error, translations = {}) {
    const rawMessage = error?.message || String(error);

    if (rawMessage === 'Turnstile_Pending') {
        return translations.turnstilePending || 'Security verification is in progress. Please try again in a moment.';
    }

    const parsed = parseStructuredAIError(rawMessage);
    const payload = parsed?.error || parsed;
    if (payload?.message) return payload.message;

    return `${translations.alertAiFail || 'AI analysis failed: '}${rawMessage}`;
}
