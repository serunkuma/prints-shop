# Printful Integration

Status: Current

## Overview

Printful is the print-on-demand fulfilment partner. It connects to Shopify as an app, not to Hydrogen directly. The Hydrogen storefront never calls Printful's API — all Printful interaction happens via the Shopify ↔ Printful integration at the backend.

## Integration Architecture

```
Hydrogen storefront (frontend)
       ↓ Shopify Storefront API
Shopify (commerce layer)
       ↓ Printful Shopify App (webhook)
Printful (production + fulfilment)
       ↓
Customer (physical print delivered)
```

The storefront is fully decoupled from Printful. The developer never needs to integrate Printful directly.

## Shopify ↔ Printful Product Sync

Printful creates products in Shopify via its app. This means:

1. Products are created in **Printful** (file upload, size options, frame options)
2. Printful pushes these products to **Shopify** (titles, variants, prices auto-populated)
3. Kumachi adjusts **retail prices** in Shopify (Printful's base cost is the cost of goods)
4. Hydrogen reads products from **Shopify** — it never knows Printful exists

**Important:** do not manually create Printful-fulfilled products in Shopify. Always start in Printful so the fulfilment link is maintained.

## Product File Requirements

| Requirement | Minimum | Recommended |
|---|---|---|
| Resolution | 150 DPI at largest size | 300 DPI |
| Format | JPEG, PNG, TIFF | PNG or TIFF |
| Colour profile | sRGB | sRGB |
| Bleed | 3mm on all sides | 3mm |

For a 50×70cm print at 150 DPI: minimum 2953 × 4134 pixels.
For a 50×70cm print at 300 DPI: 5906 × 8268 pixels.

## Print Products to Create

For each art piece, create a Printful product with:

**Sizes offered:** A4 · A3 · A2 · 50×70cm · 70×100cm

**Frame variants:**
- Print only (no frame)
- Black frame
- White frame
- Natural wood frame

Not every size needs every frame option. A4 and A3 typically do not need 70×100cm frame options. Configure sensibly per product.

## Pricing Strategy

Set retail price in Shopify as: `Printful base cost × markup multiplier`

Suggested markup range: 2.5× to 4× depending on the product tier. Ernest sets final prices — this is a business decision.

Key principle: price for the perceived value of the art, not just the cost of goods. A print by a known artist in a premium frame should price like art, not like poster printing.

## Variant Naming Convention

Use consistent variant names across all products to enable clean filtering in Hydrogen:

- Size option name: `Size`
- Size values: `A4`, `A3`, `A2`, `50 x 70 cm`, `70 x 100 cm`
- Frame option name: `Frame`
- Frame values: `No Frame`, `Black Frame`, `White Frame`, `Natural Wood Frame`

Consistent naming enables the Hydrogen variant selector to render correctly across all products.

## Out of Stock Handling

If a Printful product is unavailable (e.g. paper stock issue), Printful marks the variant as out of stock in Shopify. Hydrogen should:
- Show "Out of stock" on the affected variant
- Not allow that variant to be added to cart
- Hydrogen's Shopify Storefront API returns `availableForSale: false` for OOS variants

## Shipping

Printful handles all shipping. It calculates shipping cost at checkout based on:
- Product type and size
- Customer delivery address
- Chosen shipping speed

Shopify passes the order to Printful at payment. Printful ships directly to the customer. Tracking is written back to Shopify.

## Returns & Quality Issues

Printful's policy:
- Printful reprints or refunds orders with production errors or quality defects
- Customer remorse returns are not accepted (print-on-demand items are made to order)
- Damage in transit: file a claim with Printful within 4 weeks of delivery

Ernest should create a Returns page (Sanity `page` document) that accurately reflects this policy.

*Last updated: 2026-06-10*
