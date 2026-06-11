# Deployment, CI/CD & Oxygen Hosting

Status: Current

## Hosting Platform: Shopify Oxygen

Oxygen is Shopify's global deployment platform for Hydrogen storefronts.

- Edge-deployed: runs on Shopify's CDN network (Cloudflare workerd runtime)
- Free with all paid Shopify plans (Basic and above)
- Not available on: Starter plans, Development stores
- GitHub Actions integration: push to main branch = auto-deploy to production
- Preview deployments: any push to a non-main branch = preview URL

## Initial Setup

### 1. Install Hydrogen sales channel

Shopify admin → Settings → Apps and sales channels → All recommended sales channels → Hydrogen → Install

This creates the Oxygen hosting infrastructure for this store.

### 2. Create a storefront in Hydrogen admin

Shopify admin → Hydrogen → Create storefront → Connect existing repository → select `serunkuma/prints-shop`

Map branches:
- `main` branch → Production environment
- All other branches → Preview environment (auto)

### 3. Set environment variables in Oxygen

Shopify admin → Hydrogen → prints-shop → Environments → Production → Environment Variables

Add all variables from `sources/03_shopify_configuration.md` (the Environment Variables section).

Repeat for the Preview environment (can use a different Sanity dataset e.g. `staging` if desired).

### 4. Connect custom domain

Shopify admin → Hydrogen → prints-shop → Production → Domains → Add domain → `prints.kumachigallery.com`

After DNS propagates, SSL is provisioned automatically.

## GitHub Actions Workflow

The Fluid starter includes `.github/workflows/oxygen.yml`. Key configuration:

```yaml
on:
  push:
    branches:
      - main          # triggers production deploy
  pull_request:       # triggers preview deploy

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
- `SHOPIFY_CLI_PARTNERS_TOKEN` — Shopify Partners token for CLI auth

## Local Development

```bash
# Prerequisites
node >= 20
npm >= 10

# Clone
git clone https://github.com/serunkuma/prints-shop
cd prints-shop

# Install
npm install

# Link to Shopify store (first time only)
npx shopify hydrogen link
# Follow CLI prompts — creates .env with Shopify env vars

# Add Sanity vars to .env manually (not set by CLI)
# See sources/03_shopify_configuration.md for full .env list

# Start dev server
npm run dev
# Opens at http://localhost:3000
# Sanity Studio at http://localhost:3000/studio
```

## Build & Preview

```bash
# Build for production
npm run build

# Preview production build locally (uses Oxygen worker runtime)
npm run preview
```

## Deployment Environments

| Environment | Branch | URL | Purpose |
|---|---|---|---|
| Production | `main` | `prints.kumachigallery.com` | Live store |
| Preview | any PR branch | auto-generated `.oxygen.myshopify.com` URL | QA before merge |
| Local dev | n/a | `http://localhost:3000` | Active development |

## Rollback

If a production deploy breaks the store:

Shopify admin → Hydrogen → prints-shop → Production → View deployments → find last good deployment → `...` menu → Make this the current deployment

Rollback takes ~30 seconds. No code changes required.

## Redeployment

If environment variables are updated in Oxygen (e.g. rotating a Sanity token):

Shopify admin → Hydrogen → prints-shop → Production → Environment Variables → edit variable → Save → system prompts to redeploy → confirm

A redeployment re-uses the existing compiled code with the new variables injected. Faster than a full deploy.

## Domain Migration Procedure (Phase 2)

When `kumachiprints.com` is renewed:

```bash
# Step 1: Add to Shopify domains
# Shopify admin → Settings → Domains → Add existing domain → kumachiprints.com

# Step 2: Update DNS at registrar
# A record: @ → 23.227.38.65
# CNAME: www → shops.myshopify.com

# Step 3: Wait for DNS propagation (15min–24hr)

# Step 4: Set as primary in Oxygen
# Shopify admin → Hydrogen → prints-shop → Production → Domains → set kumachiprints.com as primary

# Step 5: Set prints.kumachigallery.com to 301 redirect
# Shopify admin → Settings → Domains → prints.kumachigallery.com → redirect to kumachiprints.com
```

Zero downtime. The store remains live throughout.

## Sanity Studio Deployment

The Sanity Studio embedded in the Hydrogen app runs at `/studio` in development. For production access by Ernest (to update content without running local dev), deploy the studio:

```bash
cd studio
npx sanity deploy
# Follow prompts — deploys to your-project-name.sanity.studio
```

This is a separate deployment from Oxygen. Update whenever schema changes are made.

*Last updated: 2026-06-10*
