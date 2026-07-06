function mergeDeep(base, override) {
    const output = { ...base };

    Object.entries(override || {}).forEach(([key, value]) => {
        if (
            value
            && typeof value === 'object'
            && !Array.isArray(value)
            && typeof base[key] === 'object'
            && base[key] !== null
        ) {
            output[key] = mergeDeep(base[key], value);
            return;
        }
        output[key] = value;
    });

    return output;
}

const en = {
    kicker: 'Profile',
    title: 'Woof Cal Companion',
    summary: 'A calmer settings surface where your target calories, meal mode, and preferences stay easy to read.',
    goalLabel: 'Goal',
    targetLabel: 'Target',
    mealModeLabel: 'Meal Mode',
    regionLabel: 'Region',
    diningOutLabel: 'Dining Out',
    goalTypes: {
        lose: 'Lose weight',
        maintain: 'Maintain weight',
        gain: 'Build muscle'
    },
    mealModes: {
        '1': 'OMAD',
        '2': '2 meals',
        '3': '3 meals',
        '4': '4 meals'
    },
    regions: {
        taiwan: 'Taiwan',
        'hong-kong': 'Hong Kong',
        singapore: 'Singapore'
    },
    diningFreqs: {
        daily: 'Almost daily',
        often: 'Often',
        sometimes: 'Sometimes',
        rare: 'Rarely',
        rarely: 'Rarely'
    }
};

const zhTW = mergeDeep(en, {
    kicker: '個人檔案',
    title: 'Woof Cal 汪卡管家',
    summary: '在這裡檢視你的目標熱量、餐次模式和個人偏好設定。',
    goalLabel: '目標',
    targetLabel: '目標熱量',
    mealModeLabel: '餐次模式',
    regionLabel: '地區',
    diningOutLabel: '外食頻率',
    goalTypes: {
        lose: '減重',
        maintain: '維持體重',
        gain: '增肌'
    },
    mealModes: {
        '1': '一餐 (OMAD)',
        '2': '兩餐',
        '3': '三餐',
        '4': '四餐'
    },
    regions: {
        taiwan: '台灣',
        'hong-kong': '香港',
        singapore: '新加坡'
    },
    diningFreqs: {
        daily: '幾乎每天',
        often: '經常',
        sometimes: '偶爾',
        rare: '很少',
        rarely: '很少'
    }
});

const zhCN = mergeDeep(en, {
    kicker: '个人档案',
    title: 'Woof Cal 汪卡管家',
    summary: '在这里查看你的目标热量、餐次模式和个人偏好设置。',
    goalLabel: '目标',
    targetLabel: '目标热量',
    mealModeLabel: '餐次模式',
    regionLabel: '地区',
    diningOutLabel: '外食频率',
    goalTypes: {
        lose: '减重',
        maintain: '维持体重',
        gain: '增肌'
    },
    mealModes: {
        '1': '一餐 (OMAD)',
        '2': '两餐',
        '3': '三餐',
        '4': '四餐'
    },
    regions: {
        taiwan: '台湾',
        'hong-kong': '香港',
        singapore: '新加坡'
    },
    diningFreqs: {
        daily: '几乎每天',
        often: '经常',
        sometimes: '偶尔',
        rare: '很少',
        rarely: '很少'
    }
});

const catalog = {
    en,
    'zh-TW': zhTW,
    'zh-CN': zhCN
};

export function getProfileUiCopy(lang = 'en') {
    return catalog[lang]
        || catalog[String(lang || 'en').split('-')[0]]
        || catalog.en;
}
