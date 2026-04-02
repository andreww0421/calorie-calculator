const arNutritionUiCopy = {
    detail: {
        overviewTitle: 'نظرة غذائية سريعة',
        overviewSummary: 'اقرأ هذه الوجبة بهدوء أولًا، ثم قرر كيف تريد التعديل بعدها.',
        sections: {
            quality: {
                title: 'نقاط غذائية مهمة',
                summary: 'هذه العناصر تؤثر غالبًا في الشبع والطعم وتوازن الوجبة.'
            },
            fatDetails: {
                title: 'تفاصيل الدهون',
                summary: 'نضيف هنا سياقًا بسيطًا عن مصدر الدهون وتركيبها ليسهل فهم ثقل الوجبة.'
            }
        }
    },
    trend: {
        title: 'تركيز التغذية',
        subtitle: 'اليوم + آخر 7 أيام',
        headlines: {
            start_logging: 'بضع وجبات مسجلة تكفي ليبدأ نمط التغذية بالظهور',
            protein: 'البروتين هو أوضح فجوة اليوم',
            fiber: 'الألياف هي أسهل نقطة يمكن تحسينها الآن',
            sodium: 'وجبة أخف وأقل ملوحة ستساعد اليوم',
            balanced: 'التغذية تبدو مستقرة إلى حد جيد اليوم'
        },
        summaries: {
            start_logging: 'بعد تسجيل بضع وجبات، ستبدأ هذه البطاقة بإظهار أنماط البروتين والألياف والصوديوم.',
            protein: (days) => `مقارنة بآخر ${days} أيام، البروتين هو العنصر الأكثر استحقاقًا للدعم اليوم.`,
            fiber: (days) => `الألياف هي أسهل مكان لتنعيم اليوم مقارنة بآخر ${days} أيام.`,
            sodium: (days) => `الصوديوم اليوم أعلى قليلًا من نمط آخر ${days} أيام، لذا الوجبة التالية الأخف ستكون أفضل.`,
            balanced: (days) => `مقارنة بآخر ${days} أيام، تبدو تغذية اليوم متوازنة إلى حد جيد حتى الآن.`
        },
        signalLabels: {
            protein: 'إيقاع البروتين',
            fiber: 'دعم الألياف',
            sodium: 'توازن الصوديوم'
        },
        signalDetails: {
            protein: ({ average }) => average > 0 ? `متوسط 7 أيام ${average}g` : 'أضف بضعة أيام أخرى لرؤية الإيقاع',
            fiber: ({ average }) => average > 0 ? `متوسط 7 أيام ${average}g` : 'أضف بضعة أيام أخرى لرؤية الإيقاع',
            sodium: ({ average }) => average > 0 ? `متوسط 7 أيام ${average}mg` : 'أضف بضعة أيام أخرى لرؤية الإيقاع'
        },
        signalValue: {
            protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
            fiber: ({ current }) => `${current}g`,
            sodium: ({ current }) => `${current}mg`
        }
    }
};

export default arNutritionUiCopy;
