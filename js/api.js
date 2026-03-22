async function callCloudflareAI(base64, userDesc) {
    const url = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";

    // Turnstile 安全驗證
    const turnstileToken = typeof turnstile !== 'undefined' ? turnstile.getResponse() : null;
    if (!turnstileToken) {
        alert("系統安全驗證中，請稍候再試或重新整理網頁！");
        throw new Error("Turnstile validation pending");
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
        if (typeof turnstile !== 'undefined') turnstile.reset();

        if (data.error) throw new Error("API Error: " + JSON.stringify(data.error));
        if (!data.candidates || data.candidates.length === 0) throw new Error("AI returned no candidates");

        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(text);

    } catch (error) {
        if (typeof turnstile !== 'undefined') turnstile.reset();
        console.error("AI API Fatal Error:", error);
        alert("AI 連線失敗，請稍後再試。\n錯誤訊息: " + error.message);
        throw error;
    }
}

async function callCloudflareAIText(userText) {
    const url = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";

    // Turnstile 安全驗證
    const turnstileToken = typeof turnstile !== 'undefined' ? turnstile.getResponse() : null;
    if (!turnstileToken) {
        alert("系統安全驗證中，請稍候再試或重新整理網頁！");
        throw new Error("Turnstile validation pending");
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
        if (typeof turnstile !== 'undefined') turnstile.reset();

        if (data.error) throw new Error("API Error: " + JSON.stringify(data.error));
        if (!data.candidates || data.candidates.length === 0) throw new Error("AI returned no candidates");

        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(text);

    } catch (error) {
        if (typeof turnstile !== 'undefined') turnstile.reset();
        console.error("AI Text API Fatal Error:", error);
        alert("文字 AI 分析連線失敗，請稍後再試。\n錯誤訊息: " + error.message);
        throw error;
    }
}

// Phase 4: 重新計算 - 根據修改後的成分清單重新發送給 AI
async function recalculateFromItems(items) {
    const itemsText = items.map(it => `${it.name} ${it.weight}`).join(', ');
    return callCloudflareAIText(itemsText);
}
