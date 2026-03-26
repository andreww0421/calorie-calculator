# Data Model

## Record Entry

Stored in:

- `record_<YYYY-MM-DD>`

Shape:

```json
{
  "type": "breakfast",
  "name": "Chicken Salad",
  "nutri": {
    "calories": 320,
    "protein": 28,
    "fat": 12,
    "carbohydrate": 18,
    "sugar": 5,
    "sodium": 410,
    "saturatedFat": 2.5,
    "transFat": 0,
    "fiber": 6
  },
  "items": [
    { "name": "Chicken Breast", "weight": "120" },
    { "name": "Lettuce", "weight": "80" }
  ],
  "healthScore": 8.4
}
```

Notes:

- `type` is one of `breakfast`, `lunch`, `dinner`, `snack`
- all nutrition fields are normalized to numbers
- `items` is optional but normalized to a clean array

## Favorite Entry

Stored in:

- `myFavorites`

Shape:

```json
{
  "name": "Chicken Salad",
  "nutri": {
    "calories": 320,
    "protein": 28,
    "fat": 12,
    "carbohydrate": 18,
    "sugar": 5,
    "sodium": 410,
    "saturatedFat": 2.5,
    "transFat": 0,
    "fiber": 6
  },
  "items": [
    { "name": "Chicken Breast", "weight": "120" }
  ],
  "healthScore": 8.4
}
```

## Profile

Stored in:

- `myProfile_v5`

Shape:

```json
{
  "gender": "female",
  "age": "31",
  "height": "165",
  "weight": "54",
  "activity": "1.375",
  "mealMode": "3"
}
```

Notes:

- profile values are stored as strings for form compatibility
- `mealMode` is one of `1`, `2`, `3`, `4`

## Daily Weight

Stored in:

- `weight_<YYYY-MM-DD>`

Value:

```json
"61.2"
```

## App Settings

Stored in:

- `appLang`
- `appTheme`

Examples:

```json
"en"
"dark"
```

## Usage State

Stored in:

- key defined by `USAGE_KEY`

Shape:

```json
{
  "date": "2026-03-26",
  "count": 2
}
```

## Domain Rules

The business rules that should stay outside UI rendering now include:

- meal plan ratios by `mealMode`
- macro goal calculation from target calories
- daily coaching signal generation
- weekly summary generation
- AI payload normalization and validation

Primary source files:

- [js/domain/nutrition-domain.js](../js/domain/nutrition-domain.js)
- [js/domain/ai-analysis-domain.js](../js/domain/ai-analysis-domain.js)
- [js/storage.js](../js/storage.js)
