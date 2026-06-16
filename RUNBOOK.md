# RUNBOOK: Operating Kumachi Prints

> **Written for Ernest.** If you are not Ernest, read AGENTS.md first.

## Core Operational Rules

These 5 rules keep the store running. Do not skip them.

1. **Never deploy to production without verifying on an Oxygen preview URL first**
2. **Never commit `.env`** — all secrets stay out of the repository
3. **Sanity Studio must be redeployed after every schema change:** `cd studio && npx sanity deploy`
4. **After any Printful product change (new file, new size), verify the Shopify sync completed before announcing publicly**
5. **Check Umami weekly** — a traffic spike usually means something landed on social

---

## Daily Development Workflow

```bash
# Step 1: Get latest code
git pull origin main

# Step 2: Start the dev server
cd apps/hydrogen
npm run dev
# Opens at http://localhost:3000

# Step 3: Make your changes
# Edit files in apps/hydrogen/app/ or root studio/

# Step 4: Check for errors
npm run typecheck
npm run build

# Step 5: Commit and push
git add .
git commit -m "Description of what you changed"
git push origin main
# GitHub Actions auto-deploys to Oxygen

# Step 6: Verify on the live site
# Visit https://prints.kumachigallery.com (or your domain)
```

---

## Adding a New Print Product (10 Steps)

1. **Check the art file** — Must be at least 150 DPI at the largest print size (e.g. 50×70cm = 2953×4134px minimum)

2. **Upload to Printful** → Products → Create product → Upload file → Configure sizes and frame options → Set base prices → Sync to Shopify

3. **Set retail prices in Shopify** → Products → find the new product → Variants → set price (≈ Printful base cost × 2.5–4×)

4. **Add to collections** → Products → [product] → Collections → tick All Prints, New Arrivals, plus style/artist/series collections

5. **Create product supplement in Sanity Studio** → productSupplement → New → set `shopifyHandle` to match the Shopify handle exactly → fill in story, technique, inspiration → add artist and series references → Publish

6. **Verify the product page** at `localhost:3000/products/[handle]` — images load, variants work, editorial content shows up

7. **Test add-to-cart** on the PDP

8. **Test checkout** — add to cart, go to checkout, verify it reaches the Shopify hosted checkout

9. **Verify on Oxygen preview** — push to a branch, check the preview URL

10. **Announce** — Share the product page URL on social

---

## Populating Selected Shopify Draft Products From The Woo Mirror

Use this when launch products already exist in the local Woo simulator and need to become real Shopify draft products for Hydrogen to read.

From `C:\wamp64\www\prints-local\art-business`:

```powershell
python .\scripts\artbiz.py catalog validate
python .\scripts\artbiz.py drops create --ids 15,22 --slug opening-drop --title "Opening Drop" --mode curated_open
python .\scripts\artbiz.py shopify launch-list --drop opening-drop
```

From `C:\Users\sirer\Documents\GitHub\prints-shop\apps\hydrogen`:

```powershell
node scripts\populate-products.mjs --input C:\wamp64\www\prints-local\art-business\artifacts\exports\shopify-launch-products.json --dry-run
node scripts\populate-products.mjs --input C:\wamp64\www\prints-local\art-business\artifacts\exports\shopify-launch-products.json --live
```

Only run `--live` after the dry-run output is reviewed. The script creates or updates Shopify products as drafts, uploads local images through Shopify staged uploads, and preserves Shopify as commerce truth.

---

## Launch Opening Drop Today

Use this as the first-sale checklist:

1. Pick 5-10 products for `Opening Drop`.
2. Create the drop manifest in `art-business`.
3. Generate `shopify-launch-products.json`.
4. Dry-run `populate-products.mjs`.
5. Run `populate-products.mjs --live` for approved products.
6. In Shopify, create collection `opening-drop` and add the selected draft products.
7. Set prices, verify images/variants, and publish products only when checkout is ready.
8. In Sanity, create `series` document `opening-drop` with `shopifyCollectionHandle=opening-drop`.
9. Create/review product supplements for every selected product handle.
10. Verify `/drops/opening-drop`, product pages, cart add, and checkout redirect.
11. Place one real test order before announcing.

---

## Publishing a New Drop (8 Steps)

1. **Upload all products** — follow the 10-step "Adding a New Print Product" procedure for every print in the drop
2. **Create Shopify collection** → Collections → Create → handle: `drop-[series-slug]` → Add all drop products
3. **Create series in Sanity** → series → New → fill title, slug, heroImage, description, shopifyCollectionHandle → set `status: "draft"` → Save
4. **Preview the drop page** at `localhost:3000/drops/[slug]?sanity-preview=true&sanity-preview-secret=[SECRET]`
5. **Publish the series** — change `status` to `"live"` in Sanity and publish
6. **Verify the drops listing** — `/drops` shows the new drop
7. **Share the drop URL** on social channels
8. **Monitor Umami** — check for traffic spike from the announcement

---

## Deploying to Production

Before deploying, fill local and Oxygen environment variables. Never commit `.env`.

Local Hydrogen env:

```bash
cd apps/hydrogen
cp .env.example .env
# Fill PUBLIC_STORE_DOMAIN, PUBLIC_STOREFRONT_API_TOKEN, SESSION_SECRET,
# SANITY_API_READ_TOKEN, and SANITY_PREVIEW_SECRET with real values.
```

Root Sanity Studio:

```bash
cd studio
npm install
npm run build
npm run deploy
```

```bash
# Step 1: Push your feature branch and open a PR on GitHub
# Step 2: Wait for the Oxygen preview deployment (~3 minutes)
# Step 3: Open the preview URL and verify everything works
# Step 4: Merge the PR to main
# Step 5: GitHub Actions auto-deploys to production (~3 minutes)
# Step 6: Visit the live URL and verify
```

---

## Updating Announcement Bar / Site Settings

No code changes needed:

1. Go to Sanity Studio → Documents → Settings (singleton)
2. Edit the announcement bar: toggle `enabled`, update text, set link
3. Or update footer navigation, social links, etc.
4. Click Publish
5. Changes appear on the live site immediately

---

## Launch Account Setup Checklist

These tasks require Ernest's private account access and cannot be completed by an agent without credentials:

- Shopify: plan that supports Oxygen, Hydrogen sales channel, Storefront API token, payments, taxes, shipping, products, collections, and storefront password settings.
- Printful: Shopify connection, launch print files, DPI review, product/variant setup, retail pricing, SKU mapping, return address, and fulfillment settings.
- Sanity: read-only Hydrogen token, private `art-business` write/admin token, deployed root Studio, settings/navigation/homepage/product supplements, artist docs, and series docs.
- Oxygen/GitHub: `OXYGEN_DEPLOYMENT_TOKEN`, preview/production env vars, preview deploy, `prints.kumachigallery.com`, and SSL.
- QA: desktop/mobile smoke test, variant selection, cart update/remove, checkout redirect, real test order, Printful receipt, tracking sync, and customer emails.

---

## Weekly Operational Checks

- [ ] Review Umami dashboard for the past week: sessions, top pages, referral sources
- [ ] Check Google Search Console for indexing errors or manual actions
- [ ] Check Printful dashboard → Orders → filter by status → verify no orders are stuck
- [ ] Check for Shopify app update notifications (especially Printful)
- [ ] Review GitHub issues and PRs

---

## Rotating API Tokens

When you need to rotate a Shopify or Sanity token:

1. **Generate new token** — Shopify: Apps → Develop apps → Kumachi Prints Storefront → regenerate; Sanity: manage.sanity.io → API → Tokens → add
2. **Update in Oxygen** — Shopify admin → Hydrogen → prints-shop → Production → Environment Variables → edit the variable → Save
3. **Confirm redeployment** when prompted
4. **Verify the site works** at the production URL
5. **Revoke the old token** in Shopify/Sanity admin

---

## Domain Migration Procedure

### Phase 1: Prints subdomain on kumachigallery.com

```bash
# Registrar DNS settings:
# Type: CNAME
# Name: prints
# Value: shops.myshopify.com
# TTL: 3600

# Shopify admin:
# Settings → Domains → Add existing domain → prints.kumachigallery.com
```

### Phase 4: kumachiprints.com (when domain renews)

```bash
# Step 1: Add domain to Shopify
# Settings → Domains → Add existing domain → kumachiprints.com

# Step 2: Registrar DNS:
# A record: @ → 23.227.38.65
# CNAME: www → shops.myshopify.com

# Step 3: Wait 15min–24hr for DNS to propagate

# Step 4: Set as primary in Oxygen
# Hydrogen → prints-shop → Production → Domains → set kumachiprints.com as primary

# Step 5: Set 301 redirect from old subdomain
# Settings → Domains → prints.kumachigallery.com → redirect to kumachiprints.com
```

---

## Common Issues and Fixes

| Problem | Likely Cause | Fix It |
|---------|-------------|--------|
| Products not showing on the site | Product is not published to the Online Store channel | Shopify → Products → check "Active" and "Online Store" are both on |
| Products missing after Printful sync | Sync is in progress or failed | Printful → Stores → sync status → Retry sync |
| Sanity content not updating on live site | Oxygen cache is stale | Shopify → Hydrogen → prints-shop → ... → Redeploy |
| Sanity Studio can't load | Sanity read token is invalid | Check SANITY_API_READ_TOKEN in Oxygen env → update → redeploy |
| Cart empties when you refresh the page | Session secret was changed | SESSION_SECRET rotation invalidates sessions — only rotate this on purpose |
| Checkout doesn't work | Payment gateway not set up | Shopify → Settings → Payments → set up Shopify Payments or Stripe |
| The store shows a password page | Store is in password protection mode | Shopify → Settings → Online Store → uncheck "Password protect" |
| A Printful order is on hold | The art file may be below minimum quality | Printful → Orders → check for quality warnings |
| `npm run dev` fails on startup | Missing environment variables | Check `.env` has all the required keys filled in |
| Build fails with TypeScript errors | Code has type issues | Run `npm run typecheck` and fix the errors one by one |

---

## Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `cd apps/hydrogen && npm run dev` |
| Build for production | `cd apps/hydrogen && npm run build` |
| Preview production build locally | `cd apps/hydrogen && npm run preview` |
| TypeScript type check | `cd apps/hydrogen && npm run typecheck` |
| Populate selected Shopify drafts | `cd apps/hydrogen && node scripts\populate-products.mjs --input C:\wamp64\www\prints-local\art-business\artifacts\exports\shopify-launch-products.json --dry-run` |
| Deploy Sanity Studio | `cd studio && npx sanity deploy` |
| Build Sanity Studio | `cd studio && npm run build` |
| Deploy canonical Studio | `cd studio && npm run deploy` |
| Link Shopify store (first time) | `npx shopify hydrogen link` |
| Roll back Oxygen deployment | Shopify admin → Hydrogen → prints-shop → Production → View deployments → Make last good deployment current |

*Last updated: 2026-06*
