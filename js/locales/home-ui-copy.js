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

function formatKcal(value) {
    return `${Math.round(Number(value) || 0)} kcal`;
}

const en = {
    heroEyebrowEmpty: 'Companion check-in',
    heroEyebrowActive: 'Today with your companion',
    heroTitleEmpty: 'Start your first meal today',
    heroTitleActive: ({ loggedMeals, plannedMeals }) => `${loggedMeals}/${plannedMeals} meal moments logged today`,
    heroSummaryBase: 'Keep the companion card as the hero so Home stays easy to scan, not form-heavy.',
    heroSummaryActive: 'You already have momentum. Keep the next log small, clear, and easy to review.',
    heroActionLog: 'Add meal',
    heroActionCommonFoods: 'Common foods',
    heroActionManual: 'Manual entry',
    heroActionFavorites: 'Favorites',
    headlineEmpty: 'Start your first meal',
    headlineProgress: 'Nice momentum today',
    headlineComplete: 'Great progress today',
    dailyCaloriesTitle: 'Daily calories',
    remainingLabel: 'Remaining',
    macroFocusEyebrow: '3 macro focus',
    macroFocusTitle: 'Macros',
    macroFocusHint: 'Open the nutrition summary to review all 8 nutrient fields.',
    mealDiaryEyebrow: 'Meal diary',
    previousDate: 'Previous date',
    nextDate: 'Next date',
    appName: 'Woof Cal',
    screenTitle: 'Today',
    logHubTitle: 'Log today\'s meals',
    logHubCopyEmpty: 'Choose the fastest path first, then keep detailed editing in the secondary flow.',
    logHubCopyActive: 'Keep logging easy here, then open the deeper flow only when you need detailed edits.',
    logHubFavoritesButton: 'Favorites',
    logHubFavoritesCopy: 'Pick from foods you save often.',
    logHubManualButton: 'Add food',
    logHubManualCopy: 'Open Add and start directly with AI photo analysis.',
    mealListTitle: 'Today\'s meals',
    commonFoodsTitle: 'Common foods',
    commonFoodsHint: 'Start from a familiar meal and adjust only when you need to.',
    commonFoodsMeta: (regionLabel) => `${regionLabel} suggestions`,
    commonFoodsButton: 'Add this meal to today',
    commonFoodsAdvancedButton: 'Use this in manual entry',
    manualAdvancedTitle: 'Advanced manual entry',
    manualModalTitle: 'Manual meal entry',
    manualModalHint: 'Use this when you need a custom food or full nutrition details.',
    todayMealsKicker: 'Daily diary',
    todayMealsTitle: 'Today\'s meals',
    todayMealsHint: 'Keep today visible here without turning Home into a form.',
    overviewTitle: 'Today at a glance',
    overviewHint: 'Open the full nutrition summary',
    signals: {
        protein: 'Protein pace',
        meals: 'Meal rhythm'
    },
    signalProteinToGoal: (remaining) => `${remaining}g to goal`,
    signalProteinOnTrack: 'Protein is on track',
    signalMealsEmpty: 'Log the first meal to start today\'s rhythm.',
    signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
        loggedMeals < plannedMeals && nextMealLabel
            ? `${loggedMeals}/${plannedMeals} logged. ${nextMealLabel} is the next anchor.`
            : `${loggedMeals} meal moments logged today.`
    ),
    statLabels: {
        streak: 'Streak',
        meals: 'Meals',
        protein: 'Protein'
    },
    petStage: {
        kicker: 'Interactive companion',
        bondLabel: 'Bond',
        energyLabel: 'Energy',
        streakLabel: 'Streak',
        dayUnit: 'd',
        tapLabel: 'Interact with your companion',
        tapHint: 'Tap the dog for a mood check.',
        nextMealHint: 'Next: {meal}',
        feedAction: 'Feed / add meal',
        carePanelLabel: 'Companion nutrition status'
    },
    formatDayCount: (value) => `${value}d`,
    formatMealCoverage: (loggedMeals, plannedMeals) => `${loggedMeals}/${plannedMeals}`,
    formatProteinPace: (current, target) => target > 0 ? `${current}/${target}g` : `${current}g`,
    quickActions: 'Quick actions',
    today: 'Today',
    overview: 'Signals',
    pet: 'Companion status',
    progress: 'Progress',
    companion: 'Start your first meal today',
    quickLog: 'Quick logging',
    summary: 'A calmer read on today, with the next action close by.',
    open: 'Open',
    changeDate: 'Change date',
    statusOnTrack: 'On track',
    statusKeepGoing: 'Keep going',
    emptyMeal: 'Nothing logged yet',
    caloriesRemaining: (remaining = 0) => `${Number(remaining) || 0} kcal left`,
    proteinRemaining: (remaining = 0) => `${Number(remaining) || 0}g to goal`,
    proteinOnTrack: 'Protein is on track today',
    metrics: {
        calories: 'Calories',
        protein: 'Protein',
        meals: 'Meals'
    },
    mealGroupMeta: (count, totalCalories) => `${Number(count) || 0} items / ${formatKcal(totalCalories)}`
};

const zhTW = mergeDeep(en, {
    heroEyebrowEmpty: '陪伴狀態',
    heroEyebrowActive: '今天和汪卡一起記錄',
    heroTitleEmpty: '先記下今天的第一餐',
    heroTitleActive: ({ loggedMeals, plannedMeals }) => `今天已記錄 ${loggedMeals}/${plannedMeals} 次餐食`,
    heroSummaryBase: '把寵物卡放回首頁主角，首頁只保留最重要的進度與下一步，不再像一張大表單。',
    heroSummaryActive: '你今天已經有節奏了。下一筆只要維持簡潔，回顧就會更輕鬆。',
    heroActionLog: '新增餐點',
    heroActionCommonFoods: '常用餐點',
    heroActionManual: '手動輸入',
    heroActionFavorites: '常吃收藏',
    headlineEmpty: '先開始今天第一餐',
    headlineProgress: '今天節奏不錯',
    headlineComplete: '今天進度很穩',
    dailyCaloriesTitle: '今日熱量',
    remainingLabel: '剩餘',
    macroFocusEyebrow: '三大營養重點',
    macroFocusTitle: '三大營養素',
    macroFocusHint: '打開營養摘要即可查看完整 8 項營養資訊。',
    mealDiaryEyebrow: '餐點日記',
    previousDate: '前一天',
    nextDate: '後一天',
    screenTitle: '今天',
    logHubTitle: '記錄今天的飲食',
    logHubCopyEmpty: '先用最快的入口開始，把細節編輯留給下一步。',
    logHubCopyActive: '這裡維持快速記錄，真的需要細修時再往後走。',
    logHubFavoritesButton: '常吃收藏',
    logHubFavoritesCopy: '從你常吃的食物裡快速加入。',
    logHubManualButton: '新增食物',
    logHubManualCopy: '前往新增介面，直接使用 AI 照片分析食物。',
    mealListTitle: '今天吃了什麼',
    commonFoodsTitle: '常用餐點',
    commonFoodsHint: '先從熟悉的餐點開始，再按需要微調。',
    commonFoodsMeta: (regionLabel) => `${regionLabel} 推薦`,
    commonFoodsButton: '直接加入今天',
    commonFoodsAdvancedButton: '改用手動輸入微調',
    manualAdvancedTitle: '進階手動輸入',
    manualModalTitle: '手動新增餐點',
    manualModalHint: '當你需要完整自訂食物與營養內容時再使用。',
    todayMealsKicker: '飲食日記',
    todayMealsTitle: '今天的餐點',
    todayMealsHint: '今天吃過的內容都整理在這裡，首頁保持乾淨好讀。',
    overviewTitle: '今天先看這些',
    overviewHint: '點開即可查看完整營養摘要',
    signals: {
        protein: '蛋白質節奏',
        meals: '餐次節奏'
    },
    signalProteinToGoal: (remaining) => `距離目標還差 ${remaining}g`,
    signalProteinOnTrack: '蛋白質攝取節奏正常',
    signalMealsEmpty: '記下第一餐，就能開始建立今天的節奏。',
    signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
        loggedMeals < plannedMeals && nextMealLabel
            ? `已記錄 ${loggedMeals}/${plannedMeals} 次餐食，下一步可先安排 ${nextMealLabel}。`
            : `今天已記錄 ${loggedMeals} 次餐食。`
    ),
    statLabels: {
        streak: '連續',
        meals: '餐次',
        protein: '蛋白質'
    },
    petStage: {
        kicker: '互動汪卡',
        bondLabel: '羈絆',
        energyLabel: '能量',
        streakLabel: '連續',
        dayUnit: '天',
        tapLabel: '和夥伴互動',
        tapHint: '點一下狗狗，看看牠現在的心情。',
        nextMealHint: '下一餐：{meal}',
        feedAction: '餵食 / 新增餐點',
        carePanelLabel: '狗狗營養狀態'
    },
    quickActions: '快速操作',
    today: '今天',
    overview: '今日重點',
    pet: '陪伴狀態',
    progress: '進度',
    companion: '先記下今天的第一餐',
    quickLog: '快速記錄',
    summary: '先看今天的進度，再用最輕的方式記下下一餐。',
    open: '查看',
    changeDate: '選擇日期',
    statusOnTrack: '節奏穩定',
    statusKeepGoing: '繼續保持',
    emptyMeal: '還沒有記錄',
    caloriesRemaining: (remaining = 0) => `還剩 ${Number(remaining) || 0} kcal`,
    proteinRemaining: (remaining = 0) => `蛋白質還差 ${Number(remaining) || 0}g`,
    proteinOnTrack: '蛋白質表現穩定',
    metrics: {
        calories: '熱量',
        protein: '蛋白質',
        meals: '餐次'
    },
    mealGroupMeta: (count, totalCalories) => `${Number(count) || 0} 項 / ${formatKcal(totalCalories)}`
});

const zhCN = mergeDeep(en, {
    heroEyebrowEmpty: '陪伴状态',
    heroEyebrowActive: '今天和汪卡一起记录',
    heroTitleEmpty: '先记下今天的第一餐',
    heroTitleActive: ({ loggedMeals, plannedMeals }) => `今天已记录 ${loggedMeals}/${plannedMeals} 次餐食`,
    heroSummaryBase: '把宠物卡放回首页主角，首页只保留最重要的进度与下一步，不再像一张大表单。',
    heroSummaryActive: '你今天已经有节奏了。下一笔只要保持简洁，回顾就会更轻松。',
    heroActionLog: '新增餐点',
    heroActionCommonFoods: '常用餐点',
    heroActionManual: '手动输入',
    heroActionFavorites: '常吃收藏',
    headlineEmpty: '先开始今天第一餐',
    headlineProgress: '今天节奏不错',
    headlineComplete: '今天进度很稳',
    dailyCaloriesTitle: '今日热量',
    remainingLabel: '剩余',
    macroFocusEyebrow: '三大营养重点',
    macroFocusTitle: '三大营养素',
    macroFocusHint: '打开营养摘要即可查看完整 8 项营养信息。',
    mealDiaryEyebrow: '餐点日记',
    previousDate: '前一天',
    nextDate: '后一天',
    screenTitle: '今天',
    logHubTitle: '记录今天的饮食',
    logHubCopyEmpty: '先用最快的入口开始，把细节编辑留到下一步。',
    logHubCopyActive: '这里保持快速记录，真的需要细调时再往后走。',
    logHubFavoritesButton: '常吃收藏',
    logHubFavoritesCopy: '从你常吃的食物里快速加入。',
    logHubManualButton: '新增食物',
    logHubManualCopy: '前往新增界面，直接使用 AI 照片分析食物。',
    mealListTitle: '今天吃了什么',
    commonFoodsTitle: '常用餐点',
    commonFoodsHint: '先从熟悉的餐点开始，再按需要微调。',
    commonFoodsMeta: (regionLabel) => `${regionLabel} 推荐`,
    commonFoodsButton: '直接加入今天',
    commonFoodsAdvancedButton: '改用手动输入微调',
    manualAdvancedTitle: '进阶手动输入',
    manualModalTitle: '手动新增餐点',
    manualModalHint: '当你需要完整自定义食物与营养内容时再使用。',
    todayMealsKicker: '饮食日记',
    todayMealsTitle: '今天的餐点',
    todayMealsHint: '今天吃过的内容都整理在这里，首页保持干净好读。',
    overviewTitle: '今天先看这些',
    overviewHint: '点开即可查看完整营养摘要',
    signals: {
        protein: '蛋白质节奏',
        meals: '餐次节奏'
    },
    signalProteinToGoal: (remaining) => `距离目标还差 ${remaining}g`,
    signalProteinOnTrack: '蛋白质摄取节奏正常',
    signalMealsEmpty: '记下第一餐，就能开始建立今天的节奏。',
    signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
        loggedMeals < plannedMeals && nextMealLabel
            ? `已记录 ${loggedMeals}/${plannedMeals} 次餐食，下一步可先安排 ${nextMealLabel}。`
            : `今天已记录 ${loggedMeals} 次餐食。`
    ),
    statLabels: {
        streak: '连续',
        meals: '餐次',
        protein: '蛋白质'
    },
    petStage: {
        kicker: '互动汪卡',
        bondLabel: '羁绊',
        energyLabel: '能量',
        streakLabel: '连续',
        dayUnit: '天',
        tapLabel: '和伙伴互动',
        tapHint: '点一下狗狗，看看它现在的心情。',
        nextMealHint: '下一餐：{meal}',
        feedAction: '喂食 / 新增餐点',
        carePanelLabel: '狗狗营养状态'
    },
    quickActions: '快速操作',
    today: '今天',
    overview: '今日重点',
    pet: '陪伴状态',
    progress: '进度',
    companion: '先记下今天的第一餐',
    quickLog: '快速记录',
    summary: '先看今天的进度，再用最轻的方式记下下一餐。',
    open: '查看',
    changeDate: '选择日期',
    statusOnTrack: '节奏稳定',
    statusKeepGoing: '继续保持',
    emptyMeal: '还没有记录',
    caloriesRemaining: (remaining = 0) => `还剩 ${Number(remaining) || 0} kcal`,
    proteinRemaining: (remaining = 0) => `蛋白质还差 ${Number(remaining) || 0}g`,
    proteinOnTrack: '蛋白质表现稳定',
    metrics: {
        calories: '热量',
        protein: '蛋白质',
        meals: '餐次'
    },
    mealGroupMeta: (count, totalCalories) => `${Number(count) || 0} 项 / ${formatKcal(totalCalories)}`
});

const catalog = {
    en,
    'zh-TW': zhTW,
    'zh-CN': zhCN
};

export function getHomeUiCopy(lang = 'en') {
    return catalog[lang]
        || catalog[String(lang || 'en').split('-')[0]]
        || catalog.en;
}
