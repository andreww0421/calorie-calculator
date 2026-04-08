import { getHomeUiCopy } from '../../js/locales/home-ui-copy.js';
import { getLocaleTranslations } from '../../js/locales/index.js';
import {
    buildHomeCompanionContent,
    getDisplayDateLabel
} from '../../js/ui/locale-ui.js';
import { createHomeCompanionViewModel } from '../../js/state/app-selectors.js';

const MEAL_ORDER = ['breakfast', 'lunch', 'dinner', 'snack'];

function toSafeText(value, fallback = '') {
    if (value === null || value === undefined) return fallback;
    return String(value);
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
            loggedMeals: Number(companion.mealCoverage?.loggedMeals) || 0,
            plannedMeals: Number(companion.mealCoverage?.plannedMeals) || 0,
            nextMealType: getMealTypeLabel(companion.mealCoverage?.nextMealType, companion.lang),
            nextMealTitleKey: toSafeText(companion.mealCoverage?.nextMealTitleKey, '')
        }
    };
}
