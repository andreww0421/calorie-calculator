import test from 'node:test';
import assert from 'node:assert/strict';

import {
    buildDailyCoaching,
    buildGoalInsights,
    buildWeeklySummary,
    calculateNutritionTargets,
    calculateMacroGoals,
    getMealPlan,
    summarizeNutrition
} from '../js/domain/nutrition-domain.js';

test('getMealPlan resolves meal ratios and suggested calories', () => {
    const meals = getMealPlan('3', {
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        dinner: 'Dinner'
    }, 1800);

    assert.equal(meals.length, 3);
    assert.equal(meals[0].suggestedCalories, 540);
    assert.equal(meals[1].title, 'Lunch');
});

test('calculateMacroGoals uses target calories', () => {
    const goals = calculateMacroGoals(2000);
    assert.deepEqual(goals, {
        protein: 100,
        fat: 67,
        carb: 250,
        sugar: 50,
        saturatedFat: 22
    });
});

test('calculateNutritionTargets adapts calories and protein by goal type', () => {
    const losePlan = calculateNutritionTargets({
        weightKg: 70,
        tdee: 2400,
        bmr: 1600,
        goalType: 'lose'
    });
    const gainPlan = calculateNutritionTargets({
        weightKg: 70,
        tdee: 2400,
        bmr: 1600,
        goalType: 'gain'
    });

    assert.equal(losePlan.targetCalories, 1900);
    assert.equal(losePlan.macroGoals.protein, 140);
    assert.equal(gainPlan.targetCalories, 2650);
    assert.equal(gainPlan.macroGoals.protein, 154);
    assert.ok(gainPlan.macroGoals.carb > losePlan.macroGoals.carb);
});

test('summarizeNutrition aggregates totals and meal buckets', () => {
    const result = summarizeNutrition([
        { type: 'breakfast', nutri: { calories: 300, protein: 20, fat: 8, carbohydrate: 30, fiber: 5 } },
        { type: 'lunch', nutri: { calories: 500, protein: 28, fat: 16, carbohydrate: 45, sodium: 600 } }
    ]);

    assert.equal(result.totals.cal, 800);
    assert.equal(result.totals.pro, 48);
    assert.equal(result.mealTotals.breakfast, 300);
    assert.equal(result.mealTotals.lunch, 500);
});

test('buildWeeklySummary derives weekly aggregates', () => {
    const weekly = buildWeeklySummary([
        { date: '03-20', calories: 0 },
        { date: '03-21', calories: 1200 },
        { date: '03-22', calories: 1500 }
    ]);

    assert.equal(weekly.loggedDays, 2);
    assert.equal(weekly.averageCalories, 1350);
    assert.equal(weekly.bestDayLabel, '03-22');
    assert.equal(weekly.bestDayCalories, 1500);
});

test('buildDailyCoaching identifies protein gaps and weekly stats', () => {
    const coach = buildDailyCoaching({
        total: { cal: 900, pro: 35, fiber: 10, sod: 900 },
        targetCalories: 2000,
        calorieHistory: [
            { date: '03-20', calories: 1200 },
            { date: '03-21', calories: 1300 },
            { date: '03-22', calories: 0 }
        ]
    });

    assert.equal(coach.status, 'protein_gap');
    assert.ok(coach.proteinGap > 0);
    assert.ok(coach.tipKeys.includes('protein_boost'));
    assert.equal(coach.weekly.loggedDays, 2);
});

test('buildGoalInsights tracks adherence and logging streaks', () => {
    const insights = buildGoalInsights({
        calorieHistory: [
            { date: '03-20', calories: 1500 },
            { date: '03-21', calories: 0 },
            { date: '03-22', calories: 1980 },
            { date: '03-23', calories: 1925 },
            { date: '03-24', calories: 2050 }
        ],
        proteinHistory: [
            { date: '03-20', protein: 120 },
            { date: '03-21', protein: 0 },
            { date: '03-22', protein: 145 },
            { date: '03-23', protein: 138 },
            { date: '03-24', protein: 150 }
        ],
        targetCalories: 2000,
        proteinTarget: 150,
        goalType: 'lose'
    });

    assert.equal(insights.windowSize, 5);
    assert.equal(insights.loggedDays, 4);
    assert.equal(insights.calorieTargetDays, 3);
    assert.equal(insights.proteinTargetDays, 3);
    assert.equal(insights.currentStreak, 3);
    assert.equal(insights.bestStreak, 3);
});
