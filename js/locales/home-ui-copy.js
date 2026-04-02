export const homeUiCopyCatalog = {
    en: {
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
        logHubCopyEmpty: 'Choose a quick path first. Common foods and favorites stay close, while advanced entry moves to a secondary flow.',
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
        todayMealsHint: 'Your meal sections stay visible here, so you can see what is still missing without opening another flow.',
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
    'zh-TW': {
        heroEyebrowEmpty: '汪卡今日陪伴',
        heroEyebrowActive: '今天和汪汪一起',
        heroTitleEmpty: '先記下今天的第一餐',
        heroTitleActive: ({ loggedMeals, plannedMeals }) => `今天已經有 ${loggedMeals}/${plannedMeals} 段餐次就位`,
        heroSummaryBase: '常見外食、收藏與 AI 都會在這裡陪你輕鬆記下今天。',
        heroSummaryActive: '下一筆繼續輕快記下，今天的節奏就會更容易維持。',
        heroActionLog: '新增記錄',
        heroActionCommonFoods: '常用外食',
        heroActionManual: '手動輸入',
        heroActionFavorites: '常吃食物',
        logHubTitle: '記錄今天飲食',
        logHubCopyEmpty: '先選一個輕量簡單的方式，詳細手動輸入留到次要流程。',
        logHubCopyActive: '這裡先快速補下一餐，需要調整時再進入進階輸入。',
        logHubFavoritesButton: '常吃食物',
        logHubFavoritesCopy: '從你平常儲存的食物裡選一筆快速加回今天。',
        logHubManualButton: '手動輸入',
        logHubManualCopy: '真的需要自訂食物或營養時，再打開完整輸入。',
        mealListTitle: '今天的餐次',
        commonFoodsTitle: '常用外食',
        commonFoodsHint: '先選一個熟悉的外食餐點，想調整份量或加料時再往下改。',
        commonFoodsMeta: (regionLabel) => `${regionLabel} 推薦`,
        commonFoodsButton: '直接加入今天',
        manualAdvancedTitle: '進階手動輸入',
        manualModalTitle: '手動輸入',
        manualModalHint: '需要自訂食物或手動調整營養時，再到這裡輸入。',
        todayMealsKicker: '今日日記',
        todayMealsTitle: '今天餐次',
        todayMealsHint: '今天吃過的內容直接排在這裡，很快就能看出哪一餐還沒記。',
        overviewTitle: '今天先看這兩個重點',
        overviewHint: '點擊可看完整營養資訊',
        signals: {
            protein: '蛋白質節奏',
            meals: '餐次節奏'
        },
        signalProteinToGoal: (remaining) => `距離今天的蛋白質目標還差 ${remaining}g`,
        signalProteinOnTrack: '今天的蛋白質節奏算穩',
        signalMealsEmpty: '先記下一餐，今天的節奏就會開始浮現。',
        signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
            loggedMeals < plannedMeals && nextMealLabel
                ? `已經記下 ${loggedMeals}/${plannedMeals} 段關鍵餐次，下一個可以先補 ${nextMealLabel}。`
                : `今天已經記下 ${loggedMeals} 段餐次。`
        ),
        statLabels: {
            streak: '連續',
            meals: '餐次',
            protein: '蛋白質'
        },
        formatDayCount: (value) => `${value} 天`,
        formatMealCoverage: (loggedMeals, plannedMeals) => `${loggedMeals}/${plannedMeals}`,
        formatProteinPace: (current, target) => target > 0 ? `${current}/${target}g` : `${current}g`
    },
    'zh-CN': {
        heroEyebrowEmpty: '汪卡今日陪伴',
        heroEyebrowActive: '今天和汪汪一起',
        heroTitleEmpty: '先记下今天的第一餐',
        heroTitleActive: ({ loggedMeals, plannedMeals }) => `今天已经有 ${loggedMeals}/${plannedMeals} 段餐次就位`,
        heroSummaryBase: '常见外食、收藏与 AI 都会在这里陪你轻松记下今天。',
        heroSummaryActive: '下一笔继续轻快记下，今天的节奏就会更容易维持。',
        heroActionLog: '新增记录',
        heroActionCommonFoods: '常用外食',
        heroActionManual: '手动输入',
        heroActionFavorites: '常吃食物',
        logHubTitle: '记录今天饮食',
        logHubCopyEmpty: '先选一个轻量简单的方式，详细手动输入留到次要流程。',
        logHubCopyActive: '这里先快速补下一餐，需要调整时再进入进阶输入。',
        logHubFavoritesButton: '常吃食物',
        logHubFavoritesCopy: '从你平常保存的食物里选一笔快速加回今天。',
        logHubManualButton: '手动输入',
        logHubManualCopy: '真的需要自定义食物或营养时，再打开完整输入。',
        mealListTitle: '今天的餐次',
        commonFoodsTitle: '常用外食',
        commonFoodsHint: '先选一个熟悉的外食餐点，想调整份量或加料时再往下改。',
        commonFoodsMeta: (regionLabel) => `${regionLabel} 推荐`,
        commonFoodsButton: '直接加入今天',
        manualAdvancedTitle: '进阶手动输入',
        manualModalTitle: '手动输入',
        manualModalHint: '需要自定义食物或手动调整营养时，再到这里输入。',
        todayMealsKicker: '今日日记',
        todayMealsTitle: '今天餐次',
        todayMealsHint: '今天吃过的内容直接排在这里，很快就能看出哪一餐还没记。',
        overviewTitle: '今天先看这两个重点',
        overviewHint: '点击可看完整营养信息',
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
        heroEyebrowEmpty: '今日の相棒',
        heroEyebrowActive: '今日はワンちゃんと一緒',
        heroTitleEmpty: '今日の最初の一食を記録しよう',
        heroTitleActive: ({ loggedMeals, plannedMeals }) => `今日は ${loggedMeals}/${plannedMeals} 回の食事が入っています`,
        heroSummaryBase: 'よく食べる外食、保存した食事、AI 解析がここで今日を支えます。',
        heroSummaryActive: '次の一食も軽く記録して、今日の流れを保ちましょう。',
        heroActionLog: '食事を追加',
        heroActionCommonFoods: 'よく食べる外食',
        heroActionManual: '手入力',
        heroActionFavorites: 'お気に入り',
        logHubTitle: '今日の食事を記録',
        logHubCopyEmpty: 'まずは軽い方法から。詳しい手入力は次の画面に回せます。',
        logHubCopyActive: 'ここでは素早く追加して、細かな調整は必要なときだけ行いましょう。',
        logHubFavoritesButton: 'お気に入り',
        logHubFavoritesCopy: 'よく使う食事をすぐに追加できます。',
        logHubManualButton: '手入力',
        logHubManualCopy: '食事や栄養を自分で細かく入力したいときだけ使います。',
        mealListTitle: '今日の食事',
        commonFoodsTitle: 'よく食べる外食',
        commonFoodsHint: 'まずはいつもの外食を選んで、量や追加項目は必要なときだけ調整します。',
        commonFoodsMeta: (regionLabel) => `${regionLabel} の候補`,
        commonFoodsButton: '今日に追加',
        manualAdvancedTitle: '詳細な手入力',
        manualModalTitle: '手入力',
        manualModalHint: '食事を自分で入力したいときだけ開きます。',
        todayMealsKicker: '今日の記録',
        todayMealsTitle: '今日の食事',
        todayMealsHint: '今日食べたものがここにまとまり、抜けている食事も見つけやすくなります。',
        overviewTitle: '今日はこの 2 点を先に確認',
        overviewHint: 'タップして詳しい栄養を見る',
        signals: {
            protein: 'たんぱく質の流れ',
            meals: '食事リズム'
        },
        signalProteinToGoal: (remaining) => `今日の目標まであと ${remaining}g`,
        signalProteinOnTrack: 'たんぱく質の流れは安定しています',
        signalMealsEmpty: 'まず一食記録すると、今日の流れが見え始めます。',
        signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
            loggedMeals < plannedMeals && nextMealLabel
                ? `${loggedMeals}/${plannedMeals} 回の食事を記録済み。次は ${nextMealLabel} が目安です。`
                : `今日は ${loggedMeals} 回の食事を記録しています。`
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
        heroEyebrowEmpty: '오늘의 반려',
        heroEyebrowActive: '오늘은 강아지와 함께',
        heroTitleEmpty: '오늘의 첫 식사를 기록해 보세요',
        heroTitleActive: ({ loggedMeals, plannedMeals }) => `오늘 ${loggedMeals}/${plannedMeals}번의 식사가 기록되었습니다`,
        heroSummaryBase: '자주 먹는 외식, 즐겨찾기, AI가 오늘 기록을 가볍게 도와줍니다.',
        heroSummaryActive: '다음 식사도 가볍게 기록해 오늘 흐름을 유지하세요.',
        heroActionLog: '식사 추가',
        heroActionCommonFoods: '자주 먹는 외식',
        heroActionManual: '수동 입력',
        heroActionFavorites: '즐겨찾기',
        logHubTitle: '오늘 식사 기록',
        logHubCopyEmpty: '먼저 가벼운 방법을 선택하고, 자세한 수동 입력은 다음 단계로 넘기세요.',
        logHubCopyActive: '여기서는 빠르게 추가하고, 자세한 수정은 필요할 때만 여세요.',
        logHubFavoritesButton: '즐겨찾기',
        logHubFavoritesCopy: '자주 저장한 음식을 바로 다시 추가할 수 있습니다.',
        logHubManualButton: '수동 입력',
        logHubManualCopy: '음식이나 영양을 직접 세부 입력할 때만 사용하세요.',
        mealListTitle: '오늘의 식사',
        commonFoodsTitle: '자주 먹는 외식',
        commonFoodsHint: '익숙한 외식 메뉴를 먼저 고르고, 양이나 추가 항목은 필요할 때만 조정하세요.',
        commonFoodsMeta: (regionLabel) => `${regionLabel} 추천`,
        commonFoodsButton: '오늘에 추가',
        manualAdvancedTitle: '고급 수동 입력',
        manualModalTitle: '수동 입력',
        manualModalHint: '음식이나 영양을 직접 입력하고 싶을 때만 엽니다.',
        todayMealsKicker: '오늘 기록',
        todayMealsTitle: '오늘 식사',
        todayMealsHint: '오늘 먹은 내용이 여기 모여 있어 빠진 끼니를 확인하기 쉽습니다.',
        overviewTitle: '오늘은 이 두 가지를 먼저 보세요',
        overviewHint: '눌러서 자세한 영양 보기',
        signals: {
            protein: '단백질 흐름',
            meals: '식사 리듬'
        },
        signalProteinToGoal: (remaining) => `오늘 목표까지 ${remaining}g 남음`,
        signalProteinOnTrack: '단백질 흐름은 안정적입니다',
        signalMealsEmpty: '한 끼만 기록해도 오늘의 흐름이 보이기 시작합니다.',
        signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
            loggedMeals < plannedMeals && nextMealLabel
                ? `${loggedMeals}/${plannedMeals}번의 핵심 식사를 기록했습니다. 다음은 ${nextMealLabel}이 기준점입니다.`
                : `오늘 ${loggedMeals}번의 식사를 기록했습니다.`
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
        heroTitleActive: ({ loggedMeals, plannedMeals }) => `تم تسجيل ${loggedMeals}/${plannedMeals} من لحظات الوجبات اليوم`,
        heroSummaryBase: 'الأكلات الشائعة والمفضلة و AI قريبة منك لتسجيل يومك بسهولة.',
        heroSummaryActive: 'أضف الوجبة التالية بخفة ليبقى إيقاع اليوم واضحًا وسهل المراجعة.',
        heroActionLog: 'أضف وجبة',
        heroActionCommonFoods: 'أكلات شائعة',
        heroActionManual: 'إدخال يدوي',
        heroActionFavorites: 'المفضلة',
        logHubTitle: 'سجّل وجبات اليوم',
        logHubCopyEmpty: 'ابدأ بمسار سريع أولًا، واترك الإدخال التفصيلي للخطوة الثانوية.',
        logHubCopyActive: 'حافظ على التسجيل سهلًا من هنا، واترك التعديل التفصيلي للوقت الذي تحتاجه فقط.',
        logHubFavoritesButton: 'المفضلة',
        logHubFavoritesCopy: 'اختر من الأطعمة التي تحفظها كثيرًا.',
        logHubManualButton: 'إدخال يدوي',
        logHubManualCopy: 'استخدمه فقط عندما تريد كتابة طعام أو تغذية مخصصة.',
        mealListTitle: 'وجبات اليوم',
        commonFoodsTitle: 'أكلات شائعة',
        commonFoodsHint: 'ابدأ بطبق خارجي مألوف، وافتح التعديل فقط عندما تريد تغيير الكمية أو الإضافات.',
        commonFoodsMeta: (regionLabel) => `اقتراحات ${regionLabel}`,
        commonFoodsButton: 'أضف هذا الطعام إلى اليوم',
        manualAdvancedTitle: 'إدخال يدوي متقدم',
        manualModalTitle: 'إدخال الوجبة يدويًا',
        manualModalHint: 'استخدم هذا عندما تريد كتابة طعام مخصص أو تعديل التغذية بنفسك.',
        todayMealsKicker: 'مذكرات اليوم',
        todayMealsTitle: 'وجبات اليوم',
        todayMealsHint: 'تبقى أقسام الوجبات ظاهرة هنا حتى ترى ما الذي ما زال ناقصًا بدون فتح مسار آخر.',
        overviewTitle: 'لمحة سريعة عن اليوم',
        overviewHint: 'اضغط لعرض التفاصيل الغذائية الكاملة',
        signals: {
            protein: 'إيقاع البروتين',
            meals: 'إيقاع الوجبات'
        },
        signalProteinToGoal: (remaining) => `تبقّى ${remaining}g لهدف اليوم`,
        signalProteinOnTrack: 'إيقاع البروتين مستقر',
        signalMealsEmpty: 'تسجيل وجبة واحدة يكفي لبدء إيقاع اليوم.',
        signalMealsActive: (loggedMeals, plannedMeals, nextMealLabel) => (
            loggedMeals < plannedMeals && nextMealLabel
                ? `تم تسجيل ${loggedMeals}/${plannedMeals} من لحظات الوجبات الأساسية. يمكن أن تكون ${nextMealLabel} المحطة التالية.`
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
    }
};

export function getHomeUiCopy(lang = 'en') {
    return homeUiCopyCatalog[lang] || homeUiCopyCatalog[String(lang || 'en').split('-')[0]] || homeUiCopyCatalog.en;
}

export function hasHomeUiCopy(lang = 'en') {
    return Boolean(homeUiCopyCatalog[lang] || homeUiCopyCatalog[String(lang || 'en').split('-')[0]]);
}
