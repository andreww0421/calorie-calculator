import {
    targetCalories,
    currentMealMode,
    curTheme,
    setCurTheme,
    persistTheme
} from '../data.js';
import { i18n } from '../config.js';
import { dispatchAppAction } from '../state/app-actions.js';
import { createButton, createElement, clearElement } from './dom-ui.js';
import { getTexts, uiActions, toggleFabMenu } from './shared-ui.js';
import { updateChartTheme, updateMacroChartLanguage } from './charts-ui.js';
import { confirmFavoriteMeal } from './favorites-ui.js';
import { getDisplayDateLabel, getExtraUiText, getGoalUiText } from './locale-ui.js';
import { getMealPlan } from '../domain/nutrition-domain.js';

export function updateMealUI() {
    const t = getTexts();
    const m = t.meals || {};
    const mealPlan = getMealPlan(currentMealMode, m, targetCalories);
    const container = document.getElementById('meal-sections-container');
    const manualSelect = document.getElementById('manual-type');
    const modalBtns = document.getElementById('modal-meal-buttons');
    const favoriteMealBtns = document.getElementById('favorite-meal-buttons');
    if (!container || !manualSelect || !modalBtns || !favoriteMealBtns || mealPlan.length === 0) return;

    clearElement(container);
    clearElement(manualSelect);
    clearElement(modalBtns);
    clearElement(favoriteMealBtns);

    mealPlan.forEach(({ type, title, suggestedCalories }) => {
        const titleWrap = createElement('div');
        titleWrap.appendChild(createElement('span', {
            className: 'meal-title',
            text: title
        }));
        titleWrap.appendChild(createElement('span', {
            className: 'meal-goal',
            text: `(${t.suggest}: ${suggestedCalories})`
        }));

        const header = createElement('div', { className: 'meal-header' }, [
            titleWrap,
            createElement('div', {
                className: 'meal-progress',
                text: '0 kcal',
                attrs: { id: `prog-${type}` }
            })
        ]);

        const section = createElement('div', { className: 'meal-section' }, [
            header,
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
}

export function toggleTheme() {
    dispatchAppAction('SET_THEME', {
        theme: curTheme === 'light' ? 'dark' : 'light'
    });
}

export function setTheme(theme, options = {}) {
    const { persist = false } = options;
    setCurTheme(theme);
    if (persist) {
        persistTheme(theme);
    }
    document.documentElement.setAttribute('data-theme', theme);
    updateChartTheme(theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#121212' : '#f0f2f5');
    }
}

export function openLangModal() {
    const modal = document.getElementById('lang-modal');
    if (modal) modal.style.display = 'flex';
    toggleFabMenu();
}

export function setLang(lang) {
    const t = i18n[lang] || i18n['zh-TW'];
    const extra = getExtraUiText(lang);
    const goalUi = getGoalUiText(lang);
    document.title = extra.metaTitle || t.appTitle || 'Woof Cal';
    document.documentElement.lang = lang;
    document.documentElement.dir = extra.direction || 'ltr';

    const mapping = {
        'txt-date-label': t.dateLabel,
        'txt-total-intake': t.totalIntake,
        'txt-kcal-unit': 'kcal',
        'txt-daily-summary-hint': extra.dailySummaryHint,
        'lbl-pro': t.pro,
        'lbl-fat': t.fat,
        'lbl-carb': t.carb,
        'lbl-sugar': t.sugar,
        'lbl-sod': t.sod,
        'lbl-sat': t.sat,
        'lbl-trans': t.trans,
        'lbl-fiber': t.fiber || 'Fiber',
        'lbl-water': t.water,
        'txt-chart-title': t.chartTitle,
        'txt-ai-title': t.aiTitle,
        'btn-take-photo': t.btnPhoto,
        'txt-analyze-btn': t.btnAnalyze,
        'txt-ai-loading': t.aiLoading,
        'txt-record-title': t.txtRecordTitle || t.recordTitle,
        'txt-manual-label': t.txtManualLabel || t.manualLabel,
        'btn-add-record': t.btnAddRecord || t.btnAdd,
        'btn-fav-save': t.btnFavSave,
        'btn-fav-load': t.btnFavLoad,
        'btn-fav-ai': t.btnFavAi,
        'txt-settings-title': t.settingsTitle,
        'lbl-gender': t.gender,
        'opt-male': t.male,
        'opt-female': t.female,
        'lbl-age': t.age,
        'lbl-height': t.height,
        'lbl-weight': t.txtWeightSettingsTitle || t.weight,
        'lbl-activity': t.activity,
        'opt-act-1': t.act1,
        'opt-act-2': t.act2,
        'opt-act-3': t.act3,
        'opt-act-4': t.act4,
        'lbl-goal-type': goalUi.goalTypeLabel,
        'opt-goal-lose': goalUi.goalTypes.lose,
        'opt-goal-maintain': goalUi.goalTypes.maintain,
        'opt-goal-gain': goalUi.goalTypes.gain,
        'lbl-meal-mode': t.mealMode,
        'opt-mode-4': t.mode4,
        'opt-mode-3': t.mode3,
        'opt-mode-2': t.mode2,
        'opt-mode-1': t.mode1,
        'btn-calc': t.btnCalc,
        'txt-res-tdee': t.resTdee,
        'txt-res-target': t.resTarget,
        'txt-modal-title': t.modalTitle,
        'txt-modal-ask': t.modalAsk,
        'btn-cancel': t.btnCancel,
        'txt-fav-title': t.favTitle,
        'btn-fav-close': t.btnClose,
        'txt-fav-meal-title': t.favTitle,
        'txt-fav-meal-ask': t.favTitle,
        'btn-fav-meal-close': t.btnCancel,
        'menu-import-setting': t.menuImport,
        'menu-export-setting': t.menuExport,
        'menu-theme-setting': t.menuTheme,
        'menu-lang-setting': t.menuLang,
        'txt-lang-title': t.langTitle,
        'btn-lang-cancel': t.langCancel,
        'txt-weight-title': t.weightTitle,
        'btn-save-weight': t.btnSaveWeight,
        'txt-weight-chart-title': t.weightChartTitle,
        'txt-text-ai-label': t.textAiLabel,
        'txt-app-settings-title': t.appSettingsTitle,
        'nav-daily': t.navDaily,
        'nav-dashboard': t.navDashboard,
        'nav-settings': t.navSettings,
        'txt-target-cal-display-label': t.txtTargetCalDisplayUnit,
        'txt-tdee-unit': t.txtTdeeUnit,
        'txt-cal-trend-title': t.chartCalTrend,
        'txt-protein-trend-title': t.chartProteinTrend,
        'btn-chart-7d': t.chart7d,
        'btn-chart-30d': t.chart30d,
        'txt-detail-title': t.detailTitle,
        'btn-detail-close': t.btnDetailClose,
        'txt-empty-eyebrow': extra.emptyStateEyebrow,
        'txt-empty-title': extra.emptyStateTitle,
        'txt-empty-copy': extra.emptyStateBody,
        'txt-ai-guide-eyebrow': extra.aiGuideEyebrow,
        'txt-ai-guide-title': extra.aiGuideTitle,
        'txt-ai-guide-copy': extra.aiGuideBody,
        'txt-ai-guide-tip-1': extra.aiGuideTip1,
        'txt-ai-guide-tip-2': extra.aiGuideTip2,
        'txt-ai-guide-tip-3': extra.aiGuideTip3
    };

    Object.entries(mapping).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el && value !== undefined) el.innerText = value;
    });

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

    const placeholders = {
        'manual-name': t.phFoodName || 'Food Name (Required)',
        'manual-cal': t.phFoodCal || 'Calories (kcal)',
        'ai-desc': t.aiDescPlaceholder,
        'daily-weight-input': t.weightInputPlaceholder,
        'ai-text-desc': t.textAiPlaceholder,
        'manual-pro': t.phPro,
        'manual-fat': t.phFat,
        'manual-carb': t.phCarb,
        'manual-sugar': t.phSugar,
        'manual-sod': t.phSod,
        'manual-sat': t.phSat,
        'manual-trans': t.phTrans,
        'manual-fiber': t.phFiber || t.fiber || 'Fiber'
    };

    Object.entries(placeholders).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el && value) el.placeholder = value;
    });
    updateMacroChartLanguage(t);
}
