function mergeDeep(base, override) {
    const output = { ...base };

    Object.entries(override || {}).forEach(([key, value]) => {
        if (
            value
            && typeof value === 'object'
            && !Array.isArray(value)
            && typeof base[key] === 'object'
            && base[key] !== null
        ) {
            output[key] = mergeDeep(base[key], value);
            return;
        }
        output[key] = value;
    });

    return output;
}

const en = {
    brandTitle: 'Woof Cal',
    brandCopy: 'Meals, nutrition, and daily progress in one place.',
    today: 'Today',
    primaryNavLabel: 'Primary navigation',
    feedback: {
        mealNameRequired: 'Meal name is required.',
        mealSaved: 'Meal saved.',
        profileRequired: 'Fill in age, height, weight, and activity first.',
        profileSaved: (target) => `Saved. Daily target: ${target} cal.`
    },
    add: {
        eyebrow: 'Quick logging',
        title: 'Add meal',
        description: 'Add a meal manually or open AI analysis for photo and text input.',
        manualKicker: 'Manual entry',
        manualTitle: 'Meal details',
        name: 'Name',
        mealType: 'Meal type',
        calories: 'Calories',
        protein: 'Protein',
        carbs: 'Carbs',
        fat: 'Fat',
        submit: 'Add meal',
        aiKicker: 'AI analysis',
        aiTitle: 'Analyze a photo or meal description',
        aiCopy: 'Use AI when you want calories and nutrition estimated from an image or text.',
        aiBullets: ['AI photo analysis', 'AI text analysis', 'Review before adding'],
        aiButton: 'Open AI analysis',
        mealTypes: {
            breakfast: 'Breakfast',
            lunch: 'Lunch',
            dinner: 'Dinner',
            snack: 'Snack'
        }
    },
    history: {
        eyebrow: 'Daily review',
        title: 'History',
        description: (date) => `Nutrition records for ${date || 'today'}.`,
        dailyTotal: 'Daily total',
        currentState: 'Current day',
        favorite: 'Favorite',
        delete: 'Delete',
        empty: 'No meals logged for this day.',
        untitledMeal: 'Untitled meal'
    },
    stats: {
        description: 'A quick view of today\'s calorie progress and meal count.',
        target: 'Target',
        progress: 'Progress',
        meals: 'Meals',
        dailyGoal: 'Daily goal',
        caloriesVsTarget: 'Calories vs target',
        entriesToday: 'Entries today',
        insightKicker: 'Daily insight',
        insightTitle: 'Keep the current logging rhythm',
        insightCopy: 'More logged days will make calorie, protein, and weight trends more useful.'
    },
    profile: {
        currentMode: 'Current mode',
        dailyCalories: 'Daily calories',
        mealsPerDay: 'Meals per day',
        presetRegion: 'Preset region',
        gender: 'Gender',
        age: 'Age',
        height: 'Height',
        weight: 'Weight',
        activity: 'Activity',
        goal: 'Goal',
        mealMode: 'Meal mode',
        region: 'Region',
        diningOut: 'Dining out',
        editor: 'Profile editor',
        editorTitle: 'Update nutrition preferences',
        save: 'Save profile',
        genders: { male: 'Male', female: 'Female' },
        activities: {
            '1.2': 'Sedentary',
            '1.375': 'Light',
            '1.55': 'Moderate',
            '1.725': 'High'
        }
    }
};

const zhTW = mergeDeep(en, {
    brandCopy: '在同一個地方記錄餐點、營養與每日進度。',
    today: '今天',
    primaryNavLabel: '主要導覽',
    feedback: {
        mealNameRequired: '請輸入餐點名稱。',
        mealSaved: '餐點已儲存。',
        profileRequired: '請先填寫年齡、身高、體重與活動量。',
        profileSaved: (target) => `已儲存，每日目標為 ${target} cal。`
    },
    add: {
        eyebrow: '快速記錄',
        title: '新增餐點',
        description: '可手動新增餐點，也能開啟 AI 照片或文字分析。',
        manualKicker: '手動輸入',
        manualTitle: '餐點內容',
        name: '名稱',
        mealType: '餐次',
        calories: '熱量',
        protein: '蛋白質',
        carbs: '碳水',
        fat: '脂肪',
        submit: '加入今天',
        aiKicker: 'AI 分析',
        aiTitle: '分析餐點照片或文字描述',
        aiCopy: '需要從照片或文字估算熱量與營養時，可使用 AI 分析。',
        aiBullets: ['AI照片分析', 'AI文字分析', '加入前可先確認內容'],
        aiButton: '開啟 AI 分析',
        mealTypes: { breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snack: '點心' }
    },
    history: {
        eyebrow: '每日回顧',
        title: '歷史紀錄',
        description: (date) => `${date || '今天'}的營養紀錄。`,
        dailyTotal: '今日合計',
        currentState: '當日記錄',
        favorite: '加入常吃',
        delete: '刪除',
        empty: '這一天還沒有餐點記錄。',
        untitledMeal: '未命名餐點'
    },
    stats: {
        description: '快速查看今天的熱量進度與餐點數量。',
        target: '目標',
        progress: '進度',
        meals: '餐點',
        dailyGoal: '每日目標',
        caloriesVsTarget: '熱量與目標',
        entriesToday: '今日記錄數',
        insightKicker: '今日觀察',
        insightTitle: '維持現在的記錄節奏',
        insightCopy: '累積更多記錄後，熱量、蛋白質與體重趨勢會更有參考價值。'
    },
    profile: {
        currentMode: '目前模式',
        dailyCalories: '每日熱量',
        mealsPerDay: '每日餐次',
        presetRegion: '預設地區',
        gender: '性別',
        age: '年齡',
        height: '身高',
        weight: '體重',
        activity: '活動量',
        goal: '目標',
        mealMode: '餐次模式',
        region: '地區',
        diningOut: '外食頻率',
        editor: '個人資料編輯',
        editorTitle: '更新營養偏好',
        save: '儲存個人資料',
        genders: { male: '男', female: '女' },
        activities: {
            '1.2': '久坐',
            '1.375': '輕度活動',
            '1.55': '中度活動',
            '1.725': '高度活動'
        }
    }
});

const zhCN = mergeDeep(en, {
    brandCopy: '在同一个地方记录餐点、营养与每日进度。',
    today: '今天',
    primaryNavLabel: '主要导航',
    feedback: {
        mealNameRequired: '请输入餐点名称。',
        mealSaved: '餐点已保存。',
        profileRequired: '请先填写年龄、身高、体重与活动量。',
        profileSaved: (target) => `已保存，每日目标为 ${target} cal。`
    },
    add: {
        eyebrow: '快速记录',
        title: '新增餐点',
        description: '可手动新增餐点，也能打开 AI 照片或文字分析。',
        manualKicker: '手动输入',
        manualTitle: '餐点内容',
        name: '名称',
        mealType: '餐次',
        calories: '热量',
        protein: '蛋白质',
        carbs: '碳水',
        fat: '脂肪',
        submit: '加入今天',
        aiKicker: 'AI 分析',
        aiTitle: '分析餐点照片或文字描述',
        aiCopy: '需要从照片或文字估算热量与营养时，可使用 AI 分析。',
        aiBullets: ['AI照片分析', 'AI文字分析', '加入前可先确认内容'],
        aiButton: '打开 AI 分析',
        mealTypes: { breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snack: '点心' }
    },
    history: {
        eyebrow: '每日回顾',
        title: '历史记录',
        description: (date) => `${date || '今天'}的营养记录。`,
        dailyTotal: '今日合计',
        currentState: '当日记录',
        favorite: '加入常吃',
        delete: '删除',
        empty: '这一天还没有餐点记录。',
        untitledMeal: '未命名餐点'
    },
    stats: {
        description: '快速查看今天的热量进度与餐点数量。',
        target: '目标',
        progress: '进度',
        meals: '餐点',
        dailyGoal: '每日目标',
        caloriesVsTarget: '热量与目标',
        entriesToday: '今日记录数',
        insightKicker: '今日观察',
        insightTitle: '保持现在的记录节奏',
        insightCopy: '积累更多记录后，热量、蛋白质与体重趋势会更有参考价值。'
    },
    profile: {
        currentMode: '当前模式',
        dailyCalories: '每日热量',
        mealsPerDay: '每日餐次',
        presetRegion: '预设地区',
        gender: '性别',
        age: '年龄',
        height: '身高',
        weight: '体重',
        activity: '活动量',
        goal: '目标',
        mealMode: '餐次模式',
        region: '地区',
        diningOut: '外食频率',
        editor: '个人资料编辑',
        editorTitle: '更新营养偏好',
        save: '保存个人资料',
        genders: { male: '男', female: '女' },
        activities: {
            '1.2': '久坐',
            '1.375': '轻度活动',
            '1.55': '中度活动',
            '1.725': '高度活动'
        }
    }
});

const catalog = { en, 'zh-TW': zhTW, 'zh-CN': zhCN };

export function getStandaloneUiCopy(lang = 'en') {
    return catalog[lang]
        || catalog[String(lang || 'en').split('-')[0]]
        || catalog.en;
}
