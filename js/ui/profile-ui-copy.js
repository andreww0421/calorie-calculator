const baseEn = Object.freeze({
    regionLabel: 'Region',
    diningOutFrequencyLabel: 'Dining-out frequency',
    goalLabel: 'Goal',
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
});

const zhTW = Object.freeze({
    regionLabel: '地區',
    diningOutFrequencyLabel: '外食頻率',
    goalLabel: '目標',
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
    onboardingRegionValue: '尚未設定地區',
    onboardingMissing: {
        region: '補上地區',
        basicProfile: '補上基本資料',
        goalType: '確認目標',
        diningOutFrequency: '確認外食頻率'
    }
});

export const profileUiCopyCatalog = Object.freeze({
    'zh-TW': zhTW,
    'zh-CN': Object.freeze({
        ...baseEn,
        regionLabel: '地区',
        diningOutFrequencyLabel: '外食频率',
        goalLabel: '目标',
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
        onboardingRegionValue: '尚未设置地区',
        onboardingMissing: {
            region: '补上地区',
            basicProfile: '补上基础资料',
            goalType: '确认目标',
            diningOutFrequency: '确认外食频率'
        }
    }),
    en: baseEn,
    ja: baseEn,
    ko: baseEn,
    ar: baseEn
});
