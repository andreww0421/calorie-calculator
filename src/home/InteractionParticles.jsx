import React from 'react';

const EFFECT_CONTENT = {
    hearts: ['❤️', '💕', '💖'],
    stars: ['⭐', '✨', '🌟'],
    zzz: ['💤', 'Z', 'z'],
    sweat: ['💦', '😅'],
    confetti: ['🎉', '🎊', '✨', '🌟'],
    bounce: ['✨', '⭐'],
    spiral: ['💫', '😵‍💫']
};

export function InteractionParticles({ effect }) {
    if (!effect || effect === 'none') return null;

    const items = EFFECT_CONTENT[effect] || EFFECT_CONTENT.stars;

    return (
        <div className="woof-pet__particles" aria-hidden="true">
            {items.map((emoji, index) => (
                <span
                    key={`${effect}-${index}`}
                    className={`woof-pet__particle woof-pet__particle--${index}`}
                >
                    {emoji}
                </span>
            ))}
        </div>
    );
}
