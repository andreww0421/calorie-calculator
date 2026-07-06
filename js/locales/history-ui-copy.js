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
    dailySummary: 'Daily Summary',
    protein: 'Protein',
    carbs: 'Carbs',
    fats: 'Fats',
    ofTarget: (target) => `of ${target} cal`,
    setGoal: 'Set a calorie goal',
    statusGreat: 'Great progress today',
    statusOnTrack: 'On track for your goal',
    statusKeepGoing: 'Keep building today',
    statusStart: 'Start with the first meal',
    untitledMeal: 'Untitled meal',
    emptyTitle: 'No meals logged for this day',
    emptyCopy: 'Use Add to log a meal, then your daily summary and nutrition history will update automatically.',
    proteinSuffix: 'protein',
    carbsSuffix: 'carbs',
    fatSuffix: 'fat'
};

const zhTW = mergeDeep(en, {
    dailySummary: '每日摘要',
    protein: '蛋白質',
    carbs: '碳水',
    fats: '脂肪',
    ofTarget: (target) => `目標 ${target} cal`,
    setGoal: '設定熱量目標',
    statusGreat: '今天進度很棒',
    statusOnTrack: '目標達成中',
    statusKeepGoing: '繼續努力',
    statusStart: '從第一餐開始',
    untitledMeal: '未命名餐點',
    emptyTitle: '今天還沒有記錄',
    emptyCopy: '使用「新增」記錄餐點，每日摘要與營養紀錄就會自動更新。',
    proteinSuffix: '蛋白質',
    carbsSuffix: '碳水',
    fatSuffix: '脂肪'
});

const zhCN = mergeDeep(en, {
    dailySummary: '每日摘要',
    protein: '蛋白质',
    carbs: '碳水',
    fats: '脂肪',
    ofTarget: (target) => `目标 ${target} cal`,
    setGoal: '设定热量目标',
    statusGreat: '今天进度很棒',
    statusOnTrack: '目标达成中',
    statusKeepGoing: '继续努力',
    statusStart: '从第一餐开始',
    untitledMeal: '未命名餐点',
    emptyTitle: '今天还没有记录',
    emptyCopy: '使用「新增」记录餐点，每日摘要与营养记录就会自动更新。',
    proteinSuffix: '蛋白质',
    carbsSuffix: '碳水',
    fatSuffix: '脂肪'
});

const catalog = {
    en,
    'zh-TW': zhTW,
    'zh-CN': zhCN
};

export function getHistoryUiCopy(lang = 'en') {
    return catalog[lang]
        || catalog[String(lang || 'en').split('-')[0]]
        || catalog.en;
}
