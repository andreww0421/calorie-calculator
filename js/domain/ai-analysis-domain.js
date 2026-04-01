import { hasMeaningfulNutrition, normalizeNutrition } from './nutrition-schema.js';

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

export function normalizeAIDraftItem(item) {
    return {
        name: String(item?.name ?? '').trim(),
        weight: String(item?.weight ?? '').trim()
    };
}

export function cloneAICorrectionHistory(history = []) {
    if (!Array.isArray(history)) return [];
    return history
        .map((entry) => {
            if (!entry || typeof entry !== 'object') return null;
            const type = String(entry.type || '').trim();
            const timestamp = String(entry.timestamp || '').trim();
            if (!type || !timestamp) return null;
            return {
                type,
                timestamp,
                itemIndex: Number.isInteger(entry.itemIndex) ? entry.itemIndex : undefined,
                field: entry.field ? String(entry.field) : undefined,
                previousValue: entry.previousValue !== undefined ? String(entry.previousValue) : undefined,
                nextValue: entry.nextValue !== undefined ? String(entry.nextValue) : undefined,
                itemName: entry.itemName !== undefined ? String(entry.itemName) : undefined,
                weight: entry.weight !== undefined ? String(entry.weight) : undefined,
                itemCount: entry.itemCount !== undefined ? Math.max(0, Math.round(Number(entry.itemCount) || 0)) : undefined
            };
        })
        .filter(Boolean);
}

export function createAICorrectionEntry(type, payload = {}) {
    return {
        type: String(type || 'edit'),
        timestamp: payload.timestamp || new Date().toISOString(),
        itemIndex: Number.isInteger(payload.itemIndex) ? payload.itemIndex : undefined,
        field: payload.field ? String(payload.field) : undefined,
        previousValue: payload.previousValue !== undefined ? String(payload.previousValue) : undefined,
        nextValue: payload.nextValue !== undefined ? String(payload.nextValue) : undefined,
        itemName: payload.itemName !== undefined ? String(payload.itemName) : undefined,
        weight: payload.weight !== undefined ? String(payload.weight) : undefined,
        itemCount: payload.itemCount !== undefined ? Math.max(0, Math.round(Number(payload.itemCount) || 0)) : undefined
    };
}

export function appendAICorrectionHistory(history = [], entry = null, { limit = 25 } = {}) {
    const normalizedHistory = cloneAICorrectionHistory(history);
    if (!entry) return normalizedHistory;
    const nextEntry = cloneAICorrectionHistory([entry])[0];
    if (!nextEntry) return normalizedHistory;
    return [...normalizedHistory, nextEntry].slice(-limit);
}

export function normalizeAIAnalysisResult(result = {}, options = {}) {
    const {
        fallbackName = '',
        fallbackItems = []
    } = options;

    const items = Array.isArray(result.items)
        ? result.items.map(normalizeAIItem).filter(Boolean)
        : fallbackItems.map(normalizeAIItem).filter(Boolean);

    const nutrition = normalizeNutrition(result, {
        fieldOptions: {
            calories: { max: 5000, digits: 0 },
            protein: { max: 300, digits: 1 },
            fat: { max: 300, digits: 1 },
            carbohydrate: { max: 500, digits: 1 },
            sugar: { max: 300, digits: 1 },
            sodium: { max: 20000, digits: 0 },
            saturatedFat: { max: 150, digits: 1 },
            transFat: { max: 50, digits: 1 },
            fiber: { max: 150, digits: 1 }
        }
    });

    const normalized = {
        foodName: String(result.foodName ?? result.name ?? fallbackName ?? '').trim() || 'Food Analysis',
        ...nutrition,
        healthScore: toNumber(result.healthScore, { max: 10, digits: 1 }),
        items
    };

    const hasMeaningfulData =
        hasMeaningfulNutrition(nutrition) ||
        normalized.items.length > 0;

    if (!hasMeaningfulData) {
        throw new Error('AI_INVALID_PAYLOAD');
    }

    return normalized;
}

export function normalizeTempAIResult(result, options = {}) {
    if (!result || typeof result !== 'object') return null;

    const {
        fallbackName = '',
        fallbackItems = [],
        preferredName = '',
        correctionHistory = result?.correctionHistory || []
    } = options;

    const hasExplicitNutri = result.nutri !== undefined || result.correctionHistory !== undefined;
    const items = Array.isArray(result.items)
        ? result.items.map(normalizeAIDraftItem)
        : fallbackItems.map(normalizeAIDraftItem);

    if (hasExplicitNutri) {
        return {
            name: String(result.name || preferredName || fallbackName || '').trim() || 'Food Analysis',
            nutri: normalizeNutrition(result.nutri !== undefined ? result.nutri : result),
            items,
            healthScore: toNumber(result.healthScore, { max: 10, digits: 1 }),
            correctionHistory: cloneAICorrectionHistory(correctionHistory)
        };
    }

    const normalized = normalizeAIAnalysisResult(result, {
        fallbackName,
        fallbackItems
    });

    return {
        name: String(preferredName || normalized.foodName || fallbackName || '').trim() || 'Food Analysis',
        nutri: normalizeNutrition(normalized),
        items: normalized.items,
        healthScore: normalized.healthScore,
        correctionHistory: cloneAICorrectionHistory(correctionHistory)
    };
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
