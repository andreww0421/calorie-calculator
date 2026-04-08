import { getAppState } from '../state/app-state.js';
import {
    createDashboardChartsViewModel,
    createDashboardNutritionFocusViewModel,
    createMealRhythmViewModel
} from '../state/app-selectors.js';
import { createPetViewModel } from '../state/pet-selectors.js';
import { trackRhythmSummaryViewed } from '../analytics/product-events.js';
import { createElement, clearElement } from './dom-ui.js';
import { buildDailyCoaching } from '../domain/nutrition-domain.js';
import {
    buildCoachContent,
    buildMealRhythmContent,
    buildNutritionFocusContent
} from './locale-ui.js';

function setTextById(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.innerText = value;
    }
}

function setWidthById(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.style.width = value;
    }
}

function calculateAverage(entries = [], field) {
    const activeEntries = entries.filter((entry) => Number(entry?.[field]) > 0);
    if (activeEntries.length === 0) {
        return 0;
    }

    return Math.round(
        activeEntries.reduce((sum, entry) => sum + Number(entry?.[field] || 0), 0) / activeEntries.length
    );
}

export function buildDashboardSummaryMetrics(chartData, targetCalories, pet) {
    const weeklyCalories = chartData.weeklyCalories || [];
    const proteinTrend = chartData.proteinTrend || [];
    const averageCalories = calculateAverage(weeklyCalories, 'calories');
    const onTargetDays = targetCalories > 0
        ? weeklyCalories.filter((day) => day.calories > 0
            && day.calories >= targetCalories * 0.85
            && day.calories <= targetCalories * 1.15).length
        : 0;
    const averageProtein = calculateAverage(proteinTrend, 'protein');

    return {
        averageCalories,
        averageProtein,
        onTargetDays,
        streak: pet.progress?.streak || 0,
        level: pet.progress?.level || 1,
        xpWidth: `${Math.min((pet.progress?.xp || 0) % 100, 100)}%`,
        energyWidth: `${Math.min(pet.progress?.energy || 0, 100)}%`,
        bondWidth: `${Math.min(pet.progress?.bond || 0, 100)}%`
    };
}

export function renderCoachCard(viewModel) {
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

    const statusBar = document.getElementById('coach-status-bar');
    if (statusBar) {
        const statusMap = { green: 'on-track', yellow: 'needs-attention', red: 'over' };
        statusBar.dataset.status = statusMap[coach.status] || '';
    }
}

export function renderDashboardSummary(state = getAppState()) {
    const chartData = createDashboardChartsViewModel(state, { range: 7 });
    const targetCalories = Number(state?.targetCalories) || 0;
    const pet = createPetViewModel(state);
    const metrics = buildDashboardSummaryMetrics(chartData, targetCalories, pet);

    [
        ['dash-avg-cal', metrics.averageCalories > 0 ? `${metrics.averageCalories}` : '--'],
        ['dash-on-target', `${metrics.onTargetDays}/7`],
        ['dash-avg-protein', metrics.averageProtein > 0 ? `${metrics.averageProtein}g` : '--'],
        ['dash-streak', String(metrics.streak)],
        ['pet-stats-level', `Lv.${metrics.level}`]
    ].forEach(([id, value]) => setTextById(id, value));

    [
        ['pet-stat-xp-fill', metrics.xpWidth],
        ['pet-stat-energy-fill', metrics.energyWidth],
        ['pet-stat-bond-fill', metrics.bondWidth]
    ].forEach(([id, value]) => setWidthById(id, value));
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

export function trackVisibleRhythmSummaryViews(state = getAppState()) {
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
    renderMealRhythmCard('dashboard-rhythm-card', state, 'dashboard');
    trackVisibleRhythmSummaryViews(state);
}

export function renderDashboardNutritionFocusCard(state = getAppState()) {
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
