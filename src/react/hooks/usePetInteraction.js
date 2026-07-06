import { useCallback, useRef, useState } from 'react';
import {
    PET_INTERACTION_TYPES,
    PET_INTERACTION_COOLDOWNS,
    getInteractionResponse
} from '../../../js/domain/pet-domain.js';

const COMBO_WINDOW_MS = 3000;
const LONG_PRESS_THRESHOLD_MS = 1500;

export function usePetInteraction({ mood = 'hungry', onBondChange } = {}) {
    const [interaction, setInteraction] = useState(null);
    const cooldownRef = useRef(null);
    const comboRef = useRef({ count: 0, timer: null });
    const pressRef = useRef({ startTime: 0, timer: null, active: false });

    const clearInteraction = useCallback(() => {
        setInteraction(null);
    }, []);

    const triggerInteraction = useCallback((type, extra = {}) => {
        if (cooldownRef.current) return;

        const response = getInteractionResponse({ type, mood, ...extra });
        setInteraction({ type, ...response, timestamp: Date.now() });

        if (response.bondDelta > 0 && typeof onBondChange === 'function') {
            onBondChange(response.bondDelta);
        }

        const cooldown = PET_INTERACTION_COOLDOWNS[type] || 2000;
        cooldownRef.current = setTimeout(() => {
            cooldownRef.current = null;
        }, cooldown);
    }, [mood, onBondChange]);

    const handlePointerDown = useCallback((event) => {
        event.preventDefault();
        pressRef.current.startTime = Date.now();
        pressRef.current.active = true;

        pressRef.current.timer = setTimeout(() => {
            if (!pressRef.current.active) return;
            pressRef.current.active = false;
            const holdSeconds = (Date.now() - pressRef.current.startTime) / 1000;
            triggerInteraction(PET_INTERACTION_TYPES.LONG_PRESS, { holdSeconds });
        }, LONG_PRESS_THRESHOLD_MS);
    }, [triggerInteraction]);

    const handlePointerUp = useCallback(() => {
        if (!pressRef.current.active) return;
        pressRef.current.active = false;

        const elapsed = Date.now() - pressRef.current.startTime;
        clearTimeout(pressRef.current.timer);

        if (elapsed >= LONG_PRESS_THRESHOLD_MS) {
            const holdSeconds = elapsed / 1000;
            triggerInteraction(PET_INTERACTION_TYPES.LONG_PRESS, { holdSeconds });
            return;
        }

        // Tap — track combo
        comboRef.current.count += 1;
        clearTimeout(comboRef.current.timer);

        if (comboRef.current.count >= 3) {
            const comboCount = comboRef.current.count;
            comboRef.current.count = 0;
            triggerInteraction(PET_INTERACTION_TYPES.COMBO, { comboCount });
            return;
        }

        comboRef.current.timer = setTimeout(() => {
            comboRef.current.count = 0;
            triggerInteraction(PET_INTERACTION_TYPES.TAP);
        }, COMBO_WINDOW_MS);
    }, [triggerInteraction]);

    const handlePointerCancel = useCallback(() => {
        pressRef.current.active = false;
        clearTimeout(pressRef.current.timer);
    }, []);

    return {
        interaction,
        clearInteraction,
        pointerHandlers: {
            onPointerDown: handlePointerDown,
            onPointerUp: handlePointerUp,
            onPointerCancel: handlePointerCancel,
            onPointerLeave: handlePointerCancel
        }
    };
}
