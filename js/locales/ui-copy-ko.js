const koUiCopy = {
    extra: {
        direction: 'ltr',
        todayLabel: '오늘',
        metaTitle: 'Woof Cal',
        metaOgTitle: 'Woof Cal',
        metaDescription: 'AI로 사진이나 텍스트 식사를 분석하고, 칼로리와 체중, 영양을 가볍게 추적합니다.',
        dailySummaryHint: '눌러서 영양 상세 보기',
        dailySummaryEmpty: '오늘 식사를 기록해 보세요',
        dailySummaryLeftGoal: (value) => `목표까지 ${value} kcal 남음`,
        dailySummaryLeftToday: (value) => `오늘 ${value} kcal 남음`,
        dailySummaryOverTarget: (value) => `오늘 ${value} kcal 초과`,
        dailySummaryTitle: (dateText) => `${dateText} 영양 요약`,
        remainingLabel: '남음',
        emptyStateEyebrow: '빠른 시작',
        emptyStateTitle: '오늘의 첫 식사를 기록해 보세요',
        emptyStateBody: 'AI 사진 분석이나 수동 입력으로 오늘 식사를 시작할 수 있습니다.',
        emptyMealTitle: '아직 기록이 없습니다',
        emptyMealBody: 'AI 또는 수동 입력으로 첫 식사를 추가해 보세요',
        aiGuideEyebrow: 'AI 팁',
        aiGuideTitle: 'AI 분석을 더 빠르고 안정적으로',
        aiGuideBody: '사진을 또렷하게 찍고 재료나 양을 조금 덧붙이면 분석 결과가 더 안정적입니다.',
        aiGuideTip1: '접시가 가리지 않게 전체가 보이도록 찍기',
        aiGuideTip2: '필요하면 브랜드명이나 핵심 재료를 적기',
        aiGuideTip3: '결과가 어긋나면 재료를 먼저 수정한 뒤 다시 계산하기',
        aiItemsRequired: '최소 한 개의 재료는 남겨 주세요.'
    },
    goal: {
        goalTypeLabel: '목표',
        goalSummaryLabel: '현재 목표',
        calorieTargetLabel: '칼로리 목표',
        reportTitle: '목표 진행도',
        reportSubtitle: '최근 7일의 달성과 기록',
        goalTypes: {
            lose: '감량',
            maintain: '유지',
            gain: '근육 늘리기'
        },
        reportHeadline: (goal) => `${goal} 주간 진행도`,
        reportSummary: (insights) => `최근 7일 중 ${insights.loggedDays}일 기록, 칼로리 달성 ${insights.calorieTargetDays}일, 단백질 달성 ${insights.proteinTargetDays}일`,
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
            start_logging: '첫 식사를 기록하며 오늘을 시작하세요',
            over_target: '오늘 칼로리가 다소 높게 가고 있습니다',
            near_goal: '목표 구간에 꽤 가까워졌습니다',
            protein_gap: '단백질을 조금 더 보강하면 좋습니다',
            fiber_gap: '식이섬유를 조금 더 올릴 수 있습니다',
            sodium_high: '오늘 나트륨이 다소 높습니다',
            steady: '오늘 흐름은 비교적 안정적입니다'
        },
        summaries: {
            start_logging: '첫 식사를 기록하면 남은 하루에 대한 제안이 더 분명해집니다.',
            over_target: (coach) => `현재 목표보다 약 ${coach.overCalories} kcal 높으니, 다음 식사는 조금 가볍게 가는 편이 좋습니다.`,
            near_goal: (coach) => `남은 칼로리는 약 ${coach.remainingCalories} kcal 이므로 간식은 가볍게면 충분합니다.`,
            protein_gap: (coach) => `오늘 단백질 목표까지 약 ${coach.proteinGap}g 남았습니다.`,
            fiber_gap: (coach) => `식이섬유는 약 ${coach.fiberGap}g 정도 더 있으면 하루 균형이 좋아집니다.`,
            sodium_high: '다음 식사를 조금 덜 짜게 하면 오늘 전체 흐름이 더 편안해집니다.',
            steady: '칼로리와 영양 흐름이 지금까지는 비교적 안정적입니다.'
        },
        tips: {
            use_ai: '가장 빠른 시작은 AI 사진 기록입니다.',
            log_first_meal: '바쁠 때는 칼로리와 단백질만 먼저 수동으로 기록해도 충분합니다.',
            protein_boost: '다음 식사는 달걀, 두부, 닭가슴살, 요거트, 우유가 보강하기 쉽습니다.',
            fiber_boost: '채소, 과일, 콩류, 통곡물로 식이섬유를 채우기 쉽습니다.',
            watch_sodium: '물을 더 마시고 국물, 소스, 가공식품을 조금 줄여 보세요.',
            portion_reset: '다음 탄수화물이나 간식 양을 조금 줄이면 흐름을 되돌리기 쉽습니다.',
            keep_momentum: '지금 흐름을 유지하고 저녁 전에 요약을 한 번 더 보면 충분합니다.'
        },
        weeklyAverage: (value) => `평균 ${value} kcal`,
        weeklyDays: (days) => `${days}일 기록`,
        weeklyBest: (day, cal) => `${day} 최고 ${cal} kcal`
    },
    rhythm: {
        title: '7일 식사 리듬',
        subtitle: '이번 주 흐름을 생활감 있게 읽어 줍니다.',
        dashboardSubtitle: '최근 7일 기록에서 보이는 일관성입니다.',
        labels: {
            breakfast: '아침',
            dinner: '저녁',
            protein: '단백질',
            hydration: '수분'
        },
        headlines: {
            start_logging: '몇 끼만 기록해도 주간 리듬이 보이기 시작합니다',
            building_consistency: '반복 가능한 한 주가 조금씩 만들어지고 있습니다',
            steady_week: '이번 주 식사 리듬은 비교적 안정적입니다',
            breakfast_anchor: '아침이 가장 고정하기 쉬운 기준점입니다',
            dinner_balance: '저녁 비중이 지금은 조금 큽니다',
            protein_rhythm: '단백질 흐름은 아직 날짜마다 흔들립니다'
        },
        summaries: {
            start_logging: '몇 끼만 더 기록하면 이 카드에 당신의 식사 흐름이 드러납니다.',
            building_consistency: '일부 패턴이 보이기 시작했습니다. 2~3일만 더 꾸준하면 훨씬 선명해집니다.',
            steady_week: '식사 흐름이 반복되기 시작해서 하루 전체를 맞추기 쉬워지고 있습니다.',
            breakfast_anchor: '하루를 안정적으로 만들고 싶다면 먼저 아침을 고정하는 편이 가장 쉽습니다.',
            dinner_balance: '저녁이 이번 주의 큰 비중을 차지하고 있습니다. 한두 번 가볍게 가면 더 매끈해집니다.',
            protein_rhythm: '단백질 섭취가 아직 들쭉날쭉합니다. 고정된 보강 포인트가 있으면 더 안정됩니다.'
        },
        breakfast: {
            steady: (signal) => `${signal.loggedDays}일 중 ${signal.breakfastDays}일에 아침이 기록되어 시작이 비교적 안정적입니다.`,
            building: (signal) => `${signal.loggedDays}일 중 ${signal.breakfastDays}일에 아침이 기록되었습니다.`,
            irregular: (signal) => `${signal.loggedDays}일 중 아침이 있었던 날은 ${signal.breakfastDays}일입니다.`
        },
        dinner: {
            light: () => '이번 주 저녁은 비교적 가볍게 유지되고 있습니다.',
            balanced: (signal) => `저녁은 하루 칼로리의 약 ${signal.averageDinnerShare}%를 차지하고 있습니다.`,
            heavy: (signal) => `${signal.loggedDays}일 중 ${signal.heavyDays}일은 저녁이 가장 무거웠습니다.`
        },
        protein: {
            steady: (signal) => `단백질은 하루 평균 ${signal.averageProtein}g로 비교적 안정적입니다.`,
            building: (signal) => `${signal.loggedDays}일 중 ${signal.targetDays}일이 단백질 페이스에 가까웠습니다.`,
            inconsistent: (signal) => `단백질 분포는 아직 고르지 않고, 안정적인 날은 ${signal.targetDays}/${signal.loggedDays}일입니다.`
        },
        hydration: {
            placeholder: '수분 기록이 시작되면 여기에 물 리듬이 표시됩니다.'
        }
    }
};

export default koUiCopy;
