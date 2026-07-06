import SurfaceHeader from '../components/SurfaceHeader.jsx';

export default function AddView({
    draft,
    onDraftChange,
    onAddMeal,
    onJumpToLegacyAdd,
    savedMessage,
    copy
}) {
    return (
        <section className="react-shell__surface">
            <SurfaceHeader
                eyebrow={copy.eyebrow}
                title={copy.title}
                description={copy.description}
            />
            <div className="react-shell__split-grid">
                <form
                    className="react-shell__card react-shell__form-card"
                    onSubmit={(event) => {
                        event.preventDefault();
                        onAddMeal();
                    }}
                >
                    <div className="react-shell__card-kicker">{copy.manualKicker}</div>
                    <h2 className="react-shell__card-title">{copy.manualTitle}</h2>
                    <div className="react-shell__form-grid">
                        <label className="react-shell__field">
                            <span>{copy.name}</span>
                            <input id="add-meal-name" value={draft.name} onChange={(event) => onDraftChange('name', event.target.value)} />
                        </label>
                        <label className="react-shell__field">
                            <span>{copy.mealType}</span>
                            <select id="add-meal-type" value={draft.type} onChange={(event) => onDraftChange('type', event.target.value)}>
                                {Object.entries(copy.mealTypes).map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </label>
                        <label className="react-shell__field">
                            <span>{copy.calories}</span>
                            <input id="add-meal-calories" type="number" inputMode="decimal" value={draft.calories} onChange={(event) => onDraftChange('calories', event.target.value)} />
                        </label>
                        <label className="react-shell__field">
                            <span>{copy.protein}</span>
                            <input id="add-meal-protein" type="number" inputMode="decimal" value={draft.protein} onChange={(event) => onDraftChange('protein', event.target.value)} />
                        </label>
                        <label className="react-shell__field">
                            <span>{copy.carbs}</span>
                            <input id="add-meal-carbs" type="number" inputMode="decimal" value={draft.carbohydrate} onChange={(event) => onDraftChange('carbohydrate', event.target.value)} />
                        </label>
                        <label className="react-shell__field">
                            <span>{copy.fat}</span>
                            <input id="add-meal-fat" type="number" inputMode="decimal" value={draft.fat} onChange={(event) => onDraftChange('fat', event.target.value)} />
                        </label>
                    </div>
                    <div className="react-shell__action-row">
                        <button id="add-meal-submit" type="submit" className="react-shell__primary-button">{copy.submit}</button>
                        {savedMessage ? <div id="add-meal-feedback" className="react-shell__inline-feedback">{savedMessage}</div> : null}
                    </div>
                </form>

                <div className="react-shell__card">
                    <div className="react-shell__card-kicker">{copy.aiKicker}</div>
                    <h2 className="react-shell__card-title">{copy.aiTitle}</h2>
                    <p className="react-shell__card-copy">
                        {copy.aiCopy}
                    </p>
                    <div className="react-shell__bullet-list">
                        {copy.aiBullets.map((item) => <div key={item}>{item}</div>)}
                    </div>
                    <button id="add-open-legacy" type="button" className="react-shell__ghost-button" onClick={onJumpToLegacyAdd}>
                        {copy.aiButton}
                    </button>
                </div>
            </div>
        </section>
    );
}
