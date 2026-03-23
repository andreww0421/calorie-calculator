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
