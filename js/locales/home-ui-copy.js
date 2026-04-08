function mergeDeep(base, override) {
    const output = { ...base };

    Object.entries(override || {}).forEach(([key, value]) => {
        if (value && typeof value === 'object' && !Array.isArray(value) && typeof base[key] === 'object' && base[key] !== null) {
            output[key] = mergeDeep(base[key], value);
            return;
        }
        output[key] = value;
    });

    return output;
}

function formatKcal(value) {
    const safeValue = Number(value) || 0;
    return `${Math.round(safeValue)} kcal`;
}

const en = {
    heroEyebrowEmpty: 'Woof Cal companion',
    heroEyebrowActive: 'Today with your pup',
    heroTitleEmpty: 'Log your first meal today',
    heroTitleActive: ({ loggedMeals, plannedMeals }) => `${loggedMeals}/${plannedMeals} meal moments are already in today`,
    heroSummaryBase: 'Common foods, favorites, and AI stay close at hand when you want a lighter log.',
    heroSummaryActive: 'Keep the next entry light and consistent so the rest of the day stays easy to review.',
    heroActionLog: 'Add a meal',
    heroActionCommonFoods: 'Common foods',
    heroActionManual: 'Manual entry',
    heroActionFavorites: 'Favorites',
    logHubTitle: 'Log today\'s meals',
    logHubCopyEmpty: 'Choose a quick path first. Common foods and favorites stay close, while detailed editing moves to a secondary flow.',
    logHubCopyActive: 'Keep logging easy from here, and leave detailed editing for the secondary flow when you need it.',
    logHubFavoritesButton: 'Favorites',
    logHubFavoritesCopy: 'Pick from foods you already save often.',
    logHubManualButton: 'Manual entry',
    logHubManualCopy: 'Use this only when you need to type a custom food or nutrition.',
    mealListTitle: 'Today\'s meals',
    commonFoodsTitle: 'Common foods',
    commonFoodsHint: 'Choose a familiar dining-out item first. Open more options only when you want to adjust portions or add-ons.',
    commonFoodsMeta: (regionLabel) => `${regionLabel} suggestions`,
    commonFoodsButton: 'Add this food to today',
    manualAdvancedTitle: 'Advanced manual entry',
    manualModalTitle: 'Manual meal entry',
    manualModalHint: 'Use this when you want to type a custom food or adjust detailed nutrition yourself.',
    todayMealsKicker: 'Daily diary',
    todayMealsTitle: 'Today\'s meals',
    todayMealsHint: 'Today\'s meals stay visible here without turning Home into a form.',
    overviewTitle: 'Today at a glance',
    overviewHint: 'Tap for the full nutrition details',
    signals: {
        protein: 'Protein pace',
        meals: 'Meal rhythm'
    },
    signalProteinToGoal: (remaining) => `${remaining}g to today\'s goal`,
    signalProteinOnTrack: 'Protein is on track today',
    signalMealsEmpty: 'One meal log is enough to start today\'s rhythm.',
    signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
        loggedMeals < plannedMeals && nextMealLabel
            ? `${loggedMeals}/${plannedMeals} key meal moments logged. ${nextMealLabel} can be the next anchor.`
            : `${loggedMeals} meal moments logged today.`
    ),
    statLabels: {
        streak: 'Streak',
        meals: 'Meals',
        protein: 'Protein'
    },
    formatDayCount: (value) => `${value}d`,
    formatMealCoverage: (loggedMeals, plannedMeals) => `${loggedMeals}/${plannedMeals}`,
    formatProteinPace: (current, target) => target > 0 ? `${current}/${target}g` : `${current}g`,
    quickActions: 'Quick actions',
    today: 'Today',
    overview: 'Daily signals',
    pet: 'Companion status',
    progress: 'Progress',
    companion: 'Log your first meal today',
    quickLog: 'Quick logging',
    summary: 'A calm read on today, with quick actions close by.',
    open: 'Open',
    changeDate: 'Date',
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
    heroEyebrowEmpty: 'Woof Cal 陪你開始',
    heroEyebrowActive: '今天和狗狗一起記錄',
    heroTitleEmpty: '先記下今天的第一餐',
    heroTitleActive: ({ loggedMeals, plannedMeals }) => `今天已經記錄 ${loggedMeals}/${plannedMeals} 個餐次`,
    heroSummaryBase: '常吃食物、收藏和 AI 都會放在順手的位置，讓你可以用更輕的方式記錄。',
    heroSummaryActive: '下一筆維持輕量和一致，今天其餘時段就更容易整理。',
    heroActionLog: '新增一餐',
    heroActionCommonFoods: '常見外食',
    heroActionManual: '手動輸入',
    heroActionFavorites: '收藏',
    logHubTitle: '記錄今天的餐點',
    logHubCopyEmpty: '先選一條快速入口。常見外食與收藏都會放在前面，詳細編輯則移到次要流程。',
    logHubCopyActive: '這裡維持快速記錄，細部編輯留給需要的時候再打開。',
    logHubFavoritesButton: '收藏',
    logHubFavoritesCopy: '從你常存的食物裡快速選一個。',
    logHubManualButton: '手動輸入',
    logHubManualCopy: '只有在要輸入自訂食物或營養細節時才打開。',
    mealListTitle: '今天的餐次',
    commonFoodsTitle: '常見外食',
    commonFoodsHint: '先選熟悉的外食餐點，只有需要調整份量或加料時再打開更多選項。',
    commonFoodsMeta: (regionLabel) => `${regionLabel} 推薦`,
    commonFoodsButton: '直接加入今天',
    manualAdvancedTitle: '進階手動輸入',
    manualModalTitle: '手動輸入',
    manualModalHint: '需要自訂食物或手動調整營養時，再到這裡輸入。',
    todayMealsKicker: '今日日記',
    todayMealsTitle: '今天的餐次',
    todayMealsHint: '今天吃過的內容會整理在這裡，不會讓首頁變成表單。',
    overviewTitle: '今天先看這兩項',
    overviewHint: '點開可看完整營養',
    signals: {
        protein: '蛋白質節奏',
        meals: '餐次節奏'
    },
    signalProteinToGoal: (remaining) => `距離今天目標還差 ${remaining}g`,
    signalProteinOnTrack: '今天的蛋白質節奏還不錯',
    signalMealsEmpty: '先記下第一餐，就能開始建立今天的節奏。',
    signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
        loggedMeals < plannedMeals && nextMealLabel
            ? `已記錄 ${loggedMeals}/${plannedMeals} 個餐次。下一個可以先記 ${nextMealLabel}。`
            : `今天已記錄 ${loggedMeals} 個餐次。`
    ),
    statLabels: {
        streak: '連續',
        meals: '餐次',
        protein: '蛋白質'
    },
    quickActions: '快速操作',
    today: '今天',
    overview: '今日重點',
    pet: '陪伴狀態',
    progress: '進度',
    companion: '先記下今天的第一餐',
    quickLog: '快速記錄',
    summary: '先看今天的重點，再用簡單的方式把餐點記下來。',
    open: '查看',
    changeDate: '日期',
    statusOnTrack: '節奏正常',
    statusKeepGoing: '繼續維持',
    emptyMeal: '還沒有記錄',
    caloriesRemaining: (remaining = 0) => `還剩 ${Number(remaining) || 0} kcal`,
    proteinRemaining: (remaining = 0) => `還差 ${Number(remaining) || 0}g`,
    proteinOnTrack: '今天的蛋白質節奏正常',
    mealGroupMeta: (count, totalCalories) => `${Number(count) || 0} 項 / ${formatKcal(totalCalories)}`
});

const zhCN = mergeDeep(en, {
    heroEyebrowEmpty: 'Woof Cal 陪你开始',
    heroEyebrowActive: '今天和狗狗一起记录',
    heroTitleEmpty: '先记下今天的第一餐',
    heroTitleActive: ({ loggedMeals, plannedMeals }) => `今天已经记录 ${loggedMeals}/${plannedMeals} 个餐次`,
    heroSummaryBase: '常吃食物、收藏和 AI 都会放在顺手的位置，让你可以用更轻的方式记录。',
    heroSummaryActive: '下一笔维持轻量和一致，今天其余时段就更容易整理。',
    heroActionLog: '新增一餐',
    heroActionCommonFoods: '常见外食',
    heroActionManual: '手动输入',
    heroActionFavorites: '收藏',
    logHubTitle: '记录今天的餐点',
    logHubCopyEmpty: '先选一条快速入口。常见外食与收藏都会放在前面，详细编辑则移到次要流程。',
    logHubCopyActive: '这里维持快速记录，细部编辑留给需要的时候再打开。',
    logHubFavoritesButton: '收藏',
    logHubFavoritesCopy: '从你常存的食物里快速选一个。',
    logHubManualButton: '手动输入',
    logHubManualCopy: '只有在要输入自定义食物或营养细节时才打开。',
    mealListTitle: '今天的餐次',
    commonFoodsTitle: '常见外食',
    commonFoodsHint: '先选熟悉的外食餐点，只有需要调整份量或加料时再打开更多选项。',
    commonFoodsMeta: (regionLabel) => `${regionLabel} 推荐`,
    commonFoodsButton: '直接加入今天',
    manualAdvancedTitle: '进阶手动输入',
    manualModalTitle: '手动输入',
    manualModalHint: '需要自定义食物或手动调整营养时，再到这里输入。',
    todayMealsKicker: '今日日记',
    todayMealsTitle: '今天的餐次',
    todayMealsHint: '今天吃过的内容会整理在这里，不会让首页变成表单。',
    overviewTitle: '今天先看这两项',
    overviewHint: '点开可看完整营养',
    signals: {
        protein: '蛋白质节奏',
        meals: '餐次节奏'
    },
    signalProteinToGoal: (remaining) => `距离今天目标还差 ${remaining}g`,
    signalProteinOnTrack: '今天的蛋白质节奏还不错',
    signalMealsEmpty: '先记下第一餐，就能开始建立今天的节奏。',
    signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
        loggedMeals < plannedMeals && nextMealLabel
            ? `已记录 ${loggedMeals}/${plannedMeals} 个餐次。下一個可以先记 ${nextMealLabel}。`
            : `今天已记录 ${loggedMeals} 个餐次。`
    ),
    statLabels: {
        streak: '连续',
        meals: '餐次',
        protein: '蛋白质'
    },
    quickActions: '快速操作',
    today: '今天',
    overview: '今日重点',
    pet: '陪伴状态',
    progress: '进度',
    companion: '先记下今天的第一餐',
    quickLog: '快速记录',
    summary: '先看今天的重点，再用简单的方式把餐点记下来。',
    open: '查看',
    changeDate: '日期',
    statusOnTrack: '节奏正常',
    statusKeepGoing: '继续维持',
    emptyMeal: '还没有记录',
    caloriesRemaining: (remaining = 0) => `还剩 ${Number(remaining) || 0} kcal`,
    proteinRemaining: (remaining = 0) => `还差 ${Number(remaining) || 0}g`,
    proteinOnTrack: '今天的蛋白质节奏正常',
    mealGroupMeta: (count, totalCalories) => `${Number(count) || 0} 项 / ${formatKcal(totalCalories)}`
});

const ja = mergeDeep(en, {
    heroEyebrowEmpty: 'Woof Cal と一緒にスタート',
    heroEyebrowActive: '今日は愛犬と記録',
    heroTitleEmpty: 'まずは今日の最初の食事を記録',
    heroTitleActive: ({ loggedMeals, plannedMeals }) => `今日は ${loggedMeals}/${plannedMeals} 個の食事が記録済み`,
    heroSummaryBase: 'よく食べるもの、保存した食品、AI をすぐ使える場所に置いて、軽く記録できます。',
    heroActionLog: '食事を追加',
    heroActionCommonFoods: 'よく使う外食',
    heroActionManual: '手動入力',
    heroActionFavorites: 'お気に入り',
    logHubTitle: '今日の食事を記録',
    commonFoodsTitle: 'よく使う外食',
    commonFoodsHint: 'まずは馴染みのある外食を選び、量や追加だけ必要な時に調整します。',
    overviewTitle: '今日はこの2つを先に確認',
    signals: {
        protein: 'たんぱく質の流れ',
        meals: '食事リズム'
    }
});

const ko = mergeDeep(en, {
    heroEyebrowEmpty: 'Woof Cal과 함께 시작',
    heroEyebrowActive: '오늘은 반려견과 함께 기록',
    heroTitleEmpty: '오늘 첫 끼부터 기록해 보세요',
    heroTitleActive: ({ loggedMeals, plannedMeals }) => `오늘은 ${loggedMeals}/${plannedMeals} 끼를 기록했어요`,
    heroSummaryBase: '자주 먹는 음식, 즐겨찾기, AI를 바로 쓸 수 있는 위치에 두어 가볍게 기록할 수 있습니다.',
    heroActionLog: '식사 추가',
    heroActionCommonFoods: '자주 먹는 외식',
    heroActionManual: '수동 입력',
    heroActionFavorites: '즐겨찾기',
    logHubTitle: '오늘의 식사 기록',
    commonFoodsTitle: '자주 먹는 외식',
    commonFoodsHint: '익숙한 외식부터 고르고, 양이나 추가 재료는 필요할 때만 조정하세요.',
    overviewTitle: '오늘은 이 두 가지를 먼저',
    signals: {
        protein: '단백질 흐름',
        meals: '식사 리듬'
    }
});

const ar = mergeDeep(en, {
    direction: 'rtl',
    heroEyebrowEmpty: 'ابدأ مع Woof Cal',
    heroEyebrowActive: 'اليوم مع رفيقك',
    heroTitleEmpty: 'سجّل أول وجبة اليوم',
    heroTitleActive: ({ loggedMeals, plannedMeals }) => `تم تسجيل ${loggedMeals}/${plannedMeals} لحظات وجبات اليوم`,
    heroSummaryBase: 'ضع الأطعمة الشائعة والمفضلة والذكاء الاصطناعي في متناول يدك لتسجيل أخف وأسهل.',
    heroActionLog: 'أضف وجبة',
    heroActionCommonFoods: 'أطعمة شائعة',
    heroActionManual: 'إدخال يدوي',
    heroActionFavorites: 'المفضلة',
    logHubTitle: 'سجّل وجبات اليوم',
    commonFoodsTitle: 'أطعمة شائعة',
    commonFoodsHint: 'ابدأ بعنصر مألوف من الأكل خارج المنزل، وغيّر الكمية أو الإضافات عند الحاجة فقط.',
    overviewTitle: 'اليوم بنظرة سريعة',
    signals: {
        protein: 'وتيرة البروتين',
        meals: 'إيقاع الوجبات'
    }
});

export const homeUiCopyCatalog = {
    en,
    'zh-TW': zhTW,
    'zh-CN': zhCN,
    ja,
    ko,
    ar
};

export function getHomeUiCopy(lang = 'en') {
    return homeUiCopyCatalog[lang] || homeUiCopyCatalog[String(lang || 'en').split('-')[0]] || homeUiCopyCatalog.en;
}

export function hasHomeUiCopy(lang = 'en') {
    return Boolean(homeUiCopyCatalog[lang] || homeUiCopyCatalog[String(lang || 'en').split('-')[0]]);
}
