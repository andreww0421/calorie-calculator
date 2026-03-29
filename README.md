# Woof Cal

Woof Cal is a browser-first diet tracking app focused on reducing meal logging friction. It combines AI-assisted food analysis, manual nutrition logging, daily summaries, weight tracking, multi-language UI, and goal-based calorie planning in a single static web app backed by a small Cloudflare Worker.

## Live Links

- Web App: [https://andreww0421.github.io/calorie-calculator/](https://andreww0421.github.io/calorie-calculator/)

## What the App Does

The app is built around one practical workflow:

1. Record food quickly, either with AI or manual entry.
2. Group records by meal and date.
3. Turn raw entries into calorie, macro, and coaching feedback.
4. Keep the experience lightweight enough to run from static hosting.

The current product supports three nutrition goals:

- Weight loss
- Weight maintenance
- Muscle gain

Those goals influence calorie targets, macro targets, and the coaching guidance shown in the daily experience.

## Main Features

- AI food analysis from image or text input
- Manual food entry with calories, macros, and key nutrients
- Daily meal logging by breakfast, lunch, dinner, and snacks
- Favorite foods for repeated use
- Weight logging and trend charts
- Goal-aware calorie and macro planning
- Daily summary card and coach suggestions
- Multi-language support
- Local export and import for backups
- Cloudflare Worker proxy with Turnstile validation for AI requests

## High-Level Architecture

The app now follows a state-driven structure instead of letting controllers and UI modules read and write local storage and DOM state directly.

- `controllers` coordinate user flows
- `state` owns runtime state and action updates
- `selectors` convert state into UI-facing view models
- `domain` holds calculation and normalization rules
- `repositories` isolate persistence and history reads
- `ui` renders the visible experience from state and selectors
- `worker` protects the AI integration behind a controlled backend edge layer

## Module Overview

### App Shell

Files:
- `index.html`
- `style.css`
- static assets such as icons, SVGs, and animations

Purpose:
- Defines the page structure, screen containers, modals, and stable DOM anchors for rendering.

Contribution:
- Provides the fixed UI surface that the state-driven rendering layer updates.

### App Entry

Files:
- `js/app.js`

Purpose:
- Boots the application once the DOM is ready.
- Registers shared UI callbacks and analysis security hooks.

Contribution:
- Serves as the front-end entry point and hands control to the bootstrap flow.

### Bootstrap and Flow Controllers

Files:
- `js/controllers/bootstrap-controller.js`
- `js/controllers/bootstrap-events.js`
- `js/controllers/bootstrap-runtime.js`
- `js/controllers/analysis-controller.js`
- `js/controllers/profile-controller.js`
- `js/controllers/record-controller.js`
- `js/controllers/controller-shared.js`

Purpose:
- Coordinate startup, event binding, AI analysis requests, profile updates, meal logging, date changes, and import/export flows.

Contribution:
- Keep interaction flow management out of the rendering layer and route events into actions, repositories, and domain rules.

### Runtime State and Actions

Files:
- `js/state/app-state.js`
- `js/state/app-actions.js`

Purpose:
- Maintain the runtime application snapshot.
- Apply state changes through named actions instead of ad hoc DOM mutation.

Contribution:
- Provide the single runtime source of truth for language, theme, selected date, records, favorites, AI draft result, analysis status, and profile state.

### Selectors

Files:
- `js/state/app-selectors.js`

Purpose:
- Assemble UI-specific view models from runtime state and repository history.

Contribution:
- Keep dashboards, summaries, and pet coaching logic out of low-level UI render functions.

### Domain Logic

Files:
- `js/domain/nutrition-domain.js`
- `js/domain/profile-domain.js`
- `js/domain/ai-analysis-domain.js`

Purpose:
- Hold the calculation-heavy and normalization-heavy rules:
  - calorie targets
  - macro targets
  - goal logic
  - coaching summaries
  - AI result validation and cleanup

Contribution:
- Makes business rules easier to test and reuse independently from DOM rendering.

### UI Modules

Files:
- `js/ui/app-state-ui.js`
- `js/ui/charts-ui.js`
- `js/ui/dashboard-charts-ui.js`
- `js/ui/daily-summary-ui.js`
- `js/ui/pet-ui.js`
- `js/ui/analysis-ui.js`
- `js/ui/settings-ui.js`
- `js/ui/favorites-ui.js`
- `js/ui/detail-ui.js`
- `js/ui/profile-ui.js`
- `js/ui/shared-ui.js`
- `js/ui/dom-ui.js`
- `js/ui/locale-ui.js`

Purpose:
- Render visible state into the page.
- Update charts, meal lists, modals, settings panels, locale-driven labels, coach content, and pet feedback.

Contribution:
- Translate state and selector output into the actual user experience.

### Locale and Copy

Files:
- `js/locales/catalog.js`
- `js/locales/catalog/*`
- `js/locales/base-translations.js`
- `js/locales/ui-copy.js`
- `js/locales/index.js`
- `js/config.js` as a backward-compatible export surface

Purpose:
- Resolve locale catalogs and fallbacks.
- Centralize app copy and language-specific labels.

Contribution:
- Gives the app a single translation source instead of spreading static text across multiple feature modules.

### Repositories and Persistence

Files:
- `js/repositories/food-log-repository.js`
- `js/repositories/weight-repository.js`
- `js/repositories/profile-repository.js`
- `js/repositories/favorites-repository.js`
- `js/repositories/settings-repository.js`
- `js/repositories/backup-repository.js`
- `js/repositories/usage-repository.js`
- `js/storage.js`

Purpose:
- Read and write local data without forcing controllers and UI modules to know local-storage details.
- Expose specialized entry points for logs, weights, profile, settings, favorites, usage, and backups.

Contribution:
- Creates a cleaner boundary for future migration to IndexedDB, SQLite, or cloud sync.

### Platform and Utilities

Files:
- `js/platform.js`
- `js/diagnostics.js`
- `js/env.js`
- `js/utils.js`
- `js/api.js`

Purpose:
- Handle browser integration concerns such as file input, image preview, service worker registration, environment settings, diagnostics, and the client side of AI requests.

Contribution:
- Isolates platform-specific logic and transport logic from product rules and view rendering.

### Worker Backend

Files:
- `worker/index.js`

Purpose:
- Gate AI requests behind a Cloudflare Worker.
- Verify origin and Turnstile state.
- Apply request cooldown behavior and forward requests to the model provider.

Contribution:
- Keeps model access out of the client and adds a minimal abuse-control layer.

### Tests and Smoke Checks

Files:
- `tests/*.test.mjs`
- `scripts/browser-smoke.mjs`

Purpose:
- Validate domain rules, storage migration, state actions, selectors, locale helpers, and browser-level flows.

Contribution:
- Provides a regression net for refactors and user-facing flow changes.

## Current Architectural Direction

The project is in the middle of a deliberate shift:

- from DOM-driven UI updates
- to state-driven rendering
- from direct storage calls
- to repository-based access
- from scattered view calculations
- to selectors and domain rules

This makes the codebase easier to evolve toward a mobile-app-grade architecture without forcing a framework rewrite first.

## Related Docs

- `docs/data-model.md`
- `docs/module-flows.md`
- `worker/README.md`
