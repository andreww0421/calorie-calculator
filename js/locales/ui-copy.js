import zhTWUiCopy from './ui-copy-zh-TW.js';

export const uiCopyCatalog = {
    'zh-TW': {
        extra: {
            direction: 'ltr',
            todayLabel: '今天',
            metaTitle: 'Woof Cal 汪卡管家',
            metaOgTitle: 'Woof Cal 汪卡管家 - AI 飲食與熱量追蹤',
            metaDescription: '透過 AI 分析食物與照片營養，輕鬆追蹤每日熱量、體重與營養素。',
            dailySummaryHint: '點擊查看完整營養與水分',
            dailySummaryEmpty: '開始記錄今天的飲食吧',
            dailySummaryLeftGoal: (value) => `距離目標還差 ${value} kcal`,
            dailySummaryLeftToday: (value) => `目前還差 ${value} kcal`,
            dailySummaryOverTarget: (value) => `已超過目標 ${value} kcal`,
            dailySummaryTitle: (dateText) => `${dateText} 營養總覽`,
            remainingLabel: '剩餘熱量',
            emptyStateEyebrow: '新手開始',
            emptyStateTitle: '記下今天的第一餐',
            emptyStateBody: '你可以先拍照交給 AI，或用手動輸入快速建立第一筆飲食記錄。',
            emptyMealTitle: '還沒有記錄',
            emptyMealBody: '使用 AI 或手動輸入來開始',
            aiGuideEyebrow: 'AI Tips',
            aiGuideTitle: '讓 AI 更快更準',
            aiGuideBody: '清楚照片、補充食材與分量，會讓分析更準確。',
            aiGuideTip1: '拍攝時盡量避免遮擋',
            aiGuideTip2: '有包裝食品時可補上品名',
            aiGuideTip3: '不確定時可以在重算前先編輯食材',
            aiItemsRequired: '請至少保留一個食材項目。'
        },
        goal: {
            goalTypeLabel: '目標',
            goalSummaryLabel: '目前目標',
            calorieTargetLabel: '熱量目標',
            reportTitle: '目標進度',
            reportSubtitle: '近 7 天達標與連續記錄',
            goalTypes: {
                lose: '減重',
                maintain: '維持體重',
                gain: '增肌'
            },
            reportHeadline: (goal) => `${goal} 週進度`,
            reportSummary: (insights) => `已記錄 ${insights.loggedDays}/7 天，熱量達標 ${insights.calorieTargetDays} 天，蛋白質達標 ${insights.proteinTargetDays} 天`,
            statStreak: '連續記錄',
            statBestStreak: '最佳 streak',
            statCalories: '熱量達標',
            statProtein: '蛋白質達標',
            formatDayCount: (value) => `${value} 天`,
            formatWindowCount: (value, total) => `${value}/${total}`
        },
        coach: {
            cardTitle: '今日教練建議',
            weeklyTitle: '近 7 天節奏',
            headlines: {
                start_logging: '從第一餐開始建立今天的節奏',
                over_target: '今天的熱量已經偏高',
                near_goal: '今天很接近目標區間',
                protein_gap: '蛋白質還有補強空間',
                fiber_gap: '纖維可以再補一點',
                sodium_high: '鈉含量今天偏高',
                steady: '今天的進度很穩'
            },
            summaries: {
                start_logging: '先記下第一餐，儀表板和 AI 建議就會開始發揮作用。',
                over_target: (coach) => `目前比目標多 ${coach.overCalories} kcal，後續餐次建議清淡一點。`,
                near_goal: (coach) => `距離目標只差 ${coach.remainingCalories} kcal，後面加餐可以保守一點。`,
                protein_gap: (coach) => `距離今日蛋白質建議大約還差 ${coach.proteinGap}g。`,
                fiber_gap: (coach) => `今天纖維距離建議值約還差 ${coach.fiberGap}g。`,
                sodium_high: '建議下一餐減少重口味與加工食品，讓整天更平衡。',
                steady: '目前熱量和營養節奏都不錯，繼續保持記錄。'
            },
            tips: {
                use_ai: '先用 AI 拍照記錄會最快。',
                log_first_meal: '如果趕時間，也可以先手動輸入熱量和蛋白質。',
                protein_boost: '下一餐可優先補蛋、豆腐、雞胸或優格。',
                fiber_boost: '加一份蔬菜、水果或全穀類，纖維會更完整。',
                watch_sodium: '接下來多喝水，並減少醬料與湯品。',
                portion_reset: '下一餐主食或點心減半，通常就能拉回區間。',
                keep_momentum: '保持現在的節奏，晚餐前再看一次摘要卡。'
            },
            weeklyAverage: (value) => `平均 ${value} kcal`,
            weeklyDays: (days) => `${days} 天有完成記錄`,
            weeklyBest: (day, cal) => `${day} 最高 ${cal} kcal`
        }
    },
    'zh-CN': {
        extra: {
            direction: 'ltr',
            todayLabel: '今天',
            metaTitle: 'Woof Cal 汪卡管家',
            metaOgTitle: 'Woof Cal 汪卡管家 - AI 饮食与热量追踪',
            metaDescription: '通过 AI 分析食物与照片营养，轻松追踪每日热量、体重与营养素。',
            dailySummaryHint: '点击查看完整营养与水分',
            dailySummaryEmpty: '开始记录今天的饮食吧',
            dailySummaryLeftGoal: (value) => `距离目标还差 ${value} kcal`,
            dailySummaryLeftToday: (value) => `目前还差 ${value} kcal`,
            dailySummaryOverTarget: (value) => `已超过目标 ${value} kcal`,
            dailySummaryTitle: (dateText) => `${dateText} 营养总览`,
            remainingLabel: '剩余热量',
            emptyStateEyebrow: '快速开始',
            emptyStateTitle: '记录今天的第一餐',
            emptyStateBody: '你可以先拍照交给 AI，或用手动输入快速建立第一条饮食记录。',
            emptyMealTitle: '还没有记录',
            emptyMealBody: '使用 AI 或手动输入开始',
            aiGuideEyebrow: 'AI Tips',
            aiGuideTitle: '让 AI 更快更准',
            aiGuideBody: '清晰照片、补充食材与分量，会让分析更准确。',
            aiGuideTip1: '拍摄时尽量避免遮挡',
            aiGuideTip2: '有包装食品时可补上品名',
            aiGuideTip3: '不确定时可以在重算前先编辑食材',
            aiItemsRequired: '请至少保留一个食材项目。'
        },
        goal: {
            goalTypeLabel: '目标',
            goalSummaryLabel: '当前目标',
            calorieTargetLabel: '热量目标',
            reportTitle: '目标进度',
            reportSubtitle: '近 7 天达标与连续记录',
            goalTypes: {
                lose: '减重',
                maintain: '维持体重',
                gain: '增肌'
            },
            reportHeadline: (goal) => `${goal} 周进度`,
            reportSummary: (insights) => `已记录 ${insights.loggedDays}/7 天，热量达标 ${insights.calorieTargetDays} 天，蛋白质达标 ${insights.proteinTargetDays} 天`,
            statStreak: '连续记录',
            statBestStreak: '最佳 streak',
            statCalories: '热量达标',
            statProtein: '蛋白质达标',
            formatDayCount: (value) => `${value} 天`,
            formatWindowCount: (value, total) => `${value}/${total}`
        },
        coach: {
            cardTitle: '今日教练建议',
            weeklyTitle: '近 7 天节奏',
            headlines: {
                start_logging: '从第一餐开始建立今天的节奏',
                over_target: '今天的热量已经偏高',
                near_goal: '今天很接近目标区间',
                protein_gap: '蛋白质还有补强空间',
                fiber_gap: '纤维可以再补一点',
                sodium_high: '钠含量今天偏高',
                steady: '今天的进度很稳'
            },
            summaries: {
                start_logging: '先记下第一餐，仪表板和 AI 建议就会开始发挥作用。',
                over_target: (coach) => `目前比目标多 ${coach.overCalories} kcal，后续餐次建议清淡一点。`,
                near_goal: (coach) => `距离目标只差 ${coach.remainingCalories} kcal，后面加餐可以保守一点。`,
                protein_gap: (coach) => `距离今日蛋白质建议大约还差 ${coach.proteinGap}g。`,
                fiber_gap: (coach) => `今天纤维距离建议值约还差 ${coach.fiberGap}g。`,
                sodium_high: '建议下一餐减少重口味与加工食品，让整天更平衡。',
                steady: '目前热量和营养节奏都不错，继续保持记录。'
            },
            tips: {
                use_ai: '先用 AI 拍照记录会最快。',
                log_first_meal: '如果赶时间，也可以先手动输入热量和蛋白质。',
                protein_boost: '下一餐可优先补蛋、豆腐、鸡胸或酸奶。',
                fiber_boost: '加一份蔬菜、水果或全谷类，纤维会更完整。',
                watch_sodium: '接下来多喝水，并减少酱料与汤品。',
                portion_reset: '下一餐主食或点心减半，通常就能拉回区间。',
                keep_momentum: '保持现在的节奏，晚餐前再看一次摘要卡。'
            },
            weeklyAverage: (value) => `平均 ${value} kcal`,
            weeklyDays: (days) => `${days} 天有完成记录`,
            weeklyBest: (day, cal) => `${day} 最高 ${cal} kcal`
        }
    },
    en: {
        extra: {
            direction: 'ltr',
            todayLabel: 'Today',
            metaTitle: 'Woof Cal - AI Diet Tracker',
            metaOgTitle: 'Woof Cal - AI Diet Tracker',
            metaDescription: 'Use AI to analyze meals from photos or text, then track calories, weight, and nutrition in one lightweight dashboard.',
            dailySummaryHint: 'Tap to view all nutrients',
            dailySummaryEmpty: 'Start logging today\'s meals',
            dailySummaryLeftGoal: (value) => `${value} kcal left to goal`,
            dailySummaryLeftToday: (value) => `${value} kcal left today`,
            dailySummaryOverTarget: (value) => `${value} kcal over target`,
            dailySummaryTitle: (dateText) => `${dateText} Nutrition Summary`,
            remainingLabel: 'Remaining',
            emptyStateEyebrow: 'Quick Start',
            emptyStateTitle: 'Log your first meal today',
            emptyStateBody: 'Snap a meal with AI or add a manual entry to unlock your daily dashboard.',
            emptyMealTitle: 'No foods logged yet',
            emptyMealBody: 'Use AI or manual entry to get started',
            aiGuideEyebrow: 'AI Tips',
            aiGuideTitle: 'Get faster, cleaner AI results',
            aiGuideBody: 'Clear photos and a little extra context help the nutrition analysis stay more accurate.',
            aiGuideTip1: 'Keep the meal visible and avoid blocking the plate',
            aiGuideTip2: 'Add brand names or key ingredients when they matter',
            aiGuideTip3: 'Edit ingredients before recalculating if the result looks off',
            aiItemsRequired: 'Please keep at least one item.'
        },
        goal: {
            goalTypeLabel: 'Goal',
            goalSummaryLabel: 'Current Goal',
            calorieTargetLabel: 'Calorie Target',
            reportTitle: 'Goal Progress',
            reportSubtitle: 'Last 7 days of adherence and logging',
            goalTypes: {
                lose: 'Lose Weight',
                maintain: 'Maintain Weight',
                gain: 'Build Muscle'
            },
            reportHeadline: (goal) => `${goal} weekly progress`,
            reportSummary: (insights) => `${insights.loggedDays}/7 days logged, calories on target ${insights.calorieTargetDays} days, protein on target ${insights.proteinTargetDays} days`,
            statStreak: 'Current streak',
            statBestStreak: 'Best streak',
            statCalories: 'Calorie goal',
            statProtein: 'Protein goal',
            formatDayCount: (value) => `${value}d`,
            formatWindowCount: (value, total) => `${value}/${total}`
        },
        coach: {
            cardTitle: 'Daily Coach',
            weeklyTitle: 'Last 7 Days',
            headlines: {
                start_logging: 'Build today with the first meal',
                over_target: 'Calories are already trending high',
                near_goal: 'You are close to your target zone',
                protein_gap: 'Protein still needs a boost',
                fiber_gap: 'Fiber can use a lift',
                sodium_high: 'Sodium is running high today',
                steady: 'Today is moving in a solid direction'
            },
            summaries: {
                start_logging: 'Log the first meal and the dashboard can start coaching the rest of your day.',
                over_target: (coach) => `You are about ${coach.overCalories} kcal over target, so the next meal should stay lighter.`,
                near_goal: (coach) => `Only about ${coach.remainingCalories} kcal remain, so snacks should stay modest.`,
                protein_gap: (coach) => `You are still about ${coach.proteinGap}g short of your protein target.`,
                fiber_gap: (coach) => `You are still about ${coach.fiberGap}g short of a strong fiber day.`,
                sodium_high: 'A lighter, less salty next meal will help rebalance the day.',
                steady: 'Calories and nutrients look fairly steady so far. Keep logging.'
            },
            tips: {
                use_ai: 'Use AI photo logging if you want the fastest start.',
                log_first_meal: 'If you are busy, add a quick manual entry with calories and protein first.',
                protein_boost: 'Try eggs, tofu, chicken breast, Greek yogurt, or milk next.',
                fiber_boost: 'Add vegetables, fruit, beans, or whole grains to lift fiber.',
                watch_sodium: 'Drink more water and go lighter on soup, sauce, and packaged foods.',
                portion_reset: 'Cut the next carb or snack portion in half to recover the day.',
                keep_momentum: 'Stay with the current pace and check the summary card again before dinner.'
            },
            weeklyAverage: (value) => `${value} kcal avg`,
            weeklyDays: (days) => `${days} logged days`,
            weeklyBest: (day, cal) => `${day} peak ${cal} kcal`
        }
    },
    ja: {
        extra: {
            direction: 'ltr',
            todayLabel: '今日',
            metaTitle: 'Woof Cal - AI Diet Tracker',
            metaOgTitle: 'Woof Cal - AI Diet Tracker',
            metaDescription: 'AI で食事を分析し、カロリー、体重、栄養を簡単に追跡できます。',
            dailySummaryHint: 'タップして全ての栄養と水分を表示',
            dailySummaryEmpty: '今日の食事記録を始めましょう',
            dailySummaryLeftGoal: (value) => `目標まであと ${value} kcal`,
            dailySummaryLeftToday: (value) => `今日の残り ${value} kcal`,
            dailySummaryOverTarget: (value) => `目標を ${value} kcal 超過`,
            dailySummaryTitle: (dateText) => `${dateText} 栄養サマリー`,
            remainingLabel: '残りカロリー',
            emptyStateEyebrow: 'クイックスタート',
            emptyStateTitle: '今日の最初の食事を記録しましょう',
            emptyStateBody: 'AI で撮影するか、手入力で最初の記録を追加できます。',
            emptyMealTitle: 'まだ記録がありません',
            emptyMealBody: 'AI または手入力で始めましょう',
            aiGuideEyebrow: 'AI Tips',
            aiGuideTitle: 'AI の分析をより速く、より正確に',
            aiGuideBody: '写真が明るく、食材や量の補足があると精度が上がります。',
            aiGuideTip1: '皿が隠れないように撮影する',
            aiGuideTip2: '必要なときは商品名や食材名を補足する',
            aiGuideTip3: '結果がずれたら再計算前に食材を編集する',
            aiItemsRequired: '食材を少なくとも 1 つ残してください。'
        },
        goal: {
            goalTypeLabel: '目標',
            goalSummaryLabel: '現在の目標',
            calorieTargetLabel: 'カロリー目標',
            reportTitle: '目標進捗',
            reportSubtitle: '直近 7 日の達成度と記録',
            goalTypes: {
                lose: '減量',
                maintain: '維持',
                gain: '増量'
            },
            reportHeadline: (goal) => `${goal} の週間進捗`,
            reportSummary: (insights) => `記録 ${insights.loggedDays}/7 日、カロリー達成 ${insights.calorieTargetDays} 日、たんぱく質達成 ${insights.proteinTargetDays} 日`,
            statStreak: '連続記録',
            statBestStreak: '最長 streak',
            statCalories: 'カロリー達成',
            statProtein: 'たんぱく質達成',
            formatDayCount: (value) => `${value}日`,
            formatWindowCount: (value, total) => `${value}/${total}`
        },
        coach: {
            cardTitle: '今日のコーチ',
            weeklyTitle: '直近 7 日',
            headlines: {
                start_logging: 'まずは最初の食事から始めましょう',
                over_target: '今日のカロリーは少し高めです',
                near_goal: '目標ゾーンにかなり近いです',
                protein_gap: 'たんぱく質をもう少し補えます',
                fiber_gap: '食物繊維を少し増やしたいです',
                sodium_high: '塩分が高めです',
                steady: '今日の流れは安定しています'
            },
            summaries: {
                start_logging: '最初の食事を記録すると、今日のガイドが動き始めます。',
                over_target: (coach) => `目標より約 ${coach.overCalories} kcal 多いので、次の食事は軽めがおすすめです。`,
                near_goal: (coach) => `残りは約 ${coach.remainingCalories} kcal なので、間食は控えめで十分です。`,
                protein_gap: (coach) => `今日のたんぱく質目安まで約 ${coach.proteinGap}g 足りません。`,
                fiber_gap: (coach) => `食物繊維は目安まで約 ${coach.fiberGap}g 足りません。`,
                sodium_high: '次の食事は塩分の少ないものを選ぶと整いやすいです。',
                steady: '今のところカロリーと栄養の流れは良好です。'
            },
            tips: {
                use_ai: '最初は AI 写真記録がいちばん速いです。',
                log_first_meal: '急いでいるならカロリーとたんぱく質だけでも先に入れて OK です。',
                protein_boost: '次は卵、豆腐、鶏むね、ヨーグルトなどが補いやすいです。',
                fiber_boost: '野菜、果物、豆、全粒穀物を足すと繊維が上がります。',
                watch_sodium: '水分を増やして、汁物やソースは控えめにしましょう。',
                portion_reset: '次の主食や間食を半分にすると戻しやすいです。',
                keep_momentum: '今のペースを維持して、夕食前にもう一度まとめを見ましょう。'
            },
            weeklyAverage: (value) => `平均 ${value} kcal`,
            weeklyDays: (days) => `${days} 日記録`,
            weeklyBest: (day, cal) => `${day} 最高 ${cal} kcal`
        }
    },
    ko: {
        extra: {
            direction: 'ltr',
            todayLabel: '오늘',
            metaTitle: 'Woof Cal - AI Diet Tracker',
            metaOgTitle: 'Woof Cal - AI Diet Tracker',
            metaDescription: 'AI로 음식을 분석하고 칼로리, 체중, 영양 기록을 한 곳에서 관리하세요.',
            dailySummaryHint: '눌러서 전체 영양과 수분 보기',
            dailySummaryEmpty: '오늘 식단 기록을 시작해보세요',
            dailySummaryLeftGoal: (value) => `목표까지 ${value} kcal 남았어요`,
            dailySummaryLeftToday: (value) => `오늘 ${value} kcal 남았어요`,
            dailySummaryOverTarget: (value) => `목표를 ${value} kcal 초과했어요`,
            dailySummaryTitle: (dateText) => `${dateText} 영양 요약`,
            remainingLabel: '남은 칼로리',
            emptyStateEyebrow: '빠른 시작',
            emptyStateTitle: '오늘 첫 끼를 기록해보세요',
            emptyStateBody: 'AI 사진 분석이나 수동 입력으로 첫 기록을 빠르게 생성할 수 있어요.',
            emptyMealTitle: '아직 기록된 음식이 없어요',
            emptyMealBody: 'AI 또는 수동 입력으로 시작해보세요',
            aiGuideEyebrow: 'AI Tips',
            aiGuideTitle: 'AI 분석을 더 빠르고 정확하게',
            aiGuideBody: '선명한 사진과 재료, 양 정보가 있으면 결과 정확도가 좋아져요.',
            aiGuideTip1: '접시가 가리지 않도록 찍어주세요',
            aiGuideTip2: '포장 식품이면 브랜드명을 함께 적어주세요',
            aiGuideTip3: '결과가 어색하면 재계산 전에 재료를 수정해보세요',
            aiItemsRequired: '항목을 최소 1개는 남겨주세요.'
        },
        goal: {
            goalTypeLabel: '목표',
            goalSummaryLabel: '현재 목표',
            calorieTargetLabel: '칼로리 목표',
            reportTitle: '목표 진행',
            reportSubtitle: '최근 7일 달성도와 기록',
            goalTypes: {
                lose: '감량',
                maintain: '유지',
                gain: '증근'
            },
            reportHeadline: (goal) => `${goal} 주간 진행`,
            reportSummary: (insights) => `7일 중 ${insights.loggedDays}일 기록, 칼로리 달성 ${insights.calorieTargetDays}일, 단백질 달성 ${insights.proteinTargetDays}일`,
            statStreak: '연속 기록',
            statBestStreak: '최고 streak',
            statCalories: '칼로리 달성',
            statProtein: '단백질 달성',
            formatDayCount: (value) => `${value}일`,
            formatWindowCount: (value, total) => `${value}/${total}`
        },
        coach: {
            cardTitle: '오늘의 코치',
            weeklyTitle: '최근 7일',
            headlines: {
                start_logging: '첫 끼부터 오늘 흐름을 만드세요',
                over_target: '오늘 칼로리가 조금 높아요',
                near_goal: '목표 구간에 거의 가까워요',
                protein_gap: '단백질을 더 보충할 수 있어요',
                fiber_gap: '식이섬유를 조금 더 챙기면 좋아요',
                sodium_high: '나트륨이 높은 편이에요',
                steady: '오늘 흐름이 안정적이에요'
            },
            summaries: {
                start_logging: '첫 식사를 기록하면 남은 하루를 위한 가이드가 시작돼요.',
                over_target: (coach) => `목표보다 약 ${coach.overCalories} kcal 높아서 다음 식사는 가볍게 가는 편이 좋아요.`,
                near_goal: (coach) => `남은 칼로리는 약 ${coach.remainingCalories} kcal 정도라 간식은 가볍게면 충분해요.`,
                protein_gap: (coach) => `오늘 단백질 목표까지 아직 약 ${coach.proteinGap}g 부족해요.`,
                fiber_gap: (coach) => `식이섬유는 목표까지 약 ${coach.fiberGap}g 더 필요해요.`,
                sodium_high: '다음 식사는 덜 짜고 가공이 적은 쪽이 좋아요.',
                steady: '지금까지 칼로리와 영양 흐름이 꽤 안정적이에요.'
            },
            tips: {
                use_ai: '처음은 AI 사진 기록이 가장 빨라요.',
                log_first_meal: '바쁘면 칼로리와 단백질만 먼저 넣어도 괜찮아요.',
                protein_boost: '다음엔 달걀, 두부, 닭가슴살, 요거트가 좋아요.',
                fiber_boost: '채소, 과일, 콩, 통곡물을 더하면 식이섬유가 올라가요.',
                watch_sodium: '물은 더 마시고 국물, 소스, 가공식품은 줄여보세요.',
                portion_reset: '다음 탄수화물이나 간식 양을 절반으로 줄이면 회복이 쉬워요.',
                keep_momentum: '지금 페이스를 유지하고 저녁 전에 요약 카드를 다시 확인해보세요.'
            },
            weeklyAverage: (value) => `평균 ${value} kcal`,
            weeklyDays: (days) => `${days}일 기록`,
            weeklyBest: (day, cal) => `${day} 최고 ${cal} kcal`
        }
    },
    ar: {
        extra: {
            direction: 'rtl',
            todayLabel: 'اليوم',
            metaTitle: 'Woof Cal - AI Diet Tracker',
            metaOgTitle: 'Woof Cal - AI Diet Tracker',
            metaDescription: 'حلل وجباتك بالذكاء الاصطناعي وتابع السعرات والوزن والتغذية في واجهة خفيفة وواضحة.',
            dailySummaryHint: 'اضغط لعرض كل العناصر الغذائية والماء',
            dailySummaryEmpty: 'ابدأ بتسجيل وجبات اليوم',
            dailySummaryLeftGoal: (value) => `متبقي ${value} kcal للوصول إلى الهدف`,
            dailySummaryLeftToday: (value) => `متبقي ${value} kcal لليوم`,
            dailySummaryOverTarget: (value) => `تم تجاوز الهدف بمقدار ${value} kcal`,
            dailySummaryTitle: (dateText) => `${dateText} ملخص التغذية`,
            remainingLabel: 'السعرات المتبقية',
            emptyStateEyebrow: 'ابدأ بسرعة',
            emptyStateTitle: 'سجل أول وجبة لك اليوم',
            emptyStateBody: 'التقط صورة للوجبة باستخدام AI أو أضف مدخلاً يدوياً لبدء سجلك اليومي.',
            emptyMealTitle: 'لا توجد أطعمة مسجلة بعد',
            emptyMealBody: 'ابدأ بالذكاء الاصطناعي أو بالإدخال اليدوي',
            aiGuideEyebrow: 'AI Tips',
            aiGuideTitle: 'احصل على نتائج أسرع وأدق',
            aiGuideBody: 'الصور الواضحة والتفاصيل الإضافية عن المكونات والكمية ترفع دقة التحليل.',
            aiGuideTip1: 'حاول إظهار الطبق بشكل واضح',
            aiGuideTip2: 'أضف اسم المنتج أو المكونات الأساسية عند الحاجة',
            aiGuideTip3: 'عدّل المكونات قبل إعادة الحساب إذا بدت النتيجة غير دقيقة',
            aiItemsRequired: 'يرجى الإبقاء على عنصر واحد على الأقل.'
        },
        goal: {
            goalTypeLabel: 'الهدف',
            goalSummaryLabel: 'الهدف الحالي',
            calorieTargetLabel: 'هدف السعرات',
            reportTitle: 'تقدم الهدف',
            reportSubtitle: 'آخر 7 أيام من الالتزام والتسجيل',
            goalTypes: {
                lose: 'خسارة الوزن',
                maintain: 'الحفاظ على الوزن',
                gain: 'بناء العضلات'
            },
            reportHeadline: (goal) => `التقدم الأسبوعي لهدف ${goal}`,
            reportSummary: (insights) => `تم التسجيل ${insights.loggedDays}/7 أيام، وتحقق هدف السعرات ${insights.calorieTargetDays} أيام، وهدف البروتين ${insights.proteinTargetDays} أيام`,
            statStreak: 'تسجيل متتالي',
            statBestStreak: 'أفضل streak',
            statCalories: 'هدف السعرات',
            statProtein: 'هدف البروتين',
            formatDayCount: (value) => `${value} أيام`,
            formatWindowCount: (value, total) => `${value}/${total}`
        },
        coach: {
            cardTitle: 'ملاحظات اليوم',
            weeklyTitle: 'آخر 7 أيام',
            headlines: {
                start_logging: 'ابدأ اليوم بتسجيل أول وجبة',
                over_target: 'السعرات اليوم أعلى من المطلوب',
                near_goal: 'أنت قريب من نطاق الهدف',
                protein_gap: 'البروتين ما زال يحتاج دعماً',
                fiber_gap: 'الألياف تحتاج دفعة إضافية',
                sodium_high: 'الصوديوم مرتفع اليوم',
                steady: 'إيقاع اليوم جيد حتى الآن'
            },
            summaries: {
                start_logging: 'بمجرد تسجيل أول وجبة سيبدأ التطبيق بإعطائك صورة أوضح لباقي اليوم.',
                over_target: (coach) => `أنت أعلى من الهدف بحوالي ${coach.overCalories} kcal، لذلك من الأفضل أن تكون الوجبة التالية أخف.`,
                near_goal: (coach) => `المتبقي حوالي ${coach.remainingCalories} kcal فقط، لذلك يكفي سناك خفيف إذا احتجته.`,
                protein_gap: (coach) => `ما زال ينقصك حوالي ${coach.proteinGap}g للوصول إلى هدف البروتين اليومي.`,
                fiber_gap: (coach) => `ما زال ينقصك حوالي ${coach.fiberGap}g للوصول إلى يوم غني بالألياف.`,
                sodium_high: 'اختر وجبة أقل ملوحة لاحقاً حتى يعود التوازن لباقي اليوم.',
                steady: 'السعرات والعناصر الغذائية تسير بشكل متوازن حتى الآن.'
            },
            tips: {
                use_ai: 'ابدأ بتسجيل صورة بالذكاء الاصطناعي إذا أردت أسرع طريقة.',
                log_first_meal: 'إذا كنت مستعجلاً، أدخل السعرات والبروتين يدوياً أولاً.',
                protein_boost: 'في الوجبة القادمة جرّب البيض أو الدجاج أو اللبن أو التوفو.',
                fiber_boost: 'أضف خضاراً أو فاكهة أو بقوليات أو حبوباً كاملة لرفع الألياف.',
                watch_sodium: 'اشرب ماء أكثر وخفف من الشوربة والصلصات والأطعمة المصنعة.',
                portion_reset: 'تقليل النشويات أو السناك التالي إلى النصف يساعدك على العودة للمسار.',
                keep_momentum: 'حافظ على الإيقاع الحالي وراجع البطاقة مرة أخرى قبل العشاء.'
            },
            weeklyAverage: (value) => `المتوسط ${value} kcal`,
            weeklyDays: (days) => `${days} أيام مسجلة`,
            weeklyBest: (day, cal) => `${day} الأعلى ${cal} kcal`
        }
    }
};

uiCopyCatalog['zh-TW'] = zhTWUiCopy;
