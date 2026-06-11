# Phase 4 — Domain Migration

Status: Planning

## Objective

Zero-downtime move from `prints.kumachigallery.com` to `kumachiprints.com`. The store remains live throughout. After migration, `prints.kumachigallery.com` permanently redirects to `kumachiprints.com` via 301. All SEO signals transfer cleanly. No duplicate content issues arise.

## Scope

**In scope:** DNS updates, domain addition to Shopify and Oxygen, primary domain switch, 301 redirect configuration, Google Search Console setup for new domain, sitemap update, canonical URL verification.

**Out of scope:** Content changes, feature additions, design updates. This is purely an infrastructure and SEO migration.

## Task Checklist

- [ ] Verify `kumachiprints.com` domain renewal is active at registrar
- [ ] Add `kumachiprints.com` to Shopify: Settings → Domains → Add existing domain
- [ ] Update DNS at registrar:
  - [ ] A record: `@` → `23.227.38.65`
  - [ ] CNAME: `www` → `shops.myshopify.com`
- [ ] Wait for DNS propagation (15 minutes — 24 hours)
- [ ] Verify DNS propagation using `dig kumachiprints.com` or online DNS checker
- [ ] Set `kumachiprints.com` as primary domain in Oxygen: Hydrogen → prints-shop → Production → Domains
- [ ] Set 301 redirect from `prints.kumachigallery.com` to `kumachiprints.com` in Shopify admin
- [ ] Add Google Search Console property for `kumachiprints.com` (DNS TXT verification)
- [ ] Update sitemap route to use `kumachiprints.com` as canonical base URL
- [ ] Update `robots.txt` with new sitemap URL
- [ ] Verify `prints.kumachigallery.com/products/handle` redirects to `kumachiprints.com/products/handle`
- [ ] Verify no broken links across the site
- [ ] Check Search Console for duplicate content warnings
- [ ] Update all internal cross-references in documentation (AGENTS.md, RUNBOOK.md, docs/)
- [ ] Update `.env.example` if domain variable patterns changed
- [ ] Notify Umami if the tracked domain needs updating

## Deliverables

- `kumachiprints.com` is the live, canonical store domain
- `prints.kumachigallery.com` permanently redirects (301)
- Google Search Console active for both domains with correct ownership
- No broken links or duplicate content signals

## Acceptance Criteria

Visiting `kumachiprints.com` loads the store. Visiting `prints.kumachigallery.com` immediately redirects to `kumachiprints.com`. The redirect preserves the URL path (`/products/handle` stays `/products/handle`). All product and collection URLs use the new domain. Search Console shows the new domain as the canonical source. SSL certificates auto-provision on both domains.

## Dependencies

- `kumachiprints.com` must be renewed at the registrar
- DNS access at the `kumachiprints.com` registrar
- Phase 2 complete (Oxygen storefront live and stable)

*Last updated: 2026-06*
