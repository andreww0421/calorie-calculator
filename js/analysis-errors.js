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

    if (errorText === 'TURNSTILE_UNSUPPORTED_DOMAIN' || errorText === 'TURNSTILE_UNAVAILABLE') {
        return {
            isSoftError: true,
            type: 'error',
            message: errorText === 'TURNSTILE_UNSUPPORTED_DOMAIN'
                ? (translations.turnstileUnavailable || 'Security verification is unavailable on this domain. Use the production site or add this hostname to Turnstile.')
                : (translations.turnstileSetupError || 'Security verification could not be initialized. Reload the page and try again.')
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

    if (
        combinedErrorText.includes('110200') ||
        combinedErrorText.includes('turnstile_unsupported_domain') ||
        combinedErrorText.includes('turnstile_unavailable')
    ) {
        return {
            isSoftError: true,
            type: 'error',
            message: combinedErrorText.includes('110200') || combinedErrorText.includes('turnstile_unsupported_domain')
                ? (translations.turnstileUnavailable || 'Security verification is unavailable on this domain. Use the production site or add this hostname to Turnstile.')
                : (translations.turnstileSetupError || 'Security verification could not be initialized. Reload the page and try again.')
        };
    }

    if (
        combinedErrorText.includes('ai_invalid_payload') ||
        combinedErrorText.includes('ai_invalid_response')
    ) {
        return {
            isSoftError: false,
            type: 'error',
            message: translations.aiInvalidResponse || 'AI returned an incomplete nutrition result. Please try again with a clearer photo or description.'
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

    if (rawMessage === 'TURNSTILE_UNSUPPORTED_DOMAIN') {
        return translations.turnstileUnavailable || 'Security verification is unavailable on this domain. Use the production site or add this hostname to Turnstile.';
    }

    if (rawMessage === 'TURNSTILE_UNAVAILABLE') {
        return translations.turnstileSetupError || 'Security verification could not be initialized. Reload the page and try again.';
    }

    const parsed = parseStructuredAIError(rawMessage);
    const payload = parsed?.error || parsed;
    if (payload?.message) return payload.message;
    if (/AI_INVALID_(PAYLOAD|RESPONSE)/.test(rawMessage)) {
        return translations.aiInvalidResponse || 'AI returned an incomplete nutrition result. Please try again with a clearer photo or description.';
    }

    return `${translations.alertAiFail || 'AI analysis failed: '}${rawMessage}`;
}
