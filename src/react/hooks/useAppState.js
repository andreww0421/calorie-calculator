import { useEffect, useState, useSyncExternalStore } from 'react';
import { getAppState, subscribeAppState } from '../../../js/state/app-state.js';

const FALLBACK_BRIDGE = Object.freeze({
  getAppState,
  subscribeAppState
});

function getBridge() {
  return globalThis.window?.__woofAppStateBridge || FALLBACK_BRIDGE;
}

export function useAppState() {
  const [bridgeReady, setBridgeReady] = useState(() => Boolean(globalThis.window?.__woofAppStateBridge));

  useEffect(() => {
    if (bridgeReady || typeof window === 'undefined') return undefined;

    let frameId = 0;
    const waitForBridge = () => {
      if (window.__woofAppStateBridge) {
        setBridgeReady(true);
        return;
      }
      frameId = window.requestAnimationFrame(waitForBridge);
    };

    frameId = window.requestAnimationFrame(waitForBridge);
    return () => window.cancelAnimationFrame(frameId);
  }, [bridgeReady]);

  const bridge = getBridge();
  return useSyncExternalStore(
    bridge.subscribeAppState,
    bridge.getAppState,
    bridge.getAppState
  );
}
