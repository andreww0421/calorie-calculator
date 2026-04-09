import test from 'node:test';
import assert from 'node:assert/strict';

function createMockContext(width = 640, height = 200) {
    const calls = [];
    const ctx = {
        canvas: {
            clientWidth: width,
            clientHeight: height,
            width,
            height,
            style: {}
        },
        setTransform(...args) { calls.push(['setTransform', ...args]); },
        clearRect(...args) { calls.push(['clearRect', ...args]); },
        scale(...args) { calls.push(['scale', ...args]); },
        fillRect(...args) { calls.push(['fillRect', ...args]); },
        beginPath() { calls.push(['beginPath']); },
        roundRect(...args) { calls.push(['roundRect', ...args]); },
        fill() { calls.push(['fill']); },
        fillText(...args) { calls.push(['fillText', ...args]); },
        moveTo(...args) { calls.push(['moveTo', ...args]); },
        lineTo(...args) { calls.push(['lineTo', ...args]); },
        stroke() { calls.push(['stroke']); },
        closePath() { calls.push(['closePath']); },
        arc(...args) { calls.push(['arc', ...args]); }
    };

    return { ctx, calls };
}

test('LocalChart sizes canvas to its container and renders dense bar data without overflow math errors', async () => {
    const previousRatio = globalThis.devicePixelRatio;
    globalThis.devicePixelRatio = 2;

    const { LocalChart } = await import(`../js/ui/local-chart.js?test=${Date.now()}-${Math.random()}`);
    const { ctx } = createMockContext();
    const labels = Array.from({ length: 30 }, (_, index) => `04-${String(index + 1).padStart(2, '0')}`);
    const values = Array.from({ length: 30 }, (_, index) => index + 1);

    const chart = new LocalChart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{ data: values, backgroundColor: '#74b9ff' }]
        }
    });

    assert.equal(ctx.canvas.style.width, '640px');
    assert.equal(ctx.canvas.style.height, '200px');
    assert.equal(ctx.canvas.width, 1280);
    assert.equal(ctx.canvas.height, 400);

    chart.update();

    globalThis.devicePixelRatio = previousRatio;
});
