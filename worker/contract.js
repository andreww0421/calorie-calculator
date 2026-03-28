import { normalizeAIAnalysisResult } from '../js/domain/ai-analysis-domain.js';

export const SUPPORTED_LANGS = Object.freeze(['zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ar']);
export const MAX_REQUEST_BODY_BYTES = 8_000_000;
export const MAX_BASE64_LENGTH = 7_000_000;
export const MAX_USER_TEXT_LENGTH = 3_000;
export const MAX_USER_DESC_LENGTH = 800;
export const MAX_TURNSTILE_TOKEN_LENGTH = 4_096;

const BASE64_PATTERN = /^[A-Za-z0-9+/=]+$/;
const IMAGE_MIME_PATTERN = /^image\/[a-z0-9.+-]+$/i;

export class WorkerContractError extends Error {
    constructor(code, message, status = 400, details = {}) {
        super(message);
        this.name = 'WorkerContractError';
        this.code = code;
        this.status = status;
        this.details = details;
    }
}

function normalizeString(value) {
    return typeof value === 'string' ? value.trim() : '';
}

export function parseRetryDelaySeconds(details) {
    if (!Array.isArray(details)) return null;
    for (const detail of details) {
        if (typeof detail?.retryDelay === 'string') {
            const match = detail.retryDelay.match(/(\d+(?:\.\d+)?)s/i);
            if (match) return Math.ceil(Number(match[1]));
        }
    }
    return null;
}

export function validateRequestSize(request) {
    const rawLength = request.headers.get('Content-Length');
    if (!rawLength) return null;

    const contentLength = Number(rawLength);
    if (!Number.isFinite(contentLength) || contentLength < 0) {
        throw new WorkerContractError(
            'INVALID_CONTENT_LENGTH',
            'Content-Length header is invalid.',
            400
        );
    }

    if (contentLength > MAX_REQUEST_BODY_BYTES) {
        throw new WorkerContractError(
            'REQUEST_TOO_LARGE',
            'Request body is too large.',
            413,
            { maxBytes: MAX_REQUEST_BODY_BYTES }
        );
    }

    return contentLength;
}

export function validateAIRequestBody(requestBody) {
    if (!requestBody || typeof requestBody !== 'object' || Array.isArray(requestBody)) {
        throw new WorkerContractError(
            'INVALID_REQUEST_SHAPE',
            'Request body must be a JSON object.',
            400
        );
    }

    const turnstileToken = normalizeString(requestBody.turnstileToken);
    const lang = normalizeString(requestBody.lang) || 'zh-TW';
    const userText = normalizeString(requestBody.userText);
    const userDesc = normalizeString(requestBody.userDesc);
    const mimeType = normalizeString(requestBody.mimeType || 'image/jpeg').toLowerCase();
    const base64 = normalizeString(requestBody.base64).replace(/\s+/g, '');

    if (!turnstileToken) {
        throw new WorkerContractError(
            'TURNSTILE_MISSING',
            'Turnstile token is missing.',
            403
        );
    }

    if (turnstileToken.length > MAX_TURNSTILE_TOKEN_LENGTH) {
        throw new WorkerContractError(
            'TURNSTILE_INVALID',
            'Turnstile token is invalid.',
            403
        );
    }

    if (!SUPPORTED_LANGS.includes(lang)) {
        throw new WorkerContractError(
            'UNSUPPORTED_LANGUAGE',
            'Requested language is not supported.',
            400
        );
    }

    if (!userText && !base64) {
        throw new WorkerContractError(
            'INPUT_MISSING',
            'Please provide image or text input.',
            400
        );
    }

    if (userText && base64) {
        throw new WorkerContractError(
            'INPUT_CONFLICT',
            'Send either text input or image input, not both.',
            400
        );
    }

    if (userText.length > MAX_USER_TEXT_LENGTH) {
        throw new WorkerContractError(
            'TEXT_TOO_LARGE',
            'Text input is too long.',
            413,
            { maxLength: MAX_USER_TEXT_LENGTH }
        );
    }

    if (userDesc.length > MAX_USER_DESC_LENGTH) {
        throw new WorkerContractError(
            'DESCRIPTION_TOO_LARGE',
            'Image description is too long.',
            413,
            { maxLength: MAX_USER_DESC_LENGTH }
        );
    }

    if (base64) {
        if (base64.length > MAX_BASE64_LENGTH) {
            throw new WorkerContractError(
                'IMAGE_TOO_LARGE',
                'Image payload is too large.',
                413,
                { maxLength: MAX_BASE64_LENGTH }
            );
        }

        if (!IMAGE_MIME_PATTERN.test(mimeType)) {
            throw new WorkerContractError(
                'MIME_TYPE_INVALID',
                'Image MIME type is invalid.',
                400
            );
        }

        if (!BASE64_PATTERN.test(base64)) {
            throw new WorkerContractError(
                'IMAGE_ENCODING_INVALID',
                'Image payload must be valid base64.',
                400
            );
        }
    }

    return {
        turnstileToken,
        lang,
        userText,
        userDesc,
        mimeType,
        base64
    };
}

export function buildGeminiPayload(requestBody, systemPrompt) {
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

    throw new WorkerContractError(
        'INPUT_MISSING',
        'Please provide image or text input.',
        400
    );
}

export function extractGeminiCandidateText(data) {
    const parts = data?.candidates?.[0]?.content?.parts;
    if (!Array.isArray(parts) || parts.length === 0) {
        throw new WorkerContractError(
            'AI_INVALID_RESPONSE',
            'AI provider returned an invalid response payload.',
            502
        );
    }

    const text = parts
        .map((part) => (typeof part?.text === 'string' ? part.text : ''))
        .join('\n')
        .trim();

    if (!text) {
        throw new WorkerContractError(
            'AI_INVALID_RESPONSE',
            'AI provider returned an invalid response payload.',
            502
        );
    }

    return text.replace(/```json/gi, '').replace(/```/g, '').trim();
}

export function normalizeGeminiResponse(data) {
    let parsed;
    try {
        parsed = JSON.parse(extractGeminiCandidateText(data));
    } catch (error) {
        throw new WorkerContractError(
            'AI_INVALID_RESPONSE',
            'AI provider returned an invalid response payload.',
            502
        );
    }

    try {
        return normalizeAIAnalysisResult(parsed);
    } catch (error) {
        throw new WorkerContractError(
            'AI_INVALID_RESPONSE',
            'AI provider returned an invalid response payload.',
            502
        );
    }
}
