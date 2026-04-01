import { PRODUCT_ANALYTICS_EVENTS } from './event-taxonomy.js';
import { trackProductEvent, trackProductEventOnce } from './analytics.js';

function toSafeText(value, fallback = '') {
    return String(value || fallback);
}

export function trackOnboardingCompleted(profile = {}) {
    return trackProductEventOnce(PRODUCT_ANALYTICS_EVENTS.ONBOARDING_COMPLETED, {
        region: toSafeText(profile.region),
        goalType: toSafeText(profile.goalType, 'lose'),
        diningOutFrequency: toSafeText(profile.diningOutFrequency, 'sometimes')
    }, 'global');
}

export function trackFirstLogCompleted(entry = {}, context = {}) {
    return trackProductEventOnce(PRODUCT_ANALYTICS_EVENTS.FIRST_LOG_COMPLETED, {
        source: toSafeText(context.source, 'manual'),
        mealType: toSafeText(entry.type, 'snack'),
        selectedDate: toSafeText(context.selectedDate),
        itemCount: Array.isArray(entry.items) ? entry.items.length : 0
    }, 'global');
}

export function trackAiAnalysisStarted(context = {}) {
    return trackProductEvent(PRODUCT_ANALYTICS_EVENTS.AI_ANALYSIS_STARTED, {
        source: toSafeText(context.source, 'text'),
        lang: toSafeText(context.lang, 'zh-TW'),
        hasImage: Boolean(context.hasImage),
        hasText: Boolean(context.hasText)
    });
}

export function trackAiAnalysisFailed(context = {}) {
    return trackProductEvent(PRODUCT_ANALYTICS_EVENTS.AI_ANALYSIS_FAILED, {
        source: toSafeText(context.source, 'text'),
        lang: toSafeText(context.lang, 'zh-TW'),
        error: toSafeText(context.error, 'unknown'),
        isSoftError: Boolean(context.isSoftError)
    });
}

export function trackAiResultCorrected(context = {}) {
    return trackProductEvent(PRODUCT_ANALYTICS_EVENTS.AI_RESULT_CORRECTED, {
        itemCount: Number(context.itemCount) || 0,
        correctionCount: Number(context.correctionCount) || 0,
        selectedDate: toSafeText(context.selectedDate),
        source: toSafeText(context.source, 'items')
    });
}

export function trackPetInteraction(context = {}) {
    return trackProductEvent(PRODUCT_ANALYTICS_EVENTS.PET_INTERACTION, {
        frameKey: toSafeText(context.frameKey, 'low'),
        mood: toSafeText(context.mood, 'neutral'),
        coachTipCount: Number(context.coachTipCount) || 0,
        messageCount: Number(context.messageCount) || 0
    });
}

export function trackRhythmSummaryViewed(context = {}) {
    const surface = toSafeText(context.surface, 'home');
    const selectedDate = toSafeText(context.selectedDate);
    return trackProductEventOnce(PRODUCT_ANALYTICS_EVENTS.RHYTHM_SUMMARY_VIEWED, {
        surface,
        selectedDate,
        headline: toSafeText(context.headline),
        signalCount: Number(context.signalCount) || 0
    }, `${surface}:${selectedDate || 'unknown'}`);
}
