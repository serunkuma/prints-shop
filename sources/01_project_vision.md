# Kumachi Prints — Project Vision & Business Context

Status: Current

## What This Project Is

Kumachi Prints is a headless e-commerce storefront for selling art prints — digital art, photography, and cultural storytelling artwork produced by or curated by Kumachi Gallery. The store is part of the Kumachi Empire, a multi-property creative business ecosystem built by Ernest Serunkuma.

The four properties in the Kumachi Empire are:
- **kumachistudio.com** — creative agency (flagship)
- **kumachigallery.com** — gallery focused on original art and African diaspora narratives
- **kumachiprints.com** — this project, print-on-demand e-commerce
- **eserunkuma.com** — Ernest's personal brand as an expatriate consultant

This repo (`prints-shop`) is the codebase for the prints store only.

## Business Goal

Generate revenue from Kumachi's back catalogue of digital art, photography, and cultural storytelling work by selling high-quality art prints on demand. The store should:

1. Sell physical art prints (framed and unframed) fulfilled on-demand via Printful
2. Reflect the gallery-adjacent, editorial identity of Kumachi Gallery
3. Support drop-style launches (a curated release of a new print series)
4. Be content-managed without requiring code changes for editorial updates
5. Launch fast on a subdomain (`prints.kumachigallery.com`) while `kumachiprints.com` is renewed, then migrate cleanly

## Launch Strategy

- **Phase 1 target:** `prints.kumachigallery.com` — live, selling, analytics running
- **Phase 2:** Migrate to `kumachiprints.com` once domain is renewed (zero downtime 301 redirect)
- **Content strategy:** "backfill relaunch" — Ernest has 3–5 years of existing art, travel, and cultural work. This is the inventory. No new content needs to be created before launch.

## Owned Infrastructure Principle

Ernest consistently chooses to build and own integrations rather than pay for ongoing SaaS tools. This applies here:
- Shopify is the commerce backend (managed, accepted dependency)
- Sanity is the CMS (managed, accepted dependency)
- Printful is the fulfilment layer (managed, accepted dependency)
- Analytics: self-hosted Umami (not GA4 — GA4 only earns its place when Google Ads are running)
- No loyalty apps unless they offer robust headless API support — if not, skip for now

## Revenue Model

- Print-on-demand: customer places order → Printful produces and ships the physical print → Kumachi earns the margin
- No inventory held by Kumachi
- Printful is the fulfilment partner, integrated with Shopify
- Pricing: Ernest sets retail prices in Shopify. Printful's base cost is deducted automatically at fulfilment.

## Audience

- Art collectors and interior design buyers who want quality prints that tell cultural stories
- Diaspora community buyers who connect with African-rooted visual identity
- Gift buyers
- Gallery visitors and social media followers of Kumachi Gallery

## Tone & Identity

- Gallery-adjacent, editorial
- Not a mass-market print shop
- Storytelling is central — each print has context (artist, series, technique, inspiration)
- Premium but accessible: this is not fine art auction prices, this is considered home decor

*Last updated: 2026-06-10*
