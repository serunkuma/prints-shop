# Project Roadmap & Phases

Status: Current

## Vision

Kumachi Prints is the revenue-generating commerce arm of the Kumachi Empire. It should be live, selling, and generating revenue as fast as possible. Speed to first sale is the primary metric for Phase 1. Subsequent phases add editorial depth, customer retention, and automation.

## Phase 1 — First Sale (Target: This Week)

**Objective:** Get the store live on `prints.kumachigallery.com` with at least 5 real products, a working checkout, and analytics running.

### Task checklist

- [ ] Shopify store created (Basic plan or higher)
- [ ] Hydrogen sales channel installed in Shopify
- [ ] Printful account created and connected to Shopify
- [ ] 5+ print products created in Printful (files uploaded, sizes configured, synced to Shopify)
- [ ] Retail prices set in Shopify
- [ ] Shopify collections created (at minimum: All Prints, New Arrivals)
- [ ] Shopify Storefront API token obtained
- [ ] Sanity project created, dataset `production` initialised
- [ ] Repository cloned from `frontvibe/fluid` and pushed to `serunkuma/prints-shop`
- [ ] `.env` configured with all required variables
- [ ] `npm run dev` runs without errors
- [ ] Homepage route renders with at least a hero and featured products
- [ ] Collection page renders Shopify products
- [ ] Product detail page renders product with variants
- [ ] Add to cart works (variant selection → cart drawer opens)
- [ ] Checkout redirect works (cart → Shopify hosted checkout)
- [ ] GitHub repository connected to Oxygen
- [ ] Environment variables set in Oxygen
- [ ] DNS record created for `prints.kumachigallery.com`
- [ ] Domain verified and SSL active
- [ ] Umami tracking script installed and recording visits
- [ ] Google Search Console property added for `prints.kumachigallery.com`
- [ ] Sitemap generated and submitted
- [ ] Mobile experience tested on real device
- [ ] First test order placed and Printful fulfilment triggered

### Deliverables
- Live store at `https://prints.kumachigallery.com`
- At least 5 purchasable products
- Functioning analytics
- First real test order

### Acceptance criteria
A real customer can browse, add to cart, and complete checkout. Printful receives and processes the order. Umami records the session.

---

## Phase 2 — Editorial Foundation (2–4 weeks post launch)

**Objective:** Build the content layer that differentiates Kumachi Prints from commodity print shops. Drops, artist profiles, and storytelling.

### Task checklist

- [ ] Sanity schemas fully implemented: productSupplement, artist, series, page, settings
- [ ] Sanity Studio deployed to production (`your-project.sanity.studio`)
- [ ] Sanity Visual Editing working on production
- [ ] `/drops` listing page built
- [ ] `/drops/:handle` editorial drop landing page built
- [ ] `/artists` listing page built
- [ ] `/artists/:handle` artist profile page built
- [ ] All existing products have `productSupplement` documents with story and technique
- [ ] All artist documents created
- [ ] At least 2 series documents published (retroactive drops from Ernest's back catalogue)
- [ ] About page (Sanity `page` document) live
- [ ] Shipping & Returns page live
- [ ] 404 page designed and implemented
- [ ] OG images for all key pages

### Deliverables
- Full editorial layer in Sanity
- Artist and series pages live
- Ernest can update content without code changes

### Acceptance criteria
Ernest can log into Sanity Studio, create a new series, add products to it, publish, and see the drop page go live without any developer involvement.

---

## Phase 3 — Domain Migration & SEO (when `kumachiprints.com` is renewed)

**Objective:** Move the store to its permanent home with zero downtime.

### Task checklist

- [ ] `kumachiprints.com` renewed at registrar
- [ ] Domain added to Shopify (Settings → Domains)
- [ ] DNS updated at registrar (A record + CNAME)
- [ ] DNS propagation confirmed
- [ ] `kumachiprints.com` set as primary domain in Oxygen
- [ ] 301 redirect set from `prints.kumachigallery.com` → `kumachiprints.com`
- [ ] Google Search Console property added for `kumachiprints.com`
- [ ] Sitemap updated with new domain
- [ ] Old domain canonical URLs not showing in Search Console

### Acceptance criteria
`kumachiprints.com` is the live store. `prints.kumachigallery.com` redirects cleanly. No broken links. No duplicate content signals.

---

## Phase 4 — Growth & Retention (4–8 weeks post launch)

**Objective:** Build systems that turn first-time buyers into repeat customers.

### Task checklist

- [ ] Email marketing integration (Klaviyo or similar) — post-purchase flow, abandoned cart
- [ ] Product review system (Judge.me or similar — must have headless API support)
- [ ] Loyalty / rewards program — evaluate headless API support before committing
- [ ] Social proof: review count visible on PDPs
- [ ] Newsletter signup in footer connected to email platform
- [ ] Restock notifications for OOS variants
- [ ] Related products on PDP (algorithm-based or manually curated in Sanity)
- [ ] Gift card product

### Acceptance criteria
A customer who buys once receives at minimum an automated post-purchase email sequence. Abandoned carts trigger a recovery email.

---

## Phase 5 — Kumachi God Dashboard Integration

**Objective:** Connect the prints store data to the Kumachi God Dashboard (Notion + n8n) so Ernest has a unified view of revenue across all four properties.

### Task checklist

- [ ] Shopify webhook for new orders → n8n → update Notion revenue database
- [ ] Weekly revenue summary pulled into Notion God Dashboard
- [ ] New product launch automation: create Sanity series document → n8n → schedule social posts via X and Meta API
- [ ] Umami analytics read into God Dashboard weekly

### Acceptance criteria
Ernest can see prints store revenue in the same Notion dashboard as his other properties, updated automatically.

---

## Dependencies

```
Phase 1 (launch)
  └── Phase 2 (editorial) — depends on Phase 1 being live
        └── Phase 3 (domain migration) — depends on domain renewal (external)
              └── Phase 4 (retention) — depends on Phase 1 traffic to convert
                    └── Phase 5 (dashboard) — depends on all four Kumachi properties being live
```

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Printful file quality below 150 DPI | Medium | Check DPI before creating products; Printful shows a warning |
| `kumachiprints.com` renewal delays | Low | Phase 1 on subdomain explicitly handles this |
| Sanity Visual Editing complexity | Low | Fluid starter pre-configures it |
| Shopify payment gateway approval | Low | Stripe is the fallback |
| Oxygen not available on plan | Low | Verify plan type before starting |

*Last updated: 2026-06-10*
