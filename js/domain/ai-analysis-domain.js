function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function toNumber(value, { min = 0, max = Number.POSITIVE_INFINITY, digits = null } = {}) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return min;
    const clamped = clamp(numeric, min, max);
    if (digits === null) return clamped;
    const factor = 10 ** digits;
    return Math.round(clamped * factor) / factor;
}

export function normalizeAIItem(item) {
    const name = String(item?.name ?? '').trim();
    const weight = String(item?.weight ?? '').trim();
    if (!name && !weight) return null;
    return { name, weight };
}

export function normalizeAIAnalysisResult(result = {}, options = {}) {
    const {
        fallbackName = '',
        fallbackItems = []
    } = options;

    const items = Array.isArray(result.items)
        ? result.items.map(normalizeAIItem).filter(Boolean)
        : fallbackItems.map(normalizeAIItem).filter(Boolean);

    const normalized = {
        foodName: String(result.foodName ?? result.name ?? fallbackName ?? '').trim() || 'Food Analysis',
        calories: toNumber(result.calories, { max: 5000, digits: 0 }),
        protein: toNumber(result.protein, { max: 300, digits: 1 }),
        fat: toNumber(result.fat, { max: 300, digits: 1 }),
        carbohydrate: toNumber(result.carbohydrate, { max: 500, digits: 1 }),
        sugar: toNumber(result.sugar, { max: 300, digits: 1 }),
        sodium: toNumber(result.sodium, { max: 20000, digits: 0 }),
        saturatedFat: toNumber(result.saturatedFat, { max: 150, digits: 1 }),
        transFat: toNumber(result.transFat, { max: 50, digits: 1 }),
        fiber: toNumber(result.fiber, { max: 150, digits: 1 }),
        healthScore: toNumber(result.healthScore, { max: 10, digits: 1 }),
        items
    };

    const hasMeaningfulData =
        normalized.calories > 0 ||
        normalized.protein > 0 ||
        normalized.fat > 0 ||
        normalized.carbohydrate > 0 ||
        normalized.items.length > 0;

    if (!hasMeaningfulData) {
        throw new Error('AI_INVALID_PAYLOAD');
    }

    return normalized;
}

export function extractAnalysisFromGeminiPayload(data) {
    if (!data?.candidates?.length) {
        throw new Error('AI returned no candidates');
    }

    let text = data.candidates[0]?.content?.parts?.[0]?.text || '';
    text = String(text).replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(text);
    return normalizeAIAnalysisResult(parsed);
}
