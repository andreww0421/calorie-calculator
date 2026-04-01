function isFunction(value) {
    return typeof value === 'function';
}

export function isStorageAdapter(candidate) {
    return Boolean(candidate)
        && isFunction(candidate.getItem)
        && isFunction(candidate.setItem)
        && isFunction(candidate.removeItem)
        && isFunction(candidate.clear)
        && isFunction(candidate.key)
        && typeof candidate.length === 'number';
}

export function assertStorageAdapter(candidate) {
    if (!isStorageAdapter(candidate)) {
        throw new Error('Invalid storage adapter');
    }
    return candidate;
}

export function listStorageKeys(adapter) {
    const resolved = assertStorageAdapter(adapter);
    const keys = [];
    for (let index = 0; index < resolved.length; index += 1) {
        const key = resolved.key(index);
        if (key) keys.push(String(key));
    }
    return keys;
}
