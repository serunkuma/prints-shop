# Production Build Handoff

Status: Current

This handoff prepares the next session to build the production Kumachi Prints storefront. It supersedes older bridge-store-first planning. The Vite prototype remains valuable, but it is not the production launch path.

## Current System

The local simulator lives at:

```text
C:\wamp64\www\prints-local
http://localhost/prints-local/
```

The `art-business` command center lives inside that simulator:

```text
C:\wamp64\www\prints-local\art-business
```

It owns catalog validation, Woo mirror sync, WordPress job dispatch, storefront export, Shopify/Printful planning tools, Sanity sync tools, Google Drive asset references, and local WordPress helper-code tracking.

The Vite prototype lives at:

```text
sources\protoype
```

Keep it working. Use it as a local design/content preview and reference implementation, not as the production store.

## Verified Upstream State

The local Woo mirror is populated and healthy:

| Check | Result |
|---|---:|
| Catalog products | 155 |
| Woo products | 155 |
| Expected variations | 837 |
| Woo variations | 837 |
| Missing products | 0 |
| Missing categories | 0 |
| Missing tags | 0 |

The safe storefront export is available at:

```text
http://localhost/prints-local/art-business/artifacts/exports/storefront-products.json
```

Use this export and the Woo Store API only for local preview/bridge work. Production Hydrogen must read commerce from Shopify and editorial content from Sanity.

## Production Build Target

Create the production Hydrogen app separately from the Vite prototype:

```text
apps/hydrogen
```

Sanity project identifiers:

```text
Project ID: 2wo9hx90
Organization ID: o9GdYjNoE
Dataset: production
API version: 2026-06-01
```

Tokens stay in `.env` files or deployment secrets only.

## Data Rules

- Shopify owns production products, variants, prices, inventory, cart, checkout, orders, and fulfillment status.
- Sanity owns production editorial content: product supplements, artists, series, pages, settings, navigation, SEO overrides, and homepage sections.
- Product handle is the join key between Shopify, Sanity, Woo export, and Hydrogen routes.
- SKU remains the operational reconciliation key across Woo, Shopify, Printful, and `art-business`.
- Do not put Woo consumer keys or local WordPress APIs into production browser/runtime code.
- Do not store prices, variants, inventory, or checkout data in Sanity.

## Next Agent Prompt

```text
You are working in C:\Users\sirer\Documents\GitHub\prints-shop for Kumachi Prints.

Read first:
- AGENTS.md
- RUNBOOK.md
- docs/index.md
- docs/planning/07_production_build_handoff.md
- docs/planning/00_launch_from_local_wordpress_simulator.md
- docs/planning/02_hydrogen_sanity_production.md
- docs/data/01_product_model.md
- docs/data/02_sanity_schemas.md
- docs/data/05_woocommerce_mirror_bridge.md
- docs/system/01_architecture.md
- docs/system/03_routes_and_components.md

Important context:
- The local WordPress/Woo simulator is C:\wamp64\www\prints-local at http://localhost/prints-local/.
- The art-business command center is C:\wamp64\www\prints-local\art-business.
- The Woo mirror is healthy: 155 products, 837 variations, 0 missing categories, 0 missing tags.
- The Vite prototype is sources\protoype. Keep it working and use it as reference only.
- The production app should be created separately at apps/hydrogen.
- Sanity project: 2wo9hx90, organization o9GdYjNoE, dataset production.
- Never commit Woo, Shopify, Printful, or Sanity tokens.

Goal:
Build the production Hydrogen + Sanity foundation for Kumachi Prints using art-business and the local Woo simulator as upstream planning/data context.

Tasks:
1. Create apps/hydrogen without breaking sources/protoype.
2. Add safe environment placeholders for Shopify Storefront, Hydrogen session, Sanity project/dataset/api version/read token, and preview secret.
3. Implement Sanity schema skeletons for productSupplement, artist, series, page, settings, navigation, seoFields, imageWithAlt, and navItem.
4. Implement Hydrogen route skeletons for homepage, /products/:handle, /collections/:handle, cart, search, pages, sitemap, and robots.
5. On product routes, fetch Shopify product and Sanity productSupplement by the same handle with Promise.all.
6. Render products even if the Sanity supplement is missing.
7. Keep commerce data in Shopify and editorial data in Sanity.
8. Port design tokens and product-page UX from the Vite prototype/reference docs.
9. Run build/typecheck for apps/hydrogen and verify sources/protoype still builds.
```

## Closeout Commands For Next Session

From `C:\wamp64\www\prints-local\art-business`:

```powershell
python .\scripts\artbiz.py catalog validate
python .\scripts\artbiz.py woo population-status
python .\scripts\artbiz.py mirror export-storefront
```

From `C:\Users\sirer\Documents\GitHub\prints-shop\sources\protoype`:

```powershell
npm run build
```

Do not run live Shopify, Printful, or Sanity writes until dry-runs and content review are complete.

## Closeout Verification Results

Completed in this session:

| Check | Result |
|---|---|
| `powershell -ExecutionPolicy Bypass -File .\scripts\validate_scaffold.ps1` | Passed: 15 checks, 0 failures |
| `npm run build` in `sources\protoype` | Passed |
| No-secret scan over docs and agent pointer files | Passed: no matching token patterns found |

Note: `prints-shop` does not currently have a root `.env.example`; creating the production Hydrogen `.env.example` is part of the next `apps/hydrogen` implementation task.
