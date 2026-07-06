import { getLocaleTranslations } from '../../../js/locales/index.js';
import { createDailyViewModel } from '../../../js/state/app-state.js';
import { useAppState } from '../hooks/useAppState.js';
import { BookIcon } from '../../home/SectionIcons.jsx';
import { getHistoryUiCopy } from '../../../js/locales/history-ui-copy.js';

const MEAL_ORDER = Object.freeze(['breakfast', 'lunch', 'dinner', 'snack']);
const MEAL_ICONS = Object.freeze({
    breakfast: '\u2615',
    lunch: '\ud83e\udd57',
    dinner: '\ud83c\udf55',
    snack: '\ud83c\udf4e'
});

function formatInt(value) {
    return `${Math.round(Number(value) || 0)}`;
}

function formatOneDecimal(value) {
    const numeric = Math.round((Number(value) || 0) * 10) / 10;
    return Number.isInteger(numeric) ? String(numeric) : numeric.toFixed(1);
}

function resolveHistoryStatus(progress, copy) {
    if (progress >= 90) return copy.statusGreat;
    if (progress >= 60) return copy.statusOnTrack;
    if (progress > 0) return copy.statusKeepGoing;
    return copy.statusStart;
}

function getMealLabel(type, translations) {
    return translations?.meals?.[type] || type;
}

function buildHistoryItems(items = [], untitledMeal = 'Untitled meal') {
    return items
        .map((item, index) => ({
            id: `${String(item?.type || 'snack')}-${index}`,
            index,
            type: String(item?.type || 'snack'),
            name: String(item?.name || '').trim() || untitledMeal,
            calories: Number(item?.nutri?.calories ?? item?.nutri?.cal ?? 0) || 0,
            protein: Number(item?.nutri?.protein ?? item?.nutri?.pro ?? 0) || 0,
            carb: Number(item?.nutri?.carbohydrate ?? item?.nutri?.carb ?? 0) || 0,
            fat: Number(item?.nutri?.fat ?? 0) || 0
        }))
        .sort((left, right) => MEAL_ORDER.indexOf(left.type) - MEAL_ORDER.indexOf(right.type) || left.index - right.index);
}

export default function MainHistoryIsland() {
    const state = useAppState();
    const viewModel = createDailyViewModel(state);
    const translations = getLocaleTranslations(state.curLang);
    const copy = getHistoryUiCopy(state.curLang);
    const totalCalories = Number(viewModel.totals.cal) || 0;
    const targetCalories = Number(viewModel.targetCalories) || 0;
    const progress = targetCalories > 0 ? Math.min(Math.round((totalCalories / targetCalories) * 100), 100) : 0;
    const items = buildHistoryItems(state.foodItems, copy.untitledMeal);

    return (
        <div data-history-react-surface="true">
            <section className="history-summary-card">
                <div className="history-summary-card__copy">
                    <div className="section-kicker-row">
                        <span className="section-kicker-icon" aria-hidden="true"><BookIcon /></span>
                        <div className="section-kicker">{copy.dailySummary}</div>
                    </div>
                    <div className="history-summary-card__total">{`${formatInt(totalCalories)} cal`}</div>
                    <div className="history-summary-card__target">
                        {targetCalories > 0 ? copy.ofTarget(formatInt(targetCalories)) : copy.setGoal}
                    </div>
                    <div className="history-summary-card__status">{resolveHistoryStatus(progress, copy)}</div>
                    <div className="history-summary-card__macro-row">
                        <div className="history-summary-card__macro">
                            <span className="history-summary-card__macro-label">{copy.protein}</span>
                            <span>{`${formatOneDecimal(viewModel.totals.pro)}g`}</span>
                        </div>
                        <div className="history-summary-card__macro">
                            <span className="history-summary-card__macro-label">{copy.carbs}</span>
                            <span>{`${formatOneDecimal(viewModel.totals.carb)}g`}</span>
                        </div>
                        <div className="history-summary-card__macro">
                            <span className="history-summary-card__macro-label">{copy.fats}</span>
                            <span>{`${formatOneDecimal(viewModel.totals.fat)}g`}</span>
                        </div>
                    </div>
                </div>
                <div className="history-summary-ring" style={{ '--history-progress': `${progress}%` }}>
                    <div className="history-summary-ring__inner">
                        <span>{`${progress}%`}</span>
                    </div>
                </div>
            </section>

            <div className="history-entry-list">
                {items.length > 0 ? items.map((item) => (
                    <article key={item.id} className="history-log-card">
                        <div className={`history-log-card__icon history-log-card__icon--${item.type}`}>
                            {MEAL_ICONS[item.type] || '\ud83c\udf7d'}
                        </div>
                        <div className="history-log-card__body">
                            <div className="history-log-card__head">
                                <div className="history-log-card__title">{item.name}</div>
                                <div className="history-log-card__calories">{`${formatInt(item.calories)} cal`}</div>
                            </div>
                            <div className="history-log-card__meta">{getMealLabel(item.type, translations)}</div>
                            <div className="history-log-card__stats">
                                <span className="history-log-card__stat history-log-card__stat--protein">{`${formatOneDecimal(item.protein)}g ${copy.proteinSuffix}`}</span>
                                <span className="history-log-card__stat history-log-card__stat--carb">{`${formatOneDecimal(item.carb)}g ${copy.carbsSuffix}`}</span>
                                <span className="history-log-card__stat history-log-card__stat--fat">{`${formatOneDecimal(item.fat)}g ${copy.fatSuffix}`}</span>
                            </div>
                        </div>
                    </article>
                )) : (
                    <div className="history-empty-state">
                        <div className="history-empty-state__title">{copy.emptyTitle}</div>
                        <p className="history-empty-state__copy">
                            {copy.emptyCopy}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
