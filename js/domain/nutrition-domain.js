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

const GOAL_CONFIG = {
    lose: {
        calorieAdjustment: -500,
        proteinPerKg: 2.0,
        fatPerKg: 0.8
    },
    maintain: {
        calorieAdjustment: 0,
        proteinPerKg: 1.6,
        fatPerKg: 0.8
    },
    gain: {
        calorieAdjustment: 250,
        proteinPerKg: 2.2,
        fatPerKg: 0.9
    }
};

function toNumber(value) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
}

export function calculateMacroGoals(targetCalories = 0, { weightKg = 0, goalType = 'lose' } = {}) {
    const target = Math.max(0, Math.round(toNumber(targetCalories)));
    const normalizedWeight = Math.max(0, toNumber(weightKg));
    const normalizedGoalType = normalizeGoalType(goalType);

    if (normalizedWeight > 0) {
        const goal = GOAL_CONFIG[normalizedGoalType];
        const protein = Math.max(0, Math.round(normalizedWeight * goal.proteinPerKg));
        const fat = Math.max(0, Math.round(normalizedWeight * goal.fatPerKg));
        const carbCalories = Math.max(target - protein * 4 - fat * 9, 0);
        return {
            protein,
            fat,
            carb: Math.round(carbCalories / 4),
            sugar: Math.round((target * 0.1) / 4),
            saturatedFat: Math.round((target * 0.1) / 9)
        };
    }

    return {
        protein: Math.round((target * 0.2) / 4),
        fat: Math.round((target * 0.3) / 9),
        carb: Math.round((target * 0.5) / 4),
        sugar: Math.round((target * 0.1) / 4),
        saturatedFat: Math.round((target * 0.1) / 9)
    };
}

export function normalizeGoalType(goalType = 'lose') {
    const normalized = String(goalType || 'lose');
    return GOAL_CONFIG[normalized] ? normalized : 'lose';
}

export function calculateTargetCalories({ tdee = 0, bmr = 0, goalType = 'lose' } = {}) {
    const normalizedGoalType = normalizeGoalType(goalType);
    const baseTdee = Math.round(toNumber(tdee));
    const baseBmr = Math.round(toNumber(bmr));
    if (baseTdee <= 0) return 0;

    const adjusted = baseTdee + GOAL_CONFIG[normalizedGoalType].calorieAdjustment;
    if (normalizedGoalType === 'lose' && baseBmr > 0) {
        return Math.max(adjusted, baseBmr);
    }
    return adjusted;
}

export function calculateNutritionTargets({ weightKg = 0, tdee = 0, bmr = 0, goalType = 'lose' } = {}) {
    const normalizedGoalType = normalizeGoalType(goalType);
    const targetCalories = calculateTargetCalories({
        tdee,
        bmr,
        goalType: normalizedGoalType
    });

    return {
        goalType: normalizedGoalType,
        targetCalories,
        macroGoals: calculateMacroGoals(targetCalories, {
            weightKg,
            goalType: normalizedGoalType
        })
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

function resolveCalorieRange(goalType, targetCalories) {
    const target = Math.max(0, toNumber(targetCalories));
    const normalizedGoalType = normalizeGoalType(goalType);
    if (target <= 0) {
        return { min: 0, max: 0 };
    }

    if (normalizedGoalType === 'gain') {
        return {
            min: Math.round(target * 0.9),
            max: Math.round(target * 1.12)
        };
    }

    if (normalizedGoalType === 'maintain') {
        return {
            min: Math.round(target * 0.9),
            max: Math.round(target * 1.1)
        };
    }

    return {
        min: Math.round(target * 0.75),
        max: Math.round(target * 1.02)
    };
}

function calculateBestStreak(days = []) {
    let best = 0;
    let current = 0;

    days.forEach((day) => {
        if (day.logged) {
            current += 1;
            best = Math.max(best, current);
        } else {
            current = 0;
        }
    });

    return best;
}

function calculateCurrentStreak(days = []) {
    let streak = 0;

    for (let index = days.length - 1; index >= 0; index -= 1) {
        if (!days[index].logged) break;
        streak += 1;
    }

    return streak;
}

export function buildGoalInsights({
    calorieHistory = [],
    proteinHistory = [],
    targetCalories = 0,
    proteinTarget = 0,
    goalType = 'lose'
} = {}) {
    const calorieMap = new Map();
    const proteinMap = new Map();
    const orderedDates = [];

    calorieHistory.forEach((entry) => {
        const date = String(entry?.date || '');
        if (!date) return;
        if (!calorieMap.has(date)) orderedDates.push(date);
        calorieMap.set(date, Math.max(0, toNumber(entry?.calories)));
    });

    proteinHistory.forEach((entry) => {
        const date = String(entry?.date || '');
        if (!date) return;
        if (!calorieMap.has(date) && !proteinMap.has(date)) orderedDates.push(date);
        proteinMap.set(date, Math.max(0, toNumber(entry?.protein)));
    });

    const days = orderedDates.map((date) => {
        const calories = calorieMap.get(date) ?? 0;
        const protein = proteinMap.get(date) ?? 0;
        return {
            date,
            calories,
            protein,
            logged: calories > 0 || protein > 0
        };
    });

    const calorieRange = resolveCalorieRange(goalType, targetCalories);
    const normalizedProteinTarget = Math.max(0, toNumber(proteinTarget));
    const loggedDays = days.filter((day) => day.logged);
    const calorieTargetDays = days.filter((day) => (
        day.logged &&
        calorieRange.max > 0 &&
        day.calories >= calorieRange.min &&
        day.calories <= calorieRange.max
    )).length;
    const proteinTargetDays = days.filter((day) => (
        day.logged &&
        normalizedProteinTarget > 0 &&
        day.protein >= normalizedProteinTarget * 0.9
    )).length;

    return {
        goalType: normalizeGoalType(goalType),
        windowSize: days.length,
        loggedDays: loggedDays.length,
        calorieTargetDays,
        proteinTargetDays,
        currentStreak: calculateCurrentStreak(days),
        bestStreak: calculateBestStreak(days),
        averageCalories: loggedDays.length > 0
            ? Math.round(loggedDays.reduce((sum, day) => sum + day.calories, 0) / loggedDays.length)
            : 0,
        averageProtein: loggedDays.length > 0
            ? Math.round((loggedDays.reduce((sum, day) => sum + day.protein, 0) / loggedDays.length) * 10) / 10
            : 0
    };
}

export function buildDailyCoaching({ total = {}, targetCalories = 0, calorieHistory = [], goalType = 'lose', weightKg = 0 } = {}) {
    const target = toNumber(targetCalories);
    const macroGoals = calculateMacroGoals(target, {
        goalType,
        weightKg
    });
    const calories = toNumber(total.cal);
    const protein = toNumber(total.pro);
    const fiber = toNumber(total.fiber);
    const sodium = toNumber(total.sod);

    let status = 'steady';
    if (calories <= 0) status = 'start_logging';
    else if (target > 0 && calories > target * 1.08) status = 'over_target';
    else if (protein < macroGoals.protein * 0.65) status = 'protein_gap';
    else if (fiber > 0 && fiber < 18) status = 'fiber_gap';
    else if (sodium > 2300) status = 'sodium_high';
    else if (target > 0 && calories >= target * 0.85) status = 'near_goal';

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
