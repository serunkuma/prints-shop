# Launch From Local WordPress Simulator

Status: Current

Kumachi Prints launches from a local simulator into a production Shopify + Sanity storefront.

The local WordPress/WooCommerce install lives at:

```text
C:\wamp64\www\prints-local
http://localhost/prints-local/
```

Inside that install, `art-business` is the Python command center. It validates catalog data, syncs the Woo mirror, exports storefront JSON, prepares Shopify/Printful work, and now prepares Sanity product supplements.

The Vite bridge prototype lives at:

```text
prints-shop\sources\protoype
```

The final production storefront is still to be created separately as Hydrogen + Sanity.

## Architecture

| Layer | Owns |
|---|---|
| Local WordPress/Woo simulator | Product mirror, review UI, Store API preview, local content modeling |
| `art-business` command center | Catalog inputs, Woo sync, category/tag tools, storefront export, Shopify/Printful/Sanity API tooling |
| Vite prototype | Local storefront preview/reference using Woo Store API and exported overlay JSON |
| Shopify | Production commerce, checkout, orders, products, variants, pricing, inventory |
| Printful | Production fulfillment and print variant mapping |
| Sanity | Production editorial content, product supplements, artists, series, pages, settings, navigation |
| Hydrogen/Oxygen | Production storefront and deployment target |

## Launch Workflow

1. Validate the local catalog in `art-business`.
2. Sync products to the local Woo mirror.
3. Fix workbook categories, SEO tags, and editorial overlays.
4. Export local storefront JSON.
5. Preview products in the Vite prototype.
6. Generate Sanity dry-run product supplement documents.
7. Push reviewed editorial supplements to Sanity.
8. Create or sync approved Shopify/Printful products.
9. Build Hydrogen in a separate production app.
10. Join Shopify products and Sanity supplements by product handle.
11. Publish on Oxygen when the production Hydrogen build is ready.

## Command Center Checks

From `C:\wamp64\www\prints-local\art-business`:

```powershell
python .\scripts\artbiz.py catalog validate
python .\scripts\artbiz.py mirror export-storefront
python .\scripts\artbiz.py sanity export-products --ids 22
python .\scripts\artbiz.py sanity sync-products --dry-run --ids 22
```

Live Sanity writes require a token in `config/.env`:

```powershell
python .\scripts\artbiz.py sanity check-auth
python .\scripts\artbiz.py sanity sync-products --ids 22
```

Sanity receives editorial product supplements only. Shopify keeps prices, variants, inventory, checkout, and orders.

## Production Hydrogen Agent Prompt

Use this prompt with another agent in `C:\Users\sirer\Documents\GitHub\prints-shop`:

```text
You are working in the `prints-shop` repo for Kumachi Prints.

Read first:
- AGENTS.md
- RUNBOOK.md
- docs/index.md
- docs/data/01_product_model.md
- docs/data/02_sanity_schemas.md
- docs/data/05_woocommerce_mirror_bridge.md
- docs/system/01_architecture.md
- docs/system/03_routes_and_components.md
- docs/planning/00_launch_from_local_wordpress_simulator.md
- docs/planning/02_hydrogen_sanity_production.md

Important context:
- The local WordPress/WooCommerce simulator lives at:
  C:\wamp64\www\prints-local
- It runs locally at:
  http://localhost/prints-local/
- The `art-business` command center lives inside that WordPress install:
  C:\wamp64\www\prints-local\art-business
- `art-business` owns catalog validation, Woo mirror sync, storefront export, Shopify/Printful tooling, and Sanity sync tooling.
- The Vite prototype lives at:
  prints-shop\sources\protoype
- Do not break the Vite prototype.
- The final production Hydrogen + Sanity build does not exist yet. Create it separately.
- Sanity project:
  Project ID: 2wo9hx90
  Organization ID: o9GdYjNoE
  Dataset: production
- Sanity token roles:
  - `SANITY_API_READ_TOKEN` is read-only and belongs to the Hydrogen/server runtime.
  - The local `art-business` command center uses its own Sanity access-manager token for create/update operations.
- Never put Woo consumer keys, Sanity tokens, Shopify tokens, or Printful tokens in source code or docs.

Goal:
Build the production Hydrogen + Sanity foundation for Kumachi Prints using the local WordPress/Woo simulator and `art-business` command center as the upstream planning/data environment.

Tasks:
1. Update docs to clearly state the simulator architecture:
   - WordPress/Woo local simulator
   - art-business command center
   - Vite bridge prototype
   - Hydrogen + Sanity production build
2. Create the production Hydrogen app separately, recommended path:
   apps/hydrogen
3. Keep `sources/protoype` untouched except for bridge-specific fixes.
4. Configure Hydrogen environment placeholders:
   PUBLIC_STORE_DOMAIN=
   PUBLIC_STOREFRONT_API_TOKEN=
   SESSION_SECRET=
   SANITY_PROJECT_ID=2wo9hx90
   SANITY_ORGANIZATION_ID=o9GdYjNoE
   SANITY_DATASET=production
   SANITY_API_VERSION=2026-06-01
   SANITY_API_READ_TOKEN=
   SANITY_PREVIEW_SECRET=
5. Add `.env.example`; do not commit `.env`.
6. Implement Sanity schema skeletons:
   - productSupplement keyed by Shopify/Woo handle
   - artist
   - series
   - page
   - settings
   - navigation
   - seoFields
   - imageWithAlt
   - navItem
7. Implement Hydrogen route skeletons:
   - homepage
   - `/products/:handle`
   - `/collections/:handle`
   - cart route/actions
   - search
   - page route
8. Product route behavior:
   - fetch Shopify product by handle
   - fetch Sanity productSupplement by the same handle
   - use `Promise.all`
   - render product even if Sanity supplement is missing
   - never store prices/variants/inventory in Sanity
9. Add migration notes explaining how data flows:
   local Woo simulator -> art-business export/sync -> Sanity editorial docs + Shopify products -> Hydrogen storefront.
10. Run typecheck/build for the new Hydrogen app.
11. Also verify the Vite prototype still builds.

Acceptance criteria:
- Production Hydrogen app exists separately from the Vite prototype.
- Sanity project ID `2wo9hx90` is wired through env placeholders.
- No secrets are committed.
- Product route demonstrates Shopify + Sanity join by handle.
- Docs explain the local WordPress simulator role.
- Vite bridge prototype remains functional.
```

## Safety Rules

- Woo consumer keys never go into browser code.
- Sanity tokens never go into browser code unless they are explicitly safe public placeholders.
- Shopify and Printful live writes stay gated until dry-run artifacts are reviewed.
- Product handles are the join key across Woo, Shopify, Sanity, and Hydrogen.
- SKU remains the cross-system operational identity for reconciliation.
