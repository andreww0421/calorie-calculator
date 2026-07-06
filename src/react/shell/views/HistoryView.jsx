import SurfaceHeader from '../components/SurfaceHeader.jsx';
import SummaryTile from '../components/SummaryTile.jsx';
import { formatNumber, summarizeMeals } from '../utils.js';

export default function HistoryView({ entries, selectedDate, onDelete, onFavorite, copy, translations }) {
    const totals = summarizeMeals(entries);

    return (
        <section className="react-shell__surface">
            <SurfaceHeader
                eyebrow={copy.eyebrow}
                title={copy.title}
                description={copy.description(selectedDate)}
            />
            <div className="react-shell__summary-grid">
                <SummaryTile label={translations.cal} value={`${formatNumber(totals.calories)} cal`} detail={copy.dailyTotal} tone="accent" />
                <SummaryTile label={translations.pro} value={`${formatNumber(totals.protein, 1)} g`} detail={copy.currentState} />
                <SummaryTile label={translations.carb} value={`${formatNumber(totals.carb, 1)} g`} detail={copy.currentState} />
                <SummaryTile label={translations.fat} value={`${formatNumber(totals.fat, 1)} g`} detail={copy.currentState} />
            </div>
            <div className="react-shell__list-card">
                {entries.length > 0 ? entries.map((entry) => (
                    <article key={entry.id} className="react-shell__list-row">
                        <div>
                            <div className="react-shell__list-title">{entry.name}</div>
                            <div className="react-shell__list-meta">{translations.meals?.[entry.type] || entry.type}</div>
                        </div>
                        <div className="react-shell__list-stats">
                            <span>{`${formatNumber(entry.calories)} cal`}</span>
                            <span>{`P ${formatNumber(entry.protein, 1)}`}</span>
                            <span>{`C ${formatNumber(entry.carb, 1)}`}</span>
                            <span>{`F ${formatNumber(entry.fat, 1)}`}</span>
                            <button
                                type="button"
                                className="react-shell__mini-button"
                                data-entry-index={entry.index}
                                onClick={(event) => onFavorite(Number(event.currentTarget.dataset.entryIndex))}
                            >
                                {copy.favorite}
                            </button>
                            <button
                                type="button"
                                className="react-shell__mini-button react-shell__mini-button--danger"
                                data-entry-index={entry.index}
                                onClick={(event) => onDelete(Number(event.currentTarget.dataset.entryIndex))}
                            >
                                {copy.delete}
                            </button>
                        </div>
                    </article>
                )) : (
                    <div className="react-shell__empty-state">
                        {copy.empty}
                    </div>
                )}
            </div>
        </section>
    );
}
