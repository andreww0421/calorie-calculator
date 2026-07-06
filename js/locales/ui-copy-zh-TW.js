const zhTWUiCopy = {
    extra: {
        direction: 'ltr',
        todayLabel: '今天',
        metaTitle: 'Woof Cal 汪卡管家',
        metaOgTitle: 'Woof Cal 汪卡管家',
        metaDescription: '用 AI 分析照片或文字中的餐點，輕鬆追蹤熱量、體重與營養節奏。',
        dailySummaryHint: '點一下查看完整營養摘要',
        dailySummaryEmpty: '先記下今天的第一餐吧',
        dailySummaryLeftGoal: (value) => `距離目標還差 ${value} kcal`,
        dailySummaryLeftToday: (value) => `今天還剩 ${value} kcal`,
        dailySummaryOverTarget: (value) => `今天已超過 ${value} kcal`,
        dailySummaryTitle: (dateText) => `${dateText} 的營養摘要`,
        remainingLabel: '剩餘',
        emptyStateEyebrow: '快速開始',
        emptyStateTitle: '先記下今天的第一餐',
        emptyStateBody: '先用 AI 或手動輸入建立第一筆紀錄，今天的儀表板就會完整展開。',
        emptyMealTitle: '還沒有任何餐點',
        emptyMealBody: '用 AI 或手動輸入開始今天的第一筆紀錄',
        aiGuideEyebrow: 'AI 提示',
        aiGuideTitle: '讓 AI 讀得更快也更準',
        aiGuideBody: '清楚的照片加上一點食材或份量說明，通常就能讓分析更穩定。',
        aiGuideTip1: '拍照時盡量避免餐點被手或餐具遮住',
        aiGuideTip2: '包裝食品可補上品牌或口味資訊',
        aiGuideTip3: '結果不準時，先編修食材再重新計算',
        aiItemsRequired: '請至少保留一個食材項目。'
    },
    goal: {
        goalTypeLabel: '目標',
        goalSummaryLabel: '目前目標',
        calorieTargetLabel: '熱量目標',
        reportTitle: '目標進度',
        reportSubtitle: '最近 7 天的達標與記錄狀況',
        goalTypes: {
            lose: '減重',
            maintain: '維持體重',
            gain: '增肌'
        },
        reportHeadline: (goal) => `${goal} 本週進度`,
        reportSummary: (insights) => `最近 7 天記錄了 ${insights.loggedDays}/7 天，熱量達標 ${insights.calorieTargetDays} 天，蛋白質達標 ${insights.proteinTargetDays} 天`,
        statStreak: '目前連續天數',
        statBestStreak: '最佳連續天數',
        statCalories: '熱量達標',
        statProtein: '蛋白質達標',
        formatDayCount: (value) => `${value} 天`,
        formatWindowCount: (value, total) => `${value}/${total}`
    },
    coach: {
        cardTitle: '今日教練',
        weeklyTitle: '最近 7 天',
        headlines: {
            start_logging: '從第一餐開始建立今天的節奏',
            over_target: '今天的熱量已經有點偏高',
            near_goal: '你已經接近今天的目標區間',
            protein_gap: '蛋白質還可以再補一點',
            fiber_gap: '纖維還有再拉高的空間',
            sodium_high: '今天的鈉稍微偏高',
            steady: '今天目前走在穩定的方向上'
        },
        summaries: {
            start_logging: '先記下第一餐，儀表板就能開始根據今天的內容給你更有效的提醒。',
            over_target: (coach) => `目前大約比目標多了 ${coach.overCalories} kcal，下一餐建議輕一點。`,
            near_goal: (coach) => `距離今天目標只剩大約 ${coach.remainingCalories} kcal，點心建議保守一些。`,
            protein_gap: (coach) => `距離今天的蛋白質目標還差大約 ${coach.proteinGap}g。`,
            fiber_gap: (coach) => `距離理想的纖維量還差大約 ${coach.fiberGap}g。`,
            sodium_high: '下一餐清淡一點，整天會更平衡。',
            steady: '目前熱量與營養分配都算穩，照著這個節奏繼續就好。'
        },
        tips: {
            use_ai: '想更快開始，直接用 AI 拍照記錄通常最快。',
            log_first_meal: '如果很忙，也可以先記熱量與蛋白質，晚點再補細節。',
            protein_boost: '下一餐可優先補雞蛋、豆腐、雞胸、優格或牛奶。',
            fiber_boost: '蔬菜、水果、豆類與全穀都很適合補纖維。',
            watch_sodium: '接下來多喝水，也先少一點湯、醬料與加工食品。',
            portion_reset: '把下一餐的主食或點心收小一點，通常就能把節奏拉回來。',
            keep_momentum: '維持現在的節奏，晚一點再回來看一次摘要就夠了。'
        },
        weeklyAverage: (value) => `平均 ${value} kcal`,
        weeklyDays: (days) => `${days} 天有記錄`,
        weeklyBest: (day, cal) => `${day} 最高 ${cal} kcal`
    },
    rhythm: {
        title: '7 天飲食節奏',
        subtitle: '用更直觀的方式，看這一週吃得如何。',
        dashboardSubtitle: '從最近 7 天的記錄讀出你的餐次與營養節奏。',
        labels: {
            breakfast: '早餐',
            dinner: '晚餐',
            protein: '蛋白質',
            hydration: '喝水'
        },
        headlines: {
            start_logging: '先記幾餐，這張卡才會開始看出你的節奏',
            building_consistency: '這一週已經慢慢有穩定感',
            steady_week: '這一週的飲食節奏看起來算穩',
            breakfast_anchor: '早餐是最值得先固定下來的節奏點',
            dinner_balance: '晚餐目前承擔了比較多的熱量',
            protein_rhythm: '蛋白質的分配還有點忽高忽低'
        },
        summaries: {
            start_logging: '再多記幾餐，系統就能開始整理這一週的節奏。',
            building_consistency: '目前已經看得到一些規律，再多兩三天穩定記錄會更清楚。',
            steady_week: '你的餐次與營養節奏開始有一致性，整天也比較容易穩住。',
            breakfast_anchor: '如果想讓一天更穩，早餐通常是最值得先調整的地方。',
            dinner_balance: '這一週晚餐偏重，偶爾清爽一點會讓整體更平衡。',
            protein_rhythm: '蛋白質分配還不夠平均，固定補充來源會更穩。'
        },
        breakfast: {
            steady: (signal) => `最近 7 天有 ${signal.breakfastDays}/${signal.loggedDays} 天吃早餐，起點很穩。`,
            building: (signal) => `最近 7 天有 ${signal.breakfastDays}/${signal.loggedDays} 天記到早餐。`,
            irregular: (signal) => `最近 7 天只有 ${signal.breakfastDays}/${signal.loggedDays} 天出現早餐，節奏還在建立中。`
        },
        dinner: {
            light: () => '這一週晚餐整體偏輕，白天分配得比較平均。',
            balanced: (signal) => `晚餐平均大約佔全天 ${signal.averageDinnerShare}% 的熱量。`,
            heavy: (signal) => `最近 7 天有 ${signal.heavyDays}/${signal.loggedDays} 天是晚餐最重。`
        },
        protein: {
            steady: (signal) => `蛋白質平均每天約 ${signal.averageProtein}g，整體節奏算穩。`,
            building: (signal) => `最近 7 天有 ${signal.targetDays}/${signal.loggedDays} 天接近你的蛋白質節奏。`,
            inconsistent: (signal) => `蛋白質分配還不夠平均，目前只有 ${signal.targetDays}/${signal.loggedDays} 天較穩。`
        },
        hydration: {
            placeholder: '等喝水記錄開啟後，這裡會開始顯示喝水節奏。'
        }
    }
};

export default zhTWUiCopy;
