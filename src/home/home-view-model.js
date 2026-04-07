import {
    createDashboardChartsViewModel,
    createHomeCompanionViewModel
} from '../../js/state/app-selectors.js';
import { getLocaleTranslations } from '../../js/locales/index.js';
import {
    buildHomeCompanionContent,
    buildMealRhythmContent,
    buildNutritionFocusContent,
    getDisplayDateLabel
} from '../../js/ui/locale-ui.js';

const MEAL_ORDER = ['breakfast', 'lunch', 'dinner', 'snack'];

function toSafeText(value, fallback = '') {
    if (value === null || value === undefined) return fallback;
    return String(value);
}

function toMetricValue(value, fallback = '--') {
    if (value === null || value === undefined || value === '') {
        return fallback;
    }
    return String(value);
}

function getMealTypeLabel(type, lang) {
    const t = getLocaleTranslations(lang);
    return t?.meals?.[type] || type || '';
}

function buildTodayMealGroups(items, lang, emptyText) {
    return MEAL_ORDER.map((mealType) => {
        const mealItems = items.filter((item) => item.mealType === mealType);

        return {
            key: mealType,
            label: getMealTypeLabel(mealType, lang),
            totalCalories: mealItems.reduce((sum, item) => sum + item.calories, 0),
            items: mealItems,
            emptyText
        };
    });
}

function getIslandCopy(lang = 'en') {
    const copyMap = {
        'zh-TW': {
            quickActions: '\u5feb\u901f\u64cd\u4f5c',
            today: '\u4eca\u65e5\u6458\u8981',
            overview: '\u65e5\u5e38\u91cd\u9ede',
            rhythm: '\u7528\u9910\u7bc0\u594f',
            nutrition: '\u71df\u990a\u7126\u9ede',
            pet: '\u5925\u4f34\u72c0\u614b',
            progress: '\u9032\u5ea6',
            companion: '\u4eca\u5929\u5148\u8a18\u4e0b\u4e00\u9910',
            quickLog: '\u8f15\u9b06\u8a18\u9304\u4eca\u5929\u7684\u98f2\u98df',
            summary: '\u672c\u65e5\u7bc0\u594f\u8207\u71df\u990a\u91cd\u9ede\u6703\u540c\u6b65\u5728\u9019\u88e1\u6574\u7406\u3002',
            open: '\u67e5\u770b',
            changeDate: '\u5207\u63db\u65e5\u671f',
            statusOnTrack: '\u8a08\u756b\u5167',
            statusKeepGoing: '\u7e7c\u7e8c\u4fdd\u6301',
            emptyMeal: '\u9084\u6c92\u6709\u8a18\u9304',
            metrics: {
                calories: '\u71b1\u91cf',
                protein: '\u86cb\u767d\u8cea',
                meals: '\u9910\u6b21'
            }
        },
        'zh-CN': {
            quickActions: '\u5feb\u6377\u64cd\u4f5c',
            today: '\u4eca\u65e5\u6458\u8981',
            overview: '\u65e5\u5e38\u91cd\u70b9',
            rhythm: '\u7528\u9910\u8282\u594f',
            nutrition: '\u8425\u517b\u7126\u70b9',
            pet: '\u4f19\u4f34\u72b6\u6001',
            progress: '\u8fdb\u5ea6',
            companion: '\u4eca\u5929\u5148\u8bb0\u4e0b\u4e00\u9910',
            quickLog: '\u8f7b\u677e\u8bb0\u5f55\u4eca\u5929\u7684\u996e\u98df',
            summary: '\u672c\u65e5\u8282\u594f\u4e0e\u8425\u517b\u91cd\u70b9\u4f1a\u540c\u6b65\u5728\u8fd9\u91cc\u6574\u7406\u3002',
            open: '\u67e5\u770b',
            changeDate: '\u5207\u6362\u65e5\u671f',
            statusOnTrack: '\u8ba1\u5212\u5185',
            statusKeepGoing: '\u7ee7\u7eed\u4fdd\u6301',
            emptyMeal: '\u8fd8\u6ca1\u6709\u8bb0\u5f55',
            metrics: {
                calories: '\u70ed\u91cf',
                protein: '\u86cb\u767d\u8d28',
                meals: '\u9910\u6b21'
            }
        },
        ja: {
            quickActions: 'Quick actions',
            today: 'Today at a glance',
            overview: 'Daily signals',
            rhythm: 'Meal rhythm',
            nutrition: 'Nutrition focus',
            pet: 'Companion status',
            progress: 'Progress',
            companion: 'Start with your first meal today',
            quickLog: 'Log today\'s food in a few taps',
            summary: 'Your rhythm and nutrition highlights live here.',
            open: 'View',
            changeDate: 'Change date',
            statusOnTrack: 'On track',
            statusKeepGoing: 'Keep going',
            emptyMeal: 'Nothing logged yet',
            metrics: {
                calories: 'Calories',
                protein: 'Protein',
                meals: 'Meals'
            }
        },
        ko: {
            quickActions: 'Quick actions',
            today: 'Today at a glance',
            overview: 'Daily signals',
            rhythm: 'Meal rhythm',
            nutrition: 'Nutrition focus',
            pet: 'Companion status',
            progress: 'Progress',
            companion: 'Start with your first meal today',
            quickLog: 'Log today\'s food in a few taps',
            summary: 'Your rhythm and nutrition highlights live here.',
            open: 'View',
            changeDate: 'Change date',
            statusOnTrack: 'On track',
            statusKeepGoing: 'Keep going',
            emptyMeal: 'Nothing logged yet',
            metrics: {
                calories: 'Calories',
                protein: 'Protein',
                meals: 'Meals'
            }
        },
        ar: {
            quickActions: 'Quick actions',
            today: 'Today at a glance',
            overview: 'Daily signals',
            rhythm: 'Meal rhythm',
            nutrition: 'Nutrition focus',
            pet: 'Companion status',
            progress: 'Progress',
            companion: 'Start with your first meal today',
            quickLog: 'Log today\'s food in a few taps',
            summary: 'Your rhythm and nutrition highlights live here.',
            open: 'View',
            changeDate: 'Change date',
            statusOnTrack: 'On track',
            statusKeepGoing: 'Keep going',
            emptyMeal: 'Nothing logged yet',
            metrics: {
                calories: 'Calories',
                protein: 'Protein',
                meals: 'Meals'
            }
        },
        en: {
            quickActions: 'Quick actions',
            today: 'Today at a glance',
            overview: 'Daily signals',
            rhythm: 'Meal rhythm',
            nutrition: 'Nutrition focus',
            pet: 'Companion status',
            progress: 'Progress',
            companion: 'Start with your first meal today',
            quickLog: 'Log today\'s food in a few taps',
            summary: 'Your rhythm and nutrition highlights live here.',
            open: 'View',
            changeDate: 'Change date',
            statusOnTrack: 'On track',
            statusKeepGoing: 'Keep going',
            emptyMeal: 'Nothing logged yet',
            metrics: {
                calories: 'Calories',
                protein: 'Protein',
                meals: 'Meals'
            }
        }
    };

    return copyMap[lang] || copyMap.en;
}

export function buildHomeIslandViewModel(state) {
    const companion = createHomeCompanionViewModel(state);
    const dashboard = createDashboardChartsViewModel(state, { range: 7, weightDays: 30 });
    const t = getLocaleTranslations(companion.lang);
    const homeCopy = buildHomeCompanionContent(companion, companion.lang);
    const rhythmCopy = buildMealRhythmContent(companion.rhythm, companion.lang, { variant: 'home' });
    const nutritionCopy = buildNutritionFocusContent(dashboard.nutritionFocus, companion.lang);
    const islandCopy = getIslandCopy(companion.lang);
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

    return {
        companion,
        dashboard,
        copy: islandCopy,
        hero: {
            eyebrow: toSafeText(homeCopy.hero?.eyebrow, ''),
            title: toSafeText(homeCopy.hero?.title, ''),
            summary: toSafeText(homeCopy.hero?.summary, ''),
            stats: heroStats.map((stat) => ({
                label: toSafeText(stat?.label, ''),
                value: toSafeText(stat?.value, '')
            })),
            meta: heroMeta.map((item) => toSafeText(item, '')),
            actions: {
                log: toSafeText(homeCopy.hero?.actions?.log, 'Log meal'),
                ai: toSafeText(homeCopy.hero?.actions?.ai, 'AI Analysis'),
                favorites: toSafeText(homeCopy.hero?.actions?.favorites, 'Favorites')
            }
        },
        quickLog: {
            title: toSafeText(homeCopy.logHub?.title, ''),
            summary: toSafeText(homeCopy.logHub?.summary, ''),
            commonFoodsButton: toSafeText(homeCopy.logHub?.commonFoodsButton, 'Common foods'),
            commonFoodsCopy: toSafeText(homeCopy.logHub?.commonFoodsCopy, ''),
            favoritesButton: toSafeText(homeCopy.logHub?.favoritesButton, 'Favorites'),
            favoritesCopy: toSafeText(homeCopy.logHub?.favoritesCopy, ''),
            manualButton: toSafeText(homeCopy.logHub?.manualButton, 'Manual entry'),
            manualCopy: toSafeText(homeCopy.logHub?.manualCopy, ''),
            manualModalTitle: toSafeText(homeCopy.logHub?.manualModalTitle, 'Advanced manual entry'),
            manualModalHint: toSafeText(homeCopy.logHub?.manualModalHint, ''),
            todayMealsKicker: toSafeText(homeCopy.logHub?.todayMealsKicker, 'Daily diary'),
            todayMealsTitle: toSafeText(homeCopy.logHub?.todayMealsTitle, 'Today\'s meals'),
            todayMealsHint: toSafeText(homeCopy.logHub?.todayMealsHint, '')
        },
        overview: {
            title: toSafeText(homeCopy.overview?.title, ''),
            hint: toSafeText(homeCopy.overview?.hint, ''),
            signals: (homeCopy.overview?.signals || []).map((signal) => ({
                label: toSafeText(signal?.label, ''),
                value: toMetricValue(signal?.value),
                detail: toSafeText(signal?.detail, '')
            }))
        },
        rhythm: {
            title: toSafeText(rhythmCopy.title, ''),
            subtitle: toSafeText(rhythmCopy.subtitle, ''),
            headline: toSafeText(rhythmCopy.headline, ''),
            summary: toSafeText(rhythmCopy.summary, ''),
            signals: (rhythmCopy.signals || []).map((signal) => ({
                key: toSafeText(signal?.key, ''),
                label: toSafeText(signal?.label, ''),
                text: toSafeText(signal?.text, '')
            }))
        },
        nutrition: {
            title: toSafeText(nutritionCopy.title, ''),
            subtitle: toSafeText(nutritionCopy.subtitle, ''),
            headline: toSafeText(nutritionCopy.headline, ''),
            summary: toSafeText(nutritionCopy.summary, ''),
            signals: (nutritionCopy.signals || []).map((signal) => ({
                key: toSafeText(signal?.key, ''),
                label: toSafeText(signal?.label, ''),
                value: toMetricValue(signal?.value),
                detail: toSafeText(signal?.detail, '')
            }))
        },
        todayMeals: {
            title: toSafeText(homeCopy.logHub?.todayMealsTitle, islandCopy.today),
            hint: toSafeText(homeCopy.logHub?.todayMealsHint, ''),
            kicker: toSafeText(homeCopy.logHub?.todayMealsKicker, islandCopy.today),
            dateLabel: getDisplayDateLabel(state.selectedDate, companion.lang),
            count: todayMeals.length,
            groups: todayMealGroups
        },
        today: {
            calories: Number(companion.daily?.totals?.cal) || 0,
            targetCalories: Number(companion.targetCalories) || 0,
            remainingCalories: Number(companion.remainingCalories) || 0,
            calorieProgressPercent: Number(companion.calorieProgressPercent) || 0,
            proteinCurrent: Number(companion.proteinCurrent) || 0,
            proteinTarget: Number(companion.proteinTarget) || 0,
            proteinRemaining: Number(companion.proteinRemaining) || 0,
            waterTarget: Number(companion.daily?.waterTarget) || 0,
            loggedMeals: Number(companion.mealCoverage?.loggedMeals) || 0,
            plannedMeals: Number(companion.mealCoverage?.plannedMeals) || 0,
            nextMealType: toSafeText(companion.mealCoverage?.nextMealType, ''),
            nextMealTitleKey: toSafeText(companion.mealCoverage?.nextMealTitleKey, '')
        }
    };
}
