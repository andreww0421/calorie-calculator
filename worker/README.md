# Worker

Cloudflare Worker source for the AI nutrition proxy lives here.

## Files

- `index.js`: Worker entrypoint
- `wrangler.toml.example`: sample Wrangler config

## Required secrets

- `GEMINI_API_KEY`
- `TURNSTILE_SECRET_KEY`

## Optional vars

- `ALLOWED_ORIGIN`

## Current behavior

- verifies Turnstile before forwarding AI requests
- validates request size and request schema before calling the model
- applies a short IP cooldown
- maps common Gemini quota / access / payload errors into stable app-facing error codes
- normalizes Gemini output into a fixed `result` payload before returning it to the app
- rejects successful upstream responses that do not normalize into a valid nutrition result
