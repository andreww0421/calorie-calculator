import { useAppState } from '../hooks/useAppState.js';
import { UserIcon } from '../../home/SectionIcons.jsx';
import { getProfileUiCopy } from '../../../js/locales/profile-ui-copy.js';

function formatTargetCalories(value) {
    const numeric = Number(value) || 0;
    return numeric > 0 ? `${Math.round(numeric)} kcal` : '--';
}

const PROFILE_METRICS_KEYS = ['goal', 'target', 'mealMode', 'frequency'];

export default function MainProfileIsland() {
    const state = useAppState();
    const copy = getProfileUiCopy(state.curLang);
    const profile = state.profile || {};

    const metricLabels = {
        goal: copy.goalLabel,
        target: copy.targetLabel,
        mealMode: copy.mealModeLabel,
        frequency: copy.diningOutLabel
    };

    const goalType = String(state.currentGoalType || profile.goalType || 'lose');
    const mealMode = String(profile.mealMode || '4');
    const frequency = String(profile.diningOutFrequency || '').trim();

    const metricValues = {
        goal: copy.goalTypes[goalType] || copy.goalTypes.lose,
        target: formatTargetCalories(state.targetCalories),
        mealMode: copy.mealModes[mealMode] || copy.mealModes['4'],
        frequency: copy.diningFreqs[frequency] || '--'
    };

    return (
        <section className="profile-hero-card" data-profile-react-surface="true">
            <div className="profile-hero-card__icon-shell">
                <img
                    src="calorie_icon-128.png"
                    alt=""
                    className="profile-hero-card__icon"
                    width="64"
                    height="64"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <div className="profile-hero-card__copy">
                <div className="section-kicker">{copy.kicker}</div>
                <div className="profile-hero-card__title-row">
                    <span className="profile-hero-card__icon-badge" aria-hidden="true"><UserIcon /></span>
                    <h1 className="profile-hero-card__title">{copy.title}</h1>
                </div>
                <p className="profile-hero-card__summary">
                    {copy.summary}
                </p>
            </div>
            <div className="profile-hero-card__grid">
                {PROFILE_METRICS_KEYS.map((id) => (
                    <div key={id} className="profile-hero-card__metric">
                        <span className="profile-hero-card__metric-label">{metricLabels[id]}</span>
                        <strong>{metricValues[id]}</strong>
                    </div>
                ))}
            </div>
        </section>
    );
}
