const zhTWNutritionUiCopy = {
    detail: {
        overviewTitle: '營養快照',
        overviewSummary: '在決定下一步之前，先用更平靜的方式看這餐的營養輪廓。',
        sections: {
            quality: {
                title: '品質訊號',
                summary: '這些營養通常最能影響飽足感與整體平衡。'
            },
            fatDetails: {
                title: '脂肪細節',
                summary: '多一點脂肪品質的資訊，但不把畫面變複雜。'
            }
        }
    },
    trend: {
        title: '營養焦點',
        subtitle: '今天 + 最近 7 天',
        headlines: {
            start_logging: '記錄幾餐後，完整的營養故事才會開始出現',
            protein: '今天最值得補的是蛋白質',
            fiber: '纖維還可以再拉高一點',
            sodium: '下一餐清淡一點會更平衡',
            balanced: '今天目前的營養分配算穩'
        },
        summaries: {
            start_logging: '多幾筆記錄後，這張卡就會開始讀出蛋白質、纖維與鈉的模式。',
            protein: (days) => `和最近 ${days} 天相比，今天最值得優先補的是蛋白質。`,
            fiber: (days) => `和最近 ${days} 天相比，纖維是最容易先補齊的一塊。`,
            sodium: (days) => `和最近 ${days} 天相比，今天的鈉有點偏高。`,
            balanced: (days) => `和最近 ${days} 天相比，今天目前的營養節奏算穩。`
        },
        signalLabels: {
            protein: '蛋白質節奏',
            fiber: '纖維支援',
            sodium: '鈉平衡'
        },
        signalDetails: {
            protein: ({ average }) => average > 0 ? `7 天平均 ${average}g` : '先累積幾筆記錄再看節奏',
            fiber: ({ average }) => average > 0 ? `7 天平均 ${average}g` : '先累積幾筆記錄再看節奏',
            sodium: ({ average }) => average > 0 ? `7 天平均 ${average}mg` : '先累積幾筆記錄再看節奏'
        },
        signalValue: {
            protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
            fiber: ({ current }) => `${current}g`,
            sodium: ({ current }) => `${current}mg`
        }
    }
};

export default zhTWNutritionUiCopy;
