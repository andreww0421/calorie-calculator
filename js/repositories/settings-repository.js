import { loadSetting, saveSetting } from '../storage.js';

export function loadAppLanguage() {
    return loadSetting('appLang', 'zh-TW');
}

export function saveAppLanguage(lang) {
    saveSetting('appLang', lang);
}

export function loadAppTheme() {
    return loadSetting('appTheme', 'light');
}

export function saveAppTheme(theme) {
    saveSetting('appTheme', theme);
}
