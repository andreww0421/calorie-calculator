import {
    createFoodPresetManualDraft,
    getFoodPresetDisplayName,
    getFoodPresetGroupLabel,
    getFoodPresetOptionLabel,
    normalizeFoodPresetSelection,
    resolveFoodPreset
} from '../domain/food-preset-domain.js';
import { getDefaultProfileRegion } from '../domain/profile-domain.js';
import { findFoodPresetById, listFoodPresetRegions, listFoodPresets } from '../repositories/food-preset-repository.js';

const REGION_LABELS = Object.freeze({
    taiwan: {
        'zh-TW': '台灣',
        en: 'Taiwan'
    },
    'hong-kong': {
        'zh-TW': '香港',
        en: 'Hong Kong'
    },
    singapore: {
        'zh-TW': '新加坡',
        en: 'Singapore'
    }
});

function getBaseLang(lang = 'en') {
    return String(lang || 'en').split('-')[0];
}

function localizeRegionLabel(region, lang = 'en') {
    const copy = REGION_LABELS[region] || {};
    return copy[lang] || copy[getBaseLang(lang)] || copy.en || region;
}

export function getDefaultFoodPresetRegion(lang = 'zh-TW') {
    return getDefaultProfileRegion(lang);
}

export function createFoodPresetRegionOptions(lang = 'en') {
    return listFoodPresetRegions().map((region) => ({
        id: region,
        label: localizeRegionLabel(region, lang)
    }));
}

export function listFoodPresetsByRegion(region = '', lang = 'en') {
    const resolvedRegion = String(region || '').trim();
    return listFoodPresets()
        .filter((preset) => !resolvedRegion || preset.region === resolvedRegion)
        .map((preset) => ({
            id: preset.id,
            region: preset.region,
            label: getFoodPresetDisplayName(preset, lang),
            suggestedMealType: preset.suggestedMealType
        }));
}

export function createFoodPresetPickerViewModel({
    lang = 'en',
    region = '',
    profileRegion = '',
    presetId = '',
    selectedModifiers = {}
} = {}) {
    const selectedRegion = region || String(profileRegion || '').trim() || getDefaultFoodPresetRegion(lang);
    const presets = listFoodPresetsByRegion(selectedRegion, lang);
    const selectedPresetId = presetId && presets.some((preset) => preset.id === presetId)
        ? presetId
        : presets[0]?.id || '';
    const preset = findFoodPresetById(selectedPresetId);
    const normalizedSelection = preset
        ? normalizeFoodPresetSelection(preset, selectedModifiers)
        : {};
    const resolvedPreset = preset
        ? resolveFoodPreset(preset, {
            lang,
            selectedModifiers: normalizedSelection
        })
        : null;

    return {
        regions: createFoodPresetRegionOptions(lang),
        selectedRegion,
        presets,
        selectedPresetId,
        modifierGroups: Array.isArray(preset?.modifierGroups)
            ? preset.modifierGroups.map((group) => ({
                id: group.id,
                label: getFoodPresetGroupLabel(group, lang),
                selectionType: group.selectionType === 'multi' ? 'multi' : 'single',
                selectedValue: normalizedSelection[group.id] ?? (group.selectionType === 'multi' ? [] : ''),
                options: (group.options || []).map((option) => ({
                    id: option.id,
                    label: getFoodPresetOptionLabel(option, lang),
                    selected: group.selectionType === 'multi'
                        ? (normalizedSelection[group.id] || []).includes(option.id)
                        : normalizedSelection[group.id] === option.id
                }))
            }))
            : [],
        resolvedPreset
    };
}

export function createFoodPresetManualDraftViewModel(options = {}) {
    const viewModel = createFoodPresetPickerViewModel(options);
    return viewModel.resolvedPreset
        ? createFoodPresetManualDraft(findFoodPresetById(viewModel.selectedPresetId), {
            lang: options.lang,
            selectedModifiers: options.selectedModifiers
        })
        : null;
}
