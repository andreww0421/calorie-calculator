import SurfaceHeader from '../components/SurfaceHeader.jsx';
import SummaryTile from '../components/SummaryTile.jsx';
import { formatNumber } from '../utils.js';

export default function ProfileView({
    profile,
    profileDraft,
    onProfileDraftChange,
    onSaveProfile,
    targetCalories,
    goalType,
    feedback,
    copy,
    profileCopy
}) {
    const activityOptions = Object.entries(copy.activities);
    const goalOptions = Object.entries(profileCopy.goalTypes);
    const mealModeOptions = Object.entries(profileCopy.mealModes);
    const diningOptions = ['rarely', 'sometimes', 'often', 'daily']
        .map((value) => [value, profileCopy.diningFreqs[value]])
        .filter(([, label]) => Boolean(label));

    return (
        <section className="react-shell__surface">
            <SurfaceHeader
                eyebrow={profileCopy.kicker}
                title={profileCopy.title}
                description={profileCopy.summary}
            />
            <div className="react-shell__summary-grid">
                <SummaryTile label={profileCopy.goalLabel} value={profileCopy.goalTypes[goalType || profile.goalType] || '--'} detail={copy.currentMode} tone="accent" />
                <SummaryTile label={profileCopy.targetLabel} value={targetCalories > 0 ? `${formatNumber(targetCalories)} cal` : '--'} detail={copy.dailyCalories} />
                <SummaryTile label={profileCopy.mealModeLabel} value={profileCopy.mealModes[String(profile.mealMode || '4')] || '--'} detail={copy.mealsPerDay} />
            </div>
            <div className="react-shell__split-grid">
                <div className="react-shell__list-card">
                    {[
                        [copy.gender, copy.genders[profile.gender] || '--'],
                        [copy.age, profile.age || '--'],
                        [copy.height, profile.height ? `${profile.height} cm` : '--'],
                        [copy.weight, profile.weight ? `${profile.weight} kg` : '--'],
                        [copy.diningOut, profileCopy.diningFreqs[profile.diningOutFrequency] || '--']
                    ].map(([label, value]) => (
                        <div key={label} className="react-shell__profile-row">
                            <span>{label}</span>
                            <strong>{value}</strong>
                        </div>
                    ))}
                </div>
                <form
                    className="react-shell__card react-shell__form-card"
                    onSubmit={(event) => {
                        event.preventDefault();
                        onSaveProfile();
                    }}
                >
                    <div className="react-shell__card-kicker">{copy.editor}</div>
                    <h2 className="react-shell__card-title">{copy.editorTitle}</h2>
                    <div className="react-shell__form-grid">
                        <label className="react-shell__field">
                            <span>{copy.gender}</span>
                            <select id="profile-gender" value={profileDraft.gender} onChange={(event) => onProfileDraftChange('gender', event.target.value)}>
                                {Object.entries(copy.genders).map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </label>
                        <label className="react-shell__field">
                            <span>{copy.age}</span>
                            <input id="profile-age" type="number" value={profileDraft.age} onChange={(event) => onProfileDraftChange('age', event.target.value)} />
                        </label>
                        <label className="react-shell__field">
                            <span>{copy.height}</span>
                            <input id="profile-height" type="number" value={profileDraft.height} onChange={(event) => onProfileDraftChange('height', event.target.value)} />
                        </label>
                        <label className="react-shell__field">
                            <span>{copy.weight}</span>
                            <input id="profile-weight" type="number" value={profileDraft.weight} onChange={(event) => onProfileDraftChange('weight', event.target.value)} />
                        </label>
                        <label className="react-shell__field">
                            <span>{copy.activity}</span>
                            <select id="profile-activity" value={profileDraft.activity} onChange={(event) => onProfileDraftChange('activity', event.target.value)}>
                                {activityOptions.map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </label>
                        <label className="react-shell__field">
                            <span>{copy.goal}</span>
                            <select id="profile-goal-type" value={profileDraft.goalType} onChange={(event) => onProfileDraftChange('goalType', event.target.value)}>
                                {goalOptions.map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </label>
                        <label className="react-shell__field">
                            <span>{copy.mealMode}</span>
                            <select id="profile-meal-mode" value={profileDraft.mealMode} onChange={(event) => onProfileDraftChange('mealMode', event.target.value)}>
                                {mealModeOptions.map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </label>
                        <label className="react-shell__field">
                            <span>{copy.diningOut}</span>
                            <select id="profile-dining-frequency" value={profileDraft.diningOutFrequency} onChange={(event) => onProfileDraftChange('diningOutFrequency', event.target.value)}>
                                {diningOptions.map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="react-shell__action-row">
                        <button id="profile-save" type="submit" className="react-shell__primary-button">{copy.save}</button>
                        {feedback ? <div id="profile-feedback" className="react-shell__inline-feedback">{feedback}</div> : null}
                    </div>
                </form>
            </div>
        </section>
    );
}
