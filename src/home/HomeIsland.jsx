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

function formatDisplayNumber(value) {
    const normalized = Math.round((Number(value) || 0) * 10) / 10;
    return Number.isInteger(normalized) ? String(normalized) : normalized.toFixed(1);
}

function MacroDonutChart({ segments, centerLabel, centerValue }) {
    const radius = 44;
    const circumference = 2 * Math.PI * radius;
    const total = segments.reduce((sum, segment) => sum + Math.max(Number(segment.value) || 0, 0), 0);
    const normalizedSegments = total > 0
        ? segments
        : segments.map((segment) => ({
            ...segment,
            value: 1,
            isPlaceholder: true
        }));
    const normalizedTotal = total > 0 ? total : normalizedSegments.length;
    let progress = 0;

    return (
        <div className="woof-home__macro-chart" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="woof-home__macro-chart-svg" role="presentation">
                <circle
                    className="woof-home__macro-chart-track"
                    cx="60"
                    cy="60"
                    r={radius}
                />
                {normalizedSegments.map((segment) => {
                    const value = Math.max(Number(segment.value) || 0, 0);
                    const dash = (value / normalizedTotal) * circumference;
                    const circle = (
                        <circle
                            key={segment.key}
                            className="woof-home__macro-chart-segment"
                            cx="60"
                            cy="60"
                            r={radius}
                            stroke={segment.color}
                            strokeDasharray={`${dash} ${circumference - dash}`}
                            strokeDashoffset={-progress}
                            opacity={segment.isPlaceholder ? 0.24 : 1}
                        />
                    );
                    progress += dash;
                    return circle;
                })}
            </svg>
            <div className="woof-home__macro-chart-center">
                <div className="woof-home__macro-chart-label">{centerLabel}</div>
                <div className="woof-home__macro-chart-value">{centerValue}</div>
            </div>
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

function MacroLegendItem({ segment }) {
    const displayValue = Number(segment.value) > 0
        ? `${formatDisplayNumber(segment.value)} ${segment.unit}`
        : '--';

    return (
        <div className="woof-home__macro-item">
            <span
                className="woof-home__macro-swatch"
                style={{ '--woof-macro-color': segment.color }}
                aria-hidden="true"
            />
            <div className="woof-home__macro-copy">
                <div className="woof-home__macro-name">{segment.label}</div>
                <div className="woof-home__macro-value">{displayValue}</div>
            </div>
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
    onOpenDailySummary = noop
}) {
    const model = useHomeIslandState();
    const { copy, dashboard, hero, quickLog, todayMeals, today, companion } = model;
    const mealGroups = todayMeals.groups || [];
    const hasMeals = todayMeals.count > 0;
    const dashboardMacros = dashboard.macros || [];
    const dashboardCalories = dashboard.caloriesValue > 0 ? `${Math.round(dashboard.caloriesValue)} kcal` : '--';
    const dashboardRemaining = today.targetCalories > 0 ? copy.caloriesRemaining(today.remainingCalories) : '--';
    const dashboardCenterValue = dashboard.caloriesValue > 0 ? `${Math.round(dashboard.caloriesValue)}` : '--';

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

            <section className="woof-home__nutrition" aria-label={dashboard.title}>
                <SectionHeader
                    eyebrow={dashboard.nutrientCountLabel}
                    title={dashboard.title}
                    hint={dashboard.hint}
                    action={copy.open}
                    onAction={onOpenDailySummary}
                />
                <button type="button" className="woof-home__nutrition-card" onClick={onOpenDailySummary}>
                    <div className="woof-home__nutrition-layout">
                        <MacroDonutChart
                            segments={dashboardMacros}
                            centerLabel={dashboard.caloriesLabel}
                            centerValue={dashboardCenterValue}
                        />
                        <div className="woof-home__nutrition-copy">
                            <div className="woof-home__macro-list">
                                {dashboardMacros.map((segment) => (
                                    <MacroLegendItem key={segment.key} segment={segment} />
                                ))}
                            </div>
                            <div className="woof-home__nutrition-meta">
                                <span className="woof-home__nutrition-pill">{dashboardCalories}</span>
                                <span className="woof-home__nutrition-pill">{dashboardRemaining}</span>
                            </div>
                            <div className="woof-home__nutrition-cta">
                                <span>{dashboard.cta}</span>
                                <span className="woof-home__nutrition-cta-arrow" aria-hidden="true">›</span>
                            </div>
                        </div>
                    </div>
                </button>
            </section>

            <section className="woof-home__today" aria-label={todayMeals.title}>
                <SectionHeader
                    eyebrow={todayMeals.kicker}
                    title={todayMeals.title}
                    hint={todayMeals.hint}
                    action={todayMeals.actionLabel}
                    onAction={onOpenTodayMeals}
                />
                {hasMeals ? (
                    <div className="woof-home__meal-group-list">
                        {mealGroups.map((group) => (
                            <MealGroupCard key={group.key} group={group} />
                        ))}
                    </div>
                ) : (
                    <div className="woof-home__empty-state woof-home__today-empty">
                        <div className="woof-home__empty-title">{copy.companion}</div>
                        <p className="woof-home__empty-copy">{todayMeals.hint || quickLog.summary}</p>
                    </div>
                )}
            </section>
        </main>
    );
}
