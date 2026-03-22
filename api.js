async function callCloudflareAI(base64, userDesc) {
    const url = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";
    
    const promptMap = {
        "zh-TW": "你是一位營養師。請分析圖片食物的「八大營養指標」加上「膳食纖維」。\n同時，請辨識食物中的各個成分項目及其估計重量，以及給出一個 1-10 分的健康評分。\n回傳純 JSON 格式，欄位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items。\nitems 為陣列，每項包含 name 和 weight (含單位g)。\n\n重要規則：\n1. 請勿高估份量，若不確定請採用「標準市售份量」或「保守估計」。\n2. 除非圖片中有明顯大份量特徵，否則請以「一人份」為基準。\n3. 回覆必須是純 JSON，不要任何多餘文字。\n",
        "zh-CN": "你是一位营养师。请分析图片食物的「八大营养指标」加上「膳食纤维」。\n同时，请辨识食物中的各个成分项目及其估计重量，以及给出一个 1-10 分的健康评分。\n回传纯 JSON 格式，栏位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items。\nitems 为数组，每项包含 name 和 weight (含单位g)。\n\n重要规则：\n1. 请勿高估份量，若不确定请采用「标准市售份量」或「保守估计」。\n2. 除非图片中有明显大份量特征，否则请以「一人份」为基准。\n3. 回覆必须是纯 JSON，不要任何多余文字。\n",
        "en": "You are a nutritionist. Analyze the image for 8 nutritional metrics plus fiber.\nAlso identify the individual food component items with estimated weights, and give a health score (1-10).\nReturn PURE JSON. Fields: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items.\nitems is an array, each with name and weight (include unit g).\n\nCRITICAL INSTRUCTIONS:\n1. Do NOT overestimate portion sizes. Be conservative.\n2. Assume 'standard single serving' unless the image clearly shows a huge portion.\n3. Response MUST be pure JSON only, no extra text.\n",
        "ja": "あなたは栄養士です。画像の食品の8つの栄養指標と食物繊維を分析してください。\nまた各食材の内訳と推定重量、1-10のヘルススコアも回答してください。\n純粋なJSONで返してください。フィールド：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items。\nitemsは配列で各要素にnameとweight（単位g付き）を含みます。\n\n重要なルール：\n1. 分量を過大評価しないでください。標準的な一人前で見積もってください。\n2. 回答は純粋なJSONのみ、余分なテキストは不要です。\n",
        "ko": "당신은 영양사입니다. 이미지 속 음식의 8가지 영양 지표와 식이섬유를 분석하세요.\n또한 각 식재료 항목과 추정 중량, 1-10점의 건강 점수를 제공하세요.\n순수 JSON 형식으로 반환하세요. 필드: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items.\nitems는 배열이며 각 항목에 name과 weight(단위 g 포함)를 포함합니다.\n\n중요한 규칙:\n1. 1인분을 기준으로 하며 과대평가하지 마세요.\n2. 응답은 순수 JSON만, 추가 텍스트 없이.\n",
        "ar": "أنت أخصائي تغذية. قم بتحليل المؤشرات الغذائية الثمانية للطعام في الصورة بالإضافة إلى الألياف.\nكما حدد مكونات الطعام مع الأوزان المقدرة، وأعطِ درجة صحية (1-10).\nقم بإرجاع النتيجة بتنسيق JSON النقي. الحقول: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items.\nitems مصفوفة تحتوي على name و weight (مع الوحدة g).\n\nقواعد هامة:\n1. لا تبالغ في تقدير حجم الحصة. استخدم تقديرًا محافظًا بناءً على حصة شخص واحد.\n2. يجب أن تكون الاستجابة JSON نقي فقط.\n"
    };
    
    const lang = localStorage.getItem('appLang') || 'zh-TW';
    let prompt = promptMap[lang] || promptMap['en'];
    
    if(userDesc) {
        prompt += `\n\n[User's supplementary description]: ${userDesc}\n(Please adjust the estimation based on this description.)`;
    }

    try {
        console.log("Sending AI request with lang:", lang);

        const resp = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                contents: [{ parts: [ { text: prompt }, { inline_data: { mime_type: "image/jpeg", data: base64 } } ] }]
            })
        });

        const data = await resp.json();
        
        if (data.error) throw new Error("API Error: " + JSON.stringify(data.error));
        if (!data.candidates || data.candidates.length === 0) throw new Error("AI returned no candidates");

        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        return JSON.parse(text);
        
    } catch (error) {
        console.error("AI API Fatal Error:", error);
        alert("AI 連線失敗，請稍後再試。\n錯誤訊息: " + error.message);
        throw error;
    }
}

async function callCloudflareAIText(userText) {
    const url = "https://nameless-meadow-cf7b.jtwen12345us.workers.dev/";
    
    const promptMap = {
        "zh-TW": `你是一位營養師。請根據使用者輸入的文字描述：「${userText}」，分析它的「八大營養指標」加上「膳食纖維」。\n同時請辨識食物的成分項目及其估計重量，以及給出 1-10 分的健康評分。\n回傳純 JSON 格式，欄位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items。\nitems 為陣列，每項包含 name 和 weight (含單位g)。\n\n重要規則：\n1. 請基於一般常見份量估算。\n2. 回覆必須是純 JSON。`,
        "zh-CN": `你是一位营养师。请根据使用者输入的文字描述：「${userText}」，分析它的「八大营养指标」加上「膳食纤维」。\n同时请辨识食物的成分项目及其估计重量，以及给出 1-10 分的健康评分。\n回传纯 JSON 格式，栏位：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items。\nitems 为数组，每项包含 name 和 weight (含单位g)。\n\n重要规则：\n1. 请基于一般常见份量估算。\n2. 回覆必须是纯 JSON。`,
        "en": `You are a nutritionist. Analyze the following text description: "${userText}" for its 8 nutritional metrics plus fiber.\nAlso identify the food component items with estimated weights, and give a health score (1-10).\nReturn PURE JSON. Fields: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items.\nitems is an array, each with name and weight (include unit g).\n\nCRITICAL INSTRUCTIONS:\n1. Estimate based on standard serving sizes.\n2. Response MUST be pure JSON only.`,
        "ja": `あなたは栄養士です。次のテキスト入力：「${userText}」の8つの栄養指標と食物繊維を分析してください。\nまた各食材の内訳と推定重量、1-10のヘルススコアも回答してください。\n純粋なJSONで返してください。フィールド：foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items。\nitemsは配列で各要素にnameとweight（単位g付き）を含みます。\n\n重要：回答は純粋なJSONのみ。`,
        "ko": `당신은 영양사입니다. 사용자가 입력한 텍스트 묘사: "${userText}" 를 바탕으로 8가지 영양 지표와 식이섬유를 분석하세요.\n또한 각 식재료 항목과 추정 중량, 1-10점의 건강 점수를 제공하세요.\n순수 JSON 형식으로 반환하세요. 필드: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items.\nitems는 배열이며 각 항목에 name과 weight(단위 g 포함)를 포함합니다.\n\n응답은 순수 JSON만.`,
        "ar": `أنت أخصائي تغذية. بناءً على الوصف النصي المدخل: "${userText}"، قم بتحليل المؤشرات الغذائية الثمانية بالإضافة إلى الألياف.\nكما حدد مكونات الطعام مع الأوزان المقدرة، وأعطِ درجة صحية (1-10).\nقم بإرجاع النتيجة بتنسيق JSON النقي. الحقول: foodName, calories, protein, fat, carbohydrate, sugar, sodium, saturatedFat, transFat, fiber, healthScore, items.\nitems مصفوفة تحتوي على name و weight (مع الوحدة g).\n\nيجب أن تكون الاستجابة JSON نقي فقط.`
    };
    
    const lang = localStorage.getItem('appLang') || 'zh-TW';
    const prompt = promptMap[lang] || promptMap['en'];

    try {
        console.log("Sending Text-only AI request with lang:", lang);

        const resp = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                contents: [{ parts: [ { text: prompt } ] }]
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

// Phase 4: 重新計算 - 根據修改後的成分清單重新發送給 AI
async function recalculateFromItems(items) {
    const lang = localStorage.getItem('appLang') || 'zh-TW';
    const itemsText = items.map(it => `${it.name} ${it.weight}`).join(', ');
    return callCloudflareAIText(itemsText);
}
