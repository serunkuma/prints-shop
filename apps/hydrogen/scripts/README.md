# Scripts

## `populate-products.mjs`

Creates Shopify `DRAFT` products from the art-business launch list JSON. Uses the Shopify Admin API `productSet` mutation with image upload via `stagedUploadsCreate`.

### Prerequisites

Environment variables (loaded from `.env` in `apps/hydrogen`):

| Var | Purpose |
|-----|---------|
| `SHOPIFY_STORE_DOMAIN` | Shopify store domain (e.g. `kumachi-prints.myshopify.com`) |
| `SHOPIFY_ADMIN_ACCESS_TOKEN` | Admin API token with `write_products` scope |
| `SHOPIFY_API_VERSION` | Default: `2026-04` |

### Usage

```bash
node scripts/populate-products.mjs --input <path-to-json> [options]
```

### Flags

| Flag | Description |
|------|-------------|
| `--input <path>` | **Required.** Path to `shopify-launch-products.json` from art-business |
| `--dry-run` | Validate and log, but do not create products (default unless `--live`) |
| `--live` | Execute the Shopify API mutations |
| `--allow-large` | Allow processing more than the default 25-product limit |
| `--max-products <n>` | Override the max product limit (default: 25) |

### Workflow

```bash
# 1. Generate launch list from art-business
cd C:\wamp64\www\prints-local\art-business
python .\scripts\artbiz.py shopify launch-list --ids ...

# 2. Dry-run validation
cd apps\hydrogen
node scripts\populate-products.mjs --input C:\wamp64\www\prints-local\art-business\artifacts\exports\shopify-launch-products.json --dry-run

# 3. Live creation (creates Shopify DRAFT products)
node scripts\populate-products.mjs --input <same path> --live
```
