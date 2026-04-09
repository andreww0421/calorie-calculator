import test from 'node:test';
import assert from 'node:assert/strict';

function createStorageMock() {
    const data = new Map();
    return {
        getItem(key) {
            return data.has(key) ? data.get(key) : null;
        },
        setItem(key, value) {
            data.set(String(key), String(value));
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

function createElement(initial = {}) {
    const children = [];
    return {
        value: initial.value ?? '',
        style: initial.style ?? {},
        innerText: '',
        textContent: '',
        dataset: {},
        children,
        focus() {},
        appendChild(child) {
            children.push(child);
            return child;
        },
        removeChild(child) {
            const index = children.indexOf(child);
            if (index >= 0) children.splice(index, 1);
        },
        remove() {},
        querySelector() {
            return null;
        },
        classList: {
            add() {},
            remove() {},
            toggle() { return false; }
        },
        addEventListener() {},
        removeEventListener() {}
    };
}

test('saveCurrentWeight refreshes loggedWeight immediately for the selected date', async () => {
    globalThis.localStorage = createStorageMock();
    globalThis.alert = () => {};
    globalThis.confirm = () => true;
    globalThis.requestAnimationFrame = (callback) => {
        callback();
        return 0;
    };

    const elements = new Map([
        ['daily-weight-input', createElement({ value: '40' })],
        ['weight', createElement({ value: '80' })],
        ['goal-result', createElement({ style: { display: 'none' } })],
        ['gender', createElement({ value: 'male' })],
        ['age', createElement({ value: '25' })],
        ['height', createElement({ value: '170' })],
        ['activity', createElement({ value: '1.2' })],
        ['goal-type', createElement({ value: 'lose' })],
        ['meal-mode', createElement({ value: '4' })],
        ['region', createElement({ value: 'tw' })],
        ['dining-out-frequency', createElement({ value: 'sometimes' })]
    ]);

    globalThis.document = {
        body: {
            dataset: {},
            classList: { add() {}, remove() {}, contains() { return false; } },
            appendChild() {},
            removeChild() {}
        },
        documentElement: { lang: 'zh-TW', dir: 'ltr' },
        getElementById(id) {
            return elements.get(id) ?? null;
        },
        querySelector(selector) {
            if (selector === '.toast-container') return null;
            return null;
        },
        querySelectorAll() {
            return [];
        },
        createElement() {
            return createElement();
        }
    };

    const stateModule = await import('../js/state/app-state.js');
    stateModule.initializeAppState({
        selectedDate: '2026-04-09',
        profile: {
            gender: 'male',
            age: '25',
            height: '170',
            weight: '80',
            activity: '1.2',
            mealMode: '4',
            goalType: 'lose',
            region: 'tw',
            diningOutFrequency: 'sometimes'
        }
    });

    const controllerModule = await import(`../js/controllers/profile-controller.js?test=${Date.now()}-${Math.random()}`);
    const result = controllerModule.saveCurrentWeight();

    assert.equal(result, true);
    assert.equal(stateModule.getAppState().loggedWeight, 40);
    assert.equal(elements.get('weight').value, '40');
});
