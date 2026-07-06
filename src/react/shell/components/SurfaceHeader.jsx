export default function SurfaceHeader({ eyebrow, title, description }) {
    return (
        <header className="react-shell__surface-header">
            <div className="react-shell__eyebrow">{eyebrow}</div>
            <h1 className="react-shell__title">{title}</h1>
            <p className="react-shell__description">{description}</p>
        </header>
    );
}
