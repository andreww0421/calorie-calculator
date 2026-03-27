import test from 'node:test';
import assert from 'node:assert/strict';

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
