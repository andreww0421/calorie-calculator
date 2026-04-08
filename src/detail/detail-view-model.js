import { getLocaleTranslations } from '../../js/locales/index.js';
import { buildNutritionFocusContent } from '../../js/ui/locale-ui.js';
import { buildNutritionDetailModel } from '../../js/domain/nutrition-presentation-domain.js';
import { createDashboardNutritionFocusViewModel, createDailyNutritionDetailViewModel } from '../../js/state/nutrition-detail-selectors.js';
import { getAppState } from '../../js/state/app-state.js';
import { getDisplayDateLabel, getNutritionUiText } from '../../js/ui/locale-ui.js';

function toText(value, fallback = '') {
    if (value === null || value === undefined) return fallback;
    return String(value);
}

function toMetricText(value, fallback = '--') {
    if (value === null || value === undefined || value === '') return fallback;
    return String(value);
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

function toNutritionDetailCards(detail, lang) {
    return (detail.detail?.highlights || []).map((item) => ({
        field: item.field,
        label: getFieldLabel(item.field, lang),
        value: item.value,
        unit: item.unit
    }));
}

function toNutritionSectionCards(detail, lang, ui) {
    return (detail.detail?.sections || []).map((section) => ({
        id: section.id,
        title: ui.sections?.[section.id]?.title || section.id,
        summary: ui.sections?.[section.id]?.summary || '',
        items: (section.items || []).map((item) => ({
            field: item.field,
            label: getFieldLabel(item.field, lang),
            value: item.value,
            unit: item.unit
        }))
    }));
}

function buildDailyDetailSurfaceViewModel(resolvedState) {
    const lang = resolvedState.curLang || 'en';
    const ui = getNutritionUiText(lang).detail;
    const t = getLocaleTranslations(lang);
    const detail = createDailyNutritionDetailViewModel(resolvedState);
    const focus = createDashboardNutritionFocusViewModel(resolvedState, { days: 7 });
    const focusContent = buildNutritionFocusContent(focus, lang);

    return {
        kind: 'daily-summary',
        lang,
        title: ui.overviewTitle || 'Nutrition details',
        subtitle: getDisplayDateLabel(resolvedState.selectedDate, lang),
        summary: ui.overviewSummary || '',
        closeLabel: t.close || 'Close',
        detailTitle: ui.sections?.quality?.title || 'Core nutrition',
        detailSummary: ui.sections?.quality?.summary || 'A clearer look at calories, macros, and nutrient quality.',
        detail,
        focus,
        summaryCards: [
            {
                label: t.goal || 'Goal',
                value: detail.targetCalories > 0 ? `${detail.targetCalories} kcal` : '--'
            },
            {
                label: ui.remainingLabel || 'Remaining',
                value: detail.targetCalories > 0 ? `${detail.remainingCalories} kcal` : '--'
            },
            {
                label: t.water || 'Water',
                value: detail.waterTarget > 0 ? `${detail.waterTarget} ml` : '--'
            }
        ],
        detailCards: toNutritionDetailCards(detail, lang),
        sectionCards: toNutritionSectionCards(detail, lang, ui),
        focusContent,
        focusSignals: (focus.signals || []).map((signal) => ({
            key: toText(signal?.key, ''),
            label: toText(signal?.label, ''),
            value: toMetricText(signal?.value),
            detail: toText(signal?.detail, '')
        }))
    };
}

function buildItemDetailSurfaceViewModel(item = {}, resolvedState = getAppState()) {
    const lang = resolvedState.curLang || 'en';
    const ui = getNutritionUiText(lang).detail;
    const t = getLocaleTranslations(lang);
    const nutritionSource = item?.nutri || item?.nutrition || item || {};
    const detail = buildItemNutritionDetailModel(nutritionSource, lang);
    const mealLabel = item?.type
        ? (t.meals?.[item.type] || item.type)
        : '';
    const scoreValue = Number(item?.healthScore) > 0 ? `${Math.round(Number(item.healthScore))}/10` : '--';
    const itemCount = Array.isArray(item?.items) ? item.items.length : 0;

    return {
        kind: 'item-detail',
        lang,
        title: item?.name || ui.itemTitle || 'Meal details',
        subtitle: mealLabel || getDisplayDateLabel(resolvedState.selectedDate, lang),
        summary: ui.itemSummary || 'A quicker look at this meal before you decide what to do next.',
        closeLabel: t.close || 'Close',
        detailTitle: ui.sections?.quality?.title || 'Core nutrition',
        detailSummary: ui.itemDetailSummary || 'A clearer look at calories, macros, and nutrient quality.',
        detail,
        summaryCards: [
            {
                label: t.cal || 'Calories',
                value: detail.nutrition?.calories > 0 ? `${detail.nutrition.calories} kcal` : '--'
            },
            {
                label: t.pro || 'Protein',
                value: detail.nutrition?.protein > 0 ? `${detail.nutrition.protein} g` : '--'
            },
            {
                label: t.healthScoreLabel || 'Health Score',
                value: scoreValue !== '--' ? scoreValue : (itemCount > 0 ? `${itemCount} items` : '--')
            }
        ],
        detailCards: detail.detailCards,
        sectionCards: detail.sectionCards,
        focusContent: null,
        focusSignals: []
    };
}

function buildItemNutritionDetailModel(source = {}, lang) {
    const detail = buildNutritionDetailModel(source);
    const ui = getNutritionUiText(lang).detail;
    return {
        nutrition: detail.nutrition,
        detailCards: toNutritionDetailCards({ detail }, lang),
        sectionCards: toNutritionSectionCards({ detail }, lang, ui)
    };
}

export function buildDetailSurfaceViewModel(state = getAppState(), request = { kind: 'daily-summary' }) {
    const resolvedState = state || getAppState();
    const kind = request?.kind || 'daily-summary';

    if (kind === 'item-detail') {
        return buildItemDetailSurfaceViewModel(request?.item || {}, resolvedState);
    }

    return buildDailyDetailSurfaceViewModel(resolvedState);
}
