import SurfaceHeader from '../components/SurfaceHeader.jsx';
import SummaryTile from '../components/SummaryTile.jsx';
import { formatNumber, summarizeMeals } from '../utils.js';

export default function StatsView({ entries, targetCalories, copy, statsCopy }) {
    const totals = summarizeMeals(entries);
    const progress = targetCalories > 0
        ? Math.min(Math.round((totals.calories / targetCalories) * 100), 100)
        : 0;

    return (
        <section className="react-shell__surface">
            <SurfaceHeader
                eyebrow={statsCopy.eyebrow}
                title={statsCopy.title}
                description={copy.description}
            />
            <div className="react-shell__summary-grid react-shell__summary-grid--wide">
                <SummaryTile label={copy.target} value={targetCalories > 0 ? `${formatNumber(targetCalories)} cal` : '--'} detail={copy.dailyGoal} tone="accent" />
                <SummaryTile label={copy.progress} value={`${progress}%`} detail={copy.caloriesVsTarget} />
                <SummaryTile label={copy.meals} value={String(entries.length)} detail={copy.entriesToday} />
            </div>
            <div className="react-shell__card">
                <div className="react-shell__card-kicker">{copy.insightKicker}</div>
                <h2 className="react-shell__card-title">{copy.insightTitle}</h2>
                <p className="react-shell__card-copy">
                    {copy.insightCopy}
                </p>
            </div>
        </section>
    );
}
