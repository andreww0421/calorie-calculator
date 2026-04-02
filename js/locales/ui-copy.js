import zhTWUiCopy from './ui-copy-zh-TW.js';
import zhCNUiCopy from './ui-copy-zh-CN.js';
import jaUiCopy from './ui-copy-ja.js';
import koUiCopy from './ui-copy-ko.js';
import arUiCopy from './ui-copy-ar.js';

export const uiCopyCatalog = {
    en: {
        extra: {
            direction: 'ltr',
            todayLabel: 'Today',
            metaTitle: 'Woof Cal - AI Diet Tracker',
            metaOgTitle: 'Woof Cal - AI Diet Tracker',
            metaDescription: 'Use AI to analyze meals from photos or text, then track calories, weight, and nutrition in one lightweight dashboard.',
            dailySummaryHint: 'Tap to view all nutrients',
            dailySummaryEmpty: 'Start logging today\'s meals',
            dailySummaryLeftGoal: (value) => `${value} kcal left to goal`,
            dailySummaryLeftToday: (value) => `${value} kcal left today`,
            dailySummaryOverTarget: (value) => `${value} kcal over target`,
            dailySummaryTitle: (dateText) => `${dateText} Nutrition Summary`,
            remainingLabel: 'Remaining',
            emptyStateEyebrow: 'Quick Start',
            emptyStateTitle: 'Log your first meal today',
            emptyStateBody: 'Snap a meal with AI or add a manual entry to unlock your daily dashboard.',
            emptyMealTitle: 'No foods logged yet',
            emptyMealBody: 'Use AI or manual entry to get started',
            aiGuideEyebrow: 'AI Tips',
            aiGuideTitle: 'Get faster, cleaner AI results',
            aiGuideBody: 'Clear photos and a little extra context help the nutrition analysis stay more accurate.',
            aiGuideTip1: 'Keep the meal visible and avoid blocking the plate',
            aiGuideTip2: 'Add brand names or key ingredients when they matter',
            aiGuideTip3: 'Edit ingredients before recalculating if the result looks off',
            aiItemsRequired: 'Please keep at least one item.'
        },
        goal: {
            goalTypeLabel: 'Goal',
            goalSummaryLabel: 'Current Goal',
            calorieTargetLabel: 'Calorie Target',
            reportTitle: 'Goal Progress',
            reportSubtitle: 'Last 7 days of adherence and logging',
            goalTypes: { lose: 'Lose Weight', maintain: 'Maintain Weight', gain: 'Build Muscle' },
            reportHeadline: (goal) => `${goal} weekly progress`,
            reportSummary: (insights) => `${insights.loggedDays}/7 days logged, calories on target ${insights.calorieTargetDays} days, protein on target ${insights.proteinTargetDays} days`,
            statStreak: 'Current streak',
            statBestStreak: 'Best streak',
            statCalories: 'Calorie goal',
            statProtein: 'Protein goal',
            formatDayCount: (value) => `${value}d`,
            formatWindowCount: (value, total) => `${value}/${total}`
        },
        coach: {
            cardTitle: 'Daily Coach',
            weeklyTitle: 'Last 7 Days',
            headlines: {
                start_logging: 'Build today with the first meal',
                over_target: 'Calories are already trending high',
                near_goal: 'You are close to your target zone',
                protein_gap: 'Protein still needs a boost',
                fiber_gap: 'Fiber can use a lift',
                sodium_high: 'Sodium is running high today',
                steady: 'Today is moving in a solid direction'
            },
            summaries: {
                start_logging: 'Log the first meal and the dashboard can start coaching the rest of your day.',
                over_target: (coach) => `You are about ${coach.overCalories} kcal over target, so the next meal should stay lighter.`,
                near_goal: (coach) => `Only about ${coach.remainingCalories} kcal remain, so snacks should stay modest.`,
                protein_gap: (coach) => `You are still about ${coach.proteinGap}g short of your protein target.`,
                fiber_gap: (coach) => `You are still about ${coach.fiberGap}g short of a strong fiber day.`,
                sodium_high: 'A lighter, less salty next meal will help rebalance the day.',
                steady: 'Calories and nutrients look fairly steady so far. Keep logging.'
            },
            tips: {
                use_ai: 'Use AI photo logging if you want the fastest start.',
                log_first_meal: 'If you are busy, add a quick manual entry with calories and protein first.',
                protein_boost: 'Try eggs, tofu, chicken breast, Greek yogurt, or milk next.',
                fiber_boost: 'Add vegetables, fruit, beans, or whole grains to lift fiber.',
                watch_sodium: 'Drink more water and go lighter on soup, sauce, and packaged foods.',
                portion_reset: 'Cut the next carb or snack portion in half to recover the day.',
                keep_momentum: 'Stay with the current pace and check the summary card again before dinner.'
            },
            weeklyAverage: (value) => `${value} kcal avg`,
            weeklyDays: (days) => `${days} logged days`,
            weeklyBest: (day, cal) => `${day} peak ${cal} kcal`
        },
        rhythm: {
            title: '7-Day Meal Rhythm',
            subtitle: 'A simple read on how this week is flowing.',
            dashboardSubtitle: 'Consistency signals from the last 7 logged days.',
            labels: { breakfast: 'Breakfast', dinner: 'Dinner', protein: 'Protein', hydration: 'Hydration' },
            headlines: {
                start_logging: 'Your weekly rhythm starts with a few logged meals',
                building_consistency: 'You are starting to build a repeatable week',
                steady_week: 'Your meal rhythm looks fairly steady this week',
                breakfast_anchor: 'Breakfast is the clearest place to anchor the week',
                dinner_balance: 'Dinner is carrying a big share of the week right now',
                protein_rhythm: 'Protein rhythm is still moving around day to day'
            },
            summaries: {
                start_logging: 'Log a few meals across the week and this card will start surfacing your routine.',
                building_consistency: 'A few patterns are already visible. Two or three steadier days will make the picture clearer.',
                steady_week: 'Your meals are showing a repeatable rhythm, which makes the rest of the day easier to pace.',
                breakfast_anchor: 'Breakfast is the easiest place to add consistency if you want the day to feel more settled.',
                dinner_balance: 'Dinner is doing a lot of the work this week. A lighter evening once or twice could smooth the rhythm.',
                protein_rhythm: 'Protein intake is landing unevenly across the week. A more repeatable protein anchor would help.'
            },
            breakfast: {
                steady: (signal) => `Logged on ${signal.breakfastDays}/${signal.loggedDays} days with a fairly repeatable start.`,
                building: (signal) => `Breakfast showed up on ${signal.breakfastDays}/${signal.loggedDays} logged days.`,
                irregular: (signal) => `Breakfast only appeared on ${signal.breakfastDays}/${signal.loggedDays} logged days so far.`
            },
            dinner: {
                light: () => 'Dinner is staying on the lighter side this week.',
                balanced: (signal) => `Dinner is averaging about ${signal.averageDinnerShare}% of daily calories.`,
                heavy: (signal) => `Dinner ran heaviest on ${signal.heavyDays}/${signal.loggedDays} logged days.`
            },
            protein: {
                steady: (signal) => `Protein looks fairly steady, averaging ${signal.averageProtein}g a day.`,
                building: (signal) => `${signal.targetDays}/${signal.loggedDays} days landed near your protein pace.`,
                inconsistent: (signal) => `Protein is landing unevenly, with only ${signal.targetDays}/${signal.loggedDays} stronger days.`
            },
            hydration: {
                placeholder: 'Hydration rhythm will show up here once water logging is enabled.'
            }
        }
    },
    'zh-TW': zhTWUiCopy,
    'zh-CN': zhCNUiCopy,
    ja: jaUiCopy,
    ko: koUiCopy,
    ar: arUiCopy
};
