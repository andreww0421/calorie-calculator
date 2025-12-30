function setLang(lang) {
    curLang = lang;
    localStorage.setItem('appLang', lang);
    const t = i18n[lang] || i18n['zh-TW']; // 加上 fallback

    // 1. 更新一般文字標籤
    const mapping = {
        'txt-date-label': t.dateLabel, 'txt-total-intake': t.totalIntake, 'txt-goal-label': t.goal,
        'lbl-pro': t.pro, 'lbl-fat': t.fat, 'lbl-carb': t.carb, 'lbl-sugar': t.sugar, 'lbl-sod': t.sod, 'lbl-sat': t.sat, 'lbl-trans': t.trans, 'lbl-water': t.water,
        'txt-chart-title': t.chartTitle, 'txt-chart-macro': t.chartMacro, 'txt-chart-weekly': t.chartWeekly,
        'txt-ai-title': t.aiTitle, 'btn-take-photo': t.btnPhoto, 'txt-analyze-btn': t.btnAnalyze, 'txt-ai-loading': t.aiLoading,
        'txt-record-title': t.recordTitle, 'txt-manual-label': t.manualLabel, 'btn-add-record': t.btnAdd, 'btn-fav-save-main': t.btnFavSave, 'btn-fav-load-main': t.btnFavLoad, 'btn-ai-fav-save': t.btnFavAi,
        'txt-settings-title': t.settingsTitle, 'lbl-gender': t.gender, 'opt-male': t.male || 'Male', 'opt-female': t.female || 'Female',
        'lbl-age': t.age, 'lbl-height': t.height, 'lbl-weight': t.weight, 
        
        // 2. 這裡就是關鍵！更新選單文字
        'lbl-activity': t.activity,
        'opt-act-1': t.act1, 'opt-act-2': t.act2, 'opt-act-3': t.act3, 'opt-act-4': t.act4,
        'lbl-meal-mode': t.mealMode,
        'opt-mode-4': t.mode4, 'opt-mode-3': t.mode3, 'opt-mode-2': t.mode2, 'opt-mode-1': t.mode1,
        
        'btn-calc': t.btnCalc, 'txt-res-tdee': t.resTdee, 'txt-res-target': t.resTarget,
        'txt-modal-title': t.modalTitle, 'txt-modal-ask': t.modalAsk, 'btn-cancel': t.btnCancel,
        'txt-fav-title': t.favTitle, 'btn-fav-close': t.btnClose, 'menu-import': t.menuImport, 'menu-export': t.menuExport, 'menu-theme': t.menuTheme, 'menu-lang': t.menuLang, 'suggest': t.suggest,
        'txt-lang-title': t.langTitle, 'btn-lang-cancel': t.langCancel
    };

    for(let id in mapping) {
        const el = document.getElementById(id);
        if(el) el.innerText = mapping[id];
    }

    // 3. 更新 Placeholder (AI 描述框 & 手動輸入框)
    document.getElementById('manual-name').placeholder = t.placeholderName;
    document.getElementById('manual-cal').placeholder = t.placeholderCal;
    document.getElementById('ai-desc').placeholder = t.aiDescPlaceholder; // 補回這行
    
    document.querySelectorAll('.txt-suggest').forEach(el => el.innerText = t.suggest);
    
    updateMealUI(); 
    if(macroChart) {
        macroChart.data.labels = [t.pro, t.fat, t.carb];
        macroChart.update();
    }
}
