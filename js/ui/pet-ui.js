import { getAppState } from '../state/app-state.js';
import { createPetCoachingViewModel } from '../state/app-selectors.js';
import { buildCoachContent } from './locale-ui.js';
import { getTexts } from './shared-ui.js';

export let petTimeout = null;

export const PET_PLACEHOLDER_SRC = 'pet_placeholder.svg';

const PET_FRAMES = {
    hungry: 'dog_animation/dog_sad.gif',
    low: 'dog_animation/dog_idle.gif',
    mid: 'dog_animation/dog_walk.gif',
    balanced: 'dog_animation/dog_happy.gif',
    full: 'dog_animation/dog_fat.gif',
    eating: 'dog_animation/dog_eat.gif'
};

function afterNextPaint(callback) {
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(callback);
        });
        return;
    }
    setTimeout(callback, 0);
}

function setPetFrame(petImg, frame, options = {}) {
    if (!petImg) return;

    const applyFrame = () => {
        petImg.onerror = () => {
            petImg.onerror = null;
            petImg.src = PET_FRAMES.low;
            petImg.dataset.petReady = 'true';
        };
        petImg.src = frame;
        petImg.dataset.petReady = 'true';
    };

    if (options.defer && petImg.dataset.petReady !== 'true') {
        afterNextPaint(applyFrame);
        return;
    }

    applyFrame();
}

export function updatePetStatus(currentCal, options = {}) {
    const { targetCalories } = getAppState();
    const target = Number(options.targetCalories) || Number(targetCalories) || 2000;
    const totalCalories = typeof currentCal === 'object'
        ? Number(currentCal?.cal) || 0
        : Number(currentCal) || 0;
    const ratio = Math.min(totalCalories / target, 1.4);
    const petImg = document.getElementById('pet-img');
    const petMsg = document.getElementById('pet-msg');
    const t = getTexts();

    if (!petImg || !petMsg) return;

    let frame = PET_FRAMES.hungry;
    let message = t.petMsg1 || 'Hungry...';

    if (ratio >= 1.1) {
        frame = PET_FRAMES.full;
        message = t.petMsg5 || 'Too full!';
    } else if (ratio >= 0.85) {
        frame = PET_FRAMES.balanced;
        message = t.petMsg4 || 'Nice balance!';
    } else if (ratio >= 0.55) {
        frame = PET_FRAMES.mid;
        message = t.petMsg3 || 'Looking for food...';
    } else if (ratio >= 0.25) {
        frame = PET_FRAMES.low;
        message = t.petMsg2 || 'Getting better...';
    }

    setPetFrame(petImg, frame, {
        defer: petImg.getAttribute('src') === PET_PLACEHOLDER_SRC
    });
    petMsg.innerText = message;
}

export function showEatingAnimation() {
    const petImg = document.getElementById('pet-img');
    const petMsg = document.getElementById('pet-msg');
    const t = getTexts();
    if (!petImg || !petMsg) return;

    clearTimeout(petTimeout);
    const previousSrc = petImg.src;
    const previousMsg = petMsg.innerText;

    setPetFrame(petImg, PET_FRAMES.eating);
    petMsg.innerText = t.petEatMsg || 'Nom nom...';

    petTimeout = setTimeout(() => {
        petImg.src = previousSrc;
        petMsg.innerText = previousMsg;
    }, 1400);
}

export function petInteraction() {
    const state = getAppState();
    const petMsg = document.getElementById('pet-msg');
    if (!petMsg) return;
    const t = getTexts();
    const { coach } = createPetCoachingViewModel(state);
    const coachTips = buildCoachContent(coach, state.curLang).tips;
    const messages = [
        ...coachTips,
        t.petInteractMsg1,
        t.petInteractMsg2,
        t.petInteractMsg3,
        t.petInteractMsg4,
        t.petInteractMsg5
    ].filter(Boolean);

    if (messages.length === 0) return;
    petMsg.innerText = messages[Math.floor(Math.random() * messages.length)];
}
