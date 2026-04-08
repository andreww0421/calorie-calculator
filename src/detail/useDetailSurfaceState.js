import { useSyncExternalStore } from 'react';
import { useAppState } from '../react/hooks/useAppState.js';
import { buildDetailSurfaceViewModel } from './detail-view-model.js';

function getBridge() {
    return globalThis.window?.__woofDetailSurfaceBridge || {
        getState: () => null,
        subscribe: () => () => {}
    };
}

export function useDetailSurfaceState() {
    const appState = useAppState();
    const bridge = getBridge();
    const request = useSyncExternalStore(bridge.subscribe, bridge.getState, bridge.getState);

    if (!request || !request.kind) {
        return null;
    }

    return buildDetailSurfaceViewModel(appState, request);
}
