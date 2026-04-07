import React from 'react';
import { HomeIsland } from '../home/index.js';

function noop() {}

export default function App({
    onQuickLog = noop,
    onOpenAI = noop,
    onOpenFavorites = noop,
    onOpenTodayMeals = noop,
    onOpenRhythm = noop
}) {
    return (
        <HomeIsland
            onQuickLog={onQuickLog}
            onOpenAI={onOpenAI}
            onOpenFavorites={onOpenFavorites}
            onOpenTodayMeals={onOpenTodayMeals}
            onOpenRhythm={onOpenRhythm}
        />
    );
}
