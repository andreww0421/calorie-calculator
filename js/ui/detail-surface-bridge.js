const listeners = new Set();
let detailSurfaceState = null;

function emitChange() {
    listeners.forEach((listener) => listener());
}

export function getDetailSurfaceState() {
    return detailSurfaceState;
}

export function subscribeDetailSurfaceState(listener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function showDailyDetailSurface() {
    detailSurfaceState = {
        kind: 'daily-summary',
        openedAt: Date.now()
    };
    emitChange();
}

export function showItemDetailSurface(item) {
    detailSurfaceState = {
        kind: 'item-detail',
        item: item
            ? (typeof structuredClone === 'function'
                ? structuredClone(item)
                : JSON.parse(JSON.stringify(item)))
            : null,
        openedAt: Date.now()
    };
    emitChange();
}

export function clearDetailSurfaceState() {
    if (!detailSurfaceState) return;
    detailSurfaceState = null;
    emitChange();
}
