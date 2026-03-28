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

export function getGoalSummaryText(goalType = 'lose', lang = getAppState().curLang) {
    const goalUi = getGoalUiText(lang);
    return goalUi.goalTypes?.[goalType] || goalUi.goalTypes?.lose || uiCopyCatalog.en.goal.goalTypes.lose;
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
