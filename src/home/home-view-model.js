import { getHomeUiCopy } from '../../js/locales/home-ui-copy.js';
import { getLocaleTranslations } from '../../js/locales/index.js';
import {
    buildHomeCompanionContent,
    getDisplayDateLabel
} from '../../js/ui/locale-ui.js';
import { createHomeCompanionViewModel } from '../../js/state/app-selectors.js';

const MEAL_ORDER = ['breakfast', 'lunch', 'dinner', 'snack'];
const HOME_SURFACE_COPY = Object.freeze({
    en: Object.freeze({
        nutritionSummaryTitle: 'Nutrition summary',
        nutritionSummaryHint: 'See today\'s macro balance at a glance, then open all 8 nutrients.',
        nutritionSummaryCta: 'Open the full nutrient summary',
        mealDiaryTitle: 'Meal diary',
        mealDiaryHint: 'Meals you log stay organized here so Home stays easy to scan.',
        nutrientCountLabel: '8 nutrients'
    }),
    'zh-TW': Object.freeze({
        nutritionSummaryTitle: '營養摘要',
        nutritionSummaryHint: '先用圓餅圖看今天三大營養，點開可看完整八大營養。',
        nutritionSummaryCta: '點開查看完整八大營養',
        mealDiaryTitle: '餐點日記',
        mealDiaryHint: '記錄過的餐點會整理在這裡，首頁不用變成表單。',
        nutrientCountLabel: '八大營養'
    }),
    'zh-CN': Object.freeze({
        nutritionSummaryTitle: '营养摘要',
        nutritionSummaryHint: '先用圆饼图看今天三大营养，点开可看完整八大营养。',
        nutritionSummaryCta: '点开查看完整八大营养',
        mealDiaryTitle: '饮食日记',
        mealDiaryHint: '记录过的餐点会整理在这里，首页不用变成表单。',
        nutrientCountLabel: '八大营养'
    })
});

function toSafeText(value, fallback = '') {
    if (value === null || value === undefined) return fallback;
    return String(value);
}

function roundDisplayValue(value, digits = 1) {
    const factor = 10 ** digits;
    return Math.round((Number(value) || 0) * factor) / factor;
}

function getHomeSurfaceCopy(lang = 'en') {
    return HOME_SURFACE_COPY[lang]
        || HOME_SURFACE_COPY[String(lang || 'en').split('-')[0]]
        || HOME_SURFACE_COPY.en;
}

function getMealTypeLabel(type, lang) {
    const t = getLocaleTranslations(lang);
    return t?.meals?.[type] || type || '';
}

function buildTodayMealGroups(items, lang, emptyText) {
    const copy = getHomeUiCopy(lang);
    const groups = MEAL_ORDER.map((mealType) => {
        const mealItems = items.filter((item) => item.mealType === mealType);
        const totalCalories = mealItems.reduce((sum, item) => sum + item.calories, 0);

        return {
            key: mealType,
            label: getMealTypeLabel(mealType, lang),
            totalCalories,
            metaText: mealItems.length > 0 ? copy.mealGroupMeta(mealItems.length, totalCalories) : emptyText,
            items: mealItems,
            emptyText
        };
    });

    const populatedGroups = groups.filter((group) => group.items.length > 0);
    return populatedGroups.length > 0 ? populatedGroups : [];
}

export function buildHomeIslandViewModel(state) {
    const companion = createHomeCompanionViewModel(state);
    const t = getLocaleTranslations(companion.lang);
    const homeCopy = buildHomeCompanionContent(companion, companion.lang);
    const islandCopy = getHomeUiCopy(companion.lang);
    const surfaceCopy = getHomeSurfaceCopy(companion.lang);
    const heroStats = homeCopy.hero?.stats || [];
    const heroMeta = homeCopy.hero?.meta || [];

    const todayMeals = (companion.daily?.foodItems || []).map((item, index) => {
        const nutri = item?.nutri || item?.nutrition || {};
        const calories = Number(nutri?.calories ?? nutri?.cal ?? 0) || 0;
        const mealType = String(item?.type || 'snack');

        return {
            id: `${mealType}-${index}-${String(item?.name || 'meal')}`.replace(/\s+/g, '-').toLowerCase(),
            name: toSafeText(item?.name || item?.foodName, ''),
            mealType,
            mealTypeLabel: getMealTypeLabel(mealType, companion.lang),
            calories,
            portion: toSafeText(item?.weight || item?.portion || '', ''),
            hint: calories > 0 ? `${Math.round(calories)} kcal` : t?.txtNoData || ''
        };
    }).filter((item) => item.name || item.calories > 0);

    const todayMealGroups = buildTodayMealGroups(todayMeals, companion.lang, islandCopy.emptyMeal);
    const todayDateLabel = getDisplayDateLabel(state.selectedDate, companion.lang);
    const todayMealCalories = todayMeals.reduce((sum, item) => sum + item.calories, 0);
    const proteinValue = roundDisplayValue(companion.daily?.totals?.pro, 1);
    const fatValue = roundDisplayValue(companion.daily?.totals?.fat, 1);
    const carbValue = roundDisplayValue(companion.daily?.totals?.carb, 1);

    return {
        companion: {
            ...companion,
            pet: {
                ...companion.pet,
                resolvedMessage: toSafeText(t?.[companion.pet?.messageKey], '') || toSafeText(companion.pet?.messageKey, '')
            }
        },
        copy: islandCopy,
        hero: {
            eyebrow: toSafeText(homeCopy.hero?.eyebrow, ''),
            title: toSafeText(homeCopy.hero?.title, ''),
            summary: toSafeText(homeCopy.hero?.summary, ''),
            stats: heroStats.map((stat) => ({
                label: toSafeText(stat?.label, ''),
                value: toSafeText(stat?.value, '')
            })),
            meta: heroMeta.map((item) => toSafeText(item, '')).filter(Boolean),
            actions: {
                log: toSafeText(homeCopy.hero?.actions?.log, 'Log meal'),
                ai: toSafeText(homeCopy.hero?.actions?.ai, 'AI Analysis'),
                favorites: toSafeText(homeCopy.hero?.actions?.favorites, 'Favorites')
            }
        },
        quickLog: {
            title: toSafeText(homeCopy.logHub?.title, ''),
            summary: toSafeText(homeCopy.logHub?.summary, ''),
            favoritesCopy: toSafeText(homeCopy.logHub?.favoritesCopy, ''),
            todayMealsKicker: toSafeText(homeCopy.logHub?.todayMealsKicker, islandCopy.today),
            todayMealsTitle: toSafeText(homeCopy.logHub?.todayMealsTitle, islandCopy.today),
            todayMealsHint: toSafeText(homeCopy.logHub?.todayMealsHint, '')
        },
        overview: {
            title: toSafeText(homeCopy.overview?.title, ''),
            hint: toSafeText(homeCopy.overview?.hint, ''),
            signals: (homeCopy.overview?.signals || []).map((signal) => ({
                label: toSafeText(signal?.label, ''),
                value: toSafeText(signal?.value, '--'),
                detail: toSafeText(signal?.detail, '')
            }))
        },
        todayMeals: {
            title: surfaceCopy.mealDiaryTitle,
            hint: todayMeals.length > 0
                ? islandCopy.mealGroupMeta(todayMeals.length, todayMealCalories)
                : surfaceCopy.mealDiaryHint,
            kicker: todayDateLabel,
            actionLabel: todayDateLabel,
            dateLabel: todayDateLabel,
            count: todayMeals.length,
            totalCalories: todayMealCalories,
            groups: todayMealGroups
        },
        dashboard: {
            title: surfaceCopy.nutritionSummaryTitle,
            hint: surfaceCopy.nutritionSummaryHint,
            cta: surfaceCopy.nutritionSummaryCta,
            nutrientCountLabel: surfaceCopy.nutrientCountLabel,
            caloriesLabel: t.cal || islandCopy.metrics?.calories || 'Calories',
            caloriesValue: Number(companion.daily?.totals?.cal) || 0,
            remainingCalories: Number(companion.remainingCalories) || 0,
            macros: [
                {
                    key: 'protein',
                    label: t.pro || 'Protein',
                    shortLabel: t.pro || 'Protein',
                    value: proteinValue,
                    unit: 'g',
                    color: '#57a56d'
                },
                {
                    key: 'fat',
                    label: t.fat || 'Fat',
                    shortLabel: t.fat || 'Fat',
                    value: fatValue,
                    unit: 'g',
                    color: '#f0b95d'
                },
                {
                    key: 'carbohydrate',
                    label: t.carb || 'Carb',
                    shortLabel: t.carb || 'Carb',
                    value: carbValue,
                    unit: 'g',
                    color: '#79aef7'
                }
            ]
        },
        today: {
            calories: Number(companion.daily?.totals?.cal) || 0,
            targetCalories: Number(companion.targetCalories) || 0,
            remainingCalories: Number(companion.remainingCalories) || 0,
            calorieProgressPercent: Number(companion.calorieProgressPercent) || 0,
            proteinCurrent: Number(companion.proteinCurrent) || 0,
            proteinTarget: Number(companion.proteinTarget) || 0,
            proteinRemaining: Number(companion.proteinRemaining) || 0,
            loggedMeals: Number(companion.mealCoverage?.loggedMeals) || 0,
            plannedMeals: Number(companion.mealCoverage?.plannedMeals) || 0,
            nextMealType: getMealTypeLabel(companion.mealCoverage?.nextMealType, companion.lang),
            nextMealTitleKey: toSafeText(companion.mealCoverage?.nextMealTitleKey, '')
        }
    };
}
