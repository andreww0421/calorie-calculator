import { getAppState } from '../state/app-state.js';
import { createFoodPresetPickerViewModel } from '../state/food-preset-selectors.js';
import { createButton, createElement, clearElement } from './dom-ui.js';
import { getTexts } from './shared-ui.js';
import { getHomeUiCopy } from '../locales/home-ui-copy.js';

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
    const container = document.getElementById('food-preset-panel');
    const region = document.getElementById('food-preset-region')?.value
        || container?.dataset.selectedRegion
        || '';
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
    const homeCopy = getHomeUiCopy(state.curLang);
    const surface = options.surface || 'home';
    const actionMode = options.actionMode || (surface === 'home' ? 'quick-add' : 'manual-fill');
    const showRegionSelect = options.showRegionSelect ?? (surface !== 'home');
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
    container.dataset.selectedRegion = viewModel.selectedRegion || '';
    container.dataset.surface = surface;
    container.dataset.actionMode = actionMode;
    container.classList.toggle('food-preset-panel--simple', surface === 'home');

    container.appendChild(createElement('div', { className: 'food-preset-header' }, [
        createElement('div', {
            className: 'food-preset-title',
            text: surface === 'home'
                ? (homeCopy.commonFoodsTitle || t.presetPanelTitle || 'Common foods')
                : (t.presetPanelTitle || 'Dining-out presets')
        }),
        createElement('div', {
            className: 'food-preset-hint',
            text: surface === 'home'
                ? (homeCopy.commonFoodsHint || t.presetPanelHint || 'Choose a familiar food and add it quickly.')
                : (t.presetPanelHint || 'Use a local preset, then fine-tune the manual nutrition fields if needed.')
        })
    ]));

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

    const fieldChildren = [];

    if (showRegionSelect) {
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

        fieldChildren.push(createElement('label', { className: 'food-preset-field' }, [
            createElement('span', {
                className: 'food-preset-label',
                text: t.presetRegionLabel || 'Region'
            }),
            regionSelect
        ]));
    }

    fieldChildren.push(createElement('label', { className: 'food-preset-field' }, [
            createElement('span', {
                className: 'food-preset-label',
                text: surface === 'home'
                    ? (homeCopy.heroActionCommonFoods || t.presetFoodLabel || 'Common foods')
                    : (t.presetFoodLabel || 'Preset meal')
            }),
            presetSelect
    ]));

    container.appendChild(createElement('div', {
        className: `food-preset-grid${showRegionSelect ? '' : ' food-preset-grid--single'}`
    }, fieldChildren));

    if (!showRegionSelect && viewModel.selectedRegion) {
        container.appendChild(createElement('div', { className: 'food-preset-meta' }, [
            createElement('span', {
                className: 'food-preset-region-chip',
                text: viewModel.regions.find((entry) => entry.id === viewModel.selectedRegion)?.label || viewModel.selectedRegion
            }),
            createElement('span', {
                className: 'food-preset-meta-copy',
                attrs: { id: 'food-preset-meta-copy' },
                text: homeCopy.commonFoodsMeta?.(
                    viewModel.regions.find((entry) => entry.id === viewModel.selectedRegion)?.label || viewModel.selectedRegion
                ) || ''
            })
        ]));
    }

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

    const buttonId = actionMode === 'quick-add' ? 'btn-quick-add-food-preset' : 'btn-apply-food-preset';
    const buttonLabel = actionMode === 'quick-add'
        ? (homeCopy.commonFoodsButton || 'Add this food to today')
        : (t.presetApplyButton || 'Apply preset to manual entry');

    container.appendChild(createButton(buttonLabel, null, {
        attrs: {
            id: buttonId,
            type: 'button'
        },
        className: 'btn-preset-apply'
    }));

    if (surface === 'home') {
        container.appendChild(createButton(
            homeCopy.commonFoodsAdvancedButton || t.presetApplyButton || 'Use this in advanced manual entry',
            null,
            {
                attrs: {
                    id: 'btn-preset-advanced-fill',
                    type: 'button'
                },
                className: 'food-preset-secondary-btn'
            }
        ));
    }

    return viewModel;
}
