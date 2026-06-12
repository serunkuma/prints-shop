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
| Scope | Hydrogen scaffold, Sanity schemas, Shopify/Printful setup path, Vite prototype preserved |
| Gate | Production app builds, core routes render, and Shopify/Sanity join by handle is demonstrated |

## Phase 2 — Hydrogen + Sanity Production

**Objective:** Complete and deploy the Hydrogen stack on Oxygen. Core routes live. Sanity schemas deployed. Visual Editing working. Domain connected. Sanity-powered product supplements for all launch products.

| Item | Detail |
|------|--------|
| Timeline | Immediately after Phase 1 foundation |
| Scope | Hydrogen build on Oxygen, Sanity schemas, Visual Editing |
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
| Scope | Marketing automation, reviews, dashboard |
| Gate | Phase 1 order volume |

## Future — AI Studio

**Objective:** AI print generation feature. Style-locked to Kumachi aesthetic via a fine-tuned model. Replicate + SDXL or Flux. Real-ESRGAN upscaling. Printful custom product API. Certificate of Generation.

| Item | Detail |
|------|--------|
| Timeline | Post-Phase 3 |
| Scope | AI Studio UI + API |
| Gate | Phase 3 editorial layer complete |

## Dependency Map

```
Phase 1 (production foundation)
  └── Phase 2 (Hydrogen/Oxygen launch) — needs core app and data contracts working
        └── Phase 3 (editorial) — needs Phase 2 routes working
              ├── Phase 4 (domain) — needs domain renewal (external dependency)
              └── Phase 5 (growth) — needs Phase 1 order volume
                    └── AI Studio — needs Phase 3 complete + separate API work
```

## Risks

| Risk | Likelihood | Severity | Mitigation |
|------|-----------|----------|------------|
| Product files below 150 DPI | Medium | High | Check DPI before uploading; Printful shows a warning |
| `kumachiprints.com` renewal delay | Low | Medium | Phase 1 on subdomain explicitly handles this |
| Printful quality issues | Low | High | Place test order before public launch |
| Oxygen plan eligibility | Low | High | Verify plan type (Basic+) before starting setup |
| Sanity API rate limits | Low | Low | Use CDN caching; Oxygen edge caching |

*Last updated: 2026-06*
