import test from 'node:test';
import assert from 'node:assert/strict';
import { getLocalDateString, shiftLocalDateString } from '../js/utils.js';

function createStorageMock() {
    const data = new Map();
    return {
        getItem(key) {
            return data.has(key) ? data.get(key) : null;
        },
        setItem(key, value) {
            data.set(key, String(value));
        },
        removeItem(key) {
            data.delete(key);
        },
        clear() {
            data.clear();
        },
        key(index) {
            return [...data.keys()][index] ?? null;
        },
        get length() {
            return data.size;
        }
    };
}

async function loadAppStateModule() {
    globalThis.localStorage = createStorageMock();
    return import(`../js/state/app-state.js?test=${Date.now()}-${Math.random()}`);
}

test('createDailyViewModel derives totals, water target, and profile goal context', async () => {
    const { createDailyViewModel } = await loadAppStateModule();
    const viewModel = createDailyViewModel({
        selectedDate: '2026-03-27',
        curLang: 'en',
        currentGoalType: 'gain',
        targetCalories: 2400,
        profile: { weight: '70' },
        foodItems: [
            {
                type: 'breakfast',
                name: 'Oats',
                nutri: { calories: 320, protein: 18, fat: 6, carbohydrate: 48, fiber: 7 }
            },
            {
                type: 'lunch',
                name: 'Chicken Bowl',
                nutri: { calories: 540, protein: 42, fat: 12, carbohydrate: 51, sodium: 720 }
            }
        ]
    });

    assert.equal(viewModel.selectedDate, '2026-03-27');
    assert.equal(viewModel.goalType, 'gain');
    assert.equal(viewModel.targetCalories, 2400);
    assert.equal(viewModel.profileWeight, 70);
    assert.equal(viewModel.waterTarget, 2450);
    assert.equal(viewModel.totals.cal, 860);
    assert.equal(viewModel.totals.pro, 60);
    assert.equal(viewModel.mealTotals.breakfast, 320);
    assert.equal(viewModel.mealTotals.lunch, 540);
});

test('app state snapshots clone nutrition data and preserve backward-compatible fields', async () => {
    const { initializeAppState, getAppState } = await loadAppStateModule();
    const source = {
        selectedDate: '2026-03-29',
        foodItems: [
            {
                type: 'breakfast',
                name: 'Legacy Shake',
                cal: 210,
                nutri: {
                    protein: 24,
                    fat: 3,
                    carb: 18,
                    sugar: 7,
                    sod: 190,
                    sat: 1.2,
                    trans: 0,
                    fiber: 2
                }
            }
        ],
        tempAIResult: {
            name: 'AI Bowl',
            nutri: {
                calories: 480,
                protein: 30,
                fat: 14,
                carbohydrate: 52,
                fiber: 8
            },
            correctionHistory: [{
                type: 'item:add',
                timestamp: '2026-03-31T00:00:00.000Z',
                itemIndex: 0
            }]
        },
        profile: {
            gender: 'female',
            age: '31',
            height: '165',
            weight: '61.2',
            activity: '1.375',
            mealMode: '3',
            goalType: 'gain',
            region: 'hong-kong',
            diningOutFrequency: 'often'
        }
    };

    initializeAppState(source);
    source.foodItems[0].nutri.protein = 0;
    source.tempAIResult.nutri.fiber = 0;
    source.tempAIResult.correctionHistory[0].type = 'mutated';
    source.profile.region = 'taiwan';

    const state = getAppState();
    assert.equal(state.foodItems[0].nutri.calories, 210);
    assert.equal(state.foodItems[0].nutri.protein, 24);
    assert.equal(state.foodItems[0].nutri.carbohydrate, 18);
    assert.equal(state.foodItems[0].nutri.sodium, 190);
    assert.equal(state.foodItems[0].nutri.saturatedFat, 1.2);
    assert.equal(state.tempAIResult.nutri.fiber, 8);
    assert.equal(state.tempAIResult.correctionHistory[0].type, 'item:add');
    assert.equal(state.profile.region, 'hong-kong');
    assert.equal(state.profile.diningOutFrequency, 'often');
});

test('createDailyViewModel anchors calorie history to the selected date', async () => {
    const { createDailyViewModel } = await loadAppStateModule();
    const today = getLocalDateString();
    const yesterday = shiftLocalDateString(today, -1);
    const twoDaysAgo = shiftLocalDateString(today, -2);

    globalThis.localStorage.setItem(`record_${today}`, JSON.stringify([{
        type: 'snack',
        name: 'Today Override',
        nutri: { calories: 999 }
    }]));
    globalThis.localStorage.setItem(`record_${yesterday}`, JSON.stringify([{
        type: 'lunch',
        name: 'Yesterday Lunch',
        nutri: { calories: 420 }
    }]));
    globalThis.localStorage.setItem(`record_${twoDaysAgo}`, JSON.stringify([{
        type: 'dinner',
        name: 'Earlier Dinner',
        nutri: { calories: 610 }
    }]));

    const viewModel = createDailyViewModel({
        selectedDate: yesterday,
        curLang: 'en',
        currentGoalType: 'maintain',
        targetCalories: 2200,
        profile: { weight: '60' },
        foodItems: JSON.parse(globalThis.localStorage.getItem(`record_${yesterday}`))
    });

    const recentCalories = viewModel.calorieHistory.slice(-2).map((entry) => entry.calories);
    assert.deepEqual(recentCalories, [610, 420]);
});
