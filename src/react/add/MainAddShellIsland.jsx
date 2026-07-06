import React from 'react';
import { getLocaleTranslations } from '../../../js/locales/index.js';
import {
    getAddMealType,
    getAddMode,
    setAddMealType,
    setAddMode
} from '../../../js/ui/app-shell-ui.js';
import { updateMealUI } from '../../../js/ui/settings-ui.js';
import { useAppState } from '../hooks/useAppState.js';

const ADD_BRIDGE_FALLBACK = Object.freeze({
    clickFileInput() {},
    handleFileSelect() {},
    syncAnalysisInputState() {},
    startAnalysis() {},
    addManualFood() {},
    saveToFavorites() {},
    openFavorites() {}
});

const ADD_SURFACE_COPY = Object.freeze({
    en: Object.freeze({
        eyebrow: 'Quick logging',
        title: 'Add meal',
        summary: 'Choose the fastest input path first, then keep the heavier nutrition details in the same clean surface.',
        modeLabel: 'Add meal modes',
        modes: {
            photo: 'AI Photo Analysis',
            text: 'AI Text Analysis',
            manual: 'Manual'
        },
        mealTypeTitle: 'Meal type',
        photoTitle: 'AI Photo Analysis',
        photoDropzoneTitle: 'Take a photo or upload an image',
        photoDropzoneCopy: 'AI will estimate calories, macros, and the rest of the nutrition fields automatically.',
        photoButton: 'Open camera',
        photoNotesLabel: 'Photo notes',
        photoNotesPlaceholder: 'Add extra details to help the AI read the meal accurately.',
        textTitle: 'AI text analysis',
        textLabel: 'Describe what you ate',
        textPlaceholder: 'For example: grilled chicken rice, one boiled egg, greens, and iced black coffee.',
        manualTitle: 'Manual entry',
        manualCopy: 'Use this when you need full control over calories and all nutrient fields.',
        manualDetailsLabel: 'Meal details',
        manualNamePlaceholder: 'Food name (required)',
        manualCaloriesPlaceholder: 'Calories (required)',
        manualTypeLabel: 'Meal type',
        addRecord: 'Add to today',
        saveFavorite: 'Save favorite',
        openFavorites: 'Open favorites',
        analysisTitle: '2. Send for analysis'
    }),
    'zh-TW': Object.freeze({
        eyebrow: '快速記錄',
        title: '新增餐點',
        summary: '先用最快的輸入方式開始，需要更細的營養欄位時也留在同一個乾淨畫面裡完成。',
        modeLabel: '新增餐點模式',
        modes: {
            photo: 'AI照片分析',
            text: 'AI文字分析',
            manual: '手動輸入'
        },
        mealTypeTitle: '餐次',
        photoTitle: 'AI照片分析',
        photoDropzoneTitle: '拍照或上傳圖片',
        photoDropzoneCopy: 'AI 會自動估算熱量、三大營養與其他營養欄位。',
        photoButton: '開啟相機',
        photoNotesLabel: '照片補充說明',
        photoNotesPlaceholder: '補充份量、品牌或特殊料理方式，能幫助 AI 判讀更準。',
        textTitle: 'AI 文字分析',
        textLabel: '描述你吃了什麼',
        textPlaceholder: '例如：烤雞腿便當、一顆水煮蛋、青菜、無糖紅茶。',
        manualTitle: '手動輸入',
        manualCopy: '當你需要完整控制熱量與所有營養欄位時，再使用這一段。',
        manualDetailsLabel: '餐點內容',
        manualNamePlaceholder: '食物名稱 (必填)',
        manualCaloriesPlaceholder: '熱量 (必填)',
        manualTypeLabel: '餐次',
        addRecord: '加入今天',
        saveFavorite: '儲存常吃',
        openFavorites: '開啟常吃',
        analysisTitle: '2. 送出分析'
    }),
    'zh-CN': Object.freeze({
        eyebrow: '快速记录',
        title: '新增餐点',
        summary: '先用最快的输入方式开始，需要更细的营养字段时也留在同一个干净画面里完成。',
        modeLabel: '新增餐点模式',
        modes: {
            photo: 'AI照片分析',
            text: 'AI文字分析',
            manual: '手动输入'
        },
        mealTypeTitle: '餐次',
        photoTitle: 'AI照片分析',
        photoDropzoneTitle: '拍照或上传图片',
        photoDropzoneCopy: 'AI 会自动估算热量、三大营养和其他营养字段。',
        photoButton: '打开相机',
        photoNotesLabel: '照片补充说明',
        photoNotesPlaceholder: '补充份量、品牌或特殊烹调方式，能帮助 AI 判断更准。',
        textTitle: 'AI 文字分析',
        textLabel: '描述你吃了什么',
        textPlaceholder: '例如：烤鸡腿便当、一颗水煮蛋、青菜、无糖红茶。',
        manualTitle: '手动输入',
        manualCopy: '当你需要完整控制热量和所有营养字段时，再使用这一段。',
        manualDetailsLabel: '餐点内容',
        manualNamePlaceholder: '食物名称 (必填)',
        manualCaloriesPlaceholder: '热量 (必填)',
        manualTypeLabel: '餐次',
        addRecord: '加入今天',
        saveFavorite: '保存常吃',
        openFavorites: '打开常吃',
        analysisTitle: '2. 送出分析'
    })
});

function subscribeAddShell(setMode, setMealType) {
    const syncMode = (event) => {
        const nextMode = event?.detail?.mode;
        if (typeof nextMode === 'string') setMode(nextMode);
    };
    const syncMealType = (event) => {
        const nextMealType = event?.detail?.mealType;
        if (typeof nextMealType === 'string') setMealType(nextMealType);
    };

    window.addEventListener('woof:add-mode-change', syncMode);
    window.addEventListener('woof:add-meal-type-change', syncMealType);

    return () => {
        window.removeEventListener('woof:add-mode-change', syncMode);
        window.removeEventListener('woof:add-meal-type-change', syncMealType);
    };
}

function getAddBridge() {
    return globalThis.window?.__woofAddBridge || ADD_BRIDGE_FALLBACK;
}

function getAddSurfaceCopy(lang = 'en') {
    return ADD_SURFACE_COPY[lang]
        || ADD_SURFACE_COPY[String(lang || 'en').split('-')[0]]
        || ADD_SURFACE_COPY.en;
}

function CameraIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8.5h3l1.5-2h7L17 8.5h3A1.5 1.5 0 0 1 21.5 10v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5Z" />
            <circle cx="12" cy="13.2" r="3.5" />
        </svg>
    );
}

function TextIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 6.5h14" />
            <path d="M9 6.5v11" />
            <path d="M15 6.5v11" />
            <path d="M7 17.5h10" />
        </svg>
    );
}

function PenIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 20l3.6-.7L18 8.9l-2.9-2.9L4.7 16.4 4 20Z" />
            <path d="m13.8 7.3 2.9 2.9" />
        </svg>
    );
}

function SunriseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 16a7 7 0 0 1 14 0" />
            <path d="M3 16h18" />
            <path d="M12 5.5v3" />
            <path d="M6.5 8.5 8 10" />
            <path d="m17.5 8.5-1.5 1.5" />
        </svg>
    );
}

function BowlIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5h16a7 7 0 0 1-16 0Z" />
            <path d="M7 17.5h10" />
            <path d="M9 6.5c0 1 .6 1.6 1.6 1.6S12.2 7.5 12.2 6.5" />
            <path d="M13.3 5.7c0 1 .6 1.6 1.6 1.6s1.6-.6 1.6-1.6" />
        </svg>
    );
}

function MoonPlateIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 15.5a6 6 0 1 0 8-8 5.5 5.5 0 1 1-8 8Z" />
            <path d="M15.5 17.5H20" />
            <path d="M18 15v5" />
        </svg>
    );
}

function SnackIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4.5c2.8 0 5 2.2 5 5 0 5-5 9-5 9s-5-4-5-9c0-2.8 2.2-5 5-5Z" />
            <path d="M12 8.3v2.8" />
            <path d="M10.6 9.7h2.8" />
        </svg>
    );
}

function ModeIcon({ mode }) {
    if (mode === 'photo') return <CameraIcon />;
    if (mode === 'text') return <TextIcon />;
    return <PenIcon />;
}

function MealTypeIcon({ mealType }) {
    if (mealType === 'breakfast') return <SunriseIcon />;
    if (mealType === 'lunch') return <BowlIcon />;
    if (mealType === 'dinner') return <MoonPlateIcon />;
    return <SnackIcon />;
}

function AnalysisDock({ copy, t, onAnalyze }) {
    return (
        <div id="add-analysis-actions" className="add-shell-card add-shell-card--analysis">
            <div className="section-kicker">{copy.analysisTitle}</div>
            <div id="turnstile-widget" aria-hidden="true" />
            <div id="turnstile-status-note" className="ai-status-note" hidden />
            <button id="analyze-btn" className="btn-analyze" type="button" onClick={onAnalyze}>
                <span id="txt-analyze-btn">{t.btnAnalyze || 'Analyze meal'}</span>
            </button>
            <div className="loading-spinner" id="ai-loading">
                <span id="txt-ai-loading">{t.aiLoading || 'AI is analyzing the meal...'}</span>
            </div>
        </div>
    );
}

export default function MainAddShellIsland() {
    const state = useAppState();
    const t = getLocaleTranslations(state.curLang);
    const copy = getAddSurfaceCopy(state.curLang);
    const mealLabels = t.meals || {};
    const addBridge = getAddBridge();
    const [mode, setModeState] = React.useState(() => getAddMode());
    const [mealType, setMealTypeState] = React.useState(() => getAddMealType());
    const fileInputRef = React.useRef(null);

    const addModes = [
        { id: 'photo', label: copy.modes.photo },
        { id: 'text', label: copy.modes.text },
        { id: 'manual', label: copy.modes.manual }
    ];

    const mealTypes = [
        { id: 'breakfast', label: mealLabels.breakfast || 'Breakfast' },
        { id: 'lunch', label: mealLabels.lunch || 'Lunch' },
        { id: 'dinner', label: mealLabels.dinner || 'Dinner' },
        { id: 'snack', label: mealLabels.snack || 'Snack' }
    ];
    const activeAnalysisMode = mode === 'photo' || mode === 'text';

    React.useEffect(() => subscribeAddShell(setModeState, setMealTypeState), []);

    React.useEffect(() => {
        updateMealUI();
        setAddMealType(mealType);
        setAddMode(mode);
    }, [mealType, mode, state.curLang, state.currentMealMode, state.targetCalories]);

    return (
        <div data-add-react-surface="true">
            <div className="surface-heading">
                <div className="surface-heading__eyebrow">{copy.eyebrow}</div>
                <h1 className="surface-heading__title">{copy.title}</h1>
                <p className="surface-heading__copy">{copy.summary}</p>
            </div>

            <div className="add-shell-card">
                <div className="add-mode-switch" role="tablist" aria-label={copy.modeLabel}>
                    {addModes.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className={`add-mode-pill${mode === item.id ? ' is-active' : ''}`}
                            data-add-mode={item.id}
                            aria-pressed={String(mode === item.id)}
                            onClick={() => {
                                setModeState(item.id);
                                setAddMode(item.id);
                            }}
                        >
                            <span className="add-mode-pill__icon" aria-hidden="true">
                                <ModeIcon mode={item.id} />
                            </span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="add-shell-card">
                <div className="section-kicker">{copy.mealTypeTitle}</div>
                <div className="add-meal-type-grid">
                    {mealTypes.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className={`add-meal-type-chip${mealType === item.id ? ' is-active' : ''}`}
                            data-add-meal-type={item.id}
                            aria-pressed={String(mealType === item.id)}
                            onClick={() => {
                                setMealTypeState(item.id);
                                setAddMealType(item.id);
                            }}
                        >
                            <span className="add-meal-type-chip__icon" aria-hidden="true">
                                <MealTypeIcon mealType={item.id} />
                            </span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {mode === 'photo' ? (
                <section id="add-panel-photo" className="add-panel-surface">
                    <div className="add-panel-card add-panel-card--upload">
                        <div className="section-kicker">{copy.photoTitle}</div>
                        <div className="add-upload-dropzone">
                            <div className="add-upload-dropzone__icon" aria-hidden="true">
                                <CameraIcon />
                            </div>
                            <div className="add-upload-dropzone__title">{copy.photoDropzoneTitle}</div>
                            <div className="add-upload-dropzone__copy">{copy.photoDropzoneCopy}</div>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(event) => addBridge.handleFileSelect(event.currentTarget)}
                                style={{ display: 'none' }}
                            />
                            <button
                                className="btn-ai"
                                id="btn-take-photo"
                                type="button"
                                onClick={() => addBridge.clickFileInput(fileInputRef.current)}
                            >
                                {copy.photoButton}
                            </button>
                        </div>
                        <img id="image-preview" className="add-upload-preview" alt="" />
                        <div id="ai-desc-group" className="add-description-group">
                            <label htmlFor="ai-desc">{copy.photoNotesLabel}</label>
                            <textarea
                                id="ai-desc"
                                rows="3"
                                placeholder={copy.photoNotesPlaceholder}
                                onInput={() => addBridge.syncAnalysisInputState()}
                            />
                        </div>
                    </div>
                </section>
            ) : null}

            {mode === 'text' ? (
                <section id="add-panel-text" className="add-panel-surface">
                    <div className="add-panel-card">
                        <div className="section-kicker">{copy.textTitle}</div>
                        <div id="ai-text-only-group" className="add-text-group">
                            <label id="txt-text-ai-label" htmlFor="ai-text-desc">{copy.textLabel}</label>
                            <textarea
                                id="ai-text-desc"
                                rows="5"
                                placeholder={copy.textPlaceholder}
                                onInput={() => addBridge.syncAnalysisInputState()}
                            />
                        </div>
                    </div>
                </section>
            ) : null}

            {activeAnalysisMode ? (
                <AnalysisDock
                    copy={copy}
                    t={t}
                    onAnalyze={() => addBridge.startAnalysis()}
                />
            ) : null}

            {mode === 'manual' ? (
                <section id="add-panel-manual" className="add-panel-surface">
                    <div className="add-panel-card">
                        <div className="section-kicker">{copy.manualTitle}</div>
                        <p className="add-manual-copy">{copy.manualCopy}</p>
                        <div className="home-log-form home-log-form--inline">
                            <label htmlFor="manual-name">{copy.manualDetailsLabel}</label>
                            <div className="manual-grid">
                                <input type="text" id="manual-name" placeholder={copy.manualNamePlaceholder} />
                                <input type="number" id="manual-cal" placeholder={copy.manualCaloriesPlaceholder} />
                            </div>
                            <div className="small-input-group">
                                <input type="number" id="manual-pro" placeholder={t.phPro || 'Protein'} />
                                <input type="number" id="manual-fat" placeholder={t.phFat || 'Fat'} />
                                <input type="number" id="manual-carb" placeholder={t.phCarb || 'Carbs'} />
                                <input type="number" id="manual-sugar" placeholder={t.phSugar || 'Sugar'} />
                            </div>
                            <div className="small-input-group">
                                <input type="number" id="manual-sod" placeholder={t.phSod || 'Sodium'} />
                                <input type="number" id="manual-sat" placeholder={t.phSat || 'Sat. fat'} />
                                <input type="number" id="manual-trans" placeholder={t.phTrans || 'Trans fat'} />
                                <input type="number" id="manual-fiber" placeholder={t.phFiber || t.fiber || 'Fiber'} />
                            </div>
                            <select id="manual-type" className="manual-type-select" aria-label={copy.manualTypeLabel} />
                            <div className="add-manual-actions">
                                <button id="btn-add-record" type="button" onClick={() => addBridge.addManualFood()}>
                                    {copy.addRecord}
                                </button>
                                <button
                                    className="btn-fav-save"
                                    id="btn-fav-save-main"
                                    type="button"
                                    onClick={() => addBridge.saveToFavorites()}
                                >
                                    {copy.saveFavorite}
                                </button>
                                <button
                                    className="btn-fav-load"
                                    id="btn-fav-load-main"
                                    type="button"
                                    onClick={() => addBridge.openFavorites()}
                                >
                                    {copy.openFavorites}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
        </div>
    );
}
