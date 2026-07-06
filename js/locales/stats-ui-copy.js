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
    eyebrow: 'Weekly Overview',
    title: 'Stats',
    summaryTitle: 'Weekly Summary',
    avgCalories: 'Avg. Calories',
    streak: 'Streak',
    streakMeta: 'days',
    avgProtein: 'Avg. Protein',
    avgProteinMeta: 'steady macro pace',
    macroBalance: 'Macro Balance',
    nutritionSnapshot: 'Nutrition Snapshot',
    trend: 'Trend',
    calorieTrend: 'Calorie Trend',
    protein: 'Protein',
    proteinTrend: 'Protein Intake Trend',
    weightSection: 'Weight',
    weightTrend: 'Weight Trend',
    save: 'Save',
    weightPlaceholder: "Today's weight (kg)",
    targetOverview: 'target overview',
    steadyMacroPace: 'steady macro pace',
    rangeLabelFn: (days) => `${days} Days`,
    onTarget: 'On-Target',
    onTargetMeta: 'days'
};

const zhTW = mergeDeep(en, {
    eyebrow: '週間總覽',
    title: '統計',
    summaryTitle: '每週摘要',
    avgCalories: '平均熱量',
    streak: '連續天數',
    streakMeta: '天',
    avgProtein: '平均蛋白質',
    avgProteinMeta: '穩定營養節奏',
    macroBalance: '巨量營養比例',
    nutritionSnapshot: '營養快照',
    trend: '趨勢',
    calorieTrend: '熱量趨勢',
    protein: '蛋白質',
    proteinTrend: '蛋白質趨勢',
    weightSection: '體重',
    weightTrend: '體重趨勢',
    save: '儲存',
    weightPlaceholder: '今天體重 (kg)',
    targetOverview: '目標概覽',
    steadyMacroPace: '穩定營養節奏',
    rangeLabelFn: (days) => `${days} 天`,
    onTarget: '達標',
    onTargetMeta: '天'
});

const zhCN = mergeDeep(en, {
    eyebrow: '周间总览',
    title: '统计',
    summaryTitle: '每周摘要',
    avgCalories: '平均热量',
    streak: '连续天数',
    streakMeta: '天',
    avgProtein: '平均蛋白质',
    avgProteinMeta: '稳定营养节奏',
    macroBalance: '巨量营养比例',
    nutritionSnapshot: '营养快照',
    trend: '趋势',
    calorieTrend: '热量趋势',
    protein: '蛋白质',
    proteinTrend: '蛋白质趋势',
    weightSection: '体重',
    weightTrend: '体重趋势',
    save: '保存',
    weightPlaceholder: '今天体重 (kg)',
    targetOverview: '目标概览',
    steadyMacroPace: '稳定营养节奏',
    rangeLabelFn: (days) => `${days} 天`,
    onTarget: '达标',
    onTargetMeta: '天'
});

const catalog = {
    en,
    'zh-TW': zhTW,
    'zh-CN': zhCN
};

export function getStatsUiCopy(lang = 'en') {
    return catalog[lang]
        || catalog[String(lang || 'en').split('-')[0]]
        || catalog.en;
}
