function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function prepareCanvas(ctx) {
    const canvas = ctx.canvas;
    const ratio = globalThis.devicePixelRatio || 1;
    const width = Math.max(canvas.clientWidth || canvas.width || 320, 180);
    const height = Math.max(canvas.clientHeight || canvas.height || 200, 140);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.display = 'block';
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(ratio, ratio);

    return { width, height };
}

function readToken(token, fallback) {
    if (!globalThis.document) return fallback;
    const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    return value || fallback;
}

function resolveColor(color, fallback = '#7a6fe0') {
    const value = String(color || '').trim();
    if (!value) return fallback;
    if (!value.startsWith('var(')) return value;

    const token = value.match(/var\((--[^),\s]+)/)?.[1];
    return token ? readToken(token, fallback) : fallback;
}

function toRgba(color, alpha = 1) {
    const value = resolveColor(color);
    const normalizedAlpha = clamp(alpha, 0, 1);

    if (value.startsWith('#')) {
        const hex = value.slice(1);
        const chunk = hex.length === 3 ? 1 : 2;
        const expand = (part) => chunk === 1 ? `${part}${part}` : part;
        const [r, g, b] = [0, 1, 2].map((index) => parseInt(expand(hex.slice(index * chunk, index * chunk + chunk)), 16));
        return `rgba(${r}, ${g}, ${b}, ${normalizedAlpha})`;
    }

    if (value.startsWith('rgba(')) {
        return value.replace(/rgba\(([^)]+),\s*[\d.]+\)/, `rgba($1, ${normalizedAlpha})`);
    }

    if (value.startsWith('rgb(')) {
        return value.replace('rgb(', 'rgba(').replace(')', `, ${normalizedAlpha})`);
    }

    return value;
}

function getTheme() {
    const text = readToken('--text-color', '#1f2140');
    const muted = readToken('--text-secondary', '#707294');
    const card = readToken('--card-bg', '#ffffff');

    return {
        text,
        muted,
        grid: toRgba(text, 0.08),
        gridStrong: toRgba(text, 0.14),
        track: toRgba(text, 0.1),
        card,
        white: '#ffffff'
    };
}

function safeSave(ctx) {
    if (typeof ctx.save === 'function') ctx.save();
}

function safeRestore(ctx) {
    if (typeof ctx.restore === 'function') ctx.restore();
}

function makeGradient(ctx, {
    x0,
    y0,
    x1,
    y1,
    stops,
    fallback
}) {
    if (typeof ctx.createLinearGradient !== 'function') {
        return fallback;
    }

    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    stops.forEach(([offset, color]) => {
        gradient.addColorStop(offset, color);
    });
    return gradient;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
    const resolvedRadius = Math.min(radius, width / 2, height / 2);

    if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, resolvedRadius);
        ctx.closePath();
        return;
    }

    ctx.beginPath();
    ctx.moveTo(x + resolvedRadius, y);
    ctx.lineTo(x + width - resolvedRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + resolvedRadius);
    ctx.lineTo(x + width, y + height - resolvedRadius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - resolvedRadius, y + height);
    ctx.lineTo(x + resolvedRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - resolvedRadius);
    ctx.lineTo(x, y + resolvedRadius);
    ctx.quadraticCurveTo(x, y, x + resolvedRadius, y);
    ctx.closePath();
}

function drawHorizontalGrid(ctx, { left, right, top, bottom, steps = 4, theme }) {
    safeSave(ctx);
    ctx.strokeStyle = theme.grid;
    ctx.lineWidth = 1;

    for (let index = 0; index <= steps; index += 1) {
        const y = top + ((bottom - top) / steps) * index;
        ctx.beginPath();
        ctx.moveTo(left, y);
        ctx.lineTo(right, y);
        ctx.stroke();
    }

    safeRestore(ctx);
}

function drawAxisLabels(ctx, labels, points, y, theme) {
    if (!labels.length || !points.length) return;
    const labelStep = labels.length > 14 ? Math.ceil(labels.length / 6) : 1;

    safeSave(ctx);
    ctx.fillStyle = theme.muted;
    ctx.font = '11px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    labels.forEach((label, index) => {
        if (!points[index]) return;
        if (index % labelStep !== 0 && index !== labels.length - 1) return;
        ctx.fillText(String(label || ''), points[index].x, y);
    });

    safeRestore(ctx);
}

function measureTextWidth(ctx, text = '') {
    if (typeof ctx.measureText === 'function') {
        return ctx.measureText(String(text)).width;
    }
    return String(text).length * 6.4;
}

function buildSmoothPath(ctx, points) {
    if (points.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let index = 0; index < points.length - 1; index += 1) {
        const previous = points[index - 1] || points[index];
        const current = points[index];
        const next = points[index + 1];
        const following = points[index + 2] || next;
        const firstControlX = current.x + (next.x - previous.x) / 6;
        const firstControlY = clamp(
            current.y + (next.y - previous.y) / 6,
            Math.min(current.y, next.y),
            Math.max(current.y, next.y)
        );
        const secondControlX = next.x - (following.x - current.x) / 6;
        const secondControlY = clamp(
            next.y - (following.y - current.y) / 6,
            Math.min(current.y, next.y),
            Math.max(current.y, next.y)
        );

        ctx.bezierCurveTo(firstControlX, firstControlY, secondControlX, secondControlY, next.x, next.y);
    }
}

function drawBarChart(ctx, data, datasets, size, interactionState = {}) {
    const labels = Array.isArray(data?.labels) ? data.labels : [];
    const items = Array.isArray(data?.items) ? data.items : [];
    const resolvedDatasets = Array.isArray(datasets) && datasets.length ? datasets : [];
    if (!labels.length || !resolvedDatasets.length) return { type: 'bar-group', items: [] };

    const theme = getTheme();
    const valueMatrix = resolvedDatasets.map((entry) => (
        Array.isArray(entry?.data) ? entry.data.map((value) => Math.max(Number(value) || 0, 0)) : []
    ));
    const stackedTotals = labels.map((_, index) => (
        resolvedDatasets.reduce((sum, _dataset, datasetIndex) => sum + ((valueMatrix[datasetIndex] || [])[index] || 0), 0)
    ));
    const maxValue = Math.max(...stackedTotals, 1);
    const left = 18;
    const right = size.width - 18;
    const top = 18;
    const bottom = size.height - 30;
    const chartHeight = bottom - top;
    const groupGap = labels.length >= 45 ? 1 : labels.length >= 21 ? 2 : labels.length >= 11 ? 6 : 10;
    const availableWidth = Math.max(right - left, 24);
    const rawGroupWidth = (availableWidth - groupGap * Math.max(labels.length - 1, 0)) / Math.max(labels.length, 1);
    const groupWidth = Math.max(rawGroupWidth, 1);
    const hoverIndex = Number.isInteger(interactionState?.hoverIndex) ? interactionState.hoverIndex : -1;
    const selectedIndex = Number.isInteger(interactionState?.selectedIndex) ? interactionState.selectedIndex : -1;
    const groups = [];

    drawHorizontalGrid(ctx, { left, right, top, bottom, steps: 4, theme });

    labels.forEach((label, index) => {
        const groupX = left + index * (groupWidth + groupGap);
        const highlightOpacity = index === hoverIndex ? 0.12 : index === selectedIndex ? 0.08 : 0;

        if (highlightOpacity > 0) {
            ctx.fillStyle = toRgba('var(--primary-color)', highlightOpacity);
            drawRoundedRect(ctx, groupX - 4, top - 2, groupWidth + 8, chartHeight + 8, 16);
            ctx.fill();
        }

        const stackedTotal = resolvedDatasets.reduce((sum, dataset, datasetIndex) => {
            const datasetValues = valueMatrix[datasetIndex] || [];
            return sum + (datasetValues[index] || 0);
        }, 0);
        const x = groupX;
        const barWidth = Math.max(groupWidth, 1);
        let cursorY = bottom;

        if (stackedTotal <= 0) {
            ctx.fillStyle = toRgba('var(--primary-color)', 0.12);
            drawRoundedRect(ctx, x, bottom - 4, barWidth, 4, Math.min(12, barWidth / 2));
            ctx.fill();
        } else {
            resolvedDatasets.forEach((dataset, datasetIndex) => {
                const datasetValues = valueMatrix[datasetIndex] || [];
                const value = datasetValues[index] || 0;
                if (value <= 0) return;
                const baseColor = resolveColor(dataset?.backgroundColor, '#7a6fe0');
                const segmentHeight = Math.max((value / maxValue) * chartHeight, 3);
                const y = cursorY - segmentHeight;

                ctx.fillStyle = makeGradient(ctx, {
                    x0: 0,
                    y0: y,
                    x1: 0,
                    y1: cursorY,
                    stops: [
                        [0, toRgba(baseColor, 0.96)],
                        [1, toRgba(baseColor, 0.38)]
                    ],
                    fallback: baseColor
                });
                drawRoundedRect(ctx, x, y, barWidth, segmentHeight, Math.min(12, barWidth / 2));
                ctx.fill();
                cursorY = y;
            });
        }

        groups.push({
            index,
            x: groupX,
            y: top,
            width: groupWidth,
            height: chartHeight,
            label,
            payload: items[index] || null
        });
    });

    const points = groups.map((group) => ({
        x: group.x + group.width / 2
    }));
    drawAxisLabels(ctx, labels, points, size.height - 22, theme);

    return { type: 'bar-group', items: groups };
}

function drawLineChart(ctx, data, dataset, size, interactionState = {}) {
    const values = Array.isArray(dataset?.data) ? dataset.data.map((value) => Number(value) || 0) : [];
    const labels = Array.isArray(data?.labels) ? data.labels : [];
    const items = Array.isArray(data?.items) ? data.items : [];
    if (!values.length) return { type: 'line-point', items: [] };

    const theme = getTheme();
    const maxValue = Math.max(...values, 1);
    const minValue = Math.min(...values, 0);
    const range = Math.max(maxValue - minValue, 1);
    const left = 18;
    const right = size.width - 18;
    const top = 18;
    const bottom = size.height - 30;
    const innerWidth = Math.max(right - left, 1);
    const innerHeight = Math.max(bottom - top, 1);
    const step = values.length > 1 ? innerWidth / (values.length - 1) : 0;
    const baseColor = resolveColor(dataset?.borderColor, '#7a6fe0');
    const fillColor = dataset?.backgroundColor || toRgba(baseColor, 0.16);
    const hoverIndex = Number.isInteger(interactionState?.hoverIndex) ? interactionState.hoverIndex : -1;
    const points = values.map((value, index) => ({
        index,
        x: left + step * index,
        y: bottom - ((value - minValue) / range) * innerHeight,
        label: labels[index],
        value,
        payload: items[index] || null
    }));

    drawHorizontalGrid(ctx, { left, right, top, bottom, steps: 4, theme });

    if (dataset?.fill && points.length > 1) {
        safeSave(ctx);
        ctx.fillStyle = makeGradient(ctx, {
            x0: 0,
            y0: top,
            x1: 0,
            y1: bottom,
            stops: [
                [0, toRgba(fillColor, 0.3)],
                [1, toRgba(fillColor, 0.02)]
            ],
            fallback: toRgba(fillColor, 0.18)
        });
        buildSmoothPath(ctx, points);
        ctx.lineTo(points[points.length - 1].x, bottom);
        ctx.lineTo(points[0].x, bottom);
        ctx.closePath();
        ctx.fill();
        safeRestore(ctx);
    }

    safeSave(ctx);
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = dataset?.borderWidth || 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    buildSmoothPath(ctx, points);
    ctx.stroke();
    safeRestore(ctx);

    if (hoverIndex >= 0 && points[hoverIndex]) {
        const activePoint = points[hoverIndex];
        safeSave(ctx);
        ctx.strokeStyle = theme.gridStrong;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(activePoint.x, top);
        ctx.lineTo(activePoint.x, bottom);
        ctx.stroke();
        safeRestore(ctx);
    }

    points.forEach((point, index) => {
        const isActive = index === hoverIndex;
        const radius = isActive ? 5.6 : index === points.length - 1 ? 4.5 : 3.2;
        ctx.fillStyle = theme.white;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius + 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = baseColor;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
    });

    const lastValue = values[values.length - 1];
    const lastPoint = points[points.length - 1];
    if (lastPoint && Number.isFinite(lastValue)) {
        safeSave(ctx);
        ctx.fillStyle = baseColor;
        ctx.font = '700 11px "Segoe UI", sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(String(Math.round(lastValue * 10) / 10), right, Math.max(top + 12, lastPoint.y - 10));
        safeRestore(ctx);
    }

    drawAxisLabels(ctx, labels, points, size.height - 22, theme);
    return { type: 'line-point', items: points };
}

function drawDoughnutChart(ctx, data, dataset, size) {
    const theme = getTheme();
    const values = Array.isArray(dataset?.data) ? dataset.data.map((value) => Math.max(Number(value) || 0, 0)) : [];
    const placeholder = Boolean(dataset?.placeholder);
    const rawTotal = values.reduce((sum, value) => sum + value, 0);
    const renderedValues = placeholder ? values.map(() => 1) : values;
    const total = renderedValues.reduce((sum, value) => sum + value, 0) || 1;
    const labels = Array.isArray(data?.labels) ? data.labels : [];
    const colors = Array.isArray(dataset?.backgroundColor)
        ? dataset.backgroundColor.map((color, index) => resolveColor(color, ['#5db27d', '#f6b356', '#7a6fe0'][index % 3]))
        : ['#5db27d', '#f6b356', '#7a6fe0'];
    const centerX = size.width / 2;
    const centerY = size.height * 0.34;
    const radius = Math.min(size.width, size.height) * 0.2;
    const lineWidth = 18;
    const gap = 0.08;
    let start = -Math.PI / 2;

    safeSave(ctx);
    ctx.strokeStyle = theme.track;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
    safeRestore(ctx);

    renderedValues.forEach((value, index) => {
        const slice = (value / total) * Math.PI * 2;
        const end = start + Math.max(slice - gap, 0.12);

        safeSave(ctx);
        ctx.strokeStyle = colors[index % colors.length];
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, start, end);
        ctx.stroke();
        safeRestore(ctx);

        start += slice;
    });

    safeSave(ctx);
    ctx.fillStyle = theme.text;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.font = '800 24px "Segoe UI", sans-serif';
    ctx.fillText(`${Math.round(rawTotal)}`, centerX, centerY + 8);
    ctx.font = '600 11px "Segoe UI", sans-serif';
    ctx.fillStyle = theme.muted;
    ctx.fillText('g', centerX, centerY + 24);
    safeRestore(ctx);

    const legendTop = centerY + radius + 28;
    const legendLeft = 20;
    const legendRight = size.width - 20;
    const rowHeight = 24;

    labels.forEach((label, index) => {
        const rowY = legendTop + index * rowHeight;
        const color = colors[index % colors.length];
        const value = values[index] || 0;

        safeSave(ctx);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(legendLeft + 6, rowY, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = theme.text;
        ctx.font = '600 11px "Segoe UI", sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(label || ''), legendLeft + 18, rowY);

        ctx.fillStyle = theme.muted;
        ctx.textAlign = 'right';
        ctx.fillText(`${Math.round(value * 10) / 10}g`, legendRight, rowY);
        safeRestore(ctx);
    });
}

export class LocalChart {
    constructor(ctx, config = {}) {
        this.ctx = ctx;
        this.type = config.type || 'bar';
        this.data = config.data || { labels: [], datasets: [] };
        this.options = config.options || {};
        this.hoverIndex = -1;
        this.selectedIndex = Number.isInteger(this.options?.interaction?.selectedIndex)
            ? this.options.interaction.selectedIndex
            : -1;
        this.interactionMap = { type: 'none', items: [] };
        this.handlePointerMove = this.handlePointerMove.bind(this);
        this.handlePointerLeave = this.handlePointerLeave.bind(this);
        this.handlePointerSelect = this.handlePointerSelect.bind(this);
        this.bindCanvasInteractions();
        this.render();
    }

    render() {
        const size = prepareCanvas(this.ctx);
        const datasets = Array.isArray(this.data?.datasets) ? this.data.datasets : [];
        const dataset = datasets[0] || {};
        if (Number.isInteger(this.options?.interaction?.selectedIndex)) {
            this.selectedIndex = this.options.interaction.selectedIndex;
        }

        if (this.type === 'doughnut') {
            drawDoughnutChart(this.ctx, this.data, dataset, size);
            this.interactionMap = { type: 'none', items: [] };
            return;
        }

        if (this.type === 'line') {
            this.interactionMap = drawLineChart(this.ctx, this.data, dataset, size, {
                hoverIndex: this.hoverIndex
            });
            return;
        }

        this.interactionMap = drawBarChart(this.ctx, this.data, datasets, size, {
            hoverIndex: this.hoverIndex,
            selectedIndex: this.selectedIndex
        });
    }

    update() {
        this.render();
    }

    destroy() {
        const canvas = this.ctx?.canvas;
        if (canvas && typeof canvas.removeEventListener === 'function') {
            canvas.removeEventListener('pointermove', this.handlePointerMove);
            canvas.removeEventListener('pointerleave', this.handlePointerLeave);
            canvas.removeEventListener('click', this.handlePointerSelect);
        }
    }

    resize(width, height) {
        if (width) this.ctx.canvas.style.width = `${clamp(width, 120, 2000)}px`;
        if (height) this.ctx.canvas.style.height = `${clamp(height, 120, 2000)}px`;
        this.render();
    }

    bindCanvasInteractions() {
        const canvas = this.ctx?.canvas;
        if (!canvas || typeof canvas.addEventListener !== 'function') return;

        canvas.addEventListener('pointermove', this.handlePointerMove);
        canvas.addEventListener('pointerleave', this.handlePointerLeave);
        canvas.addEventListener('click', this.handlePointerSelect);
    }

    getCanvasPosition(event) {
        const canvas = this.ctx?.canvas;
        const rect = typeof canvas?.getBoundingClientRect === 'function'
            ? canvas.getBoundingClientRect()
            : {
                left: 0,
                top: 0,
                width: canvas?.clientWidth || canvas?.width || 0,
                height: canvas?.clientHeight || canvas?.height || 0
            };

        return {
            x: Number(event?.clientX) - rect.left,
            y: Number(event?.clientY) - rect.top,
            width: rect.width || canvas?.clientWidth || 0,
            height: rect.height || canvas?.clientHeight || 0
        };
    }

    resolveInteraction(position) {
        const items = Array.isArray(this.interactionMap?.items) ? this.interactionMap.items : [];
        if (!items.length) return null;

        if (this.interactionMap.type === 'line-point') {
            const nearest = items.reduce((best, item) => {
                const distance = Math.abs(item.x - position.x);
                if (!best || distance < best.distance) {
                    return { item, distance };
                }
                return best;
            }, null);

            const threshold = Math.max(24, position.width / Math.max(items.length * 2, 6));
            return nearest && nearest.distance <= threshold ? nearest.item : null;
        }

        if (this.interactionMap.type === 'bar-group') {
            return items.find((item) => (
                position.x >= item.x
                && position.x <= item.x + item.width
                && position.y >= item.y
                && position.y <= item.y + item.height + 24
            )) || null;
        }

        return null;
    }

    emitInteraction(handlerName, item) {
        const handler = this.options?.interaction?.[handlerName];
        if (typeof handler !== 'function') return;
        handler({
            index: item?.index ?? -1,
            label: item?.label ?? '',
            payload: item?.payload ?? null,
            value: item?.value ?? null
        });
    }

    handlePointerMove(event) {
        const nextItem = this.resolveInteraction(this.getCanvasPosition(event));
        const nextIndex = Number.isInteger(nextItem?.index) ? nextItem.index : -1;
        if (nextIndex === this.hoverIndex) return;
        this.hoverIndex = nextIndex;
        this.render();

        if (nextItem) {
            this.emitInteraction('onHover', nextItem);
            return;
        }
        this.emitInteraction('onLeave', null);
    }

    handlePointerLeave() {
        if (this.hoverIndex === -1) return;
        this.hoverIndex = -1;
        this.render();
        this.emitInteraction('onLeave', null);
    }

    handlePointerSelect(event) {
        const item = this.resolveInteraction(this.getCanvasPosition(event));
        if (!item) return;

        if (this.interactionMap.type === 'bar-group') {
            this.selectedIndex = item.index;
            this.render();
        }

        this.emitInteraction('onSelect', item);
    }
}
