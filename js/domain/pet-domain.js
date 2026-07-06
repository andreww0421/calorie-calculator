const PET_STATUS_STEPS = [
    {
        key: 'full',
        minRatio: 1.1,
        frameKey: 'full',
        messageKey: 'petMsg5',
        mood: 'full'
    },
    {
        key: 'balanced',
        minRatio: 0.85,
        frameKey: 'balanced',
        messageKey: 'petMsg4',
        mood: 'happy'
    },
    {
        key: 'mid',
        minRatio: 0.55,
        frameKey: 'mid',
        messageKey: 'petMsg3',
        mood: 'curious'
    },
    {
        key: 'low',
        minRatio: 0.25,
        frameKey: 'low',
        messageKey: 'petMsg2',
        mood: 'warming_up'
    },
    {
        key: 'hungry',
        minRatio: 0,
        frameKey: 'hungry',
        messageKey: 'petMsg1',
        mood: 'hungry'
    }
];

// --- Extended states (overlay states with priority) ---
// Higher-priority states override the base nutrition-based state.
// Priority order (high→low): celebrating > excited > sleeping > lonely > starving > (base nutrition state)

export const PET_OVERLAY_STATES = Object.freeze({
    celebrating: {
        key: 'celebrating',
        frameKey: 'celebrating',
        messageKey: 'petMsgCelebrating',
        mood: 'celebrating',
        priority: 50
    },
    excited: {
        key: 'excited',
        frameKey: 'excited',
        messageKey: 'petMsgExcited',
        mood: 'excited',
        priority: 40
    },
    sleeping: {
        key: 'sleeping',
        frameKey: 'sleeping',
        messageKey: 'petMsgSleeping',
        mood: 'sleeping',
        priority: 30
    },
    lonely: {
        key: 'lonely',
        frameKey: 'lonely',
        messageKey: 'petMsgLonely',
        mood: 'lonely',
        priority: 20
    },
    starving: {
        key: 'starving',
        frameKey: 'starving',
        messageKey: 'petMsgStarving',
        mood: 'starving',
        priority: 10
    }
});

export function resolveOverlayState({
    hour = new Date().getHours(),
    minutesSinceLastOpen = 0,
    allQuestsComplete = false,
    justLevelledUp = false,
    ratio = 0,
    hoursWithoutLog = 0
} = {}) {
    if (justLevelledUp) return PET_OVERLAY_STATES.celebrating;
    if (allQuestsComplete) return PET_OVERLAY_STATES.excited;
    if (hour >= 23 || hour < 6) return PET_OVERLAY_STATES.sleeping;
    if (minutesSinceLastOpen >= 1440) return PET_OVERLAY_STATES.lonely;
    if (ratio < 0.1 && hoursWithoutLog >= 6) return PET_OVERLAY_STATES.starving;
    return null;
}

// --- Interaction response system ---

export const PET_INTERACTION_TYPES = Object.freeze({
    TAP: 'tap',
    LONG_PRESS: 'long_press',
    COMBO: 'combo'
});

const INTERACTION_RESPONSES = Object.freeze({
    tap: {
        hungry:   { animClass: 'pet-anim--tilt',   dialogKey: 'petTapHungry',   effect: 'none',   bondDelta: 0 },
        low:      { animClass: 'pet-anim--wag',    dialogKey: 'petTapLow',      effect: 'none',   bondDelta: 1 },
        mid:      { animClass: 'pet-anim--wiggle',  dialogKey: 'petTapMid',      effect: 'hearts', bondDelta: 1 },
        balanced: { animClass: 'pet-anim--spin',    dialogKey: 'petTapBalanced', effect: 'stars',  bondDelta: 2 },
        full:     { animClass: 'pet-anim--flop',    dialogKey: 'petTapFull',     effect: 'sweat',  bondDelta: 0 },
        sleeping: { animClass: 'pet-anim--roll',    dialogKey: 'petTapSleeping', effect: 'zzz',    bondDelta: 0 },
        lonely:   { animClass: 'pet-anim--rush',    dialogKey: 'petTapLonely',   effect: 'hearts', bondDelta: 5 },
        starving: { animClass: 'pet-anim--tilt',    dialogKey: 'petTapStarving', effect: 'none',   bondDelta: 0 },
        excited:  { animClass: 'pet-anim--bounce',  dialogKey: 'petTapExcited',  effect: 'stars',  bondDelta: 2 },
        celebrating: { animClass: 'pet-anim--bounce', dialogKey: 'petTapCelebrating', effect: 'confetti', bondDelta: 3 }
    },
    long_press: [
        { threshold: 1.5, animClass: 'pet-anim--squint', dialogKey: 'petLongPress1', effect: 'none',   bondDelta: 1 },
        { threshold: 3.0, animClass: 'pet-anim--belly',  dialogKey: 'petLongPress2', effect: 'hearts', bondDelta: 2 },
        { threshold: 5.0, animClass: 'pet-anim--sleep',  dialogKey: 'petLongPress3', effect: 'zzz',    bondDelta: 3 }
    ],
    combo: [
        { threshold: 3, animClass: 'pet-anim--wag-fast',  dialogKey: 'petCombo3', effect: 'bounce',   bondDelta: 2 },
        { threshold: 5, animClass: 'pet-anim--spin-fast', dialogKey: 'petCombo5', effect: 'confetti', bondDelta: 3 },
        { threshold: 7, animClass: 'pet-anim--dizzy',     dialogKey: 'petCombo7', effect: 'spiral',   bondDelta: 1 }
    ]
});

export function getInteractionResponse({ type, mood = 'hungry', comboCount = 0, holdSeconds = 0 } = {}) {
    if (type === PET_INTERACTION_TYPES.TAP) {
        const moodResponses = INTERACTION_RESPONSES.tap;
        return moodResponses[mood] || moodResponses.hungry;
    }

    if (type === PET_INTERACTION_TYPES.LONG_PRESS) {
        const steps = INTERACTION_RESPONSES.long_press;
        for (let i = steps.length - 1; i >= 0; i -= 1) {
            if (holdSeconds >= steps[i].threshold) return steps[i];
        }
        return steps[0];
    }

    if (type === PET_INTERACTION_TYPES.COMBO) {
        const steps = INTERACTION_RESPONSES.combo;
        for (let i = steps.length - 1; i >= 0; i -= 1) {
            if (comboCount >= steps[i].threshold) return steps[i];
        }
        return steps[0];
    }

    return INTERACTION_RESPONSES.tap.hungry;
}

// Cooldown durations (ms)
export const PET_INTERACTION_COOLDOWNS = Object.freeze({
    [PET_INTERACTION_TYPES.TAP]: 2000,
    [PET_INTERACTION_TYPES.LONG_PRESS]: 5000,
    [PET_INTERACTION_TYPES.COMBO]: 10000
});

export const PET_DEFAULT_INTERACTION_KEYS = Object.freeze([
    'petInteractMsg1',
    'petInteractMsg2',
    'petInteractMsg3',
    'petInteractMsg4',
    'petInteractMsg5'
]);

function toNumber(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function clamp(value, min = 0, max = 100) {
    return Math.min(Math.max(value, min), max);
}

export function createPetProgressSnapshot(progress = {}) {
    // Keep the progression shape explicit now so later persistence can add fields
    // without changing the UI contract for level/xp/mood/energy/bond/streak.
    const xp = Math.max(0, Math.round(toNumber(progress?.xp)));
    const derivedLevel = Math.floor(xp / 100) + 1;

    return {
        level: Math.max(1, Math.round(toNumber(progress?.level, derivedLevel)) || derivedLevel),
        xp,
        mood: String(progress?.mood || 'hungry'),
        energy: clamp(Math.round(toNumber(progress?.energy))),
        bond: clamp(Math.round(toNumber(progress?.bond))),
        streak: Math.max(0, Math.round(toNumber(progress?.streak)))
    };
}

export function calculatePetLoggingStreak(calorieHistory = []) {
    if (!Array.isArray(calorieHistory) || calorieHistory.length === 0) return 0;

    let streak = 0;
    for (let index = calorieHistory.length - 1; index >= 0; index -= 1) {
        const calories = toNumber(calorieHistory[index]?.calories);
        if (calories <= 0) break;
        streak += 1;
    }
    return streak;
}

export function calculatePetProgress({
    totalCalories = 0,
    targetCalories = 0,
    loggedMeals = 0,
    streak = 0,
    bond = 0
} = {}) {
    const calories = Math.max(0, toNumber(totalCalories));
    const target = Math.max(0, toNumber(targetCalories));
    const ratio = target > 0 ? Math.min(calories / target, 1.4) : 0;
    const normalizedLoggedMeals = Math.max(0, Math.round(toNumber(loggedMeals)));
    const normalizedStreak = Math.max(0, Math.round(toNumber(streak)));
    const baseBond = clamp(Math.round(toNumber(bond)));
    const energy = clamp(Math.round(ratio * 90) + Math.min(normalizedLoggedMeals, 5) * 2);
    const xp = Math.round(Math.min(ratio, 1.1) * 80) + Math.min(normalizedLoggedMeals, 5) * 10 + Math.min(normalizedStreak, 7) * 5;
    const level = Math.floor(xp / 100) + 1;
    const nextBond = clamp(baseBond + Math.min(normalizedStreak, 7) * 5 + Math.min(normalizedLoggedMeals, 5) * 3);

    return createPetProgressSnapshot({
        level,
        xp,
        mood: 'hungry',
        energy,
        bond: nextBond,
        streak: normalizedStreak
    });
}

export function buildPetState({
    totalCalories = 0,
    targetCalories = 0,
    loggedMeals = 0,
    streak = 0,
    bond = 0,
    overlayContext = null
} = {}) {
    const calories = Math.max(0, toNumber(totalCalories));
    const target = Math.max(0, toNumber(targetCalories, 2000)) || 2000;
    const ratio = Math.min(calories / target, 1.4);
    const baseStatus = PET_STATUS_STEPS.find((step) => ratio >= step.minRatio) || PET_STATUS_STEPS[PET_STATUS_STEPS.length - 1];
    const progress = calculatePetProgress({
        totalCalories: calories,
        targetCalories: target,
        loggedMeals,
        streak,
        bond
    });

    const overlay = overlayContext ? resolveOverlayState(overlayContext) : null;
    const status = overlay || baseStatus;

    return {
        key: status.key,
        ratio,
        frameKey: status.frameKey,
        messageKey: status.messageKey,
        mood: status.mood,
        baseKey: baseStatus.key,
        baseMood: baseStatus.mood,
        progress: createPetProgressSnapshot({
            ...progress,
            mood: status.mood
        })
    };
}

export function buildPetInteractionMessages({ coachTips = [], defaultMessages = [] } = {}) {
    const deduped = [];
    [...coachTips, ...defaultMessages].forEach((message) => {
        const normalized = String(message || '').trim();
        if (!normalized || deduped.includes(normalized)) return;
        deduped.push(normalized);
    });
    return deduped;
}

export function pickPetInteractionMessage({ messages = [], randomValue = Math.random() } = {}) {
    if (!Array.isArray(messages) || messages.length === 0) return '';
    const safeRandom = Number.isFinite(randomValue) ? randomValue : Math.random();
    const index = Math.min(messages.length - 1, Math.max(0, Math.floor(safeRandom * messages.length)));
    return messages[index] || '';
}
