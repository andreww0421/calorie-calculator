import { createElement } from './dom-ui.js';
import { buildNutritionDetailModel } from '../domain/nutrition-presentation-domain.js';
import { getNutritionUiText } from './locale-ui.js';

function createNutritionItem(value, label) {
    return createElement('div', { className: 'ai-nutri-item' }, [
        createElement('span', { className: 'ai-n-val', text: value }),
        createElement('span', { className: 'ai-n-lbl', text: label })
    ]);
}

export function formatDisplayWeight(weight, emptyText = '--') {
    const raw = String(weight ?? '').trim();
    if (!raw) return emptyText;
    return /^-?\d+(?:\.\d+)?$/.test(raw) ? `${raw} g` : raw;
}

function getNutritionFieldLabel(field, translations = {}) {
    const labelMap = {
        calories: translations.cal || 'Calories',
        protein: translations.pro || 'Protein',
        fat: translations.fat || 'Fat',
        carbohydrate: translations.carb || 'Carb',
        sugar: translations.sugar || 'Sugar',
        sodium: translations.sod || 'Sodium',
        saturatedFat: translations.sat || 'Saturated Fat',
        transFat: translations.trans || 'Trans Fat',
        fiber: translations.fiber || 'Fiber'
    };

    return labelMap[field] || field;
}

function formatNutritionMetricValue(metric, fallback = '--') {
    if (!metric) return fallback;
    const value = metric.value ?? 0;
    const unit = metric.unit || '';
    if (value === undefined || value === null || value === '') return fallback;
    return `${value}${unit ? ` ${unit}` : ''}`;
}

function createNutritionMetricGrid(metrics, translations, {
    fallback = '--',
    itemClassName = ''
} = {}) {
    const grid = createElement('div', { className: 'ai-nutri-grid' });
    metrics.forEach((metric) => {
        const item = createNutritionItem(
            formatNutritionMetricValue(metric, fallback),
            getNutritionFieldLabel(metric.field, translations)
        );
        if (itemClassName) item.classList.add(itemClassName);
        grid.appendChild(item);
    });
    return grid;
}

export function createNutritionGrid(nutri, translations, options = {}) {
    const { fallback = '--', showUnits = true, caloriePrefix = 'Cal ' } = options;
    const valueOrFallback = (value) => (value !== undefined && value !== null ? value : fallback);
    const grid = createElement('div', { className: 'ai-nutri-grid' });

    [
        [`${caloriePrefix}${valueOrFallback(nutri.calories)}`, translations.cal],
        [`${valueOrFallback(nutri.protein)}${showUnits ? 'g' : ''}`, translations.pro],
        [`${valueOrFallback(nutri.fat)}${showUnits ? 'g' : ''}`, translations.fat],
        [`${valueOrFallback(nutri.carbohydrate)}${showUnits ? 'g' : ''}`, translations.carb],
        [`${valueOrFallback(nutri.sugar)}${showUnits ? 'g' : ''}`, translations.sugar],
        [`${valueOrFallback(nutri.sodium)}${showUnits ? 'mg' : ''}`, translations.sod],
        [`${valueOrFallback(nutri.saturatedFat)}${showUnits ? 'g' : ''}`, translations.sat],
        [`${valueOrFallback(nutri.transFat)}${showUnits ? 'g' : ''}`, translations.trans],
        [`${valueOrFallback(nutri.fiber)}${showUnits ? 'g' : ''}`, translations.fiber || 'Fiber']
    ].forEach(([value, label]) => {
        grid.appendChild(createNutritionItem(value, label));
    });

    return grid;
}

export function createDetailedNutritionPanel(nutri, translations, lang, options = {}) {
    const { fallback = '--' } = options;
    const model = buildNutritionDetailModel(nutri);
    const copy = getNutritionUiText(lang).detail;
    const wrapper = createElement('div', { className: 'nutrition-panel' });

    wrapper.appendChild(createElement('div', { className: 'nutrition-panel-header' }, [
        createElement('div', {
            className: 'nutrition-panel-title',
            text: copy.overviewTitle
        }),
        createElement('div', {
            className: 'nutrition-panel-copy',
            text: copy.overviewSummary
        })
    ]));

    const highlights = createNutritionMetricGrid(model.highlights, translations, {
        fallback,
        itemClassName: 'ai-nutri-item--primary'
    });
    highlights.classList.add('ai-nutri-grid--primary');
    wrapper.appendChild(highlights);

    model.sections.forEach((section) => {
        const sectionCopy = copy.sections?.[section.id];
        const sectionWrapper = createElement('section', {
            className: 'nutrition-panel-section'
        }, [
            createElement('div', { className: 'nutrition-panel-section-head' }, [
                createElement('div', {
                    className: 'nutrition-panel-section-title',
                    text: sectionCopy?.title || section.id
                }),
                createElement('div', {
                    className: 'nutrition-panel-section-copy',
                    text: sectionCopy?.summary || ''
                })
            ]),
            createNutritionMetricGrid(section.items, translations, { fallback })
        ]);
        wrapper.appendChild(sectionWrapper);
    });

    return wrapper;
}

export function createItemSummaryList(items, emptyText = '--') {
    const wrapper = createElement('div', { style: { marginTop: '8px' } });
    if (!Array.isArray(items) || items.length === 0) {
        wrapper.appendChild(createElement('p', {
            text: emptyText,
            style: { opacity: '0.5', textAlign: 'center' }
        }));
        return wrapper;
    }

    items.forEach((item) => {
        wrapper.appendChild(createElement('div', {
            style: {
                padding: '4px 0',
                display: 'flex',
                justifyContent: 'space-between'
            }
        }, [
            createElement('span', { text: item?.name || emptyText }),
            createElement('span', {
                text: formatDisplayWeight(item?.weight, emptyText),
                style: { opacity: '0.7' }
            })
        ]));
    });

    return wrapper;
}

export function createScoreBadge(score, label) {
    const numericScore = Number(score) || 0;
    let color = '#e17055';
    if (numericScore >= 7) color = '#2ecc71';
    else if (numericScore >= 4) color = '#fdcb6e';

    return createElement('div', {
        style: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '15px'
        }
    }, [
        createElement('span', {
            text: `${numericScore}/10`,
            style: {
                fontSize: '1.5em',
                fontWeight: 'bold',
                color
            }
        }),
        createElement('span', {
            text: label || 'Health Score',
            style: { opacity: '0.8' }
        })
    ]);
}
