export const homeUiCopyCatalog = {
    en: {
        heroEyebrowEmpty: 'Woof Cal companion',
        heroEyebrowActive: 'Today with your pup',
        heroTitleEmpty: 'Start with one easy meal log',
        heroTitleActive: ({ loggedMeals, plannedMeals }) => `${loggedMeals}/${plannedMeals} meal moments are already in today`,
        heroSummaryBase: 'Common foods, favorites, and a quick AI scan stay close at hand when you want a lighter log.',
        heroSummaryRegion: (regionLabel, presetCount) => `${presetCount > 0 ? `${presetCount} common foods are ready` : 'Common foods are ready'} for faster dining-out logs in ${regionLabel}.`,
        heroSummaryPreset: (_regionLabel, presetName) => `Common foods are ready. Try ${presetName} when you want the fastest way to log a familiar meal.`,
        heroSummaryActive: 'Keep the next entry light and consistent so the rest of the day stays easy to review.',
        heroActionCommonFoods: 'Common foods',
        quickLogEyebrow: 'Quick log',
        quickLogCopyEmpty: 'Pick a familiar food first. Save detailed nutrition edits for the advanced entry when you really need them.',
        quickLogCopyActive: 'Use a common food, favorite, or AI scan to keep today moving without turning Home into a form.',
        mealListTitle: 'Today\'s meals',
        commonFoodsTitle: 'Common foods quick select',
        commonFoodsHint: 'Choose a familiar dining-out item, adjust the simple modifiers, and add it in one step.',
        commonFoodsMeta: (regionLabel) => `${regionLabel} suggestions`,
        commonFoodsButton: 'Add this food to today',
        commonFoodsAdvancedButton: 'Use this in advanced manual entry',
        manualAdvancedTitle: 'Advanced manual entry',
        manualAdvancedHint: 'Open only when you want to type a custom food or edit nutrition by hand.',
        overviewTitle: 'Today at a glance',
        overviewHint: 'Tap for the full nutrition details',
        signals: {
            protein: 'Protein pace',
            meals: 'Meal rhythm'
        },
        signalProteinToGoal: (remaining) => `${remaining}g to today\'s goal`,
        signalProteinOnTrack: 'On a steady protein pace',
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
        formatProteinPace: (current, target) => target > 0 ? `${current}/${target}g` : `${current}g`
    },
    'zh-CN': {
        heroEyebrowEmpty: '今日陪伴',
        heroEyebrowActive: '今天和小狗一起',
        heroTitleEmpty: '先记下今天的第一餐',
        heroTitleActive: ({ loggedMeals, plannedMeals }) => `今天已经有 ${loggedMeals}/${plannedMeals} 段餐次就位`,
        heroSummaryBase: '快速记录、外食 preset 和每日节奏都会在这里陪你一起跑。',
        heroSummaryRegion: (regionLabel, presetCount) => `${regionLabel} 的外食 preset 已经准备好${presetCount > 0 ? ` (${presetCount})` : ''}。`,
        heroSummaryPreset: (regionLabel, presetName) => `${regionLabel} 的 preset 已经准备好，想快速记录时可以先从 ${presetName} 开始。`,
        heroSummaryActive: '下一笔继续轻快记下，今天的节奏就会更容易维持。',
        quickLogEyebrow: '快速记下',
        quickLogCopyEmpty: '可以先用外食 preset、AI 或手动输入帮今天开个头。',
        quickLogCopyActive: '快速记下下一餐，后面的饮食节奏会更容易跟上。',
        mealListTitle: '今天的餐次',
        overviewTitle: '今天先看这两个重点',
        overviewHint: '点击可查看完整营养信息',
        signals: {
            protein: '蛋白质节奏',
            meals: '餐次节奏'
        },
        signalProteinToGoal: (remaining) => `距离今天的蛋白质目标还差 ${remaining}g`,
        signalProteinOnTrack: '今天的蛋白质节奏算稳',
        signalMealsEmpty: '先记下一餐，今天的节奏就会开始浮现。',
        signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
            loggedMeals < plannedMeals && nextMealLabel
                ? `已经记下 ${loggedMeals}/${plannedMeals} 段关键餐次，下一个可以先补 ${nextMealLabel}。`
                : `今天已经记下 ${loggedMeals} 段餐次。`
        ),
        statLabels: {
            streak: '连续',
            meals: '餐次',
            protein: '蛋白质'
        },
        formatDayCount: (value) => `${value} 天`,
        formatMealCoverage: (loggedMeals, plannedMeals) => `${loggedMeals}/${plannedMeals}`,
        formatProteinPace: (current, target) => target > 0 ? `${current}/${target}g` : `${current}g`
    },
    ja: {
        heroEyebrowEmpty: 'きょうの相棒',
        heroEyebrowActive: 'きょうもワンちゃんと一緒',
        heroTitleEmpty: 'まずは今日の一食を記録しよう',
        heroTitleActive: ({ loggedMeals, plannedMeals }) => `今日は ${loggedMeals}/${plannedMeals} 回の食事が記録済み`,
        heroSummaryBase: 'クイック記録、外食プリセット、毎日のリズムをここでまとめて見られます。',
        heroSummaryRegion: (regionLabel, presetCount) => `${regionLabel} の外食プリセットが使えます${presetCount > 0 ? ` (${presetCount})` : ''}。`,
        heroSummaryPreset: (regionLabel, presetName) => `${regionLabel} のプリセットが使えます。素早く記録したいときは ${presetName} から始められます。`,
        heroSummaryActive: '次の一食も軽く記録して、今日の流れを整えましょう。',
        quickLogEyebrow: 'クイック記録',
        quickLogCopyEmpty: '外食プリセット、AI、手入力のどれでも今日を始められます。',
        quickLogCopyActive: '次の一食を素早く残して、今日の流れを見やすく保ちましょう。',
        mealListTitle: '今日の食事',
        overviewTitle: '今日の要点はこの2つ',
        overviewHint: 'タップすると詳しい栄養情報を見られます',
        signals: {
            protein: 'たんぱく質ペース',
            meals: '食事リズム'
        },
        signalProteinToGoal: (remaining) => `今日のたんぱく質目標まであと ${remaining}g`,
        signalProteinOnTrack: 'たんぱく質のペースは安定しています',
        signalMealsEmpty: 'まず一食記録すると、今日のリズムが見え始めます。',
        signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
            loggedMeals < plannedMeals && nextMealLabel
                ? `${loggedMeals}/${plannedMeals} 回の大事な食事を記録済み。次は ${nextMealLabel} が目安です。`
                : `今日は ${loggedMeals} 回の食事を記録済みです。`
        ),
        statLabels: {
            streak: '連続',
            meals: '食事',
            protein: 'たんぱく質'
        },
        formatDayCount: (value) => `${value}日`,
        formatMealCoverage: (loggedMeals, plannedMeals) => `${loggedMeals}/${plannedMeals}`,
        formatProteinPace: (current, target) => target > 0 ? `${current}/${target}g` : `${current}g`
    },
    ko: {
        heroEyebrowEmpty: '오늘의 동반자',
        heroEyebrowActive: '오늘도 강아지와 함께',
        heroTitleEmpty: '오늘의 첫 끼부터 가볍게 기록하세요',
        heroTitleActive: ({ loggedMeals, plannedMeals }) => `오늘은 ${loggedMeals}/${plannedMeals}번의 식사가 이미 기록됐어요`,
        heroSummaryBase: '빠른 기록, 외식 프리셋, 하루 리듬을 여기서 함께 챙길 수 있어요.',
        heroSummaryRegion: (regionLabel, presetCount) => `${regionLabel} 외식 프리셋이 준비되어 있어요${presetCount > 0 ? ` (${presetCount})` : ''}.`,
        heroSummaryPreset: (regionLabel, presetName) => `${regionLabel} 프리셋이 준비되어 있어요. 빠르게 기록하고 싶다면 ${presetName}부터 시작하세요.`,
        heroSummaryActive: '다음 식사도 가볍게 기록하면 오늘의 흐름을 더 편하게 유지할 수 있어요.',
        quickLogEyebrow: '빠른 기록',
        quickLogCopyEmpty: '외식 프리셋, AI, 수동 입력 중 편한 방식으로 오늘을 시작하세요.',
        quickLogCopyActive: '다음 식사를 빠르게 기록하고 오늘의 흐름을 편하게 이어가세요.',
        mealListTitle: '오늘의 식사',
        overviewTitle: '오늘은 이 두 가지를 먼저 보면 충분해요',
        overviewHint: '누르면 전체 영양 정보를 볼 수 있어요',
        signals: {
            protein: '단백질 흐름',
            meals: '식사 리듬'
        },
        signalProteinToGoal: (remaining) => `오늘 단백질 목표까지 ${remaining}g 남았어요`,
        signalProteinOnTrack: '오늘 단백질 흐름은 안정적이에요',
        signalMealsEmpty: '한 끼만 먼저 기록해도 오늘의 리듬이 보이기 시작해요.',
        signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
            loggedMeals < plannedMeals && nextMealLabel
                ? `${loggedMeals}/${plannedMeals}개의 핵심 식사를 기록했어요. 다음은 ${nextMealLabel}을 채워보세요.`
                : `오늘은 ${loggedMeals}개의 식사를 기록했어요.`
        ),
        statLabels: {
            streak: '연속',
            meals: '식사',
            protein: '단백질'
        },
        formatDayCount: (value) => `${value}일`,
        formatMealCoverage: (loggedMeals, plannedMeals) => `${loggedMeals}/${plannedMeals}`,
        formatProteinPace: (current, target) => target > 0 ? `${current}/${target}g` : `${current}g`
    },
    ar: {
        heroEyebrowEmpty: 'رفيق ووف كال',
        heroEyebrowActive: 'اليوم مع كلبك',
        heroTitleEmpty: 'ابدأ بتسجيل أول وجبة اليوم',
        heroTitleActive: ({ loggedMeals, plannedMeals }) => `تم تسجيل ${loggedMeals}/${plannedMeals} من محطات الوجبات اليوم`,
        heroSummaryBase: 'التسجيل السريع وإعدادات الأكل خارج المنزل وإيقاع يومك كلها قريبة منك هنا.',
        heroSummaryRegion: (regionLabel, presetCount) => `إعدادات ${regionLabel} الجاهزة متاحة لتسجيل الأكل خارج المنزل${presetCount > 0 ? ` (${presetCount})` : ''}.`,
        heroSummaryPreset: (regionLabel, presetName) => `إعدادات ${regionLabel} الجاهزة متاحة. ابدأ بـ ${presetName} عندما تريد تسجيلاً أسرع.`,
        heroSummaryActive: 'أضف الوجبة التالية بسرعة ليبقى إيقاع اليوم واضحاً وسهل المتابعة.',
        quickLogEyebrow: 'تسجيل سريع',
        quickLogCopyEmpty: 'ابدأ اليوم بإعداد جاهز للمطاعم أو بالذكاء الاصطناعي أو بإدخال يدوي سريع.',
        quickLogCopyActive: 'سجّل الوجبة التالية بسرعة ثم راقب بقية اليوم بسهولة.',
        mealListTitle: 'وجبات اليوم',
        overviewTitle: 'نظرة سريعة على أهم نقطتين اليوم',
        overviewHint: 'اضغط لعرض تفاصيل التغذية الكاملة',
        signals: {
            protein: 'إيقاع البروتين',
            meals: 'إيقاع الوجبات'
        },
        signalProteinToGoal: (remaining) => `تبقّى ${remaining}g لهدف البروتين اليوم`,
        signalProteinOnTrack: 'إيقاع البروتين اليوم ثابت',
        signalMealsEmpty: 'يكفي تسجيل وجبة واحدة لتبدأ صورة اليوم بالظهور.',
        signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
            loggedMeals < plannedMeals && nextMealLabel
                ? `تم تسجيل ${loggedMeals}/${plannedMeals} من الوجبات الأساسية. يمكن أن تكون ${nextMealLabel} المحطة التالية.`
                : `تم تسجيل ${loggedMeals} من الوجبات اليوم.`
        ),
        statLabels: {
            streak: 'الاستمرارية',
            meals: 'الوجبات',
            protein: 'البروتين'
        },
        formatDayCount: (value) => `${value} يوم`,
        formatMealCoverage: (loggedMeals, plannedMeals) => `${loggedMeals}/${plannedMeals}`,
        formatProteinPace: (current, target) => target > 0 ? `${current}/${target}g` : `${current}g`
    },
    'zh-TW': {
        heroEyebrowEmpty: '\u6c6a\u5361\u4eca\u65e5\u966a\u4f34',
        heroEyebrowActive: '\u4eca\u5929\u548c\u6c6a\u6c6a\u4e00\u8d77',
        heroTitleEmpty: '\u5148\u8a18\u4e0b\u4eca\u5929\u7684\u7b2c\u4e00\u9910',
        heroTitleActive: ({ loggedMeals, plannedMeals }) => `\u4eca\u5929\u5df2\u7d93\u6709 ${loggedMeals}/${plannedMeals} \u6bb5\u9910\u6b21\u5c31\u4f4d`,
        heroSummaryBase: '\u5e38\u898b\u5916\u98df\u3001\u6536\u85cf\u8207 AI \u5feb\u901f\u5206\u6790\u90fd\u6703\u5728\u9019\u88e1\u966a\u4f60\u8f15\u9b06\u8a18\u4e0b\u4eca\u5929\u3002',
        heroSummaryRegion: (regionLabel, presetCount) => `${regionLabel} \u7684\u5e38\u7528\u5916\u98df\u5df2\u7d93\u6e96\u5099\u597d${presetCount > 0 ? ` (${presetCount})` : ''}\uff0c\u9700\u8981\u6642\u53ef\u4ee5\u76f4\u63a5\u5feb\u901f\u52a0\u5165\u3002`,
        heroSummaryPreset: (_regionLabel, presetName) => `\u60f3\u5feb\u4e00\u9ede\u8a18\u9304\u6642\uff0c\u53ef\u4ee5\u5148\u5f9e ${presetName} \u9019\u985e\u5e38\u898b\u9910\u9ede\u958b\u59cb\u3002`,
        heroSummaryActive: '\u4e0b\u4e00\u7b46\u7e7c\u7e8c\u8f15\u5feb\u8a18\u4e0b\uff0c\u4eca\u5929\u7684\u7bc0\u594f\u5c31\u6703\u66f4\u5bb9\u6613\u7dad\u6301\u3002',
        heroActionCommonFoods: '\u5e38\u7528\u5916\u98df',
        quickLogEyebrow: '\u5feb\u901f\u8a18\u4e0b',
        quickLogCopyEmpty: '\u5148\u7528\u5e38\u898b\u5916\u98df\u958b\u55ae\uff0c\u9700\u8981\u81ea\u8a02\u71df\u990a\u7d30\u7bc0\u6642\u518d\u5c55\u958b\u9032\u968e\u8f38\u5165\u3002',
        quickLogCopyActive: '\u5feb\u901f\u88dc\u4e0b\u4e00\u9910\uff0c\u8b93 Home \u4fdd\u6301\u8f15\u76c8\uff0c\u8a73\u7d30\u8f38\u5165\u7559\u7d66\u9032\u968e\u6d41\u7a0b\u3002',
        mealListTitle: '\u4eca\u5929\u7684\u9910\u6b21',
        commonFoodsTitle: '\u5e38\u7528\u5916\u98df\u5feb\u901f\u52a0\u5165',
        commonFoodsHint: '\u5148\u9078\u4e00\u500b\u5e38\u898b\u9910\u9ede\uff0c\u8abf\u6574\u7c21\u55ae\u4efd\u91cf\u6216\u98f2\u6599\u9078\u9805\uff0c\u5c31\u80fd\u76f4\u63a5\u52a0\u5165\u4eca\u5929\u3002',
        commonFoodsMeta: (regionLabel) => `${regionLabel} \u63a8\u85a6`,
        commonFoodsButton: '\u76f4\u63a5\u52a0\u5165\u4eca\u5929',
        commonFoodsAdvancedButton: '\u5e36\u5165\u9032\u968e\u624b\u52d5\u8f38\u5165',
        manualAdvancedTitle: '\u9032\u968e\u624b\u52d5\u8f38\u5165',
        manualAdvancedHint: '\u60f3\u81ea\u8a02\u98df\u7269\u6216\u624b\u52d5\u8abf\u6574\u71df\u990a\u6642\u518d\u5c55\u958b\u3002',
        overviewTitle: '\u4eca\u5929\u5148\u770b\u9019\u5169\u500b\u91cd\u9ede',
        overviewHint: '\u9ede\u64ca\u53ef\u770b\u5b8c\u6574\u71df\u990a\u8cc7\u8a0a',
        signals: {
            protein: '\u86cb\u767d\u8cea\u7bc0\u594f',
            meals: '\u9910\u6b21\u7bc0\u594f'
        },
        signalProteinToGoal: (remaining) => `\u8ddd\u96e2\u4eca\u5929\u7684\u86cb\u767d\u8cea\u76ee\u6a19\u9084\u5dee ${remaining}g`,
        signalProteinOnTrack: '\u4eca\u5929\u7684\u86cb\u767d\u8cea\u7bc0\u594f\u7b97\u7a69',
        signalMealsEmpty: '\u5148\u8a18\u4e0b\u4e00\u9910\uff0c\u4eca\u5929\u7684\u7bc0\u594f\u5c31\u6703\u958b\u59cb\u6d6e\u73fe\u3002',
        signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
            loggedMeals < plannedMeals && nextMealLabel
                ? `\u5df2\u7d93\u8a18\u4e0b ${loggedMeals}/${plannedMeals} \u6bb5\u95dc\u9375\u9910\u6b21\uff0c\u4e0b\u4e00\u500b\u53ef\u4ee5\u5148\u88dc ${nextMealLabel}\u3002`
                : `\u4eca\u5929\u5df2\u7d93\u8a18\u4e0b ${loggedMeals} \u6bb5\u9910\u6b21\u3002`
        ),
        statLabels: {
            streak: '\u9023\u7e8c',
            meals: '\u9910\u6b21',
            protein: '\u86cb\u767d\u8cea'
        },
        formatDayCount: (value) => `${value} \u5929`,
        formatMealCoverage: (loggedMeals, plannedMeals) => `${loggedMeals}/${plannedMeals}`,
        formatProteinPace: (current, target) => target > 0 ? `${current}/${target}g` : `${current}g`
    }
};

export function getHomeUiCopy(lang = 'en') {
    return homeUiCopyCatalog[lang] || homeUiCopyCatalog[String(lang || 'en').split('-')[0]] || homeUiCopyCatalog.en;
}

export function hasHomeUiCopy(lang = 'en') {
    return Boolean(homeUiCopyCatalog[lang] || homeUiCopyCatalog[String(lang || 'en').split('-')[0]]);
}
