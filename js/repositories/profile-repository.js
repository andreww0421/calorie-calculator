import { loadProfile, saveProfile } from '../storage.js';

export function loadProfileRecord() {
    return loadProfile();
}

export function saveProfileRecord(profile) {
    return saveProfile(profile);
}
