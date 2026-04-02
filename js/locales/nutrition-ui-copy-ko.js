const koNutritionUiCopy = {
    detail: {
        overviewTitle: '영양 한눈에 보기',
        overviewSummary: '이 식사의 영양을 먼저 차분히 보고, 다음 조절을 생각할 수 있게 정리했습니다.',
        sections: {
            quality: {
                title: '영양 포인트',
                summary: '포만감과 전체 균형에 영향을 주기 쉬운 항목입니다.'
            },
            fatDetails: {
                title: '지방 세부 구성',
                summary: '지방의 구성과 출처를 조금 더 보여 주어 식사의 무게감을 읽기 쉽게 합니다.'
            }
        }
    },
    trend: {
        title: '영양 포커스',
        subtitle: '오늘 + 최근 7일',
        headlines: {
            start_logging: '몇 끼만 기록해도 영양 흐름이 보이기 시작합니다',
            protein: '오늘은 단백질을 먼저 보강하는 편이 좋습니다',
            fiber: '오늘은 식이섬유를 조금 더 채우면 흐름이 좋아집니다',
            sodium: '다음 식사를 덜 짜게 하면 하루가 더 편안해집니다',
            balanced: '오늘 영양 흐름은 비교적 안정적입니다'
        },
        summaries: {
            start_logging: '기록이 조금 쌓이면 이 카드에서 단백질, 식이섬유, 나트륨 흐름이 보이기 시작합니다.',
            protein: (days) => `최근 ${days}일과 비교하면 오늘은 단백질을 먼저 채우는 편이 가장 효과적입니다.`,
            fiber: (days) => `최근 ${days}일과 비교하면 오늘은 식이섬유를 조금 더 올리는 것이 가장 쉽습니다.`,
            sodium: (days) => `오늘 나트륨은 최근 ${days}일 흐름보다 약간 높아 다음 식사를 가볍게 두는 편이 좋습니다.`,
            balanced: (days) => `최근 ${days}일과 비교해도 오늘 영양 분배는 비교적 고르게 유지되고 있습니다.`
        },
        signalLabels: {
            protein: '단백질 페이스',
            fiber: '식이섬유 보강',
            sodium: '나트륨 균형'
        },
        signalDetails: {
            protein: ({ average }) => average > 0 ? `7일 평균 ${average}g` : '몇 일 더 기록하면 흐름이 보입니다',
            fiber: ({ average }) => average > 0 ? `7일 평균 ${average}g` : '몇 일 더 기록하면 흐름이 보입니다',
            sodium: ({ average }) => average > 0 ? `7일 평균 ${average}mg` : '몇 일 더 기록하면 흐름이 보입니다'
        },
        signalValue: {
            protein: ({ current, target }) => target > 0 ? `${current}/${target}g` : `${current}g`,
            fiber: ({ current }) => `${current}g`,
            sodium: ({ current }) => `${current}mg`
        }
    }
};

export default koNutritionUiCopy;
