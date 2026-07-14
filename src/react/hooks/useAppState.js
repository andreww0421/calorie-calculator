import { useSyncExternalStore } from 'react';
import {
  getAppState,
  subscribeAppState
} from '../../../js/state/app-state.js';

const LOCAL_APP_STATE_BRIDGE = Object.freeze({
  getAppState,
  subscribeAppState
});

function getBridge() {
  const bridge = globalThis.window?.__woofAppStateBridge;
  if (
    typeof bridge?.getAppState === 'function'
    && typeof bridge?.subscribeAppState === 'function'
  ) {
    return bridge;
  }
  return LOCAL_APP_STATE_BRIDGE;
}

export function useAppState() {
  const bridge = getBridge();
  return useSyncExternalStore(
    bridge.subscribeAppState,
    bridge.getAppState,
    getAppState
  );
}
