import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { DetailSurface } from '../detail/index.js';
import '../detail/detail-surface.css';

window.__woofReactHomeStatus = 'bundle-loaded';

function getUiBridge() {
    return window.__woofUiBridge || {
        openHomeLogModal() {},
        openAIView() {},
        openFavorites() {},
        openTodayMealsDatePicker() {},
        openRhythmView() {},
        openDailySummaryDetail() {},
        closeDetailModal() {}
    };
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
                    onQuickLog={() => getUiBridge().openHomeLogModal()}
                    onOpenAI={() => getUiBridge().openAIView()}
                    onOpenFavorites={() => getUiBridge().openFavorites()}
                    onOpenTodayMeals={() => getUiBridge().openTodayMealsDatePicker()}
                    onOpenRhythm={() => getUiBridge().openRhythmView()}
                    onOpenDailySummary={() => getUiBridge().openDailySummaryDetail()}
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

function mountDetailSurface() {
    const rootElement = document.getElementById('detail-react-root');
    if (!rootElement || rootElement.dataset.mounted === 'true') return;

    try {
        rootElement.dataset.mounted = 'true';
        ReactDOM.createRoot(rootElement).render(
            <React.StrictMode>
                <DetailSurface onClose={() => getUiBridge().closeDetailModal()} />
            </React.StrictMode>
        );
    } catch (error) {
        rootElement.dataset.mounted = 'false';
        console.error('React detail surface mount failed', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        mountHomeIsland();
        mountDetailSurface();
    }, { once: true });
} else {
    mountHomeIsland();
    mountDetailSurface();
}
