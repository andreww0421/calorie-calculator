import { summarizeNutrition } from './nutrition-domain.js';

function toNumber(value) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
}

function clamp(value, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
}

function average(values = []) {
    if (!Array.isArray(values) || values.length === 0) return 0;
    return values.reduce((sum, value) => sum + toNumber(value), 0) / values.length;
}

function standardDeviation(values = []) {
    if (!Array.isArray(values) || values.length < 2) return 0;
    const mean = average(values);
    const variance = values.reduce((sum, value) => {
        const delta = toNumber(value) - mean;
        return sum + delta * delta;
    }, 0) / values.length;
    return Math.sqrt(variance);
}

function calculateVariationScore(values = [], tolerance = 0.45) {
    if (!Array.isArray(values) || values.length === 0) return 0;
    if (values.length === 1) return 60;

    const mean = average(values);
    if (mean <= 0) return 0;

    const coefficientOfVariation = standardDeviation(values) / mean;
    return Math.round((1 - clamp(coefficientOfVariation / tolerance, 0, 1)) * 100);
}

function createEmptySignal(key, status) {
    return {
        key,
        score: 0,
        status,
        loggedDays: 0
    };
}

export function summarizeMealRhythmDay(dayLog = {}) {
    const items = Array.isArray(dayLog?.items) ? dayLog.items : [];
    const { totals, mealTotals } = summarizeNutrition(items);
    const totalCalories = Math.round(toNumber(totals.cal));
    const totalProtein = Math.round(toNumber(totals.pro) * 10) / 10;
    const breakfastCalories = Math.round(toNumber(mealTotals.breakfast));
    const dinnerCalories = Math.round(toNumber(mealTotals.dinner));
    const lunchCalories = Math.round(toNumber(mealTotals.lunch));
    const snackCalories = Math.round(toNumber(mealTotals.snack));
    const logged = items.length > 0 || totalCalories > 0 || totalProtein > 0;

    return {
        date: String(dayLog?.date || ''),
        label: String(dayLog?.label || dayLog?.date || ''),
        logged,
        totalCalories,
        totalProtein,
        breakfastCalories,
        lunchCalories,
        dinnerCalories,
        snackCalories,
        dinnerShare: totalCalories > 0 ? dinnerCalories / totalCalories : 0,
        breakfastLogged: breakfastCalories > 0,
        dinnerLogged: dinnerCalories > 0
    };
}

export function scoreBreakfastStability(dayMetrics = []) {
    const loggedDays = dayMetrics.filter((day) => day.logged);
    if (loggedDays.length === 0) {
        return createEmptySignal('breakfast', 'not_enough_data');
    }

    const breakfastDays = loggedDays.filter((day) => day.breakfastLogged);
    const breakfastRate = breakfastDays.length / loggedDays.length;
    const variationScore = calculateVariationScore(
        breakfastDays.map((day) => day.breakfastCalories),
        0.5
    );
    const score = Math.round(((breakfastRate * 0.7) + ((variationScore / 100) * 0.3)) * 100);

    let status = 'irregular';
    if (loggedDays.length < 3) {
        status = breakfastDays.length > 0 ? 'building' : 'irregular';
    } else if (score >= 70) {
        status = 'steady';
    } else if (score >= 40) {
        status = 'building';
    }

    return {
        key: 'breakfast',
        score,
        status,
        loggedDays: loggedDays.length,
        breakfastDays: breakfastDays.length,
        averageBreakfastCalories: Math.round(average(breakfastDays.map((day) => day.breakfastCalories)))
    };
}

export function scoreDinnerHeaviness(dayMetrics = []) {
    const loggedDays = dayMetrics.filter((day) => day.logged);
    if (loggedDays.length === 0) {
        return createEmptySignal('dinner', 'not_enough_data');
    }

    const heavyDays = loggedDays.filter((day) => day.dinnerShare >= 0.45);
    const averageDinnerShare = average(loggedDays.map((day) => day.dinnerShare));
    const heavyRate = heavyDays.length / loggedDays.length;
    const score = Math.round(((clamp(averageDinnerShare / 0.6, 0, 1) * 0.7) + (heavyRate * 0.3)) * 100);

    let status = 'balanced';
    if (averageDinnerShare < 0.3 && heavyDays.length === 0) {
        status = 'light';
    } else if (score >= 60 || averageDinnerShare >= 0.48) {
        status = 'heavy';
    }

    return {
        key: 'dinner',
        score,
        status,
        loggedDays: loggedDays.length,
        heavyDays: heavyDays.length,
        averageDinnerShare: Math.round(averageDinnerShare * 100)
    };
}

export function scoreProteinConsistency(dayMetrics = [], proteinTarget = 0) {
    const loggedDays = dayMetrics.filter((day) => day.logged);
    if (loggedDays.length === 0) {
        return createEmptySignal('protein', 'not_enough_data');
    }

    const normalizedProteinTarget = Math.max(0, toNumber(proteinTarget));
    const averageProtein = Math.round(average(loggedDays.map((day) => day.totalProtein)) * 10) / 10;
    const variationScore = calculateVariationScore(
        loggedDays.map((day) => day.totalProtein),
        0.4
    );
    const targetDays = normalizedProteinTarget > 0
        ? loggedDays.filter((day) => day.totalProtein >= normalizedProteinTarget * 0.9).length
        : 0;
    const targetRate = loggedDays.length > 0 ? targetDays / loggedDays.length : 0;
    const score = normalizedProteinTarget > 0
        ? Math.round(((targetRate * 0.6) + ((variationScore / 100) * 0.4)) * 100)
        : variationScore;

    let status = 'inconsistent';
    if (loggedDays.length < 3) {
        status = loggedDays.length > 0 ? 'building' : 'inconsistent';
    } else if (score >= 70) {
        status = 'steady';
    } else if (score >= 45) {
        status = 'building';
    }

    return {
        key: 'protein',
        score,
        status,
        loggedDays: loggedDays.length,
        targetDays,
        averageProtein,
        proteinTarget: normalizedProteinTarget
    };
}

export function createHydrationConsistencyPlaceholder(windowSize = 7) {
    return {
        key: 'hydration',
        score: null,
        status: 'placeholder',
        available: false,
        windowSize,
        trackedDays: 0
    };
}

export function buildMealRhythmInsights({ dayLogs = [], proteinTarget = 0 } = {}) {
    const days = Array.isArray(dayLogs) ? dayLogs.map(summarizeMealRhythmDay) : [];
    const loggedDays = days.filter((day) => day.logged);
    const breakfast = scoreBreakfastStability(days);
    const dinner = scoreDinnerHeaviness(days);
    const protein = scoreProteinConsistency(days, proteinTarget);
    const hydration = createHydrationConsistencyPlaceholder(days.length || 7);

    let focus = 'start_logging';
    if (loggedDays.length >= 3) {
        if (breakfast.status === 'irregular') {
            focus = 'breakfast_anchor';
        } else if (dinner.status === 'heavy') {
            focus = 'dinner_balance';
        } else if (protein.status === 'inconsistent') {
            focus = 'protein_rhythm';
        } else if (breakfast.status === 'building' || protein.status === 'building') {
            focus = 'building_consistency';
        } else {
            focus = 'steady_week';
        }
    } else if (loggedDays.length > 0) {
        focus = 'building_consistency';
    }

    return {
        windowSize: days.length || 7,
        loggedDays: loggedDays.length,
        focus,
        breakfast,
        dinner,
        protein,
        hydration,
        days
    };
}
