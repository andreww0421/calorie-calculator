import { getHomeUiCopy } from '../../js/locales/home-ui-copy.js';
import { getLocaleTranslations } from '../../js/locales/index.js';
import {
    buildHomeCompanionContent,
    getDisplayDateLabel
} from '../../js/ui/locale-ui.js';
import { createHomeCompanionViewModel } from '../../js/state/app-selectors.js';
import { getLocalDateString } from '../../js/utils.js';

const MEAL_ORDER = ['breakfast', 'lunch', 'dinner', 'snack'];
const HOME_SURFACE_COPY = Object.freeze({
    en: Object.freeze({
        nutritionSummaryTitle: 'Nutrition summary',
        nutritionSummaryHint: 'See today\'s macro balance at a glance, then open all 8 nutrient details.',
        nutritionSummaryCta: 'Open the full nutrition summary',
        mealDiaryTitle: 'Meal diary',
        mealDiaryHint: 'Meals you log stay organized here so Home stays easy to scan.',
        nutrientCountLabel: '8 nutrients'
    }),
    'zh-TW': Object.freeze({
        nutritionSummaryTitle: '營養摘要',
        nutritionSummaryHint: '先快速看今天的三大營養素，再打開完整 8 項營養資訊。',
        nutritionSummaryCta: '查看完整營養摘要',
        mealDiaryTitle: '餐點日記',
        mealDiaryHint: '今天記錄的餐點都整理在這裡，讓首頁保持乾淨好讀。',
        nutrientCountLabel: '8 項營養'
    }),
    'zh-CN': Object.freeze({
        nutritionSummaryTitle: '营养摘要',
        nutritionSummaryHint: '先快速看今天的三大营养素，再打开完整 8 项营养信息。',
        nutritionSummaryCta: '查看完整营养摘要',
        mealDiaryTitle: '餐点日记',
        mealDiaryHint: '今天记录的餐点都整理在这里，让首页保持干净好读。',
        nutrientCountLabel: '8 项营养'
    })
});

const PET_STATUS_LABELS = Object.freeze({
    en: Object.freeze({
        hungry: 'Waiting for the first bite',
        low: 'Warming up',
        mid: 'Sniffing the next meal',
        balanced: 'Happy and balanced',
        full: 'Full and resting',
        sleeping: 'Sleepy companion',
        lonely: 'Missed you',
        starving: 'Very hungry',
        excited: 'Daily quests complete',
        celebrating: 'Level-up mood',
        default: 'Companion mode'
    }),
    'zh-TW': Object.freeze({
        hungry: '等第一口飯飯',
        low: '開始有精神',
        mid: '正在尋找下一餐',
        balanced: '開心又穩定',
        full: '吃飽休息中',
        sleeping: '睏睏陪伴中',
        lonely: '好想你',
        starving: '肚子很餓',
        excited: '今日任務完成',
        celebrating: '升級開心中',
        default: '陪伴模式'
    }),
    'zh-CN': Object.freeze({
        hungry: '等第一口饭饭',
        low: '开始有精神',
        mid: '正在寻找下一餐',
        balanced: '开心又稳定',
        full: '吃饱休息中',
        sleeping: '困困陪伴中',
        lonely: '好想你',
        starving: '肚子很饿',
        excited: '今日任务完成',
        celebrating: '升级开心中',
        default: '陪伴模式'
    })
});

function toSafeText(value, fallback = '') {
    if (value === null || value === undefined) return fallback;
    return String(value);
}

function getPetStatusLabels(lang = 'en') {
    return PET_STATUS_LABELS[lang]
        || PET_STATUS_LABELS[String(lang || 'en').split('-')[0]]
        || PET_STATUS_LABELS.en;
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

function getFavoriteActionLabel(lang) {
    if (lang === 'zh-TW') return '加入常吃';
    if (lang === 'zh-CN') return '加入常吃';
    return 'Save favorite';
}

function getDeleteActionLabel(lang) {
    if (lang === 'zh-TW') return '刪除餐點';
    if (lang === 'zh-CN') return '删除餐点';
    return 'Delete meal';
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

    const todayMeals = (companion.daily?.foodItems || [])
        .map((item, index) => {
            const nutri = item?.nutri || item?.nutrition || {};
            const calories = Number(nutri?.calories ?? nutri?.cal ?? 0) || 0;
            const mealType = String(item?.type || 'snack');

            return {
                id: `${mealType}-${index}-${String(item?.name || 'meal')}`.replace(/\s+/g, '-').toLowerCase(),
                sourceIndex: index,
                name: toSafeText(item?.name || item?.foodName, ''),
                mealType,
                mealTypeLabel: getMealTypeLabel(mealType, companion.lang),
                calories,
                portion: toSafeText(item?.weight || item?.portion || '', ''),
                hint: calories > 0 ? `${Math.round(calories)} kcal` : t?.txtNoData || ''
            };
        })
        .filter((item) => item.name || item.calories > 0);

    const todayMealGroups = buildTodayMealGroups(todayMeals, companion.lang, islandCopy.emptyMeal);
    const todayDateLabel = getDisplayDateLabel(state.selectedDate, companion.lang);
    const maxDate = getLocalDateString();
    const todayMealCalories = todayMeals.reduce((sum, item) => sum + item.calories, 0);
    const proteinValue = roundDisplayValue(companion.daily?.totals?.pro, 1);
    const fatValue = roundDisplayValue(companion.daily?.totals?.fat, 1);
    const carbValue = roundDisplayValue(companion.daily?.totals?.carb, 1);

    return {
        companion: {
            ...companion,
            pet: {
                ...companion.pet,
                resolvedMessage: toSafeText(t?.[companion.pet?.messageKey], '') || toSafeText(companion.pet?.messageKey, ''),
                equipped: companion.pet?.equipped || {},
                nutrition: {
                    calorieProgressPercent: Number(companion.calorieProgressPercent) || 0,
                    proteinPercent: companion.proteinTarget > 0
                        ? Math.min(Math.round((companion.proteinCurrent / companion.proteinTarget) * 100), 199)
                        : 0,
                    proteinCurrent: companion.proteinCurrent,
                    proteinTarget: companion.proteinTarget,
                    loggedMeals: Number(companion.mealCoverage?.loggedMeals) || 0,
                    plannedMeals: Number(companion.mealCoverage?.plannedMeals) || 0,
                    nextMealType: getMealTypeLabel(companion.mealCoverage?.nextMealType, companion.lang)
                }
            }
        },
        petStageCopy: {
            pet: islandCopy.pet || 'Companion',
            kicker: toSafeText(islandCopy.petStage?.kicker, islandCopy.pet || 'Companion'),
            bondLabel: toSafeText(islandCopy.petStage?.bondLabel, t?.petBondLabel || 'Bond'),
            energyLabel: toSafeText(islandCopy.petStage?.energyLabel, t?.petEnergyLabel || 'Energy'),
            streakLabel: toSafeText(islandCopy.petStage?.streakLabel, t?.petStreakLabel || 'Streak'),
            dayUnit: toSafeText(islandCopy.petStage?.dayUnit, t?.petDayUnit || 'd'),
            petTapLabel: toSafeText(islandCopy.petStage?.tapLabel, t?.petTapLabel || 'Interact with your companion'),
            tapHint: toSafeText(islandCopy.petStage?.tapHint, ''),
            nextMealHint: toSafeText(islandCopy.petStage?.nextMealHint, ''),
            feedAction: toSafeText(islandCopy.petStage?.feedAction, homeCopy.hero?.actions?.log || 'Log meal'),
            carePanelLabel: toSafeText(islandCopy.petStage?.carePanelLabel, 'Nutrition status'),
            caloriesLabel: toSafeText(islandCopy.metrics?.calories, 'Calories'),
            proteinLabel: toSafeText(islandCopy.metrics?.protein, 'Protein'),
            mealsLabel: toSafeText(islandCopy.metrics?.meals, 'Meals'),
            statusLabels: getPetStatusLabels(companion.lang)
        },
        resolveDialogText: (key) => toSafeText(t?.[key], ''),
        copy: {
            ...islandCopy,
            favoriteActionLabel: getFavoriteActionLabel(companion.lang),
            deleteActionLabel: getDeleteActionLabel(companion.lang),
            appName: toSafeText(islandCopy.appName, 'Woof Cal'),
            screenTitle: toSafeText(islandCopy.screenTitle, islandCopy.today || 'Today'),
            dailyCaloriesTitle: toSafeText(islandCopy.dailyCaloriesTitle, 'Daily calories'),
            remainingLabel: toSafeText(islandCopy.remainingLabel, 'Remaining'),
            macroFocusEyebrow: toSafeText(islandCopy.macroFocusEyebrow, '3 macro focus'),
            macroFocusTitle: toSafeText(islandCopy.macroFocusTitle, 'Macros'),
            macroFocusHint: toSafeText(islandCopy.macroFocusHint, ''),
            mealDiaryEyebrow: toSafeText(islandCopy.mealDiaryEyebrow, surfaceCopy.mealDiaryTitle),
            previousDate: toSafeText(islandCopy.previousDate, 'Previous date'),
            nextDate: toSafeText(islandCopy.nextDate, 'Next date'),
            headlineEmpty: toSafeText(islandCopy.headlineEmpty, 'Start your first meal'),
            headlineProgress: toSafeText(islandCopy.headlineProgress, 'Nice momentum today'),
            headlineComplete: toSafeText(islandCopy.headlineComplete, 'Great progress today')
        },
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
            kicker: toSafeText(homeCopy.logHub?.todayMealsKicker, islandCopy.today),
            actionLabel: todayDateLabel,
            dateLabel: todayDateLabel,
            dateControl: {
                value: state.selectedDate,
                label: todayDateLabel,
                max: maxDate,
                nextDisabled: state.selectedDate >= maxDate
            },
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
            fatCurrent: Number(fatValue) || 0,
            fatTarget: Number(companion.fatTarget) || 0,
            carbCurrent: Number(carbValue) || 0,
            carbTarget: Number(companion.carbTarget) || 0,
            loggedMeals: Number(companion.mealCoverage?.loggedMeals) || 0,
            plannedMeals: Number(companion.mealCoverage?.plannedMeals) || 0,
            nextMealType: getMealTypeLabel(companion.mealCoverage?.nextMealType, companion.lang),
            nextMealTitleKey: toSafeText(companion.mealCoverage?.nextMealTitleKey, '')
        }
    };
}
