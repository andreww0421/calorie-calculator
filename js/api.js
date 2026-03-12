async function callCloudflareAI(base64, userDesc) {
    const url = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";
    
    // 1. 定義完整的語言對應 Prompt
    const promptMap = {
        "zh-TW": "你是一位營養師。請分析圖片食物的「八大營養指標」。回傳純 JSON 格式。欄位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要規則：\n1. 請勿高估份量，若不確定請採用「標準市售份量」或「保守估計」。\n2. 除非圖片中有明顯大份量特徵，否則請以「一人份」為基準。\n",
        "zh-CN": "你是一位营养师。请分析图片食物的「八大营养指标」。回传纯 JSON 格式。栏位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要规则：\n1. 请勿高估份量，若不确定请采用「标准市售份量」或「保守估计」。\n2. 除非图片中有明显大份量特征，否则请以「一人份」为基准。\n",
        "en": "You are a nutritionist. Analyze the image for 8 nutritional metrics. Return PURE JSON. Fields: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat.\n\nCRITICAL INSTRUCTIONS:\n1. Do NOT overestimate portion sizes. Be conservative.\n2. Assume 'standard single serving' unless the image clearly shows a huge portion.\n",
        "ja": "あなたは栄養士です。画像の食品の8つの栄養指標を分析してください。純粋なJSONで返してください。フィールド：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要なルール：\n1. 分量を過大評価しないでください。確信が持てない場合は「標準的な一人前」または「控えめな見積もり」を採用してください。\n",
        "ko": "당신은 영양사입니다. 이미지 속 음식의 8가지 영양 지표를 분석하세요. 순수 JSON 형식으로 반환하세요. 필드: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat.\n\n중요한 규칙:\n1. 1인분을 기준으로 하며 과대평가하지 마세요. 불확실한 경우 보수적으로 추정하세요.\n",
        "ar": "أنت أخصائي تغذية. قم بتحليل المؤشرات الغذائية الثمانية للطعام في الصورة. قم بإرجاع النتيجة بتنسيق JSON النقي. الحقول: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat.\n\nقواعد هامة:\n1. لا تبالغ في تقدير حجم الحصة. إذا لم تكن متأكدًا، فاستخدم تقديرًا محافظًا بناءً على حصة شخص واحد."
    };
    
    // 2. 安全獲取語言設定 (不依賴外部變數)
    const lang = localStorage.getItem('appLang') || 'zh-TW';
    let prompt = promptMap[lang] || promptMap['en']; // 預設回退到英文
    
    // 3. 加入使用者補充描述
    if(userDesc) {
        prompt += `\n\n[User's supplementary description]: ${userDesc}\n(Please adjust the estimation based on this description.)`;
    }

    try {
        console.log("Sending AI request with lang:", lang); // 除錯用

        const resp = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                contents: [{ parts: [ { text: prompt }, { inline_data: { mime_type: "image/jpeg", data: base64 } } ] }]
            })
        });

        const data = await resp.json();
        
        // 錯誤檢查
        if (data.error) throw new Error("API Error: " + JSON.stringify(data.error));
        if (!data.candidates || data.candidates.length === 0) throw new Error("AI returned no candidates");

        let text = data.candidates[0].content.parts[0].text;
        
        // 清理 Markdown 格式
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        return JSON.parse(text);
        
    } catch (error) {
        console.error("AI API Fatal Error:", error);
        alert("AI 連線失敗，請稍後再試。\n錯誤訊息: " + error.message);
        throw error;
    }
}

// ✨ 新增：純文字解析功能 (不包含圖片)
async function callCloudflareAIText(userText) {
    const url = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";
    
    const promptMap = {
        "zh-TW": `你是一位營養師。請根據使用者輸入的文字描述：「${userText}」，分析它的「八大營養指標」。回傳純 JSON 格式。欄位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要規則：\n1. 請基於一般常見份量估算。\n2. 若無法精準判斷，請給出最合理的估計值。`,
        "zh-CN": `你是一位营养师。请根据使用者输入的文字描述：「${userText}」，分析它的「八大营养指标」。回传纯 JSON 格式。栏位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要规则：\n1. 请基于一般常见份量估算。\n2. 若无法精准判断，请给出最合理的估计值。`,
        "en": `You are a nutritionist. Analyze the following text description: "${userText}" for its 8 nutritional metrics. Return PURE JSON. Fields: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat.\n\nCRITICAL INSTRUCTIONS:\n1. Estimate based on standard serving sizes.\n2. Provide the most reasonable estimate if unsure.`,
        "ja": `あなたは栄養士です。次のテキスト入力：「${userText}」の8つの栄養指標を分析してください。純粋なJSONで返してください。フィールド：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat。\n\n重要なルール：\n1. 標準的な一人前に基づいて見積もってください。\n2. 確信が持てない場合は、最も合理的な見積もりを提供してください。`,
        "ko": `당신은 영양사입니다. 사용자가 입력한 텍스트 묘사: "${userText}" 를 바탕으로 8가지 영양 지표를 분석하세요. 순수 JSON 형식으로 반환하세요. 필드: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat.\n\n중요한 규칙:\n1. 일반적인 1인분을 기준으로 추정하세요.\n2. 정확한 판단이 어려울 경우 가장 합리적인 추정치를 제공하세요.`,
        "ar": `أنت أخصائي تغذية. بناءً على الوصف النصي المدخل: "${userText}"، قم بتحليل المؤشرات الغذائية الثمانية. قم بإرجاع النتيجة بتنسيق JSON النقي. الحقول: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat.\n\nقواعد هامة:\n1. قم بالتقدير بناءً على حجم الحصة المعتاد.\n2. إذا لم تتمكن من الحكم بدقة، فقدم التقدير الأكثر منطقية.`
    };
    
    const lang = localStorage.getItem('appLang') || 'zh-TW';
    const prompt = promptMap[lang] || promptMap['en'];

    try {
        console.log("Sending Text-only AI request with lang:", lang);

        // 如果是 Text-only 的模型，有些 Worker 實作可能是吃不同的 payload
        // 這裡我們假設同一個 endpoint 支援只傳遞 text (Google Gemini 可以只接受 text parts)
        const resp = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                contents: [{ parts: [ { text: prompt } ] }] // 沒有 inline_data
            })
        });

        const data = await resp.json();
        
        if (data.error) throw new Error("API Error: " + JSON.stringify(data.error));
        if (!data.candidates || data.candidates.length === 0) throw new Error("AI returned no candidates");

        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        return JSON.parse(text);
        
    } catch (error) {
        console.error("AI Text API Fatal Error:", error);
        alert("文字 AI 分析連線失敗，請稍後再試。\n錯誤訊息: " + error.message);
        throw error;
    }
}
