const WORKER_URL = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";
const TURNSTILE_WIDGET_ID = '#turnstile-widget';

function getTurnstileToken() {
    return typeof turnstile !== 'undefined' ? turnstile.getResponse(TURNSTILE_WIDGET_ID) : null;
}

function refreshTurnstileToken() {
    if (typeof turnstile === 'undefined') return;
    turnstile.reset(TURNSTILE_WIDGET_ID);
    try { turnstile.execute(TURNSTILE_WIDGET_ID); } catch(e) {}
}

async function postToWorker(payload, logLabel) {
    const turnstileToken = getTurnstileToken();
    if (!turnstileToken) {
        // 🛑 絕對不要在這裡呼叫 turnstile.reset()！會把正在載入的驗證程序殺死！
        throw new Error("Turnstile_Pending");
    }

    try {
        console.log(logLabel);

        const resp = await fetch(WORKER_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                turnstileToken,
                lang: localStorage.getItem('appLang') || 'zh-TW',
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

        refreshTurnstileToken();

        if (!resp.ok || data.error) {
            const errorPayload = data?.error ?? data ?? rawText ?? `HTTP ${resp.status}`;
            throw new Error(typeof errorPayload === 'string' ? errorPayload : JSON.stringify(errorPayload));
        }

        return data;

    } catch (error) {
        if (typeof turnstile !== 'undefined') turnstile.reset(TURNSTILE_WIDGET_ID);
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

// Phase 4: 重新計算 - 根據修改後的成分清單重新發送給 AI
export async function recalculateFromItems(items) {
    const itemsText = items.map(it => `${it.name} ${it.weight}`).join(', ');
    return callCloudflareAIText(itemsText);
}
