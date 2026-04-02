const jaNutritionUiCopy = {
    detail: {
        overviewTitle: '栄養の見やすいまとめ',
        overviewSummary: 'まずはこの食事の栄養を落ち着いて確認してから、次の調整を考えられます。',
        sections: {
            quality: {
                title: '栄養のポイント',
                summary: '満足感や全体のバランスに影響しやすい項目です。'
            },
            fatDetails: {
                title: '脂質の内訳',
                summary: '脂質の由来と組成を少し補足して、食事の重さを見やすくします。'
            }
        }
    },
    trend: {
        title: '栄養フォーカス',
        subtitle: '今日 + 直近 7 日',
        headlines: {
            start_logging: '数日の記録があると栄養の流れが見えてきます',
            protein: '今日はたんぱく質を先に補いたいです',
            fiber: '今日は食物繊維を少し足すと整いやすいです',
            sodium: '次の食事を少し薄味にすると整いやすいです',
            balanced: '今日の栄養バランスは比較的安定しています'
        },
        summaries: {
            start_logging: '数日の記録がたまると、このカードにたんぱく質・食物繊維・塩分の流れが見えてきます。',
            protein: (days) => `直近 ${days} 日と比べると、今日はたんぱく質を優先して補うと整いやすいです。`,
            fiber: (days) => `直近 ${days} 日と比べると、今日は食物繊維を少し足すのがいちばん簡単です。`,
            sodium: (days) => `今日は直近 ${days} 日より塩分が少し高めなので、次の食事は軽めが合います。`,
            balanced: (days) => `直近 ${days} 日と比べても、今日は今のところ栄養配分が整っています。`
        },
        signalLabels: {
            protein: 'たんぱく質ペース',
            fiber: '食物繊維',
            sodium: '塩分バランス'
        },
        signalDetails: {
            protein: ({ average }) => average > 0 ? `7日平均 ${average}g` : '数日分の記録でペースが見えてきます',
            fiber: ({ average }) => average > 0 ? `7日平均 ${average}g` : '数日分の記録でペースが見えてきます',
            sodium: ({ average }) => average > 0 ? `7日平均 ${average}mg` : '数日分の記録でペースが見えてきます'
        },
        signalValue: {
            protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
            fiber: ({ current }) => `${current}g`,
            sodium: ({ current }) => `${current}mg`
        }
    }
};

export default jaNutritionUiCopy;
