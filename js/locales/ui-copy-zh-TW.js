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
    },
    rhythm: {
        title: '近 7 天飲食節奏',
        subtitle: '用簡單方式看這一週的飲食一致性。',
        dashboardSubtitle: '從最近 7 天記錄看出你的飲食節奏。',
        labels: {
            breakfast: '早餐',
            dinner: '晚餐',
            protein: '蛋白質',
            hydration: '飲水'
        },
        headlines: {
            start_logging: '先記下幾餐，這張卡才會開始看見你的節奏',
            building_consistency: '這週已經開始出現可追蹤的節奏',
            steady_week: '這週的飲食節奏看起來算穩定',
            breakfast_anchor: '早餐是這週最值得先固定下來的環節',
            dinner_balance: '這週晚餐承擔了比較多熱量',
            protein_rhythm: '蛋白質節奏還有點忽高忽低'
        },
        summaries: {
            start_logging: '跨幾天先記下幾餐，系統就能開始幫你整理一週的節奏。',
            building_consistency: '目前已經看得到一些規律，再多幾天穩定記錄會更清楚。',
            steady_week: '你的餐次與營養節奏開始有一致性，整天更容易維持穩定。',
            breakfast_anchor: '如果想讓整天更穩，先把早餐節奏固定下來通常最有感。',
            dinner_balance: '這週晚餐吃得比較重，若其中一兩天稍微清爽一些，整體節奏會更平衡。',
            protein_rhythm: '蛋白質的落點還不太平均，若有固定的蛋白質主角會更穩。'
        },
        breakfast: {
            steady: (signal) => `近 7 天有 ${signal.breakfastDays}/${signal.loggedDays} 天有早餐，節奏相對穩定。`,
            building: (signal) => `近 7 天有 ${signal.breakfastDays}/${signal.loggedDays} 天有早餐，正在建立規律。`,
            irregular: (signal) => `近 7 天只有 ${signal.breakfastDays}/${signal.loggedDays} 天有早餐，還有空間更固定。`
        },
        dinner: {
            light: () => '這週晚餐整體偏輕，白天分配得不錯。',
            balanced: (signal) => `晚餐平均約占全天 ${signal.averageDinnerShare}% 熱量，算是中間帶。`,
            heavy: (signal) => `近 7 天有 ${signal.heavyDays}/${signal.loggedDays} 天晚餐偏重。`
        },
        protein: {
            steady: (signal) => `蛋白質平均約 ${signal.averageProtein}g，整體節奏算穩。`,
            building: (signal) => `近 7 天有 ${signal.targetDays}/${signal.loggedDays} 天接近蛋白質目標。`,
            inconsistent: (signal) => `蛋白質高低落差比較大，目前只有 ${signal.targetDays}/${signal.loggedDays} 天接近目標。`
        },
        hydration: {
            placeholder: '飲水節奏會在開啟喝水記錄後出現在這裡。'
        }
    }
};

export default zhTWUiCopy;
