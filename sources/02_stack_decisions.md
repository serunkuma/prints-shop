# Stack Decisions & Architecture Rationale

Status: Current

## Chosen Stack

This is a greenfield project. The stack was chosen before writing any code.

| Layer | Technology | Why |
|---|---|---|
| Commerce backend | Shopify (Storefront API + Admin API) | Source of truth for products, variants, inventory, orders, checkout, payments. Proven at scale. |
| Frontend framework | Shopify Hydrogen (React Router v7 + Vite) | Purpose-built for Shopify headless. Free Oxygen edge hosting on all paid Shopify plans. Built-in cart, product, collection primitives. |
| CMS | Sanity | All non-product content lives here: homepage sections, editorial pages, drop landing pages, artist bios, FAQs, site settings. Sanity Visual Editing enables live browser preview. |
| Fulfilment | Printful (via Shopify integration) | Print-on-demand. Printful syncs as a Shopify product source. No inventory held. |
| Hosting | Shopify Oxygen | Edge-deployed, free with paid Shopify plan, GitHub CI/CD, auto-SSL, auto-CDN. No servers. |
| Analytics | Umami (self-hosted) | One Umami instance tracks all four Kumachi properties. Installed before any other work — this is a hard prerequisite. |
| Search Console | Google Search Console | All four Kumachi domains verified before launch. |
| Styling | Tailwind CSS v4 | Already the stack-wide choice across all Kumachi properties. |

## Why Hydrogen Over Next.js / Astro

- Astro is the choice for the three other Kumachi properties (studio, gallery, personal brand) because they have no real-time commerce requirements
- The prints store needs real-time cart state, variant selection, checkout redirect, and Shopify's customer account API — Hydrogen handles all of this natively
- Astro + Shopify Storefront API is a viable but more manual path; Hydrogen reduces the scaffolding significantly
- Oxygen hosting is free, edge-deployed, and requires zero server management — removing an ops burden for a solo operator

## Why Sanity (Not Shopify Metafields / Metaobjects Alone)

- Shopify Metafields can carry some editorial content, but Sanity is purpose-built for structured content authoring with Portable Text, image hotspot, real-time collaboration, and Visual Editing
- The "drops" editorial model (a landing page for each print release with storytelling content, artist biography, and embedded products) is fundamentally a CMS use case, not a Shopify use case
- Sanity's GROQ query language enables rich, relational content queries that Shopify Metafields cannot replicate
- Hydrogen + Sanity is a proven, documented integration (see `hydrogen-sanity` package)

## Data Source of Truth Split

This is the most important architecture decision. It must not be violated:

- **Shopify is the source of truth for:** products, variants, prices, inventory, orders, cart, checkout, customer accounts, fulfilment status
- **Sanity is the source of truth for:** homepage content, editorial drop pages, artist profiles, product storytelling (extended descriptions, technique, inspiration), site settings, navigation, SEO metadata overrides, FAQs, static pages

A Sanity "Product Supplement" document is keyed to a Shopify product handle. It adds editorial content to a product without duplicating the commerce data. The product's title, price, and variants always come from Shopify.

## Why Printful (Not Manual Fulfilment)

- Zero inventory risk for Ernest — no upfront stock cost
- Printful integrates natively with Shopify as a product source; products created in Printful sync to Shopify automatically
- Quality is sufficient for the intended price point
- The integration is well-documented and widely used; the community support is strong
- Minimum quality requirement: product files must be at minimum 150 DPI at the largest print size

## Greenfield Decision

This project starts greenfield. There is no existing Hydrogen codebase to migrate. The scaffold used is the `frontvibe/fluid` open-source Hydrogen + Sanity starter, which provides:
- Working Hydrogen + Sanity integration out of the box
- Sanity Visual Editing pre-configured
- Modular page section system (sections assembled in Sanity, rendered in Hydrogen)
- Tailwind CSS pre-wired
- shadcn/ui + Radix UI component primitives

Starting from Fluid saves significant scaffold time vs building from Shopify's own `demo-store` template and wiring Sanity manually.

## What Was Explicitly Rejected

- `[REJECTED: Astro for the prints store]` — Astro is statically-oriented; real-time cart and checkout state require server-rendering. Hydrogen is the correct tool.
- `[REJECTED: WordPress / WooCommerce]` — Legacy platform, kumachistudio.com is already being migrated away from it.
- `[REJECTED: GA4 at launch]` — GA4 earns its place only when Google Ads are running (cross-channel attribution is its primary value). Umami covers all launch analytics needs.
- `[REJECTED: Loyalty/rewards app at launch]` — Pointful and similar apps have inconsistent headless API support. Post-launch evaluation only.
- `[REJECTED: Ayrshare or social posting SaaS]` — Kumachi builds native social API connections in the God Dashboard rather than paying ongoing SaaS fees.

*Last updated: 2026-06-10*
