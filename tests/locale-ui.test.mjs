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

test('getExtraUiText exposes clean locale metadata and onboarding copy', async () => {
    const { getExtraUiText } = await loadLocaleModule();
    const english = getExtraUiText('en');
    const arabic = getExtraUiText('ar');
    const zhTW = getExtraUiText('zh-TW');
    const zhCN = getExtraUiText('zh-CN');
    const ja = getExtraUiText('ja');
    const ko = getExtraUiText('ko');

    assert.equal(english.direction, 'ltr');
    assert.equal(arabic.direction, 'rtl');
    assert.equal(zhTW.metaTitle, 'Woof Cal 汪卡管家');
    assert.equal(zhTW.dailySummaryEmpty, '開始記下今天的飲食吧');
    assert.equal(zhCN.dailySummaryEmpty, '开始记下今天的饮食吧');
    assert.equal(ja.dailySummaryEmpty, '今日の食事を記録しましょう');
    assert.equal(ko.dailySummaryEmpty, '오늘 식사를 기록해 보세요');
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

test('buildMealRhythmContent returns supportive rhythm copy', async () => {
    const { buildMealRhythmContent } = await loadLocaleModule();
    const content = buildMealRhythmContent({
        focus: 'dinner_balance',
        breakfast: {
            status: 'building',
            breakfastDays: 4,
            loggedDays: 7
        },
        dinner: {
            status: 'heavy',
            heavyDays: 4,
            loggedDays: 7,
            averageDinnerShare: 52
        },
        protein: {
            status: 'building',
            targetDays: 3,
            loggedDays: 7,
            averageProtein: 86
        },
        hydration: {
            status: 'placeholder',
            available: false
        }
    }, 'en');

    assert.match(content.title, /Meal Rhythm/i);
    assert.match(content.headline, /Dinner/i);
    assert.equal(content.signals.length, 4);
    assert.match(content.signals[3].text, /Hydration rhythm/i);
});

test('buildNutritionFocusContent returns consumer-friendly nutrition focus copy', async () => {
    const { buildNutritionFocusContent } = await loadLocaleModule();
    const content = buildNutritionFocusContent({
        focusKey: 'protein',
        loggedDays: 6,
        signals: [
            { key: 'protein', current: 46, target: 96, average: 58 },
            { key: 'fiber', current: 14, target: 25, average: 18 },
            { key: 'sodium', current: 1680, target: 2300, average: 1820 }
        ]
    }, 'en');

    assert.match(content.title, /Nutrition focus/i);
    assert.match(content.headline, /Protein/i);
    assert.equal(content.signals.length, 3);
    assert.match(content.signals[0].value, /46\/96g/);
    assert.match(content.signals[0].detail, /7-day avg 58g/i);
});

test('getNutritionUiText exposes clean detailed nutrition copy across locales', async () => {
    const { getNutritionUiText } = await loadLocaleModule();
    const zhTW = getNutritionUiText('zh-TW');
    const ja = getNutritionUiText('ja');
    const ko = getNutritionUiText('ko');
    const ar = getNutritionUiText('ar');

    assert.equal(zhTW.detail.overviewTitle, '營養快覽');
    assert.equal(zhTW.detail.sections.fatDetails.title, '脂肪細節');
    assert.ok(!zhTW.detail.sections.fatDetails.summary.includes('不用一次塞太多資訊'));
    assert.match(zhTW.detail.sections.fatDetails.summary, /脂肪來源|油脂負擔/);
    assert.equal(ja.detail.sections.fatDetails.title, '脂質の内訳');
    assert.equal(ko.detail.sections.fatDetails.title, '지방 세부 구성');
    assert.match(ar.detail.sections.fatDetails.title, /[\u0600-\u06FF]/);
});

test('buildHomeCompanionContent returns warm home hierarchy copy', async () => {
    const { buildHomeCompanionContent } = await loadLocaleModule();
    const content = buildHomeCompanionContent({
        goalType: 'maintain',
        presetRegionLabel: 'Taiwan',
        presetCount: 3,
        featuredPresetName: 'Bubble Milk Tea',
        proteinCurrent: 46,
        proteinTarget: 96,
        proteinRemaining: 50,
        mealCoverage: {
            loggedMeals: 2,
            plannedMeals: 4,
            nextMealTitleKey: 'dinner'
        },
        pet: {
            progress: {
                streak: 3
            }
        }
    }, 'en');

    assert.match(content.hero.title, /2\/4/i);
    assert.match(content.hero.actions.ai, /AI Analysis/i);
    assert.match(content.hero.actions.log, /Add a meal/i);
    assert.match(content.hero.actions.favorites, /Favorites/i);
    assert.equal(content.hero.stats.length, 3);
    assert.equal(content.hero.meta.length, 2);
    assert.equal(content.overview.signals.length, 2);
    assert.match(content.overview.signals[0].detail, /50g to today/i);
    assert.match(content.logHub.title, /Log/i);
    assert.match(content.logHub.commonFoodsButton, /Common foods/i);
    assert.match(content.logHub.commonFoodsCopy, /familiar/i);
    assert.match(content.logHub.favoritesButton, /Favorites/i);
    assert.match(content.logHub.manualButton, /Manual/i);
    assert.match(content.logHub.manualModalTitle, /Manual meal entry/i);
    assert.match(content.logHub.todayMealsTitle, /Today's meals/i);
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
