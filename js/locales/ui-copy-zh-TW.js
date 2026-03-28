const zhTWUiCopy = {
    extra: {
        direction: 'ltr',
        todayLabel: '今天',
        metaTitle: 'Woof Cal 汪卡管家',
        metaOgTitle: 'Woof Cal 汪卡管家 - AI 飲食與熱量追蹤',
        metaDescription: '透過 AI 分析照片或文字飲食內容，追蹤每日熱量、體重與營養素。',
        dailySummaryHint: '點擊查看完整營養與水分',
        dailySummaryEmpty: '開始記錄今天的飲食吧',
        dailySummaryLeftGoal: (value) => `距離目標還差 ${value} kcal`,
        dailySummaryLeftToday: (value) => `今天還差 ${value} kcal`,
        dailySummaryOverTarget: (value) => `已超過目標 ${value} kcal`,
        dailySummaryTitle: (dateText) => `${dateText} 營養總覽`,
        remainingLabel: '剩餘熱量',
        emptyStateEyebrow: '快速開始',
        emptyStateTitle: '記下今天的第一餐',
        emptyStateBody: '你可以先拍照交給 AI，或用手動輸入快速建立第一筆飲食紀錄。',
        emptyMealTitle: '還沒有紀錄',
        emptyMealBody: '使用 AI 或手動輸入開始',
        aiGuideEyebrow: 'AI 提示',
        aiGuideTitle: '讓 AI 更快更準',
        aiGuideBody: '清楚的照片、食材名稱與份量描述，能讓分析結果更穩定。',
        aiGuideTip1: '拍照時盡量避免食物被遮住',
        aiGuideTip2: '有包裝食品時可補上品牌名稱',
        aiGuideTip3: '如果結果不準，可先編輯食材再重新計算',
        aiItemsRequired: '請至少保留一個食材項目。'
    },
    goal: {
        goalTypeLabel: '目標',
        goalSummaryLabel: '目前目標',
        calorieTargetLabel: '熱量目標',
        reportTitle: '目標進度',
        reportSubtitle: '最近 7 天的達標與紀錄狀況',
        goalTypes: {
            lose: '減重',
            maintain: '維持體重',
            gain: '增肌'
        },
        reportHeadline: (goal) => `${goal} 本週進度`,
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
        weeklyTitle: '最近 7 天',
        headlines: {
            start_logging: '從第一餐開始建立今天的節奏',
            over_target: '今天的熱量已經偏高',
            near_goal: '今天很接近目標區間',
            protein_gap: '蛋白質還有補強空間',
            fiber_gap: '纖維可以再補一點',
            sodium_high: '今天的鈉攝取偏高',
            steady: '今天的進度很穩定'
        },
        summaries: {
            start_logging: '先記下第一餐，儀表板和 AI 建議就能開始提供回饋。',
            over_target: (coach) => `目前比目標多 ${coach.overCalories} kcal，下一餐建議清淡一點。`,
            near_goal: (coach) => `距離目標只差 ${coach.remainingCalories} kcal，加餐建議保守一些。`,
            protein_gap: (coach) => `距離今天的蛋白質建議量還差約 ${coach.proteinGap}g。`,
            fiber_gap: (coach) => `今天的纖維距離建議值還差約 ${coach.fiberGap}g。`,
            sodium_high: '下一餐建議減少重口味與加工食品，讓整天更平衡。',
            steady: '目前熱量與營養節奏都算穩定，繼續保持。'
        },
        tips: {
            use_ai: '先用 AI 拍照記錄，通常最快。',
            log_first_meal: '如果趕時間，也可以先手動輸入熱量和蛋白質。',
            protein_boost: '下一餐可優先補蛋、豆腐、雞胸或優格。',
            fiber_boost: '加一份蔬菜、水果、豆類或全穀類，纖維會更完整。',
            watch_sodium: '接下來多喝水，並減少湯品、醬料與加工食品。',
            portion_reset: '下一餐把主食或點心減半，通常就能把節奏拉回來。',
            keep_momentum: '保持現在的節奏，晚餐前再看一次摘要卡。'
        },
        weeklyAverage: (value) => `平均 ${value} kcal`,
        weeklyDays: (days) => `${days} 天有完成紀錄`,
        weeklyBest: (day, cal) => `${day} 最高 ${cal} kcal`
    }
};

export default zhTWUiCopy;
