export default function SummaryTile({ label, value, detail, tone = 'neutral' }) {
    return (
        <article className={`react-shell__summary-tile react-shell__summary-tile--${tone}`}>
            <div className="react-shell__summary-label">{label}</div>
            <div className="react-shell__summary-value">{value}</div>
            {detail ? <div className="react-shell__summary-detail">{detail}</div> : null}
        </article>
    );
}
