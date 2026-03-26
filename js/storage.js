import { APP_SCHEMA_VERSION, STORAGE_SCHEMA_KEY, USAGE_KEY } from './env.js';
import { getLocalDateString, safeParseJSON } from './utils.js';

function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function toNumber(value) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
}

function normalizeNutrition(source = {}) {
    const nutri = isPlainObject(source.nutri) ? source.nutri : source;
    return {
        calories: toNumber(nutri.calories ?? source.calories ?? source.cal ?? 0),
        protein: toNumber(nutri.protein ?? source.protein ?? 0),
        fat: toNumber(nutri.fat ?? source.fat ?? 0),
        carbohydrate: toNumber(nutri.carbohydrate ?? source.carbohydrate ?? source.carb ?? 0),
        sugar: toNumber(nutri.sugar ?? source.sugar ?? 0),
        sodium: toNumber(nutri.sodium ?? source.sodium ?? source.sod ?? 0),
        saturatedFat: toNumber(nutri.saturatedFat ?? source.saturatedFat ?? source.sat ?? 0),
        transFat: toNumber(nutri.transFat ?? source.transFat ?? source.trans ?? 0),
        fiber: toNumber(nutri.fiber ?? source.fiber ?? 0)
    };
}

function normalizeItems(items) {
    if (!Array.isArray(items)) return [];
    return items
        .filter(isPlainObject)
        .map((item) => ({
            name: String(item.name ?? '').trim(),
            weight: String(item.weight ?? '').trim()
        }))
        .filter((item) => item.name || item.weight);
}

function hasMeaningfulNutrition(nutri) {
    return Object.values(nutri).some((value) => Number(value) !== 0);
}

function normalizeRecordEntry(entry) {
    if (!isPlainObject(entry)) return null;

    const nutri = normalizeNutrition(entry);
    const items = normalizeItems(entry.items);
    const normalized = {
        type: String(entry.type || 'snack'),
        name: String(entry.name ?? '').trim(),
        nutri,
        items,
        healthScore: toNumber(entry.healthScore ?? 0)
    };

    return (normalized.name || items.length || hasMeaningfulNutrition(nutri)) ? normalized : null;
}

function normalizeFavoriteEntry(entry) {
    if (!isPlainObject(entry)) return null;

    const nutri = normalizeNutrition(entry);
    const items = normalizeItems(entry.items);
    const normalized = {
        name: String(entry.name ?? '').trim(),
        nutri,
        items,
        healthScore: toNumber(entry.healthScore ?? 0)
    };

    return (normalized.name || items.length || hasMeaningfulNutrition(nutri)) ? normalized : null;
}

function normalizeProfile(profile) {
    if (!isPlainObject(profile)) return null;

    return {
        gender: String(profile.gender || 'male'),
        age: String(profile.age ?? ''),
        height: String(profile.height ?? ''),
        weight: String(profile.weight ?? ''),
        activity: String(profile.activity || '1.2'),
        mealMode: String(profile.mealMode || '4'),
        goalType: String(profile.goalType || 'lose')
    };
}

function normalizeArray(entries, normalizer) {
    if (!Array.isArray(entries)) return [];
    return entries.map(normalizer).filter(Boolean);
}

function readNormalizedArray(key, normalizer) {
    const parsed = safeParseJSON(localStorage.getItem(key), []);
    const normalized = normalizeArray(parsed, normalizer);
    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
        localStorage.setItem(key, JSON.stringify(normalized));
    }
    return normalized;
}

function normalizeWeightKey(key) {
    const stored = localStorage.getItem(key);
    const weight = parseFloat(stored);
    if (!Number.isFinite(weight) || weight <= 0) {
        localStorage.removeItem(key);
        return Boolean(stored);
    }
    const normalized = String(weight);
    if (stored !== normalized) {
        localStorage.setItem(key, normalized);
        return true;
    }
    return false;
}

function migrateLegacyProfileKey() {
    const current = normalizeProfile(safeParseJSON(localStorage.getItem('myProfile_v5'), null));
    if (current) {
        localStorage.setItem('myProfile_v5', JSON.stringify(current));
        return false;
    }

    let migrated = false;
    for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith('myProfile') || key === 'myProfile_v5') continue;
        const legacyProfile = normalizeProfile(safeParseJSON(localStorage.getItem(key), null));
        if (legacyProfile && !migrated) {
            localStorage.setItem('myProfile_v5', JSON.stringify(legacyProfile));
            migrated = true;
        }
        localStorage.removeItem(key);
        i -= 1;
    }
    return migrated;
}

export function initializeStorage() {
    const previousSchema = Number(localStorage.getItem(STORAGE_SCHEMA_KEY)) || 0;
    let migrated = previousSchema !== APP_SCHEMA_VERSION;

    migrated = migrateLegacyProfileKey() || migrated;

    const favoriteKeys = ['myFavorites'];
    favoriteKeys.forEach((key) => {
        const before = localStorage.getItem(key);
        const after = JSON.stringify(readNormalizedArray(key, normalizeFavoriteEntry));
        migrated = migrated || before !== after;
    });

    for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (!key) continue;

        if (key.startsWith('record_')) {
            const before = localStorage.getItem(key);
            const after = JSON.stringify(readNormalizedArray(key, normalizeRecordEntry));
            migrated = migrated || before !== after;
        }

        if (key.startsWith('weight_')) {
            migrated = normalizeWeightKey(key) || migrated;
        }
    }

    const profile = normalizeProfile(safeParseJSON(localStorage.getItem('myProfile_v5'), null));
    if (profile) {
        localStorage.setItem('myProfile_v5', JSON.stringify(profile));
    }

    localStorage.setItem(STORAGE_SCHEMA_KEY, String(APP_SCHEMA_VERSION));
    return { migrated, schemaVersion: APP_SCHEMA_VERSION };
}

export function loadFavorites() {
    return readNormalizedArray('myFavorites', normalizeFavoriteEntry);
}

export function saveFavorites(favorites) {
    localStorage.setItem(
        'myFavorites',
        JSON.stringify(normalizeArray(favorites, normalizeFavoriteEntry))
    );
}

export function loadSetting(key, fallbackValue) {
    return localStorage.getItem(key) || fallbackValue;
}

export function saveSetting(key, value) {
    localStorage.setItem(key, value);
}

export function saveFoodData(date, items) {
    localStorage.setItem(
        `record_${date}`,
        JSON.stringify(normalizeArray(items, normalizeRecordEntry))
    );
}

export function loadFoodData(date) {
    return readNormalizedArray(`record_${date}`, normalizeRecordEntry);
}

export function saveWeightData(date, weightValue) {
    const weight = parseFloat(weightValue);
    if (!Number.isFinite(weight) || weight <= 0) return false;
    localStorage.setItem(`weight_${date}`, String(weight));
    return true;
}

export function loadWeightData(date) {
    const stored = localStorage.getItem(`weight_${date}`);
    if (!stored) return null;
    const weight = parseFloat(stored);
    return Number.isFinite(weight) && weight > 0 ? weight : null;
}

export function getWeightHistory(days = 30) {
    const history = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i -= 1) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = getLocalDateString(d);
        history.push({
            date: dateStr.slice(5),
            weight: loadWeightData(dateStr)
        });
    }
    return history;
}

export function saveProfile(profile) {
    const normalized = normalizeProfile(profile);
    if (!normalized) return false;
    localStorage.setItem('myProfile_v5', JSON.stringify(normalized));
    return true;
}

export function loadProfile() {
    const profile = normalizeProfile(safeParseJSON(localStorage.getItem('myProfile_v5'), null));
    if (!profile) return null;
    localStorage.setItem('myProfile_v5', JSON.stringify(profile));
    return profile;
}

export function exportData() {
    const data = {
        [STORAGE_SCHEMA_KEY]: String(APP_SCHEMA_VERSION)
    };

    for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (
            key &&
            (
                key.startsWith('record_') ||
                key.startsWith('weight_') ||
                key.startsWith('myProfile') ||
                key === 'myFavorites' ||
                key === 'appLang' ||
                key === 'appTheme'
            )
        ) {
            data[key] = localStorage.getItem(key);
        }
    }

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `nutrition_backup_${getLocalDateString()}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
}

function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(String(event.target?.result || ''));
        reader.onerror = () => reject(new Error('File read failed'));
        reader.readAsText(file);
    });
}

export async function importData(file) {
    if (!file) return false;

    const text = await readFileAsText(file);
    const data = safeParseJSON(text, null);
    if (!isPlainObject(data)) throw new Error('Invalid backup');

    const allowedKeys = Object.keys(data).filter((key) => (
        key.startsWith('record_') ||
        key.startsWith('weight_') ||
        key.startsWith('myProfile') ||
        key === 'myFavorites' ||
        key === 'appLang' ||
        key === 'appTheme' ||
        key === STORAGE_SCHEMA_KEY
    ));

    if (allowedKeys.length === 0) throw new Error('No valid keys');

    for (const key of allowedKeys) {
        if (typeof data[key] === 'string') {
            localStorage.setItem(key, data[key]);
        }
    }

    initializeStorage();
    return true;
}

export function getCalorieHistory(days = 7) {
    const history = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i -= 1) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = getLocalDateString(d);
        const dayItems = loadFoodData(dateStr);
        let calories = 0;
        dayItems.forEach((item) => {
            calories += toNumber(item?.nutri?.calories);
        });
        history.push({ date: dateStr.slice(5), calories: Math.round(calories) });
    }
    return history;
}

export function getProteinHistory(days = 7) {
    const history = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i -= 1) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = getLocalDateString(d);
        const dayItems = loadFoodData(dateStr);
        let protein = 0;
        dayItems.forEach((item) => {
            protein += toNumber(item?.nutri?.protein);
        });
        history.push({ date: dateStr.slice(5), protein: Math.round(protein * 10) / 10 });
    }
    return history;
}

export function loadUsageState() {
    const today = getLocalDateString();
    const usage = safeParseJSON(localStorage.getItem(USAGE_KEY), {});
    if (usage?.date !== today) {
        return { date: today, count: 0 };
    }

    return {
        date: today,
        count: Number(usage.count) || 0
    };
}

export function saveUsageState(usage) {
    const normalized = {
        date: usage?.date || getLocalDateString(),
        count: Number(usage?.count) || 0
    };
    localStorage.setItem(USAGE_KEY, JSON.stringify(normalized));
    return normalized;
}
