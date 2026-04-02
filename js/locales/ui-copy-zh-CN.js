const zhCNUiCopy = {
    extra: {
        direction: 'ltr',
        todayLabel: '今天',
        metaTitle: 'Woof Cal 汪卡管家',
        metaOgTitle: 'Woof Cal 汪卡管家',
        metaDescription: '用 AI 分析照片或文字里的餐点，轻松追踪热量、体重与营养。',
        dailySummaryHint: '点一下看完整营养与水分',
        dailySummaryEmpty: '开始记下今天的饮食吧',
        dailySummaryLeftGoal: (value) => `距离目标还差 ${value} kcal`,
        dailySummaryLeftToday: (value) => `今天还剩 ${value} kcal`,
        dailySummaryOverTarget: (value) => `今天已超出 ${value} kcal`,
        dailySummaryTitle: (dateText) => `${dateText} 的营养摘要`,
        remainingLabel: '剩余',
        emptyStateEyebrow: '快速开始',
        emptyStateTitle: '先记下今天的第一餐',
        emptyStateBody: '你可以先拍照交给 AI，或用手动输入快速建立第一笔饮食记录。',
        emptyMealTitle: '还没有记录',
        emptyMealBody: '用 AI 或手动输入开始今天的第一笔饮食。',
        aiGuideEyebrow: 'AI 提示',
        aiGuideTitle: '让 AI 分析更快更稳',
        aiGuideBody: '清楚的照片，加上一句关键食材或份量描述，通常能让分析更稳定。',
        aiGuideTip1: '拍照时尽量避免食物被挡住',
        aiGuideTip2: '有包装食品时，可补上品牌或品名',
        aiGuideTip3: '如果结果不够准，可先编辑食材再重新计算',
        aiItemsRequired: '请至少保留一个食材项目。'
    },
    goal: {
        goalTypeLabel: '目标',
        goalSummaryLabel: '当前目标',
        calorieTargetLabel: '热量目标',
        reportTitle: '目标进度',
        reportSubtitle: '最近 7 天的达标与记录情况',
        goalTypes: {
            lose: '减重',
            maintain: '维持体重',
            gain: '增肌'
        },
        reportHeadline: (goal) => `${goal} 本周进度`,
        reportSummary: (insights) => `最近 7 天记录 ${insights.loggedDays} 天，热量达标 ${insights.calorieTargetDays} 天，蛋白质达标 ${insights.proteinTargetDays} 天`,
        statStreak: '连续记录',
        statBestStreak: '最佳 streak',
        statCalories: '热量达标',
        statProtein: '蛋白质达标',
        formatDayCount: (value) => `${value} 天`,
        formatWindowCount: (value, total) => `${value}/${total}`
    },
    coach: {
        cardTitle: '今日教练建议',
        weeklyTitle: '最近 7 天',
        headlines: {
            start_logging: '从第一餐开始建立今天的节奏',
            over_target: '今天的热量已经偏高',
            near_goal: '你已经接近今天的目标区间',
            protein_gap: '蛋白质还可以再补一点',
            fiber_gap: '纤维还可以再拉高一些',
            sodium_high: '今天的钠有点偏高',
            steady: '今天目前的节奏算稳定'
        },
        summaries: {
            start_logging: '先记下第一餐之后，仪表板和 AI 建议就会开始变得更有帮助。',
            over_target: (coach) => `目前比目标多了约 ${coach.overCalories} kcal，下一餐建议清爽一点。`,
            near_goal: (coach) => `距离今天目标只剩约 ${coach.remainingCalories} kcal，零食份量建议保守一些。`,
            protein_gap: (coach) => `距离今天的蛋白质目标还差约 ${coach.proteinGap}g。`,
            fiber_gap: (coach) => `今天距离理想纤维量还差约 ${coach.fiberGap}g。`,
            sodium_high: '下一餐清淡一点，整天的口味和营养平衡会更舒服。',
            steady: '目前热量和营养分配都算稳，继续保持就好。'
        },
        tips: {
            use_ai: '想快一点开始，直接用 AI 拍照记录通常最快。',
            log_first_meal: '如果很忙，也可以先手动记热量与蛋白质。',
            protein_boost: '下一餐可先补蛋、豆腐、鸡胸、酸奶或牛奶。',
            fiber_boost: '蔬菜、水果、豆类和全谷都很适合补纤维。',
            watch_sodium: '接下来多喝水，也先少一点汤品、酱料或加工食品。',
            portion_reset: '下一餐把主食或点心份量收小一点，通常就能把节奏拉回来。',
            keep_momentum: '维持现在的节奏，晚一点再回来看摘要就够了。'
        },
        weeklyAverage: (value) => `平均 ${value} kcal`,
        weeklyDays: (days) => `${days} 天有记录`,
        weeklyBest: (day, cal) => `${day} 最高 ${cal} kcal`
    },
    rhythm: {
        title: '7 天饮食节奏',
        subtitle: '用更生活化的方式，看这一周吃得如何。',
        dashboardSubtitle: '从最近 7 天的记录看出你的饮食节奏。',
        labels: {
            breakfast: '早餐',
            dinner: '晚餐',
            protein: '蛋白质',
            hydration: '水分'
        },
        headlines: {
            start_logging: '先记几餐，这张卡才会开始看出你的节奏',
            building_consistency: '这周已经开始有一点稳定感',
            steady_week: '这周的饮食节奏看起来算稳',
            breakfast_anchor: '早餐是这周最值得先固定下来的节奏',
            dinner_balance: '这周晚餐承担了比较多热量',
            protein_rhythm: '蛋白质的节奏还有点高低起伏'
        },
        summaries: {
            start_logging: '再多记几餐，系统就能开始整理这一周的饮食节奏。',
            building_consistency: '目前已经看得到一些规律，再多两三天稳定记录会更清楚。',
            steady_week: '你的餐次与营养节奏开始有一致性，整天比较容易维持稳定。',
            breakfast_anchor: '如果想让一天更稳，早餐通常是最值得先调整的地方。',
            dinner_balance: '这周晚餐吃得比较重，偶尔清爽一点会让整体更平衡。',
            protein_rhythm: '蛋白质高低落差比较明显，固定补充来源会更稳。'
        },
        breakfast: {
            steady: (signal) => `最近 7 天有 ${signal.breakfastDays}/${signal.loggedDays} 天吃早餐，开头算稳定。`,
            building: (signal) => `最近 7 天有 ${signal.breakfastDays}/${signal.loggedDays} 天记到早餐。`,
            irregular: (signal) => `最近 7 天只有 ${signal.breakfastDays}/${signal.loggedDays} 天出现早餐，节奏还在建立中。`
        },
        dinner: {
            light: () => '这周晚餐整体偏轻，白天分配得比较平均。',
            balanced: (signal) => `晚餐平均约占全天 ${signal.averageDinnerShare}% 的热量。`,
            heavy: (signal) => `最近 7 天有 ${signal.heavyDays}/${signal.loggedDays} 天是晚餐最重。`
        },
        protein: {
            steady: (signal) => `蛋白质平均每天约 ${signal.averageProtein}g，整体节奏算稳。`,
            building: (signal) => `最近 7 天里有 ${signal.targetDays}/${signal.loggedDays} 天接近你的蛋白质节奏。`,
            inconsistent: (signal) => `蛋白质分配还不够平均，目前只有 ${signal.targetDays}/${signal.loggedDays} 天比较稳。`
        },
        hydration: {
            placeholder: '等水分记录开启后，这里会开始显示喝水节奏。'
        }
    }
};

export default zhCNUiCopy;
