import test from 'node:test';
import assert from 'node:assert/strict';

import {
    buildAIErrorFeedback,
    extractRetryDelaySeconds,
    formatAIRequestError,
    parseStructuredAIError
} from '../js/analysis-errors.js';

test('parseStructuredAIError parses valid JSON and ignores invalid input', () => {
    assert.deepEqual(parseStructuredAIError('{"error":{"message":"oops"}}'), {
        error: { message: 'oops' }
    });
    assert.equal(parseStructuredAIError('not-json'), null);
});

test('extractRetryDelaySeconds reads google retryDelay strings', () => {
    assert.equal(extractRetryDelaySeconds([{ retryDelay: '56s' }]), 56);
    assert.equal(extractRetryDelaySeconds([{ retryDelay: '12.2s' }]), 13);
    assert.equal(extractRetryDelaySeconds([]), null);
});

test('buildAIErrorFeedback returns soft info for Turnstile pending', () => {
    const result = buildAIErrorFeedback(new Error('Turnstile_Pending'), {
        turnstilePending: 'Please wait for verification.'
    });

    assert.equal(result.isSoftError, true);
    assert.equal(result.type, 'info');
    assert.equal(result.message, 'Please wait for verification.');
});

test('buildAIErrorFeedback detects quota exhaustion payloads', () => {
    const payload = JSON.stringify({
        error: {
            code: 'AI_QUOTA_EXCEEDED',
            message: 'AI quota is full.',
            retryAfterSeconds: 42
        }
    });

    const result = buildAIErrorFeedback(new Error(payload), {
        aiQuotaExceeded: 'AI quota is full. Please retry later.'
    });

    assert.equal(result.isSoftError, true);
    assert.equal(result.type, 'error');
    assert.equal(result.message, 'AI quota is full. Please retry later.');
});

test('formatAIRequestError prefers backend message payloads', () => {
    const payload = JSON.stringify({
        error: {
            code: 'AI_BAD_REQUEST',
            message: 'Image type is not supported.'
        }
    });

    assert.equal(
        formatAIRequestError(new Error(payload), { alertAiFail: 'AI failed: ' }),
        'Image type is not supported.'
    );
});
