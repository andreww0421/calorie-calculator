import { loadFavorites, saveFavorites } from '../storage.js';

export function loadFavoriteFoods() {
    return loadFavorites();
}

export function saveFavoriteFoods(favorites) {
    saveFavorites(favorites);
}
