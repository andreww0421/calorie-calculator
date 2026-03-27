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

async function loadModules() {
    globalThis.localStorage = createStorageMock();
    const appActions = await import('../js/state/app-actions.js');
    const appState = await import('../js/state/app-state.js');
    return { appActions, appState };
}

test('dispatchAppAction updates language, date, foods, favorites, AI draft, and profile state', async () => {
    const { appActions, appState } = await loadModules();

    appActions.dispatchAppAction('SET_LANGUAGE', { lang: 'en' });
    let state = appState.getAppState();
    assert.equal(state.curLang, 'en');

    appActions.dispatchAppAction('SET_THEME', { theme: 'dark' });
    state = appState.getAppState();
    assert.equal(state.curTheme, 'dark');

    appActions.dispatchAppAction('SET_SELECTED_DATE', { date: '2026-03-27' });
    state = appState.getAppState();
    assert.equal(state.selectedDate, '2026-03-27');

    appActions.dispatchAppAction('ADD_FOOD_ITEM', {
        entry: {
            type: 'breakfast',
            name: 'Protein Yogurt',
            nutri: {
                calories: 180,
                protein: 25,
                fat: 2,
                carbohydrate: 14
            }
        }
    });
    state = appState.getAppState();
    assert.equal(state.foodItems.length, 1);
    assert.equal(state.foodItems[0].name, 'Protein Yogurt');

    appActions.dispatchAppAction('DELETE_FOOD_ITEM', { index: 0 });
    state = appState.getAppState();
    assert.equal(state.foodItems.length, 0);

    appActions.dispatchAppAction('ADD_FAVORITE', {
        favorite: {
            name: 'Chicken Bowl',
            nutri: {
                calories: 520,
                protein: 40,
                fat: 12,
                carbohydrate: 44
            }
        }
    });
    state = appState.getAppState();
    assert.equal(state.favoriteFoods.length, 1);
    assert.equal(state.favoriteFoods[0].name, 'Chicken Bowl');

    appActions.dispatchAppAction('SET_TEMP_AI_RESULT', {
        result: {
            name: 'AI Shake',
            nutri: {
                calories: 260,
                protein: 32,
                fat: 6,
                carbohydrate: 18
            },
            items: [{ name: 'Milk', weight: '250' }]
        },
        saved: false
    });
    state = appState.getAppState();
    assert.equal(state.tempAIResult?.name, 'AI Shake');
    assert.equal(state.tempAIResultSaved, false);

    appActions.dispatchAppAction('APPLY_PROFILE_PLAN', {
        profile: {
            gender: 'female',
            age: '31',
            height: '165',
            weight: '61.2',
            activity: '1.375',
            mealMode: '3',
            goalType: 'gain'
        },
        goalType: 'gain',
        targetCalories: 2075,
        persist: true
    });
    state = appState.getAppState();
    assert.equal(state.profile?.goalType, 'gain');
    assert.equal(state.currentMealMode, '3');
    assert.equal(state.currentGoalType, 'gain');
    assert.equal(state.targetCalories, 2075);
    assert.ok(globalThis.localStorage.getItem('myFavorites')?.includes('Chicken Bowl'));
    assert.ok(globalThis.localStorage.getItem('myProfile_v5')?.includes('"goalType":"gain"'));
});
