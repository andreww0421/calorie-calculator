import { cloneNutrition, createEmptyNutrition, NUTRITION_FIELDS, normalizeNutrition } from './nutrition-schema.js';

function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function resolveLocalizedValue(value, lang = 'en', fallbackLang = 'en') {
    if (typeof value === 'string') return value;
    if (!isPlainObject(value)) return '';

    const localeKey = String(lang || fallbackLang || 'en');
    const baseLang = localeKey.split('-')[0];

    return String(
        value[localeKey]
        || value[baseLang]
        || value[fallbackLang]
        || Object.values(value).find(Boolean)
        || ''
    ).trim();
}

function toIdArray(value) {
    if (Array.isArray(value)) {
        return value.map((item) => String(item || '').trim()).filter(Boolean);
    }
    const single = String(value || '').trim();
    return single ? [single] : [];
}

function toSingleId(value) {
    return String(Array.isArray(value) ? value[0] : value || '').trim();
}

function normalizeResolvedNutrition(source) {
    return normalizeNutrition(source, {
        fieldOptions: {
            calories: { min: 0, max: 5000, digits: 0 },
            protein: { min: 0, max: 300, digits: 1 },
            fat: { min: 0, max: 300, digits: 1 },
            carbohydrate: { min: 0, max: 500, digits: 1 },
            sugar: { min: 0, max: 300, digits: 1 },
            sodium: { min: 0, max: 20000, digits: 0 },
            saturatedFat: { min: 0, max: 150, digits: 1 },
            transFat: { min: 0, max: 50, digits: 1 },
            fiber: { min: 0, max: 150, digits: 1 }
        }
    });
}

function normalizeNutritionDelta(delta = {}) {
    return Object.fromEntries(NUTRITION_FIELDS.map((field) => {
        const numeric = Number(delta?.[field]);
        return [field, Number.isFinite(numeric) ? numeric : 0];
    }));
}

function multiplyNutrition(source, multiplier = 1) {
    const numericMultiplier = Number(multiplier);
    const safeMultiplier = Number.isFinite(numericMultiplier) ? numericMultiplier : 1;
    const base = cloneNutrition(source);

    return normalizeResolvedNutrition(Object.fromEntries(
        NUTRITION_FIELDS.map((field) => [field, base[field] * safeMultiplier])
    ));
}

function addNutritionDelta(source, delta = {}) {
    const base = cloneNutrition(source);
    const normalizedDelta = normalizeNutritionDelta(delta);

    return normalizeResolvedNutrition(Object.fromEntries(
        NUTRITION_FIELDS.map((field) => [field, base[field] + normalizedDelta[field]])
    ));
}

function clonePresetItem(item, lang) {
    return {
        name: resolveLocalizedValue(item?.name, lang) || 'Item',
        weight: String(item?.weight || '').trim()
    };
}

function getDefaultOptionIds(group = {}) {
    const options = Array.isArray(group.options) ? group.options : [];
    if (group.selectionType === 'multi') {
        return options
            .filter((option) => option?.default)
            .map((option) => String(option.id || '').trim())
            .filter(Boolean);
    }

    const explicitDefault = options.find((option) => option?.default);
    const fallback = explicitDefault || options[0];
    return fallback?.id ? [String(fallback.id).trim()] : [];
}

export function normalizeFoodPresetSelection(preset, selectedModifiers = {}) {
    const groups = Array.isArray(preset?.modifierGroups) ? preset.modifierGroups : [];

    return Object.fromEntries(groups.map((group) => {
        const groupId = String(group?.id || '').trim();
        const rawValue = selectedModifiers?.[groupId];
        const defaultIds = getDefaultOptionIds(group);

        if (group.selectionType === 'multi') {
            const nextIds = toIdArray(rawValue);
            return [groupId, nextIds.length > 0 ? nextIds : defaultIds];
        }

        const nextId = toSingleId(rawValue);
        return [groupId, nextId || defaultIds[0] || ''];
    }));
}

function getSelectedOptions(group, selection) {
    const options = Array.isArray(group?.options) ? group.options : [];
    if (group?.selectionType === 'multi') {
        const selectedIds = new Set(toIdArray(selection));
        return options.filter((option) => selectedIds.has(String(option?.id || '').trim()));
    }

    const selectedId = toSingleId(selection);
    return options.filter((option) => String(option?.id || '').trim() === selectedId);
}

function mergePresetItems(baseItems = [], extraItems = [], lang = 'en') {
    return [
        ...(Array.isArray(baseItems) ? baseItems.map((item) => clonePresetItem(item, lang)) : []),
        ...(Array.isArray(extraItems) ? extraItems.map((item) => clonePresetItem(item, lang)) : [])
    ];
}

export function resolveFoodPreset(preset, options = {}) {
    const lang = String(options.lang || 'en');
    const selectedModifiers = normalizeFoodPresetSelection(preset, options.selectedModifiers);
    const groups = Array.isArray(preset?.modifierGroups) ? preset.modifierGroups : [];

    let nutrition = cloneNutrition(preset?.nutrition || createEmptyNutrition());
    let extraItems = [];
    const appliedModifiers = [];
    const nameFragments = [];

    groups.forEach((group) => {
        const selectedOptions = getSelectedOptions(group, selectedModifiers[group.id]);

        selectedOptions.forEach((option) => {
            const effect = option?.effect || {};

            if (effect.nutritionMultiplier !== undefined) {
                nutrition = multiplyNutrition(nutrition, effect.nutritionMultiplier);
            }

            if (effect.nutritionDelta) {
                nutrition = addNutritionDelta(nutrition, effect.nutritionDelta);
            }

            const effectItems = Array.isArray(effect.items)
                ? effect.items
                : effect.item
                    ? [effect.item]
                    : [];

            if (effectItems.length > 0) {
                extraItems = [...extraItems, ...effectItems];
            }

            const label = resolveLocalizedValue(option?.label, lang) || option?.id || '';
            appliedModifiers.push({
                groupId: String(group?.id || '').trim(),
                optionId: String(option?.id || '').trim(),
                label,
                selectionType: group?.selectionType === 'multi' ? 'multi' : 'single'
            });

            if (option?.includeInName) {
                nameFragments.push(resolveLocalizedValue(option?.nameLabel || option?.label, lang));
            }
        });
    });

    const baseName = resolveLocalizedValue(preset?.name, lang) || 'Preset Meal';
    const modifierSuffix = nameFragments.filter(Boolean).join(', ');

    return {
        id: String(preset?.id || '').trim(),
        region: String(preset?.region || '').trim(),
        name: modifierSuffix ? `${baseName} (${modifierSuffix})` : baseName,
        suggestedMealType: String(preset?.suggestedMealType || 'snack'),
        nutrition: normalizeResolvedNutrition(nutrition),
        items: mergePresetItems(preset?.items, extraItems, lang),
        appliedModifiers,
        selectedModifiers
    };
}

export function createFoodPresetManualDraft(preset, options = {}) {
    const resolved = resolveFoodPreset(preset, options);

    return {
        name: resolved.name,
        type: resolved.suggestedMealType,
        nutri: cloneNutrition(resolved.nutrition),
        items: resolved.items.map((item) => ({
            name: item.name,
            weight: item.weight
        }))
    };
}

export function createFoodPresetModifierSummary(resolvedPreset = {}) {
    return Array.isArray(resolvedPreset.appliedModifiers)
        ? resolvedPreset.appliedModifiers.map((modifier) => modifier.label).filter(Boolean)
        : [];
}

export function getFoodPresetDisplayName(preset, lang = 'en') {
    return resolveLocalizedValue(preset?.name, lang) || String(preset?.id || 'Preset Meal');
}

export function getFoodPresetGroupLabel(group, lang = 'en') {
    return resolveLocalizedValue(group?.label, lang) || String(group?.id || 'Modifier');
}

export function getFoodPresetOptionLabel(option, lang = 'en') {
    return resolveLocalizedValue(option?.label, lang) || String(option?.id || 'Option');
}
