import React from 'react';
import { useHomeIslandState } from './useHomeIslandState.js';
import { FlameIcon, LeafIcon, BookIcon, PawIcon } from './SectionIcons.jsx';
import { PetStage } from './PetStage.jsx';
import './home-island.css';

function noop() {}

function formatDisplayNumber(value) {
    const normalized = Math.round((Number(value) || 0) * 10) / 10;
    return Number.isInteger(normalized) ? String(normalized) : normalized.toFixed(1);
}

function MealRow({
    name,
    calories,
    portion,
    favoriteLabel,
    deleteLabel,
    onFavorite = noop,
    onDelete = noop
}) {
    return (
        <div className="woof-home__meal-row">
            <div className="woof-home__meal-row-main">
                <div className="woof-home__meal-name">{name}</div>
                {portion ? <div className="woof-home__meal-portion">{portion}</div> : null}
            </div>
            <div className="woof-home__meal-row-side">
                <div className="woof-home__meal-calories">{calories > 0 ? `${Math.round(calories)} kcal` : '--'}</div>
                <div className="woof-home__meal-row-actions">
                    <button
                        type="button"
                        className="woof-home__meal-action woof-home__meal-action--favorite"
                        onClick={onFavorite}
                        aria-label={favoriteLabel}
                        title={favoriteLabel}
                    >
                        <span className="woof-home__meal-action-icon" aria-hidden="true">&#x2661;</span>
                    </button>
                    <button
                        type="button"
                        className="woof-home__meal-action woof-home__meal-action--delete"
                        onClick={onDelete}
                        aria-label={deleteLabel}
                        title={deleteLabel}
                    >
                        <span className="woof-home__meal-action-icon" aria-hidden="true">&#xd7;</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function MealGroupCard({
    group,
    favoriteLabel,
    deleteLabel,
    onFavoriteMeal = noop,
    onDeleteMeal = noop
}) {
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
                            favoriteLabel={favoriteLabel}
                            deleteLabel={deleteLabel}
                            onFavorite={() => onFavoriteMeal(meal.sourceIndex)}
                            onDelete={() => onDeleteMeal(meal.sourceIndex)}
                        />
                    ))}
                </div>
            ) : (
                <div className="woof-home__meal-group-empty">{group.emptyText}</div>
            )}
        </div>
    );
}

function DateNavigator({
    control,
    changeLabel,
    previousLabel,
    nextLabel,
    onShiftDate,
    onSelectDate
}) {
    if (!control) return null;

    return (
        <div className="woof-home__date-nav" aria-label={changeLabel}>
            <button
                type="button"
                className="woof-home__date-nav-button"
                onClick={() => onShiftDate(-1)}
                aria-label={previousLabel}
            >
                &#x2039;
            </button>
            <label className="woof-home__date-pill" title={control.label}>
                <span>{control.label}</span>
                <span className="woof-home__date-pill-caret" aria-hidden="true">&#x25BE;</span>
                <input
                    type="date"
                    className="woof-home__date-input"
                    value={control.value}
                    max={control.max}
                    aria-label={changeLabel}
                    onChange={(event) => onSelectDate(event.target.value)}
                />
            </label>
            <button
                type="button"
                className="woof-home__date-nav-button"
                onClick={() => onShiftDate(1)}
                aria-label={nextLabel}
                disabled={control.nextDisabled}
            >
                &#x203A;
            </button>
        </div>
    );
}

function SectionHeader({ icon, eyebrow, title, hint, actionContent = null }) {
    return (
        <div className="woof-home__section-header">
            <div className="woof-home__section-copy">
                {eyebrow ? <div className="woof-home__eyebrow">{eyebrow}</div> : null}
                <div className="woof-home__section-title-row">
                    {icon ? <span className="woof-home__section-icon" aria-hidden="true">{icon}</span> : null}
                    <h2 className="woof-home__section-title">{title}</h2>
                </div>
                {hint ? <p className="woof-home__section-hint">{hint}</p> : null}
            </div>
            {actionContent}
        </div>
    );
}

function ProgressRing({ progress = 0, calories = '--', target = '--' }) {
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(Number(progress) || 0, 100));
    const dash = (clamped / 100) * circumference;

    return (
        <div className="woof-home__progress-ring" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="woof-home__progress-ring-svg">
                <circle className="woof-home__progress-ring-track" cx="60" cy="60" r={radius} />
                <circle
                    className="woof-home__progress-ring-fill"
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeDasharray={`${dash} ${circumference - dash}`}
                />
            </svg>
            <div className="woof-home__progress-ring-center">
                <div className="woof-home__progress-ring-calories">{calories}</div>
                <div className="woof-home__progress-ring-target">/ {target}</div>
            </div>
        </div>
    );
}

function MacroProgressRow({ label, value = 0, target = 0, tone = 'protein' }) {
    const clampedTarget = Math.max(Number(target) || 0, 0);
    const normalizedValue = Math.max(Number(value) || 0, 0);
    const progress = clampedTarget > 0 ? Math.min((normalizedValue / clampedTarget) * 100, 100) : 0;

    return (
        <div className="woof-home__macro-progress-row">
            <div className="woof-home__macro-progress-head">
                <span className="woof-home__macro-progress-label">{label}</span>
                <span className="woof-home__macro-progress-value">
                    {`${formatDisplayNumber(normalizedValue)}g / ${formatDisplayNumber(clampedTarget)}g`}
                </span>
            </div>
            <div className="woof-home__macro-progress-track">
                <div
                    className={`woof-home__macro-progress-fill woof-home__macro-progress-fill--${tone}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

function SpotlightStat({ label, value }) {
    return (
        <div className="woof-home__motivation-stat">
            <div className="woof-home__motivation-stat-value">{value}</div>
            <div className="woof-home__motivation-stat-label">{label}</div>
        </div>
    );
}

export function HomeIsland({
    onQuickLog = noop,
    onSetSelectedDate = noop,
    onShiftDate = noop,
    onFavoriteMealItem = noop,
    onDeleteMealItem = noop,
    onOpenDailySummary = noop
}) {
    const model = useHomeIslandState();
    const { copy, dashboard, hero, quickLog, todayMeals, today, companion, petStageCopy, resolveDialogText } = model;
    const mealGroups = todayMeals.groups || [];
    const hasMeals = todayMeals.count > 0;
    const dashboardCalories = dashboard.caloriesValue > 0 ? `${Math.round(dashboard.caloriesValue)} kcal` : '--';
    const dashboardRemaining = today.targetCalories > 0 ? copy.caloriesRemaining(today.remainingCalories) : '--';
    const headline = today.calorieProgressPercent >= 70
        ? copy.headlineComplete
        : today.calorieProgressPercent > 0
            ? copy.headlineProgress
            : copy.headlineEmpty;
    const macroRows = [
        {
            key: 'protein',
            label: dashboard.macros[0]?.label || 'Protein',
            value: today.proteinCurrent,
            target: today.proteinTarget,
            tone: 'protein'
        },
        {
            key: 'carbs',
            label: dashboard.macros[2]?.label || 'Carbs',
            value: today.carbCurrent,
            target: today.carbTarget,
            tone: 'carb'
        },
        {
            key: 'fat',
            label: dashboard.macros[1]?.label || 'Fat',
            value: today.fatCurrent,
            target: today.fatTarget,
            tone: 'fat'
        }
    ];
    const loggedMealsLabel = today.plannedMeals > 0
        ? `${today.loggedMeals}/${today.plannedMeals}`
        : String(today.loggedMeals);
    const companionStats = [
        { label: copy.metrics.meals, value: loggedMealsLabel },
        { label: copy.metrics.protein, value: `${formatDisplayNumber(today.proteinCurrent)}g` },
        { label: copy.remainingLabel, value: dashboardRemaining }
    ];

    return (
        <main className="woof-home" data-surface="home">
            <header className="woof-home__today-header">
                <div className="woof-home__today-brand">
                    <img
                        className="woof-home__today-logo"
                        src="calorie_icon-128.png"
                        alt=""
                        width="54"
                        height="54"
                        decoding="async"
                    />
                    <div>
                        <div className="woof-home__today-kicker">{copy.appName}</div>
                        <h1 className="woof-home__today-title">{copy.screenTitle}</h1>
                        <p className="woof-home__today-date">{todayMeals.dateControl?.label || copy.today}</p>
                    </div>
                </div>
            </header>

            <PetStage
                pet={companion.pet}
                copy={petStageCopy || {}}
                resolveDialogText={resolveDialogText}
                onQuickLog={onQuickLog}
            />

            <section className="woof-home__motivation-banner" aria-label={copy.pet}>
                <div className="woof-home__motivation-copy">
                    <div className="woof-home__motivation-badge">
                        <span className="woof-home__motivation-badge-icon" aria-hidden="true"><PawIcon /></span>
                        <span>{hero.eyebrow || copy.pet}</span>
                    </div>
                    <div className="woof-home__motivation-title">{headline}</div>
                    <p className="woof-home__motivation-summary">
                        {companion.pet?.resolvedMessage || hero.summary}
                    </p>
                    <div className="woof-home__motivation-stats">
                        {companionStats.map((item) => (
                            <SpotlightStat key={item.label} label={item.label} value={item.value} />
                        ))}
                    </div>
                    <div className="woof-home__motivation-footer">
                        <div className="woof-home__motivation-next">
                            {today.nextMealType || quickLog.title || copy.quickLog}
                        </div>
                        <button
                            type="button"
                            className="woof-home__ghost-button woof-home__ghost-button--small woof-home__motivation-action"
                            onClick={onQuickLog}
                        >
                            {hero.actions.log}
                        </button>
                    </div>
                </div>
            </section>

            <button type="button" className="woof-home__dashboard-card" onClick={onOpenDailySummary}>
                <div className="woof-home__dashboard-head">
                    <span className="woof-home__section-icon" aria-hidden="true"><FlameIcon /></span>
                    <span className="woof-home__dashboard-head-title">{copy.dailyCaloriesTitle}</span>
                    <span className="woof-home__dashboard-head-progress">{`${today.calorieProgressPercent}%`}</span>
                </div>
                <div className="woof-home__dashboard-layout">
                    <div className="woof-home__dashboard-ring-col">
                        <ProgressRing
                            progress={today.calorieProgressPercent}
                            calories={Math.round(dashboard.caloriesValue || 0)}
                            target={Math.round(today.targetCalories || 0)}
                        />
                        <div className="woof-home__dashboard-ring-meta">
                            <div className="woof-home__dashboard-ring-label">{copy.remainingLabel}</div>
                            <div className="woof-home__dashboard-ring-value">{dashboardRemaining}</div>
                        </div>
                    </div>
                    <div className="woof-home__dashboard-macro-col">
                        {macroRows.map((row) => (
                            <MacroProgressRow
                                key={row.key}
                                label={row.label}
                                value={row.value}
                                target={row.target}
                                tone={row.tone}
                            />
                        ))}
                    </div>
                </div>
            </button>

            <section className="woof-home__today" aria-label={todayMeals.title}>
                <div className="woof-home__diary-header">
                    <div className="woof-home__diary-title-group">
                        <span className="woof-home__section-icon" aria-hidden="true"><BookIcon /></span>
                        <h2 className="woof-home__section-title">{todayMeals.title}</h2>
                    </div>
                    <div className="woof-home__diary-controls">
                        <DateNavigator
                            control={todayMeals.dateControl}
                            changeLabel={copy.changeDate}
                            previousLabel={copy.previousDate}
                            nextLabel={copy.nextDate}
                            onShiftDate={onShiftDate}
                            onSelectDate={onSetSelectedDate}
                        />
                        <button
                            type="button"
                            className="woof-home__ghost-button woof-home__ghost-button--small woof-home__diary-action"
                            onClick={onQuickLog}
                        >
                            {hero.actions.log}
                        </button>
                    </div>
                </div>
                {hasMeals ? (
                    <div className="woof-home__meal-group-list">
                        {mealGroups.map((group) => (
                            <MealGroupCard
                                key={group.key}
                                group={group}
                                favoriteLabel={copy.favoriteActionLabel}
                                deleteLabel={copy.deleteActionLabel}
                                onFavoriteMeal={onFavoriteMealItem}
                                onDeleteMeal={onDeleteMealItem}
                            />
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
