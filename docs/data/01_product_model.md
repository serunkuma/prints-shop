# Product Data Model

Status: Current

The product model is split across two systems: Shopify (commerce data) and Sanity (editorial data). They are joined by the Shopify product handle, which must match exactly across both systems.

## Part 1: Shopify Side

### Product Fields

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| Title | string | Printful sync | Auto-populated from Printful; editable in Shopify |
| Handle | string | Shopify auto | Auto-generated from title; must match Sanity `productSupplement.shopifyHandle` |
| Description | string | Shopify | Short description; extended story goes in Sanity productSupplement |
| Images | array of image | Printful sync | Product photos; use Hydrogen `<Image>` component |
| Status | enum | Shopify | `active`, `draft`, `archived` |
| Product type | string | Printful sync | e.g. "Art Print" |
| Vendor | string | Printful sync | e.g. "Kumachi" |

### Variant Structure

Every print product has two option dimensions:

**Option 1: Size**
- `A4` (21×29.7cm)
- `A3` (29.7×42cm)
- `A2` (42×59.4cm)
- `50 x 70 cm`
- `70 x 100 cm`

**Option 2: Frame**
- `No Frame` (print only)
- `Black Frame`
- `White Frame`
- `Natural Wood Frame`

Not every size needs every frame option. A4 and A3 typically do not need 70×100cm frame options. Configure sensibly per product.

### Pricing

All prices in Shopify are in **cents** (integers). The Hydrogen utility `formatPrice()` converts cents to USD display strings.

Retail price = Printful base cost × markup multiplier (2.5× to 4× depending on product tier).

### Metafield Definitions

Create these metafield definitions in Shopify admin (Settings → Custom data → Products):

| Namespace | Key | Type | Purpose |
|-----------|-----|------|---------|
| `kumachi` | `artist_name` | Single line text | Artist credit |
| `kumachi` | `print_technique` | Single line text | e.g. "Giclée on archival paper" |
| `kumachi` | `paper_type` | Single line text | e.g. "300gsm matte art" |
| `kumachi` | `edition_size` | Single line text | "Open edition" or "Limited to 50" |
| `kumachi` | `series_name` | Single line text | Which drop/series this print belongs to |

### Collection Types and Naming

| Collection Type | Naming Convention | Examples |
|----------------|-------------------|----------|
| By style | Style name | Abstract, Portrait, Landscape, Pattern, Cultural |
| By room | Room name | Living Room, Bedroom, Office, Hallway |
| By artist | Artist name | Amara Okafor, Kofi Mensah |
| By series/drop | drop-[series-slug] | drop-awakening, drop-earth-tones |
| Special | Descriptive | New Arrivals, Best Sellers, Featured |

## Part 2: Sanity Side

### Product Supplement Document

Keyed to a Shopify product handle. Adds editorial content that Shopify cannot carry.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | string | auto | `"supplement-" + shopifyHandle` |
| `shopifyHandle` | string | required | Must match Shopify product handle exactly |
| `artistRef` | reference → artist | optional | Reference to artist document |
| `story` | portableText | optional | The narrative behind this print |
| `technique` | string | optional | e.g. "Giclée print on 300gsm archival paper" |
| `inspiration` | portableText | optional | What inspired this piece |
| `additionalImages` | array of imageWithAlt | optional | Lifestyle shots, framing mockups |
| `seriesRef` | reference → series | optional | Reference to series/drop document |
| `seo` | seoFields | optional | Overrides Shopify product SEO if set |

### What Must Never Be in a Product Supplement

- **Prices** — prices live in Shopify variant data
- **Variant information** — sizes, frames, availability live in Shopify
- **Inventory counts** — inventory is managed by Printful, tracked in Shopify

*Last updated: 2026-06*
