const arUiCopy = {
    extra: {
        direction: 'rtl',
        todayLabel: 'اليوم',
        metaTitle: 'Woof Cal',
        metaOgTitle: 'Woof Cal',
        metaDescription: 'حلّل وجباتك بالذكاء الاصطناعي وتابع السعرات والوزن والتغذية في واجهة خفيفة وواضحة.',
        dailySummaryHint: 'اضغط لعرض التفاصيل الغذائية الكاملة',
        dailySummaryEmpty: 'ابدأ بتسجيل وجبات اليوم',
        dailySummaryLeftGoal: (value) => `تبقّى ${value} kcal للوصول إلى الهدف`,
        dailySummaryLeftToday: (value) => `تبقّى ${value} kcal لليوم`,
        dailySummaryOverTarget: (value) => `تم تجاوز الهدف بمقدار ${value} kcal`,
        dailySummaryTitle: (dateText) => `${dateText} ملخص التغذية`,
        remainingLabel: 'المتبقي',
        emptyStateEyebrow: 'بداية سريعة',
        emptyStateTitle: 'سجّل أول وجبة لك اليوم',
        emptyStateBody: 'التقط صورة للوجبة بالذكاء الاصطناعي أو أضف إدخالاً يدويًا لبدء يومك.',
        emptyMealTitle: 'لا توجد وجبات مسجلة بعد',
        emptyMealBody: 'ابدأ بالذكاء الاصطناعي أو بالإدخال اليدوي',
        aiGuideEyebrow: 'AI Tips',
        aiGuideTitle: 'اجعل تحليل AI أسرع وأكثر دقة',
        aiGuideBody: 'الصورة الواضحة مع وصف بسيط للمكونات أو الكمية تجعل التحليل أكثر استقرارًا.',
        aiGuideTip1: 'حاول أن يكون الطبق ظاهرًا بالكامل في الصورة',
        aiGuideTip2: 'أضف اسم المنتج أو المكونات الأساسية عند الحاجة',
        aiGuideTip3: 'إذا بدا التحليل غير دقيق، عدّل المكونات قبل إعادة الحساب',
        aiItemsRequired: 'يرجى الإبقاء على عنصر واحد على الأقل.'
    },
    goal: {
        goalTypeLabel: 'الهدف',
        goalSummaryLabel: 'الهدف الحالي',
        calorieTargetLabel: 'هدف السعرات',
        reportTitle: 'تقدم الهدف',
        reportSubtitle: 'آخر 7 أيام من الالتزام والتسجيل',
        goalTypes: {
            lose: 'خسارة الوزن',
            maintain: 'الحفاظ على الوزن',
            gain: 'بناء العضلات'
        },
        reportHeadline: (goal) => `التقدم الأسبوعي لهدف ${goal}`,
        reportSummary: (insights) => `تم التسجيل ${insights.loggedDays}/7 أيام، وتحقيق هدف السعرات ${insights.calorieTargetDays} أيام، وهدف البروتين ${insights.proteinTargetDays} أيام`,
        statStreak: 'تسجيل متتالٍ',
        statBestStreak: 'أفضل streak',
        statCalories: 'هدف السعرات',
        statProtein: 'هدف البروتين',
        formatDayCount: (value) => `${value} أيام`,
        formatWindowCount: (value, total) => `${value}/${total}`
    },
    coach: {
        cardTitle: 'مدرب اليوم',
        weeklyTitle: 'آخر 7 أيام',
        headlines: {
            start_logging: 'ابدأ اليوم بتسجيل أول وجبة',
            over_target: 'السعرات اليوم أعلى من المطلوب',
            near_goal: 'أنت قريب من نطاق الهدف',
            protein_gap: 'البروتين ما زال يحتاج دفعة',
            fiber_gap: 'الألياف تحتاج زيادة بسيطة',
            sodium_high: 'الصوديوم مرتفع اليوم',
            steady: 'إيقاع اليوم جيد حتى الآن'
        },
        summaries: {
            start_logging: 'بمجرد تسجيل أول وجبة ستصبح صورة بقية اليوم أوضح.',
            over_target: (coach) => `أنت أعلى من الهدف بحوالي ${coach.overCalories} kcal، لذلك من الأفضل أن تكون الوجبة التالية أخف.`,
            near_goal: (coach) => `المتبقي حوالي ${coach.remainingCalories} kcal فقط، لذا يكفي سناك خفيف إذا احتجته.`,
            protein_gap: (coach) => `ما زال ينقصك حوالي ${coach.proteinGap}g للوصول إلى هدف البروتين اليومي.`,
            fiber_gap: (coach) => `ما زال ينقصك حوالي ${coach.fiberGap}g للوصول إلى يوم غني بالألياف.`,
            sodium_high: 'اختر وجبة أقل ملوحة لاحقًا حتى يعود التوازن لبقية اليوم.',
            steady: 'السعرات والعناصر الغذائية تسير بشكل متوازن حتى الآن.'
        },
        tips: {
            use_ai: 'أسرع بداية تكون غالبًا عبر تصوير الوجبة بالذكاء الاصطناعي.',
            log_first_meal: 'إذا كنت مستعجلًا، يكفي أن تسجل السعرات والبروتين يدويًا أولًا.',
            protein_boost: 'في الوجبة القادمة جرّب البيض أو الدجاج أو الزبادي أو التوفو.',
            fiber_boost: 'أضف خضارًا أو فاكهة أو بقوليات أو حبوبًا كاملة لرفع الألياف.',
            watch_sodium: 'اشرب ماء أكثر وخفف من الشوربة والصلصات والأطعمة المصنعة.',
            portion_reset: 'تقليل النشويات أو السناك التالي إلى النصف يساعدك على العودة للمسار.',
            keep_momentum: 'حافظ على الإيقاع الحالي وراجع البطاقة مرة أخرى قبل العشاء.'
        },
        weeklyAverage: (value) => `المتوسط ${value} kcal`,
        weeklyDays: (days) => `${days} أيام مسجلة`,
        weeklyBest: (day, cal) => `${day} الأعلى ${cal} kcal`
    },
    rhythm: {
        title: 'إيقاع الوجبات خلال 7 أيام',
        subtitle: 'قراءة خفيفة لكيف سار أسبوعك.',
        dashboardSubtitle: 'إشارات الثبات من آخر 7 أيام مسجلة.',
        labels: {
            breakfast: 'الفطور',
            dinner: 'العشاء',
            protein: 'البروتين',
            hydration: 'الماء'
        },
        headlines: {
            start_logging: 'إيقاع الأسبوع يبدأ بعد تسجيل بضع وجبات',
            building_consistency: 'أنت تبني أسبوعًا أكثر قابلية للتكرار',
            steady_week: 'إيقاع وجباتك يبدو مستقرًا هذا الأسبوع',
            breakfast_anchor: 'الفطور هو أوضح نقطة لتثبيت اليوم',
            dinner_balance: 'العشاء يحمل جزءًا كبيرًا من هذا الأسبوع الآن',
            protein_rhythm: 'إيقاع البروتين ما زال يتحرك من يوم لآخر'
        },
        summaries: {
            start_logging: 'سجّل بضع وجبات عبر الأسبوع وستبدأ هذه البطاقة بإظهار روتينك.',
            building_consistency: 'بعض الأنماط بدأت تظهر. يومان أو ثلاثة أكثر ثباتًا سيجعلان الصورة أوضح.',
            steady_week: 'الوجبات بدأت تأخذ إيقاعًا متكررًا، وهذا يجعل بقية اليوم أسهل في التنظيم.',
            breakfast_anchor: 'إذا أردت يومًا أكثر استقرارًا، فالفطور هو أسهل نقطة تبدأ منها.',
            dinner_balance: 'العشاء يأخذ حصة كبيرة هذا الأسبوع. وجبة أخف مرة أو مرتين قد تنعم الإيقاع.',
            protein_rhythm: 'تناول البروتين غير متساوٍ عبر الأسبوع. وجود نقطة ثابتة سيساعد كثيرًا.'
        },
        breakfast: {
            steady: (signal) => `تم تسجيل الفطور في ${signal.breakfastDays}/${signal.loggedDays} أيام وكانت البداية متكررة بشكل جيد.`,
            building: (signal) => `ظهر الفطور في ${signal.breakfastDays}/${signal.loggedDays} من الأيام المسجلة.`,
            irregular: (signal) => `ظهر الفطور فقط في ${signal.breakfastDays}/${signal.loggedDays} من الأيام المسجلة.`
        },
        dinner: {
            light: () => 'العشاء بقي أخف نسبيًا هذا الأسبوع.',
            balanced: (signal) => `العشاء يشكل في المتوسط حوالي ${signal.averageDinnerShare}% من سعرات اليوم.`,
            heavy: (signal) => `كان العشاء هو الأثقل في ${signal.heavyDays}/${signal.loggedDays} من الأيام المسجلة.`
        },
        protein: {
            steady: (signal) => `البروتين يبدو مستقرًا إلى حد جيد بمتوسط ${signal.averageProtein}g يوميًا.`,
            building: (signal) => `${signal.targetDays}/${signal.loggedDays} أيام كانت قريبة من إيقاع البروتين المطلوب.`,
            inconsistent: (signal) => `البروتين غير متساوٍ بعد، مع ${signal.targetDays}/${signal.loggedDays} أيام قوية فقط.`
        },
        hydration: {
            placeholder: 'سيظهر إيقاع الماء هنا عندما يصبح تسجيل الشرب متاحًا.'
        }
    }
};

export default arUiCopy;
