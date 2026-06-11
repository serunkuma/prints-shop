# Phase 1 — First Sale

Status: Current

## Objective

Get the store live on `prints.kumachigallery.com` with at least 5 real products, a working checkout, and analytics running. Speed to first sale is the primary metric. A bridge deployment using the Vite prototype serves as the early storefront while the Hydrogen build proceeds in parallel.

## Scope

**In scope:** Shopify store setup, Printful product creation and sync, Vite bridge store deployment on Netlify, Hydrogen scaffold running locally, Checkout redirecting to Shopify hosted cart, Umami analytics tracking, first test order through to Printful fulfilment.

**Out of scope:** Custom checkout, Sanity editoral content, drops/series pages, artist profiles, Oxygen deployment, customer accounts.

## Task Checklist

- [ ] Create Shopify store on Basic plan (not Starter — Starter does not support Oxygen)
- [ ] Install Hydrogen sales channel in Shopify admin
- [ ] Create Printful account and connect to Shopify
- [ ] Upload minimum 5 print files to Printful (verify ≥150 DPI at largest size)
- [ ] Configure sizes (A4/A3/A2/50×70cm/70×100cm) and frame variants in Printful
- [ ] Sync Printful products to Shopify
- [ ] Set retail prices in Shopify (base cost × 2.5×–4× markup)
- [ ] Create Shopify collections (All Prints, New Arrivals)
- [ ] Obtain Storefront API token from Shopify custom app
- [ ] Create Sanity project with dataset `production`
- [ ] Clone `frontvibe/fluid` scaffold and push to `serunkuma/prints-shop`
- [ ] Configure `.env` with all Shopify and Sanity environment variables
- [ ] Verify `npm run dev` runs without errors at localhost:3000
- [ ] Deploy Vite prototype as bridge store on Netlify with checkout → Shopify hosted cart
- [ ] Homepage route renders with hero section and featured products
- [ ] Collection page renders Shopify products
- [ ] Product detail page renders product with variant selector
- [ ] Add to cart works (variant selection → cart drawer opens with item)
- [ ] Checkout redirect works (cart drawer → Shopify hosted checkout)
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
- [ ] Create `.env.example` with all variable names but no values

## Deliverables

- Live store at `https://prints.kumachigallery.com`
- Minimum 5 purchasable products with complete variant matrix
- Working cart and checkout flow
- Umami analytics recording visits and custom events
- Google Search Console property active
- GitHub Actions CI/CD pushing to Oxygen
- First test order through Printful fulfilment

## Acceptance Criteria

A real customer can browse products, add to cart, select size and frame, and complete checkout. Printful receives and processes the order. Umami records the session. The checkout completes without errors. The bridge store is live at the subdomain URL.

## Dependencies

- Shopify store on Basic plan or higher (Oxygen requires paid plans)
- Printful account created and Shopify integration authorised
- Domain configuration for `prints.kumachigallery.com`
- `kumachiprints.com` domain renewal status does not block this phase

*Last updated: 2026-06*
