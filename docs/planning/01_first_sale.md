# Phase 1 — Production Launch Foundation

Status: Current

## Objective

Build the final production foundation for Kumachi Prints before launch: Hydrogen + Sanity in `apps/hydrogen`, Shopify commerce, Printful fulfillment path, and the local Woo simulator feeding reviewed product context through `art-business`. The first sale should launch `Opening Drop` as a curated open drop. The Vite prototype remains a local preview/reference, not a Netlify bridge store.

## Scope

**In scope:** Shopify store setup, Printful product creation and sync planning, Hydrogen production scaffold, Sanity schema setup, `.env.example`, product route proof by handle, cart/checkout foundation, Umami planning, local simulator health checks, and Vite prototype build preservation.

**Out of scope:** Netlify bridge-store deployment, custom checkout, full editorial content completion, customer accounts, real AI generation, and live Shopify/Printful/Sanity writes before dry-run review.

## Task Checklist

- [ ] Create Shopify store on Basic plan (not Starter — Starter does not support Oxygen)
- [ ] Install Hydrogen sales channel in Shopify admin
- [ ] Create Printful account and connect to Shopify
- [ ] Use `art-business` mirror health checks before product publishing work
- [ ] Create `Opening Drop` manifest in `art-business`
- [ ] Confirm local Woo mirror reports 155 products and 837 variations
- [ ] Export fresh storefront JSON from `art-business` for prototype/reference checks
- [ ] Upload minimum 5 launch print files to Printful after DPI review
- [ ] Configure sizes (A4/A3/A2/50×70cm/70×100cm) and frame variants in Printful
- [ ] Sync Printful products to Shopify
- [ ] Create Shopify collection `drop-opening-drop` for `Opening Drop`
- [ ] Set retail prices in Shopify (base cost × 2.5×–4× markup)
- [ ] Create Shopify collections (All Prints, New Arrivals)
- [ ] Obtain Storefront API token from Shopify custom app
- [x] Create Sanity project with dataset `production`
- [x] Create production Hydrogen app at `apps/hydrogen`
- [x] Create local placeholder `apps/hydrogen/.env` with required variable names
- [ ] Fill `.env` with real Shopify and Sanity values
- [x] Make root Sanity Studio deployable from `studio/`
- [ ] Verify `npm run dev` runs without errors at localhost:3000
- [x] Homepage route renders with hero section, trust signals, and featured products
- [x] Collection page renders Shopify products
- [x] Product detail page renders product with variant selector
- [x] Add to cart flow is wired from PDP/card to Shopify cart action
- [ ] Checkout redirect works (cart drawer → Shopify hosted checkout)
- [ ] `/drops/opening-drop` renders Sanity story plus Shopify collection products
- [ ] Create GitHub Actions workflow for Oxygen deployment
- [ ] Connect GitHub repository to Oxygen in Shopify admin
- [ ] Set environment variables in Oxygen (both Production and Preview environments)
- [ ] Create DNS CNAME record: `prints.kumachigallery.com` → `shops.myshopify.com`
- [ ] Add domain in Shopify: Settings → Domains → Add existing domain
- [ ] Verify SSL certificate provisions automatically
- [ ] Install Umami tracking script in `app/root.tsx`
- [ ] Verify Umami is recording page visits
- [ ] Add Google Search Console property for `prints.kumachigallery.com`
- [ ] Generate and submit sitemap to Search Console
- [ ] Test mobile experience on real device
- [ ] Place first test order through the complete checkout flow
- [ ] Verify Printful receives the order and begins production
- [ ] Verify tracking number written back to Shopify order
- [x] Create `.env.example` with all variable names but no values

## Deliverables

- Live store at `https://prints.kumachigallery.com`
- `Opening Drop` live with minimum 5 purchasable products and complete variant matrix
- Working cart and checkout flow
- Umami analytics recording visits and custom events
- Google Search Console property active
- GitHub Actions CI/CD pushing to Oxygen
- First test order through Printful fulfilment

## Acceptance Criteria

A real customer can visit `Opening Drop`, browse products, add to cart, select size and frame, and complete checkout on the production Hydrogen storefront. Printful receives and processes the order. Umami records the session. The checkout completes without errors. The Vite prototype still builds locally but is not the public launch store.

## Dependencies

- Shopify store on Basic plan or higher (Oxygen requires paid plans)
- Printful account created and Shopify integration authorised
- Domain configuration for `prints.kumachigallery.com`
- `kumachiprints.com` domain renewal status does not block this phase

*Last updated: 2026-06*
