import { exportData, importData, initializeStorage } from '../storage.js';

export function initializeBackupStorage() {
    return initializeStorage();
}

export function exportBackup() {
    return exportData();
}

export function importBackup(file) {
    return importData(file);
}
