import test from 'node:test';
import assert from 'node:assert/strict';

import {
    createAICorrectionEntry,
    extractAnalysisFromGeminiPayload,
    normalizeAIAnalysisResult,
    normalizeAIItem,
    normalizeTempAIResult
} from '../js/domain/ai-analysis-domain.js';

test('normalizeAIItem trims usable values', () => {
    assert.deepEqual(normalizeAIItem({ name: '  Rice ', weight: ' 120 ' }), {
        name: 'Rice',
        weight: '120'
    });
    assert.equal(normalizeAIItem({ name: ' ', weight: ' ' }), null);
});

test('normalizeAIAnalysisResult clamps and normalizes AI data', () => {
    const normalized = normalizeAIAnalysisResult({
        foodName: 'Protein Bowl',
        calories: '620',
        protein: '48.25',
        fat: '18.2',
        carbohydrate: '55.9',
        sugar: 9,
        sodium: 880,
        saturatedFat: 3.26,
        transFat: 0,
        fiber: 7.1,
        healthScore: 12,
        items: [
            { name: 'Rice', weight: '150' },
            { name: 'Chicken', weight: '120' }
        ]
    });

    assert.equal(normalized.foodName, 'Protein Bowl');
    assert.equal(normalized.protein, 48.3);
    assert.equal(normalized.healthScore, 10);
    assert.equal(normalized.items.length, 2);
});

test('normalizeAIAnalysisResult preserves the full nutrition schema and defaults missing fields safely', () => {
    const normalized = normalizeAIAnalysisResult({
        foodName: 'Toast',
        calories: '120.8',
        protein: '4.44',
        fat: '1.2',
        carb: '21.7',
        sod: '240.9',
        items: [{ name: 'Toast', weight: '45' }]
    });

    assert.deepEqual(
        Object.keys(normalized).sort(),
        [
            'calories',
            'carbohydrate',
            'fat',
            'fiber',
            'foodName',
            'healthScore',
            'items',
            'protein',
            'saturatedFat',
            'sodium',
            'sugar',
            'transFat'
        ].sort()
    );
    assert.equal(normalized.calories, 121);
    assert.equal(normalized.carbohydrate, 21.7);
    assert.equal(normalized.sodium, 241);
    assert.equal(normalized.sugar, 0);
    assert.equal(normalized.transFat, 0);
    assert.equal(normalized.fiber, 0);
});

test('normalizeAIAnalysisResult throws on empty payload', () => {
    assert.throws(() => normalizeAIAnalysisResult({ foodName: '', calories: 0, items: [] }), /AI_INVALID_PAYLOAD/);
});

test('normalizeTempAIResult preserves correction history and supports preferred naming for corrected results', () => {
    const normalized = normalizeTempAIResult({
        foodName: 'Original Meal',
        calories: 320,
        protein: 22,
        fat: 10,
        carbohydrate: 28,
        items: [
            { name: 'Rice', weight: '120' },
            { name: 'Chicken', weight: '80' }
        ]
    }, {
        preferredName: 'Edited Meal',
        correctionHistory: [
            createAICorrectionEntry('item:add', { itemIndex: 1 })
        ]
    });

    assert.equal(normalized.name, 'Edited Meal');
    assert.equal(normalized.nutri.calories, 320);
    assert.equal(normalized.items.length, 2);
    assert.equal(normalized.correctionHistory.length, 1);
    assert.equal(normalized.correctionHistory[0].type, 'item:add');
});

test('normalizeTempAIResult preserves blank draft rows for post-analysis correction', () => {
    const normalized = normalizeTempAIResult({
        name: 'Draft Meal',
        nutri: {
            calories: 180,
            protein: 12,
            fat: 4,
            carbohydrate: 24
        },
        items: [
            { name: 'Milk', weight: '250' },
            { name: '', weight: '' }
        ]
    });

    assert.equal(normalized.items.length, 2);
    assert.equal(normalized.items[1].name, '');
    assert.equal(normalized.items[1].weight, '');
});

test('extractAnalysisFromGeminiPayload parses fenced JSON', () => {
    const payload = {
        candidates: [{
            content: {
                parts: [{
                    text: '```json\n{"foodName":"Soup","calories":210,"protein":9,"fat":4,"carbohydrate":28,"sugar":3,"sodium":700,"saturatedFat":1,"transFat":0,"fiber":2,"healthScore":7,"items":[{"name":"Soup","weight":"300"}]}\n```'
                }]
            }
        }]
    };

    const normalized = extractAnalysisFromGeminiPayload(payload);
    assert.equal(normalized.foodName, 'Soup');
    assert.equal(normalized.calories, 210);
    assert.equal(normalized.items[0].weight, '300');
});
