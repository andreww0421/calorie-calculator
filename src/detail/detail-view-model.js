import { getLocaleTranslations } from '../../js/locales/index.js';
import { createDashboardNutritionFocusViewModel, createDailyNutritionDetailViewModel } from '../../js/state/nutrition-detail-selectors.js';
import { buildNutritionFocusContent, getDisplayDateLabel, getExtraUiText } from '../../js/ui/locale-ui.js';

const EMPTY_DETAIL_STATE = Object.freeze({
    selectedDate: '',
    curLang: 'zh-TW',
    targetCalories: 0,
    currentGoalType: 'lose',
    foodItems: Object.freeze([]),
    profile: null
});

const DAILY_DETAIL_COPY = Object.freeze({
    en: Object.freeze({
        title: 'Nutrition summary',
        summary: 'A report view of today: total energy first, then the full eight nutrients.',
        reportTitle: 'Today overview',
        reportSummary: 'Calories, goal, and remaining energy aligned in one header.',
        macroTitle: 'Macro distribution',
        macroSummary: 'Protein, fat, and carbs shown as today\'s main intake split.',
        nutrientTitle: 'All 8 nutrients',
        nutrientSummary: 'Protein, fat, carbs, sugar, sodium, saturated fat, trans fat, and fiber.',
        nutrientHeader: 'Nutrient',
        valueHeader: 'Value',
        focusTitle: 'Weekly focus',
        focusSummary: 'Use the recent logging rhythm as a softer reference, not a hard grade.'
    }),
    'zh-TW': Object.freeze({
        title: '營養摘要',
        summary: '用報告視角整理今天的熱量與八大營養，先看總覽，再看完整攝取量。',
        reportTitle: '今日總覽',
        reportSummary: '把熱量、目標與剩餘量先放在同一個抬頭裡。',
        macroTitle: '三大營養分布',
        macroSummary: '用最常看的蛋白質、脂肪、碳水快速判讀今天的補充節奏。',
        nutrientTitle: '八大營養',
        nutrientSummary: '蛋白質、脂肪、碳水、糖、鈉、飽和脂肪、反式脂肪與纖維一次看完。',
        nutrientHeader: '營養項目',
        valueHeader: '攝取量',
        focusTitle: '近期節奏',
        focusSummary: '把最近幾天的記錄當成參考線，幫你判讀今天的補充方向。'
    }),
    'zh-CN': Object.freeze({
        title: '营养摘要',
        summary: '用报告视角整理今天的热量与八大营养，先看总览，再看完整摄取量。',
        reportTitle: '今日总览',
        reportSummary: '把热量、目标与剩余量先放在同一个抬头里。',
        macroTitle: '三大营养分布',
        macroSummary: '用最常看的蛋白质、脂肪、碳水快速判断今天的补充节奏。',
        nutrientTitle: '八大营养',
        nutrientSummary: '蛋白质、脂肪、碳水、糖、钠、饱和脂肪、反式脂肪与纤维一次看完。',
        nutrientHeader: '营养项目',
        valueHeader: '摄取量',
        focusTitle: '近期节奏',
        focusSummary: '把最近几天的记录当成参考线，帮助判断今天的补充方向。'
    })
});

const ITEM_DETAIL_COPY = Object.freeze({
    en: Object.freeze({
        summary: 'A clearer saved-food report before you add it back into today.',
        reportTitle: 'Nutrition estimate',
        reportSummary: 'The saved entry is reorganized as a clean nutrient report.',
        macroTitle: 'Macro balance',
        macroSummary: 'Compare the estimated share of protein, fat, and carbs at a glance.',
        nutrientTitle: 'Nutrient table',
        nutrientSummary: 'A compact table for the saved food\'s current nutrition estimate.',
        nutrientHeader: 'Nutrient',
        valueHeader: 'Value',
        compositionTitle: 'Food items',
        compositionSummary: 'The saved components behind this entry.',
        itemHeader: 'Item',
        amountHeader: 'Amount',
        compositionEmpty: 'No ingredient breakdown was saved for this item.'
    }),
    'zh-TW': Object.freeze({
        summary: '把收藏餐點整理成更直觀的報告格式，加入今天前先快速看懂內容。',
        reportTitle: '營養估算',
        reportSummary: '把這筆收藏重新整理成清楚的營養報告。',
        macroTitle: '營養比例',
        macroSummary: '用色條快速比較蛋白質、脂肪與碳水的估算比例。',
        nutrientTitle: '營養表格',
        nutrientSummary: '把這筆收藏的主要營養估算整理成固定表格。',
        nutrientHeader: '營養項目',
        valueHeader: '估算值',
        compositionTitle: '食物內容',
        compositionSummary: '這筆收藏背後包含的食物項目與份量。',
        itemHeader: '食物項目',
        amountHeader: '份量',
        compositionEmpty: '這筆收藏目前沒有存下更細的食物拆解。'
    }),
    'zh-CN': Object.freeze({
        summary: '把收藏餐点整理成更直观的报告格式，加入今天前先快速看懂内容。',
        reportTitle: '营养估算',
        reportSummary: '把这笔收藏重新整理成清楚的营养报告。',
        macroTitle: '营养比例',
        macroSummary: '用色条快速比较蛋白质、脂肪和碳水的估算比例。',
        nutrientTitle: '营养表格',
        nutrientSummary: '把这笔收藏的主要营养估算整理成固定表格。',
        nutrientHeader: '营养项目',
        valueHeader: '估算值',
        compositionTitle: '食物内容',
        compositionSummary: '这笔收藏背后包含的食物项目与份量。',
        itemHeader: '食物项目',
        amountHeader: '份量',
        compositionEmpty: '这笔收藏目前没有存下更细的食物拆解。'
    })
});

const MACRO_FIELDS = Object.freeze(['protein', 'fat', 'carbohydrate']);
const NUTRIENT_FIELDS = Object.freeze(['protein', 'fat', 'carbohydrate', 'sugar', 'sodium', 'saturatedFat', 'transFat', 'fiber']);
const FIELD_UNITS = Object.freeze({
    calories: 'kcal',
    protein: 'g',
    fat: 'g',
    carbohydrate: 'g',
    sugar: 'g',
    sodium: 'mg',
    saturatedFat: 'g',
    transFat: 'g',
    fiber: 'g'
});
const MACRO_COLORS = Object.freeze({
    protein: '#6aa874',
    fat: '#efb04a',
    carbohydrate: '#6f9fe8'
});

function getCopy(copySet, lang = 'en') {
    return copySet[lang]
        || copySet[String(lang || 'en').split('-')[0]]
        || copySet.en;
}

function toNumber(value, digits = 1) {
    const normalized = Math.round((Number(value) || 0) * (10 ** digits)) / (10 ** digits);
    return Number.isInteger(normalized) ? normalized : Number(normalized.toFixed(digits));
}

function toMetricValue(field, value) {
    if (field === 'calories' || field === 'sodium') {
        return Math.round(Number(value) || 0);
    }
    return toNumber(value);
}

function getFieldLabel(field, lang) {
    const t = getLocaleTranslations(lang);
    return ({
        calories: t.cal || 'Calories',
        protein: t.pro || 'Protein',
        fat: t.fat || 'Fat',
        carbohydrate: t.carb || 'Carb',
        sugar: t.sugar || 'Sugar',
        sodium: t.sod || 'Sodium',
        saturatedFat: t.sat || 'Sat. Fat',
        transFat: t.trans || 'Trans Fat',
        fiber: t.fiber || 'Fiber'
    })[field] || field;
}

function formatMetric(field, value) {
    const normalized = toMetricValue(field, value);
    return {
        field,
        value: normalized,
        unit: FIELD_UNITS[field] || ''
    };
}

function buildMacroCards(nutrition, lang) {
    const total = MACRO_FIELDS.reduce((sum, field) => sum + Math.max(Number(nutrition?.[field]) || 0, 0), 0);
    return MACRO_FIELDS.map((field) => {
        const current = Math.max(Number(nutrition?.[field]) || 0, 0);
        const share = total > 0 ? Math.round((current / total) * 100) : 0;
        const shareLabel = share > 0
            ? (
                lang === 'zh-TW'
                    ? `約佔三大營養的 ${share}%`
                    : lang === 'zh-CN'
                        ? `约占三大营养的 ${share}%`
                        : `${share}% of today\'s macro total`
            )
            : '--';
        return {
            field,
            label: getFieldLabel(field, lang),
            value: toMetricValue(field, current),
            unit: FIELD_UNITS[field],
            share,
            shareLabel,
            color: MACRO_COLORS[field]
        };
    });
}

function buildNutrientRows(nutrition, lang) {
    return NUTRIENT_FIELDS.map((field) => ({
        field,
        label: getFieldLabel(field, lang),
        ...formatMetric(field, nutrition?.[field])
    }));
}

function buildFocusPanel(focusContent, copy) {
    const signals = (focusContent?.signals || []).map((signal) => ({
        key: String(signal?.key || ''),
        label: String(signal?.label || ''),
        value: String(signal?.value || ''),
        detail: String(signal?.detail || '')
    })).filter((signal) => signal.label || signal.value);

    if (signals.length === 0) return null;

    return {
        title: focusContent?.title || copy.focusTitle,
        summary: focusContent?.summary || copy.focusSummary,
        signals
    };
}

function buildDailyDetailSurfaceViewModel(resolvedState) {
    const lang = resolvedState.curLang || 'en';
    const t = getLocaleTranslations(lang);
    const extra = getExtraUiText(lang);
    const copy = getCopy(DAILY_DETAIL_COPY, lang);
    const detail = createDailyNutritionDetailViewModel(resolvedState);
    const focus = createDashboardNutritionFocusViewModel(resolvedState, { days: 7 });
    const focusContent = buildNutritionFocusContent(focus, lang);
    const nutrition = detail.nutrition || {};

    return {
        kind: 'daily-summary',
        lang,
        title: copy.title,
        subtitle: getDisplayDateLabel(resolvedState.selectedDate, lang),
        summary: copy.summary,
        closeLabel: t.close || 'Close',
        badge: null,
        heroStats: [
            {
                field: 'calories',
                label: t.cal || 'Calories',
                value: Math.round(Number(nutrition.calories) || 0),
                unit: 'kcal',
                emphasis: true
            },
            {
                field: 'goal',
                label: t.goal || 'Goal',
                value: detail.targetCalories > 0 ? Math.round(detail.targetCalories) : '--',
                unit: detail.targetCalories > 0 ? 'kcal' : ''
            },
            {
                field: 'remaining',
                label: extra.remainingLabel || 'Remaining',
                value: detail.targetCalories > 0 ? Math.max(Math.round(detail.remainingCalories), 0) : '--',
                unit: detail.targetCalories > 0 ? 'kcal' : ''
            }
        ],
        macroSection: {
            title: copy.macroTitle,
            summary: copy.macroSummary,
            cards: buildMacroCards(nutrition, lang)
        },
        reportSection: {
            title: copy.reportTitle,
            summary: copy.reportSummary
        },
        nutrientSection: {
            title: copy.nutrientTitle,
            summary: copy.nutrientSummary,
            headers: [copy.nutrientHeader, copy.valueHeader],
            rows: buildNutrientRows(nutrition, lang)
        },
        compositionSection: null,
        focusPanel: buildFocusPanel(focusContent, copy)
    };
}

function buildItemDetailSurfaceViewModel(item = {}, resolvedState = EMPTY_DETAIL_STATE) {
    const lang = resolvedState.curLang || 'en';
    const t = getLocaleTranslations(lang);
    const copy = getCopy(ITEM_DETAIL_COPY, lang);
    const nutrition = item?.nutri || item?.nutrition || item || {};
    const mealLabel = item?.type
        ? (t.meals?.[item.type] || item.type)
        : getDisplayDateLabel(resolvedState.selectedDate, lang);
    const healthScore = Number(item?.healthScore) || 0;
    const compositionRows = (Array.isArray(item?.items) ? item.items : [])
        .map((row) => ({
            name: String(row?.name || ''),
            amount: String(row?.weight || row?.amount || '')
        }))
        .filter((row) => row.name || row.amount);

    return {
        kind: 'item-detail',
        lang,
        title: item?.name || copy.reportTitle,
        subtitle: mealLabel,
        summary: copy.summary,
        closeLabel: t.close || 'Close',
        badge: healthScore > 0
            ? {
                label: t.healthScoreLabel || 'Health Score',
                value: `${Math.round(healthScore)}/10`
            }
            : null,
        heroStats: [
            {
                field: 'calories',
                label: t.cal || 'Calories',
                value: toMetricValue('calories', nutrition.calories),
                unit: 'kcal',
                emphasis: true
            },
            {
                field: 'carbohydrate',
                label: getFieldLabel('carbohydrate', lang),
                value: toMetricValue('carbohydrate', nutrition.carbohydrate),
                unit: 'g'
            },
            {
                field: 'protein',
                label: getFieldLabel('protein', lang),
                value: toMetricValue('protein', nutrition.protein),
                unit: 'g'
            },
            {
                field: 'fat',
                label: getFieldLabel('fat', lang),
                value: toMetricValue('fat', nutrition.fat),
                unit: 'g'
            }
        ],
        macroSection: {
            title: copy.macroTitle,
            summary: copy.macroSummary,
            cards: buildMacroCards(nutrition, lang)
        },
        reportSection: {
            title: copy.reportTitle,
            summary: copy.reportSummary
        },
        nutrientSection: {
            title: copy.nutrientTitle,
            summary: copy.nutrientSummary,
            headers: [copy.nutrientHeader, copy.valueHeader],
            rows: buildNutrientRows(nutrition, lang)
        },
        compositionSection: {
            title: copy.compositionTitle,
            summary: copy.compositionSummary,
            headers: [copy.itemHeader, copy.amountHeader],
            emptyText: copy.compositionEmpty,
            rows: compositionRows
        },
        focusPanel: null
    };
}

export function buildDetailSurfaceViewModel(state = EMPTY_DETAIL_STATE, request = { kind: 'daily-summary' }) {
    const resolvedState = state || EMPTY_DETAIL_STATE;
    const kind = request?.kind || 'daily-summary';

    if (kind === 'item-detail') {
        return buildItemDetailSurfaceViewModel(request?.item || {}, resolvedState);
    }

    return buildDailyDetailSurfaceViewModel(resolvedState);
}
