# Woof Cal

AI-assisted diet logging app with daily meal records, nutrition summaries, weight tracking, favorites, and a lightweight coaching layer.

Live site:
[https://andreww0421.github.io/calorie-calculator/index.html](https://andreww0421.github.io/calorie-calculator/index.html)

## What It Does

- Log meals with AI photo analysis or text-only analysis
- Add manual food entries with nutrition details
- Track daily calories, macros, fiber, sodium, and water target
- Save favorite foods and quick-add them into meals
- Review daily and weekly trends with charts
- Switch between Traditional Chinese, Simplified Chinese, English, Japanese, Korean, and Arabic
- Get lightweight coaching insights based on current intake

## Architecture

- `index.html` / `style.css`
  Main UI shell and visual layout.
- `js/controllers`
  User-flow orchestration for bootstrap, profile, record, and analysis actions.
- `js/ui`
  Rendering and interaction logic for charts, modals, settings, favorites, and localization helpers.
- `js/domain`
  Business rules and validation logic.
  This now includes meal planning ratios, macro goal calculation, coaching insights, and AI result normalization.
- `js/storage.js`
  Local persistence, schema migration, import/export, and historical summaries.
- `worker/index.js`
  Cloudflare Worker proxy for Gemini + Turnstile validation and upstream error mapping.

## Data Model

See [docs/data-model.md](docs/data-model.md).

Main persisted keys:

- `record_<YYYY-MM-DD>`
- `weight_<YYYY-MM-DD>`
- `myProfile_v5`
- `myFavorites`
- `appLang`
- `appTheme`

## Development

This project is a static frontend app with an optional Cloudflare Worker backend for AI requests.

### Local frontend

Open `index.html` with a static server.

### Worker

See [worker/README.md](worker/README.md) and `worker/wrangler.toml.example`.

Required secrets:

- `GEMINI_API_KEY`
- `TURNSTILE_SECRET_KEY`

## Testing

Unit tests:

```bash
node --test tests\*.test.mjs
```

Browser smoke:

```bash
node scripts\browser-smoke.mjs
```

The smoke script covers:

- storage migration
- manual add
- favorite flows
- detail modal rendering
- weight save
- date switching
- theme switching
- language switching
- AI validation UI
- AI recalculation flow

## Current Priorities

- keep localization consistent across static and dynamic UI
- keep AI responses validated before they touch rendering
- continue moving business rules from UI files into `js/domain`
- expand coaching and long-term insights without bloating the base app
