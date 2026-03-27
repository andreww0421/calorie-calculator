import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateProfilePlan, normalizeProfileMetrics } from '../js/domain/profile-domain.js';

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
        mealMode: '3'
    });
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
