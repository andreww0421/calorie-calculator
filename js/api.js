import { curLang } from './data.js';
import { WORKER_URL } from './env.js';
import {
    getTurnstileToken,
    refreshTurnstile,
    resetTurnstile
} from './platform.js';

async function postToWorker(payload, logLabel) {
    const turnstileToken = getTurnstileToken();
    if (!turnstileToken) {
        throw new Error("Turnstile_Pending");
    }

    try {
        console.log(logLabel);

        const resp = await fetch(WORKER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                turnstileToken,
                lang: curLang || 'zh-TW',
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

function parseGeminiCandidate(data) {
    if (!data.candidates || data.candidates.length === 0) throw new Error("AI returned no candidates");
    let text = data.candidates[0].content.parts[0].text;
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
}

export async function callCloudflareAI(base64, userDesc, mimeType = 'image/jpeg') {
    const data = await postToWorker({
        base64,
        userDesc: userDesc || "",
        mimeType
    }, "Sending AI request...");
    return parseGeminiCandidate(data);
}

export async function callCloudflareAIText(userText) {
    const data = await postToWorker({
        userText: userText || ""
    }, "Sending Text-only AI request...");
    return parseGeminiCandidate(data);
}

export async function recalculateFromItems(items) {
    const itemsText = items.map(it => `${it.name} ${it.weight}`).join(', ');
    return callCloudflareAIText(itemsText);
}
