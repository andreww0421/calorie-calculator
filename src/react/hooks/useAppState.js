import { useEffect, useState, useSyncExternalStore } from 'react';

const FALLBACK_APP_STATE = Object.freeze({
  selectedDate: '',
  curLang: 'zh-TW',
  curTheme: 'light',
  targetCalories: 0,
  currentMealMode: '4',
  currentGoalType: 'lose',
  loggedWeight: '',
  foodItems: Object.freeze([]),
  favoriteFoods: Object.freeze([]),
  tempAIResult: null,
  tempAIResultSaved: false,
  analysisFlow: Object.freeze({
    status: 'idle',
    source: 'none',
    cooldownRemaining: 0,
    quotaExceeded: false,
    isSoftError: false,
    lastError: '',
    verificationUnavailable: false,
    verificationMessage: ''
  }),
  profile: null
});

const FALLBACK_BRIDGE = Object.freeze({
  getAppState() {
    return FALLBACK_APP_STATE;
  },
  subscribeAppState() {
    return () => {};
  }
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
