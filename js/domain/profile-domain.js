import { calculateNutritionTargets } from './nutrition-domain.js';

function toNumber(value) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
}

export function normalizeProfileMetrics(profile = {}) {
    return {
        gender: String(profile.gender || 'male'),
        age: Math.max(0, toNumber(profile.age)),
        height: Math.max(0, toNumber(profile.height)),
        weight: Math.max(0, toNumber(profile.weight)),
        activity: Math.max(0, toNumber(profile.activity)),
        goalType: String(profile.goalType || 'lose'),
        mealMode: String(profile.mealMode || '4')
    };
}

export function calculateProfilePlan(profile = {}) {
    const normalized = normalizeProfileMetrics(profile);

    if (!normalized.age || !normalized.height || !normalized.weight || !normalized.activity) {
        return null;
    }

    const bmr = normalized.gender === 'male'
        ? (10 * normalized.weight + 6.25 * normalized.height - 5 * normalized.age + 5)
        : (10 * normalized.weight + 6.25 * normalized.height - 5 * normalized.age - 161);
    const tdee = Math.round(bmr * normalized.activity);
    const nutritionPlan = calculateNutritionTargets({
        weightKg: normalized.weight,
        tdee,
        bmr,
        goalType: normalized.goalType
    });

    return {
        ...normalized,
        bmr: Math.round(bmr),
        tdee,
        targetCalories: nutritionPlan.targetCalories,
        macroGoals: nutritionPlan.macroGoals,
        goalType: nutritionPlan.goalType
    };
}
