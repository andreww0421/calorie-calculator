import test from 'node:test';
import assert from 'node:assert/strict';

import { getLocalDateString } from '../js/utils.js';

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

async function loadLocaleModule() {
    globalThis.localStorage = createStorageMock();
    return import(`../js/ui/locale-ui.js?test=${Date.now()}-${Math.random()}`);
}

test('getExtraUiText exposes locale metadata and onboarding copy', async () => {
    const { getExtraUiText } = await loadLocaleModule();
    const english = getExtraUiText('en');
    const arabic = getExtraUiText('ar');

    assert.equal(english.direction, 'ltr');
    assert.equal(arabic.direction, 'rtl');
    assert.match(english.emptyStateTitle, /first meal/i);
    assert.match(arabic.aiGuideTitle, /[\u0600-\u06FF]/);
});

test('getDisplayDateLabel localizes today and falls back when date is missing', async () => {
    const { getDisplayDateLabel } = await loadLocaleModule();
    const today = getLocalDateString();

    assert.equal(getDisplayDateLabel(today, 'en'), 'Today');
    assert.equal(getDisplayDateLabel(today, 'ar'), 'اليوم');
    assert.ok(getDisplayDateLabel('', 'en').length > 0);
});

test('formatNutritionInline uses translated nutrient labels', async () => {
    const { formatNutritionInline } = await loadLocaleModule();
    const summary = formatNutritionInline({
        calories: 245,
        protein: 18.5,
        fat: 7,
        carbohydrate: 29
    }, {
        cal: 'Calories',
        pro: 'Protein',
        fat: 'Fat',
        carb: 'Carb'
    });

    assert.equal(summary, 'Calories: 245 | Protein: 18.5g | Fat: 7g | Carb: 29g');
});
