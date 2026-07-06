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
    // Extended states fall back to closest existing animation
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

export function PetStage({
    pet = {},
    copy = {},
    resolveDialogText,
    onQuickLog
}) {
    const mood = pet?.mood || pet?.baseMood || 'hungry';
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

    const equipped = pet?.equipped || {};
    const hasEquipped = Object.values(equipped).some(Boolean);

    return (
        <section className="woof-pet__stage" aria-label={copy.pet || 'Companion'}>
            <div className="woof-pet__scene">
                <div className="woof-pet__orb" aria-hidden="true" />

                <div
                    className={`woof-pet__character ${animClass}`}
                    {...pointerHandlers}
                    role="button"
                    tabIndex={0}
                    aria-label={copy.petTapLabel || 'Interact with pet'}
                    style={{ touchAction: 'none' }}
                >
                    {/* Layer 0: Base pet sprite */}
                    <img
                        className="woof-pet__sprite woof-pet__sprite--base"
                        src={getPetFrameSource(pet?.frameKey)}
                        alt=""
                        loading="eager"
                        decoding="async"
                        draggable={false}
                    />

                    {/* Layer 2: Outfit */}
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
                    text={dialogText}
                    visible={Boolean(interaction)}
                    onDismiss={clearInteraction}
                />
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
        </section>
    );
}
