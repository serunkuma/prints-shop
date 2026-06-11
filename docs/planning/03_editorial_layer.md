# Phase 3 — Editorial Layer

Status: Planning

## Objective

Build everything that differentiates Kumachi Prints from a commodity print shop. Drops/series pages with editorial storytelling, artist profiles with biography and featured work, CMS-managed static pages (About, FAQ, Shipping, Returns), and a component library. After this phase, Ernest can publish a new drop entirely from Sanity Studio without any developer involvement.

## Scope

**In scope:** Drop/series listing and detail pages, artist listing and profile pages, CMS-managed static pages, editorial section components (EditorialBanner, SeriesCard, ArtistCard, PortableText), 404 error page, OG images for all key pages, component documentation.

**Out of scope:** Customer accounts, order history, product reviews, email marketing, loyalty/rewards, AI Studio.

## Task Checklist

- [ ] Create `app/components/editorial/SeriesCard.tsx` — drop thumbnail card
- [ ] Create `app/components/editorial/ArtistCard.tsx` — artist profile card
- [ ] Create `app/components/editorial/PortableText.tsx` — Sanity Portable Text renderer with custom blocks (productEmbed, imageBlock)
- [ ] Create `app/components/sections/EditorialBannerSection.tsx` — full-width editorial banner
- [ ] Create `app/components/sections/TestimonialsSection.tsx` — testimonial carousel
- [ ] Implement `app/routes/drops._index.tsx` — drops listing page querying Sanity for all `series` with `status == "live"`
- [ ] Implement `app/routes/drops.$handle.tsx` — editorial drop landing page with series data and featured products
- [ ] Implement `app/routes/artists._index.tsx` — artists listing page
- [ ] Implement `app/routes/artists.$handle.tsx` — artist profile page with bio, portrait, and associated products
- [ ] Create About page in Sanity (`page` document)
- [ ] Create Shipping & Returns page in Sanity (reflect Printful's no-remorse-returns policy)
- [ ] Create FAQ page in Sanity
- [ ] Create Contact page in Sanity
- [ ] Create Privacy Policy page in Sanity
- [ ] Design and implement custom 404 error page
- [ ] Implement staggered route transition animations
- [ ] Add OG image generation for all editorial pages
- [ ] Create at least 2 series documents in Sanity (retroactive drops from back catalogue)
- [ ] Create artist documents for all artists represented in the product catalogue
- [ ] Link product supplements to series and artist references
- [ ] Verify Ernest can create a new series, add products, publish, and see the drop page live
- [ ] Verify the `/drops` listing page only shows `live` series
- [ ] Add announcement bar integration — Ernest can set promo text in Sanity settings
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes

## Deliverables

- Drops listing page (`/drops`) showing live series
- Drop detail pages (`/drops/:handle`) with editorial content and products
- Artist listing page (`/artists`)
- Artist profile pages (`/artists/:handle`)
- CMS-managed static pages (About, FAQ, Shipping, Contact, Privacy)
- Custom 404 error page
- Ernest can publish content independently

## Acceptance Criteria

Ernest logs into Sanity Studio, creates a new series document, sets it to `live`, adds featured products, publishes. The new drop appears on `/drops` automatically. The drop page shows hero image, description, and product grid. No code changes required. TypeScript and build pass with zero errors.

## Dependencies

- Phase 2 complete — Oxygen deployment and Sanity schemas live
- At least 2 series identifiable from the back catalogue
- All artists for launch products have Sanity documents

*Last updated: 2026-06*
