import test from 'node:test';
import assert from 'node:assert/strict';

import {
    extractAnalysisFromGeminiPayload,
    normalizeAIAnalysisResult,
    normalizeAIItem
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

test('normalizeAIAnalysisResult throws on empty payload', () => {
    assert.throws(() => normalizeAIAnalysisResult({ foodName: '', calories: 0, items: [] }), /AI_INVALID_PAYLOAD/);
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
