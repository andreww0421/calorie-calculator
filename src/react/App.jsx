import React from 'react';
import { HomeIsland } from '../home/index.js';

function noop() {}

export default function App({
    onQuickLog = noop,
    onOpenAI = noop,
    onOpenFavorites = noop,
    onSetSelectedDate = noop,
    onShiftDate = noop,
    onFavoriteMealItem = noop,
    onDeleteMealItem = noop,
    onOpenRhythm = noop,
    onOpenDailySummary = noop
}) {
    return (
        <HomeIsland
            onQuickLog={onQuickLog}
            onOpenAI={onOpenAI}
            onOpenFavorites={onOpenFavorites}
            onSetSelectedDate={onSetSelectedDate}
            onShiftDate={onShiftDate}
            onFavoriteMealItem={onFavoriteMealItem}
            onDeleteMealItem={onDeleteMealItem}
            onOpenRhythm={onOpenRhythm}
            onOpenDailySummary={onOpenDailySummary}
        />
    );
}
