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
    bond = 0
} = {}) {
    const calories = Math.max(0, toNumber(totalCalories));
    const target = Math.max(0, toNumber(targetCalories, 2000)) || 2000;
    const ratio = Math.min(calories / target, 1.4);
    const status = PET_STATUS_STEPS.find((step) => ratio >= step.minRatio) || PET_STATUS_STEPS[PET_STATUS_STEPS.length - 1];
    const progress = calculatePetProgress({
        totalCalories: calories,
        targetCalories: target,
        loggedMeals,
        streak,
        bond
    });

    return {
        key: status.key,
        ratio,
        frameKey: status.frameKey,
        messageKey: status.messageKey,
        mood: status.mood,
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
