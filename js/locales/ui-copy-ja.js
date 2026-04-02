const jaUiCopy = {
    extra: {
        direction: 'ltr',
        todayLabel: '今日',
        metaTitle: 'Woof Cal',
        metaOgTitle: 'Woof Cal',
        metaDescription: 'AI で写真やテキストの食事を分析し、カロリー、体重、栄養を手軽に追跡します。',
        dailySummaryHint: 'タップして栄養の詳細を見る',
        dailySummaryEmpty: '今日の食事を記録しましょう',
        dailySummaryLeftGoal: (value) => `目標まであと ${value} kcal`,
        dailySummaryLeftToday: (value) => `今日はあと ${value} kcal`,
        dailySummaryOverTarget: (value) => `今日は ${value} kcal オーバー`,
        dailySummaryTitle: (dateText) => `${dateText} の栄養サマリー`,
        remainingLabel: '残り',
        emptyStateEyebrow: 'クイックスタート',
        emptyStateTitle: '今日の最初の一食を記録しよう',
        emptyStateBody: 'AI 写真解析か手動入力で、今日の食事記録を始められます。',
        emptyMealTitle: 'まだ記録がありません',
        emptyMealBody: 'AI または手動入力で最初の一食を追加しましょう',
        aiGuideEyebrow: 'AI ヒント',
        aiGuideTitle: 'AI 分析をもっと速く、安定して',
        aiGuideBody: '写真を見やすくして、食材や量を少し補足すると、分析が安定しやすくなります。',
        aiGuideTip1: '料理全体が見えるように撮影する',
        aiGuideTip2: '必要なときはブランド名や主要食材を添える',
        aiGuideTip3: '結果がずれていたら、食材を編集してから再計算する',
        aiItemsRequired: '少なくとも 1 件の食材を残してください。'
    },
    goal: {
        goalTypeLabel: '目標',
        goalSummaryLabel: '現在の目標',
        calorieTargetLabel: 'カロリー目標',
        reportTitle: '目標の進み具合',
        reportSubtitle: '直近 7 日の達成と記録',
        goalTypes: {
            lose: '減量',
            maintain: '維持',
            gain: '筋肉をつける'
        },
        reportHeadline: (goal) => `${goal} の週間進捗`,
        reportSummary: (insights) => `直近 7 日で ${insights.loggedDays} 日記録、カロリー達成 ${insights.calorieTargetDays} 日、たんぱく質達成 ${insights.proteinTargetDays} 日`,
        statStreak: '連続記録',
        statBestStreak: 'ベスト streak',
        statCalories: 'カロリー達成',
        statProtein: 'たんぱく質達成',
        formatDayCount: (value) => `${value}日`,
        formatWindowCount: (value, total) => `${value}/${total}`
    },
    coach: {
        cardTitle: '今日のコーチ',
        weeklyTitle: '直近 7 日',
        headlines: {
            start_logging: 'まずは一食記録して今日を始めよう',
            over_target: '今日はカロリーがやや高めです',
            near_goal: '目標ゾーンにかなり近づいています',
            protein_gap: 'たんぱく質をもう少し足したいです',
            fiber_gap: '食物繊維を少し足す余地があります',
            sodium_high: '今日は塩分がやや高めです',
            steady: '今日はここまで安定した流れです'
        },
        summaries: {
            start_logging: '最初の一食を記録すると、残りの一日への提案が見えやすくなります。',
            over_target: (coach) => `目標より約 ${coach.overCalories} kcal 多いので、次の食事は軽めが合います。`,
            near_goal: (coach) => `残りは約 ${coach.remainingCalories} kcal なので、間食は控えめで十分です。`,
            protein_gap: (coach) => `今日のたんぱく質目標まであと約 ${coach.proteinGap}g です。`,
            fiber_gap: (coach) => `食物繊維はあと約 ${coach.fiberGap}g あると一日が整いやすいです。`,
            sodium_high: '次の食事を少し薄味にすると、全体のバランスが戻りやすくなります。',
            steady: 'カロリーも栄養もここまでは比較的安定しています。'
        },
        tips: {
            use_ai: 'いちばん速いのは AI 写真記録です。',
            log_first_meal: '忙しい日は、まずカロリーとたんぱく質だけ手入力でも十分です。',
            protein_boost: '次は卵、豆腐、鶏むね、ヨーグルト、牛乳などが補いやすいです。',
            fiber_boost: '野菜、果物、豆類、全粒穀物で食物繊維を足しやすくなります。',
            watch_sodium: '水分をとって、汁物やソース、加工食品を少し控えると整いやすいです。',
            portion_reset: '次の主食や間食を少し小さくすると、流れを戻しやすくなります。',
            keep_momentum: '今のペースを保って、夕方にもう一度サマリーを見れば十分です。'
        },
        weeklyAverage: (value) => `平均 ${value} kcal`,
        weeklyDays: (days) => `${days} 日記録`,
        weeklyBest: (day, cal) => `${day} 最大 ${cal} kcal`
    },
    rhythm: {
        title: '7日間の食事リズム',
        subtitle: 'この一週間の流れをやさしく読み取ります。',
        dashboardSubtitle: '直近 7 日の記録から見える一貫性です。',
        labels: {
            breakfast: '朝食',
            dinner: '夕食',
            protein: 'たんぱく質',
            hydration: '水分'
        },
        headlines: {
            start_logging: '数日の記録で一週間の流れが見えてきます',
            building_consistency: '少しずつ繰り返しやすい週になってきました',
            steady_week: '今週の食事リズムは比較的安定しています',
            breakfast_anchor: '朝食が一番整えやすいポイントです',
            dinner_balance: '夕食に少し重さが寄っています',
            protein_rhythm: 'たんぱく質の流れはまだ日によってぶれています'
        },
        summaries: {
            start_logging: '数日の記録がたまると、このカードに食事の流れが見えてきます。',
            building_consistency: 'いくつかの傾向が見え始めています。あと 2〜3 日続くともっとはっきりします。',
            steady_week: '食事の流れに繰り返しが出てきていて、一日を整えやすくなっています。',
            breakfast_anchor: '一日を安定させたいなら、まず朝食を整えるのがいちばん手堅いです。',
            dinner_balance: '夕食が今週の大きな比重を占めています。少し軽い夜があると整いやすくなります。',
            protein_rhythm: 'たんぱく質の取り方にばらつきがあります。固定の補給ポイントがあると安定します。'
        },
        breakfast: {
            steady: (signal) => `${signal.loggedDays} 日のうち ${signal.breakfastDays} 日で朝食が記録され、出だしは安定しています。`,
            building: (signal) => `${signal.loggedDays} 日のうち ${signal.breakfastDays} 日で朝食が記録されています。`,
            irregular: (signal) => `${signal.loggedDays} 日のうち朝食があったのは ${signal.breakfastDays} 日です。`
        },
        dinner: {
            light: () => '今週の夕食は比較的軽めです。',
            balanced: (signal) => `夕食は一日のカロリーの約 ${signal.averageDinnerShare}% を占めています。`,
            heavy: (signal) => `${signal.loggedDays} 日のうち ${signal.heavyDays} 日で夕食が最も重くなっています。`
        },
        protein: {
            steady: (signal) => `たんぱく質は平均 ${signal.averageProtein}g で比較的安定しています。`,
            building: (signal) => `${signal.loggedDays} 日のうち ${signal.targetDays} 日がたんぱく質ペースに近い日でした。`,
            inconsistent: (signal) => `たんぱく質の入り方にはまだばらつきがあり、安定した日は ${signal.targetDays}/${signal.loggedDays} 日です。`
        },
        hydration: {
            placeholder: '水分記録が入ると、ここに水分リズムが表示されます。'
        }
    }
};

export default jaUiCopy;
