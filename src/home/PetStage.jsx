import React, { useCallback, useEffect, useState } from 'react';
import { usePetInteraction } from '../react/hooks/usePetInteraction.js';
import { SpeechBubble } from './SpeechBubble.jsx';
import { InteractionParticles } from './InteractionParticles.jsx';

const PET_FRAME_SOURCES = Object.freeze({
    hungry: 'dog_animation/dog_sad.gif',
    low: 'dog_animation/dog_idle.gif',
    mid: 'dog_animation/dog_walk.gif',
    balanced: 'dog_animation/dog_happy.gif',
    full: 'dog_animation/dog_fat.gif',
    eating: 'dog_animation/dog_eat.gif',
    sleeping: 'dog_animation/dog_idle.gif',
    lonely: 'dog_animation/dog_sad.gif',
    excited: 'dog_animation/dog_happy.gif',
    celebrating: 'dog_animation/dog_happy.gif',
    starving: 'dog_animation/dog_sad.gif'
});

function getPetFrameSource(frameKey = 'low') {
    return PET_FRAME_SOURCES[frameKey] || PET_FRAME_SOURCES.low;
}

function formatXp(xp, level) {
    const xpInLevel = xp - ((level - 1) * 100);
    return `${Math.max(0, xpInLevel)}/100`;
}

function formatPercent(value) {
    return `${Math.max(0, Math.min(Math.round(Number(value) || 0), 199))}%`;
}

function formatMacroValue(current, target, unit = 'g') {
    const currentValue = Math.round(Number(current) || 0);
    const targetValue = Math.round(Number(target) || 0);
    return targetValue > 0 ? `${currentValue}/${targetValue}${unit}` : `${currentValue}${unit}`;
}

function sanitizeStatusKey(value) {
    return String(value || 'hungry').replace(/[^a-z0-9-]/gi, '').toLowerCase() || 'hungry';
}

export function PetStage({
    pet = {},
    copy = {},
    resolveDialogText,
    onQuickLog
}) {
    const statusKey = sanitizeStatusKey(pet?.statusKey || pet?.key || pet?.baseKey || pet?.frameKey);
    const mood = statusKey || pet?.mood || pet?.baseMood || 'hungry';
    const progress = pet?.progress || {};
    const [animClass, setAnimClass] = useState('');

    const handleBondChange = useCallback(() => {
        // Bond delta is computed in domain; UI just reacts visually
    }, []);

    const { interaction, clearInteraction, pointerHandlers } = usePetInteraction({
        mood,
        onBondChange: handleBondChange
    });

    // Apply animation class on interaction
    useEffect(() => {
        if (!interaction?.animClass) return undefined;
        setAnimClass(interaction.animClass);
        const timer = setTimeout(() => setAnimClass(''), 800);
        return () => clearTimeout(timer);
    }, [interaction]);

    const dialogText = interaction?.dialogKey && typeof resolveDialogText === 'function'
        ? resolveDialogText(interaction.dialogKey)
        : '';

    const nutrition = pet?.nutrition || {};
    const caloriePercent = Number(nutrition.calorieProgressPercent) || Math.round((Number(pet?.ratio) || 0) * 100);
    const proteinPercent = Number(nutrition.proteinPercent) || 0;
    const loggedMeals = Number(nutrition.loggedMeals) || 0;
    const plannedMeals = Number(nutrition.plannedMeals) || 0;
    const mealValue = plannedMeals > 0 ? `${loggedMeals}/${plannedMeals}` : String(loggedMeals);
    const statusLabel = copy.statusLabels?.[statusKey] || copy.statusLabels?.default || statusKey;
    const nextMealText = nutrition.nextMealType
        ? (copy.nextMealHint || 'Next: {meal}').replace('{meal}', nutrition.nextMealType)
        : copy.tapHint || '';
    const equipped = pet?.equipped || {};

    return (
        <section
            className={`woof-pet__stage woof-pet__stage--${statusKey}`}
            aria-label={copy.pet || 'Companion'}
            data-status={statusKey}
        >
            <div className="woof-pet__header">
                <div>
                    <div className="woof-pet__kicker">{copy.kicker || copy.pet || 'Companion'}</div>
                    <div className="woof-pet__status-title">{statusLabel}</div>
                </div>
                <div className="woof-pet__status-pill">
                    <span className="woof-pet__status-dot" aria-hidden="true" />
                    <span>{formatPercent(caloriePercent)}</span>
                </div>
            </div>

            <div className="woof-pet__scene">
                <div className="woof-pet__sun" aria-hidden="true" />
                <div className="woof-pet__backdrop-line woof-pet__backdrop-line--one" aria-hidden="true" />
                <div className="woof-pet__backdrop-line woof-pet__backdrop-line--two" aria-hidden="true" />
                <div className="woof-pet__food-bowl" aria-hidden="true">
                    <span className="woof-pet__food-bowl-dot" />
                    <span className="woof-pet__food-bowl-dot" />
                    <span className="woof-pet__food-bowl-dot" />
                </div>
                <div className="woof-pet__orb" aria-hidden="true" />

                <div
                    className={`woof-pet__character ${animClass}`}
                    {...pointerHandlers}
                    role="button"
                    tabIndex={0}
                    aria-label={copy.petTapLabel || 'Interact with pet'}
                    style={{ touchAction: 'none' }}
                >
                    <img
                        className="woof-pet__sprite woof-pet__sprite--base"
                        src={getPetFrameSource(pet?.frameKey)}
                        alt=""
                        loading="eager"
                        decoding="async"
                        draggable={false}
                    />

                    {equipped.outfit && (
                        <img
                            className="woof-pet__sprite woof-pet__sprite--outfit"
                            src={`costumes/${equipped.outfit}/${pet?.frameKey || 'low'}.png`}
                            alt=""
                            draggable={false}
                        />
                    )}

                    {/* Layer 3: Accessory */}
                    {equipped.accessory && (
                        <img
                            className="woof-pet__sprite woof-pet__sprite--accessory"
                            src={`costumes/${equipped.accessory}/${pet?.frameKey || 'low'}.png`}
                            alt=""
                            draggable={false}
                        />
                    )}

                    {/* Layer 4: Headwear */}
                    {equipped.headwear && (
                        <img
                            className="woof-pet__sprite woof-pet__sprite--headwear"
                            src={`costumes/${equipped.headwear}/${pet?.frameKey || 'low'}.png`}
                            alt=""
                            draggable={false}
                        />
                    )}
                </div>

                {/* Interaction particles */}
                <InteractionParticles effect={interaction?.effect} />

                {/* Speech bubble */}
                <SpeechBubble
                    text={dialogText || pet?.resolvedMessage || nextMealText}
                    visible={Boolean(interaction) || Boolean(pet?.resolvedMessage)}
                    onDismiss={clearInteraction}
                />
            </div>

            <div className="woof-pet__care-panel" aria-label={copy.carePanelLabel || 'Nutrition status'}>
                <div className="woof-pet__care-row">
                    <div className="woof-pet__care-label">{copy.caloriesLabel || 'Calories'}</div>
                    <div className="woof-pet__care-value">
                        {formatPercent(caloriePercent)}
                    </div>
                    <div className="woof-pet__care-track" aria-hidden="true">
                        <span style={{ width: formatPercent(caloriePercent) }} />
                    </div>
                </div>
                <div className="woof-pet__care-row">
                    <div className="woof-pet__care-label">{copy.proteinLabel || 'Protein'}</div>
                    <div className="woof-pet__care-value">
                        {formatMacroValue(nutrition.proteinCurrent, nutrition.proteinTarget)}
                    </div>
                    <div className="woof-pet__care-track woof-pet__care-track--protein" aria-hidden="true">
                        <span style={{ width: formatPercent(proteinPercent) }} />
                    </div>
                </div>
                <div className="woof-pet__care-row">
                    <div className="woof-pet__care-label">{copy.mealsLabel || 'Meals'}</div>
                    <div className="woof-pet__care-value">{mealValue}</div>
                    <div className="woof-pet__care-track woof-pet__care-track--meal" aria-hidden="true">
                        <span style={{ width: formatPercent(plannedMeals > 0 ? (loggedMeals / plannedMeals) * 100 : 0) }} />
                    </div>
                </div>
            </div>

            {/* Progress stats bar */}
            <div className="woof-pet__stats">
                <div className="woof-pet__level-badge">
                    <span className="woof-pet__level-label">Lv.</span>
                    <span className="woof-pet__level-value">{progress.level || 1}</span>
                </div>
                <div className="woof-pet__xp-bar">
                    <div
                        className="woof-pet__xp-fill"
                        style={{ width: `${Math.min(((progress.xp || 0) % 100), 100)}%` }}
                    />
                    <span className="woof-pet__xp-text">
                        {formatXp(progress.xp || 0, progress.level || 1)} XP
                    </span>
                </div>
            </div>

            <div className="woof-pet__meters">
                <div className="woof-pet__meter" title={copy.bondLabel || 'Bond'}>
                    <span className="woof-pet__meter-icon" aria-hidden="true">❤️</span>
                    <span className="woof-pet__meter-label">{copy.bondLabel || 'Bond'}</span>
                    <span className="woof-pet__meter-value">{progress.bond || 0}</span>
                </div>
                <div className="woof-pet__meter" title={copy.energyLabel || 'Energy'}>
                    <span className="woof-pet__meter-icon" aria-hidden="true">⚡</span>
                    <span className="woof-pet__meter-label">{copy.energyLabel || 'Energy'}</span>
                    <span className="woof-pet__meter-value">{progress.energy || 0}</span>
                </div>
                <div className="woof-pet__meter" title={copy.streakLabel || 'Streak'}>
                    <span className="woof-pet__meter-icon" aria-hidden="true">🔥</span>
                    <span className="woof-pet__meter-label">{copy.streakLabel || 'Streak'}</span>
                    <span className="woof-pet__meter-value">{progress.streak || 0}{copy.dayUnit || 'd'}</span>
                </div>
            </div>

            <div className="woof-pet__footer">
                <span className="woof-pet__tap-hint">{nextMealText || copy.tapHint || ''}</span>
                {typeof onQuickLog === 'function' ? (
                    <button className="woof-pet__feed-button" type="button" onClick={onQuickLog}>
                        {copy.feedAction || 'Feed'}
                    </button>
                ) : null}
            </div>
        </section>
    );
}
