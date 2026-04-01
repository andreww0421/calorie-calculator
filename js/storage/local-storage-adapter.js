import { assertStorageAdapter } from './storage-adapter.js';

function getDefaultStorageSource() {
    return globalThis.localStorage;
}

export function createLocalStorageAdapter(storageSource = getDefaultStorageSource) {
    const resolveStorage = () => {
        const source = typeof storageSource === 'function' ? storageSource() : storageSource;
        return assertStorageAdapter(source);
    };

    return {
        kind: 'localStorage',
        get length() {
            return resolveStorage().length;
        },
        key(index) {
            return resolveStorage().key(index);
        },
        getItem(key) {
            return resolveStorage().getItem(key);
        },
        setItem(key, value) {
            resolveStorage().setItem(key, value);
        },
        removeItem(key) {
            resolveStorage().removeItem(key);
        },
        clear() {
            resolveStorage().clear();
        }
    };
}
