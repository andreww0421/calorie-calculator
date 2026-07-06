import { getLocaleTranslations } from '../../../js/locales/index.js';

export function getNavItems(lang) {
    const t = getLocaleTranslations(lang);
    return [
        { id: 'today', label: t.navHome || 'Today' },
        { id: 'add', label: t.navAdd || 'Add' },
        { id: 'history', label: t.navHistory || 'History' },
        { id: 'stats', label: t.navStats || 'Stats' },
        { id: 'profile', label: t.navProfile || 'Profile' }
    ];
}

export const BRIDGE_FALLBACK = Object.freeze({
    openHomeLogModal() {},
    openAIView() {},
    openFavorites() {},
    setSelectedDate() {},
    shiftSelectedDate() {},
    addRecordToFavorites() {},
    deleteMealRecord() {},
    openDailySummaryDetail() {}
});
