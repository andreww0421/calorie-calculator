import { clearDetailSurfaceState, showDailyDetailSurface, showItemDetailSurface } from './detail-surface-bridge.js';

function prepareDetailModalOpen() {
    const modal = document.getElementById('detail-modal');
    const reactContent = document.getElementById('detail-react-root');

    if (!modal) return null;

    delete modal.dataset.closingToken;
    reactContent?.classList.remove('modal-exit');
    return modal;
}

export function showDetailModal(index) {
    const item = window.__woofAppStateBridge?.getAppState?.()?.foodItems?.[index];
    if (item) renderDetailModal(item);
}

export function showFavDetailModal(index) {
    const item = window.__woofAppStateBridge?.getAppState?.()?.favoriteFoods?.[index];
    if (item) renderDetailModal(item);
}

export function renderDetailModal(item) {
    const reactRoot = document.getElementById('detail-react-root');
    if (!reactRoot) return;

    clearDetailSurfaceState();
    showItemDetailSurface(item);
    const modal = prepareDetailModalOpen();
    if (modal) modal.style.display = 'flex';
}

export function showDailyNutritionSummary(summary) {
    if (!summary) return;
    showDailyDetailSurface();
    const modal = prepareDetailModalOpen();
    if (modal) modal.style.display = 'flex';
}

export { renderDetailModal as _renderDetailModal };
