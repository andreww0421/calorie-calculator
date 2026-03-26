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

const COACH_COPY = {
    'zh-TW': {
        cardTitle: '今日教練建議',
        weeklyTitle: '近 7 天節奏',
        headlines: {
            start_logging: '從第一餐開始建立今天的節奏',
            over_target: '今天的熱量已經偏高',
            near_goal: '今天很接近目標區間',
            protein_gap: '蛋白質還有補強空間',
            fiber_gap: '纖維可以再補一些',
            sodium_high: '鈉含量今天偏高',
            steady: '今天的進度很穩'
        },
        summaries: {
            start_logging: '先記下第一餐，儀表板和 AI 建議就會開始為你工作。',
            over_target: (coach) => `目前比目標多 ${coach.overCalories} kcal，後續餐次建議清爽一點。`,
            near_goal: (coach) => `距離目標只差 ${coach.remainingCalories} kcal，晚點心份量可以保守。`,
            protein_gap: (coach) => `距離今日蛋白質建議大約還差 ${coach.proteinGap}g。`,
            fiber_gap: (coach) => `今天纖維距離建議值約還差 ${coach.fiberGap}g。`,
            sodium_high: '建議下一餐避開重鹹或加工食品，讓整天更平衡。',
            steady: '目前熱量與營養節奏都還不錯，持續記錄就好。'
        },
        tips: {
            use_ai: '先用 AI 拍照記錄最快。',
            log_first_meal: '如果趕時間，也可以手動輸入基本熱量與蛋白質。',
            protein_boost: '下一餐可優先補雞蛋、豆腐、雞胸或優格。',
            fiber_boost: '加一份蔬菜、水果或全穀類，纖維會更完整。',
            watch_sodium: '接下來多喝水，並把醬料與湯品減量。',
            portion_reset: '下一餐主食或點心減半，通常就能拉回區間。',
            keep_momentum: '保持現在的紀錄節奏，晚餐前再看一次摘要卡。'
        },
        weeklyAverage: (value) => `平均 ${value} kcal`,
        weeklyDays: (days) => `${days} 天有完成記錄`,
        weeklyBest: (day, cal) => `${day} 最高 ${cal} kcal`
    },
    'zh-CN': {
        cardTitle: '今日教练建议',
        weeklyTitle: '近 7 天节奏',
        headlines: {
            start_logging: '从第一餐开始建立今天的节奏',
            over_target: '今天的热量已经偏高',
            near_goal: '今天很接近目标区间',
            protein_gap: '蛋白质还有补强空间',
            fiber_gap: '纤维可以再补一些',
            sodium_high: '钠含量今天偏高',
            steady: '今天的进度很稳'
        },
        summaries: {
            start_logging: '先记下第一餐，仪表板和 AI 建议就会开始发挥作用。',
            over_target: (coach) => `目前比目标多 ${coach.overCalories} kcal，后续餐次建议清爽一点。`,
            near_goal: (coach) => `距离目标只差 ${coach.remainingCalories} kcal，之后加餐可以保守一点。`,
            protein_gap: (coach) => `距离今日蛋白质建议大约还差 ${coach.proteinGap}g。`,
            fiber_gap: (coach) => `今天纤维距离建议值约还差 ${coach.fiberGap}g。`,
            sodium_high: '建议下一餐减少重口味和加工食品，让整天更平衡。',
            steady: '当前热量和营养节奏都不错，继续保持记录。'
        },
        tips: {
            use_ai: '先用 AI 拍照记录会最快。',
            log_first_meal: '赶时间时，也可以先手动输入热量和蛋白质。',
            protein_boost: '下一餐可优先补鸡蛋、豆腐、鸡胸或酸奶。',
            fiber_boost: '加一份蔬菜、水果或全谷类，纤维会更完整。',
            watch_sodium: '接下来多喝水，并减少酱料和汤汁。',
            portion_reset: '下一餐主食或零食减半，通常就能拉回区间。',
            keep_momentum: '保持现在的记录节奏，晚餐前再看一次摘要卡。'
        },
        weeklyAverage: (value) => `平均 ${value} kcal`,
        weeklyDays: (days) => `${days} 天完成记录`,
        weeklyBest: (day, cal) => `${day} 最高 ${cal} kcal`
    },
    en: {
        cardTitle: 'Daily Coach',
        weeklyTitle: 'Last 7 Days',
        headlines: {
            start_logging: 'Build today with the first meal',
            over_target: 'Calories are already trending high',
            near_goal: 'You are close to your target zone',
            protein_gap: 'Protein still needs a boost',
            fiber_gap: 'Fiber can use a lift',
            sodium_high: 'Sodium is running high today',
            steady: 'Today is moving in a solid direction'
        },
        summaries: {
            start_logging: 'Log the first meal and the dashboard can start coaching the rest of your day.',
            over_target: (coach) => `You are about ${coach.overCalories} kcal over target, so the next meal should stay lighter.`,
            near_goal: (coach) => `Only about ${coach.remainingCalories} kcal remain, so snacks should stay modest.`,
            protein_gap: (coach) => `You are still about ${coach.proteinGap}g short of your protein target.`,
            fiber_gap: (coach) => `You are still about ${coach.fiberGap}g short of a strong fiber day.`,
            sodium_high: 'A lighter, less salty next meal will help rebalance the day.',
            steady: 'Calories and nutrients look fairly steady so far. Keep logging.'
        },
        tips: {
            use_ai: 'Use AI photo logging if you want the fastest start.',
            log_first_meal: 'If you are busy, add a quick manual entry with calories and protein first.',
            protein_boost: 'Try eggs, tofu, chicken breast, Greek yogurt, or milk next.',
            fiber_boost: 'Add vegetables, fruit, beans, or whole grains to lift fiber.',
            watch_sodium: 'Drink more water and go lighter on soup, sauce, and packaged foods.',
            portion_reset: 'Cut the next carb or snack portion in half to recover the day.',
            keep_momentum: 'Stay with the current pace and check the summary card again before dinner.'
        },
        weeklyAverage: (value) => `${value} kcal avg`,
        weeklyDays: (days) => `${days} logged days`,
        weeklyBest: (day, cal) => `${day} peak ${cal} kcal`
    },
    ja: {
        cardTitle: '今日のコーチメモ',
        weeklyTitle: '直近7日',
        headlines: {
            start_logging: 'まずは最初の食事から始めましょう',
            over_target: '今日はカロリーが少し高めです',
            near_goal: '目標レンジにかなり近いです',
            protein_gap: 'たんぱく質をもう少し補えます',
            fiber_gap: '食物繊維を少し足したいです',
            sodium_high: '塩分が高めです',
            steady: '今日は安定した流れです'
        },
        summaries: {
            start_logging: '最初の食事を記録すると、今日のガイドが動き始めます。',
            over_target: (coach) => `目標より約 ${coach.overCalories} kcal 多いので、次の食事は軽めがおすすめです。`,
            near_goal: (coach) => `残りは約 ${coach.remainingCalories} kcal なので、間食は控えめで十分です。`,
            protein_gap: (coach) => `今日のたんぱく質目安まで約 ${coach.proteinGap}g 足りません。`,
            fiber_gap: (coach) => `食物繊維は目安まで約 ${coach.fiberGap}g 足りません。`,
            sodium_high: '次の食事は塩分の少ないものを選ぶと整いやすいです。',
            steady: '今のところカロリーと栄養の流れは良好です。'
        },
        tips: {
            use_ai: '最初はAI写真記録がいちばん速いです。',
            log_first_meal: '急いでいる時はカロリーとたんぱく質だけ先に入力してもOKです。',
            protein_boost: '次は卵、豆腐、鶏むね、ヨーグルトを優先すると補いやすいです。',
            fiber_boost: '野菜、果物、豆、全粒穀物を足すと繊維が伸びます。',
            watch_sodium: '水分を増やして、汁物やソースは少し控えめにしましょう。',
            portion_reset: '次の主食か間食を半分にすると戻しやすいです。',
            keep_momentum: 'このペースを維持して、夕食前にもう一度まとめを見ましょう。'
        },
        weeklyAverage: (value) => `平均 ${value} kcal`,
        weeklyDays: (days) => `${days} 日記録`,
        weeklyBest: (day, cal) => `${day} 最高 ${cal} kcal`
    },
    ko: {
        cardTitle: '오늘의 코치 메모',
        weeklyTitle: '최근 7일',
        headlines: {
            start_logging: '첫 끼부터 오늘 흐름을 시작해보세요',
            over_target: '오늘은 열량이 조금 높은 편이에요',
            near_goal: '목표 구간에 꽤 가까워요',
            protein_gap: '단백질을 조금 더 채울 수 있어요',
            fiber_gap: '식이섬유를 더하면 좋아요',
            sodium_high: '나트륨이 높은 편이에요',
            steady: '오늘 흐름이 꽤 안정적이에요'
        },
        summaries: {
            start_logging: '첫 식사를 기록하면 오늘의 대시보드가 제대로 움직이기 시작해요.',
            over_target: (coach) => `목표보다 약 ${coach.overCalories} kcal 높아서 다음 식사는 가볍게 가는 편이 좋아요.`,
            near_goal: (coach) => `남은 열량이 약 ${coach.remainingCalories} kcal 정도라 간식은 가볍게 충분해요.`,
            protein_gap: (coach) => `단백질 목표까지 약 ${coach.proteinGap}g 정도가 더 필요해요.`,
            fiber_gap: (coach) => `식이섬유는 권장량까지 약 ${coach.fiberGap}g 정도 더 필요해요.`,
            sodium_high: '다음 끼니는 국물과 소스를 줄이면 균형이 좋아져요.',
            steady: '현재 칼로리와 영양 흐름이 꽤 괜찮아요.'
        },
        tips: {
            use_ai: '가장 빠른 시작은 AI 사진 기록이에요.',
            log_first_meal: '바쁘면 칼로리와 단백질만 먼저 수동 입력해도 괜찮아요.',
            protein_boost: '다음 식사는 달걀, 두부, 닭가슴살, 그릭요거트를 우선해보세요.',
            fiber_boost: '채소, 과일, 콩류, 통곡물을 더하면 섬유질이 올라가요.',
            watch_sodium: '물을 더 마시고 국물, 소스, 가공식품을 조금 줄여보세요.',
            portion_reset: '다음 탄수화물이나 간식 양을 절반 정도 줄이면 흐름이 돌아와요.',
            keep_momentum: '지금 페이스를 유지하고 저녁 전에 요약 카드를 다시 확인해보세요.'
        },
        weeklyAverage: (value) => `평균 ${value} kcal`,
        weeklyDays: (days) => `${days}일 기록`,
        weeklyBest: (day, cal) => `${day} 최고 ${cal} kcal`
    },
    ar: {
        cardTitle: 'ملاحظات اليوم',
        weeklyTitle: 'آخر 7 أيام',
        headlines: {
            start_logging: 'ابدأ اليوم بتسجيل أول وجبة',
            over_target: 'السعرات اليوم أعلى من المطلوب',
            near_goal: 'أنت قريب من نطاق الهدف',
            protein_gap: 'البروتين ما زال يحتاج دعماً',
            fiber_gap: 'الألياف تحتاج دفعة إضافية',
            sodium_high: 'الصوديوم مرتفع اليوم',
            steady: 'إيقاع اليوم جيد حتى الآن'
        },
        summaries: {
            start_logging: 'بمجرد تسجيل أول وجبة سيبدأ التطبيق بإعطائك صورة أوضح لباقي اليوم.',
            over_target: (coach) => `أنت أعلى من الهدف بحوالي ${coach.overCalories} kcal، لذلك من الأفضل أن تكون الوجبة التالية أخف.`,
            near_goal: (coach) => `المتبقي حوالي ${coach.remainingCalories} kcal فقط، لذلك يكفي سناك خفيف إذا احتجته.`,
            protein_gap: (coach) => `ما زال ينقصك حوالي ${coach.proteinGap}g للوصول إلى هدف البروتين اليومي.`,
            fiber_gap: (coach) => `ما زال ينقصك حوالي ${coach.fiberGap}g للوصول إلى يوم غني بالألياف.`,
            sodium_high: 'اختر وجبة أقل ملوحة لاحقاً حتى يعود التوازن لباقي اليوم.',
            steady: 'السعرات والعناصر الغذائية تسير بشكل متوازن حتى الآن.'
        },
        tips: {
            use_ai: 'ابدأ بتسجيل صورة بالذكاء الاصطناعي إذا أردت أسرع طريقة.',
            log_first_meal: 'إذا كنت مستعجلاً، أدخل السعرات والبروتين يدوياً أولاً.',
            protein_boost: 'في الوجبة القادمة جرّب البيض أو الدجاج أو اللبن أو التوفو.',
            fiber_boost: 'أضف خضاراً أو فاكهة أو بقوليات أو حبوباً كاملة لرفع الألياف.',
            watch_sodium: 'اشرب ماء أكثر وخفف من الشوربة والصلصات والأطعمة المصنعة.',
            portion_reset: 'تقليل النشويات أو السناك التالي إلى النصف يساعدك على العودة للمسار.',
            keep_momentum: 'حافظ على الإيقاع الحالي وراجع البطاقة مرة أخرى قبل العشاء.'
        },
        weeklyAverage: (value) => `المتوسط ${value} kcal`,
        weeklyDays: (days) => `${days} أيام مسجلة`,
        weeklyBest: (day, cal) => `${day} الأعلى ${cal} kcal`
    }
};

export function buildCoachContent(coach, lang = curLang) {
    const copy = COACH_COPY[lang] || COACH_COPY.en;
    const headline = copy.headlines[coach?.status] || copy.headlines.steady;
    const summaryTemplate = copy.summaries[coach?.status] || copy.summaries.steady;
    const summary = typeof summaryTemplate === 'function' ? summaryTemplate(coach) : summaryTemplate;
    const tips = (coach?.tipKeys || [])
        .map((key) => copy.tips[key])
        .filter(Boolean);

    return {
        cardTitle: copy.cardTitle,
        weeklyTitle: copy.weeklyTitle,
        headline,
        summary,
        tips,
        weeklyStats: [
            copy.weeklyAverage(coach?.weekly?.averageCalories || 0),
            copy.weeklyDays(coach?.weekly?.loggedDays || 0),
            copy.weeklyBest(coach?.weekly?.bestDayLabel || '--', coach?.weekly?.bestDayCalories || 0)
        ]
    };
}
