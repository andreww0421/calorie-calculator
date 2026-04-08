import { getLocaleTranslations } from '../locales/index.js';
import { getHomeUiCopy } from '../locales/home-ui-copy.js';
import { getNutritionUiCopy } from '../locales/nutrition-ui-copy.js';
import { uiCopyCatalog } from '../locales/ui-copy.js';
import { getAppState } from '../state/app-state.js';
import { getLocalDateString } from '../utils.js';

function getCopySection(section, lang = getAppState().curLang) {
    return uiCopyCatalog[lang]?.[section] || uiCopyCatalog.en[section];
}

export function getExtraUiText(lang = getAppState().curLang) {
    return getCopySection('extra', lang);
}

export function getGoalUiText(lang = getAppState().curLang) {
    return getCopySection('goal', lang);
}

export function getMealRhythmUiText(lang = getAppState().curLang) {
    return getCopySection('rhythm', lang);
}

export function getNutritionUiText(lang = getAppState().curLang) {
    return getNutritionUiCopy(lang);
}

export function getGoalSummaryText(goalType = 'lose', lang = getAppState().curLang) {
    const goalUi = getGoalUiText(lang);
    return goalUi.goalTypes?.[goalType] || goalUi.goalTypes?.lose || uiCopyCatalog.en.goal.goalTypes.lose;
}

export function buildHomeCompanionContent(viewModel, lang = getAppState().curLang) {
    const copy = getHomeUiCopy(lang);
    const t = getLocaleTranslations(lang);
    const hasMeals = (viewModel?.mealCoverage?.loggedMeals || 0) > 0;
    const nextMealLabel = t.meals?.[viewModel?.mealCoverage?.nextMealTitleKey || ''] || '';
    const heroSummary = hasMeals
        ? copy.heroSummaryActive
        : (copy.heroSummaryBase || '');
    const proteinValue = Number(viewModel?.proteinCurrent || 0).toFixed(1).replace(/\.0$/, '');
    const proteinSignalDetail = viewModel?.proteinRemaining > 0
        ? copy.signalProteinToGoal(viewModel.proteinRemaining)
        : copy.signalProteinOnTrack;

    return {
        hero: {
            eyebrow: hasMeals ? copy.heroEyebrowActive : copy.heroEyebrowEmpty,
            title: hasMeals
                ? copy.heroTitleActive(viewModel.mealCoverage || { loggedMeals: 0, plannedMeals: 0 })
                : copy.heroTitleEmpty,
            summary: heroSummary,
            stats: [
                {
                    label: copy.statLabels.streak,
                    value: copy.formatDayCount(viewModel?.pet?.progress?.streak || 0)
                },
                {
                    label: copy.statLabels.meals,
                    value: copy.formatMealCoverage(
                        viewModel?.mealCoverage?.loggedMeals || 0,
                        viewModel?.mealCoverage?.plannedMeals || 0
                    )
                },
                {
                    label: copy.statLabels.protein,
                    value: copy.formatProteinPace(proteinValue, viewModel?.proteinTarget || 0)
                }
            ],
            meta: [
                getGoalSummaryText(viewModel?.goalType || 'lose', lang),
                nextMealLabel || ''
            ].filter(Boolean),
            actions: {
                log: copy.heroActionLog || t.btnAddRecord || t.btnAdd || 'Log meal',
                ai: t.aiTitle || 'AI Analysis',
                favorites: copy.heroActionFavorites || t.btnFavLoad || 'Favorites'
            }
        },
        logHub: {
            title: copy.logHubTitle || copy.quickLogTitle || t.txtRecordTitle || t.recordTitle || 'Quick logging',
            summary: hasMeals
                ? (copy.logHubCopyActive || copy.quickLogCopyActive)
                : (copy.logHubCopyEmpty || copy.quickLogCopyEmpty),
            commonFoodsButton: copy.heroActionCommonFoods || t.presetFoodLabel || 'Common foods',
            commonFoodsCopy: copy.commonFoodsHint || 'Choose a familiar food and keep Home light.',
            favoritesButton: copy.logHubFavoritesButton || copy.heroActionFavorites || t.btnFavLoad || 'Favorites',
            favoritesCopy: copy.logHubFavoritesCopy || 'Pick from foods you already save often.',
            manualButton: copy.logHubManualButton || copy.heroActionManual || t.manualLabel || 'Manual entry',
            manualCopy: copy.logHubManualCopy || 'Open this only when you need a custom food or detailed nutrition.',
            manualModalTitle: copy.manualModalTitle || copy.manualAdvancedTitle || t.manualLabel || 'Manual meal entry',
            manualModalHint: copy.manualModalHint || copy.manualAdvancedHint || 'Use this for custom foods or detailed nutrition edits.',
            todayMealsKicker: copy.todayMealsKicker || copy.heroEyebrowEmpty || 'Daily diary',
            todayMealsTitle: copy.todayMealsTitle || copy.mealListTitle || 'Today\'s meals',
            todayMealsHint: copy.todayMealsHint || 'Keep meals visible without turning Home into a form.'
        },
        overview: {
            title: copy.overviewTitle,
            hint: copy.overviewHint,
            signals: [
                {
                    label: copy.signals.protein,
                    value: `${proteinValue}g`,
                    detail: proteinSignalDetail
                },
                {
                    label: copy.signals.meals,
                    value: copy.formatMealCoverage(
                        viewModel?.mealCoverage?.loggedMeals || 0,
                        viewModel?.mealCoverage?.plannedMeals || 0
                    ),
                    detail: hasMeals
                        ? copy.signalMealsActive(
                            viewModel?.mealCoverage?.loggedMeals || 0,
                            viewModel?.mealCoverage?.plannedMeals || 0,
                            nextMealLabel
                        )
                        : copy.signalMealsEmpty
                }
            ]
        }
    };
}

function resolveRhythmSignalText(signalCopy = {}, signal = {}) {
    const template = signalCopy?.[signal?.status] || signalCopy?.building || signalCopy?.placeholder || '';
    return typeof template === 'function' ? template(signal) : template;
}

export function buildGoalInsightsContent(insights, lang = getAppState().curLang) {
    const copy = getGoalUiText(lang);
    const goalLabel = getGoalSummaryText(insights?.goalType || 'lose', lang);
    const windowSize = insights?.windowSize || 7;

    return {
        title: copy.reportTitle,
        subtitle: copy.reportSubtitle,
        headline: copy.reportHeadline(goalLabel),
        summary: copy.reportSummary(insights || { loggedDays: 0, calorieTargetDays: 0, proteinTargetDays: 0 }),
        stats: [
            { label: copy.statStreak, value: copy.formatDayCount(insights?.currentStreak || 0) },
            { label: copy.statBestStreak, value: copy.formatDayCount(insights?.bestStreak || 0) },
            { label: copy.statCalories, value: copy.formatWindowCount(insights?.calorieTargetDays || 0, windowSize) },
            { label: copy.statProtein, value: copy.formatWindowCount(insights?.proteinTargetDays || 0, windowSize) }
        ]
    };
}

export function buildMealRhythmContent(insights, lang = getAppState().curLang, { variant = 'home' } = {}) {
    const copy = getMealRhythmUiText(lang);
    const focus = insights?.focus || 'start_logging';
    const summaryTemplate = copy.summaries?.[focus] || copy.summaries?.steady_week || '';
    const subtitle = variant === 'dashboard'
        ? (copy.dashboardSubtitle || copy.subtitle)
        : copy.subtitle;

    return {
        title: copy.title,
        subtitle,
        headline: copy.headlines?.[focus] || copy.headlines?.steady_week || '',
        summary: typeof summaryTemplate === 'function' ? summaryTemplate(insights || {}) : summaryTemplate,
        signals: [
            {
                key: 'breakfast',
                label: copy.labels?.breakfast || 'Breakfast',
                text: resolveRhythmSignalText(copy.breakfast, insights?.breakfast || {})
            },
            {
                key: 'dinner',
                label: copy.labels?.dinner || 'Dinner',
                text: resolveRhythmSignalText(copy.dinner, insights?.dinner || {})
            },
            {
                key: 'protein',
                label: copy.labels?.protein || 'Protein',
                text: resolveRhythmSignalText(copy.protein, insights?.protein || {})
            },
            {
                key: 'hydration',
                label: copy.labels?.hydration || 'Hydration',
                text: resolveRhythmSignalText(copy.hydration, insights?.hydration || {})
            }
        ]
    };
}

export function buildNutritionFocusContent(viewModel, lang = getAppState().curLang) {
    const copy = getNutritionUiText(lang).trend;
    const focusKey = viewModel?.focusKey || 'balanced';
    const headline = copy.headlines?.[focusKey] || copy.headlines?.balanced || '';
    const summaryTemplate = copy.summaries?.[focusKey] || copy.summaries?.balanced || '';
    const summary = typeof summaryTemplate === 'function'
        ? summaryTemplate(viewModel?.loggedDays || 7)
        : summaryTemplate;

    return {
        title: copy.title,
        subtitle: copy.subtitle,
        headline,
        summary,
        signals: (viewModel?.signals || []).map((signal) => ({
            key: signal.key,
            label: copy.signalLabels?.[signal.key] || signal.key,
            value: copy.signalValue?.[signal.key]
                ? copy.signalValue[signal.key](signal)
                : String(signal.current ?? '--'),
            detail: copy.signalDetails?.[signal.key]
                ? copy.signalDetails[signal.key](signal)
                : ''
        }))
    };
}

export function getDisplayDateLabel(dateText = getAppState().selectedDate, lang = getAppState().curLang) {
    const { selectedDate } = getAppState();
    const normalizedDate = dateText || selectedDate || getLocalDateString();
    const extra = getExtraUiText(lang);
    return normalizedDate === getLocalDateString() ? extra.todayLabel : normalizedDate;
}

export function formatNutritionInline(nutri = {}, t = {}) {
    const calories = Math.round(Number(nutri.calories ?? nutri.cal ?? 0) || 0);
    const protein = Number(nutri.protein ?? 0) || 0;
    const fat = Number(nutri.fat ?? 0) || 0;
    const carbohydrate = Number(nutri.carbohydrate ?? 0) || 0;

    return `${t.cal || 'Calories'}: ${calories} | ${t.pro || 'Protein'}: ${protein}g | ${t.fat || 'Fat'}: ${fat}g | ${t.carb || 'Carb'}: ${carbohydrate}g`;
}

export function buildCoachContent(coach, lang = getAppState().curLang) {
    const copy = getCopySection('coach', lang);
    const headline = copy.headlines[coach?.status] || copy.headlines.steady;
    const summaryTemplate = copy.summaries[coach?.status] || copy.summaries.steady;
    const summary = typeof summaryTemplate === 'function' ? summaryTemplate(coach) : summaryTemplate;
    const tips = (coach?.tipKeys || [])
        .map((key) => copy.tips[key])
        .filter(Boolean);

    return {
        cardTitle: copy.cardTitle,
        weeklyTitle: copy.weeklyTitle,
        headline,
        summary,
        tips,
        weeklyStats: [
            copy.weeklyAverage(coach?.weekly?.averageCalories || 0),
            copy.weeklyDays(coach?.weekly?.loggedDays || 0),
            copy.weeklyBest(coach?.weekly?.bestDayLabel || '--', coach?.weekly?.bestDayCalories || 0)
        ]
    };
}
