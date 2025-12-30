async function callCloudflareAI(base64, userDesc) {
    // 這是負責跟後端 AI 溝通的網址
    const url = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";
    
    // 定義強力的 Prompt
    const promptMap = {
        "zh-TW": "你是一位營養師。請分析圖片食物的「八大營養指標」。回傳純 JSON 格式。欄位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要規則：\n1. 請勿高估份量，若不確定請採用「標準市售份量」或「保守估計」。\n2. 除非圖片中有明顯大份量特徵，否則請以「一人份」為基準。\n",
        "zh-CN": "你是一位营养师。请分析图片食物的「八大营养指标」。回传纯 JSON 格式。栏位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要规则：\n1. 请勿高估份量，若不确定请采用「标准市售份量」或「保守估计」。\n2. 除非图片中有明显大份量特征，否则请以「一人份」为基准。\n",
        "en": "You are a nutritionist. Analyze the image for 8 nutritional metrics. Return PURE JSON. Fields: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat.\n\nCRITICAL INSTRUCTIONS:\n1. Do NOT overestimate portion sizes. Be conservative.\n2. Assume 'standard single serving' unless the image clearly shows a huge portion.\n",
        "ja": "あなたは栄養士です。画像の食品の8つの栄養指標を分析してください。純粋なJSONで返してください。フィールド：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要なルール：\n1. 分量を過大評価しないでください。確信が持てない場合は「標準的な一人前」または「控えめな見積もり」を採用してください。\n"
    };
    
    // 取得當前語言，預設繁中
    const currentLang = localStorage.getItem('appLang') || 'zh-TW';
    // 確保有對應的 Prompt，沒有就用英文兜底
    let prompt = promptMap[currentLang] || promptMap['en'] || promptMap['zh-TW'];
    
    // 除錯用：在控制台印出使用的 Prompt
    console.log("AI Prompt Language:", currentLang);

    if(userDesc) {
        prompt += `\n\n[User's supplementary description]: ${userDesc}\n(Please adjust the estimation based on this description.)`;
    }

    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                contents: [{ parts: [ { text: prompt }, { inline_data: { mime_type: "image/jpeg", data: base64 } } ] }]
            })
        });

        const data = await resp.json();
        
        // 詳細錯誤處理
        if (!data) throw new Error("API returned empty response");
        if (data.error) throw new Error("API Error: " + JSON.stringify(data.error));
        if (!data.candidates || data.candidates.length === 0) throw new Error("AI candidates empty");

        let text = data.candidates[0].content.parts[0].text;
        
        // 清理 Markdown 標記 (```json ... ```)
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        console.log("AI Raw Response:", text); // 除錯用

        return JSON.parse(text);
        
    } catch (error) {
        console.error("AI API Fatal Error:", error);
        alert("AI 分析發生錯誤: " + error.message); // 跳出視窗告知使用者
        throw error;
    }
}
