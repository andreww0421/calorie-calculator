import { createDailyViewModel, getAppState } from '../state/app-state.js';
import {
    createDashboardNutritionFocusViewModel,
    createHomeCompanionViewModel,
    createMealRhythmViewModel
} from '../state/app-selectors.js';
import { createPetViewModel } from '../state/pet-selectors.js';
import { trackRhythmSummaryViewed } from '../analytics/product-events.js';
import { createElement, clearElement } from './dom-ui.js';
import { getTexts, uiActions } from './shared-ui.js';
import { executeTurnstile, initializeTurnstileWidget } from '../platform.js';
import { showDetailModal } from './detail-ui.js';
import {
    buildHomeCompanionContent,
    buildCoachContent,
    buildMealRhythmContent,
    buildNutritionFocusContent,
    formatNutritionInline,
    getExtraUiText
} from './locale-ui.js';
import { buildDailyCoaching } from '../domain/nutrition-domain.js';
import {
    dashboardChartRange,
    ensureDashboardChartsReady,
    initCharts,
    macroChart,
    proteinTrendChart,
    calTrendChart,
    setDashboardChartRange,
    updateChartTheme,
    updateCharts,
    updateMacroChartLanguage,
    updateTrendCharts,
    updateWeightChart,
    weightChart,
    weeklyChart
} from './dashboard-charts-ui.js';
import {
    petInteraction,
    petTimeout,
    showEatingAnimation,
    updatePetStatus
} from './pet-ui.js';
import { openDailySummaryDetails, updateDailySummaryCard } from './daily-summary-ui.js';

function roundValue(value, digits = 1) {
    const factor = 10 ** digits;
    return Math.round((Number(value) || 0) * factor) / factor;
}

function createEmptyMealRow(title, body) {
    const wrapper = createElement('div', {
        className: 'meal-empty-card'
    }, [
        createElement('div', {
            className: 'meal-empty-title',
            text: title
        }),
        createElement('div', {
            className: 'meal-empty-copy',
            text: body
        })
    ]);

    const item = document.createElement('li');
    item.className = 'meal-empty-row';
    item.appendChild(wrapper);
    return item;
}

function renderCoachCard(viewModel) {
    const card = document.getElementById('daily-coach-card');
    if (!card) return;

    const coach = buildDailyCoaching({
        total: viewModel.totals,
        targetCalories: viewModel.targetCalories,
        calorieHistory: viewModel.calorieHistory,
        goalType: viewModel.goalType,
        weightKg: viewModel.profileWeight || 0
    });
    const content = buildCoachContent(coach, viewModel.lang);
    const headlineEl = document.getElementById('coach-headline');
    const summaryEl = document.getElementById('coach-summary');
    const tipsEl = document.getElementById('coach-tips');
    const weeklyTitleEl = document.getElementById('coach-weekly-title');
    const statsEl = document.getElementById('coach-weekly-stats');
    const coachTitleEl = document.getElementById('txt-coach-title');

    if (coachTitleEl) coachTitleEl.innerText = content.cardTitle;
    if (headlineEl) headlineEl.innerText = content.headline;
    if (summaryEl) summaryEl.innerText = content.summary;
    if (weeklyTitleEl) weeklyTitleEl.innerText = content.weeklyTitle;

    if (tipsEl) {
        clearElement(tipsEl);
        content.tips.forEach((tip) => {
            tipsEl.appendChild(createElement('li', { text: tip }));
        });
    }

    if (statsEl) {
        clearElement(statsEl);
        content.weeklyStats.forEach((stat) => {
            statsEl.appendChild(createElement('div', {
                className: 'coach-stat-chip',
                text: stat
            }));
        });
    }

    card.dataset.coachStatus = coach.status;
}

function renderMealRhythmCard(cardId, state = getAppState(), variant = 'home') {
    const card = document.getElementById(cardId);
    if (!card) return;

    const rhythm = createMealRhythmViewModel(state, { days: 7 });
    const content = buildMealRhythmContent(rhythm, state.curLang, { variant });

    card.hidden = false;
    clearElement(card);
    card.appendChild(createElement('div', {
        className: 'rhythm-kicker',
        text: content.title
    }));
    if (content.subtitle) {
        card.appendChild(createElement('div', {
            className: 'rhythm-summary',
            text: content.subtitle
        }));
    }
    card.appendChild(createElement('div', {
        className: 'rhythm-headline',
        text: content.headline
    }));
    card.appendChild(createElement('div', {
        className: 'rhythm-summary',
        text: content.summary
    }));

    const signalGrid = createElement('div', {
        className: 'rhythm-signal-grid'
    });

    content.signals.forEach((signal) => {
        signalGrid.appendChild(createElement('div', {
            className: 'rhythm-signal'
        }, [
            createElement('div', {
                className: 'rhythm-signal-label',
                text: signal.label
            }),
            createElement('div', {
                className: 'rhythm-signal-copy',
                text: signal.text
            })
        ]));
    });

    card.appendChild(signalGrid);
}

function trackVisibleRhythmSummaryViews(state = getAppState()) {
    const rhythm = createMealRhythmViewModel(state, { days: 7 });
    const surfaces = [
        ['home', document.getElementById('view-daily')],
        ['dashboard', document.getElementById('view-dashboard')]
    ];

    surfaces.forEach(([surface, element]) => {
        if (!element?.classList.contains('active-view')) return;
        trackRhythmSummaryViewed({
            surface,
            selectedDate: state.selectedDate,
            headline: rhythm.headline,
            signalCount: Array.isArray(rhythm.signals) ? rhythm.signals.length : 0
        });
    });
}

export function renderMealRhythmCards(state = getAppState()) {
    renderMealRhythmCard('meal-rhythm-card', state, 'home');
    renderMealRhythmCard('dashboard-rhythm-card', state, 'dashboard');
    trackVisibleRhythmSummaryViews(state);
}

function renderDashboardNutritionFocusCard(state = getAppState()) {
    const card = document.getElementById('dashboard-nutrition-focus-card');
    if (!card) return;

    const content = buildNutritionFocusContent(
        createDashboardNutritionFocusViewModel(state, { days: 7 }),
        state.curLang
    );

    card.hidden = false;
    clearElement(card);
    card.appendChild(createElement('div', {
        className: 'nutrition-focus-kicker',
        text: content.title
    }));
    card.appendChild(createElement('div', {
        className: 'nutrition-focus-subtitle',
        text: content.subtitle
    }));
    card.appendChild(createElement('div', {
        className: 'nutrition-focus-headline',
        text: content.headline
    }));
    card.appendChild(createElement('div', {
        className: 'nutrition-focus-summary',
        text: content.summary
    }));

    const signalGrid = createElement('div', {
        className: 'nutrition-focus-grid'
    });
    content.signals.forEach((signal) => {
        signalGrid.appendChild(createElement('div', {
            className: 'nutrition-focus-signal'
        }, [
            createElement('div', {
                className: 'nutrition-focus-label',
                text: signal.label
            }),
            createElement('div', {
                className: 'nutrition-focus-value',
                text: signal.value
            }),
            createElement('div', {
                className: 'nutrition-focus-detail',
                text: signal.detail
            })
        ]));
    });
    card.appendChild(signalGrid);
}

function renderHomeCompanionCard(state = getAppState()) {
    const viewModel = createHomeCompanionViewModel(state);
    const content = buildHomeCompanionContent(viewModel, state.curLang);
    const textTargets = [
        ['home-companion-kicker', content.hero.eyebrow],
        ['home-companion-title', content.hero.title],
        ['home-companion-summary', content.hero.summary],
        ['btn-home-log-hub-label', content.hero.actions.log],
        ['btn-home-ai-label', content.hero.actions.ai],
        ['btn-home-favorites-label', content.hero.actions.favorites],
        ['txt-home-log-modal-title', content.logHub.title],
        ['txt-home-log-modal-copy', content.logHub.summary],
        ['btn-home-log-common-label', content.logHub.commonFoodsButton],
        ['txt-home-log-common-copy', content.logHub.commonFoodsCopy],
        ['txt-food-preset-modal-title', content.logHub.commonFoodsButton],
        ['txt-food-preset-modal-copy', content.logHub.commonFoodsCopy],
        ['btn-home-log-favorites-label', content.logHub.favoritesButton],
        ['txt-home-log-favorites-copy', content.logHub.favoritesCopy],
        ['btn-home-log-manual-label', content.logHub.manualButton],
        ['txt-home-log-manual-copy', content.logHub.manualCopy],
        ['txt-manual-modal-title', content.logHub.manualModalTitle],
        ['txt-manual-modal-copy', content.logHub.manualModalHint],
        ['txt-today-meals-kicker', content.logHub.todayMealsKicker],
        ['txt-today-meals-title', content.logHub.todayMealsTitle],
        ['txt-today-meals-copy', content.logHub.todayMealsHint],
        ['txt-total-intake', content.overview.title],
        ['txt-daily-summary-hint', content.overview.hint]
    ];

    textTargets.forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.innerText = value;
        }
    });

    const statsEl = document.getElementById('home-companion-stats');
    if (statsEl) {
        clearElement(statsEl);
        content.hero.stats.forEach((stat) => {
            statsEl.appendChild(createElement('div', {
                className: 'companion-stat-chip'
            }, [
                createElement('span', {
                    className: 'companion-stat-label',
                    text: stat.label
                }),
                createElement('span', {
                    className: 'companion-stat-value',
                    text: stat.value
                })
            ]));
        });
    }

    const metaEl = document.getElementById('home-companion-meta');
    if (metaEl) {
        clearElement(metaEl);
        content.hero.meta.forEach((item) => {
            metaEl.appendChild(createElement('span', {
                className: 'companion-meta-chip',
                text: item
            }));
        });
    }
    const signalGrid = document.getElementById('home-summary-signals');
    if (signalGrid) {
        clearElement(signalGrid);
        content.overview.signals.forEach((signal) => {
            signalGrid.appendChild(createElement('div', {
                className: 'home-signal-card'
            }, [
                createElement('div', {
                    className: 'home-signal-label',
                    text: signal.label
                }),
                createElement('div', {
                    className: 'home-signal-value',
                    text: signal.value
                }),
                createElement('div', {
                    className: 'home-signal-copy',
                    text: signal.detail
                })
            ]));
        });
    }
}

export function switchView(targetId) {
    document.querySelectorAll('.view-section').forEach((view) => {
        view.classList.remove('active-view');
        view.classList.add('hidden');
    });

    const targetView = document.getElementById(targetId);
    if (targetView) {
        targetView.classList.remove('hidden');
        targetView.classList.add('active-view');
    }

    document.querySelectorAll('.nav-item').forEach((nav) => {
        nav.classList.toggle('active', nav.getAttribute('data-target') === targetId);
    });

    if (targetId === 'view-dashboard') {
        trackVisibleRhythmSummaryViews(getAppState());
        void ensureDashboardChartsReady();
        return;
    }

    if (targetId === 'view-ai') {
        void initializeTurnstileWidget().then(() => {
            executeTurnstile();
        });
        return;
    }

    trackVisibleRhythmSummaryViews(getAppState());
}

export function setChartRange(days) {
    setDashboardChartRange(days);
    const btn7 = document.getElementById('btn-chart-7d');
    const btn30 = document.getElementById('btn-chart-30d');

    if (btn7 && btn30) {
        btn7.classList.toggle('active-range', days === 7);
        btn30.classList.toggle('active-range', days === 30);
    }

    updateTrendCharts(days);
}

export function renderListAndStats(viewModel = createDailyViewModel(getAppState())) {
    const t = getTexts();
    const extra = getExtraUiText(viewModel.lang);
    const state = getAppState();

    ['breakfast', 'lunch', 'dinner', 'snack'].forEach((type) => {
        clearElement(document.getElementById(`list-${type}`));
    });

    viewModel.foodItems.forEach((item, index) => {
        const n = item.nutri || {};

        const info = createElement('div', {
            className: 'food-info',
            style: { cursor: 'pointer' }
        });
        info.addEventListener('click', () => showDetailModal(index));
        info.appendChild(createElement('div', { className: 'name', text: item.name || '--' }));
        info.appendChild(createElement('div', {
            className: 'detail',
            text: formatNutritionInline(n, t)
        }));

        const actionWrap = createElement('div', {
            style: { display: 'flex', gap: '5px' }
        });

        const favBtn = createElement('button', {
            className: 'btn-delete',
            text: t.btnFavSave || 'Save',
            style: { backgroundColor: '#ff7675' }
        });
        favBtn.addEventListener('click', () => uiActions.addRecordToFav?.(index));

        const deleteBtn = createElement('button', {
            className: 'btn-delete',
            text: 'X'
        });
        deleteBtn.addEventListener('click', () => uiActions.deleteItem?.(index));

        actionWrap.appendChild(favBtn);
        actionWrap.appendChild(deleteBtn);

        const listItem = document.createElement('li');
        listItem.appendChild(info);
        listItem.appendChild(actionWrap);

        const listEl = document.getElementById(`list-${item.type}`);
        if (listEl) listEl.appendChild(listItem);
    });

    ['breakfast', 'lunch', 'dinner', 'snack'].forEach((type) => {
        const listEl = document.getElementById(`list-${type}`);
        if (!listEl || listEl.children.length > 0) return;
        listEl.appendChild(createEmptyMealRow(extra.emptyMealTitle, extra.emptyMealBody));
    });

    Object.keys(viewModel.mealTotals).forEach((type) => {
        const el = document.getElementById(`prog-${type}`);
        if (el) el.innerText = `${Math.round(viewModel.mealTotals[type])} kcal`;
    });

    document.getElementById('total-cal-display').innerText = Math.round(viewModel.totals.cal);
    document.getElementById('sum-protein').innerText = roundValue(viewModel.totals.pro).toFixed(1);
    document.getElementById('sum-fat').innerText = roundValue(viewModel.totals.fat).toFixed(1);
    document.getElementById('sum-carb').innerText = roundValue(viewModel.totals.carb).toFixed(1);
    document.getElementById('sum-sugar').innerText = roundValue(viewModel.totals.sugar).toFixed(1);
    document.getElementById('sum-sodium').innerText = Math.round(viewModel.totals.sod);
    document.getElementById('sum-sat-fat').innerText = roundValue(viewModel.totals.sat).toFixed(1);
    document.getElementById('sum-trans-fat').innerText = roundValue(viewModel.totals.trans).toFixed(1);
    document.getElementById('sum-fiber').innerText = roundValue(viewModel.totals.fiber).toFixed(1);
    document.getElementById('water-val').innerText = viewModel.waterTarget;

    renderCoachCard(viewModel);
    renderMealRhythmCards(state);
    renderDashboardNutritionFocusCard(state);

    updateCharts(viewModel.totals);
    updatePetStatus(createPetViewModel(state));
    renderHomeCompanionCard(state);
    updateDailySummaryCard(viewModel.totals, viewModel.waterTarget, viewModel.targetCalories);
}

export {
    calTrendChart,
    dashboardChartRange,
    initCharts,
    macroChart,
    openDailySummaryDetails,
    petInteraction,
    petTimeout,
    proteinTrendChart,
    showEatingAnimation,
    updateChartTheme,
    updateCharts,
    updateMacroChartLanguage,
    updatePetStatus,
    updateTrendCharts,
    updateWeightChart,
    weightChart,
    weeklyChart
};
