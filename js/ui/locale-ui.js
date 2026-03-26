import { curLang, selectedDate } from '../data.js';
import { getLocalDateString } from '../utils.js';

const EXTRA_UI_TEXT = {
    'zh-TW': {
        todayLabel: '\u4eca\u5929',
        dailySummaryHint: '\u9ede\u64ca\u67E5\u770B\u5B8C\u6574\u71DF\u990A\u8207\u6C34\u5206',
        dailySummaryEmpty: '\u958B\u59CB\u8A18\u9304\u4ECA\u5929\u7684\u98F2\u98DF\u5427',
        dailySummaryLeftGoal: (value) => `\u8DDD\u96E2\u76EE\u6A19\u9084\u5DEE ${value} kcal`,
        dailySummaryLeftToday: (value) => `\u76EE\u524D\u9084\u5DEE ${value} kcal`,
        dailySummaryOverTarget: (value) => `\u5DF2\u8D85\u904E\u76EE\u6A19 ${value} kcal`,
        dailySummaryTitle: (dateText) => `${dateText} \u71DF\u990A\u7E3D\u89BD`,
        remainingLabel: '\u5269\u9918\u71B1\u91CF'
    },
    'zh-CN': {
        todayLabel: '\u4ECA\u5929',
        dailySummaryHint: '\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u8425\u517B\u4E0E\u6C34\u5206',
        dailySummaryEmpty: '\u5F00\u59CB\u8BB0\u5F55\u4ECA\u5929\u7684\u996E\u98DF\u5427',
        dailySummaryLeftGoal: (value) => `\u8DDD\u79BB\u76EE\u6807\u8FD8\u5DEE ${value} kcal`,
        dailySummaryLeftToday: (value) => `\u76EE\u524D\u8FD8\u5DEE ${value} kcal`,
        dailySummaryOverTarget: (value) => `\u5DF2\u8D85\u8FC7\u76EE\u6807 ${value} kcal`,
        dailySummaryTitle: (dateText) => `${dateText} \u8425\u517B\u603B\u89C8`,
        remainingLabel: '\u5269\u4F59\u70ED\u91CF'
    },
    en: {
        todayLabel: 'Today',
        dailySummaryHint: 'Tap to view all nutrients',
        dailySummaryEmpty: 'Start logging today\'s meals',
        dailySummaryLeftGoal: (value) => `${value} kcal left to goal`,
        dailySummaryLeftToday: (value) => `${value} kcal left today`,
        dailySummaryOverTarget: (value) => `${value} kcal over target`,
        dailySummaryTitle: (dateText) => `${dateText} Nutrition Summary`,
        remainingLabel: 'Remaining'
    },
    ja: {
        todayLabel: '\u4ECA\u65E5',
        dailySummaryHint: '\u30BF\u30C3\u30D7\u3057\u3066\u5168\u3066\u306E\u6804\u990A\u3068\u6C34\u5206\u3092\u8868\u793A',
        dailySummaryEmpty: '\u4ECA\u65E5\u306E\u98DF\u4E8B\u8A18\u9332\u3092\u59CB\u3081\u307E\u3057\u3087\u3046',
        dailySummaryLeftGoal: (value) => `\u76EE\u6A19\u307E\u3067\u3042\u3068 ${value} kcal`,
        dailySummaryLeftToday: (value) => `\u4ECA\u65E5\u306E\u6B8B\u308A ${value} kcal`,
        dailySummaryOverTarget: (value) => `\u76EE\u6A19\u3092 ${value} kcal \u8D85\u904E`,
        dailySummaryTitle: (dateText) => `${dateText} \u6839\u990A\u30B5\u30DE\u30EA\u30FC`,
        remainingLabel: '\u6B8B\u308A\u30AB\u30ED\u30EA\u30FC'
    },
    ko: {
        todayLabel: '\uC624\uB298',
        dailySummaryHint: '\uB204\uB974\uBA74 \uC804\uCCB4 \uC601\uC591\uC18C\uC640 \uC218\uBD84\uC744 \uBCFC \uC218 \uC788\uC5B4\uC694',
        dailySummaryEmpty: '\uC624\uB298 \uC2DD\uB2E8 \uAE30\uB85D\uC744 \uC2DC\uC791\uD574\uBCF4\uC138\uC694',
        dailySummaryLeftGoal: (value) => `\uBAA9\uD45C\uAE4C\uC9C0 ${value} kcal \uB0A8\uC558\uC5B4\uC694`,
        dailySummaryLeftToday: (value) => `\uC624\uB298 ${value} kcal \uB0A8\uC558\uC5B4\uC694`,
        dailySummaryOverTarget: (value) => `\uBAA9\uD45C\uB97C ${value} kcal \uCD08\uACFC\uD588\uC5B4\uC694`,
        dailySummaryTitle: (dateText) => `${dateText} \uC601\uC591 \uC694\uC57D`,
        remainingLabel: '\uB0A8\uC740 \uCE7C\uB85C\uB9AC'
    },
    ar: {
        todayLabel: '\u0627\u0644\u064A\u0648\u0645',
        dailySummaryHint: '\u0627\u0636\u063A\u0637 \u0644\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u063A\u0630\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0645\u0627\u0621',
        dailySummaryEmpty: '\u0627\u0628\u062F\u0623 \u0628\u062A\u0633\u062C\u064A\u0644 \u0648\u062C\u0628\u0627\u062A \u0627\u0644\u064A\u0648\u0645',
        dailySummaryLeftGoal: (value) => `\u0645\u062A\u0628\u0642\u064A ${value} kcal \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0647\u062F\u0641`,
        dailySummaryLeftToday: (value) => `\u0645\u062A\u0628\u0642\u064A ${value} kcal \u0644\u0644\u064A\u0648\u0645`,
        dailySummaryOverTarget: (value) => `\u062A\u0645 \u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u0647\u062F\u0641 \u0628\u0645\u0642\u062F\u0627\u0631 ${value} kcal`,
        dailySummaryTitle: (dateText) => `${dateText} \u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u063A\u0630\u064A\u0629`,
        remainingLabel: '\u0627\u0644\u0633\u0639\u0631\u0627\u062A \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629'
    }
};

export function getExtraUiText(lang = curLang) {
    return EXTRA_UI_TEXT[lang] || EXTRA_UI_TEXT.en;
}

export function getDisplayDateLabel(dateText = selectedDate, lang = curLang) {
    const normalizedDate = dateText || selectedDate || getLocalDateString();
    const extra = getExtraUiText(lang);
    return normalizedDate === getLocalDateString() ? extra.todayLabel : normalizedDate;
}

export function formatNutritionInline(nutri = {}, t = {}) {
    const calories = Math.round(Number(nutri.calories ?? nutri.cal ?? 0) || 0);
    const protein = Number(nutri.protein ?? 0) || 0;
    const fat = Number(nutri.fat ?? 0) || 0;
    const carbohydrate = Number(nutri.carbohydrate ?? 0) || 0;

    return `${t.cal || 'Calories'}: ${calories} | ${t.pro || 'Protein'}: ${protein}g | ${t.fat || 'Fat'}: ${fat}g | ${t.carb || 'Carb'}: ${carbohydrate}g`;
}
