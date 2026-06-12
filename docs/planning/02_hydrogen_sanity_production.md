# Phase 2 — Hydrogen + Sanity Production

Status: Planning

## Objective

Build the real Hydrogen stack on Shopify Oxygen. Core routes are live, Sanity schemas are deployed and populated, Visual Editing is working, and product supplements provide editorial depth for all launch products. This is now the immediate production build path, not a replacement after a Netlify bridge launch.

## Scope

**In scope:** production app creation at `apps/hydrogen`, Hydrogen deployment on Oxygen, Sanity schema implementation, Sanity Studio deployment, Visual Editing configuration, core route completion, product supplement documents for launch products, SEO meta functions.

**Out of scope:** Editorial routes (drops, artist profiles), domain migration from subdomain, customer accounts.

## Task Checklist

- [ ] Deploy Hydrogen app to Oxygen production environment
- [ ] Create production app at `apps/hydrogen` without breaking `sources/protoype`
- [ ] Configure Oxygen preview deployments for PR branches
- [ ] Set `prints.kumachigallery.com` as custom domain in Oxygen
- [ ] Implement all Sanity schema files in `studio/schemaTypes/`
  - [ ] `homepage.ts` — singleton page builder
  - [ ] `productSupplement.ts` — editorial supplement keyed to `shopifyHandle`
  - [ ] `artist.ts` — artist profile document
  - [ ] `series.ts` — drop/series release document
  - [ ] `page.ts` — generic CMS page
  - [ ] `settings.ts` — singleton site-wide config
  - [ ] `navigation.ts` — singleton main navigation
  - [ ] `objects/seoFields.ts` — shared SEO metadata
  - [ ] `objects/imageWithAlt.ts` — image with alt text and hotspot
  - [ ] `objects/navItem.ts` — navigation item
- [ ] Register all schema types in `studio/schemaTypes/index.ts`
- [ ] Deploy Sanity Studio: `cd studio && npx sanity deploy`
- [ ] Verify Sanity Studio accessible at `kumachi-prints.sanity.studio`
- [ ] Configure Sanity Visual Editing with preview secret
- [ ] Create `app/lib/queries.ts` with all GROQ query constants
  - [ ] Homepage sections query
  - [ ] Product supplement by handle query
  - [ ] All live series query
  - [ ] Artist by slug query
  - [ ] Site settings query
  - [ ] Navigation query
  - [ ] Page by slug query
- [ ] Create `app/lib/sanity.server.ts` — Sanity client setup
- [ ] Create `app/lib/cart.server.ts` — server-side cart utilities
- [ ] Create `app/lib/format.ts` — `formatPrice()` and `formatMoney()`
- [ ] Create `app/lib/animations.ts` — Framer Motion variants
- [ ] Create `app/components/layout/Header.tsx` — site header with nav and cart icon
- [ ] Create `app/components/layout/Footer.tsx` — footer with nav and social links
- [ ] Create `app/components/layout/AnnouncementBar.tsx` — promo bar from Sanity settings
- [ ] Create `app/components/product/ProductCard.tsx` — grid card component
- [ ] Create `app/components/product/ProductGrid.tsx` — product card grid
- [ ] Create `app/components/product/VariantSelector.tsx` — size and frame selector
- [ ] Create `app/components/product/AddToCart.tsx` — add to cart button
- [ ] Create `app/components/product/ProductMedia.tsx` — image gallery
- [ ] Create `app/components/cart/CartDrawer.tsx` — slide-in cart
- [ ] Create `app/components/cart/CartItem.tsx` — line item component
- [ ] Create `app/components/cart/CartSummary.tsx` — subtotal and checkout
- [ ] Create `app/components/sections/HeroSection.tsx`
- [ ] Create `app/components/sections/FeaturedCollectionSection.tsx`
- [ ] Create `app/components/sections/ProductGridSection.tsx`
- [ ] Create `app/components/sections/NewsletterSection.tsx`
- [ ] Create `app/components/shared/SanityImage.tsx`
- [ ] Create `app/components/shared/Seo.tsx`
- [ ] Implement `app/routes/_index.tsx` — homepage with Sanity sections
- [ ] Implement `app/routes/products.$handle.tsx` — PDP with product supplement
- [ ] Implement `app/routes/collections.$handle.tsx` — collection listing
- [ ] Implement `app/routes/cart.tsx` — cart page with action handlers
- [ ] Implement `app/routes/search.tsx` — search results page
- [ ] Implement `app/routes/pages.$handle.tsx` — CMS static pages
- [ ] Implement `app/routes/sitemap.xml.tsx` — SEO sitemap
- [ ] Implement `app/routes/robots.txt.tsx` — crawler rules
- [ ] Create product supplement documents in Sanity for all 5+ launch products
- [ ] Add Sanity SEO fields override pattern in all route meta functions
- [ ] Implement `ErrorBoundary` on every route
- [ ] Run `npm run typecheck` and `npm run build` — fix all errors
- [ ] Verify all routes work on Oxygen preview URL

## Deliverables

- Hydrogen app deployed on Oxygen
- All Sanity schemas deployed and populated
- Sanity Visual Editing working in production
- 6+ core routes rendering correctly
- All product images using proper `<Image>` and `urlFor()` components

## Acceptance Criteria

A developer can clone the repo, run `npm run dev`, and see the full store with Sanity-powered content. Ernest can log into Sanity Studio, edit a product supplement, see the change on the live site. All routes respond with correct data. TypeScript and build pass with zero errors.

## Dependencies

- Phase 1 production foundation in progress or complete
- Sanity project with `production` dataset
- All 5+ launch products in Shopify with correct handles

*Last updated: 2026-06*
