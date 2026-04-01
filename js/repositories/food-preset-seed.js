export const FOOD_PRESET_SEEDS = Object.freeze([
    {
        id: 'tw-beef-noodle-soup',
        region: 'taiwan',
        suggestedMealType: 'lunch',
        name: {
            'zh-TW': '紅燒牛肉麵',
            en: 'Braised Beef Noodle Soup'
        },
        nutrition: {
            calories: 620,
            protein: 33,
            fat: 21,
            carbohydrate: 70,
            sugar: 6,
            sodium: 1900,
            saturatedFat: 7,
            transFat: 0,
            fiber: 4
        },
        items: [
            { name: { 'zh-TW': '牛肉', en: 'Beef' }, weight: '120 g' },
            { name: { 'zh-TW': '麵條', en: 'Noodles' }, weight: '180 g' },
            { name: { 'zh-TW': '湯底', en: 'Broth' }, weight: '350 ml' }
        ],
        modifierGroups: [
            {
                id: 'portion',
                selectionType: 'single',
                label: { 'zh-TW': '份量', en: 'Portion' },
                options: [
                    {
                        id: 'small',
                        label: { 'zh-TW': '小碗', en: 'Small' },
                        includeInName: true,
                        effect: { nutritionMultiplier: 0.8 }
                    },
                    {
                        id: 'regular',
                        label: { 'zh-TW': '標準', en: 'Regular' },
                        default: true,
                        effect: { nutritionMultiplier: 1 }
                    },
                    {
                        id: 'large',
                        label: { 'zh-TW': '大碗', en: 'Large' },
                        includeInName: true,
                        effect: { nutritionMultiplier: 1.25 }
                    }
                ]
            },
            {
                id: 'addons',
                selectionType: 'multi',
                label: { 'zh-TW': '加料', en: 'Add-ons' },
                options: [
                    {
                        id: 'extra-beef',
                        label: { 'zh-TW': '加牛肉', en: 'Extra beef' },
                        effect: {
                            nutritionDelta: {
                                calories: 110,
                                protein: 12,
                                fat: 5,
                                carbohydrate: 0,
                                sugar: 0,
                                sodium: 120,
                                saturatedFat: 1.8,
                                transFat: 0,
                                fiber: 0
                            },
                            item: { name: { 'zh-TW': '牛肉加料', en: 'Extra beef' }, weight: '50 g' }
                        }
                    },
                    {
                        id: 'extra-noodles',
                        label: { 'zh-TW': '加麵', en: 'Extra noodles' },
                        effect: {
                            nutritionDelta: {
                                calories: 130,
                                protein: 4,
                                fat: 1,
                                carbohydrate: 28,
                                sugar: 0,
                                sodium: 60,
                                saturatedFat: 0.2,
                                transFat: 0,
                                fiber: 1
                            },
                            item: { name: { 'zh-TW': '加麵', en: 'Extra noodles' }, weight: '90 g' }
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'tw-bubble-milk-tea',
        region: 'taiwan',
        suggestedMealType: 'snack',
        name: {
            'zh-TW': '珍珠奶茶',
            en: 'Bubble Milk Tea'
        },
        nutrition: {
            calories: 360,
            protein: 4,
            fat: 7,
            carbohydrate: 68,
            sugar: 45,
            sodium: 110,
            saturatedFat: 4,
            transFat: 0,
            fiber: 0
        },
        items: [
            { name: { 'zh-TW': '奶茶', en: 'Milk tea' }, weight: '450 ml' },
            { name: { 'zh-TW': '珍珠', en: 'Pearls' }, weight: '50 g' }
        ],
        modifierGroups: [
            {
                id: 'size',
                selectionType: 'single',
                label: { 'zh-TW': '杯量', en: 'Drink size' },
                options: [
                    {
                        id: 'small',
                        label: { 'zh-TW': '小杯', en: 'Small' },
                        includeInName: true,
                        effect: { nutritionMultiplier: 0.8 }
                    },
                    {
                        id: 'medium',
                        label: { 'zh-TW': '中杯', en: 'Medium' },
                        default: true,
                        effect: { nutritionMultiplier: 1 }
                    },
                    {
                        id: 'large',
                        label: { 'zh-TW': '大杯', en: 'Large' },
                        includeInName: true,
                        effect: { nutritionMultiplier: 1.25 }
                    }
                ]
            },
            {
                id: 'sweetness',
                selectionType: 'single',
                label: { 'zh-TW': '甜度', en: 'Sweetness' },
                options: [
                    {
                        id: 'no-sugar',
                        label: { 'zh-TW': '無糖', en: 'No sugar' },
                        includeInName: true,
                        effect: {
                            nutritionDelta: {
                                calories: -120,
                                protein: 0,
                                fat: 0,
                                carbohydrate: -30,
                                sugar: -32,
                                sodium: 0,
                                saturatedFat: 0,
                                transFat: 0,
                                fiber: 0
                            }
                        }
                    },
                    {
                        id: 'half',
                        label: { 'zh-TW': '半糖', en: '50% sugar' },
                        default: true,
                        includeInName: true,
                        effect: {
                            nutritionDelta: {
                                calories: -40,
                                protein: 0,
                                fat: 0,
                                carbohydrate: -10,
                                sugar: -12,
                                sodium: 0,
                                saturatedFat: 0,
                                transFat: 0,
                                fiber: 0
                            }
                        }
                    },
                    {
                        id: 'full',
                        label: { 'zh-TW': '全糖', en: '100% sugar' },
                        includeInName: true,
                        effect: { nutritionDelta: {} }
                    }
                ]
            },
            {
                id: 'addons',
                selectionType: 'multi',
                label: { 'zh-TW': '加料', en: 'Add-ons' },
                options: [
                    {
                        id: 'extra-pearls',
                        label: { 'zh-TW': '加珍珠', en: 'Extra pearls' },
                        effect: {
                            nutritionDelta: {
                                calories: 110,
                                protein: 0,
                                fat: 0,
                                carbohydrate: 27,
                                sugar: 13,
                                sodium: 10,
                                saturatedFat: 0,
                                transFat: 0,
                                fiber: 0
                            },
                            item: { name: { 'zh-TW': '加珍珠', en: 'Extra pearls' }, weight: '40 g' }
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'hk-char-siu-rice',
        region: 'hong-kong',
        suggestedMealType: 'lunch',
        name: {
            'zh-TW': '叉燒飯',
            en: 'Char Siu Rice'
        },
        nutrition: {
            calories: 670,
            protein: 27,
            fat: 24,
            carbohydrate: 82,
            sugar: 16,
            sodium: 1480,
            saturatedFat: 7,
            transFat: 0,
            fiber: 3
        },
        items: [
            { name: { 'zh-TW': '叉燒', en: 'Char siu' }, weight: '120 g' },
            { name: { 'zh-TW': '白飯', en: 'Rice' }, weight: '220 g' }
        ],
        modifierGroups: [
            {
                id: 'portion',
                selectionType: 'single',
                label: { 'zh-TW': '份量', en: 'Portion' },
                options: [
                    {
                        id: 'light-rice',
                        label: { 'zh-TW': '少飯', en: 'Less rice' },
                        includeInName: true,
                        effect: { nutritionMultiplier: 0.9 }
                    },
                    {
                        id: 'regular',
                        label: { 'zh-TW': '標準', en: 'Regular' },
                        default: true,
                        effect: { nutritionMultiplier: 1 }
                    },
                    {
                        id: 'extra-rice',
                        label: { 'zh-TW': '加飯', en: 'Extra rice' },
                        includeInName: true,
                        effect: { nutritionMultiplier: 1.18 }
                    }
                ]
            },
            {
                id: 'addons',
                selectionType: 'multi',
                label: { 'zh-TW': '加配料', en: 'Add-ons' },
                options: [
                    {
                        id: 'fried-egg',
                        label: { 'zh-TW': '煎蛋', en: 'Fried egg' },
                        effect: {
                            nutritionDelta: {
                                calories: 90,
                                protein: 6,
                                fat: 7,
                                carbohydrate: 1,
                                sugar: 0,
                                sodium: 70,
                                saturatedFat: 2,
                                transFat: 0,
                                fiber: 0
                            },
                            item: { name: { 'zh-TW': '煎蛋', en: 'Fried egg' }, weight: '1 pc' }
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'hk-milk-tea',
        region: 'hong-kong',
        suggestedMealType: 'snack',
        name: {
            'zh-TW': '港式奶茶',
            en: 'Hong Kong Milk Tea'
        },
        nutrition: {
            calories: 210,
            protein: 3,
            fat: 5,
            carbohydrate: 38,
            sugar: 28,
            sodium: 65,
            saturatedFat: 3,
            transFat: 0,
            fiber: 0
        },
        items: [
            { name: { 'zh-TW': '奶茶', en: 'Milk tea' }, weight: '350 ml' }
        ],
        modifierGroups: [
            {
                id: 'size',
                selectionType: 'single',
                label: { 'zh-TW': '杯量', en: 'Drink size' },
                options: [
                    {
                        id: 'hot',
                        label: { 'zh-TW': '熱飲', en: 'Hot' },
                        default: true,
                        effect: { nutritionMultiplier: 1 }
                    },
                    {
                        id: 'cold-large',
                        label: { 'zh-TW': '凍大杯', en: 'Iced large' },
                        includeInName: true,
                        effect: { nutritionMultiplier: 1.25 }
                    }
                ]
            },
            {
                id: 'sweetness',
                selectionType: 'single',
                label: { 'zh-TW': '甜度', en: 'Sweetness' },
                options: [
                    {
                        id: 'less-sugar',
                        label: { 'zh-TW': '少甜', en: 'Less sugar' },
                        includeInName: true,
                        effect: {
                            nutritionDelta: {
                                calories: -35,
                                protein: 0,
                                fat: 0,
                                carbohydrate: -9,
                                sugar: -10,
                                sodium: 0,
                                saturatedFat: 0,
                                transFat: 0,
                                fiber: 0
                            }
                        }
                    },
                    {
                        id: 'regular',
                        label: { 'zh-TW': '正常甜', en: 'Regular' },
                        default: true,
                        effect: { nutritionDelta: {} }
                    }
                ]
            }
        ]
    },
    {
        id: 'sg-hainanese-chicken-rice',
        region: 'singapore',
        suggestedMealType: 'lunch',
        name: {
            'zh-TW': '海南雞飯',
            en: 'Hainanese Chicken Rice'
        },
        nutrition: {
            calories: 590,
            protein: 31,
            fat: 16,
            carbohydrate: 75,
            sugar: 3,
            sodium: 1020,
            saturatedFat: 4,
            transFat: 0,
            fiber: 2
        },
        items: [
            { name: { 'zh-TW': '雞肉', en: 'Chicken' }, weight: '130 g' },
            { name: { 'zh-TW': '油飯', en: 'Chicken rice' }, weight: '200 g' }
        ],
        modifierGroups: [
            {
                id: 'portion',
                selectionType: 'single',
                label: { 'zh-TW': '份量', en: 'Portion' },
                options: [
                    {
                        id: 'light',
                        label: { 'zh-TW': '少飯', en: 'Less rice' },
                        includeInName: true,
                        effect: { nutritionMultiplier: 0.88 }
                    },
                    {
                        id: 'regular',
                        label: { 'zh-TW': '標準', en: 'Regular' },
                        default: true,
                        effect: { nutritionMultiplier: 1 }
                    },
                    {
                        id: 'double-rice',
                        label: { 'zh-TW': '加飯', en: 'Extra rice' },
                        includeInName: true,
                        effect: { nutritionMultiplier: 1.2 }
                    }
                ]
            },
            {
                id: 'addons',
                selectionType: 'multi',
                label: { 'zh-TW': '加點', en: 'Add-ons' },
                options: [
                    {
                        id: 'braised-egg',
                        label: { 'zh-TW': '滷蛋', en: 'Braised egg' },
                        effect: {
                            nutritionDelta: {
                                calories: 78,
                                protein: 6,
                                fat: 5,
                                carbohydrate: 1,
                                sugar: 0,
                                sodium: 85,
                                saturatedFat: 1.6,
                                transFat: 0,
                                fiber: 0
                            },
                            item: { name: { 'zh-TW': '滷蛋', en: 'Braised egg' }, weight: '1 pc' }
                        }
                    },
                    {
                        id: 'extra-chicken',
                        label: { 'zh-TW': '加雞肉', en: 'Extra chicken' },
                        effect: {
                            nutritionDelta: {
                                calories: 95,
                                protein: 14,
                                fat: 4,
                                carbohydrate: 0,
                                sugar: 0,
                                sodium: 120,
                                saturatedFat: 1.1,
                                transFat: 0,
                                fiber: 0
                            },
                            item: { name: { 'zh-TW': '加雞肉', en: 'Extra chicken' }, weight: '60 g' }
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'sg-kopi-c',
        region: 'singapore',
        suggestedMealType: 'snack',
        name: {
            'zh-TW': 'Kopi C',
            en: 'Kopi C'
        },
        nutrition: {
            calories: 140,
            protein: 2,
            fat: 2,
            carbohydrate: 27,
            sugar: 22,
            sodium: 35,
            saturatedFat: 1,
            transFat: 0,
            fiber: 0
        },
        items: [
            { name: { 'zh-TW': '咖啡', en: 'Coffee' }, weight: '300 ml' }
        ],
        modifierGroups: [
            {
                id: 'size',
                selectionType: 'single',
                label: { 'zh-TW': '杯量', en: 'Drink size' },
                options: [
                    {
                        id: 'siew-dai',
                        label: { 'zh-TW': '小杯', en: 'Small' },
                        includeInName: true,
                        effect: { nutritionMultiplier: 0.8 }
                    },
                    {
                        id: 'regular',
                        label: { 'zh-TW': '標準', en: 'Regular' },
                        default: true,
                        effect: { nutritionMultiplier: 1 }
                    },
                    {
                        id: 'peng',
                        label: { 'zh-TW': '冰大杯', en: 'Iced large' },
                        includeInName: true,
                        effect: { nutritionMultiplier: 1.2 }
                    }
                ]
            },
            {
                id: 'sweetness',
                selectionType: 'single',
                label: { 'zh-TW': '甜度', en: 'Sweetness' },
                options: [
                    {
                        id: 'kosong',
                        label: { 'zh-TW': 'Kosong 無糖', en: 'Kosong (no sugar)' },
                        includeInName: true,
                        effect: {
                            nutritionDelta: {
                                calories: -80,
                                protein: 0,
                                fat: 0,
                                carbohydrate: -20,
                                sugar: -22,
                                sodium: 0,
                                saturatedFat: 0,
                                transFat: 0,
                                fiber: 0
                            }
                        }
                    },
                    {
                        id: 'regular',
                        label: { 'zh-TW': '正常甜', en: 'Regular' },
                        default: true,
                        effect: { nutritionDelta: {} }
                    }
                ]
            }
        ]
    }
]);
