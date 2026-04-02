const zhCNNutritionUiCopy = {
    detail: {
        overviewTitle: '营养快览',
        overviewSummary: '先用清楚的方式看懂这餐，再决定接下来怎么调整。',
        sections: {
            quality: {
                title: '营养重点',
                summary: '这些数值最容易影响饱足感、口味与整体平衡。'
            },
            fatDetails: {
                title: '脂肪细节',
                summary: '补充看看脂肪来源与组成，帮助你更快判断这餐的油脂负担。'
            }
        }
    },
    trend: {
        title: '营养焦点',
        subtitle: '今天 + 最近 7 天',
        headlines: {
            start_logging: '先记几餐，营养节奏才会开始清楚',
            protein: '今天最值得补的是蛋白质',
            fiber: '今天最容易拉回来的，是纤维',
            sodium: '下一餐清淡一点，整天会更平衡',
            balanced: '今天目前的营养分配算稳'
        },
        summaries: {
            start_logging: '有几餐记录之后，这张卡会开始显示蛋白质、纤维和钠的节奏。',
            protein: (days) => `和最近 ${days} 天相比，今天最值得先补的是蛋白质。`,
            fiber: (days) => `和最近 ${days} 天相比，今天最容易微调的是纤维。`,
            sodium: (days) => `今天的钠比最近 ${days} 天的节奏再高一些，下一餐清淡些会更舒服。`,
            balanced: (days) => `和最近 ${days} 天相比，今天目前的营养分配算平衡。`
        },
        signalLabels: {
            protein: '蛋白质节奏',
            fiber: '纤维补位',
            sodium: '钠平衡'
        },
        signalDetails: {
            protein: ({ average }) => average > 0 ? `近 7 天平均 ${average}g` : '再多记几天就能看到节奏',
            fiber: ({ average }) => average > 0 ? `近 7 天平均 ${average}g` : '再多记几天就能看到节奏',
            sodium: ({ average }) => average > 0 ? `近 7 天平均 ${average}mg` : '再多记几天就能看到节奏'
        },
        signalValue: {
            protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
            fiber: ({ current }) => `${current}g`,
            sodium: ({ current }) => `${current}mg`
        }
    }
};

export default zhCNNutritionUiCopy;
