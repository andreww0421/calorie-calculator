export function formatNumber(value, digits = 0) {
    const numeric = Number(value) || 0;
    if (digits === 0) return String(Math.round(numeric));
    return numeric.toFixed(digits);
}

export function createEmptyMealDraft() {
    return {
        name: '',
        type: 'breakfast',
        calories: '',
        protein: '',
        carbohydrate: '',
        fat: ''
    };
}

export function createProfileDraft(profile = {}) {
    const source = profile && typeof profile === 'object' ? profile : {};
    return {
        gender: String(source.gender || 'male'),
        age: String(source.age || ''),
        height: String(source.height || ''),
        weight: String(source.weight || ''),
        activity: String(source.activity || '1.2'),
        mealMode: String(source.mealMode || '4'),
        goalType: String(source.goalType || 'lose'),
        region: String(source.region || 'taiwan'),
        diningOutFrequency: String(source.diningOutFrequency || 'sometimes')
    };
}

export function buildMealEntries(items = [], untitledMeal = 'Untitled meal') {
    return items.map((item, index) => {
        const nutrition = item?.nutri || {};
        return {
            id: `${String(item?.type || 'snack')}-${index}`,
            index,
            name: String(item?.name || '').trim() || untitledMeal,
            type: String(item?.type || 'snack'),
            calories: Number(nutrition.calories ?? nutrition.cal ?? 0) || 0,
            protein: Number(nutrition.protein ?? nutrition.pro ?? 0) || 0,
            carb: Number(nutrition.carbohydrate ?? nutrition.carb ?? 0) || 0,
            fat: Number(nutrition.fat ?? 0) || 0
        };
    });
}

export function summarizeMeals(entries) {
    return entries.reduce((summary, entry) => {
        summary.calories += entry.calories;
        summary.protein += entry.protein;
        summary.carb += entry.carb;
        summary.fat += entry.fat;
        return summary;
    }, {
        calories: 0,
        protein: 0,
        carb: 0,
        fat: 0
    });
}
