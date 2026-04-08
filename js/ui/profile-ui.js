import { createOnboardingConfig } from '../domain/profile-domain.js';
import { createButton, createElement, clearElement } from './dom-ui.js';
import { getGoalSummaryText } from './locale-ui.js';
import { profileUiCopyCatalog } from './profile-ui-copy.js';

function getProfileUiCopy(lang = 'en') {
    const locale = String(lang || 'en');
    const baseLang = locale.split('-')[0];
    return profileUiCopyCatalog[locale] || profileUiCopyCatalog[baseLang] || profileUiCopyCatalog.en;
}

function syncSelectOptions(select, options, selectedValue) {
    if (!select) return;

    const currentValue = selectedValue ?? select.value ?? '';
    clearElement(select);

    options.forEach(({ value, label }) => {
        const option = createElement('option', {
            text: label,
            attrs: { value }
        });
        if (value === currentValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    if (options.some((option) => option.value === currentValue)) {
        select.value = currentValue;
    }
}

export function syncProfilePreferenceInputs(lang = 'en', profile = {}) {
    const copy = getProfileUiCopy(lang);
    const regionSelect = document.getElementById('region');
    const regionRow = regionSelect?.closest('.settings-item');
    const regionLabels = regionRow ? [...regionRow.querySelectorAll('label')] : [];
    const regionLabel = regionLabels[0] || document.getElementById('lbl-region');
    const diningLabel = document.getElementById('lbl-dining-out-frequency');
    const diningSelect = document.getElementById('dining-out-frequency');

    regionLabels.slice(1).forEach((label) => label.remove());
    if (regionLabel && regionLabel.id !== 'lbl-region') {
        regionLabel.id = 'lbl-region';
    }

    if (regionLabel) regionLabel.innerText = copy.regionLabel;
    if (diningLabel) diningLabel.innerText = copy.diningOutFrequencyLabel;

    syncSelectOptions(
        regionSelect,
        Object.entries(copy.regionOptions).map(([value, label]) => ({ value, label })),
        regionSelect?.value || String(profile?.region || '').trim()
    );

    syncSelectOptions(
        diningSelect,
        ['daily', 'often', 'sometimes', 'rare'].map((value) => ({
            value,
            label: copy.diningOutOptions[value] || value
        })),
        diningSelect?.value || String(profile?.diningOutFrequency || 'sometimes').trim() || 'sometimes'
    );
}

export function renderOnboardingCard(profile = {}, lang = 'en') {
    const container = document.getElementById('onboarding-card');
    if (!container) return false;

    const config = createOnboardingConfig(profile, lang);
    const copy = getProfileUiCopy(lang);

    container.hidden = config.isComplete;
    container.dataset.region = config.region || '';
    container.dataset.diningOutFrequency = config.diningOutFrequency || '';
    if (config.isComplete) {
        clearElement(container);
        return false;
    }

    clearElement(container);
    container.className = 'quick-start-card onboarding-card';

    const missingLabels = config.missingFields
        .map((field) => copy.onboardingMissing[field])
        .filter(Boolean);

    const metaRow = createElement('div', { className: 'onboarding-meta' }, [
        createElement('span', {
            className: 'coach-stat-chip',
            text: `${copy.regionLabel}: ${copy.regionOptions[config.region] || copy.onboardingRegionValue}`
        }),
        createElement('span', {
            className: 'coach-stat-chip',
            text: `${copy.diningOutFrequencyLabel}: ${copy.diningOutOptions[config.diningOutFrequency] || config.diningOutFrequency}`
        }),
        createElement('span', {
            className: 'coach-stat-chip',
            text: `${copy.goalLabel || 'Goal'}: ${copy.goalTypes?.[config.goalType || 'lose'] || config.goalType || 'lose'}`
        })
    ]);

    const missingRow = missingLabels.length
        ? createElement('div', { className: 'onboarding-meta onboarding-meta--missing' }, missingLabels.map((label) => (
            createElement('span', {
                className: 'coach-stat-chip onboarding-missing-chip',
                text: label
            })
        )))
        : null;

    container.appendChild(createElement('div', { className: 'quick-start-eyebrow', text: copy.onboardingEyebrow }));
    container.appendChild(createElement('div', { className: 'quick-start-title', text: copy.onboardingTitle }));
    container.appendChild(createElement('div', { className: 'quick-start-copy', text: copy.onboardingBody }));
    container.appendChild(metaRow);
    if (missingRow) {
        container.appendChild(missingRow);
    }
    container.appendChild(createButton(copy.onboardingButton, null, {
        attrs: {
            id: 'btn-open-onboarding',
            type: 'button'
        },
        className: 'onboarding-cta'
    }));

    return true;
}

export function renderProfileGoalResult(plan, translations, goalUi) {
    if (!plan) return false;

    const tdeeEl = document.getElementById('tdee-val');
    const targetEl = document.getElementById('target-cal-val');
    const targetDisplayEl = document.getElementById('target-cal-display');
    const goalResult = document.getElementById('goal-result');
    const macroContainer = document.getElementById('macro-goals');

    if (tdeeEl) tdeeEl.innerText = String(plan.tdee || 0);
    if (targetEl) targetEl.innerText = String(plan.targetCalories || 0);
    if (targetDisplayEl) targetDisplayEl.innerText = String(plan.targetCalories || 0);
    if (goalResult) goalResult.style.display = 'block';

    if (!macroContainer) return true;

    const goals = plan.macroGoals || {};
    macroContainer.replaceChildren(
        (() => {
            const strong = document.createElement('strong');
            strong.textContent = translations.macroGoalTitle || 'Recommended macro targets';
            return strong;
        })(),
        document.createElement('br'),
        document.createTextNode(
            `${goalUi.goalSummaryLabel || 'Goal'}: ${getGoalSummaryText(plan.goalType || 'lose')} | ${goalUi.calorieTargetLabel || 'Calories'}: ${plan.targetCalories || 0} kcal`
        ),
        document.createElement('br'),
        document.createTextNode(
            `P ${translations.pro}: ${goals.protein}g | F ${translations.fat}: ${goals.fat}g | C ${translations.carb}: ${goals.carb}g`
        ),
        document.createElement('br'),
        document.createTextNode(
            `${translations.sugar}: ${goals.sugar}g | ${translations.sod.replace('(mg)', '')}: 2300mg | ${translations.sat}: ${goals.saturatedFat}g`
        )
    );

    return true;
}
