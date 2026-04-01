import { normalizeNutrition } from './nutrition-schema.js';

export const NUTRITION_HIGHLIGHT_FIELDS = Object.freeze([
    'calories',
    'protein',
    'carbohydrate',
    'fat'
]);

export const NUTRITION_SECTION_CONFIG = Object.freeze([
    Object.freeze({
        id: 'quality',
        fields: Object.freeze(['fiber', 'sugar', 'sodium'])
    }),
    Object.freeze({
        id: 'fatDetails',
        fields: Object.freeze(['saturatedFat', 'transFat'])
    })
]);

const NUTRITION_UNITS = Object.freeze({
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

function roundValue(value, digits = 1) {
    const factor = 10 ** digits;
    return Math.round((Number(value) || 0) * factor) / factor;
}

function toMetric(field, nutrition) {
    const rawValue = nutrition[field] ?? 0;
    const roundedValue = field === 'calories' || field === 'sodium'
        ? Math.round(Number(rawValue) || 0)
        : roundValue(rawValue);

    return {
        field,
        value: roundedValue,
        unit: NUTRITION_UNITS[field] || ''
    };
}

function averageMetrics(entries = []) {
    const safeEntries = Array.isArray(entries) ? entries : [];
    if (safeEntries.length === 0) {
        return normalizeNutrition();
    }

    const sums = safeEntries.reduce((accumulator, entry) => {
        const normalized = normalizeNutrition(entry);
        Object.keys(accumulator).forEach((field) => {
            accumulator[field] += Number(normalized[field]) || 0;
        });
        return accumulator;
    }, normalizeNutrition());

    return Object.fromEntries(
        Object.keys(sums).map((field) => {
            const averaged = sums[field] / safeEntries.length;
            return [field, field === 'calories' || field === 'sodium'
                ? Math.round(averaged)
                : roundValue(averaged)];
        })
    );
}

export function buildNutritionDetailModel(source = {}) {
    const nutrition = normalizeNutrition(source);

    return {
        nutrition,
        highlights: NUTRITION_HIGHLIGHT_FIELDS.map((field) => toMetric(field, nutrition)),
        sections: NUTRITION_SECTION_CONFIG.map((section) => ({
            id: section.id,
            items: section.fields.map((field) => toMetric(field, nutrition))
        }))
    };
}

export function buildNutritionFocusModel({
    todayNutrition = {},
    nutritionHistory = [],
    proteinTarget = 0,
    fiberTarget = 25,
    sodiumLimit = 2300
} = {}) {
    const today = normalizeNutrition(todayNutrition);
    const normalizedHistory = (Array.isArray(nutritionHistory) ? nutritionHistory : [])
        .map((entry) => normalizeNutrition(entry))
        .filter((entry) => Object.values(entry).some((value) => Number(value) > 0));
    const average = averageMetrics(normalizedHistory);
    const normalizedProteinTarget = Math.max(0, roundValue(proteinTarget));
    const normalizedFiberTarget = Math.max(0, roundValue(fiberTarget));
    const normalizedSodiumLimit = Math.max(0, Math.round(Number(sodiumLimit) || 0));

    let focusKey = 'balanced';
    if (normalizedHistory.length === 0 && today.calories <= 0) {
        focusKey = 'start_logging';
    } else if (normalizedProteinTarget > 0 && today.protein < normalizedProteinTarget * 0.72) {
        focusKey = 'protein';
    } else if (today.fiber < Math.max(normalizedFiberTarget * 0.72, 12)) {
        focusKey = 'fiber';
    } else if (normalizedSodiumLimit > 0 && today.sodium > normalizedSodiumLimit) {
        focusKey = 'sodium';
    }

    return {
        focusKey,
        loggedDays: normalizedHistory.length,
        averageNutrition: average,
        proteinTarget: normalizedProteinTarget,
        fiberTarget: normalizedFiberTarget,
        sodiumLimit: normalizedSodiumLimit,
        signals: [
            {
                key: 'protein',
                current: roundValue(today.protein),
                target: normalizedProteinTarget,
                average: roundValue(average.protein)
            },
            {
                key: 'fiber',
                current: roundValue(today.fiber),
                target: normalizedFiberTarget,
                average: roundValue(average.fiber)
            },
            {
                key: 'sodium',
                current: Math.round(today.sodium),
                target: normalizedSodiumLimit,
                average: Math.round(average.sodium)
            }
        ]
    };
}
