const zhTWUiCopy = {
    extra: {
        direction: 'ltr',
        todayLabel: '今天',
        metaTitle: 'Woof Cal 汪卡管家',
        metaOgTitle: 'Woof Cal 汪卡管家',
        metaDescription: '用 AI 分析照片或文字裡的餐點，輕鬆追蹤熱量、體重與營養。',
        dailySummaryHint: '點一下看完整營養與水分',
        dailySummaryEmpty: '開始記下今天的飲食吧',
        dailySummaryLeftGoal: (value) => `距離目標還差 ${value} kcal`,
        dailySummaryLeftToday: (value) => `今天還剩 ${value} kcal`,
        dailySummaryOverTarget: (value) => `今天已超出 ${value} kcal`,
        dailySummaryTitle: (dateText) => `${dateText} 的營養摘要`,
        remainingLabel: '剩餘',
        emptyStateEyebrow: '快速開始',
        emptyStateTitle: '先記下今天的第一餐',
        emptyStateBody: '你可以先拍照交給 AI，或用手動輸入快速建立第一筆飲食記錄。',
        emptyMealTitle: '還沒有記錄',
        emptyMealBody: '用 AI 或手動輸入開始今天的第一筆飲食。',
        aiGuideEyebrow: 'AI 提示',
        aiGuideTitle: '讓 AI 分析更快更穩',
        aiGuideBody: '清楚的照片，加上一句關鍵食材或份量描述，通常能讓分析更穩定。',
        aiGuideTip1: '拍照時盡量避免食物被遮住',
        aiGuideTip2: '有包裝食品時，可補上品牌或品名',
        aiGuideTip3: '如果結果不夠準，可先編輯食材再重新計算',
        aiItemsRequired: '請至少保留一個食材項目。'
    },
    goal: {
        goalTypeLabel: '目標',
        goalSummaryLabel: '目前目標',
        calorieTargetLabel: '熱量目標',
        reportTitle: '目標進度',
        reportSubtitle: '最近 7 天的達標與記錄情況',
        goalTypes: {
            lose: '減重',
            maintain: '維持體重',
            gain: '增肌'
        },
        reportHeadline: (goal) => `${goal} 本週進度`,
        reportSummary: (insights) => `最近 7 天記錄 ${insights.loggedDays} 天，熱量達標 ${insights.calorieTargetDays} 天，蛋白質達標 ${insights.proteinTargetDays} 天`,
        statStreak: '連續記錄',
        statBestStreak: '最佳 streak',
        statCalories: '熱量達標',
        statProtein: '蛋白質達標',
        formatDayCount: (value) => `${value} 天`,
        formatWindowCount: (value, total) => `${value}/${total}`
    },
    coach: {
        cardTitle: '今日教練建議',
        weeklyTitle: '最近 7 天',
        headlines: {
            start_logging: '從第一餐開始建立今天的節奏',
            over_target: '今天的熱量已經偏高',
            near_goal: '你已經接近今天的目標區間',
            protein_gap: '蛋白質還可以再補一點',
            fiber_gap: '纖維還可以再拉高一些',
            sodium_high: '今天的鈉有點偏高',
            steady: '今天目前的節奏算穩定'
        },
        summaries: {
            start_logging: '先記下第一餐之後，儀表板和 AI 建議就會開始變得更有幫助。',
            over_target: (coach) => `目前比目標多了約 ${coach.overCalories} kcal，下一餐建議清爽一點。`,
            near_goal: (coach) => `距離今天目標只剩約 ${coach.remainingCalories} kcal，點心份量建議保守一些。`,
            protein_gap: (coach) => `距離今天的蛋白質目標還差約 ${coach.proteinGap}g。`,
            fiber_gap: (coach) => `今天距離理想纖維量還差約 ${coach.fiberGap}g。`,
            sodium_high: '下一餐清淡一點，整天的口味和營養平衡會更舒服。',
            steady: '目前熱量和營養分配都算穩，繼續保持就好。'
        },
        tips: {
            use_ai: '想快一點開始，直接用 AI 拍照記錄通常最快。',
            log_first_meal: '如果很忙，也可以先手動記熱量與蛋白質。',
            protein_boost: '下一餐可先補蛋、豆腐、雞胸、優格或牛奶。',
            fiber_boost: '蔬菜、水果、豆類和全穀都很適合補纖維。',
            watch_sodium: '接下來多喝水，也先少一點湯品、醬料或加工食品。',
            portion_reset: '下一餐把主食或點心份量收小一點，通常就能把節奏拉回來。',
            keep_momentum: '維持現在的節奏，晚一點再回來看摘要就夠了。'
        },
        weeklyAverage: (value) => `平均 ${value} kcal`,
        weeklyDays: (days) => `${days} 天有記錄`,
        weeklyBest: (day, cal) => `${day} 最高 ${cal} kcal`
    },
    rhythm: {
        title: '7 天飲食節奏',
        subtitle: '用比較生活化的方式，看這一週吃得如何。',
        dashboardSubtitle: '從最近 7 天的記錄看出你的飲食節奏。',
        labels: {
            breakfast: '早餐',
            dinner: '晚餐',
            protein: '蛋白質',
            hydration: '水分'
        },
        headlines: {
            start_logging: '先記幾餐，這張卡才會開始看出你的節奏',
            building_consistency: '這週已經開始有一點穩定感',
            steady_week: '這週的飲食節奏看起來算穩',
            breakfast_anchor: '早餐是這週最值得先固定下來的節奏',
            dinner_balance: '這週晚餐承擔了比較多熱量',
            protein_rhythm: '蛋白質的節奏還有點高低起伏'
        },
        summaries: {
            start_logging: '再多記幾餐，系統就能開始整理這一週的飲食節奏。',
            building_consistency: '目前已經看得到一些規律，再多兩三天穩定記錄會更清楚。',
            steady_week: '你的餐次與營養節奏開始有一致性，整天比較容易維持穩定。',
            breakfast_anchor: '如果想讓一天更穩，早餐通常是最值得先調整的地方。',
            dinner_balance: '這週晚餐吃得比較重，偶爾清爽一點會讓整體更平衡。',
            protein_rhythm: '蛋白質高低落差比較明顯，固定補充來源會更穩。'
        },
        breakfast: {
            steady: (signal) => `最近 7 天有 ${signal.breakfastDays}/${signal.loggedDays} 天吃早餐，開頭算穩定。`,
            building: (signal) => `最近 7 天有 ${signal.breakfastDays}/${signal.loggedDays} 天記到早餐。`,
            irregular: (signal) => `最近 7 天只有 ${signal.breakfastDays}/${signal.loggedDays} 天出現早餐，節奏還在建立中。`
        },
        dinner: {
            light: () => '這週晚餐整體偏輕，白天分配得比較平均。',
            balanced: (signal) => `晚餐平均約占全天 ${signal.averageDinnerShare}% 的熱量。`,
            heavy: (signal) => `最近 7 天有 ${signal.heavyDays}/${signal.loggedDays} 天是晚餐最重。`
        },
        protein: {
            steady: (signal) => `蛋白質平均每天約 ${signal.averageProtein}g，整體節奏算穩。`,
            building: (signal) => `最近 7 天裡有 ${signal.targetDays}/${signal.loggedDays} 天接近你的蛋白質節奏。`,
            inconsistent: (signal) => `蛋白質分配還不夠平均，目前只有 ${signal.targetDays}/${signal.loggedDays} 天比較穩。`
        },
        hydration: {
            placeholder: '等水分記錄開啟後，這裡會開始顯示喝水節奏。'
        }
    }
};

export default zhTWUiCopy;
