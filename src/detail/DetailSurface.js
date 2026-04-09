import React from 'react';
import { useDetailSurfaceState } from './useDetailSurfaceState.js';

const h = React.createElement;

function noop() {}

function SummaryCard({ label, value }) {
    return h(
        'div',
        { className: 'woof-detail__summary-card' },
        h('div', { className: 'woof-detail__summary-value' }, value),
        h('div', { className: 'woof-detail__summary-label' }, label)
    );
}

function MetricChip({ label, value, unit }) {
    return h(
        'div',
        { className: 'woof-detail__metric-chip' },
        h(
            'div',
            { className: 'woof-detail__metric-value' },
            value,
            unit ? h('span', { className: 'woof-detail__metric-unit' }, unit) : null
        ),
        h('div', { className: 'woof-detail__metric-label' }, label)
    );
}

function SectionBlock({ title, summary, items }) {
    const hasItems = Array.isArray(items) && items.length > 0;

    return h(
        'article',
        { className: 'woof-detail__section' },
        h(
            'div',
            { className: 'woof-detail__section-copy' },
            h('h3', { className: 'woof-detail__section-title' }, title),
            summary ? h('p', { className: 'woof-detail__section-summary' }, summary) : null
        ),
        hasItems
            ? h(
                'div',
                { className: 'woof-detail__metric-grid' },
                ...items.map((item) => h(MetricChip, {
                    key: item.field,
                    label: item.label,
                    value: item.value,
                    unit: item.unit
                }))
            )
            : null
    );
}

export function DetailSurface({
    model: providedModel,
    onClose = noop
}) {
    const fallbackModel = useDetailSurfaceState();
    const model = providedModel || fallbackModel;
    if (!model) return null;
    const summaryCards = model.summaryCards || [];
    const detailCards = model.detailCards || [];
    const sectionCards = model.sectionCards || [];
    const focusSignals = model.focusContent?.signals || model.focusSignals || [];
    const hasFocusPanel = Boolean(model.focusContent?.title || model.focusContent?.summary || focusSignals.length > 0);

    return h(
        'section',
        { className: 'woof-detail', 'data-surface': 'nutrition-detail', 'aria-label': model.title },
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
            onClose !== noop
                ? h('button', {
                    type: 'button',
                    className: 'woof-detail__close-button',
                    onClick: onClose,
                    'aria-label': model.closeLabel,
                    title: model.closeLabel
                }, '\u00d7')
                : null
        ),
        h(
            'div',
            { className: 'woof-detail__summary-grid' },
            ...summaryCards.map((card) => h(SummaryCard, {
                key: card.label,
                label: card.label,
                value: card.value
            }))
        ),
        h(
            'section',
            { className: 'woof-detail__panel' },
            h(
                'div',
                { className: 'woof-detail__panel-head' },
                h('h3', { className: 'woof-detail__panel-title' }, model.detailTitle || 'Core nutrition'),
                h('p', { className: 'woof-detail__panel-summary' }, model.detailSummary)
            ),
            h(
                'div',
                { className: 'woof-detail__metric-grid' },
                ...detailCards.map((card) => h(MetricChip, {
                    key: card.field,
                    label: card.label,
                    value: card.value,
                    unit: card.unit
                }))
            )
        ),
        h(
            'div',
            { className: 'woof-detail__section-list' },
            ...sectionCards.map((section) => h(SectionBlock, {
                key: section.id,
                title: section.title,
                summary: section.summary,
                items: section.items
            }))
        ),
        hasFocusPanel
            ? h(
                'section',
                { className: 'woof-detail__panel woof-detail__panel--focus' },
                h(
                    'div',
                    { className: 'woof-detail__panel-head' },
                    h('div', { className: 'woof-detail__panel-kicker' }, model.focusContent?.subtitle || 'Weekly rhythm'),
                    h('h3', { className: 'woof-detail__panel-title' }, model.focusContent?.title || 'Nutrition focus'),
                    h('p', { className: 'woof-detail__panel-summary' }, model.focusContent?.summary || 'A lighter read on the last few logged days.')
                ),
                h(
                    'div',
                    { className: 'woof-detail__signal-grid' },
                    ...focusSignals.map((signal) => h(
                        'article',
                        { key: signal.key || signal.label, className: 'woof-detail__signal-card' },
                        h('div', { className: 'woof-detail__signal-label' }, signal.label),
                        h('div', { className: 'woof-detail__signal-value' }, signal.value || signal.text),
                        signal.detail ? h('div', { className: 'woof-detail__signal-detail' }, signal.detail) : null
                    ))
                )
            )
            : null
    );
}
