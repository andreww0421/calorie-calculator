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

test('buildCoachContent returns localized coach text', async () => {
    const { buildCoachContent } = await loadLocaleModule();
    const coach = buildCoachContent({
        status: 'protein_gap',
        proteinGap: 22,
        tipKeys: ['protein_boost', 'fiber_boost'],
        weekly: {
            averageCalories: 1540,
            loggedDays: 5,
            bestDayLabel: '03-24',
            bestDayCalories: 1820
        }
    }, 'en');

    assert.match(coach.cardTitle, /Daily Coach/i);
    assert.equal(coach.tips.length, 2);
    assert.equal(coach.weeklyStats.length, 3);
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

test('goal UI helpers expose localized goal labels and insight content', async () => {
    const { getGoalUiText, getGoalSummaryText, buildGoalInsightsContent } = await loadLocaleModule();
    const english = getGoalUiText('en');
    const headline = buildGoalInsightsContent({
        goalType: 'gain',
        windowSize: 7,
        loggedDays: 6,
        calorieTargetDays: 4,
        proteinTargetDays: 5,
        currentStreak: 3,
        bestStreak: 4
    }, 'en');

    assert.equal(english.goalTypes.gain, 'Build Muscle');
    assert.equal(getGoalSummaryText('maintain', 'en'), 'Maintain Weight');
    assert.match(headline.headline, /Build Muscle/i);
    assert.equal(headline.stats[0].value, '3d');
    assert.equal(headline.stats[2].value, '4/7');
});
