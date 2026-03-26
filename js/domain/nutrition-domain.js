const MEAL_RATIO_CONFIG = {
    '4': [
        { type: 'breakfast', titleKey: 'breakfast', ratio: 0.25 },
        { type: 'lunch', titleKey: 'lunch', ratio: 0.35 },
        { type: 'dinner', titleKey: 'dinner', ratio: 0.30 },
        { type: 'snack', titleKey: 'snack', ratio: 0.10 }
    ],
    '3': [
        { type: 'breakfast', titleKey: 'breakfast', ratio: 0.30 },
        { type: 'lunch', titleKey: 'lunch', ratio: 0.40 },
        { type: 'dinner', titleKey: 'dinner', ratio: 0.30 }
    ],
    '2': [
        { type: 'lunch', titleKey: 'meal1', ratio: 0.50 },
        { type: 'dinner', titleKey: 'meal2', ratio: 0.50 }
    ],
    '1': [
        { type: 'dinner', titleKey: 'mealBig', ratio: 1 }
    ]
};

function toNumber(value) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
}

export function calculateMacroGoals(targetCalories = 0) {
    const target = Math.max(0, Math.round(toNumber(targetCalories)));
    return {
        protein: Math.round((target * 0.2) / 4),
        fat: Math.round((target * 0.3) / 9),
        carb: Math.round((target * 0.5) / 4),
        sugar: Math.round((target * 0.1) / 4),
        saturatedFat: Math.round((target * 0.1) / 9)
    };
}

export function getMealPlan(mode = '4', mealTexts = {}, targetCalories = 0) {
    const config = MEAL_RATIO_CONFIG[String(mode)] || MEAL_RATIO_CONFIG['4'];
    return config.map((entry) => ({
        ...entry,
        title: mealTexts?.[entry.titleKey] || entry.type,
        suggestedCalories: targetCalories > 0 ? Math.round(targetCalories * entry.ratio) : 0
    }));
}

export function summarizeNutrition(items = []) {
    const totals = { cal: 0, pro: 0, fat: 0, carb: 0, sugar: 0, sod: 0, sat: 0, trans: 0, fiber: 0 };
    const mealTotals = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };

    items.forEach((item) => {
        const nutri = item?.nutri || {};
        totals.cal += toNumber(nutri.calories);
        totals.pro += toNumber(nutri.protein);
        totals.fat += toNumber(nutri.fat);
        totals.carb += toNumber(nutri.carbohydrate);
        totals.sugar += toNumber(nutri.sugar);
        totals.sod += toNumber(nutri.sodium);
        totals.sat += toNumber(nutri.saturatedFat);
        totals.trans += toNumber(nutri.transFat);
        totals.fiber += toNumber(nutri.fiber);

        if (mealTotals[item?.type] !== undefined) {
            mealTotals[item.type] += toNumber(nutri.calories);
        }
    });

    return { totals, mealTotals };
}

export function buildWeeklySummary(calorieHistory = []) {
    const loggedDays = calorieHistory.filter((item) => toNumber(item?.calories) > 0);
    const totalCalories = loggedDays.reduce((sum, item) => sum + toNumber(item?.calories), 0);
    const averageCalories = loggedDays.length > 0 ? Math.round(totalCalories / loggedDays.length) : 0;
    const bestDay = loggedDays.reduce((best, item) => {
        if (!best) return item;
        return toNumber(item.calories) > toNumber(best.calories) ? item : best;
    }, null);

    return {
        loggedDays: loggedDays.length,
        averageCalories,
        bestDayLabel: bestDay?.date || '--',
        bestDayCalories: Math.round(toNumber(bestDay?.calories))
    };
}

export function buildDailyCoaching({ total = {}, targetCalories = 0, calorieHistory = [] } = {}) {
    const target = toNumber(targetCalories);
    const macroGoals = calculateMacroGoals(target);
    const calories = toNumber(total.cal);
    const protein = toNumber(total.pro);
    const fiber = toNumber(total.fiber);
    const sodium = toNumber(total.sod);

    let status = 'steady';
    if (calories <= 0) status = 'start_logging';
    else if (target > 0 && calories > target * 1.08) status = 'over_target';
    else if (target > 0 && calories >= target * 0.85) status = 'near_goal';
    else if (protein > 0 && protein < macroGoals.protein * 0.65) status = 'protein_gap';
    else if (fiber > 0 && fiber < 18) status = 'fiber_gap';
    else if (sodium > 2300) status = 'sodium_high';

    const tipKeys = [];
    if (calories <= 0) {
        tipKeys.push('use_ai', 'log_first_meal');
    } else {
        if (protein < macroGoals.protein * 0.85) tipKeys.push('protein_boost');
        if (fiber < 25) tipKeys.push('fiber_boost');
        if (sodium > 2300) tipKeys.push('watch_sodium');
        if (target > 0 && calories > target * 1.08) tipKeys.push('portion_reset');
        if (tipKeys.length === 0) tipKeys.push('keep_momentum');
    }

    return {
        status,
        targetCalories: target,
        calories,
        protein,
        fiber,
        sodium,
        remainingCalories: target > 0 ? Math.max(Math.round(target - calories), 0) : 0,
        overCalories: target > 0 ? Math.max(Math.round(calories - target), 0) : 0,
        proteinGap: Math.max(macroGoals.protein - Math.round(protein), 0),
        fiberGap: Math.max(25 - Math.round(fiber), 0),
        tipKeys: [...new Set(tipKeys)].slice(0, 3),
        macroGoals,
        weekly: buildWeeklySummary(calorieHistory)
    };
}
