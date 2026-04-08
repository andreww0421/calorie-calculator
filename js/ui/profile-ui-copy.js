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

const zhCN = Object.freeze({
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
});

const ja = Object.freeze({
    regionLabel: '地域',
    diningOutFrequencyLabel: '外食頻度',
    goalLabel: '目標',
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
    onboardingTitle: '食事プロフィールを完成させる',
    onboardingBody: '地域、目標、外食頻度を設定すると、プリセットと1日の目標が実際の食生活に合いやすくなります。',
    onboardingButton: '設定を完了',
    onboardingRegionValue: '地域が未設定です',
    onboardingMissing: {
        region: '地域を選択',
        basicProfile: '基本プロフィールを入力',
        goalType: '目標を確認',
        diningOutFrequency: '外食頻度を確認'
    }
});

const ko = Object.freeze({
    regionLabel: '지역',
    diningOutFrequencyLabel: '외식 빈도',
    goalLabel: '목표',
    regionOptions: {
        '': '지역 선택',
        taiwan: '대만',
        'hong-kong': '홍콩',
        singapore: '싱가포르'
    },
    diningOutOptions: {
        daily: '거의 매일',
        often: '주 여러 번',
        sometimes: '가끔',
        rare: '드물게'
    },
    goalTypes: {
        lose: '감량',
        maintain: '유지',
        gain: '증량'
    },
    onboardingEyebrow: 'Asia-first 설정',
    onboardingTitle: '식사 프로필을 완성하세요',
    onboardingBody: '지역, 목표, 외식 습관을 설정하면 식사 프리셋과 일일 목표가 실제 식생활에 더 잘 맞습니다.',
    onboardingButton: '설정 완료',
    onboardingRegionValue: '지역이 아직 설정되지 않았습니다',
    onboardingMissing: {
        region: '지역 선택',
        basicProfile: '기본 프로필 입력',
        goalType: '목표 확인',
        diningOutFrequency: '외식 빈도 확인'
    }
});

const ar = Object.freeze({
    regionLabel: 'المنطقة',
    diningOutFrequencyLabel: 'وتيرة الأكل خارج المنزل',
    goalLabel: 'الهدف',
    regionOptions: {
        '': 'اختر المنطقة',
        taiwan: 'تايوان',
        'hong-kong': 'هونغ كونغ',
        singapore: 'سنغافورة'
    },
    diningOutOptions: {
        daily: 'تقريباً كل يوم',
        often: 'عدة مرات أسبوعياً',
        sometimes: 'أحياناً',
        rare: 'نادراً'
    },
    goalTypes: {
        lose: 'خفض الوزن',
        maintain: 'الحفاظ على الوزن',
        gain: 'بناء العضلات'
    },
    onboardingEyebrow: 'إعداد Asia-first',
    onboardingTitle: 'أكمل ملفك الغذائي',
    onboardingBody: 'حدد المنطقة والهدف وعادات الأكل خارج المنزل حتى تتوافق الاقتراحات والأهداف اليومية مع أسلوب أكلك الفعلي.',
    onboardingButton: 'إكمال الإعداد',
    onboardingRegionValue: 'لم يتم تحديد المنطقة بعد',
    onboardingMissing: {
        region: 'اختر المنطقة',
        basicProfile: 'أكمل الملف الأساسي',
        goalType: 'أكد الهدف',
        diningOutFrequency: 'أكد وتيرة الأكل خارج المنزل'
    }
});

export const profileUiCopyCatalog = Object.freeze({
    'zh-TW': zhTW,
    'zh-CN': zhCN,
    en: baseEn,
    ja,
    ko,
    ar
});
