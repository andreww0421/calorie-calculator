const zhCNNutritionUiCopy = {
    detail: {
        overviewTitle: '营养快照',
        overviewSummary: '在决定下一步之前，先用更平静的方式看这餐的营养轮廓。',
        sections: {
            quality: {
                title: '质量信号',
                summary: '这些营养通常最能影响饱足感与整体平衡。'
            },
            fatDetails: {
                title: '脂肪细节',
                summary: '多一点脂肪质量的信息，但不把画面变复杂。'
            }
        }
    },
    trend: {
        title: '营养焦点',
        subtitle: '今天 + 最近 7 天',
        headlines: {
            start_logging: '记录几餐后，完整的营养故事才会开始出现',
            protein: '今天最值得补的是蛋白质',
            fiber: '纤维还可以再拉高一点',
            sodium: '下一餐清淡一点会更平衡',
            balanced: '今天目前的营养分配算稳'
        },
        summaries: {
            start_logging: '多几条记录后，这张卡就会开始读出蛋白质、纤维与钠的模式。',
            protein: (days) => `和最近 ${days} 天相比，今天最值得优先补的是蛋白质。`,
            fiber: (days) => `和最近 ${days} 天相比，纤维是最容易先补齐的一块。`,
            sodium: (days) => `和最近 ${days} 天相比，今天的钠有点偏高。`,
            balanced: (days) => `和最近 ${days} 天相比，今天目前的营养节奏算稳。`
        },
        signalLabels: {
            protein: '蛋白质节奏',
            fiber: '纤维支持',
            sodium: '钠平衡'
        },
        signalDetails: {
            protein: ({ average }) => average > 0 ? `7 天平均 ${average}g` : '先积累几条记录再看节奏',
            fiber: ({ average }) => average > 0 ? `7 天平均 ${average}g` : '先积累几条记录再看节奏',
            sodium: ({ average }) => average > 0 ? `7 天平均 ${average}mg` : '先积累几条记录再看节奏'
        },
        signalValue: {
            protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
            fiber: ({ current }) => `${current}g`,
            sodium: ({ current }) => `${current}mg`
        }
    }
};

export default zhCNNutritionUiCopy;
