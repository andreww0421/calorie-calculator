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
    const analytics = await import('../js/analytics/analytics.js');
    return { appActions, appState, analytics };
}

test('dispatchAppAction updates language, date, foods, favorites, AI draft, and profile state', async () => {
    const { appActions, appState, analytics } = await loadModules();
    analytics.clearTrackedProductEvents();

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
    assert.ok(analytics.getTrackedProductEvents().some((event) => event.name === 'first_log_completed'));

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

    appActions.dispatchAppAction('UPDATE_TEMP_AI_ITEM', {
        index: 0,
        field: 'weight',
        patch: { weight: '300' },
        saved: false,
        syncModal: false,
        trackHistory: true
    });
    state = appState.getAppState();
    assert.equal(state.tempAIResult?.items[0].weight, '300');
    assert.equal(state.tempAIResult?.correctionHistory?.length, 1);
    assert.equal(state.tempAIResult?.correctionHistory?.[0]?.type, 'item:update');
    assert.equal(state.analysisFlow?.status, 'editing');

    appActions.dispatchAppAction('SET_TEMP_AI_ITEMS', {
        items: [
            { name: 'Milk', weight: '300' },
            { name: 'Banana', weight: '100' }
        ],
        saved: false,
        historyEntry: {
            type: 'item:add',
            timestamp: '2026-03-31T00:00:00.000Z',
            itemIndex: 1
        }
    });
    state = appState.getAppState();
    assert.equal(state.tempAIResult?.items.length, 2);
    assert.equal(state.tempAIResult?.correctionHistory?.length, 2);
    assert.equal(state.analysisFlow?.status, 'editing');
    assert.equal(analytics.getTrackedProductEvents().filter((event) => event.name === 'ai_result_corrected').length, 0);

    appActions.dispatchAppAction('SET_TEMP_AI_ITEMS', {
        items: [
            { name: 'Milk', weight: '300' },
            { name: '', weight: '' }
        ],
        saved: false,
        syncModal: false
    });
    state = appState.getAppState();
    assert.equal(state.tempAIResult?.items.length, 2);
    assert.equal(state.tempAIResult?.items[1]?.name, '');

    appActions.dispatchAppAction('SET_TEMP_AI_RESULT', {
        result: {
            name: 'AI Shake Recalc',
            nutri: {
                calories: 310,
                protein: 30,
                fat: 8,
                carbohydrate: 26
            },
            items: [
                { name: 'Milk', weight: '300' },
                { name: 'Banana', weight: '100' }
            ]
        },
        saved: false,
        preserveHistory: true,
        historyEntry: {
            type: 'recalculate',
            timestamp: '2026-03-31T00:05:00.000Z',
            itemCount: 2
        }
    });
    state = appState.getAppState();
    assert.equal(state.tempAIResult?.correctionHistory?.length, 3);
    assert.equal(state.tempAIResult?.correctionHistory?.[2]?.type, 'recalculate');
    assert.equal(analytics.getTrackedProductEvents().filter((event) => event.name === 'ai_result_corrected').length, 1);

    appActions.dispatchAppAction('APPLY_PROFILE_PLAN', {
        profile: {
            gender: 'female',
            age: '31',
            height: '165',
            weight: '61.2',
            activity: '1.375',
            mealMode: '3',
            goalType: 'gain',
            region: 'singapore',
            diningOutFrequency: 'often'
        },
        goalType: 'gain',
        targetCalories: 2075,
        persist: true
    });
    state = appState.getAppState();
    assert.equal(state.profile?.goalType, 'gain');
    assert.equal(state.profile?.region, 'singapore');
    assert.equal(state.profile?.diningOutFrequency, 'often');
    assert.equal(state.currentMealMode, '3');
    assert.equal(state.currentGoalType, 'gain');
    assert.equal(state.targetCalories, 2075);
    assert.equal(state.tempAIResult?.items.length, 2);
    assert.equal(state.tempAIResult?.correctionHistory?.length, 3);
    assert.ok(analytics.getTrackedProductEvents().some((event) => event.name === 'onboarding_completed'));
    assert.ok(globalThis.localStorage.getItem('myFavorites')?.includes('Chicken Bowl'));
    assert.ok(globalThis.localStorage.getItem('myProfile_v5')?.includes('"goalType":"gain"'));
    assert.ok(globalThis.localStorage.getItem('myProfile_v5')?.includes('"region":"singapore"'));
    assert.ok(globalThis.localStorage.getItem('myProfile_v5')?.includes('"diningOutFrequency":"often"'));
});
