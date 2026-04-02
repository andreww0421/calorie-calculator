import zhTWNutritionUiCopy from './nutrition-ui-copy-zh-TW.js';
import zhCNNutritionUiCopy from './nutrition-ui-copy-zh-CN.js';
import jaNutritionUiCopy from './nutrition-ui-copy-ja.js';
import koNutritionUiCopy from './nutrition-ui-copy-ko.js';
import arNutritionUiCopy from './nutrition-ui-copy-ar.js';

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
    'zh-TW': zhTWNutritionUiCopy,
    'zh-CN': zhCNNutritionUiCopy,
    ja: jaNutritionUiCopy,
    ko: koNutritionUiCopy,
    ar: arNutritionUiCopy
};

export function getNutritionUiCopy(lang = 'en') {
    return nutritionUiCopyCatalog[lang]
        || nutritionUiCopyCatalog[String(lang || 'en').split('-')[0]]
        || nutritionUiCopyCatalog.en;
}
