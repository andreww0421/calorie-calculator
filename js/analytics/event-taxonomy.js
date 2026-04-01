export const PRODUCT_ANALYTICS_EVENTS = Object.freeze({
    ONBOARDING_COMPLETED: 'onboarding_completed',
    FIRST_LOG_COMPLETED: 'first_log_completed',
    AI_ANALYSIS_STARTED: 'ai_analysis_started',
    AI_ANALYSIS_FAILED: 'ai_analysis_failed',
    AI_RESULT_CORRECTED: 'ai_result_corrected',
    PET_INTERACTION: 'pet_interaction',
    RHYTHM_SUMMARY_VIEWED: 'rhythm_summary_viewed'
});

export const PRODUCT_EVENT_TAXONOMY = Object.freeze({
    [PRODUCT_ANALYTICS_EVENTS.ONBOARDING_COMPLETED]: Object.freeze({
        area: 'onboarding',
        description: 'Profile onboarding transitions from incomplete to complete.'
    }),
    [PRODUCT_ANALYTICS_EVENTS.FIRST_LOG_COMPLETED]: Object.freeze({
        area: 'logging',
        description: 'The user successfully adds their first meal log.'
    }),
    [PRODUCT_ANALYTICS_EVENTS.AI_ANALYSIS_STARTED]: Object.freeze({
        area: 'ai',
        description: 'An AI meal analysis request is submitted.'
    }),
    [PRODUCT_ANALYTICS_EVENTS.AI_ANALYSIS_FAILED]: Object.freeze({
        area: 'ai',
        description: 'An AI meal analysis request fails or is rejected.'
    }),
    [PRODUCT_ANALYTICS_EVENTS.AI_RESULT_CORRECTED]: Object.freeze({
        area: 'ai',
        description: 'A corrected AI result is recalculated from edited draft items.'
    }),
    [PRODUCT_ANALYTICS_EVENTS.PET_INTERACTION]: Object.freeze({
        area: 'companion',
        description: 'The user taps the dog companion and receives an interaction response.'
    }),
    [PRODUCT_ANALYTICS_EVENTS.RHYTHM_SUMMARY_VIEWED]: Object.freeze({
        area: 'insights',
        description: 'A 7-day rhythm summary surface becomes visible to the user.'
    })
});

export function isKnownProductAnalyticsEvent(name) {
    return Boolean(name) && Object.hasOwn(PRODUCT_EVENT_TAXONOMY, name);
}
