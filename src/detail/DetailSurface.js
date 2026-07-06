import React from 'react';
import { useDetailSurfaceState } from './useDetailSurfaceState.js';

const h = React.createElement;

function noop() {}

function MetricIcon({ field }) {
    const iconProps = {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        focusable: 'false'
    };
    let paths;

    switch (field) {
    case 'calories':
        paths = [
            h('path', { key: 'flame', d: 'M13.5 2.5c.4 3-1.1 4.4-2.6 6-1.4 1.5-2.8 3-2.4 5.4.3 2 1.8 3.6 3.8 4.1-1.1-1.4-1-3.1.2-4.6.6 1.6 1.8 2.4 3.2 2.5 1.3-1.1 2.1-2.8 1.8-4.7-.4-2.5-2.4-4.7-4-8.2Z' }),
            h('path', { key: 'base', d: 'M6.8 9.2C5.6 10.8 5 12.4 5 14a7 7 0 0 0 14 0c0-2.8-1.6-5.3-3.5-7.4' })
        ];
        break;
    case 'carbohydrate':
        paths = [
            h('path', { key: 'stem', d: 'M12 21V8' }),
            h('path', { key: 'left-top', d: 'M12 11C8.8 11 6.5 9.3 6 6c3.2 0 5.5 1.7 6 5Z' }),
            h('path', { key: 'right-top', d: 'M12 11c3.2 0 5.5-1.7 6-5-3.2 0-5.5 1.7-6 5Z' }),
            h('path', { key: 'left-bottom', d: 'M12 17c-3.2 0-5.5-1.7-6-5 3.2 0 5.5 1.7 6 5Z' })
        ];
        break;
    case 'protein':
        paths = [
            h('path', { key: 'bar', d: 'M6 12h12' }),
            h('path', { key: 'left-inner', d: 'M6 7v10' }),
            h('path', { key: 'right-inner', d: 'M18 7v10' }),
            h('path', { key: 'left-outer', d: 'M3 9v6' }),
            h('path', { key: 'right-outer', d: 'M21 9v6' })
        ];
        break;
    case 'fat':
        paths = [
            h('path', { key: 'drop', d: 'M12 2.5s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z' }),
            h('path', { key: 'shine', d: 'M9.2 14.5c.3 1.2 1.2 2 2.4 2.3' })
        ];
        break;
    case 'goal':
        paths = [
            h('circle', { key: 'outer', cx: 12, cy: 12, r: 8 }),
            h('circle', { key: 'inner', cx: 12, cy: 12, r: 3 }),
            h('path', { key: 'arrow', d: 'm14 10 5-5' })
        ];
        break;
    default:
        paths = [
            h('circle', { key: 'clock', cx: 12, cy: 12, r: 8 }),
            h('path', { key: 'hand', d: 'M12 8v4l2.5 1.5' })
        ];
    }

    return h(
        'span',
        { className: 'woof-detail__metric-icon', 'aria-hidden': 'true' },
        h('svg', iconProps, ...paths)
    );
}

function MetricText({ value, unit, emphasis = false }) {
    const compactLength = String(value ?? '').replace(/[^0-9A-Za-z]/g, '').length;
    const lengthModifier = compactLength >= 7
        ? ' woof-detail__hero-value--very-long'
        : compactLength >= 5
            ? ' woof-detail__hero-value--long'
            : '';
    const emphasisModifier = emphasis ? ' woof-detail__hero-value--emphasis' : '';

    return h(
        'div',
        { className: `woof-detail__hero-value${emphasisModifier}${lengthModifier}` },
        h('span', { className: 'woof-detail__hero-number' }, value),
        unit ? h('span', { className: 'woof-detail__hero-unit' }, unit) : null
    );
}

function HeroStatCard({ stat }) {
    const field = String(stat.field || 'metric').replace(/[^a-z0-9-]/gi, '').toLowerCase() || 'metric';
    const accessibleValue = `${stat.label}: ${stat.value}${stat.unit ? ` ${stat.unit}` : ''}`;

    return h(
        'article',
        {
            className: `woof-detail__hero-stat woof-detail__hero-stat--${field}`,
            'aria-label': accessibleValue
        },
        h(
            'div',
            { className: 'woof-detail__metric-head' },
            h(MetricIcon, { field }),
            h('div', { className: 'woof-detail__hero-label' }, stat.label)
        ),
        h(MetricText, {
            value: stat.value,
            unit: stat.unit,
            emphasis: stat.emphasis
        })
    );
}

function MacroCard({ card }) {
    return h(
        'article',
        { className: 'woof-detail__macro-card' },
        h(
            'div',
            { className: 'woof-detail__macro-card-head' },
            h('div', { className: 'woof-detail__macro-card-label' }, card.label),
            h('div', { className: 'woof-detail__macro-card-value' }, `${card.value}${card.unit}`)
        ),
        h(
            'div',
            { className: 'woof-detail__macro-track', 'aria-hidden': 'true' },
            h('div', {
                className: 'woof-detail__macro-fill',
                style: {
                    width: `${Math.max(Math.min(Number(card.share) || 0, 100), 8)}%`,
                    background: card.color
                }
            })
        ),
        h('div', { className: 'woof-detail__macro-share' }, card.shareLabel || '--')
    );
}

function NutrientTable({ rows, headers = ['Nutrient', 'Value'] }) {
    return h(
        'div',
        { className: 'woof-detail__table' },
        h(
            'div',
            { className: 'woof-detail__table-head' },
            h('div', null, headers[0] || 'Nutrient'),
            h('div', null, headers[1] || 'Value')
        ),
        ...rows.map((row) => h(
            'div',
            { key: row.field, className: 'woof-detail__table-row' },
            h('div', { className: 'woof-detail__table-label' }, row.label),
            h(
                'div',
                { className: 'woof-detail__table-value' },
                row.value,
                row.unit ? h('span', { className: 'woof-detail__table-unit' }, row.unit) : null
            )
        ))
    );
}

function CompositionTable({ section }) {
    const rows = section?.rows || [];
    if (rows.length === 0) {
        return h('div', { className: 'woof-detail__empty-note' }, section?.emptyText || '');
    }

    return h(
        'div',
        { className: 'woof-detail__table woof-detail__table--composition' },
        h(
            'div',
            { className: 'woof-detail__table-head' },
            h('div', null, section?.headers?.[0] || 'Item'),
            h('div', null, section?.headers?.[1] || 'Amount')
        ),
        ...rows.map((row, index) => h(
            'div',
            { key: `${row.name}-${index}`, className: 'woof-detail__table-row' },
            h('div', { className: 'woof-detail__table-label' }, row.name || '--'),
            h('div', { className: 'woof-detail__table-value' }, row.amount || '--')
        ))
    );
}

function ReportSection({ title, summary, children, modifier = '' }) {
    return h(
        'section',
        { className: `woof-detail__section-block${modifier}` },
        h(
            'div',
            { className: 'woof-detail__section-head' },
            h('h3', { className: 'woof-detail__section-title' }, title),
            summary ? h('p', { className: 'woof-detail__section-summary' }, summary) : null
        ),
        children
    );
}

function FocusPanel({ panel }) {
    if (!panel || !Array.isArray(panel.signals) || panel.signals.length === 0) return null;

    return h(
        ReportSection,
        {
            title: panel.title,
            summary: panel.summary,
            modifier: ' woof-detail__section-block--focus'
        },
        h(
            'div',
            { className: 'woof-detail__focus-grid' },
            ...panel.signals.map((signal) => h(
                'article',
                { key: signal.key || signal.label, className: 'woof-detail__focus-card' },
                h('div', { className: 'woof-detail__focus-label' }, signal.label),
                h('div', { className: 'woof-detail__focus-value' }, signal.value),
                signal.detail ? h('div', { className: 'woof-detail__focus-detail' }, signal.detail) : null
            ))
        )
    );
}

export function DetailSurface({
    model: providedModel,
    onClose = noop
}) {
    const fallbackModel = useDetailSurfaceState();
    const model = providedModel || fallbackModel;
    if (!model) return null;
    const surfaceKind = String(model.kind || 'daily-summary').replace(/[^a-z0-9-]/gi, '').toLowerCase();

    return h(
        'section',
        { className: `woof-detail woof-detail--${surfaceKind}`, 'data-surface': 'nutrition-detail', 'aria-label': model.title },
        h(
            'header',
            { className: 'woof-detail__header' },
            h(
                'div',
                { className: 'woof-detail__header-copy' },
                h('div', { className: 'woof-detail__eyebrow' }, model.summary),
                h('h2', { className: 'woof-detail__title' }, model.title),
                h('p', { className: 'woof-detail__subtitle' }, model.subtitle)
            ),
            h(
                'div',
                { className: 'woof-detail__header-actions' },
                model.badge
                    ? h(
                        'div',
                        { className: 'woof-detail__badge' },
                        h('span', { className: 'woof-detail__badge-label' }, model.badge.label),
                        h('span', { className: 'woof-detail__badge-value' }, model.badge.value)
                    )
                    : null,
                onClose !== noop
                    ? h('button', {
                        type: 'button',
                        className: 'woof-detail__close-button',
                        onClick: onClose,
                        'aria-label': model.closeLabel,
                        title: model.closeLabel
                    }, '\u00d7')
                    : null
            )
        ),
        h(
            ReportSection,
            {
                title: model.reportSection?.title,
                summary: model.reportSection?.summary,
                modifier: ' woof-detail__section-block--hero'
            },
            h(
                'div',
                { className: `woof-detail__hero-grid${model.kind === 'item-detail' ? ' woof-detail__hero-grid--item' : ''}` },
                ...(model.heroStats || []).map((stat) => h(HeroStatCard, {
                    key: stat.label,
                    stat
                }))
            )
        ),
        h(
            ReportSection,
            {
                title: model.macroSection?.title,
                summary: model.macroSection?.summary
            },
            h(
                'div',
                { className: 'woof-detail__macro-grid' },
                ...(model.macroSection?.cards || []).map((card) => h(MacroCard, {
                    key: card.field,
                    card
                }))
            )
        ),
        model.compositionSection
            ? h(
                ReportSection,
                {
                    title: model.compositionSection.title,
                    summary: model.compositionSection.summary
                },
                h(CompositionTable, { section: model.compositionSection })
            )
            : null,
        h(
            ReportSection,
                {
                    title: model.nutrientSection?.title,
                    summary: model.nutrientSection?.summary
                },
                h(NutrientTable, {
                    rows: model.nutrientSection?.rows || [],
                    headers: model.nutrientSection?.headers || ['Nutrient', 'Value']
                })
            ),
        h(FocusPanel, { panel: model.focusPanel })
    );
}
