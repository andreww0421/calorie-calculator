const NUTRITION_FIELD_SHAPE = Object.freeze({
    calories: Object.freeze({ aliases: ['cal'] }),
    protein: Object.freeze({ aliases: [] }),
    fat: Object.freeze({ aliases: [] }),
    carbohydrate: Object.freeze({ aliases: ['carb'] }),
    sugar: Object.freeze({ aliases: [] }),
    sodium: Object.freeze({ aliases: ['sod'] }),
    saturatedFat: Object.freeze({ aliases: ['sat'] }),
    transFat: Object.freeze({ aliases: ['trans'] }),
    fiber: Object.freeze({ aliases: [] })
});

export const NUTRITION_FIELDS = Object.freeze(Object.keys(NUTRITION_FIELD_SHAPE));

function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function toNumber(value, { min = 0, max = Number.POSITIVE_INFINITY, digits = null } = {}) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return min;
    const clamped = Math.min(Math.max(numeric, min), max);
    if (digits === null) return clamped;
    const factor = 10 ** digits;
    return Math.round(clamped * factor) / factor;
}

function getNutritionSources(source) {
    const root = isPlainObject(source) ? source : {};
    const nested = isPlainObject(root.nutri) ? root.nutri : null;
    return nested ? [nested, root] : [root];
}

function pickFieldValue(source, field, aliases) {
    const keys = [field, ...aliases];
    const sources = getNutritionSources(source);

    for (const candidateSource of sources) {
        for (const key of keys) {
            const value = candidateSource?.[key];
            if (value !== undefined && value !== null && value !== '') {
                return value;
            }
        }
    }

    return 0;
}

// Keep the nutrition field list centralized here so future detailed
// nutrition fields can be added in one place and picked up by storage,
// state cloning, and AI normalization without redefining the shape.
export function createEmptyNutrition() {
    return Object.fromEntries(NUTRITION_FIELDS.map((field) => [field, 0]));
}

export function normalizeNutrition(source = {}, options = {}) {
    const { fieldOptions = {} } = options;

    return Object.fromEntries(NUTRITION_FIELDS.map((field) => {
        const config = NUTRITION_FIELD_SHAPE[field];
        const value = pickFieldValue(source, field, config.aliases);
        return [field, toNumber(value, fieldOptions[field])];
    }));
}

export function cloneNutrition(source = {}, options = {}) {
    return normalizeNutrition(source, options);
}

export function hasMeaningfulNutrition(source = {}) {
    const normalized = normalizeNutrition(source);
    return NUTRITION_FIELDS.some((field) => normalized[field] !== 0);
}
