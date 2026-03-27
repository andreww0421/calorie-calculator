import { bindUIActions } from './ui.js';
import { setupTurnstileHandlers } from './controllers/analysis-controller.js';
import {
    addRecordToFav,
    confirmAddFood,
    deleteItem
} from './controllers/record-controller.js';
import { bootstrapApp } from './controllers/bootstrap-controller.js';

setupTurnstileHandlers();

bindUIActions({
    confirmAddFood,
    deleteItem,
    addRecordToFav
});

document.addEventListener('DOMContentLoaded', bootstrapApp);
