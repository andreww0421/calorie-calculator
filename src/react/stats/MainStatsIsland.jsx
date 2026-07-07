import React from 'react';
import { ChartIcon } from '../../home/SectionIcons.jsx';
import { getLocaleTranslations } from '../../../js/locales/index.js';
import { getStatsUiCopy } from '../../../js/locales/stats-ui-copy.js';
import { saveCurrentWeight } from '../../../js/controllers/profile-controller.js';
import { buildDashboardSummaryMetrics } from '../../../js/ui/dashboard-summary-ui.js';
import {
    ensureDashboardChartsReady,
    previewWeightChart,
    setDashboardChartRange
} from '../../../js/ui/dashboard-charts-ui.js';
import { createDashboardChartsViewModel } from '../../../js/state/app-selectors.js';
import { createPetViewModel } from '../../../js/state/pet-selectors.js';
import { useAppState } from '../hooks/useAppState.js';

function getRangeLabel(days, copy) {
    return copy.rangeLabelFn ? copy.rangeLabelFn(days) : `${days} Days`;
}

function MacroLegend({ t }) {
    const items = [
        { key: 'protein', label: t.pro || 'Protein' },
        { key: 'fat', label: t.fat || 'Fat' },
        { key: 'carb', label: t.carb || 'Carbs' }
    ];

    return (
        <div className="stats-mini-legend" aria-hidden="true">
            {items.map((item) => (
                <span key={item.key} className="stats-mini-legend__item">
                    <span className={`stats-mini-legend__swatch stats-mini-legend__swatch--${item.key}`} />
                    <span>{item.label}</span>
                </span>
            ))}
        </div>
    );
}

export default function MainStatsIsland() {
    const state = useAppState();
    const [range, setRange] = React.useState(7);
    const [weightDraft, setWeightDraft] = React.useState(() => String(state.loggedWeight ?? ''));
    const t = getLocaleTranslations(state.curLang);
    const copy = getStatsUiCopy(state.curLang);
    const chartData = createDashboardChartsViewModel(state, { range, weightDays: 30 });
    const pet = createPetViewModel(state);
    const metrics = buildDashboardSummaryMetrics(chartData, Number(state.targetCalories) || 0, pet);
    const activeRangeLabel = getRangeLabel(range, copy);
    const weightMeta = weightDraft ? `${weightDraft} kg` : '--';

    React.useEffect(() => {
        setWeightDraft(String(state.loggedWeight ?? ''));
    }, [state.loggedWeight]);

    return (
        <div data-stats-react-surface="true">
            <div className="surface-heading">
                <div className="surface-heading__eyebrow">{copy.eyebrow}</div>
                <div className="surface-heading__title-row">
                    <span className="surface-heading__icon" aria-hidden="true"><ChartIcon /></span>
                    <h1 className="surface-heading__title">{copy.title}</h1>
                </div>
            </div>

            <section className="stats-range-shell">
                <div className="stats-range-shell__copy">
                    <div className="section-kicker">{copy.trend}</div>
                    <div className="stats-range-shell__title">{activeRangeLabel}</div>
                </div>
                <div className="chart-range-toggle chart-range-toggle--segmented">
                    {[7, 30, 90].map((days) => (
                        <button
                            key={days}
                            id={`btn-chart-${days}d`}
                            className={`range-btn${range === days ? ' active-range' : ''}`}
                            type="button"
                            onClick={() => {
                                setDashboardChartRange(days);
                                React.startTransition(() => {
                                    setRange(days);
                                });
                                void ensureDashboardChartsReady();
                            }}
                        >
                            {getRangeLabel(days, copy)}
                        </button>
                    ))}
                </div>
            </section>

            <section className="stats-summary-card">
                <div className="stats-summary-card__title">{copy.summaryTitle}</div>
                <div className="stats-summary-grid">
                    <div className="stats-tile">
                        <div className="stats-tile__label">{copy.avgCalories}</div>
                        <div className="stats-tile__value">{metrics.averageCalories > 0 ? metrics.averageCalories : '--'}</div>
                        <div className="stats-tile__meta">{copy.targetOverview}</div>
                    </div>
                    <div className="stats-tile">
                        <div className="stats-tile__label">{copy.streak}</div>
                        <div className="stats-tile__value">{metrics.streak}</div>
                        <div className="stats-tile__meta">{copy.streakMeta}</div>
                    </div>
                    <div className="stats-tile stats-tile--wide">
                        <div className="stats-tile__label">{copy.avgProtein}</div>
                        <div className="stats-tile__value">{metrics.averageProtein > 0 ? `${metrics.averageProtein}g` : '--'}</div>
                        <div className="stats-tile__meta">{copy.avgProteinMeta}</div>
                    </div>
                </div>
            </section>

            <section className="stats-chart-card">
                <div className="stats-chart-card__head">
                    <div>
                        <div className="section-kicker">{copy.macroBalance}</div>
                        <h2 className="stats-chart-card__title">{copy.nutritionSnapshot}</h2>
                    </div>
                    <div className="stats-chart-card__head-meta">{activeRangeLabel}</div>
                </div>
                <div className="chart-grid chart-grid--stats">
                    <div className="stats-chart-shell">
                        <div className="chart-container" style={{ height: '252px' }}><canvas id="macroChart" /></div>
                        <div className="stats-chart-caption" id="macroChartDate" />
                    </div>
                    <div className="stats-chart-shell">
                        <div className="chart-container" style={{ height: '252px' }}><canvas id="weeklyChart" /></div>
                        <MacroLegend t={t} />
                        <div className="stats-chart-caption stats-chart-caption--hint" id="weeklyChartHint" />
                    </div>
                </div>
            </section>

            <div className="stats-trend-grid">
                <section className="stats-chart-card">
                    <div className="stats-chart-card__head">
                        <div>
                            <div className="section-kicker">{copy.trend}</div>
                            <h2 className="stats-chart-card__title" id="txt-cal-trend-title">{copy.calorieTrend}</h2>
                        </div>
                        <div className="stats-chart-card__head-meta">{activeRangeLabel}</div>
                    </div>
                    <div className="stats-chart-shell">
                        <div className="chart-container" style={{ height: '252px' }}><canvas id="calTrendChart" /></div>
                        <div className="stats-chart-caption" id="calTrendHoverValue" />
                    </div>
                </section>

                <section className="stats-chart-card">
                    <div className="stats-chart-card__head">
                        <div>
                            <div className="section-kicker">{copy.protein}</div>
                            <h2 className="stats-chart-card__title" id="txt-protein-trend-title">{copy.proteinTrend}</h2>
                        </div>
                        <div className="stats-chart-card__head-meta">{activeRangeLabel}</div>
                    </div>
                    <div className="stats-chart-shell">
                        <div className="chart-container" style={{ height: '252px' }}><canvas id="proteinTrendChart" /></div>
                        <div className="stats-chart-caption" id="proteinTrendHoverValue" />
                    </div>
                </section>
            </div>

            <section className="stats-chart-card">
                <div className="stats-chart-card__head">
                    <div>
                        <div className="section-kicker">{copy.weightSection}</div>
                        <h2 className="stats-chart-card__title">{copy.weightTrend}</h2>
                    </div>
                    <div className="stats-chart-card__head-meta">{weightMeta}</div>
                </div>
                <div className="weight-input-inline">
                    <input
                        type="number"
                        id="daily-weight-input"
                        placeholder={copy.weightPlaceholder}
                        step="0.1"
                        value={weightDraft}
                        onChange={(event) => {
                            const nextValue = event.target.value;
                            setWeightDraft(nextValue);
                            previewWeightChart(nextValue, { state });
                        }}
                    />
                    <button
                        id="btn-save-weight"
                        className="weight-save-btn"
                        type="button"
                        onClick={() => {
                            saveCurrentWeight();
                        }}
                    >
                        <span id="txt-weight-title">{copy.save}</span>
                    </button>
                </div>
                <div className="stats-chart-shell">
                    <div className="chart-container" style={{ height: '248px' }}><canvas id="weightChart" /></div>
                    <div className="stats-chart-caption" id="weightTrendHoverValue" />
                </div>
            </section>
        </div>
    );
}
