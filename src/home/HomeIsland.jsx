import React from 'react';
import { useHomeIslandState } from './useHomeIslandState.js';
import './home-island.css';

function noop() {}

function MetricCard({ label, value, detail }) {
    return (
        <div className="woof-home__metric-card">
            <div className="woof-home__metric-value">{value}</div>
            <div className="woof-home__metric-label">{label}</div>
            {detail ? <div className="woof-home__metric-detail">{detail}</div> : null}
        </div>
    );
}

function InsightCard({ label, value, detail }) {
    return (
        <div className="woof-home__insight-card">
            <div className="woof-home__insight-label">{label}</div>
            <div className="woof-home__insight-value">{value}</div>
            {detail ? <div className="woof-home__insight-detail">{detail}</div> : null}
        </div>
    );
}

function MealRow({ name, calories, portion }) {
    return (
        <div className="woof-home__meal-row">
            <div className="woof-home__meal-row-main">
                <div className="woof-home__meal-name">{name}</div>
                {portion ? <div className="woof-home__meal-portion">{portion}</div> : null}
            </div>
            <div className="woof-home__meal-calories">{calories > 0 ? `${Math.round(calories)} kcal` : '--'}</div>
        </div>
    );
}

function MealGroupCard({ group }) {
    const items = group.items || [];
    const hasItems = items.length > 0;
    const metaText = hasItems
        ? `${items.length} · ${group.totalCalories > 0 ? `${Math.round(group.totalCalories)} kcal` : '--'}`
        : group.emptyText;

    return (
        <div className="woof-home__meal-group">
            <div className="woof-home__meal-group-header">
                <div>
                    <div className="woof-home__meal-type">{group.label}</div>
                    <div className="woof-home__meal-group-meta">{metaText}</div>
                </div>
                {hasItems ? (
                    <div className="woof-home__meal-group-total">
                        {group.totalCalories > 0 ? `${Math.round(group.totalCalories)} kcal` : '--'}
                    </div>
                ) : null}
            </div>
            {hasItems ? (
                <div className="woof-home__meal-list">
                    {items.map((meal) => (
                        <MealRow
                            key={meal.id}
                            name={meal.name}
                            calories={meal.calories}
                            portion={meal.portion}
                        />
                    ))}
                </div>
            ) : (
                <div className="woof-home__meal-group-empty">{group.emptyText}</div>
            )}
        </div>
    );
}

function SectionHeader({ eyebrow, title, hint, action, onAction }) {
    return (
        <div className="woof-home__section-header">
            <div className="woof-home__section-copy">
                {eyebrow ? <div className="woof-home__eyebrow">{eyebrow}</div> : null}
                <h2 className="woof-home__section-title">{title}</h2>
                {hint ? <p className="woof-home__section-hint">{hint}</p> : null}
            </div>
            {action ? (
                <button type="button" className="woof-home__ghost-button" onClick={onAction}>
                    {action}
                </button>
            ) : null}
        </div>
    );
}

function QuickActionButton({ label, hint, onClick, variant = 'secondary' }) {
    return (
        <button
            type="button"
            className={`woof-home__action-button woof-home__action-button--${variant}`}
            onClick={onClick}
        >
            <span className="woof-home__action-label">{label}</span>
            {hint ? <span className="woof-home__action-hint">{hint}</span> : null}
        </button>
    );
}

export function HomeIsland({
    onQuickLog = noop,
    onOpenAI = noop,
    onOpenFavorites = noop,
    onOpenTodayMeals = noop,
    onOpenRhythm = noop
}) {
    const model = useHomeIslandState();
    const { copy, hero, quickLog, overview, rhythm, nutrition, todayMeals, today, companion } = model;
    const overviewSignals = overview.signals || [];
    const rhythmSignals = rhythm.signals || [];
    const nutritionSignals = nutrition.signals || [];
    const mealGroups = todayMeals.groups || [];

    return (
        <main className="woof-home" data-surface="home">
            <section className="woof-home__hero">
                <div className="woof-home__hero-copy">
                    {hero.eyebrow ? <div className="woof-home__hero-eyebrow">{hero.eyebrow}</div> : null}
                    <h1 className="woof-home__hero-title">{hero.title}</h1>
                    <p className="woof-home__hero-summary">{hero.summary}</p>
                    <div className="woof-home__hero-actions">
                        <QuickActionButton
                            label={hero.actions.log}
                            hint={quickLog.title || copy.quickLog}
                            onClick={onQuickLog}
                            variant="primary"
                        />
                        <QuickActionButton
                            label={hero.actions.ai}
                            hint={rhythm.headline || copy.open}
                            onClick={onOpenAI}
                        />
                        <QuickActionButton
                            label={hero.actions.favorites}
                            hint={quickLog.favoritesCopy || copy.open}
                            onClick={onOpenFavorites}
                        />
                    </div>
                </div>

                <aside className="woof-home__hero-companion" aria-label={copy.pet}>
                    <div className="woof-home__hero-companion-chip">{copy.pet}</div>
                    <div className="woof-home__pet-level">{`Lv.${companion.pet?.progress?.level || 1}`}</div>
                    <div className="woof-home__pet-status">{companion.pet?.messageKey || 'petMsg1'}</div>
                    <div className="woof-home__pet-progress" aria-hidden="true">
                        <div
                            className="woof-home__pet-progress-fill"
                            style={{ width: `${Math.min(companion.pet?.progress?.xp || 0, 100)}%` }}
                        />
                    </div>
                    <div className="woof-home__pet-progress-label">{copy.progress}</div>
                    <div className="woof-home__hero-meta">
                        {hero.meta.map((item) => (
                            <span key={item} className="woof-home__hero-meta-item">{item}</span>
                        ))}
                    </div>
                </aside>
            </section>

            <section className="woof-home__today" aria-label={copy.today}>
                <SectionHeader
                    eyebrow={copy.today}
                    title={copy.today}
                    hint={quickLog.summary}
                />
                <div className="woof-home__metric-grid">
                    <MetricCard
                        label={copy.metrics.calories}
                        value={`${today.calories} / ${today.targetCalories}`}
                        detail={today.targetCalories > 0 ? `${today.remainingCalories} kcal left` : '--'}
                    />
                    <MetricCard
                        label={copy.metrics.protein}
                        value={`${today.proteinCurrent} / ${today.proteinTarget} g`}
                        detail={today.proteinRemaining > 0 ? `${today.proteinRemaining} g remaining` : copy.statusOnTrack}
                    />
                    <MetricCard
                        label={copy.metrics.meals}
                        value={`${today.loggedMeals}/${today.plannedMeals}`}
                        detail={today.nextMealType || copy.statusKeepGoing}
                    />
                </div>
                <div className="woof-home__summary-bar" aria-hidden="true">
                    <div
                        className="woof-home__summary-bar-fill"
                        style={{ width: `${Math.min(today.calorieProgressPercent, 100)}%` }}
                    />
                </div>
            </section>

            <section className="woof-home__panel" aria-label={todayMeals.title}>
                <SectionHeader
                    eyebrow={todayMeals.kicker}
                    title={todayMeals.title}
                    hint={todayMeals.dateLabel || todayMeals.hint}
                    action={copy.changeDate}
                    onAction={onOpenTodayMeals}
                />
                {todayMeals.count > 0 ? (
                    <div className="woof-home__meal-group-list">
                        {mealGroups.map((group) => (
                            <MealGroupCard key={group.key} group={group} />
                        ))}
                    </div>
                ) : (
                    <div className="woof-home__empty-state">
                        <div className="woof-home__empty-title">{copy.companion}</div>
                        <p className="woof-home__empty-copy">{todayMeals.hint || quickLog.summary}</p>
                    </div>
                )}
            </section>

            <section className="woof-home__overview" aria-label={copy.overview}>
                <SectionHeader
                    eyebrow={copy.overview}
                    title={overview.title}
                    hint={overview.hint}
                />
                <div className="woof-home__signal-grid">
                    {overviewSignals.map((signal) => (
                        <InsightCard
                            key={signal.label}
                            label={signal.label}
                            value={signal.value}
                            detail={signal.detail}
                        />
                    ))}
                </div>
            </section>

            <section className="woof-home__panel" aria-label={copy.rhythm}>
                <SectionHeader
                    eyebrow={rhythm.subtitle}
                    title={rhythm.title}
                    hint={rhythm.headline}
                    action={copy.open}
                    onAction={onOpenRhythm}
                />
                <p className="woof-home__panel-summary">{rhythm.summary}</p>
                <div className="woof-home__signal-grid">
                    {rhythmSignals.map((signal) => (
                        <InsightCard
                            key={signal.key}
                            label={signal.label}
                            value={signal.text}
                        />
                    ))}
                </div>
            </section>

            <section className="woof-home__panel" aria-label={copy.nutrition}>
                <SectionHeader
                    eyebrow={nutrition.subtitle}
                    title={nutrition.title}
                    hint={nutrition.headline}
                />
                <p className="woof-home__panel-summary">{nutrition.summary}</p>
                <div className="woof-home__signal-grid">
                    {nutritionSignals.map((signal) => (
                        <InsightCard
                            key={signal.key}
                            label={signal.label}
                            value={signal.value}
                            detail={signal.detail}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
