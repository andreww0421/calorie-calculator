import { loadSetting, saveSetting } from '../storage.js';

export const SUPPORTED_APP_LANGUAGES = Object.freeze(['zh-TW', 'zh-CN', 'en']);

export function normalizeSupportedLanguage(lang, fallback = 'zh-TW') {
    const requested = String(lang || '').trim();
    if (SUPPORTED_APP_LANGUAGES.includes(requested)) {
        return requested;
    }
    return fallback;
}

export function loadAppLanguage() {
    return normalizeSupportedLanguage(loadSetting('appLang', 'zh-TW'));
}

export function saveAppLanguage(lang) {
    saveSetting('appLang', normalizeSupportedLanguage(lang));
}

export function loadAppTheme() {
    return loadSetting('appTheme', 'light');
}

export function saveAppTheme(theme) {
    saveSetting('appTheme', theme);
}
