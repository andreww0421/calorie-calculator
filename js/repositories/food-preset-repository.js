import { FOOD_PRESET_SEEDS } from './food-preset-seed.js';

function cloneModifierOption(option = {}) {
    return {
        ...option,
        effect: option.effect
            ? {
                ...option.effect,
                nutritionDelta: option.effect.nutritionDelta
                    ? { ...option.effect.nutritionDelta }
                    : undefined,
                items: Array.isArray(option.effect.items)
                    ? option.effect.items.map((item) => ({ ...item }))
                    : undefined,
                item: option.effect.item
                    ? { ...option.effect.item }
                    : undefined
            }
            : undefined
    };
}

function clonePreset(preset = {}) {
    return {
        ...preset,
        nutrition: { ...(preset.nutrition || {}) },
        items: Array.isArray(preset.items) ? preset.items.map((item) => ({ ...item })) : [],
        modifierGroups: Array.isArray(preset.modifierGroups)
            ? preset.modifierGroups.map((group) => ({
                ...group,
                options: Array.isArray(group.options)
                    ? group.options.map(cloneModifierOption)
                    : []
            }))
            : []
    };
}

export function listFoodPresets() {
    return FOOD_PRESET_SEEDS.map(clonePreset);
}

export function findFoodPresetById(id) {
    const presetId = String(id || '').trim();
    const preset = FOOD_PRESET_SEEDS.find((candidate) => candidate.id === presetId);
    return preset ? clonePreset(preset) : null;
}

export function listFoodPresetRegions() {
    return [...new Set(FOOD_PRESET_SEEDS.map((preset) => String(preset.region || '').trim()).filter(Boolean))];
}
