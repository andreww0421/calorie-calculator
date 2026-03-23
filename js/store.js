import { getLocalDateString } from './utils.js';
import { loadFavorites, loadSetting } from './storage.js';

export let foodItems = [];
export let targetCalories = 2000;
export let tempAIResult = null;
export let tempAIResultSaved = false;
export let selectedDate = getLocalDateString();
export let currentMealMode = "4";
export let favoriteFoods = loadFavorites();
export let curLang = loadSetting('appLang', "zh-TW");
export let curTheme = loadSetting('appTheme', "light");

export function setFoodItems(v) { foodItems = Array.isArray(v) ? v : []; }
export function setTargetCalories(v) { targetCalories = v; }
export function setTempAIResult(v) { tempAIResult = v; }
export function setTempAIResultSaved(v) { tempAIResultSaved = v; }
export function setSelectedDate(v) { selectedDate = v; }
export function setCurrentMealMode(v) { currentMealMode = v; }
export function setFavoriteFoods(v) { favoriteFoods = Array.isArray(v) ? v : []; }
export function setCurLang(v) { curLang = v; }
export function setCurTheme(v) { curTheme = v; }
