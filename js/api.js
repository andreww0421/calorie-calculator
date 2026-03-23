import { showToast } from './ui.js';

export async function callCloudflareAI(base64, userDesc) {
    const url = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";

    // Turnstile 安全驗證
    const turnstileToken = typeof turnstile !== 'undefined' ? turnstile.getResponse() : null;
    if (!turnstileToken) {
        if (typeof turnstile !== 'undefined') {
            turnstile.reset();
            try { turnstile.execute(); } catch(e) {} // 強制索取新驗證碼
        }
        showToast("🛡️ 安全防護驗證中，請稍等 2 秒後再試一次！", "info");
        throw new Error("Turnstile_Pending");
    }

    try {
        console.log("Sending AI request...");

        const resp = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                turnstileToken: turnstileToken,
                lang: localStorage.getItem('appLang') || 'zh-TW',
                base64: base64,
                userDesc: userDesc || ""
            })
        });

        const data = await resp.json();
        if (typeof turnstile !== 'undefined') {
            turnstile.reset();
            try { turnstile.execute(); } catch(e) {} // 為下一次分析提前準備新驗證碼
        }

        if (data.error) throw new Error("API Error: " + JSON.stringify(data.error));
        if (!data.candidates || data.candidates.length === 0) throw new Error("AI returned no candidates");

        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(text);

    } catch (error) {
        if (typeof turnstile !== 'undefined') {
            turnstile.reset();
            try { turnstile.execute(); } catch(e) {}
        }
        console.error("AI API Fatal Error:", error);
        if (error.message !== "Turnstile_Pending") {
            showToast("AI 分析失敗，請稍後再試或換一張圖片。", 'error');
        }
        throw error;
    }
}

export async function callCloudflareAIText(userText) {
    const url = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";

    // Turnstile 安全驗證
    const turnstileToken = typeof turnstile !== 'undefined' ? turnstile.getResponse() : null;
    if (!turnstileToken) {
        if (typeof turnstile !== 'undefined') {
            turnstile.reset();
            try { turnstile.execute(); } catch(e) {} // 強制索取新驗證碼
        }
        showToast("🛡️ 安全防護驗證中，請稍等 2 秒後再試一次！", "info");
        throw new Error("Turnstile_Pending");
    }

    try {
        console.log("Sending Text-only AI request...");

        const resp = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                turnstileToken: turnstileToken,
                lang: localStorage.getItem('appLang') || 'zh-TW',
                userText: userText || ""
            })
        });

        const data = await resp.json();
        if (typeof turnstile !== 'undefined') {
            turnstile.reset();
            try { turnstile.execute(); } catch(e) {} // 為下一次分析提前準備新驗證碼
        }

        if (data.error) throw new Error("API Error: " + JSON.stringify(data.error));
        if (!data.candidates || data.candidates.length === 0) throw new Error("AI returned no candidates");

        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(text);

    } catch (error) {
        if (typeof turnstile !== 'undefined') {
            turnstile.reset();
            try { turnstile.execute(); } catch(e) {}
        }
        console.error("AI Text API Fatal Error:", error);
        if (error.message !== "Turnstile_Pending") {
            showToast("AI 分析失敗，請稍後再試或換一張圖片。", 'error');
        }
        throw error;
    }
}

// Phase 4: 重新計算 - 根據修改後的成分清單重新發送給 AI
export async function recalculateFromItems(items) {
    const itemsText = items.map(it => `${it.name} ${it.weight}`).join(', ');
    return callCloudflareAIText(itemsText);
}
