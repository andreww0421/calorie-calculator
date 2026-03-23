import test from 'node:test';
import assert from 'node:assert/strict';

class MemoryStorage {
    constructor() {
        this.store = new Map();
    }

    get length() {
        return this.store.size;
    }

    key(index) {
        return [...this.store.keys()][index] ?? null;
    }

    getItem(key) {
        return this.store.has(key) ? this.store.get(key) : null;
    }

    setItem(key, value) {
        this.store.set(String(key), String(value));
    }

    removeItem(key) {
        this.store.delete(String(key));
    }

    clear() {
        this.store.clear();
    }
}

function installStorageMock() {
    global.localStorage = new MemoryStorage();
}

test('initializeStorage migrates legacy records, favorites, and profile schema', async () => {
    installStorageMock();

    localStorage.setItem('record_2026-03-24', JSON.stringify([
        {
            type: 'breakfast',
            name: 'Legacy Oatmeal',
            cal: 120,
            protein: 4.5,
            fat: 2,
            carbohydrate: 20
        }
    ]));
    localStorage.setItem('myFavorites', JSON.stringify([
        {
            name: 'Legacy Soup',
            cal: 80,
            protein: 6,
            fat: 1,
            carbohydrate: 10
        }
    ]));
    localStorage.setItem('myProfile_v4', JSON.stringify({
        gender: 'female',
        age: 29,
        height: 165,
        weight: 55,
        activity: '1.375',
        mealMode: '3'
    }));

    const storage = await import(`../js/storage.js?test=${Date.now()}`);
    const result = storage.initializeStorage();

    assert.equal(result.schemaVersion, 3);
    assert.equal(localStorage.getItem('woofCal_schema_version'), '3');
    assert.equal(localStorage.getItem('myProfile_v4'), null);

    const migratedProfile = JSON.parse(localStorage.getItem('myProfile_v5'));
    assert.equal(migratedProfile.mealMode, '3');
    assert.equal(migratedProfile.gender, 'female');

    const migratedRecord = JSON.parse(localStorage.getItem('record_2026-03-24'));
    assert.equal(migratedRecord[0].nutri.calories, 120);
    assert.equal(migratedRecord[0].nutri.fiber, 0);
    assert.equal(migratedRecord[0].nutri.transFat, 0);

    const migratedFavorite = JSON.parse(localStorage.getItem('myFavorites'));
    assert.equal(migratedFavorite[0].nutri.calories, 80);
    assert.equal(migratedFavorite[0].nutri.transFat, 0);
});

test('usage state resets by date and persists normalized counts', async () => {
    installStorageMock();
    const storage = await import(`../js/storage.js?usage=${Date.now()}`);

    const firstLoad = storage.loadUsageState();
    assert.equal(firstLoad.count, 0);

    storage.saveUsageState({ date: firstLoad.date, count: 3 });
    const secondLoad = storage.loadUsageState();
    assert.equal(secondLoad.count, 3);

    storage.saveUsageState({ date: firstLoad.date, count: '7' });
    assert.equal(storage.loadUsageState().count, 7);
});
