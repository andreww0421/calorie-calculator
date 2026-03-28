import { WORKER_URL } from './env.js';
import { getAppState } from './state/app-state.js';
import {
    getTurnstileToken,
    getTurnstileStatus,
    initializeTurnstileWidget,
    refreshTurnstile,
    resetTurnstile
} from './platform.js';
import { extractAnalysisFromGeminiPayload } from './domain/ai-analysis-domain.js';

async function postToWorker(payload, logLabel) {
    await initializeTurnstileWidget();

    const turnstileToken = getTurnstileToken();
    if (!turnstileToken) {
        const turnstileStatus = getTurnstileStatus();
        const errorCode = String(turnstileStatus.lastErrorCode || turnstileStatus.unavailableReason || '');

        if (errorCode === '110200' || errorCode === 'TURNSTILE_UNSUPPORTED_DOMAIN') {
            throw new Error('TURNSTILE_UNSUPPORTED_DOMAIN');
        }

        if (errorCode) {
            throw new Error('TURNSTILE_UNAVAILABLE');
        }

        throw new Error("Turnstile_Pending");
    }

    try {
        console.log(logLabel);

        const resp = await fetch(WORKER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                turnstileToken,
                lang: getAppState().curLang || 'zh-TW',
                ...payload
            })
        });

        const rawText = await resp.text();
        let data;
        try {
            data = rawText ? JSON.parse(rawText) : {};
        } catch (parseError) {
            throw new Error(rawText ? rawText.slice(0, 300) : `HTTP ${resp.status}`);
        }

        refreshTurnstile();

        if (!resp.ok || data.error) {
            const errorPayload = data?.error ?? data ?? rawText ?? `HTTP ${resp.status}`;
            throw new Error(typeof errorPayload === 'string' ? errorPayload : JSON.stringify(errorPayload));
        }

        return data;
    } catch (error) {
        resetTurnstile();
        console.error("AI API Fatal Error:", error);
        throw error;
    }
}

export async function callCloudflareAI(base64, userDesc, mimeType = 'image/jpeg') {
    const data = await postToWorker({
        base64,
        userDesc: userDesc || "",
        mimeType
    }, "Sending AI request...");
    return data?.result || extractAnalysisFromGeminiPayload(data);
}

export async function callCloudflareAIText(userText) {
    const data = await postToWorker({
        userText: userText || ""
    }, "Sending Text-only AI request...");
    return data?.result || extractAnalysisFromGeminiPayload(data);
}

export async function recalculateFromItems(items) {
    const itemsText = items.map(it => `${it.name} ${it.weight}`).join(', ');
    return callCloudflareAIText(itemsText);
}
