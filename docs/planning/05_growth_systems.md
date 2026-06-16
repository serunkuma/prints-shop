# Phase 5 — Growth Systems

Status: Planning

> **Note:** Customer contact capture (email, optional phone, consent checkboxes for email and SMS marketing) is a **launch requirement** and is handled in Phase 1. This phase covers the **sending infrastructure** — Listmonk on Fly.io, Resend SMTP, automated campaign flows, and reviews/retention.

## Objective

Build the owned campaign infrastructure and retention systems that turn first-time buyers into repeat customers. Deploy Listmonk on Fly.io with Postgres, configure Resend as the SMTP provider, build automated campaign flows, add product reviews, and integrate the Kumachi God Dashboard for unified revenue tracking across all four Empire properties.

## Scope

**In scope:** Listmonk deployment on Fly.io with Postgres, Resend SMTP configuration, newsletter/waitlist import from launch capture surfaces, post-purchase automation sequences, abandoned cart recovery flow (Listmonk campaign triggered by webhook), product review system with headless API support, God Dashboard integration via n8n + Shopify webhooks, related product recommendations.

**Out of scope:** AI Studio (separate future project), custom checkout, loyalty/rewards program (evaluate headless API support before committing), cross-property single sign-on, SMS marketing via Listmonk (requires documented provider and opt-out workflow first).

## Task Checklist

### Listmonk + Resend Infrastructure
- [ ] Deploy Listmonk on Fly.io with Postgres (see `docs/system/08_listmonk_resend_campaigns.md`)
- [ ] Configure Resend SMTP credentials in Listmonk
- [ ] Warm sending domain with Resend (send small volumes, gradually increase)
- [ ] Create Listmonk lists: Opening Drop, AI Studio Waitlist, Tales of Kuma, Collectors
- [ ] Define subscriber attributes in Listmonk: phone, source, interests, consent metadata
- [ ] Create API endpoint or webhook handler to push new subscribers from Hydrogen → Listmonk
- [ ] Import existing captured subscribers from launch phase
- [ ] Verify Listmonk double opt-in flow for email consent (CAN-SPAM compliant)
- [ ] Document opt-out/unsubscribe process in Listmonk settings

### Campaign Flows
- [ ] Create welcome sequence for new subscribers (instant + day 3 + day 7)
- [ ] Create post-purchase email sequence (order confirmation, shipping update, delivery, review request) — note: transactional order confirmation ships via Shopify, not Listmonk
- [ ] Create abandoned cart recovery flow (1hr, 24hr, 72hr emails) triggered by Shopify → n8n → Listmonk API
- [ ] Create Opening Drop campaign (preview + live + sold-out)
- [ ] Create AI Studio launch announcement campaign for waitlist subscribers

### Reviews & Retention
- [ ] Install product review system with headless Storefront API support (Judge.me or equivalent)
- [ ] Display review count and average rating on product cards and PDP
- [ ] Implement related products on PDP (Sanity-curated or algorithm-based)
- [ ] Create gift card product in Shopify
- [ ] Add restock notification button for out-of-stock variants

### God Dashboard
- [ ] Set up Shopify webhook for `orders/create` → n8n → update Notion revenue database
- [ ] Set up Shopify webhook for `orders/paid` → n8n → weekly revenue summary
- [ ] Build God Dashboard view for prints store revenue (Notion database + n8n)
- [ ] Add Umami analytics data feed into God Dashboard (weekly page view and revenue correlation)

### Verification
- [ ] Verify all retention flows end-to-end
- [ ] Monitor email deliverability and open rates
- [ ] A/B test abandoned cart email timing and messaging
- [ ] Confirm Listmonk campaigns have unsubscribe links in every email
- [ ] Confirm transactional Shopify emails are NOT routed through Listmonk (Shopify sends these directly)

## Deliverables

- Listmonk deployed on Fly.io, accepting subscribers via API
- Resend SMTP live and sending campaigns
- Automated post-purchase email sequence live (via Listmonk)
- Abandoned cart recovery flow running (Shopify → n8n → Listmonk)
- Welcome sequence for new subscribers
- Product reviews visible on PDP with star ratings
- Newsletter/Waitlist subscribers flowing from Hydrogen → Listmonk
- God Dashboard showing prints store revenue alongside other Empire properties
- Gift card product purchasable

## Acceptance Criteria

A customer who subscribes to the newsletter receives a welcome email within minutes. A customer who buys once receives automated order confirmation (via Shopify) and shipping update email. A customer who adds to cart but does not check out receives an abandoned cart email within 72 hours. Products with reviews display star ratings on search/collection pages and PDP. Ernest can see prints store revenue in the same Notion dashboard as his other properties, updated automatically via n8n webhooks. Every campaign email has a working unsubscribe link.

## Dependencies

- Phase 1 complete — store is live and generating orders
- Fly.io account with billing set up
- Resend account with verified sending domain
- n8n instance running (Ernest's infrastructure)
- Notion God Dashboard database schema defined
- Sufficient launch subscriber base to justify Listmonk deployment (at minimum, deploy when first captured subscriber exists)

*Last updated: 2026-06* (Updated: Klaviyo → Listmonk + Resend; contact capture is launch scope; sending is post-launch)
