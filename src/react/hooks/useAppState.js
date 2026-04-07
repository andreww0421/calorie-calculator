import { useSyncExternalStore } from 'react';
import { getAppState, subscribeAppState } from '../../../js/state/app-state.js';

function getBridge() {
  return globalThis.window?.__woofAppStateBridge || {
    getAppState,
    subscribeAppState
  };
}

export function useAppState() {
  const bridge = getBridge();
  return useSyncExternalStore(
    bridge.subscribeAppState,
    bridge.getAppState,
    bridge.getAppState
  );
}
