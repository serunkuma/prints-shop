# AI Studio — Implementation Blueprint

Status: Current

## Objective

The Kumachi AI Studio is a creative platform layered on top of Kumachi Prints. It uses open-weight AI image generation to let anyone create a one-of-a-kind art print in the Kumachi visual language — style-locked, culturally rooted, physically printable. This document defines the **launch state** (Phase 1–3) and the **future full platform** (Phases 4+).

## Two States

### Launch State (Current — Phases 1–3)

| Item | Detail |
|------|--------|
| What ships | Public `/create` demo page + waitlist capture |
| Generation | **None.** The `/create` runbook is a UI demo with animated placeholder, not a real AI generation |
| Capture | Email (required) + phone (optional) + separate email consent + SMS consent checkboxes |
| Waitlist | Subscribers stored in pending queue for future Listmonk import |
| Homepage | AI Studio teaser section with waitlist CTA |
| AI in storefront | Product attribute extraction (colour analysis, cultural context) is the only AI spillover into non-create pages; extracted attributes must be reviewed before becoming public filters |
| Auth | No auth required on `/create` — it is a public demo surface |
| Product references | The AI Studio is part of the Kumachi offer: creating AI art shaped by African heritage, culture, and the Kumachi visual language. Do not imply live AI ordering exists yet |

### Future State (Phase 4+ — Full Platform)

| Item | Detail |
|------|--------|
| Generation | Real FLUX.1-schnell (free tier) and FLUX.1-dev (paid tier) generation via Replicate |
| Style lock | LoRA fine-tuned on Kumachi artwork (trigger word: `kuma_style`) |
| Upscaling | Real-ESRGAN for print-resolution output |
| Auth | **Supabase Auth** for AI accounts only — separate from Shopify commerce accounts |
| Accounts | Supabase AI accounts: galleries, generation history, token balances |
| Tokens | Kuma Tokens (KT) — purchased in bundles or via monthly subscription |
| Payments | Stripe subscriptions + token top-ups (NOT Shopify billing — this is platform revenue, not product sales) |
| Ordering | Printful custom product API creates one-off products on order |
| Distribution | GraphQL AI layer (Apollo or urql in Hydrogen, Supabase Edge Functions server-side) |
| Certificates | Certificate of Generation PDF with unique ID, style lock signature, timestamp |
| Storefront AI | AI Enrichment layer (product mythology context, colour meaning, placement suggestions, Tales connection) cached in Supabase |

## Scope

**Launch scope:** Public `/create` demo with waitlist capture, email + phone capture with separate consent, AI Studio teaser on homepage.

**Future scope:** Full generation pipeline (LoRA training, Replicate API, Real-ESRGAN), Supabase Auth for AI accounts, Supabase schema (users, token_balances, token_transactions, generations, product_enrichments, subscriptions), Stripe subscription management, GraphQL AI layer, Printful custom product API integration, Certificate of Generation PDF, `/tales` mythology lore page, RLS policies.

**Never in scope:** Open-ended image generation (style is locked to Kumachi aesthetic), competing with Midjourney/DALL·E, real-time generation (images are generated asynchronously).

## Task Checklist

### Launch Tasks (Phases 1–3)

- [x] UI stub exists in Hydrogen at `app/routes/create.tsx`
- [x] Add email capture field to `/create` page (required)
- [x] Add phone (optional) capture field to `/create` page
- [x] Add separate email marketing consent checkbox (default unchecked)
- [x] Add separate SMS marketing consent checkbox (default unchecked, only shown if phone provided)
- [x] Store captured contacts in a pending queue (Sanity `contactCapture` documents) for future Listmonk import
- [x] Add AI Studio teaser section to homepage (`app/components/sections/AIPrintStudioTeaser.tsx`)
- [x] Wire waitlist CTA on homepage teaser → `/create` route
- [x] Update homepage copy to speak about AI Studio as part of the Kumachi offer (creating AI art shaped by African heritage, culture, and the Kumachi visual language)
- [ ] Display waitlist count on `/create` ("47 people on the waitlist") — deferred until the count is useful publicly
- [x] Do NOT wire real generation, real ordering, or auth gating

### Future Tasks (Phase 4+)

- [ ] Train/fine-tune a LoRA on Kumachi artwork style (Replicate FLUX trainer, 15–20 images, `kuma_style` trigger)
- [ ] Create Supabase project (`kumachi-ai`)
- [ ] Deploy Supabase database schema (users, token_balances, token_transactions, generations, product_enrichments, subscriptions)
- [ ] Configure Supabase Auth (email + Google OAuth)
- [ ] Write RLS policies for all tables
- [ ] Build prompt engineering layer (style presets → locked prompts)
- [ ] Build generation Edge Function: prompt → Replicate FLUX → output image
- [ ] Build Real-ESRGAN upscaling Edge Function
- [ ] Implement token deduction logic with transaction audit trail
- [ ] Build GraphQL layer (graphql-yoga on Supabase Edge Function or standalone server)
- [ ] GraphQL subscription for real-time generation progress
- [ ] Create Stripe products: Starter ($9/mo, 20 tokens), Creator ($25/mo, 75 tokens), Studio ($75/mo, 300 tokens), token top-up bundles
- [ ] Stripe webhook → Supabase Edge Function handler
- [ ] Monthly token top-up cron job (Supabase pg_cron)
- [ ] Build Certificate of Generation PDF
- [ ] Integrate with Printful custom product API for one-off print creation
- [ ] Launch `/ai-studio` route with full generation + ordering
- [ ] Replace `/create` demo page with full Studio
- [ ] Add AI Enrichment layer to PDP (mythology context, colour meaning, placement suggestions)
- [ ] Build `/tales` mythology lore page
- [ ] Implement usage tracking and cost analytics
- [ ] Monitor generation quality, collect feedback

## Deliverables

### Launch Deliverables
- Public `/create` demo with waitlist capture
- Email + phone capture with separate consent for email and SMS marketing
- AI Studio teaser section on homepage
- Waitlist stored for future Listmonk import

### Future Deliverables
- Full AI Studio route with generation, ordering, and payment
- Supabase AI accounts with galleries, tokens, and subscriptions
- GraphQL AI API layer
- Certificate of Generation PDF
- AI product enrichment on PDP
- Tales of Kuma mythology lore page

## Acceptance Criteria

### Launch Acceptance
A visitor can browse the `/create` demo page, see the Studio UI mockup, join the waitlist with email and optional phone, and see their consent preferences recorded. The homepage speaks about AI Studio confidently but does not imply live AI ordering exists.

### Future Acceptance
A user can visit the AI Studio, describe a print, see a generation in the Kumachi style, upscale it, and order it as a physical print that ships via Printful. The print arrives with a Certificate of Generation. Token balances, subscriptions, and Stripe billing work correctly. AI enrichment appears on product pages.

## Dependencies

### Launch Dependencies
- Hydrogen `/create` route exists (completed)
- AIPrintStudioTeaser component exists (completed)

### Future Dependencies
- Supabase project + account
- Replicate account or self-hosted Stable Diffusion infrastructure
- Stripe account with products configured
- Printful custom product API integration (separate from standard product sync)
- Sufficient waitlist demand to justify build investment
- LoRA training completion

*Last updated: 2026-06* (Updated: two-state blueprint — launch demo/waitlist (Current) + full platform (Future))
