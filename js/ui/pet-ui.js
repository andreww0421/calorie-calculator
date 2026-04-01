import { getAppState } from '../state/app-state.js';
import { createPetViewModel } from '../state/pet-selectors.js';
import {
    buildPetInteractionMessages,
    buildPetState,
    pickPetInteractionMessage
} from '../domain/pet-domain.js';
import { trackPetInteraction } from '../analytics/product-events.js';
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

function resolveFrameSource(frameKey = 'low') {
    return PET_FRAMES[frameKey] || PET_FRAMES.low;
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

function resolvePetRenderModel(input, options = {}) {
    if (input?.frameKey && input?.messageKey) {
        return input;
    }

    const state = getAppState();
    if (input === undefined || input === null) {
        return createPetViewModel(state);
    }

    const targetCalories = Number(options.targetCalories) || Number(state?.targetCalories) || 2000;
    const totalCalories = typeof input === 'object'
        ? Number(input?.cal) || 0
        : Number(input) || 0;
    const pet = buildPetState({
        totalCalories,
        targetCalories,
        loggedMeals: Array.isArray(state?.foodItems) ? state.foodItems.length : 0
    });

    return {
        frameKey: pet.frameKey,
        messageKey: pet.messageKey,
        progress: pet.progress
    };
}

function resolvePetMessage(messageKey, texts) {
    const fallbackMessages = {
        petMsg1: 'Hungry...',
        petMsg2: 'Getting better...',
        petMsg3: 'Looking for food...',
        petMsg4: 'Nice balance!',
        petMsg5: 'Too full!',
        petEatMsg: 'Nom nom...'
    };
    return texts?.[messageKey] || fallbackMessages[messageKey] || '';
}

export function updatePetStatus(currentCal, options = {}) {
    const viewModel = resolvePetRenderModel(currentCal, options);
    const petImg = document.getElementById('pet-img');
    const petMsg = document.getElementById('pet-msg');
    const t = getTexts();

    if (!petImg || !petMsg) return;

    const frame = resolveFrameSource(viewModel.frameKey);
    const message = resolvePetMessage(viewModel.messageKey, t);

    setPetFrame(petImg, frame, {
        defer: petImg.getAttribute('src') === PET_PLACEHOLDER_SRC
    });
    petImg.dataset.petFrameKey = String(viewModel.frameKey || 'low');
    petImg.dataset.petMood = String(viewModel.progress?.mood || '');
    petMsg.dataset.petMessage = message;
    petMsg.dataset.petMessageKey = String(viewModel.messageKey || '');
    petMsg.innerText = message;
}

export function showEatingAnimation() {
    const petImg = document.getElementById('pet-img');
    const petMsg = document.getElementById('pet-msg');
    const t = getTexts();
    if (!petImg || !petMsg) return;

    clearTimeout(petTimeout);
    const previousFrameKey = petImg.dataset.petFrameKey || 'low';
    const previousMessage = petMsg.innerText;

    setPetFrame(petImg, resolveFrameSource('eating'));
    petMsg.innerText = resolvePetMessage('petEatMsg', t);

    petTimeout = setTimeout(() => {
        setPetFrame(petImg, resolveFrameSource(previousFrameKey));
        petMsg.innerText = previousMessage;
    }, 1400);
}

export function petInteraction() {
    const state = getAppState();
    const petMsg = document.getElementById('pet-msg');
    if (!petMsg) return;
    const t = getTexts();
    const petViewModel = createPetViewModel(state);
    const { coach, interactionMessageKeys } = petViewModel;
    const coachTips = buildCoachContent(coach, state.curLang).tips;
    const messages = buildPetInteractionMessages({
        coachTips,
        defaultMessages: (interactionMessageKeys || []).map((key) => t[key]).filter(Boolean)
    });

    if (messages.length === 0) return;
    trackPetInteraction({
        frameKey: petViewModel.frameKey,
        mood: petViewModel.progress?.mood,
        coachTipCount: coachTips.length,
        messageCount: messages.length
    });
    petMsg.innerText = pickPetInteractionMessage({ messages });
}
