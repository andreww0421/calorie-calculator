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

function drawBarChart(ctx, data, dataset, size) {
    const values = Array.isArray(dataset?.data) ? dataset.data.map((value) => Number(value) || 0) : [];
    const labels = Array.isArray(data?.labels) ? data.labels : [];
    if (!values.length) return;
    const maxValue = Math.max(...values, 1);
    const chartHeight = size.height - 44;
    const baseline = size.height - 24;
    const gap = values.length >= 21 ? 3 : values.length >= 11 ? 5 : 8;
    const availableWidth = Math.max(size.width - 36, 24);
    const barWidth = clamp(
        (availableWidth - gap * Math.max(values.length - 1, 0)) / Math.max(values.length, 1),
        4,
        32
    );
    const backgroundColor = dataset?.backgroundColor || '#74b9ff';
    const labelStep = values.length > 14 ? Math.ceil(values.length / 7) : 1;

    ctx.fillStyle = 'rgba(120, 132, 122, 0.12)';
    ctx.fillRect(18, baseline, size.width - 36, 1);

    values.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = 18 + index * (barWidth + gap);
        const y = baseline - barHeight;

        ctx.fillStyle = backgroundColor;
        if (typeof ctx.roundRect === 'function') {
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, Math.max(barHeight, 2), 8);
            ctx.fill();
        } else {
            ctx.fillRect(x, y, barWidth, Math.max(barHeight, 2));
        }

        ctx.fillStyle = '#657268';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        if (index % labelStep === 0 || index === values.length - 1) {
            ctx.fillText(String(labels[index] || ''), x + barWidth / 2, size.height - 8);
        }
    });
}

function drawLineChart(ctx, data, dataset, size) {
    const values = Array.isArray(dataset?.data) ? dataset.data.map((value) => Number(value) || 0) : [];
    const labels = Array.isArray(data?.labels) ? data.labels : [];
    if (!values.length) return;
    const maxValue = Math.max(...values, 1);
    const minValue = Math.min(...values, 0);
    const range = Math.max(maxValue - minValue, 1);
    const left = 18;
    const right = size.width - 18;
    const top = 16;
    const bottom = size.height - 28;
    const innerWidth = Math.max(right - left, 1);
    const innerHeight = Math.max(bottom - top, 1);
    const step = values.length > 1 ? innerWidth / (values.length - 1) : 0;
    const labelStep = values.length > 14 ? Math.ceil(values.length / 7) : 1;
    const points = values.map((value, index) => ({
        x: left + step * index,
        y: bottom - ((value - minValue) / range) * innerHeight
    }));

    ctx.strokeStyle = 'rgba(120, 132, 122, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(left, bottom);
    ctx.lineTo(right, bottom);
    ctx.stroke();

    if (dataset?.fill && points.length > 1) {
        ctx.fillStyle = dataset.backgroundColor || 'rgba(116, 185, 255, 0.14)';
        ctx.beginPath();
        ctx.moveTo(points[0].x, bottom);
        points.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.lineTo(points[points.length - 1].x, bottom);
        ctx.closePath();
        ctx.fill();
    }

    ctx.strokeStyle = dataset?.borderColor || '#74b9ff';
    ctx.lineWidth = dataset?.borderWidth || 3;
    ctx.beginPath();
    points.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    ctx.fillStyle = dataset?.borderColor || '#74b9ff';
    points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.fillStyle = '#657268';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
        const point = points[index];
        if (point && (index % labelStep === 0 || index === labels.length - 1)) {
            ctx.fillText(String(label || ''), point.x, size.height - 8);
        }
    });
}

function drawDoughnutChart(ctx, data, dataset, size) {
    const values = Array.isArray(dataset?.data) ? dataset.data.map((value) => Number(value) || 0) : [];
    const placeholder = Boolean(dataset?.placeholder);
    const rawTotal = values.reduce((sum, value) => sum + value, 0);
    const total = rawTotal || values.length || 1;
    const labels = Array.isArray(data?.labels) ? data.labels : [];
    const colors = Array.isArray(dataset?.backgroundColor) ? dataset.backgroundColor : ['#55efc4', '#ffeaa7', '#74b9ff'];
    const centerX = size.width / 2;
    const centerY = size.height * 0.42;
    const outerRadius = Math.min(size.width, size.height) * 0.26;
    const innerRadius = outerRadius * 0.58;
    let start = -Math.PI / 2;

    values.forEach((value, index) => {
        const slice = ((placeholder ? 1 : value) / total) * Math.PI * 2;
        const end = start + slice;
        ctx.fillStyle = colors[index % colors.length];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, outerRadius, start, end);
        ctx.closePath();
        ctx.fill();
        start = end;
    });

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#25312a';
    ctx.font = '700 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(rawTotal)}`, centerX, centerY + 4);

    if (!labels.length) return;

    const legendTop = size.height - 42;
    const legendWidth = size.width - 32;
    const legendItemWidth = legendWidth / Math.max(labels.length, 1);

    labels.forEach((label, index) => {
        const itemCenterX = 16 + legendItemWidth * index + legendItemWidth / 2;
        ctx.fillStyle = colors[index % colors.length];
        ctx.beginPath();
        ctx.arc(itemCenterX - 22, legendTop + 8, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#657268';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(String(label || ''), itemCenterX - 12, legendTop + 12);
    });
}

export class LocalChart {
    constructor(ctx, config = {}) {
        this.ctx = ctx;
        this.type = config.type || 'bar';
        this.data = config.data || { labels: [], datasets: [] };
        this.options = config.options || {};
        this.render();
    }

    render() {
        const size = prepareCanvas(this.ctx);
        const dataset = this.data?.datasets?.[0] || {};

        if (this.type === 'doughnut') {
            drawDoughnutChart(this.ctx, this.data, dataset, size);
            return;
        }

        if (this.type === 'line') {
            drawLineChart(this.ctx, this.data, dataset, size);
            return;
        }

        drawBarChart(this.ctx, this.data, dataset, size);
    }

    update() {
        this.render();
    }

    destroy() {}

    resize(width, height) {
        if (width) this.ctx.canvas.style.width = `${clamp(width, 120, 2000)}px`;
        if (height) this.ctx.canvas.style.height = `${clamp(height, 120, 2000)}px`;
        this.render();
    }
}
