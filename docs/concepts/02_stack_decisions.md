# Stack Decisions & Architecture Rationale

Status: Current

## Chosen Stack

| Layer | Technology | Business Rationale | Technical Rationale |
|-------|-----------|-------------------|---------------------|
| Commerce backend | Shopify | Proven at scale; handles orders, payments, fulfilment sync | Storefront API is purpose-built for headless; Hydrogen integration is first-class |
| Frontend framework | Hydrogen (React Router v7) | Free Oxygen hosting on paid plans; purpose-built for headless Shopify | Built-in cart, product, collection primitives; reduces scaffold time |
| CMS | Sanity | Page builder, Portable Text, relational content, Visual Editing | GROQ enables rich relational queries; Fluid starter pre-wires integration |
| Fulfilment | Printful via Shopify app | Zero inventory risk; no physical product handling | Native Shopify integration through the Printful app |
| Hosting | Shopify Oxygen | Free with paid Shopify plan; zero server management | Edge-deployed (Cloudflare workerd); GitHub CI/CD; auto-SSL |
| Analytics | Umami (self-hosted) | One instance tracks all four properties; owned infrastructure | Lightweight script; covers all launch analytics needs |
| Styling | Tailwind CSS v4 | Already the stack-wide choice across all Kumachi properties | Design token system; efficient build output; strong community |

## Why Hydrogen Over Astro / Next.js

Astro is the framework for the three non-commerce Kumachi properties (studio, gallery, personal brand) because they have no real-time commerce requirements. The prints store needs real-time cart state, variant selection, checkout redirect, and customer account API — Hydrogen handles all of this natively. Astro + Shopify Storefront API is viable but requires significantly more manual integration work. Oxygen hosting is free, edge-deployed, and requires zero server management for a solo operator.

## Why Sanity Over Shopify Metafields Alone

- Shopify Metafields can carry some editorial content, but Sanity is purpose-built for structured content authoring
- The drops/series editorial model (landing page with storytelling, artist biography, and embedded products) is a CMS use case, not a Shopify use case
- Sanity's GROQ query language enables rich relational queries that Metafields cannot replicate
- Hydrogen + Sanity is a proven, documented integration via the `hydrogen-sanity` package
- Sanity Visual Editing provides live browser preview for content editors

## The Data Source of Truth Split

This is the single most important architectural rule. It must never be violated:

> **Shopify owns commerce data. Sanity owns editorial content. These never swap.**

Shopify: products, variants, prices, inventory, orders, cart, checkout, customer accounts, fulfilment status
Sanity: homepage sections, editorial drop pages, artist profiles, product storytelling, site settings, navigation, SEO metadata overrides, FAQs

A Sanity "Product Supplement" document adds editorial content to a Shopify product by matching on the product handle. It never duplicates prices or variants.

## Why Printful

Zero inventory risk. Printful integrates natively with Shopify as a product source — products created in Printful sync to Shopify automatically. Quality is sufficient for the intended price point (minimum 150 DPI requirement). The integration is well-documented and widely used.

## The Greenfield Decision

The project starts greenfield from `frontvibe/fluid`, an open-source Hydrogen + Sanity starter. Fluid provides working Hydrogen + Sanity integration, Sanity Visual Editing pre-configured, a modular page section system, Tailwind CSS pre-wired, and shadcn/ui + Radix UI component primitives. Starting from Fluid saves ~40 hours of scaffold time versus building from Shopify's demo-store template and wiring Sanity manually.

## What Was Explicitly Rejected

- **[REJECTED: Astro for prints store]** — Static-first framework; real-time cart and checkout require server rendering. Hydrogen is the correct tool.
- **[REJECTED: WordPress/WooCommerce]** — Legacy platform; kumachistudio.com is already migrating away from it.
- **[REJECTED: GA4 at launch]** — GA4 earns its place only when Google Ads are running (cross-channel attribution). Umami covers all launch analytics needs.
- **[REJECTED: Loyalty/rewards at launch]** — Inconsistent headless API support among providers; post-launch evaluation only.
- **[REJECTED: Ayrshare social posting]** — Owned infrastructure preferred; native social API connections built into God Dashboard via n8n.

## Owned Infrastructure Principle

Ernest consistently chooses to build and own integrations rather than pay for ongoing SaaS tools. Examples: self-hosted Umami for analytics (not GA4), native social API connections (not Ayrshare), Printful via its native Shopify app (not a third-party middleware). Apply this principle when evaluating any new tool.

*Last updated: 2026-06*
