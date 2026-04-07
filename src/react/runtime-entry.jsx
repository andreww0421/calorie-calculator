import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

window.__woofReactHomeStatus = 'bundle-loaded';

function clickById(id) {
    return () => {
        document.getElementById(id)?.click();
    };
}

function openTodayMealsDatePicker() {
    document.getElementById('btn-change-log-date')?.click();
}

function openRhythmSurface() {
    document.querySelector('.nav-item[data-target="view-dashboard"]')?.click();
}

function mountHomeIsland() {
    const rootElement = document.getElementById('home-react-root');
    const dailyView = document.getElementById('view-daily');

    if (!rootElement || rootElement.dataset.mounted === 'true') return;

    try {
        rootElement.dataset.mounted = 'true';
        dailyView?.classList.add('react-home-enabled');

        ReactDOM.createRoot(rootElement).render(
            <React.StrictMode>
                <App
                    onQuickLog={clickById('btn-home-log-hub')}
                    onOpenAI={clickById('btn-home-ai')}
                    onOpenFavorites={clickById('btn-home-favorites')}
                    onOpenTodayMeals={openTodayMealsDatePicker}
                    onOpenRhythm={openRhythmSurface}
                />
            </React.StrictMode>
        );

        window.__woofReactHomeStatus = 'mounted';
    } catch (error) {
        rootElement.dataset.mounted = 'false';
        dailyView?.classList.remove('react-home-enabled');
        window.__woofReactHomeStatus = 'failed';
        window.__woofReactHomeError = String(error?.stack || error || 'Unknown React home mount error');
        console.error('React home mount failed', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountHomeIsland, { once: true });
} else {
    mountHomeIsland();
}
