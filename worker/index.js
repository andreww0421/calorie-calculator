import {
    WorkerContractError,
    buildNutritionSystemPrompt,
    buildGeminiPayload,
    normalizeGeminiResponse,
    parseRetryDelaySeconds,
    validateAIRequestBody,
    validateRequestSize
} from './contract.js';

const ipCache = new Map();
const COOLDOWN_TIME = 15 * 1000;
const MODEL_NAME = 'gemini-2.5-flash';

function getAllowedOrigin(env) {
    return env.ALLOWED_ORIGIN || 'https://andreww0421.github.io';
}

function buildCorsHeaders(env) {
    return {
        'Access-Control-Allow-Origin': getAllowedOrigin(env),
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-store',
        Vary: 'Origin'
    };
}

function jsonResponse(env, body, status = 200, extraHeaders = {}) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            ...buildCorsHeaders(env),
            ...extraHeaders
        }
    });
}

function logJson(level, message, meta = {}) {
    const payload = JSON.stringify({
        message,
        ...meta
    });

    if (level === 'error') {
        console.error(payload);
        return;
    }

    if (level === 'warn') {
        console.warn(payload);
        return;
    }

    console.log(payload);
}

function mapGeminiError(status, googleData, rawText, requestId) {
    const googleError = googleData?.error || {};
    const details = Array.isArray(googleError.details) ? googleError.details : [];
    const retryAfterSeconds = parseRetryDelaySeconds(details);

    if (status === 429 || googleError.status === 'RESOURCE_EXHAUSTED') {
        return {
            status: 429,
            headers: retryAfterSeconds ? { 'Retry-After': String(retryAfterSeconds) } : {},
            body: {
                error: {
                    code: 'AI_QUOTA_EXCEEDED',
                    message: 'AI service quota is exhausted. Please retry later.',
                    retryAfterSeconds: retryAfterSeconds || 60,
                    requestId
                }
            }
        };
    }

    if (status === 400) {
        return {
            status: 400,
            headers: {},
            body: {
                error: {
                    code: 'AI_BAD_REQUEST',
                    message: 'AI request payload is invalid.',
                    requestId
                }
            }
        };
    }

    if (status === 403) {
        return {
            status: 502,
            headers: {},
            body: {
                error: {
                    code: 'AI_ACCESS_DENIED',
                    message: 'AI provider denied this request.',
                    requestId
                }
            }
        };
    }

    logJson('error', 'gemini_upstream_error', {
        requestId,
        status,
        upstreamStatus: googleError.status || null,
        upstreamMessage: googleError.message || rawText || 'unknown'
    });

    return {
        status: 502,
        headers: {},
        body: {
            error: {
                code: 'AI_UPSTREAM_ERROR',
                message: 'AI service is temporarily unavailable.',
                requestId
            }
        }
    };
}

function mapContractError(env, error, requestId) {
    if (!(error instanceof WorkerContractError)) return null;

    return jsonResponse(env, {
        error: {
            code: error.code,
            message: error.message,
            requestId,
            ...error.details
        }
    }, error.status);
}

export default {
    async fetch(request, env) {
        const requestId = crypto.randomUUID();

        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: buildCorsHeaders(env) });
        }

        const requestOrigin = request.headers.get('Origin');
        if (requestOrigin !== getAllowedOrigin(env)) {
            return jsonResponse(env, {
                error: {
                    code: 'FORBIDDEN_ORIGIN',
                    message: 'Request origin is not allowed.',
                    requestId
                }
            }, 403);
        }

        if (request.method !== 'POST') {
            return jsonResponse(env, {
                error: {
                    code: 'METHOD_NOT_ALLOWED',
                    message: 'Only POST requests are allowed.',
                    requestId
                }
            }, 405, { Allow: 'POST, OPTIONS' });
        }

        try {
            validateRequestSize(request);

            let requestBody;
            try {
                requestBody = await request.json();
            } catch {
                return jsonResponse(env, {
                    error: {
                        code: 'INVALID_JSON',
                        message: 'Request body must be valid JSON.',
                        requestId
                    }
                }, 400);
            }

            const validatedBody = validateAIRequestBody(requestBody);
            const clientIP = request.headers.get('CF-Connecting-IP') || '';

            if (clientIP) {
                const now = Date.now();
                const lastTime = ipCache.get(clientIP);
                if (lastTime && now - lastTime < COOLDOWN_TIME) {
                    const waitSec = Math.ceil((COOLDOWN_TIME - (now - lastTime)) / 1000);
                    return jsonResponse(env, {
                        error: {
                            code: 'REQUEST_COOLDOWN',
                            message: `Please wait ${waitSec} seconds before retrying.`,
                            retryAfterSeconds: waitSec,
                            requestId
                        }
                    }, 429, { 'Retry-After': String(waitSec) });
                }
                ipCache.set(clientIP, now);
                if (ipCache.size > 5000) ipCache.clear();
            }

            if (!env.TURNSTILE_SECRET_KEY || !env.GEMINI_API_KEY) {
                return jsonResponse(env, {
                    error: {
                        code: 'SERVER_CONFIG_ERROR',
                        message: 'Missing Worker secret configuration.',
                        requestId
                    }
                }, 500);
            }

            const formData = new FormData();
            formData.append('secret', env.TURNSTILE_SECRET_KEY);
            formData.append('response', validatedBody.turnstileToken);
            if (clientIP) formData.append('remoteip', clientIP);

            const turnstileVerify = await fetch(
                'https://challenges.cloudflare.com/turnstile/v0/siteverify',
                { method: 'POST', body: formData }
            );
            const turnstileOutcome = await turnstileVerify.json();
            if (!turnstileOutcome.success) {
                logJson('warn', 'turnstile_invalid', {
                    requestId,
                    clientIP,
                    outcomeCodes: turnstileOutcome['error-codes'] || []
                });
                return jsonResponse(env, {
                    error: {
                        code: 'TURNSTILE_INVALID',
                        message: 'Security verification failed.',
                        requestId
                    }
                }, 403);
            }

            const systemPrompt = buildNutritionSystemPrompt(validatedBody.lang);
            const geminiPayload = buildGeminiPayload(validatedBody, systemPrompt);
            const googleUrl =
                `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY.trim())}`;

            const googleResponse = await fetch(googleUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(geminiPayload)
            });

            const rawText = await googleResponse.text();
            let googleData = {};
            try {
                googleData = rawText ? JSON.parse(rawText) : {};
            } catch {
                googleData = {};
            }

            if (!googleResponse.ok) {
                const mapped = mapGeminiError(googleResponse.status, googleData, rawText, requestId);
                return jsonResponse(env, mapped.body, mapped.status, mapped.headers);
            }

            const result = normalizeGeminiResponse(googleData);
            return jsonResponse(env, {
                result,
                requestId
            }, 200);
        } catch (error) {
            const contractResponse = mapContractError(env, error, requestId);
            if (contractResponse) {
                logJson('warn', 'worker_contract_rejected', {
                    requestId,
                    code: error.code,
                    status: error.status
                });
                return contractResponse;
            }

            logJson('error', 'worker_fatal_error', {
                requestId,
                error: error instanceof Error ? error.message : String(error)
            });
            return jsonResponse(env, {
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Unexpected Worker error.',
                    requestId
                }
            }, 500);
        }
    }
};
