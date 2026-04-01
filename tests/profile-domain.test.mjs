import test from 'node:test';
import assert from 'node:assert/strict';

import {
    calculateProfilePlan,
    createOnboardingConfig,
    hasCompletedOnboarding,
    normalizeProfileMetrics
} from '../js/domain/profile-domain.js';

test('normalizeProfileMetrics sanitizes profile inputs', () => {
    const normalized = normalizeProfileMetrics({
        gender: 'female',
        age: '31',
        height: '165',
        weight: '61.2',
        activity: '1.375',
        goalType: 'gain',
        mealMode: '3'
    });

    assert.deepEqual(normalized, {
        gender: 'female',
        age: 31,
        height: 165,
        weight: 61.2,
        activity: 1.375,
        goalType: 'gain',
        mealMode: '3',
        region: '',
        diningOutFrequency: 'sometimes',
        preferredPresetRegion: 'taiwan'
    });
});

test('createOnboardingConfig tracks missing onboarding inputs and completion state', () => {
    const incomplete = createOnboardingConfig({
        gender: 'female',
        age: '31',
        height: '165',
        weight: '61.2',
        activity: '1.375',
        goalType: 'gain',
        mealMode: '3'
    }, 'zh-TW');
    const complete = createOnboardingConfig({
        gender: 'female',
        age: '31',
        height: '165',
        weight: '61.2',
        activity: '1.375',
        goalType: 'gain',
        mealMode: '3',
        region: 'hong-kong',
        diningOutFrequency: 'often'
    }, 'zh-TW');

    assert.equal(incomplete.isComplete, false);
    assert.deepEqual(incomplete.missingFields, ['region']);
    assert.equal(complete.isComplete, true);
    assert.deepEqual(complete.missingFields, []);
    assert.equal(complete.preferredPresetRegion, 'hong-kong');
});

test('hasCompletedOnboarding requires explicit region for backward-compatible profiles', () => {
    assert.equal(hasCompletedOnboarding({
        gender: 'female',
        age: '31',
        height: '165',
        weight: '61.2',
        activity: '1.375',
        goalType: 'maintain',
        diningOutFrequency: 'sometimes'
    }, 'zh-TW'), false);

    assert.equal(hasCompletedOnboarding({
        gender: 'female',
        age: '31',
        height: '165',
        weight: '61.2',
        activity: '1.375',
        goalType: 'maintain',
        region: 'taiwan',
        diningOutFrequency: 'sometimes'
    }, 'zh-TW'), true);
});

test('calculateProfilePlan returns null when required metrics are missing', () => {
    assert.equal(calculateProfilePlan({
        gender: 'male',
        age: 0,
        height: 175,
        weight: 72,
        activity: 1.55,
        goalType: 'maintain'
    }), null);
});

test('calculateProfilePlan derives TDEE and goal-aware nutrition targets', () => {
    const losePlan = calculateProfilePlan({
        gender: 'female',
        age: 31,
        height: 165,
        weight: 61.2,
        activity: 1.375,
        goalType: 'lose',
        mealMode: '3'
    });
    const gainPlan = calculateProfilePlan({
        gender: 'female',
        age: 31,
        height: 165,
        weight: 61.2,
        activity: 1.375,
        goalType: 'gain',
        mealMode: '3'
    });

    assert.equal(losePlan.tdee, 1825);
    assert.equal(losePlan.targetCalories, 1327);
    assert.equal(losePlan.macroGoals.protein, 122);
    assert.equal(gainPlan.tdee, 1825);
    assert.equal(gainPlan.targetCalories, 2075);
    assert.equal(gainPlan.macroGoals.protein, 135);
    assert.ok(gainPlan.macroGoals.carb > losePlan.macroGoals.carb);
});
