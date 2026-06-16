# Phase 2 — Hydrogen + Sanity Production

Status: Current

## Objective

Build the real Hydrogen stack on Shopify Oxygen. Core routes are live, Sanity schemas are deployed and populated, Visual Editing is working, and product supplements provide editorial depth for all launch products. The Hydrogen app at `apps/hydrogen` is the production target. The Vite prototype at `sources/protoype` is preview/reference only.

## Scope

**In scope:** production app hardening at `apps/hydrogen`, Hydrogen deployment on Oxygen, canonical root Sanity Studio deployment, Visual Editing configuration, core route completion, product supplement documents for launch products, SEO meta functions, account routes verification and migration to current Shopify Customer Account API/OAuth.

**Out of scope:** Editorial routes (drops, artist profiles), domain migration from subdomain, full Listmonk/Resend campaign sending infrastructure.

## Task Checklist

- [x] Hydrogen app at `apps/hydrogen` scaffolded and building
- [x] Production app exists at `apps/hydrogen`, Vite prototype `sources/protoype` functional
- [x] All Sanity schema files exist in canonical `studio/schemaTypes/`
  - [x] `homepage.ts` — singleton page builder
  - [x] `productSupplement.ts` — editorial supplement keyed to `shopifyHandle`
  - [x] `artist.ts` — artist profile document
  - [x] `series.ts` — drop/series release document
  - [x] `page.ts` — generic CMS page
  - [x] `settings.ts` — singleton site-wide config
  - [x] `navigation.ts` — singleton main navigation
  - [x] `objects/seoFields.ts` — shared SEO metadata
  - [x] `objects/imageWithAlt.ts` — image with alt text and hotspot
  - [x] `objects/navItem.ts` — navigation item
- [x] All schema types registered in `studio/schemaTypes/index.ts`
- [x] `app/lib/queries.ts` — Shopify and GROQ query constants
- [x] `app/lib/sanity.server.ts` — Sanity client setup
- [x] `app/lib/cart.server.ts` — server-side cart utilities
- [x] `app/lib/format.ts` — `formatPrice()` and `formatMoney()`
- [x] `app/lib/animations.ts` — Framer Motion variants
- [x] Layout, product, cart components for the launch foundation
- [x] Section components: HeroSection, FeaturedCollectionSection, ProductGridSection, NewsletterSection, TestimonialsSection, EditorialBannerSection
- [x] Route implementations: `_index`, `products.$handle`, `collections.$handle`, `cart`, `search`, `pages.$handle`, `sitemap.xml`, `robots.txt`
- [x] `ErrorBoundary` present on all routes
- [x] `npm run typecheck` and `npm run build` pass
- [ ] Deploy Sanity Studio: `cd studio && npx sanity deploy`
- [ ] Verify Sanity Studio accessible at `kumachi-prints.sanity.studio`
- [ ] Configure Sanity Visual Editing with preview secret
- [ ] Create product supplement documents in Sanity for all 5+ launch products
- [ ] Add Sanity SEO fields override pattern in all route meta functions
- [ ] Replace legacy customer access token account flow with Shopify Customer Account API/OAuth
- [ ] Verify account routes: `/account/login` (starts OAuth), `/account/authorize` (OAuth callback), `/account` (customer dashboard), `/account/orders` (order history), `/account/orders/:orderId` (single order detail)
- [ ] Confirm account routes use `context.customerAccount` / Customer Account API client (no Supabase Auth for commerce accounts)
- [ ] Test password recovery flow: `/account/recover` → Shopify sends reset email → user resets password → login works
- [ ] Add account contact-preferences surface if custom email/SMS consent cannot be captured in Shopify-hosted customer login
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

*Last updated: 2026-06* (Updated: account routes moved into scope; verification/migration to Shopify Customer Account API/OAuth added)
