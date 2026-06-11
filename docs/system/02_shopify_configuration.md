# Shopify Configuration

Status: Current

## Store Setup

1. Create Shopify store at `shopify.com/admin`
2. Choose **Basic plan or higher** — Starter and Development stores do not support Oxygen hosting
3. Set store currency to **USD**
4. Configure store settings (name, address, timezone)
5. Install Hydrogen sales channel: Settings → Apps and sales channels → Hydrogen → Install

## Storefront API

Create a custom app to get the Storefront API token:
1. Settings → Apps and sales channels → Develop apps → Create an app
2. Name: `Kumachi Prints Storefront`
3. Under Configuration → Storefront API integration, add the following scopes:

### Required API Scopes

| Scope | Purpose |
|-------|---------|
| `unauthenticated_read_product_listings` | Browse products |
| `unauthenticated_read_product_inventory` | Check availability |
| `unauthenticated_read_product_tags` | Tag-based filtering |
| `unauthenticated_read_selling_plans` | Subscription products (future) |
| `unauthenticated_read_collection_listings` | Browse collections |
| `unauthenticated_read_checkouts` | Read checkout state |
| `unauthenticated_write_checkouts` | Create/update checkouts |
| `unauthenticated_read_customer_tags` | Customer group targeting |
| `unauthenticated_read_content` | Read blog/articles (future) |

4. Save and install the app
5. Copy the **Storefront API access token** — this is `PUBLIC_STOREFRONT_API_TOKEN`

## Metafield Definitions

Create these in Settings → Custom data → Products → Add definition:

| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| `kumachi` | `artist_name` | Single line text | Artist credit |
| `kumachi` | `print_technique` | Single line text | e.g. "Giclée on archival paper" |
| `kumachi` | `paper_type` | Single line text | e.g. "300gsm matte art" |
| `kumachi` | `edition_size` | Single line text | "Open edition" or "Limited to 50" |
| `kumachi` | `series_name` | Single line text | Series/drop name |

## Collections Organization

| Type | Pattern | Example Handles |
|------|---------|-----------------|
| All products | `all` | — |
| By style | `{style-slug}` | `abstract`, `portrait`, `landscape` |
| By artist | `artist-{slug}` | `artist-amara-okafor` |
| By series | `drop-{slug}` | `drop-awakening`, `drop-earth-tones` |
| Special | descriptive | `new-arrivals`, `best-sellers`, `featured` |

## Printful Integration Setup

1. Create Printful account at `printful.com`
2. In Printful: Stores → Connect → Shopify → authorise Shopify connection
3. Create products in Printful (see `docs/data/04_printful_product_spec.md`)
4. Sync products to Shopify
5. Set retail prices in Shopify

## DNS Configuration

### Phase 1: Subdomain on kumachigallery.com

```
Type: CNAME
Name: prints
Value: shops.myshopify.com
TTL: 3600
```

Shopify admin → Settings → Domains → Add existing domain → `prints.kumachigallery.com`

### Phase 4: Primary domain on kumachiprints.com

```
Type: A
Name: @
Value: 23.227.38.65

Type: CNAME
Name: www
Value: shops.myshopify.com
```

## Oxygen Deployment Setup

1. Shopify admin → Hydrogen → Create storefront → Connect existing repository
2. Select `serunkuma/prints-shop`
3. Map `main` → Production environment
4. All other branches → Preview environment (auto)
5. Set environment variables in Oxygen (Production and Preview environments)
6. Add custom domain: prints.kumachigallery.com

## Rollback Procedure

If a production deploy breaks the store:

1. Shopify admin → Hydrogen → prints-shop → Production → View deployments
2. Find the last known-good deployment
3. Click `...` menu → Make this the current deployment
4. Rollback takes ~30 seconds

No code changes required for rollback. The previous deployment's compiled bundle is re-deployed.

## Redeployment After Environment Variable Changes

1. Shopify admin → Hydrogen → prints-shop → Production → Environment Variables
2. Edit the variable, save
3. System prompts to redeploy — confirm
4. This re-deploys the existing compiled code with new variables

Faster than a full deploy. No code change needed.

*Last updated: 2026-06*
