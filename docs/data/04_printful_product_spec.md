# Printful Product Specification

Status: Current

## File Requirements

| Requirement | Minimum | Recommended | Notes |
|-------------|---------|-------------|-------|
| Resolution | 150 DPI at largest size | 300 DPI | Lower than 150 DPI produces visible pixelation at print size |
| Format | JPEG, PNG, TIFF | PNG or TIFF | JPEG acceptable if no transparency needed |
| Colour profile | sRGB | sRGB | CMYK files may produce unexpected colour shifts |
| Bleed | 3mm | 3mm | Content should extend 3mm beyond trim on all sides |

### Exact Pixel Dimensions

For a **50×70cm** print:

| DPI | Width (px) | Height (px) |
|-----|-----------|-------------|
| 150 | 2953 | 4134 |
| 300 | 5906 | 8268 |

For a **70×100cm** print:

| DPI | Width (px) | Height (px) |
|-----|-----------|-------------|
| 150 | 4134 | 5906 |
| 300 | 8268 | 11811 |

For an **A2** print (42×59.4cm):

| DPI | Width (px) | Height (px) |
|-----|-----------|-------------|
| 150 | 2480 | 3508 |
| 300 | 4961 | 7016 |

## Size / Frame Variant Naming Convention

Must be consistent across all products for the Hydrogen variant selector to work correctly:

### Size Option

- Option name: `Size`
- Values: `A4`, `A3`, `A2`, `50 x 70 cm`, `70 x 100 cm`

### Frame Option

- Option name: `Frame`
- Values: `No Frame`, `Black Frame`, `White Frame`, `Natural Wood Frame`

### Size-Frame Matrix

Not every combination needs to exist. Configure per product:

| Size | No Frame | Black Frame | White Frame | Natural Wood Frame |
|------|----------|-------------|-------------|-------------------|
| A4 | ✅ | ✅ | ✅ | ✅ |
| A3 | ✅ | ✅ | ✅ | ✅ |
| A2 | ✅ | ✅ | ✅ | ✅ |
| 50×70cm | ✅ | ✅ | ✅ | ✅ |
| 70×100cm | ✅ | ⬜ | ⬜ | ⬜ |

## Pricing Strategy

**Formula:** `Retail price = Printful base cost × markup multiplier`

| Tier | Multiplier | Example |
|------|-----------|---------|
| Standard open edition | 2.5× – 3× | Base $15 → Retail $38–$45 |
| Premium open edition | 3× – 3.5× | Base $25 → Retail $75–$88 |
| Limited edition | 3.5× – 4× | Base $30 → Retail $105–$120 |

Price like art, not like a poster shop. The perceived value comes from the artist, the edition type, the storytelling layer, and the framing quality — not just the cost of materials.

## Printful Fulfilment Flow

```
Customer places order on Shopify
  ↓ Shopify webhook notification
Printful receives order
  ↓ 1–3 business days
Printful produces the print
  ↓
Printful ships directly to customer
  ↓
Tracking number written back to Shopify order
  ↓
Customer receives Shopify shipping notification
```

Kumachi never touches the physical product.

## Returns Policy

| Issue | Policy |
|-------|--------|
| Production error / quality defect | Printful reprints or refunds |
| Customer remorse / changed mind | Not accepted (made-to-order items) |
| Damage in transit | File claim within 4 weeks of delivery |
| Lost package | File claim with Printful |

The Returns page (Sanity `page` document) must reflect this policy accurately.

## Creating Printful Products

1. Log in to Printful
2. Products → Create product → choose product type (Art Print, Framed Print, Canvas)
3. Upload print file (verify ≥150 DPI — Printful shows a warning if below minimum)
4. Configure sizes and frame variants
5. Set Printful base prices (cost of goods)
6. Sync to Shopify (Printful dashboard → Sync)
7. In Shopify: adjust retail prices on the synced product's variants
8. In Shopify: add product to relevant collections

**Important:** Do not create Printful-fulfilled products manually in Shopify. Always start in Printful so the fulfilment link is maintained.

## Out of Stock Handling

If Printful is unable to produce a variant (paper stock issue, etc.), it marks the variant as out of stock in Shopify. The Storefront API returns `availableForSale: false` for these variants. Hydrogen's VariantSelector should show them as unavailable and prevent add-to-cart.

## Shipping

Printful handles all shipping:
- Calculated at checkout based on product type, size, and delivery address
- Multiple speed options available
- Tracking written back to Shopify automatically

*Last updated: 2026-06*
