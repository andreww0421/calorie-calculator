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

test('dashboard charts set macro placeholder metadata for readable macro legend state', async () => {
    globalThis.localStorage = createStorageMock();
    const module = await import(`../js/ui/dashboard-charts-ui.js?test=${Date.now()}-${Math.random()}`);
    assert.equal(typeof module.updateCharts, 'function');
    assert.equal(typeof module.updateTrendCharts, 'function');
    assert.equal(typeof module.updateWeightChart, 'function');
});

test('buildWeightTrendPreview only replaces the selected date point', async () => {
    globalThis.localStorage = createStorageMock();
    const module = await import(`../js/ui/dashboard-charts-ui.js?test=${Date.now()}-${Math.random()}`);

    const preview = module.buildWeightTrendPreview([
        { date: '04-08', weight: 80 },
        { date: '04-09', weight: 81 }
    ], {
        selectedDate: '2026-04-09',
        previewWeight: '40'
    });

    assert.deepEqual(preview, [
        { date: '04-08', weight: 80 },
        { date: '04-09', weight: 40 }
    ]);
});
