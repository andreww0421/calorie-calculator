import { createOnboardingConfig } from '../domain/profile-domain.js';
import { createButton, createElement, clearElement } from './dom-ui.js';
import { getGoalSummaryText } from './locale-ui.js';
import { profileUiCopyCatalog } from './profile-ui-copy.js';

const PROFILE_UI_COPY = Object.freeze({
    'zh-TW': {
        regionLabel: '地區',
        diningOutFrequencyLabel: '外食頻率',
        regionOptions: {
            '': '請選擇地區',
            taiwan: '台灣',
            'hong-kong': '香港',
            singapore: '新加坡'
        },
        diningOutOptions: {
            daily: '幾乎每天外食',
            often: '每週多次外食',
            sometimes: '偶爾外食',
            rare: '很少外食'
        },
        goalTypes: {
            lose: '減重',
            maintain: '維持體重',
            gain: '增肌'
        },
        onboardingEyebrow: 'Asia-first 設定',
        onboardingTitle: '完成你的飲食設定',
        onboardingBody: '設定地區、目標與外食習慣後，系統會更準確地帶入在地餐點預設與每日目標。',
        onboardingButton: '前往完成設定',
        onboardingRegionValue: '未設定地區',
        onboardingMissing: {
            region: '補上地區',
            basicProfile: '補上基本資料',
            goalType: '確認目標',
            diningOutFrequency: '確認外食頻率'
        }
    },
    'zh-CN': {
        regionLabel: '地区',
        diningOutFrequencyLabel: '外食频率',
        regionOptions: {
            '': '请选择地区',
            taiwan: '台湾',
            'hong-kong': '香港',
            singapore: '新加坡'
        },
        diningOutOptions: {
            daily: '几乎每天外食',
            often: '每周多次外食',
            sometimes: '偶尔外食',
            rare: '很少外食'
        },
        goalTypes: {
            lose: '减重',
            maintain: '维持体重',
            gain: '增肌'
        },
        onboardingEyebrow: 'Asia-first 设置',
        onboardingTitle: '完成你的饮食设置',
        onboardingBody: '设置地区、目标和外食习惯后，系统会更准确地带入在地餐点预设与每日目标。',
        onboardingButton: '前往完成设置',
        onboardingRegionValue: '未设置地区',
        onboardingMissing: {
            region: '补上地区',
            basicProfile: '补上基础资料',
            goalType: '确认目标',
            diningOutFrequency: '确认外食频率'
        }
    },
    en: {
        regionLabel: 'Region',
        diningOutFrequencyLabel: 'Dining-out frequency',
        regionOptions: {
            '': 'Choose a region',
            taiwan: 'Taiwan',
            'hong-kong': 'Hong Kong',
            singapore: 'Singapore'
        },
        diningOutOptions: {
            daily: 'Almost every day',
            often: 'Several times a week',
            sometimes: 'Occasionally',
            rare: 'Rarely'
        },
        goalTypes: {
            lose: 'Lose Weight',
            maintain: 'Maintain Weight',
            gain: 'Build Muscle'
        },
        onboardingEyebrow: 'Asia-first setup',
        onboardingTitle: 'Complete your dining profile',
        onboardingBody: 'Set your region, goal, and dining-out habits so presets and daily targets match how you actually eat.',
        onboardingButton: 'Finish setup',
        onboardingRegionValue: 'Region not set',
        onboardingMissing: {
            region: 'Choose a region',
            basicProfile: 'Complete basic profile',
            goalType: 'Confirm your goal',
            diningOutFrequency: 'Confirm dining frequency'
        }
    },
    ja: {
        regionLabel: '地域',
        diningOutFrequencyLabel: '外食頻度',
        regionOptions: {
            '': '地域を選択',
            taiwan: '台湾',
            'hong-kong': '香港',
            singapore: 'シンガポール'
        },
        diningOutOptions: {
            daily: 'ほぼ毎日',
            often: '週に数回',
            sometimes: 'ときどき',
            rare: 'ほとんどない'
        },
        goalTypes: {
            lose: '減量',
            maintain: '維持',
            gain: '増量'
        },
        onboardingEyebrow: 'Asia-first 設定',
        onboardingTitle: '食事プロフィールを完成',
        onboardingBody: '地域、目標、外食頻度を設定すると、ローカルの料理プリセットと目標計算が合いやすくなります。',
        onboardingButton: '設定を完了',
        onboardingRegionValue: '地域未設定',
        onboardingMissing: {
            region: '地域を選択',
            basicProfile: '基本プロフィールを入力',
            goalType: '目標を確認',
            diningOutFrequency: '外食頻度を確認'
        }
    },
    ko: {
        regionLabel: '지역',
        diningOutFrequencyLabel: '외식 빈도',
        regionOptions: {
            '': '지역 선택',
            taiwan: '대만',
            'hong-kong': '홍콩',
            singapore: '싱가포르'
        },
        diningOutOptions: {
            daily: '거의 매일',
            often: '주 몇 회',
            sometimes: '가끔',
            rare: '드물게'
        },
        goalTypes: {
            lose: '감량',
            maintain: '유지',
            gain: '증량'
        },
        onboardingEyebrow: 'Asia-first 설정',
        onboardingTitle: '식사 프로필 완료',
        onboardingBody: '지역, 목표, 외식 습관을 설정하면 로컬 프리셋과 목표 계산이 더 잘 맞습니다.',
        onboardingButton: '설정 완료하기',
        onboardingRegionValue: '지역 미설정',
        onboardingMissing: {
            region: '지역 선택',
            basicProfile: '기본 프로필 입력',
            goalType: '목표 확인',
            diningOutFrequency: '외식 빈도 확인'
        }
    },
    ar: {
        regionLabel: 'المنطقة',
        diningOutFrequencyLabel: 'وتيرة الأكل خارج المنزل',
        regionOptions: {
            '': 'اختر المنطقة',
            taiwan: 'تايوان',
            'hong-kong': 'هونغ كونغ',
            singapore: 'سنغافورة'
        },
        diningOutOptions: {
            daily: 'تقريبًا كل يوم',
            often: 'عدة مرات أسبوعيًا',
            sometimes: 'أحيانًا',
            rare: 'نادراً'
        },
        goalTypes: {
            lose: 'خسارة الوزن',
            maintain: 'الحفاظ على الوزن',
            gain: 'بناء العضلات'
        },
        onboardingEyebrow: 'إعداد Asia-first',
        onboardingTitle: 'أكمل ملفك الغذائي',
        onboardingBody: 'حدد المنطقة والهدف وعادات الأكل خارج المنزل حتى تتوافق الوجبات المقترحة والأهداف اليومية مع واقعك.',
        onboardingButton: 'إكمال الإعداد',
        onboardingRegionValue: 'المنطقة غير محددة',
        onboardingMissing: {
            region: 'اختر المنطقة',
            basicProfile: 'أكمل البيانات الأساسية',
            goalType: 'أكد الهدف',
            diningOutFrequency: 'أكد وتيرة الأكل خارج المنزل'
        }
    }
});

const DINING_OUT_FREQUENCY_VALUES = Object.freeze(['daily', 'often', 'sometimes', 'rare']);

function getProfileUiCopy(lang = 'en') {
    const locale = String(lang || 'en');
    const baseLang = locale.split('-')[0];
    return profileUiCopyCatalog[locale] || profileUiCopyCatalog[baseLang] || profileUiCopyCatalog.en;
}

function syncSelectOptions(select, options, selectedValue) {
    if (!select) return;

    const currentValue = selectedValue ?? select.value ?? '';
    clearElement(select);

    options.forEach(({ value, label }) => {
        const option = createElement('option', {
            text: label,
            attrs: { value }
        });
        if (value === currentValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    if (options.some((option) => option.value === currentValue)) {
        select.value = currentValue;
    }
}

export function syncProfilePreferenceInputs(lang = 'en', profile = {}) {
    const copy = getProfileUiCopy(lang);
    const regionSelect = document.getElementById('region');
    const regionRow = regionSelect?.closest('.settings-item');
    const regionLabels = regionRow ? [...regionRow.querySelectorAll('label')] : [];
    const regionLabel = regionLabels[0] || document.getElementById('lbl-region');
    const diningLabel = document.getElementById('lbl-dining-out-frequency');
    const diningSelect = document.getElementById('dining-out-frequency');

    regionLabels.slice(1).forEach((label) => label.remove());
    if (regionLabel && regionLabel.id !== 'lbl-region') {
        regionLabel.id = 'lbl-region';
    }

    if (regionLabel) regionLabel.innerText = copy.regionLabel;
    if (diningLabel) diningLabel.innerText = copy.diningOutFrequencyLabel;

    syncSelectOptions(
        regionSelect,
        Object.entries(copy.regionOptions).map(([value, label]) => ({ value, label })),
        regionSelect?.value || String(profile?.region || '').trim()
    );

    syncSelectOptions(
        diningSelect,
        DINING_OUT_FREQUENCY_VALUES.map((value) => ({
            value,
            label: copy.diningOutOptions[value] || value
        })),
        diningSelect?.value || String(profile?.diningOutFrequency || 'sometimes').trim() || 'sometimes'
    );
}

export function renderOnboardingCard(profile = {}, lang = 'en') {
    const container = document.getElementById('onboarding-card');
    if (!container) return false;

    const config = createOnboardingConfig(profile, lang);
    const copy = getProfileUiCopy(lang);

    container.hidden = config.isComplete;
    container.dataset.region = config.region || '';
    container.dataset.diningOutFrequency = config.diningOutFrequency || '';
    if (config.isComplete) {
        clearElement(container);
        return false;
    }

    clearElement(container);
    container.className = 'quick-start-card onboarding-card';

    const missingLabels = config.missingFields
        .map((field) => copy.onboardingMissing[field])
        .filter(Boolean);

    const metaRow = createElement('div', { className: 'onboarding-meta' }, [
        createElement('span', {
            className: 'coach-stat-chip',
            text: `${copy.regionLabel}: ${copy.regionOptions[config.region] || copy.onboardingRegionValue}`
        }),
        createElement('span', {
            className: 'coach-stat-chip',
            text: `${copy.diningOutFrequencyLabel}: ${copy.diningOutOptions[config.diningOutFrequency] || config.diningOutFrequency}`
        }),
        createElement('span', {
            className: 'coach-stat-chip',
            text: `${copy.goalLabel || 'Goal'}: ${copy.goalTypes?.[config.goalType || 'lose'] || config.goalType || 'lose'}`
        })
    ]);

    const missingRow = missingLabels.length
        ? createElement('div', { className: 'onboarding-meta onboarding-meta--missing' }, missingLabels.map((label) => (
            createElement('span', {
                className: 'coach-stat-chip onboarding-missing-chip',
                text: label
            })
        )))
        : null;

    container.appendChild(createElement('div', { className: 'quick-start-eyebrow', text: copy.onboardingEyebrow }));
    container.appendChild(createElement('div', { className: 'quick-start-title', text: copy.onboardingTitle }));
    container.appendChild(createElement('div', { className: 'quick-start-copy', text: copy.onboardingBody }));
    container.appendChild(metaRow);
    if (missingRow) {
        container.appendChild(missingRow);
    }
    container.appendChild(createButton(copy.onboardingButton, null, {
        attrs: {
            id: 'btn-open-onboarding',
            type: 'button'
        },
        className: 'onboarding-cta'
    }));

    return true;
}

export function renderProfileGoalResult(plan, translations, goalUi) {
    if (!plan) return false;

    const tdeeEl = document.getElementById('tdee-val');
    const targetEl = document.getElementById('target-cal-val');
    const targetDisplayEl = document.getElementById('target-cal-display');
    const goalResult = document.getElementById('goal-result');
    const macroContainer = document.getElementById('macro-goals');

    if (tdeeEl) tdeeEl.innerText = String(plan.tdee || 0);
    if (targetEl) targetEl.innerText = String(plan.targetCalories || 0);
    if (targetDisplayEl) targetDisplayEl.innerText = String(plan.targetCalories || 0);
    if (goalResult) goalResult.style.display = 'block';

    if (!macroContainer) return true;

    const goals = plan.macroGoals || {};
    macroContainer.replaceChildren(
        (() => {
            const strong = document.createElement('strong');
            strong.textContent = translations.macroGoalTitle || 'Recommended macro targets';
            return strong;
        })(),
        document.createElement('br'),
        document.createTextNode(
            `${goalUi.goalSummaryLabel || 'Goal'}: ${getGoalSummaryText(plan.goalType || 'lose')} | ${goalUi.calorieTargetLabel || 'Calories'}: ${plan.targetCalories || 0} kcal`
        ),
        document.createElement('br'),
        document.createTextNode(
            `P ${translations.pro}: ${goals.protein}g | F ${translations.fat}: ${goals.fat}g | C ${translations.carb}: ${goals.carb}g`
        ),
        document.createElement('br'),
        document.createTextNode(
            `${translations.sugar}: ${goals.sugar}g | ${translations.sod.replace('(mg)', '')}: 2300mg | ${translations.sat}: ${goals.saturatedFat}g`
        )
    );

    return true;
}
