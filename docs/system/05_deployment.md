# Deployment & CI/CD

Status: Current

## Local Development

```bash
# Prerequisites
node --version    # Must be ≥20
npm --version     # Must be ≥10

# Clone and install
git clone https://github.com/serunkuma/prints-shop
cd prints-shop
npm install

# Link to Shopify store (first time only)
npx shopify hydrogen link
# Follow CLI prompts — creates/updates .env with Shopify env vars
# Note: does not set Sanity vars — must be added manually

# Full .env file contents after setup:
# PUBLIC_STORE_DOMAIN=your-store.myshopify.com
# PUBLIC_STOREFRONT_API_TOKEN=your_public_storefront_api_token
# SESSION_SECRET=randomly_generated_string_32_chars_min
# SANITY_PROJECT_ID=your_sanity_project_id
# SANITY_DATASET=production
# SANITY_API_VERSION=2024-01-01
# SANITY_API_READ_TOKEN=your_sanity_read_token
# SANITY_PREVIEW_SECRET=your_preview_secret

# Initialize Sanity (inside studio/)
cd studio
npx sanity init
# Use existing project or create new: name "kumachi-prints", dataset "production"
cd ..

# Start dev server
npm run dev
# Opens at http://localhost:3000
# Sanity Studio at http://localhost:3000/studio
```

## Build & Preview

```bash
# Production build
npm run build
# Outputs Oxygen worker bundle

# Preview production build locally
npm run preview
# Uses Oxygen worker runtime simulation
# Tests that the build works before deploying
```

## CI/CD Pipeline (GitHub Actions)

The workflow file is `.github/workflows/oxygen.yml`:

```yaml
on:
  push:
    branches:
      - main          # Triggers production deploy
  pull_request:       # Triggers preview deploy (all PR branches)

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx shopify hydrogen deploy
        env:
          SHOPIFY_CLI_TTY: 0
```

Secrets required in GitHub repo settings:
- `SHOPIFY_CLI_PARTNERS_TOKEN` — Shopify Partners token for CLI authentication

## Oxygen Environment Variables

Set these in Shopify admin → Hydrogen → prints-shop → Environments → [Production/Preview]:

| Variable | Production | Preview | Notes |
|----------|-----------|---------|-------|
| `PUBLIC_STORE_DOMAIN` | ✅ | ✅ | Same value |
| `PUBLIC_STOREFRONT_API_TOKEN` | ✅ | ✅ | Same token |
| `SESSION_SECRET` | ✅ | ✅ | Can be different (preview isolation) |
| `SANITY_PROJECT_ID` | ✅ | ✅ | Same project |
| `SANITY_DATASET` | `production` | `staging` (optional) | Preview can use staging dataset |
| `SANITY_API_VERSION` | ✅ | ✅ | Same |
| `SANITY_API_READ_TOKEN` | ✅ | ✅ | Same token |
| `SANITY_PREVIEW_SECRET` | ✅ | ✅ | Same secret |

## Deployment Environments

| Environment | Branch | URL | Purpose |
|-------------|--------|-----|---------|
| Production | `main` | `prints.kumachigallery.com` | Live store |
| Preview | PR branches | auto-generated `*.oxygen.myshopify.com` | QA before merge |
| Local dev | any | `http://localhost:3000` | Active development |

## Sanity Studio Deployment

```bash
cd studio
npx sanity deploy
# Deploys to https://kumachi-prints.sanity.studio
# Must be re-run after every schema change
```

Schema changes are invisible to editors until the Studio is redeployed. This is a separate deployment from Oxygen.

## Rollback Procedure

If a production deploy breaks the store:

1. Shopify admin → Hydrogen → prints-shop → Production → View deployments
2. Find the last known-good deployment
3. Click `...` menu → Make this the current deployment
4. Wait ~30 seconds for rollback to complete
5. Verify the store works

No code changes required. No git revert needed. The previous compiled bundle is redeployed.

## Redeployment After Environment Variable Changes

1. Shopify admin → Hydrogen → prints-shop → Production → Environment Variables
2. Edit the variable
3. Click Save — system prompts to redeploy
4. Confirm redeployment
5. Wait ~30 seconds
6. Verify the change took effect

This re-deploys the existing compiled code with new environment variables. Faster than a full code deploy.

## Domain Migration Procedure

### Phase 1 → Phase 4 Migration

When `kumachiprints.com` is renewed:

```bash
# 1. Add domain to Shopify
# Shopify admin → Settings → Domains → Add existing domain → kumachiprints.com

# 2. Update DNS at registrar
# A record: @ → 23.227.38.65
# CNAME: www → shops.myshopify.com

# 3. Wait for DNS propagation (15min–24hr)
# Verify with: nslookup kumachiprints.com

# 4. Set as primary in Oxygen
# Shopify admin → Hydrogen → prints-shop → Production → Domains
# → Set kumachiprints.com as primary

# 5. Set 301 redirect
# Shopify admin → Settings → Domains → prints.kumachigallery.com
# → Redirect to kumachiprints.com
```

The store remains live throughout. Zero downtime.

## .env.example

Commit this file (no real values):

```
PUBLIC_STORE_DOMAIN=
PUBLIC_STOREFRONT_API_TOKEN=
SESSION_SECRET=

SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=
SANITY_PREVIEW_SECRET=
```

*Last updated: 2026-06*
