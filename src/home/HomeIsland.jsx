import React from 'react';
import { useHomeIslandState } from './useHomeIslandState.js';
import './home-island.css';

function noop() {}

const PET_FRAME_SOURCES = Object.freeze({
    hungry: 'dog_animation/dog_sad.gif',
    low: 'dog_animation/dog_idle.gif',
    mid: 'dog_animation/dog_walk.gif',
    balanced: 'dog_animation/dog_happy.gif',
    full: 'dog_animation/dog_fat.gif',
    eating: 'dog_animation/dog_eat.gif'
});

function getPetFrameSource(frameKey = 'low') {
    return PET_FRAME_SOURCES[frameKey] || PET_FRAME_SOURCES.low;
}

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
    const metaText = group.metaText || group.emptyText;

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
    onOpenRhythm = noop,
    onOpenDailySummary = noop
}) {
    const model = useHomeIslandState();
    const { copy, hero, quickLog, overview, todayMeals, today, companion } = model;
    const overviewSignals = overview.signals || [];
    const mealGroups = todayMeals.groups || [];
    const hasMeals = todayMeals.count > 0;

    return (
        <main className="woof-home" data-surface="home">
            <section className="woof-home__hero">
                <aside className="woof-home__hero-companion" aria-label={copy.pet}>
                    <div className="woof-home__hero-companion-chip">{copy.pet}</div>
                    <div className="woof-home__pet-stage">
                        <img
                            className="woof-home__pet-image"
                            src={getPetFrameSource(companion.pet?.frameKey)}
                            alt=""
                            loading="eager"
                            decoding="async"
                        />
                    </div>
                    <div className="woof-home__pet-level">{`Lv.${companion.pet?.progress?.level || 1}`}</div>
                    <div className="woof-home__pet-status">{companion.pet?.resolvedMessage || companion.pet?.messageKey || ''}</div>
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

                <div className="woof-home__hero-spotlight" aria-hidden="true" />
                <div className="woof-home__hero-copy">
                    {hero.eyebrow ? <div className="woof-home__hero-eyebrow">{hero.eyebrow}</div> : null}
                    <h1 className="woof-home__hero-title">{hero.title}</h1>
                    <p className="woof-home__hero-summary">{hero.summary}</p>
                    <div className="woof-home__hero-actions">
                        <QuickActionButton
                            label={hero.actions.log}
                            hint=""
                            onClick={onQuickLog}
                            variant="primary"
                        />
                        <QuickActionButton
                            label={hero.actions.ai}
                            hint=""
                            onClick={onOpenAI}
                        />
                        <QuickActionButton
                            label={hero.actions.favorites}
                            hint=""
                            onClick={onOpenFavorites}
                        />
                    </div>
                </div>
            </section>

            <section className="woof-home__today" aria-label={copy.today}>
                <SectionHeader
                    eyebrow={copy.today}
                    title={copy.today}
                    hint={todayMeals.dateLabel || quickLog.summary}
                    action={copy.open}
                    onAction={onOpenDailySummary}
                />
                <div className="woof-home__metric-grid">
                    <MetricCard
                        label={copy.metrics.calories}
                        value={`${today.calories} / ${today.targetCalories}`}
                        detail={today.targetCalories > 0 ? copy.caloriesRemaining(today.remainingCalories) : '--'}
                    />
                    <MetricCard
                        label={copy.metrics.protein}
                        value={`${today.proteinCurrent} / ${today.proteinTarget} g`}
                        detail={today.proteinRemaining > 0 ? copy.proteinRemaining(today.proteinRemaining) : copy.proteinOnTrack}
                    />
                </div>
                <div className="woof-home__summary-bar" aria-hidden="true">
                    <div
                        className="woof-home__summary-bar-fill"
                        style={{ width: `${Math.min(today.calorieProgressPercent, 100)}%` }}
                    />
                </div>
                {hasMeals ? (
                    <div className="woof-home__today-meals">
                        <div className="woof-home__today-meals-header">
                            <div>
                                <div className="woof-home__eyebrow">{todayMeals.kicker}</div>
                                <div className="woof-home__today-meals-title">{todayMeals.title}</div>
                            </div>
                            <button type="button" className="woof-home__ghost-button woof-home__ghost-button--small" onClick={onOpenTodayMeals}>
                                {copy.changeDate}
                            </button>
                        </div>
                        <p className="woof-home__today-meals-hint">{todayMeals.hint}</p>
                        <div className="woof-home__meal-group-list">
                            {mealGroups.map((group) => (
                                <MealGroupCard key={group.key} group={group} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="woof-home__empty-state woof-home__today-empty">
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
                    action={copy.open}
                    onAction={onOpenRhythm}
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
        </main>
    );
}
