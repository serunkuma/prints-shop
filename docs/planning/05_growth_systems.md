# Phase 5 — Growth Systems

Status: Planning

## Objective

Build systems that turn first-time buyers into repeat customers. Email marketing automation, product reviews, retention flows, and the Kumachi God Dashboard integration for unified revenue tracking across all four Empire properties.

## Scope

**In scope:** Email marketing platform integration (Klaviyo or equivalent at 100 orders), product review system with headless API support, post-purchase automation, abandoned cart recovery, newsletter subscription, God Dashboard integration via n8n + Shopify webhooks, related product recommendations.

**Out of scope:** AI Studio (separate future project), custom checkout, loyalty/rewards program (evaluate headless API support before committing), cross-property single sign-on.

## Task Checklist

- [ ] Install and configure Klaviyo (or equivalent) once order volume reaches 100 orders
- [ ] Set up Shopify-Klaviyo integration via API or app
- [ ] Create post-purchase email sequence (order confirmation, shipping update, delivery, review request)
- [ ] Create abandoned cart recovery flow (1hr, 24hr, 72hr emails)
- [ ] Welcome sequence for new subscribers
- [ ] Install product review system with headless Storefront API support (Judge.me or equivalent)
- [ ] Display review count and average rating on product cards and PDP
- [ ] Add newsletter signup form to footer (connected to email platform)
- [ ] Implement related products on PDP (Sanity-curated or algorithm-based)
- [ ] Create gift card product in Shopify
- [ ] Add restock notification button for out-of-stock variants
- [ ] Set up Shopify webhook for `orders/create` → n8n → update Notion revenue database
- [ ] Set up Shopify webhook for `orders/paid` → n8n → weekly revenue summary
- [ ] Build God Dashboard view for prints store revenue (Notion database + n8n)
- [ ] Add Umami analytics data feed into God Dashboard (weekly page view and revenue correlation)
- [ ] Verify all retention flows end-to-end
- [ ] Monitor email deliverability and open rates
- [ ] A/B test abandoned cart email timing and messaging

## Deliverables

- Automated post-purchase email sequence live
- Abandoned cart recovery running
- Product reviews visible on PDP
- Newsletter signup collecting subscribers
- God Dashboard showing prints store revenue alongside other Empire properties
- Gift card product purchasable

## Acceptance Criteria

A customer who buys once receives at minimum an automated order confirmation and shipping update email. A customer who adds to cart but does not check out receives an abandoned cart email within 72 hours. Products with reviews display star ratings on search/collection pages and PDP. Ernest can see prints store revenue in the same Notion dashboard as his other properties, updated automatically via n8n webhooks.

## Dependencies

- Phase 1 complete — store is live and generating orders
- Minimum 100 orders to justify Klaviyo investment
- n8n instance running (Ernest's infrastructure)
- Notion God Dashboard database schema defined

*Last updated: 2026-06*
