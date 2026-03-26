const ipCache = new Map();
const COOLDOWN_TIME = 15 * 1000;
const MODEL_NAME = 'gemini-2.5-flash';

const PROMPT_MAP = {
    'zh-TW': 'You are a nutritionist. Return JSON only with foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items.',
    'zh-CN': 'You are a nutritionist. Return JSON only with foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items.',
    en: 'You are a nutritionist. Return JSON only with foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items.',
    ja: 'You are a nutritionist. Return JSON only with foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items.',
    ko: 'You are a nutritionist. Return JSON only with foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items.',
    ar: 'You are a nutritionist. Return JSON only with foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items.'
};

function getAllowedOrigin(env) {
    return env.ALLOWED_ORIGIN || 'https://andreww0421.github.io';
}

function buildCorsHeaders(env) {
    return {
        'Access-Control-Allow-Origin': getAllowedOrigin(env),
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
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

function parseRetryDelaySeconds(details) {
    if (!Array.isArray(details)) return null;
    for (const detail of details) {
        if (typeof detail?.retryDelay === 'string') {
            const match = detail.retryDelay.match(/(\d+(?:\.\d+)?)s/i);
            if (match) return Math.ceil(Number(match[1]));
        }
    }
    return null;
}

function buildGeminiPayload(requestBody, systemPrompt) {
    if (requestBody.userText) {
        return {
            contents: [{
                parts: [{
                    text: `${systemPrompt}\n\nUser description:\n${requestBody.userText}`
                }]
            }]
        };
    }

    if (requestBody.base64) {
        let finalPrompt = systemPrompt;
        if (requestBody.userDesc) {
            finalPrompt += `\n\nExtra description:\n${requestBody.userDesc}`;
        }

        return {
            contents: [{
                parts: [
                    { text: finalPrompt },
                    {
                        inline_data: {
                            mime_type: requestBody.mimeType || 'image/jpeg',
                            data: requestBody.base64
                        }
                    }
                ]
            }]
        };
    }

    throw new Error('Please provide image or text input.');
}

function hasCandidateText(data) {
    return Boolean(
        data?.candidates?.[0]?.content?.parts?.[0]?.text &&
        String(data.candidates[0].content.parts[0].text).trim()
    );
}

function mapGeminiError(status, googleData, rawText) {
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
                    retryAfterSeconds: retryAfterSeconds || 60
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
                    message: 'AI request payload is invalid.'
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
                    message: 'AI provider denied this request.'
                }
            }
        };
    }

    console.error('Gemini upstream error:', status, googleData || rawText);
    return {
        status: 502,
        headers: {},
        body: {
            error: {
                code: 'AI_UPSTREAM_ERROR',
                message: 'AI service is temporarily unavailable.'
            }
        }
    };
}

export default {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: buildCorsHeaders(env) });
        }

        const requestOrigin = request.headers.get('Origin');
        if (requestOrigin !== getAllowedOrigin(env)) {
            return jsonResponse(env, {
                error: {
                    code: 'FORBIDDEN_ORIGIN',
                    message: 'Request origin is not allowed.'
                }
            }, 403);
        }

        if (request.method !== 'POST') {
            return jsonResponse(env, {
                error: {
                    code: 'METHOD_NOT_ALLOWED',
                    message: 'Only POST requests are allowed.'
                }
            }, 405, { Allow: 'POST, OPTIONS' });
        }

        try {
            let requestBody;
            try {
                requestBody = await request.json();
            } catch {
                return jsonResponse(env, {
                    error: {
                        code: 'INVALID_JSON',
                        message: 'Request body must be valid JSON.'
                    }
                }, 400);
            }

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
                            retryAfterSeconds: waitSec
                        }
                    }, 429, { 'Retry-After': String(waitSec) });
                }
                ipCache.set(clientIP, now);
                if (ipCache.size > 5000) ipCache.clear();
            }

            const turnstileToken = requestBody.turnstileToken;
            if (!turnstileToken) {
                return jsonResponse(env, {
                    error: {
                        code: 'TURNSTILE_MISSING',
                        message: 'Turnstile token is missing.'
                    }
                }, 403);
            }

            if (!env.TURNSTILE_SECRET_KEY || !env.GEMINI_API_KEY) {
                return jsonResponse(env, {
                    error: {
                        code: 'SERVER_CONFIG_ERROR',
                        message: 'Missing Worker secret configuration.'
                    }
                }, 500);
            }

            const formData = new FormData();
            formData.append('secret', env.TURNSTILE_SECRET_KEY);
            formData.append('response', turnstileToken);
            if (clientIP) formData.append('remoteip', clientIP);

            const turnstileVerify = await fetch(
                'https://challenges.cloudflare.com/turnstile/v0/siteverify',
                { method: 'POST', body: formData }
            );
            const turnstileOutcome = await turnstileVerify.json();
            if (!turnstileOutcome.success) {
                return jsonResponse(env, {
                    error: {
                        code: 'TURNSTILE_INVALID',
                        message: 'Security verification failed.'
                    }
                }, 403);
            }

            const lang = requestBody.lang || 'zh-TW';
            const systemPrompt = PROMPT_MAP[lang] || PROMPT_MAP['zh-TW'];
            const geminiPayload = buildGeminiPayload(requestBody, systemPrompt);
            const googleUrl =
                `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY.trim())}`;

            const googleResponse = await fetch(googleUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(geminiPayload)
            });

            const rawText = await googleResponse.text();
            const googleData = rawText ? JSON.parse(rawText) : {};

            if (!googleResponse.ok) {
                const mapped = mapGeminiError(googleResponse.status, googleData, rawText);
                return jsonResponse(env, mapped.body, mapped.status, mapped.headers);
            }

            if (!hasCandidateText(googleData)) {
                return jsonResponse(env, {
                    error: {
                        code: 'AI_INVALID_RESPONSE',
                        message: 'AI provider returned an invalid response payload.'
                    }
                }, 502);
            }

            return jsonResponse(env, googleData, 200);
        } catch (error) {
            console.error('Worker fatal error:', error);
            return jsonResponse(env, {
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Unexpected Worker error.'
                }
            }, 500);
        }
    }
};
