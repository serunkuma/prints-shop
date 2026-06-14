# Selected Product Population

Status: Current

Hydrogen does not store products. It reads commerce data from Shopify and editorial supplements from Sanity. During launch setup, selected products come from the local Woo mirror through the `art-business` command center, then this repo creates Shopify draft products for Hydrogen to read.

## Boundary

`art-business` owns the upstream launch list:

```text
C:\wamp64\www\prints-local\art-business\artifacts\exports\shopify-launch-products.json
```

`prints-shop` owns the Shopify draft population script:

```text
apps/hydrogen/scripts/populate-products.mjs
```

The script is only for selected launch products. It is not a full-catalog bulk migration tool.

## Required Local Env

Create `apps/hydrogen/.env` from `apps/hydrogen/.env.example` and fill the private values locally:

```env
SHOPIFY_STORE_DOMAIN=
SHOPIFY_ADMIN_ACCESS_TOKEN=
SHOPIFY_API_VERSION=2026-04
```

The Admin token is private. Do not commit it, paste it into docs, or expose it to browser code.

## Workflow

From `C:\wamp64\www\prints-local\art-business`, generate the selected launch list:

```powershell
python .\scripts\artbiz.py catalog validate
python .\scripts\artbiz.py drops create --ids 15,22 --slug opening-drop --title "Opening Drop" --mode curated_open
python .\scripts\artbiz.py shopify launch-list --drop opening-drop
```

From `C:\Users\sirer\Documents\GitHub\prints-shop\apps\hydrogen`, dry-run the Shopify population:

```powershell
node scripts\populate-products.mjs --input C:\wamp64\www\prints-local\art-business\artifacts\exports\shopify-launch-products.json --dry-run
```

When the dry-run looks right, create/update Shopify draft products:

```powershell
node scripts\populate-products.mjs --input C:\wamp64\www\prints-local\art-business\artifacts\exports\shopify-launch-products.json --live
```

The script defaults to dry-run unless `--live` is present.

## What The Script Does

- Reads the selected launch list JSON.
- Preserves drop metadata when the launch list was generated from a drop manifest.
- Validates product handles, SKUs, variants, and local image files.
- Refuses unexpectedly large inputs unless explicitly allowed.
- Uploads local product images through Shopify staged uploads.
- Creates or updates Shopify products by handle.
- Sets products to `DRAFT`.
- Creates a `Size` option and selected size variants.
- Writes tags, SEO fields, vendor, product type, and `artbiz` metafields.

## What The Script Does Not Do

- It does not use Woo credentials.
- It does not use `localhost` image URLs as Shopify media.
- It does not publish products.
- It does not create Printful fulfillment mappings.
- It does not create Sanity `productSupplement` documents.
- It does not store commerce data in Sanity.

## Verification

After running live for one product:

```powershell
npm run typecheck
npm run build
npm run dev
```

Then check:

- Shopify admin shows the product as `DRAFT`.
- Handle matches the launch list.
- Product image, variants, SKUs, prices, tags, and metafields are present.
- Hydrogen route `/products/{handle}` renders real Shopify data.
- Cart add works only when the Shopify variant is available.

## Next Step After Shopify Drafts

Once Shopify handles are confirmed, create or sync Sanity `productSupplement` documents keyed by the same handle. Sanity adds story, artist, series, technique, and editorial imagery. Shopify remains the only source for price, variants, availability, cart, and checkout.
