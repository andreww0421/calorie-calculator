const zhTWNutritionUiCopy = {
    detail: {
        overviewTitle: '營養快覽',
        overviewSummary: '先用清楚的方式看懂這餐，再決定接下來怎麼調整。',
        sections: {
            quality: {
                title: '營養重點',
                summary: '這幾個數值最容易影響飽足感、口味與整體平衡。'
            },
            fatDetails: {
                title: '脂肪細節',
                summary: '補充看看脂肪來源與組成，幫你更快判斷這餐的油脂負擔。'
            }
        }
    },
    trend: {
        title: '營養焦點',
        subtitle: '今天 + 最近 7 天',
        headlines: {
            start_logging: '先記幾餐，營養節奏才會開始清楚',
            protein: '今天最值得補的是蛋白質',
            fiber: '今天最容易拉回來的是纖維',
            sodium: '下一餐清淡一點，整天會更平衡',
            balanced: '今天目前的營養分配算穩'
        },
        summaries: {
            start_logging: '有幾餐記錄之後，這張卡會開始顯示蛋白質、纖維和鈉的節奏。',
            protein: (days) => `和最近 ${days} 天相比，今天最值得先補的是蛋白質。`,
            fiber: (days) => `和最近 ${days} 天相比，今天最容易微調的是纖維。`,
            sodium: (days) => `今天的鈉比最近 ${days} 天的節奏再高一些，下一餐清淡些會更舒服。`,
            balanced: (days) => `和最近 ${days} 天相比，今天目前的營養分配算平衡。`
        },
        signalLabels: {
            protein: '蛋白質節奏',
            fiber: '纖維補位',
            sodium: '鈉平衡'
        },
        signalDetails: {
            protein: ({ average }) => average > 0 ? `近 7 天平均 ${average}g` : '再多記幾天就能看到節奏',
            fiber: ({ average }) => average > 0 ? `近 7 天平均 ${average}g` : '再多記幾天就能看到節奏',
            sodium: ({ average }) => average > 0 ? `近 7 天平均 ${average}mg` : '再多記幾天就能看到節奏'
        },
        signalValue: {
            protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
            fiber: ({ current }) => `${current}g`,
            sodium: ({ current }) => `${current}mg`
        }
    }
};

export default zhTWNutritionUiCopy;
