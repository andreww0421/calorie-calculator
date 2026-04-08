import { getLocaleTranslations } from '../locales/index.js';
import { dispatchAppAction } from '../state/app-actions.js';
import { getAppState } from '../state/app-state.js';
import { createButton, createElement, clearElement } from './dom-ui.js';
import { getTexts, uiActions, toggleFabMenu } from './shared-ui.js';
import { renderManualFoodPresetPanel } from './food-preset-ui.js';
import { updateChartTheme, updateMacroChartLanguage } from './charts-ui.js';
import { confirmFavoriteMeal } from './favorites-ui.js';
import { getDisplayDateLabel, getExtraUiText, getGoalUiText } from './locale-ui.js';
import { getMealPlan } from '../domain/nutrition-domain.js';

const TEXT_BINDINGS = [
    ['txt-date-label', ({ t }) => t.dateLabel],
    ['lbl-pro', ({ t }) => t.pro],
    ['lbl-fat', ({ t }) => t.fat],
    ['lbl-carb', ({ t }) => t.carb],
    ['lbl-sugar', ({ t }) => t.sugar],
    ['lbl-sod', ({ t }) => t.sod],
    ['lbl-sat', ({ t }) => t.sat],
    ['lbl-trans', ({ t }) => t.trans],
    ['lbl-fiber', ({ t }) => t.fiber || 'Fiber'],
    ['lbl-water', ({ t }) => t.water],
    ['txt-chart-title', ({ t }) => t.chartTitle],
    ['txt-ai-title', ({ t }) => t.aiTitle],
    ['btn-take-photo', ({ t }) => t.btnPhoto],
    ['txt-analyze-btn', ({ t }) => t.btnAnalyze],
    ['txt-ai-loading', ({ t }) => t.aiLoading],
    ['txt-record-title', ({ t }) => t.txtRecordTitle || t.recordTitle],
    ['txt-manual-label', ({ t }) => t.txtManualLabel || t.manualLabel],
    ['btn-add-record', ({ t }) => t.btnAddRecord || t.btnAdd],
    ['btn-fav-save', ({ t }) => t.btnFavSave],
    ['btn-fav-load', ({ t }) => t.btnFavLoad],
    ['btn-fav-ai', ({ t }) => t.btnFavAi],
    ['txt-settings-title', ({ t }) => t.settingsTitle],
    ['lbl-gender', ({ t }) => t.gender],
    ['opt-male', ({ t }) => t.male],
    ['opt-female', ({ t }) => t.female],
    ['lbl-age', ({ t }) => t.age],
    ['lbl-height', ({ t }) => t.height],
    ['lbl-weight', ({ t }) => t.txtWeightSettingsTitle || t.weight],
    ['lbl-activity', ({ t }) => t.activity],
    ['opt-act-1', ({ t }) => t.act1],
    ['opt-act-2', ({ t }) => t.act2],
    ['opt-act-3', ({ t }) => t.act3],
    ['opt-act-4', ({ t }) => t.act4],
    ['lbl-goal-type', ({ goalUi }) => goalUi.goalTypeLabel],
    ['opt-goal-lose', ({ goalUi }) => goalUi.goalTypes.lose],
    ['opt-goal-maintain', ({ goalUi }) => goalUi.goalTypes.maintain],
    ['opt-goal-gain', ({ goalUi }) => goalUi.goalTypes.gain],
    ['lbl-meal-mode', ({ t }) => t.mealMode],
    ['opt-mode-4', ({ t }) => t.mode4],
    ['opt-mode-3', ({ t }) => t.mode3],
    ['opt-mode-2', ({ t }) => t.mode2],
    ['opt-mode-1', ({ t }) => t.mode1],
    ['btn-calc', ({ t }) => t.btnCalc],
    ['txt-res-tdee', ({ t }) => t.resTdee],
    ['txt-res-target', ({ t }) => t.resTarget],
    ['txt-modal-title', ({ t }) => t.modalTitle],
    ['txt-modal-ask', ({ t }) => t.modalAsk],
    ['btn-cancel', ({ t }) => t.btnCancel],
    ['txt-fav-title', ({ t }) => t.favTitle],
    ['btn-fav-close', ({ t }) => t.btnClose],
    ['txt-fav-meal-title', ({ t }) => t.favTitle],
    ['txt-fav-meal-ask', ({ t }) => t.favTitle],
    ['btn-fav-meal-close', ({ t }) => t.btnCancel],
    ['menu-import-setting', ({ t }) => t.menuImport],
    ['menu-export-setting', ({ t }) => t.menuExport],
    ['menu-theme-setting', ({ t }) => t.menuTheme],
    ['menu-lang-setting', ({ t }) => t.menuLang],
    ['txt-lang-title', ({ t }) => t.langTitle],
    ['btn-lang-cancel', ({ t }) => t.langCancel],
    ['txt-weight-title', ({ t }) => t.weightTitle],
    ['btn-save-weight', ({ t }) => t.btnSaveWeight],
    ['txt-weight-chart-title', ({ t }) => t.weightChartTitle],
    ['txt-text-ai-label', ({ t }) => t.textAiLabel],
    ['txt-app-settings-title', ({ t }) => t.appSettingsTitle],
    ['nav-daily', ({ t }) => t.navDaily],
    ['nav-dashboard', ({ t }) => t.navDashboard],
    ['nav-settings', ({ t }) => t.navSettings],
    ['txt-tdee-unit', ({ t }) => t.txtTdeeUnit],
    ['txt-cal-trend-title', ({ t }) => t.chartCalTrend],
    ['txt-protein-trend-title', ({ t }) => t.chartProteinTrend],
    ['btn-chart-7d', ({ t }) => t.chart7d],
    ['btn-chart-30d', ({ t }) => t.chart30d],
    ['txt-detail-title', ({ t }) => t.detailTitle],
    ['btn-detail-close', ({ t }) => t.btnDetailClose],
    ['txt-empty-eyebrow', ({ extra }) => extra.emptyStateEyebrow],
    ['txt-empty-title', ({ extra }) => extra.emptyStateTitle],
    ['txt-empty-copy', ({ extra }) => extra.emptyStateBody],
    ['txt-ai-guide-eyebrow', ({ extra }) => extra.aiGuideEyebrow],
    ['txt-ai-guide-title', ({ extra }) => extra.aiGuideTitle],
    ['txt-ai-guide-copy', ({ extra }) => extra.aiGuideBody],
    ['txt-ai-guide-tip-1', ({ extra }) => extra.aiGuideTip1],
    ['txt-ai-guide-tip-2', ({ extra }) => extra.aiGuideTip2],
    ['txt-ai-guide-tip-3', ({ extra }) => extra.aiGuideTip3]
];

const PLACEHOLDER_BINDINGS = [
    ['manual-name', ({ t }) => t.phFoodName || 'Food Name (Required)'],
    ['manual-cal', ({ t }) => t.phFoodCal || 'Calories (kcal)'],
    ['ai-desc', ({ t }) => t.aiDescPlaceholder],
    ['daily-weight-input', ({ t }) => t.weightInputPlaceholder],
    ['ai-text-desc', ({ t }) => t.textAiPlaceholder],
    ['manual-pro', ({ t }) => t.phPro],
    ['manual-fat', ({ t }) => t.phFat],
    ['manual-carb', ({ t }) => t.phCarb],
    ['manual-sugar', ({ t }) => t.phSugar],
    ['manual-sod', ({ t }) => t.phSod],
    ['manual-sat', ({ t }) => t.phSat],
    ['manual-trans', ({ t }) => t.phTrans],
    ['manual-fiber', ({ t }) => t.phFiber || t.fiber || 'Fiber']
];

function applyTextBindings(bindings, context) {
    bindings.forEach(([id, resolver]) => {
        const el = document.getElementById(id);
        const value = resolver(context);
        if (el && value !== undefined) {
            el.innerText = value;
        }
    });
}

function applyPlaceholderBindings(bindings, context) {
    bindings.forEach(([id, resolver]) => {
        const el = document.getElementById(id);
        const value = resolver(context);
        if (el && value) {
            el.placeholder = value;
        }
    });
}

export function updateMealUI() {
    const state = getAppState();
    const t = getTexts();
    const m = t.meals || {};
    const mealPlan = getMealPlan(state.currentMealMode, m, state.targetCalories);
    const container = document.getElementById('meal-sections-container');
    const manualSelect = document.getElementById('manual-type');
    const modalBtns = document.getElementById('modal-meal-buttons');
    const favoriteMealBtns = document.getElementById('favorite-meal-buttons');
    if (!container || !manualSelect || !modalBtns || !favoriteMealBtns || mealPlan.length === 0) return;

    clearElement(container);
    clearElement(manualSelect);
    clearElement(modalBtns);
    clearElement(favoriteMealBtns);

    const MEAL_ICONS = { breakfast: '\u2600', lunch: '\uD83C\uDF1E', dinner: '\uD83C\uDF19', snack: '\u2B50' };

    mealPlan.forEach(({ type, title, suggestedCalories }) => {
        const icon = MEAL_ICONS[type] || '\uD83C\uDF7D';

        const missionHeader = createElement('div', { className: 'mission-header' }, [
            createElement('span', { className: 'mission-icon', text: icon }),
            createElement('div', { className: 'mission-title-wrap' }, [
                createElement('span', { className: 'mission-title', text: title }),
                createElement('span', { className: 'mission-goal', text: `${suggestedCalories} kcal` })
            ]),
            createElement('div', {
                className: 'mission-kcal',
                text: '0 kcal',
                attrs: { id: `prog-${type}` }
            })
        ]);

        const progressTrack = createElement('div', { className: 'mission-progress-track' }, [
            createElement('div', { className: 'mission-progress-fill', attrs: { id: `prog-fill-${type}` } })
        ]);

        const section = createElement('div', {
            className: 'mission-card mission-card--empty',
            attrs: { 'data-meal-type': type }
        }, [
            missionHeader,
            progressTrack,
            createElement('ul', { className: 'meal-list', attrs: { id: `list-${type}` } })
        ]);
        container.appendChild(section);

        manualSelect.appendChild(createElement('option', {
            text: title,
            attrs: { value: type }
        }));

        modalBtns.appendChild(createButton(title, () => {
            uiActions.confirmAddFood?.(type);
        }, { className: `meal-btn ${type}` }));

        favoriteMealBtns.appendChild(createButton(title, () => {
            confirmFavoriteMeal(type);
        }, { className: `meal-btn ${type}` }));
    });

    renderManualFoodPresetPanel({
        surface: 'modal',
        actionMode: 'quick-add',
        showRegionSelect: false,
        showSecondaryAction: true,
        showRegionMeta: false
    });
}

export function toggleTheme() {
    const { curTheme } = getAppState();
    dispatchAppAction('SET_THEME', {
        theme: curTheme === 'light' ? 'dark' : 'light'
    });
}

export function setTheme(theme, options = {}) {
    const { persist = false } = options;
    if (persist) {
        dispatchAppAction('SET_THEME', { theme });
        return;
    }
    document.documentElement.setAttribute('data-theme', theme);
    updateChartTheme(theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#0F1117' : '#FAFBF8');
    }
}

export function openLangModal() {
    const modal = document.getElementById('lang-modal');
    if (modal) modal.style.display = 'flex';
    toggleFabMenu();
}

export function setLang(lang) {
    const t = getLocaleTranslations(lang);
    const extra = getExtraUiText(lang);
    const goalUi = getGoalUiText(lang);
    const context = { t, extra, goalUi };
    document.title = extra.metaTitle || t.appTitle || 'Woof Cal';
    document.documentElement.lang = lang;
    document.documentElement.dir = extra.direction || 'ltr';

    applyTextBindings(TEXT_BINDINGS, context);

    const displayDateText = document.getElementById('display-date-text');
    const currentDateValue = document.getElementById('current-date')?.value;
    if (displayDateText) {
        displayDateText.innerText = getDisplayDateLabel(currentDateValue, lang);
    }

    const dailySummaryStatus = document.getElementById('daily-summary-status');
    if (dailySummaryStatus && !dailySummaryStatus.dataset.dynamic) {
        dailySummaryStatus.innerText = extra.dailySummaryEmpty;
    }

    const descriptionText = extra.metaDescription;
    [
        ['meta[name="description"]', descriptionText],
        ['meta[property="og:title"]', extra.metaOgTitle || document.title],
        ['meta[property="og:description"]', descriptionText],
        ['meta[name="twitter:title"]', extra.metaTitle || document.title],
        ['meta[name="twitter:description"]', descriptionText]
    ].forEach(([selector, value]) => {
        const meta = document.querySelector(selector);
        if (meta && value) meta.setAttribute('content', value);
    });

    const navAiBadge = document.querySelector('.nav-item.nav-ai .ai-badge');
    if (navAiBadge) navAiBadge.innerText = t.navAi || 'AI';

    applyPlaceholderBindings(PLACEHOLDER_BINDINGS, context);
    updateMacroChartLanguage(t);
}
