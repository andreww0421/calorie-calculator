import { getAppState } from '../state/app-state.js';
import { createFoodPresetPickerViewModel } from '../state/food-preset-selectors.js';
import { createButton, createElement, clearElement } from './dom-ui.js';
import { getTexts } from './shared-ui.js';

function renderModifierControl(group) {
    const field = createElement('div', {
        className: 'food-preset-modifier-group'
    });

    field.appendChild(createElement('div', {
        className: 'food-preset-modifier-label',
        text: group.label
    }));

    if (group.selectionType === 'multi') {
        const options = createElement('div', { className: 'food-preset-chip-list' });
        group.options.forEach((option) => {
            const label = createElement('label', { className: 'food-preset-chip' }, [
                createElement('input', {
                    attrs: {
                        type: 'checkbox',
                        value: option.id,
                        'data-group-id': group.id
                    }
                }),
                createElement('span', { text: option.label })
            ]);
            const checkbox = label.querySelector('input');
            if (checkbox) checkbox.checked = Boolean(option.selected);
            options.appendChild(label);
        });
        field.appendChild(options);
        return field;
    }

    const select = createElement('select', {
        attrs: {
            id: `food-preset-modifier-${group.id}`,
            'data-group-id': group.id
        }
    });
    group.options.forEach((option) => {
        const optionEl = createElement('option', {
            text: option.label,
            attrs: { value: option.id }
        });
        if (option.selected) optionEl.selected = true;
        select.appendChild(optionEl);
    });
    field.appendChild(select);
    return field;
}

export function readManualFoodPresetSelection() {
    const region = document.getElementById('food-preset-region')?.value || '';
    const presetId = document.getElementById('food-preset-select')?.value || '';
    const modifiers = {};

    document.querySelectorAll('#food-preset-modifiers [data-group-id]').forEach((input) => {
        const groupId = input.dataset.groupId;
        if (!groupId) return;

        if (input.type === 'checkbox') {
            modifiers[groupId] ||= [];
            if (input.checked) {
                modifiers[groupId].push(input.value);
            }
            return;
        }

        modifiers[groupId] = input.value;
    });

    return { region, presetId, modifiers };
}

export function applyFoodPresetToManualForm(draft) {
    if (!draft) return;

    const fieldMap = [
        ['manual-name', draft.name],
        ['manual-cal', draft.nutri?.calories],
        ['manual-pro', draft.nutri?.protein],
        ['manual-fat', draft.nutri?.fat],
        ['manual-carb', draft.nutri?.carbohydrate],
        ['manual-sugar', draft.nutri?.sugar],
        ['manual-sod', draft.nutri?.sodium],
        ['manual-sat', draft.nutri?.saturatedFat],
        ['manual-trans', draft.nutri?.transFat],
        ['manual-fiber', draft.nutri?.fiber]
    ];

    fieldMap.forEach(([id, value]) => {
        const input = document.getElementById(id);
        if (!input) return;
        if (value === undefined || value === null) {
            input.value = '';
            return;
        }

        if (typeof value === 'string') {
            input.value = value;
            return;
        }

        const numericValue = Number(value);
        input.value = Number.isInteger(numericValue)
            ? String(numericValue)
            : String(Math.round(numericValue * 10) / 10);
    });

    const typeSelect = document.getElementById('manual-type');
    if (typeSelect && draft.type) {
        const exists = [...typeSelect.options].some((option) => option.value === draft.type);
        if (exists) typeSelect.value = draft.type;
    }
}

export function renderManualFoodPresetPanel(options = {}) {
    const state = getAppState();
    const t = getTexts();
    const selection = options.selection || readManualFoodPresetSelection();
    const viewModel = createFoodPresetPickerViewModel({
        lang: state.curLang,
        region: options.region ?? selection.region,
        profileRegion: state.profile?.region || '',
        presetId: options.presetId ?? selection.presetId,
        selectedModifiers: options.modifiers ?? selection.modifiers
    });

    const container = document.getElementById('food-preset-panel');
    if (!container) return viewModel;

    clearElement(container);

    container.appendChild(createElement('div', { className: 'food-preset-header' }, [
        createElement('div', {
            className: 'food-preset-title',
            text: t.presetPanelTitle || 'Dining-out presets'
        }),
        createElement('div', {
            className: 'food-preset-hint',
            text: t.presetPanelHint || 'Use a local preset, then fine-tune the manual nutrition fields if needed.'
        })
    ]));

    const regionSelect = createElement('select', {
        attrs: { id: 'food-preset-region' }
    });
    viewModel.regions.forEach((region) => {
        const option = createElement('option', {
            text: region.label,
            attrs: { value: region.id }
        });
        if (region.id === viewModel.selectedRegion) option.selected = true;
        regionSelect.appendChild(option);
    });

    const presetSelect = createElement('select', {
        attrs: { id: 'food-preset-select' }
    });
    viewModel.presets.forEach((preset) => {
        const option = createElement('option', {
            text: preset.label,
            attrs: { value: preset.id }
        });
        if (preset.id === viewModel.selectedPresetId) option.selected = true;
        presetSelect.appendChild(option);
    });

    container.appendChild(createElement('div', { className: 'food-preset-grid' }, [
        createElement('label', { className: 'food-preset-field' }, [
            createElement('span', {
                className: 'food-preset-label',
                text: t.presetRegionLabel || 'Region'
            }),
            regionSelect
        ]),
        createElement('label', { className: 'food-preset-field' }, [
            createElement('span', {
                className: 'food-preset-label',
                text: t.presetFoodLabel || 'Preset meal'
            }),
            presetSelect
        ])
    ]));

    const modifiers = createElement('div', {
        attrs: { id: 'food-preset-modifiers' },
        className: 'food-preset-modifiers'
    });
    viewModel.modifierGroups.forEach((group) => {
        modifiers.appendChild(renderModifierControl(group));
    });
    container.appendChild(modifiers);

    if (viewModel.resolvedPreset) {
        const preview = viewModel.resolvedPreset;
        container.appendChild(createElement('div', { className: 'food-preset-preview' }, [
            createElement('strong', {
                text: preview.name
            }),
            createElement('span', {
                text: ` · ${preview.nutrition.calories} kcal`
            })
        ]));
    }

    container.appendChild(createButton(t.presetApplyButton || 'Apply preset to manual entry', null, {
        attrs: {
            id: 'btn-apply-food-preset',
            type: 'button'
        },
        className: 'btn-preset-apply'
    }));

    return viewModel;
}
