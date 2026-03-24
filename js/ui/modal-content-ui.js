import { createElement } from './dom-ui.js';

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
