import { localeCatalog } from './catalog.js';
import { BASE_TRANSLATIONS } from './base-translations.js';

const cache = new Map();

function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function mergeLocale(base, override) {
    const output = { ...base };

    if (!isPlainObject(override)) {
        return output;
    }

    Object.entries(override).forEach(([key, value]) => {
        if (isPlainObject(value) && isPlainObject(base[key])) {
            output[key] = mergeLocale(base[key], value);
            return;
        }

        if (value !== undefined && value !== null) {
            output[key] = value;
        }
    });

    return output;
}

export function getLocaleTranslations(lang = 'zh-TW') {
    const localeKey = String(lang || 'zh-TW');

    if (!cache.has(localeKey)) {
        const merged = mergeLocale(
            BASE_TRANSLATIONS,
            localeCatalog[localeKey] || localeCatalog.en || {}
        );
        cache.set(localeKey, merged);
    }

    return cache.get(localeKey);
}

export function clearLocaleCache() {
    cache.clear();
}

export const supportedLocales = Object.freeze(Object.keys(localeCatalog));
