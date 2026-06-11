# Shopify Store Setup & Configuration

Status: Current

## Store Requirements

- Shopify plan: Basic or higher (required for Oxygen hosting — Starter and Development stores do not qualify)
- Hydrogen sales channel: must be installed to enable Oxygen
- Storefront API: must be enabled via a custom app with appropriate scopes

## Storefront API Scopes Required

Create a custom app in Shopify admin → Apps → Develop apps:

```
Storefront API scopes:
  unauthenticated_read_product_listings
  unauthenticated_read_product_inventory
  unauthenticated_read_product_tags
  unauthenticated_read_selling_plans
  unauthenticated_read_collection_listings
  unauthenticated_read_checkouts
  unauthenticated_write_checkouts
  unauthenticated_read_customer_tags
  unauthenticated_read_content
```

## Product Structure

### Variants

Every print product has two variant dimensions:

1. **Size** — e.g. A4 (21×29.7cm), A3 (29.7×42cm), A2 (42×59.4cm), 50×70cm, 70×100cm
2. **Frame** — No Frame, Black Frame, White Frame, Natural Wood Frame

Variant combinations (Size × Frame) create the full variant matrix in Shopify.

### Required Metafields

Create these metafield definitions in Shopify admin (Settings → Custom data → Products):

| Namespace | Key | Type | Purpose |
|---|---|---|---|
| `kumachi` | `artist_name` | Single line text | Artist credit |
| `kumachi` | `print_technique` | Single line text | e.g. "Giclée on archival paper" |
| `kumachi` | `paper_type` | Single line text | e.g. "300gsm matte art" |
| `kumachi` | `edition_size` | Single line text | e.g. "Open edition" or "Limited to 50" |
| `kumachi` | `series_name` | Single line text | Which drop/series this print belongs to |

### Collections

Organise products into collections:

- By style: Abstract, Portrait, Landscape, Pattern, Cultural
- By room: Living Room, Bedroom, Office, Hallway
- By artist (one collection per artist)
- By series/drop (one collection per release)
- Special: New Arrivals, Best Sellers, Featured

## Printful Integration

Printful connects to Shopify as a product fulfilment source. Setup process:

1. Create a Printful account at printful.com
2. In Printful: Stores → Connect → Shopify → authorise
3. Create products in Printful (upload print files, configure sizes, set base prices)
4. Sync products to Shopify — Printful creates products with variant structure pre-set
5. Set Kumachi's retail prices in Shopify (Printful's base cost is the floor)

### Printful File Requirements

- Minimum resolution: 150 DPI at the largest print size offered
- Recommended: 300 DPI
- File format: PNG or TIFF preferred; JPEG acceptable if no transparency needed
- Colour profile: sRGB
- White border: 3mm bleed on all sides

### Printful Fulfilment Flow

```
Customer places order on Shopify
       ↓
Shopify notifies Printful via webhook
       ↓
Printful produces the print (1–3 business days)
       ↓
Printful ships directly to customer
       ↓
Tracking number written back to Shopify order
       ↓
Customer receives Shopify shipping notification
```

Kumachi never touches the physical product. This is the entire point.

## Checkout Configuration

- Checkout is handled by Shopify's hosted checkout (not customised in Hydrogen)
- Shopify Payments or Stripe as payment gateway
- Shipping zones: configure at minimum Uganda domestic + international
- Tax: configure per Shopify's tax rules for Uganda and destination countries

## Domain Configuration

### Phase 1: Subdomain launch

```
DNS (on kumachigallery.com registrar):
  Type: CNAME
  Name: prints
  Value: shops.myshopify.com
  TTL: 3600
```

In Shopify admin → Settings → Domains → Add existing domain → `prints.kumachigallery.com`

### Phase 2: Primary domain migration (when kumachiprints.com is renewed)

```
DNS (on kumachiprints.com registrar):
  Type: A
  Name: @
  Value: 23.227.38.65

  Type: CNAME
  Name: www
  Value: shops.myshopify.com
```

After DNS propagates, set `kumachiprints.com` as primary domain in Shopify. Set `prints.kumachigallery.com` to 301 redirect to `kumachiprints.com`.

## Environment Variables

These are set both in `.env` (local dev) and in Oxygen environment settings (production):

```
PUBLIC_STORE_DOMAIN=your-store.myshopify.com
PUBLIC_STOREFRONT_API_TOKEN=your_public_storefront_api_token
SESSION_SECRET=randomly_generated_string_minimum_32_chars

SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_sanity_read_token
SANITY_PREVIEW_SECRET=your_preview_secret_for_visual_editing
```

*Last updated: 2026-06-10*
