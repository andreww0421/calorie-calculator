export const nutritionUiCopyCatalog = {
    en: {
        detail: {
            overviewTitle: 'Nutrition snapshot',
            overviewSummary: 'A calmer read on the meal before you decide what to do next.',
            sections: {
                quality: {
                    title: 'Quality signals',
                    summary: 'The nutrients that often shape how filling and balanced the meal feels.'
                },
                fatDetails: {
                    title: 'Fat details',
                    summary: 'A little extra context on fat quality, without overcomplicating the view.'
                }
            }
        },
        trend: {
            title: 'Nutrition focus',
            subtitle: 'Today + the last 7 logged days',
            headlines: {
                start_logging: 'A few meal logs unlock the fuller nutrition story',
                protein: 'Protein is the clearest gap today',
                fiber: 'Fiber could use the next small lift',
                sodium: 'A lighter, less salty next meal would help',
                balanced: 'Nutrition looks fairly steady today'
            },
            summaries: {
                start_logging: 'Once a few meals are logged, this card starts surfacing protein, fiber, and sodium patterns.',
                protein: (days) => `Compared with the last ${days} logged days, protein is the nutrient most worth reinforcing today.`,
                fiber: (days) => `Fiber is the easiest place to smooth the day compared with your last ${days} logged days.`,
                sodium: (days) => `Sodium is running a little ahead of your usual ${days}-day pace today.`,
                balanced: (days) => `Compared with the last ${days} logged days, today looks fairly balanced so far.`
            },
            signalLabels: {
                protein: 'Protein pace',
                fiber: 'Fiber support',
                sodium: 'Sodium balance'
            },
            signalDetails: {
                protein: ({ average }) => average > 0 ? `7-day avg ${average}g` : 'Build a few logs to see your pace',
                fiber: ({ average }) => average > 0 ? `7-day avg ${average}g` : 'Build a few logs to see your pace',
                sodium: ({ average }) => average > 0 ? `7-day avg ${average}mg` : 'Build a few logs to see your pace'
            },
            signalValue: {
                protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
                fiber: ({ current }) => `${current}g`,
                sodium: ({ current }) => `${current}mg`
            }
        }
    },
    'zh-TW': {
        detail: {
            overviewTitle: '營養快覽',
            overviewSummary: '先用清楚的方式看懂這餐，再決定接下來怎麼調整。 ',
            sections: {
                quality: {
                    title: '營養重點',
                    summary: '這幾個營養值最容易影響飽足感、口味與整體平衡。'
                },
                fatDetails: {
                    title: '脂肪細節',
                    summary: '補充看一下脂肪組成，不用一次塞進太多資訊。'
                }
            }
        },
        trend: {
            title: '營養焦點',
            subtitle: '今天 + 近 7 天記錄',
            headlines: {
                start_logging: '先記幾餐，營養節奏才會開始清楚',
                protein: '今天最值得補強的是蛋白質',
                fiber: '今天最容易拉回來的是纖維',
                sodium: '下一餐清淡一點，整天會更平衡',
                balanced: '今天的營養節奏目前算穩'
            },
            summaries: {
                start_logging: '有幾天記錄之後，這張卡會開始顯示蛋白質、纖維和鈉的節奏。',
                protein: (days) => `和近 ${days} 天比起來，今天最值得先補的是蛋白質。`,
                fiber: (days) => `和近 ${days} 天比起來，今天最容易微調的是纖維。`,
                sodium: (days) => `今天的鈉比近 ${days} 天節奏再高一些，下一餐清淡點會有幫助。`,
                balanced: (days) => `和近 ${days} 天比起來，今天目前的營養分配算平衡。`
            },
            signalLabels: {
                protein: '蛋白質節奏',
                fiber: '纖維補位',
                sodium: '鈉平衡'
            },
            signalDetails: {
                protein: ({ average }) => average > 0 ? `近 7 天平均 ${average}g` : '再記幾天就會看到節奏',
                fiber: ({ average }) => average > 0 ? `近 7 天平均 ${average}g` : '再記幾天就會看到節奏',
                sodium: ({ average }) => average > 0 ? `近 7 天平均 ${average}mg` : '再記幾天就會看到節奏'
            },
            signalValue: {
                protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
                fiber: ({ current }) => `${current}g`,
                sodium: ({ current }) => `${current}mg`
            }
        }
    },
    'zh-CN': {
        detail: {
            overviewTitle: '营养快览',
            overviewSummary: '先把这餐看清楚，再决定后面怎么调。 ',
            sections: {
                quality: {
                    title: '营养重点',
                    summary: '这些值最容易影响饱足感、口味和整体平衡。'
                },
                fatDetails: {
                    title: '脂肪细节',
                    summary: '补充看看脂肪组成，不需要一次看太多。'
                }
            }
        },
        trend: {
            title: '营养焦点',
            subtitle: '今天 + 近 7 天记录',
            headlines: {
                start_logging: '先记几餐，营养节奏才会开始清楚',
                protein: '今天最值得补的是蛋白质',
                fiber: '今天最容易拉回来的，是纤维',
                sodium: '下一餐清淡一点，整天会更平衡',
                balanced: '今天的营养节奏目前算稳定'
            },
            summaries: {
                start_logging: '有几天记录之后，这张卡会开始显示蛋白质、纤维和钠的节奏。',
                protein: (days) => `和近 ${days} 天相比，今天最值得先补的是蛋白质。`,
                fiber: (days) => `和近 ${days} 天相比，今天最容易微调的是纤维。`,
                sodium: (days) => `今天的钠比近 ${days} 天节奏再高一些，下一餐清淡点会更舒服。`,
                balanced: (days) => `和近 ${days} 天相比，今天目前的营养分配算平衡。`
            },
            signalLabels: {
                protein: '蛋白质节奏',
                fiber: '纤维补位',
                sodium: '钠平衡'
            },
            signalDetails: {
                protein: ({ average }) => average > 0 ? `近 7 天平均 ${average}g` : '再记几天就会看到节奏',
                fiber: ({ average }) => average > 0 ? `近 7 天平均 ${average}g` : '再记几天就会看到节奏',
                sodium: ({ average }) => average > 0 ? `近 7 天平均 ${average}mg` : '再记几天就会看到节奏'
            },
            signalValue: {
                protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
                fiber: ({ current }) => `${current}g`,
                sodium: ({ current }) => `${current}mg`
            }
        }
    },
    ja: {
        detail: {
            overviewTitle: '栄養の見やすいまとめ',
            overviewSummary: 'まずはこの食事の栄養を落ち着いて確認できる形にしました。',
            sections: {
                quality: {
                    title: '栄養のポイント',
                    summary: '満足感や全体のバランスに影響しやすい項目です。'
                },
                fatDetails: {
                    title: '脂質の内訳',
                    summary: '脂質を少しだけ詳しく見たいときの補足です。'
                }
            }
        },
        trend: {
            title: '栄養フォーカス',
            subtitle: '今日 + 直近7日',
            headlines: {
                start_logging: '数日分の記録があると栄養の流れが見えてきます',
                protein: '今日はたんぱく質がいちばん補いどころです',
                fiber: '今日は食物繊維を少し足すと整いやすいです',
                sodium: '次の食事を少し薄味にすると整いやすいです',
                balanced: '今日は栄養の流れが比較的安定しています'
            },
            summaries: {
                start_logging: '数日分の記録がたまると、このカードにたんぱく質・食物繊維・塩分の流れが出てきます。',
                protein: (days) => `直近${days}日と比べると、今日はたんぱく質を先に意識すると整いやすいです。`,
                fiber: (days) => `直近${days}日と比べると、今日は食物繊維を少し足すのがいちばん簡単です。`,
                sodium: (days) => `今日は直近${days}日より塩分が少し高めなので、次の食事は軽めが合いそうです。`,
                balanced: (days) => `直近${days}日と比べても、今日は今のところバランスが整っています。`
            },
            signalLabels: {
                protein: 'たんぱく質ペース',
                fiber: '食物繊維',
                sodium: '塩分バランス'
            },
            signalDetails: {
                protein: ({ average }) => average > 0 ? `7日平均 ${average}g` : '数日分の記録で表示されます',
                fiber: ({ average }) => average > 0 ? `7日平均 ${average}g` : '数日分の記録で表示されます',
                sodium: ({ average }) => average > 0 ? `7日平均 ${average}mg` : '数日分の記録で表示されます'
            },
            signalValue: {
                protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
                fiber: ({ current }) => `${current}g`,
                sodium: ({ current }) => `${current}mg`
            }
        }
    },
    ko: {
        detail: {
            overviewTitle: '영양 한눈에 보기',
            overviewSummary: '이 식사의 영양을 먼저 차분하게 읽을 수 있게 정리했습니다.',
            sections: {
                quality: {
                    title: '영양 포인트',
                    summary: '포만감과 전체 균형에 영향을 주기 쉬운 항목입니다.'
                },
                fatDetails: {
                    title: '지방 세부 정보',
                    summary: '지방 구성을 조금 더 보고 싶을 때 보는 보조 정보입니다.'
                }
            }
        },
        trend: {
            title: '영양 포커스',
            subtitle: '오늘 + 최근 7일',
            headlines: {
                start_logging: '몇 끼만 기록해도 영양 흐름이 보이기 시작합니다',
                protein: '오늘은 단백질을 먼저 채우는 편이 좋습니다',
                fiber: '오늘은 식이섬유를 조금 더 올리면 좋겠습니다',
                sodium: '다음 끼니를 조금 더 담백하게 잡으면 균형이 좋아집니다',
                balanced: '오늘 영양 흐름은 비교적 안정적입니다'
            },
            summaries: {
                start_logging: '기록이 조금 쌓이면 이 카드에 단백질, 식이섬유, 나트륨 흐름이 나타납니다.',
                protein: (days) => `최근 ${days}일과 비교하면 오늘은 단백질을 먼저 보강하는 편이 좋습니다.`,
                fiber: (days) => `최근 ${days}일과 비교하면 오늘은 식이섬유를 조금 더 올리는 것이 가장 쉽습니다.`,
                sodium: (days) => `오늘은 최근 ${days}일 흐름보다 나트륨이 높아 다음 끼니를 담백하게 잡는 편이 좋습니다.`,
                balanced: (days) => `최근 ${days}일과 비교해도 오늘은 지금까지 균형이 안정적입니다.`
            },
            signalLabels: {
                protein: '단백질 페이스',
                fiber: '식이섬유',
                sodium: '나트륨 균형'
            },
            signalDetails: {
                protein: ({ average }) => average > 0 ? `7일 평균 ${average}g` : '기록이 쌓이면 보여줍니다',
                fiber: ({ average }) => average > 0 ? `7일 평균 ${average}g` : '기록이 쌓이면 보여줍니다',
                sodium: ({ average }) => average > 0 ? `7일 평균 ${average}mg` : '기록이 쌓이면 보여줍니다'
            },
            signalValue: {
                protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
                fiber: ({ current }) => `${current}g`,
                sodium: ({ current }) => `${current}mg`
            }
        }
    },
    ar: {
        detail: {
            overviewTitle: 'لمحة غذائية واضحة',
            overviewSummary: 'الفكرة هنا أن تقرأ هذه الوجبة بهدوء قبل أن تقرر التعديل التالي.',
            sections: {
                quality: {
                    title: 'نقاط غذائية مهمة',
                    summary: 'هذه العناصر تؤثر غالبًا على الشبع وتوازن الوجبة بشكل أوضح.'
                },
                fatDetails: {
                    title: 'تفاصيل الدهون',
                    summary: 'تفصيل إضافي بسيط عن جودة الدهون بدون أن تصبح الشاشة مزدحمة.'
                }
            }
        },
        trend: {
            title: 'تركيز التغذية',
            subtitle: 'اليوم + آخر 7 أيام',
            headlines: {
                start_logging: 'بضع وجبات مسجلة تكفي ليبدأ نمط التغذية بالظهور',
                protein: 'البروتين هو أوضح نقطة تستحق الدعم اليوم',
                fiber: 'الألياف هي أسهل تحسين صغير اليوم',
                sodium: 'وجبة أخف وأقل ملوحة ستساعد اليوم',
                balanced: 'نمط التغذية اليوم يبدو متوازنًا حتى الآن'
            },
            summaries: {
                start_logging: 'بعد تسجيل عدة وجبات، ستبدأ هذه البطاقة بإظهار نمط البروتين والألياف والصوديوم.',
                protein: (days) => `مقارنة بآخر ${days} أيام، البروتين هو العنصر الأوضح الذي يستحق التعزيز اليوم.`,
                fiber: (days) => `مقارنة بآخر ${days} أيام، الألياف هي أسهل نقطة يمكن رفعها اليوم.`,
                sodium: (days) => `الصوديوم اليوم أعلى قليلًا من نمط آخر ${days} أيام، لذا الوجبة التالية الأخف ستكون أفضل.`,
                balanced: (days) => `مقارنة بآخر ${days} أيام، توزيع التغذية اليوم يبدو متوازنًا حتى الآن.`
            },
            signalLabels: {
                protein: 'إيقاع البروتين',
                fiber: 'دعم الألياف',
                sodium: 'توازن الصوديوم'
            },
            signalDetails: {
                protein: ({ average }) => average > 0 ? `متوسط 7 أيام ${average}g` : 'أضف بضعة أيام لتظهر الوتيرة',
                fiber: ({ average }) => average > 0 ? `متوسط 7 أيام ${average}g` : 'أضف بضعة أيام لتظهر الوتيرة',
                sodium: ({ average }) => average > 0 ? `متوسط 7 أيام ${average}mg` : 'أضف بضعة أيام لتظهر الوتيرة'
            },
            signalValue: {
                protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
                fiber: ({ current }) => `${current}g`,
                sodium: ({ current }) => `${current}mg`
            }
        }
    }
};

export function getNutritionUiCopy(lang = 'en') {
    return nutritionUiCopyCatalog[lang]
        || nutritionUiCopyCatalog[String(lang || 'en').split('-')[0]]
        || nutritionUiCopyCatalog.en;
}
