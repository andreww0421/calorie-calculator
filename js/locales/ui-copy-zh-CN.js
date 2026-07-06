const zhCNUiCopy = {
    extra: {
        direction: 'ltr',
        todayLabel: '今天',
        metaTitle: 'Woof Cal 汪卡管家',
        metaOgTitle: 'Woof Cal 汪卡管家',
        metaDescription: '用 AI 分析照片或文字中的餐点，轻松追踪热量、体重与营养节奏。',
        dailySummaryHint: '点一下查看完整营养摘要',
        dailySummaryEmpty: '先记下今天的第一餐吧',
        dailySummaryLeftGoal: (value) => `距离目标还差 ${value} kcal`,
        dailySummaryLeftToday: (value) => `今天还剩 ${value} kcal`,
        dailySummaryOverTarget: (value) => `今天已超过 ${value} kcal`,
        dailySummaryTitle: (dateText) => `${dateText} 的营养摘要`,
        remainingLabel: '剩余',
        emptyStateEyebrow: '快速开始',
        emptyStateTitle: '先记下今天的第一餐',
        emptyStateBody: '先用 AI 或手动输入建立第一条记录，今天的仪表板就会完整展开。',
        emptyMealTitle: '还没有任何餐点',
        emptyMealBody: '用 AI 或手动输入开始今天的第一条记录',
        aiGuideEyebrow: 'AI 提示',
        aiGuideTitle: '让 AI 读得更快也更准',
        aiGuideBody: '清楚的照片加上一点食材或份量说明，通常就能让分析更稳定。',
        aiGuideTip1: '拍照时尽量避免餐点被手或餐具挡住',
        aiGuideTip2: '包装食品可以补上品牌或口味信息',
        aiGuideTip3: '结果不准时，先编辑食材再重新计算',
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
        reportSummary: (insights) => `最近 7 天记录了 ${insights.loggedDays}/7 天，热量达标 ${insights.calorieTargetDays} 天，蛋白质达标 ${insights.proteinTargetDays} 天`,
        statStreak: '当前连续天数',
        statBestStreak: '最佳连续天数',
        statCalories: '热量达标',
        statProtein: '蛋白质达标',
        formatDayCount: (value) => `${value} 天`,
        formatWindowCount: (value, total) => `${value}/${total}`
    },
    coach: {
        cardTitle: '今日教练',
        weeklyTitle: '最近 7 天',
        headlines: {
            start_logging: '从第一餐开始建立今天的节奏',
            over_target: '今天的热量已经有点偏高',
            near_goal: '你已经接近今天的目标区间',
            protein_gap: '蛋白质还可以再补一点',
            fiber_gap: '纤维还有再拉高的空间',
            sodium_high: '今天的钠稍微偏高',
            steady: '今天目前走在稳定的方向上'
        },
        summaries: {
            start_logging: '先记下第一餐，仪表板就能开始根据今天的内容给你更有效的提醒。',
            over_target: (coach) => `目前大约比目标多了 ${coach.overCalories} kcal，下一餐建议轻一点。`,
            near_goal: (coach) => `距离今天目标只剩大约 ${coach.remainingCalories} kcal，零食建议保守一些。`,
            protein_gap: (coach) => `距离今天的蛋白质目标还差大约 ${coach.proteinGap}g。`,
            fiber_gap: (coach) => `距离理想的纤维量还差大约 ${coach.fiberGap}g。`,
            sodium_high: '下一餐清淡一点，整天会更平衡。',
            steady: '目前热量与营养分配都算稳，照着这个节奏继续就好。'
        },
        tips: {
            use_ai: '想更快开始，直接用 AI 拍照记录通常最快。',
            log_first_meal: '如果很忙，也可以先记热量与蛋白质，晚点再补细节。',
            protein_boost: '下一餐可优先补鸡蛋、豆腐、鸡胸、酸奶或牛奶。',
            fiber_boost: '蔬菜、水果、豆类与全谷都很适合补纤维。',
            watch_sodium: '接下来多喝水，也先少一点汤、酱料与加工食品。',
            portion_reset: '把下一餐的主食或零食缩小一点，通常就能把节奏拉回来。',
            keep_momentum: '维持现在的节奏，晚一点再回来看一次摘要就够了。'
        },
        weeklyAverage: (value) => `平均 ${value} kcal`,
        weeklyDays: (days) => `${days} 天有记录`,
        weeklyBest: (day, cal) => `${day} 最高 ${cal} kcal`
    },
    rhythm: {
        title: '7 天饮食节奏',
        subtitle: '用更直观的方式，看这一周吃得如何。',
        dashboardSubtitle: '从最近 7 天的记录读出你的餐次与营养节奏。',
        labels: {
            breakfast: '早餐',
            dinner: '晚餐',
            protein: '蛋白质',
            hydration: '喝水'
        },
        headlines: {
            start_logging: '先记几餐，这张卡才会开始看出你的节奏',
            building_consistency: '这一周已经慢慢有稳定感',
            steady_week: '这一周的饮食节奏看起来算稳',
            breakfast_anchor: '早餐是最值得先固定下来的节奏点',
            dinner_balance: '晚餐目前承担了比较多的热量',
            protein_rhythm: '蛋白质的分配还有点忽高忽低'
        },
        summaries: {
            start_logging: '再多记几餐，系统就能开始整理这一周的节奏。',
            building_consistency: '目前已经看得到一些规律，再多两三天稳定记录会更清楚。',
            steady_week: '你的餐次与营养节奏开始有一致性，整天也比较容易稳住。',
            breakfast_anchor: '如果想让一天更稳，早餐通常是最值得先调整的地方。',
            dinner_balance: '这一周晚餐偏重，偶尔清爽一点会让整体更平衡。',
            protein_rhythm: '蛋白质分配还不够平均，固定补充来源会更稳。'
        },
        breakfast: {
            steady: (signal) => `最近 7 天有 ${signal.breakfastDays}/${signal.loggedDays} 天吃早餐，起点很稳。`,
            building: (signal) => `最近 7 天有 ${signal.breakfastDays}/${signal.loggedDays} 天记到早餐。`,
            irregular: (signal) => `最近 7 天只有 ${signal.breakfastDays}/${signal.loggedDays} 天出现早餐，节奏还在建立中。`
        },
        dinner: {
            light: () => '这一周晚餐整体偏轻，白天分配得比较平均。',
            balanced: (signal) => `晚餐平均大约占全天 ${signal.averageDinnerShare}% 的热量。`,
            heavy: (signal) => `最近 7 天有 ${signal.heavyDays}/${signal.loggedDays} 天是晚餐最重。`
        },
        protein: {
            steady: (signal) => `蛋白质平均每天约 ${signal.averageProtein}g，整体节奏算稳。`,
            building: (signal) => `最近 7 天有 ${signal.targetDays}/${signal.loggedDays} 天接近你的蛋白质节奏。`,
            inconsistent: (signal) => `蛋白质分配还不够平均，目前只有 ${signal.targetDays}/${signal.loggedDays} 天较稳。`
        },
        hydration: {
            placeholder: '等喝水记录开启后，这里会开始显示喝水节奏。'
        }
    }
};

export default zhCNUiCopy;
