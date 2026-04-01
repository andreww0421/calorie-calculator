import { calculateNutritionTargets } from './nutrition-domain.js';

function toNumber(value) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
}

export function getDefaultProfileRegion(lang = 'zh-TW') {
    const locale = String(lang || 'zh-TW').toLowerCase();
    if (locale.startsWith('en')) return 'singapore';
    return 'taiwan';
}

export function normalizeProfilePreferences(profile = {}, lang = 'zh-TW') {
    return {
        region: String(profile.region || '').trim(),
        diningOutFrequency: String(profile.diningOutFrequency || 'sometimes').trim() || 'sometimes',
        preferredPresetRegion: String(profile.region || '').trim() || getDefaultProfileRegion(lang)
    };
}

export function normalizeProfileMetrics(profile = {}, lang = 'zh-TW') {
    const preferences = normalizeProfilePreferences(profile, lang);

    return {
        gender: String(profile.gender || 'male'),
        age: Math.max(0, toNumber(profile.age)),
        height: Math.max(0, toNumber(profile.height)),
        weight: Math.max(0, toNumber(profile.weight)),
        activity: Math.max(0, toNumber(profile.activity)),
        goalType: String(profile.goalType || 'lose'),
        mealMode: String(profile.mealMode || '4'),
        region: preferences.region,
        diningOutFrequency: preferences.diningOutFrequency,
        preferredPresetRegion: preferences.preferredPresetRegion
    };
}

export function createOnboardingConfig(profile = {}, lang = 'zh-TW') {
    const normalized = normalizeProfileMetrics(profile, lang);
    const missingFields = [];

    if (!normalized.region) {
        missingFields.push('region');
    }

    if (!normalized.age || !normalized.height || !normalized.weight || !normalized.activity) {
        missingFields.push('basicProfile');
    }

    if (!normalized.goalType) {
        missingFields.push('goalType');
    }

    if (!normalized.diningOutFrequency) {
        missingFields.push('diningOutFrequency');
    }

    return {
        ...normalized,
        isComplete: missingFields.length === 0,
        missingFields
    };
}

export function hasCompletedOnboarding(profile = {}, lang = 'zh-TW') {
    return createOnboardingConfig(profile, lang).isComplete;
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
