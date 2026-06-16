# Kumachi Prints — Project Roadmap

Status: Current

## Project Vision

Kumachi Prints exists to generate revenue from the Kumachi creative catalogue by selling physical art prints on demand. It is the commerce arm of the Kumachi Empire. The current launch path is final production build first: Hydrogen + Sanity on top of Shopify commerce and Printful fulfillment. The long-term differentiator is the editorial layer — every print has context, and every drop is a curated release — plus the forthcoming AI Studio that enables style-locked AI print generation.

## Five Phases

## Phase 1 — Production Launch Foundation

**Objective:** Build the final Hydrogen + Sanity production foundation at `apps/hydrogen`, connect it to Shopify commerce and Sanity editorial content, and keep the Vite prototype as a local preview/reference only. No Netlify bridge-store launch is planned.

| Item | Detail |
|------|--------|
| Timeline | Current sprint (weeks 1–2) |
| Scope | Hydrogen scaffold, Sanity schemas, Shopify/Printful setup path, Vite prototype preserved, customer accounts (verify/migrate existing account routes to Shopify Customer Account API/OAuth), order history and order detail pages, email/phone capture with separate consent for email and SMS marketing, AI Studio teaser and waitlist capture surface, order notification QA |
| Gate | Production app builds, core routes render, and Shopify/Sanity join by handle is demonstrated; customer can sign in, view order history, and see order detail |

## Phase 2 — Hydrogen + Sanity Production

**Objective:** Complete and deploy the Hydrogen stack on Oxygen. Core routes live. Sanity schemas deployed. Visual Editing working. Domain connected. Sanity-powered product supplements for all launch products.

| Item | Detail |
|------|--------|
| Timeline | Immediately after Phase 1 foundation |
| Scope | Hydrogen build on Oxygen, Sanity schemas, Visual Editing, account routes verified with Shopify Customer Account API/OAuth |
| Gate | Production foundation complete and launch products ready in Shopify |

## Phase 3 — Editorial Layer

**Objective:** Everything that differentiates Kumachi Prints from a commodity print shop. Drops/series pages. Artist profiles. About, FAQ, Shipping, Contact pages. Component library for internal use. Ernest can publish a new drop without touching code.

| Item | Detail |
|------|--------|
| Timeline | Weeks 3–4 |
| Scope | Editorial routes, Sanity content, component library |
| Gate | Phase 2 Oxygen deploy live |

## Phase 4 — Domain Migration

**Objective:** Zero-downtime move from `prints.kumachigallery.com` to `kumachiprints.com`. 301 redirect set. Search Console updated. Canonical URLs corrected.

| Item | Detail |
|------|--------|
| Timeline | When `kumachiprints.com` renews |
| Scope | DNS, redirects, SEO |
| Gate | Domain renewal (external dependency) |

## Phase 5 — Growth Systems

**Objective:** Systems that turn first-time buyers into repeat customers. Email marketing, product reviews, retention flows. Cross-property God Dashboard integration via n8n + Shopify webhooks.

| Item | Detail |
|------|--------|
| Timeline | 4–8 weeks post-launch |
| Scope | Owned email marketing stack (Listmonk on Fly.io + Resend SMTP), product reviews, retention flows, abandoned cart recovery, God Dashboard integration |
| Gate | Phase 1 order volume; Listmonk/Resend campaign infrastructure ready |

## Future — AI Studio (Full Platform)

**Objective:** Full AI print generation platform with style-locked generation, Supabase AI accounts/galleries/tokens, GraphQL AI layer, Replicate/Flux generation, LoRA style lock, upscaling, Stripe token subscriptions, Printful custom product ordering, and Certificate of Generation.

**Launch State:** Public `/create` demo page with email/phone waitlist capture. No live AI ordering. AI Studio teaser on homepage with waitlist CTA. Product attribute extraction (colour analysis, cultural context) is the only AI spillover into non-create pages; extracted attributes must be reviewed before becoming public filters.

| Item | Detail |
|------|--------|
| Timeline | Post-launch |
| Scope | Full AI generation platform, Supabase Auth for AI users, Stripe billing |
| Gate | Launch waitlist demand signals; Phase 3 editorial layer complete |

## Dependency Map

```
Phase 1 (production foundation — includes customer accounts, order management, contact/consent capture, AI Studio waitlist demo)
  └── Phase 2 (Hydrogen/Oxygen launch — account routes verified with Shopify Customer Account API/OAuth)
        └── Phase 3 (editorial) — needs Phase 2 routes working
              ├── Phase 4 (domain) — needs domain renewal (external dependency)
              └── Phase 5 (growth — Listmonk/Resend campaigns, reviews, God Dashboard) — needs Phase 1 order volume
                    └── AI Studio (full platform — Supabase Auth, tokens, Stripe, generation) — needs launch waitlist data + Phase 3 complete
```

## Risks

| Risk | Likelihood | Severity | Mitigation |
|------|-----------|----------|------------|
| Product files below 150 DPI | Medium | High | Check DPI before uploading; Printful shows a warning |
| `kumachiprints.com` renewal delay | Low | Medium | Phase 1 on subdomain explicitly handles this |
| Printful quality issues | Low | High | Place test order before public launch |
| Oxygen plan eligibility | Low | High | Verify plan type (Basic+) before starting setup |
| Sanity API rate limits | Low | Low | Use CDN caching; Oxygen edge caching |
| Shopify Customer Account API breaking change | Low | High | Test OAuth flow before launch; confirm /account/authorize handles callback correctly |
| Listmonk email deliverability | Medium | Medium | Warm sending domain with Resend before campaign send |

*Last updated: 2026-06* (Updated: customer accounts/auth in launch scope, AI Studio waitlist/demo, Listmonk/Resend growth stack)
