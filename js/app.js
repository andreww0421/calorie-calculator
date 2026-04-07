import { bindUIActions } from './ui.js';
import { setupTurnstileHandlers } from './controllers/analysis-controller.js';
import { getAppState, subscribeAppState } from './state/app-state.js';
import {
    addRecordToFav,
    confirmAddFood,
    deleteItem
} from './controllers/record-controller.js';
import { bootstrapApp } from './controllers/bootstrap-controller.js';

if (typeof window !== 'undefined') {
    window.__woofAppStateBridge = {
        getAppState,
        subscribeAppState
    };
}

setupTurnstileHandlers();

bindUIActions({
    confirmAddFood,
    deleteItem,
    addRecordToFav
});

document.addEventListener('DOMContentLoaded', bootstrapApp);
