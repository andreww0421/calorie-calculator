export function toBase64(file) {
    return new Promise((r, j) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => r(reader.result.split(',')[1]);
        reader.onerror = j;
    });
}

export function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function parseLocalDateString(dateText) {
    if (typeof dateText !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateText)) {
        return null;
    }

    const [yearText, monthText, dayText] = dateText.split('-');
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);

    if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
        return null;
    }

    const date = new Date(year, month - 1, day);
    if (
        date.getFullYear() !== year
        || date.getMonth() !== month - 1
        || date.getDate() !== day
    ) {
        return null;
    }

    return date;
}

export function clampDateString(dateText, {
    max = getLocalDateString(),
    fallback = getLocalDateString()
} = {}) {
    const normalized = parseLocalDateString(dateText);
    if (!normalized) return fallback;

    const maxDate = parseLocalDateString(max);
    const normalizedText = getLocalDateString(normalized);

    if (maxDate && normalizedText > getLocalDateString(maxDate)) {
        return getLocalDateString(maxDate);
    }

    return normalizedText;
}

export function shiftLocalDateString(dateText, offsetDays = 0, {
    fallback = getLocalDateString()
} = {}) {
    const baseDate = parseLocalDateString(dateText) || parseLocalDateString(fallback) || new Date();
    const nextDate = new Date(baseDate);
    nextDate.setDate(nextDate.getDate() + (Number(offsetDays) || 0));
    return getLocalDateString(nextDate);
}

export function getMonthDayLabel(date = new Date()) {
    return getLocalDateString(date).slice(5);
}

export function safeParseJSON(value, fallback = null) {
    if (typeof value !== 'string' || value === '') return fallback;
    try {
        return JSON.parse(value);
    } catch (error) {
        return fallback;
    }
}

export function escapeHTML(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
