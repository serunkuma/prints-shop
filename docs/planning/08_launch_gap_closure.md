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
- Drop model documented: first sale should launch `Opening Drop` as a curated open drop backed by an `art-business` manifest, Shopify collection, Sanity `series`, and Hydrogen `/drops/opening-drop`.
- Duplicate `apps/hydrogen/studio/` confirmed non-existent — root `studio/` is already canonical.
- Root Sanity Studio is now deployable from `studio/` with `package.json`, `sanity.cli.ts`, and `.env.example`.
- Local Hydrogen env placeholder exists at `apps/hydrogen/.env`; Ernest must fill it with real private values.
- No secret-worthy tokens found in docs or configs.
- Hydrogen typecheck/build, Vite prototype build, and scaffold validation verified.
- Studio build is verified; remaining Studio audit warnings require a breaking Sanity major upgrade and are deferred from launch setup.

## Remaining Launch Blockers

### Commerce & Infrastructure
- Fill real Shopify/Sanity values in local `apps/hydrogen/.env` and Oxygen.
- Use the selected-product pipeline to create reviewed Shopify draft products for `Opening Drop`, then confirm products, collection `opening-drop`, and handles match the `art-business` mirror/export.
- Create or review Sanity documents for settings, navigation, homepage, and launch product supplements.
- Install and deploy Sanity Studio from root `studio/`.
- Configure Oxygen deployment token and environment variables.
- Place a complete test order and confirm Printful receives fulfillment.
- Add analytics/Search Console only after the purchase flow is verified.

### Customer Accounts & Contact Capture
- Verify `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID` and `SHOP_ID` exist in local `.env` and Oxygen.
- Verify `account.orders.tsx` and `account.orders.$orderId.tsx` load order history and single-order detail through Customer Account API using a real test customer.
- Confirm `/account/authorize` Customer Account API OAuth callback is configured in Shopify admin for local ngrok, Oxygen preview, and production domains.
- Test Shopify-hosted customer account recovery/login assistance from the Customer Account API login flow.
- Add account contact-preferences capture if custom consent fields are needed outside Shopify-hosted checkout/login.
- Newsletter signup capture section with email + consent checkboxes is implemented.
- AI Studio waitlist capture on `/create` is implemented with email required, phone optional, and separate consent checkboxes.
- Consent audit fields are implemented for consent text, timestamp, source page, IP hash, and user agent; verify with a real Sanity write before launch.
- AI Studio teaser section on homepage links to `/create`.

### Notifications
- Test Shopify transactional emails after test order: order confirmation, fulfillment update, shipping notification.
- Confirm Printful writes tracking number back to Shopify order.
- Confirm customer receives Shopify shipping notification email.
- Confirm Listmonk/Resend campaign infrastructure is **not** a launch blocker — capture surfaces are launch scope; sending campaigns is post-launch.

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
python .\scripts\artbiz.py drops create --ids 15,22 --slug opening-drop --title "Opening Drop" --mode curated_open
python .\scripts\artbiz.py shopify launch-list --drop opening-drop
```

From `C:\Users\sirer\Documents\GitHub\prints-shop\apps\hydrogen` when preparing selected Shopify draft products:

```powershell
node scripts\populate-products.mjs --input C:\wamp64\www\prints-local\art-business\artifacts\exports\shopify-launch-products.json --dry-run
```

## Next Agent Instruction

Do not recreate the Hydrogen app. Harden `apps/hydrogen`, keep `sources/protoype` building, use root `studio/` for Sanity, and do not commit secrets. Focus next on real Shopify/Sanity environment testing, content population, and Oxygen deployment readiness.

See [09_launch_account_setup_checklist.md](09_launch_account_setup_checklist.md) for the external-account tasks Ernest must complete.

*Last updated: 2026-06* (Updated: customer account/contact capture/consent blockers added; Listmonk/Resend marked as post-launch)
