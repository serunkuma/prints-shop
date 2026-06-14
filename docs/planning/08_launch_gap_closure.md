# Launch Gap Closure

Status: Current

## Current State

The production Hydrogen app exists at `apps/hydrogen` and is the launch target. The Vite prototype at `sources/protoype` remains a local preview/reference app only.

The local WordPress/Woo simulator at `C:\wamp64\www\prints-local` remains upstream planning infrastructure. Its `art-business` command center reports `155` catalog products, `837` variations, and no missing categories or tags. Production Hydrogen must still read commerce from Shopify and editorial content from Sanity, not Woo.

Root `studio/` is the canonical Sanity Studio. No duplicate `apps/hydrogen/studio/` exists — confirmed absent.

## Completed In This Pass

- `apps/hydrogen` identified as sole production target; `sources/protoype` documented as preview/reference only.
- `*.tsbuildinfo` removed from git tracking; `apps/hydrogen/tsconfig.tsbuildinfo` no longer tracked.
- Scaffold validator `Search-Files` rewritten to avoid recursing into excluded directories — no more falsely scanning nested `node_modules`, `dist`, `.git`, or generated paths.
- Cart action fixed: now creates a cart only when no `cartId` exists; if `cartId` exists, adds lines with `cartLinesAdd` and falls back to cart creation only if the existing cart was deleted/expired.
- Product `/products/:handle` hardened: variant selection via Shopify variants as commerce truth, sold-out/unavailable handling, renders product even if Sanity supplement is missing, preserves Shopify + Sanity join-by-handle.
- Homepage improved: `_index.tsx` features `FeaturedCollectionSection` rendering products from the "all" collection plus the existing featured prints grid.
- Cart `CART_LINES_ADD_MUTATION` returns full line data (merchandise details, prices, options) so the drawer and page can render properly after add.
- `CartSummary` component vendored into CartDrawer and CartPage to avoid duplication.
- Selected-product Shopify population pipeline added: `art-business` generates `shopify-launch-products.json`, and `apps/hydrogen/scripts/populate-products.mjs` dry-runs or creates Shopify draft products from that list.
- Duplicate `apps/hydrogen/studio/` confirmed non-existent — root `studio/` is already canonical.
- Root Sanity Studio is now deployable from `studio/` with `package.json`, `sanity.cli.ts`, and `.env.example`.
- Local Hydrogen env placeholder exists at `apps/hydrogen/.env`; Ernest must fill it with real private values.
- No secret-worthy tokens found in docs or configs.
- Hydrogen typecheck/build, Vite prototype build, and scaffold validation verified.
- Studio build is verified; remaining Studio audit warnings require a breaking Sanity major upgrade and are deferred from launch setup.

## Remaining Launch Blockers

- Fill real Shopify/Sanity values in local `apps/hydrogen/.env` and Oxygen.
- Use the selected-product pipeline to create reviewed Shopify draft products, then confirm products, collections, and handles match the `art-business` mirror/export.
- Create or review Sanity documents for settings, navigation, homepage, and launch product supplements.
- Install and deploy Sanity Studio from root `studio/`.
- Configure Oxygen deployment token and environment variables.
- Place a complete test order and confirm Printful receives fulfillment.
- Add analytics/Search Console only after the purchase flow is verified.

## Verification Commands

From `C:\Users\sirer\Documents\GitHub\prints-shop\apps\hydrogen`:

```powershell
npm run typecheck
npm run build
```

From `C:\Users\sirer\Documents\GitHub\prints-shop\sources\protoype`:

```powershell
npm run build
```

From `C:\Users\sirer\Documents\GitHub\prints-shop`:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate_scaffold.ps1
```

From `C:\Users\sirer\Documents\GitHub\prints-shop\studio`:

```powershell
npm install
npm run build
npm run deploy
```

From `C:\wamp64\www\prints-local\art-business` when upstream data context is needed:

```powershell
python .\scripts\artbiz.py catalog validate
python .\scripts\artbiz.py woo population-status
python .\scripts\artbiz.py mirror export-storefront
python .\scripts\artbiz.py shopify launch-list --ids 15
```

From `C:\Users\sirer\Documents\GitHub\prints-shop\apps\hydrogen` when preparing selected Shopify draft products:

```powershell
node scripts\populate-products.mjs --input C:\wamp64\www\prints-local\art-business\artifacts\exports\shopify-launch-products.json --dry-run
```

## Next Agent Instruction

Do not recreate the Hydrogen app. Harden `apps/hydrogen`, keep `sources/protoype` building, use root `studio/` for Sanity, and do not commit secrets. Focus next on real Shopify/Sanity environment testing, content population, and Oxygen deployment readiness.

See [09_launch_account_setup_checklist.md](09_launch_account_setup_checklist.md) for the external-account tasks Ernest must complete.

*Last updated: 2026-06*
