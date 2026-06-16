# Drops And Releases

Status: Current

A Kumachi drop is a curated release event. It is not only a product upload.

For the first sale, use a **Curated Open Drop**: 5-10 selected artworks, one release story, Shopify draft products, one Shopify collection, one Sanity `series` document, and one Hydrogen drop page.

## Production Contract

| System | Owns | Example |
|--------|------|---------|
| `art-business` | Drop manifest and selected product launch list | `inputs/drops/opening-drop.json` |
| Shopify | Purchasable products and product group | collection handle `opening-drop` |
| Sanity | Editorial drop story | `series` slug `opening-drop` |
| Hydrogen | Storefront route that joins story and products | `/drops/opening-drop` |

Product handles join Shopify products to Sanity `productSupplement` documents. Collection handles join Sanity `series` documents to Shopify collections.

## First Drop Defaults

```text
title: Opening Drop
slug: opening-drop
mode: curated_open
shopifyCollectionHandle: opening-drop
Sanity document type: series
Hydrogen route: /drops/opening-drop
```

## Drop Modes

| Mode | Meaning | Use now? |
|------|---------|----------|
| `curated_open` | Products stay available after launch unless manually archived | Yes |
| `timed_drop` | Products are promoted for a limited window | Later |
| `limited_edition_drop` | Edition size, certificate, inventory, and scarcity mechanics are enforced | Later |

## Launch Workflow

1. Create a drop manifest in `art-business`.
2. Generate `shopify-launch-products.json`.
3. Dry-run `apps/hydrogen/scripts/populate-products.mjs`.
4. Create Shopify draft products.
5. Create Shopify collection `opening-drop`.
6. Create Sanity `series` document with `shopifyCollectionHandle=opening-drop`.
7. Create/review product supplements for every selected product handle.
8. Verify `/drops/opening-drop`, PDPs, cart, and checkout.
9. Place one real test order before announcing.

## Storefront Expectations

Hydrogen `/drops/:handle` should:

- load Sanity `series` by slug
- load Shopify collection products by `series.shopifyCollectionHandle`
- render the drop even if optional hero imagery is missing
- show the release story, product grid, and clear buying CTAs
- never store prices, inventory, or variants in Sanity

## Industry Notes

Print-release practice treats drops as release moments with setup, reveal, sale, and wrap phases. Good releases combine curation, story, collector trust, and follow-up. Scarcity tools such as countdowns, waitlists, certificates, and numbered editions are valuable, but should be added after the first open drop proves the purchase flow.

Reference URLs:

- `https://www.theprintspace.co.uk/help/knowledge-base/how-to-run-a-time-limited-print-sale/`
- `https://www.theprintspace.com/limited-edition-art-prints-on-demand/`
- `https://preproduct.io/best-practises-for-pre-selling-a-limited-edition-on-shopify/`
- `https://support.finerworks.com/help-my-prints/8-strategies-for-boosting-the-value-of-your-prints/`
- `https://www.artworkarchive.com/blog/mastering-print-editions-a-guide-to-organizing-tracking-and-cataloging`
- `https://fairart.com/editorial/guide/what-s-all-the-hype-around-timed-editions/48`
