import { curLang, selectedDate } from '../data.js';
import { getLocalDateString } from '../utils.js';

const EXTRA_UI_TEXT = {
    'zh-TW': {
        direction: 'ltr',
        todayLabel: '\u4eca\u5929',
        metaTitle: 'Woof Cal \u6c6a\u5361\u7ba1\u5bb6',
        metaOgTitle: 'Woof Cal \u6c6a\u5361\u7ba1\u5bb6 - AI \u98f2\u98df\u8207\u71b1\u91cf\u8ffd\u8e64',
        metaDescription: '\u900f\u904e AI \u5206\u6790\u98df\u7269\u8207\u7167\u7247\u71df\u990a\uff0c\u8f15\u9b06\u8ffd\u8e64\u6bcf\u65e5\u71b1\u91cf\u3001\u9ad4\u91cd\u8207\u71df\u990a\u7d20\u3002',
        dailySummaryHint: '\u9ede\u64ca\u67E5\u770B\u5B8C\u6574\u71DF\u990A\u8207\u6C34\u5206',
        dailySummaryEmpty: '\u958B\u59CB\u8A18\u9304\u4ECA\u5929\u7684\u98F2\u98DF\u5427',
        dailySummaryLeftGoal: (value) => `\u8DDD\u96E2\u76EE\u6A19\u9084\u5DEE ${value} kcal`,
        dailySummaryLeftToday: (value) => `\u76EE\u524D\u9084\u5DEE ${value} kcal`,
        dailySummaryOverTarget: (value) => `\u5DF2\u8D85\u904E\u76EE\u6A19 ${value} kcal`,
        dailySummaryTitle: (dateText) => `${dateText} \u71DF\u990A\u7E3D\u89BD`,
        remainingLabel: '\u5269\u9918\u71B1\u91CF',
        emptyStateEyebrow: '\u65b0\u624b\u958b\u59cb',
        emptyStateTitle: '\u8A18\u4E0B\u4ECA\u5929\u7684\u7B2C\u4E00\u9910',
        emptyStateBody: '\u4F60\u53EF\u4EE5\u5148\u62CD\u7167\u4EA4\u7D66 AI\uff0C\u6216\u7528\u624B\u52D5\u8F38\u5165\u5FEB\u901F\u5EFA\u7ACB\u7B2C\u4E00\u7B46\u98F2\u98DF\u7D00\u9304\u3002',
        emptyMealTitle: '\u9084\u6C92\u6709\u8A18\u9304',
        emptyMealBody: '\u4F7F\u7528 AI \u6216\u624B\u52D5\u8F38\u5165\u4F86\u958B\u59CB',
        aiGuideEyebrow: 'AI Tips',
        aiGuideTitle: '\u8B93 AI \u66F4\u5FEB\u66F4\u6E96',
        aiGuideBody: '\u6E05\u695A\u7167\u7247\u3001\u88DC\u5145\u98DF\u6750\u8207\u5206\u91CF\uff0c\u6703\u8B93\u5206\u6790\u66F4\u6E96\u78BA\u3002',
        aiGuideTip1: '\u62CD\u651D\u6642\u76E1\u91CF\u907F\u514D\u906E\u64CB',
        aiGuideTip2: '\u6709\u5305\u88DD\u98DF\u54C1\u6642\u53EF\u88DC\u4E0A\u54C1\u540D',
        aiGuideTip3: '\u4E0D\u78BA\u5B9A\u6642\u53EF\u4EE5\u5728\u91CD\u7B97\u524D\u5148\u7DE8\u8F2F\u98DF\u6750',
        aiItemsRequired: '\u8ACB\u81F3\u5C11\u4FDD\u7559\u4E00\u500B\u98DF\u6750\u9805\u76EE\u3002'
    },
    'zh-CN': {
        direction: 'ltr',
        todayLabel: '\u4ECA\u5929',
        metaTitle: 'Woof Cal \u6C6A\u5361\u7BA1\u5BB6',
        metaOgTitle: 'Woof Cal \u6C6A\u5361\u7BA1\u5BB6 - AI \u996E\u98DF\u4E0E\u70ED\u91CF\u8FFD\u8E2A',
        metaDescription: '\u901A\u8FC7 AI \u5206\u6790\u98DF\u7269\u4E0E\u7167\u7247\u8425\u517B\uff0c\u8F7B\u677E\u8FFD\u8E2A\u6BCF\u65E5\u70ED\u91CF\u3001\u4F53\u91CD\u4E0E\u8425\u517B\u7D20\u3002',
        dailySummaryHint: '\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u8425\u517B\u4E0E\u6C34\u5206',
        dailySummaryEmpty: '\u5F00\u59CB\u8BB0\u5F55\u4ECA\u5929\u7684\u996E\u98DF\u5427',
        dailySummaryLeftGoal: (value) => `\u8DDD\u79BB\u76EE\u6807\u8FD8\u5DEE ${value} kcal`,
        dailySummaryLeftToday: (value) => `\u76EE\u524D\u8FD8\u5DEE ${value} kcal`,
        dailySummaryOverTarget: (value) => `\u5DF2\u8D85\u8FC7\u76EE\u6807 ${value} kcal`,
        dailySummaryTitle: (dateText) => `${dateText} \u8425\u517B\u603B\u89C8`,
        remainingLabel: '\u5269\u4F59\u70ED\u91CF',
        emptyStateEyebrow: '\u5FEB\u901F\u5F00\u59CB',
        emptyStateTitle: '\u8BB0\u5F55\u4ECA\u5929\u7684\u7B2C\u4E00\u9910',
        emptyStateBody: '\u53EF\u4EE5\u5148\u62CD\u7167\u4EA4\u7ED9 AI\uff0C\u6216\u7528\u624B\u52A8\u8F93\u5165\u5FEB\u901F\u5EFA\u7ACB\u7B2C\u4E00\u6761\u996E\u98DF\u8BB0\u5F55\u3002',
        emptyMealTitle: '\u8FD8\u6CA1\u6709\u8BB0\u5F55',
        emptyMealBody: '\u4F7F\u7528 AI \u6216\u624B\u52A8\u8F93\u5165\u5F00\u59CB',
        aiGuideEyebrow: 'AI Tips',
        aiGuideTitle: '\u8BA9 AI \u66F4\u5FEB\u66F4\u51C6',
        aiGuideBody: '\u6E05\u6670\u7684\u7167\u7247\u3001\u66F4\u5B8C\u6574\u7684\u98DF\u6750\u4E0E\u4EFD\u91CF\u8865\u5145\uff0c\u4F1A\u8BA9\u7ED3\u679C\u66F4\u51C6\u786E\u3002',
        aiGuideTip1: '\u62CD\u6444\u65F6\u5C3D\u91CF\u907F\u514D\u906E\u6321',
        aiGuideTip2: '\u6709\u5305\u88C5\u98DF\u54C1\u65F6\u53EF\u8865\u4E0A\u54C1\u540D',
        aiGuideTip3: '\u4E0D\u786E\u5B9A\u65F6\u53EF\u5728\u91CD\u7B97\u524D\u5148\u7F16\u8F91\u98DF\u6750',
        aiItemsRequired: '\u8BF7\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u98DF\u6750\u9879\u76EE\u3002'
    },
    en: {
        direction: 'ltr',
        todayLabel: 'Today',
        metaTitle: 'Woof Cal - AI Diet Tracker',
        metaOgTitle: 'Woof Cal - AI Diet Tracker',
        metaDescription: 'Use AI to analyze meals from photos or text, then track calories, weight, and nutrition in one lightweight dashboard.',
        dailySummaryHint: 'Tap to view all nutrients',
        dailySummaryEmpty: 'Start logging today\'s meals',
        dailySummaryLeftGoal: (value) => `${value} kcal left to goal`,
        dailySummaryLeftToday: (value) => `${value} kcal left today`,
        dailySummaryOverTarget: (value) => `${value} kcal over target`,
        dailySummaryTitle: (dateText) => `${dateText} Nutrition Summary`,
        remainingLabel: 'Remaining',
        emptyStateEyebrow: 'Quick Start',
        emptyStateTitle: 'Log your first meal today',
        emptyStateBody: 'Snap a meal with AI or add a manual entry to unlock your daily dashboard.',
        emptyMealTitle: 'No foods logged yet',
        emptyMealBody: 'Use AI or manual entry to get started',
        aiGuideEyebrow: 'AI Tips',
        aiGuideTitle: 'Get faster, cleaner AI results',
        aiGuideBody: 'Clear photos and a little extra context help the nutrition analysis stay much more accurate.',
        aiGuideTip1: 'Keep the meal visible and avoid blocking the plate',
        aiGuideTip2: 'Add brand names or key ingredients when they matter',
        aiGuideTip3: 'Edit ingredients before recalculating if the result looks off',
        aiItemsRequired: 'Please keep at least one item.'
    },
    ja: {
        direction: 'ltr',
        todayLabel: '\u4ECA\u65E5',
        metaTitle: 'Woof Cal - AI Diet Tracker',
        metaOgTitle: 'Woof Cal - AI Diet Tracker',
        metaDescription: 'AI \u3067\u98DF\u4E8B\u3092\u5206\u6790\u3057\u3001\u30AB\u30ED\u30EA\u30FC\u3001\u4F53\u91CD\u3001\u6804\u990A\u3092\u7C21\u5358\u306B\u8FFD\u8DE1\u3067\u304D\u307E\u3059\u3002',
        dailySummaryHint: '\u30BF\u30C3\u30D7\u3057\u3066\u5168\u3066\u306E\u6804\u990A\u3068\u6C34\u5206\u3092\u8868\u793A',
        dailySummaryEmpty: '\u4ECA\u65E5\u306E\u98DF\u4E8B\u8A18\u9332\u3092\u59CB\u3081\u307E\u3057\u3087\u3046',
        dailySummaryLeftGoal: (value) => `\u76EE\u6A19\u307E\u3067\u3042\u3068 ${value} kcal`,
        dailySummaryLeftToday: (value) => `\u4ECA\u65E5\u306E\u6B8B\u308A ${value} kcal`,
        dailySummaryOverTarget: (value) => `\u76EE\u6A19\u3092 ${value} kcal \u8D85\u904E`,
        dailySummaryTitle: (dateText) => `${dateText} \u6839\u990A\u30B5\u30DE\u30EA\u30FC`,
        remainingLabel: '\u6B8B\u308A\u30AB\u30ED\u30EA\u30FC',
        emptyStateEyebrow: '\u30AF\u30A4\u30C3\u30AF\u30B9\u30BF\u30FC\u30C8',
        emptyStateTitle: '\u4ECA\u65E5\u306E\u6700\u521D\u306E\u98DF\u4E8B\u3092\u8A18\u9332\u3057\u307E\u3057\u3087\u3046',
        emptyStateBody: 'AI \u3067\u64AE\u5F71\u3059\u308B\u304B\u3001\u624B\u5165\u529B\u3067\u6700\u521D\u306E\u8A18\u9332\u3092\u8FFD\u52A0\u3067\u304D\u307E\u3059\u3002',
        emptyMealTitle: '\u307E\u3060\u8A18\u9332\u304C\u3042\u308A\u307E\u305B\u3093',
        emptyMealBody: 'AI \u307E\u305F\u306F\u624B\u5165\u529B\u3067\u59CB\u3081\u307E\u3057\u3087\u3046',
        aiGuideEyebrow: 'AI Tips',
        aiGuideTitle: 'AI \u306E\u5206\u6790\u3092\u66F4\u901F\u304F\u66F4\u6B63\u78BA\u306B',
        aiGuideBody: '\u5199\u771F\u304C\u660E\u308B\u304F\u3001\u98DF\u6750\u3084\u5206\u91CF\u306E\u88DC\u8DB3\u304C\u3042\u308B\u3068\u7CBE\u5EA6\u304C\u4E0A\u304C\u308A\u307E\u3059\u3002',
        aiGuideTip1: '\u76BF\u304C\u96A0\u308C\u306A\u3044\u3088\u3046\u306B\u64AE\u5F71\u3059\u308B',
        aiGuideTip2: '\u5FC5\u8981\u306A\u3068\u304D\u306F\u5546\u54C1\u540D\u3084\u98DF\u6750\u540D\u3092\u88DC\u8DB3\u3059\u308B',
        aiGuideTip3: '\u7D50\u679C\u304C\u305A\u308C\u305F\u3089\u518D\u8A08\u7B97\u524D\u306B\u98DF\u6750\u3092\u7DE8\u96C6\u3059\u308B',
        aiItemsRequired: '\u98DF\u6750\u3092\u5C11\u306A\u304F\u3068\u3082 1 \u3064\u6B8B\u3057\u3066\u304F\u3060\u3055\u3044\u3002'
    },
    ko: {
        direction: 'ltr',
        todayLabel: '\uC624\uB298',
        metaTitle: 'Woof Cal - AI Diet Tracker',
        metaOgTitle: 'Woof Cal - AI Diet Tracker',
        metaDescription: 'AI\uB85C \uC74C\uC2DD\uC744 \uBD84\uC11D\uD558\uACE0 \uCE7C\uB85C\uB9AC, \uCCB4\uC911, \uC601\uC591 \uAE30\uB85D\uC744 \uD55C \uACF3\uC5D0\uC11C \uAD00\uB9AC\uD558\uC138\uC694.',
        dailySummaryHint: '\uB204\uB974\uBA74 \uC804\uCCB4 \uC601\uC591\uC18C\uC640 \uC218\uBD84\uC744 \uBCFC \uC218 \uC788\uC5B4\uC694',
        dailySummaryEmpty: '\uC624\uB298 \uC2DD\uB2E8 \uAE30\uB85D\uC744 \uC2DC\uC791\uD574\uBCF4\uC138\uC694',
        dailySummaryLeftGoal: (value) => `\uBAA9\uD45C\uAE4C\uC9C0 ${value} kcal \uB0A8\uC558\uC5B4\uC694`,
        dailySummaryLeftToday: (value) => `\uC624\uB298 ${value} kcal \uB0A8\uC558\uC5B4\uC694`,
        dailySummaryOverTarget: (value) => `\uBAA9\uD45C\uB97C ${value} kcal \uCD08\uACFC\uD588\uC5B4\uC694`,
        dailySummaryTitle: (dateText) => `${dateText} \uC601\uC591 \uC694\uC57D`,
        remainingLabel: '\uB0A8\uC740 \uCE7C\uB85C\uB9AC',
        emptyStateEyebrow: '\uBE60\uB978 \uC2DC\uC791',
        emptyStateTitle: '\uC624\uB298 \uCCAB \uB07C\uB97C \uAE30\uB85D\uD574\uBCF4\uC138\uC694',
        emptyStateBody: 'AI \uC0AC\uC9C4 \uBD84\uC11D\uC774\uB098 \uC218\uB3D9 \uC785\uB825\uC73C\uB85C \uCCAB \uAE30\uB85D\uC744 \uBE60\uB974\uAC8C \uC0DD\uC131\uD560 \uC218 \uC788\uC5B4\uC694.',
        emptyMealTitle: '\uC544\uC9C1 \uAE30\uB85D\uB41C \uC74C\uC2DD\uC774 \uC5C6\uC5B4\uC694',
        emptyMealBody: 'AI \uB610\uB294 \uC218\uB3D9 \uC785\uB825\uC73C\uB85C \uC2DC\uC791\uD574\uBCF4\uC138\uC694',
        aiGuideEyebrow: 'AI Tips',
        aiGuideTitle: 'AI \uBD84\uC11D\uC744 \uB354 \uBE60\uB974\uACE0 \uC815\uD655\uD558\uAC8C',
        aiGuideBody: '\uC120\uBA85\uD55C \uC0AC\uC9C4\uACFC \uC7AC\uB8CC\u30FB\uC591 \uC815\uBCF4\uAC00 \uC788\uC73C\uBA74 \uC601\uC591 \uBD84\uC11D \uC815\uD655\uB3C4\uAC00 \uB354 \uC88B\uC544\uC838\uC694.',
        aiGuideTip1: '\uC811\uC2DC\uAC00 \uAC00\uB9AC\uC9C0 \uC54A\uB3C4\uB85D \uCC0D\uC5B4\uC8FC\uC138\uC694',
        aiGuideTip2: '\uD3EC\uC7A5 \uC2DD\uD488\uC774\uBA74 \uBE0C\uB79C\uB4DC\uBA85\uC744 \uD568\uAED8 \uC801\uC5B4\uC8FC\uC138\uC694',
        aiGuideTip3: '\uACB0\uACFC\uAC00 \uC5B4\uC0C9\uD558\uBA74 \uC7AC\uACC4\uC0B0 \uC804\uC5D0 \uC7AC\uB8CC\uB97C \uC218\uC815\uD574\uBCF4\uC138\uC694',
        aiItemsRequired: '\uD56D\uBAA9\uC744 \uCD5C\uC18C 1\uAC1C\uB294 \uB0A8\uACA8\uC8FC\uC138\uC694.'
    },
    ar: {
        direction: 'rtl',
        todayLabel: '\u0627\u0644\u064A\u0648\u0645',
        metaTitle: 'Woof Cal - AI Diet Tracker',
        metaOgTitle: 'Woof Cal - AI Diet Tracker',
        metaDescription: '\u062D\u0644\u0651\u0644 \u0648\u062C\u0628\u0627\u062A\u0643 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0648\u062A\u0627\u0628\u0639 \u0627\u0644\u0633\u0639\u0631\u0627\u062A \u0648\u0627\u0644\u0648\u0632\u0646 \u0648\u0627\u0644\u062A\u063A\u0630\u064A\u0629 \u0641\u064A \u0648\u0627\u062C\u0647\u0629 \u062E\u0641\u064A\u0641\u0629 \u0648\u0648\u0627\u0636\u062D\u0629.',
        dailySummaryHint: '\u0627\u0636\u063A\u0637 \u0644\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u063A\u0630\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0645\u0627\u0621',
        dailySummaryEmpty: '\u0627\u0628\u062F\u0623 \u0628\u062A\u0633\u062C\u064A\u0644 \u0648\u062C\u0628\u0627\u062A \u0627\u0644\u064A\u0648\u0645',
        dailySummaryLeftGoal: (value) => `\u0645\u062A\u0628\u0642\u064A ${value} kcal \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0647\u062F\u0641`,
        dailySummaryLeftToday: (value) => `\u0645\u062A\u0628\u0642\u064A ${value} kcal \u0644\u0644\u064A\u0648\u0645`,
        dailySummaryOverTarget: (value) => `\u062A\u0645 \u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u0647\u062F\u0641 \u0628\u0645\u0642\u062F\u0627\u0631 ${value} kcal`,
        dailySummaryTitle: (dateText) => `${dateText} \u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u063A\u0630\u064A\u0629`,
        remainingLabel: '\u0627\u0644\u0633\u0639\u0631\u0627\u062A \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629',
        emptyStateEyebrow: '\u0627\u0628\u062F\u0623 \u0628\u0633\u0631\u0639\u0629',
        emptyStateTitle: '\u0633\u062C\u0644 \u0623\u0648\u0644 \u0648\u062C\u0628\u0629 \u0644\u0643 \u0627\u0644\u064A\u0648\u0645',
        emptyStateBody: '\u0627\u0644\u062A\u0642\u0637 \u0635\u0648\u0631\u0629 \u0644\u0644\u0648\u062C\u0628\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 AI \u0623\u0648 \u0623\u0636\u0641 \u0645\u062F\u062E\u0644\u0627\u064B \u064A\u062F\u0648\u064A\u0627\u064B \u0644\u0628\u062F\u0621 \u0633\u062C\u0644\u0643 \u0627\u0644\u064A\u0648\u0645\u064A.',
        emptyMealTitle: '\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0637\u0639\u0645\u0629 \u0645\u0633\u062C\u0644\u0629 \u0628\u0639\u062F',
        emptyMealBody: '\u0627\u0628\u062F\u0623 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0623\u0648 \u0628\u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u064A\u062F\u0648\u064A',
        aiGuideEyebrow: 'AI Tips',
        aiGuideTitle: '\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0646\u062A\u0627\u0626\u062C \u0623\u0633\u0631\u0639 \u0648\u0623\u062F\u0642',
        aiGuideBody: '\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0648\u0627\u0636\u062D\u0629 \u0648\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629 \u0639\u0646 \u0627\u0644\u0645\u0643\u0648\u0646\u0627\u062A \u0648\u0627\u0644\u0643\u0645\u064A\u0629 \u062A\u0631\u0641\u0639 \u062F\u0642\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644.',
        aiGuideTip1: '\u062D\u0627\u0648\u0644 \u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u0637\u0628\u0642 \u0628\u0634\u0643\u0644 \u0648\u0627\u0636\u062D',
        aiGuideTip2: '\u0623\u0636\u0641 \u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C \u0623\u0648 \u0627\u0644\u0645\u0643\u0648\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629',
        aiGuideTip3: '\u0639\u062F\u0651\u0644 \u0627\u0644\u0645\u0643\u0648\u0646\u0627\u062A \u0642\u0628\u0644 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062D\u0633\u0627\u0628 \u0625\u0630\u0627 \u0628\u062F\u0627\u062A \u0627\u0644\u0646\u062A\u064A\u062C\u0629 \u063A\u064A\u0631 \u062F\u0642\u064A\u0642\u0629',
        aiItemsRequired: '\u064A\u0631\u062C\u0649 \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 \u0639\u0646\u0635\u0631 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644.'
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
