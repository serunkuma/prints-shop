# Launch Account Setup Checklist

Status: Current

This checklist separates what is prepared in the repo from what Ernest must complete in external accounts before launch.

## Repo Prepared

- Hydrogen production app lives in `apps/hydrogen`.
- Root `studio/` is the canonical Sanity Studio.
- `apps/hydrogen/studio/` remains intentionally deleted.
- Root Studio has deploy files: `studio/package.json`, `studio/sanity.cli.ts`, and `studio/.env.example`.
- Hydrogen env templates exist at `apps/hydrogen/.env.example` and local placeholder `apps/hydrogen/.env`.
- No real tokens belong in git.
- `npm audit fix` for `studio/` currently leaves Sanity CLI/toolchain advisories that require a breaking Sanity major upgrade to fully clear; do not run `npm audit fix --force` during launch without a separate upgrade pass.

## Files Ernest Must Fill Locally

`apps/hydrogen/.env`:

```text
PUBLIC_STORE_DOMAIN=
PUBLIC_STOREFRONT_API_TOKEN=
SESSION_SECRET=
SANITY_PROJECT_ID=2wo9hx90
SANITY_ORGANIZATION_ID=o9GdYjNoE
SANITY_DATASET=production
SANITY_API_VERSION=2026-06-01
SANITY_API_READ_TOKEN=
SANITY_PREVIEW_SECRET=
```

Optional Studio env, only if overriding defaults:

```text
SANITY_STUDIO_PROJECT_ID=2wo9hx90
SANITY_STUDIO_DATASET=production
```

## Shopify Tasks

- Confirm Shopify plan supports Oxygen.
- Install/configure Hydrogen sales channel.
- Create Storefront API token.
- Configure payments, taxes, shipping, and store password.
- Create collections: `all`, `new-arrivals`, and launch collection/series handles.
- Confirm Shopify product handles match the `art-business` Woo mirror/export handles.

## Printful Tasks

- Connect Printful to Shopify.
- Pick at least 5 launch products.
- Upload final print files and resolve DPI warnings.
- Configure variants, retail prices, fulfillment settings, and return address.
- Confirm Printful-to-Shopify SKU/variant mapping.

## Sanity Tasks

- Confirm project `2wo9hx90`, organization `o9GdYjNoE`, dataset `production`.
- Create Hydrogen read-only token.
- Keep any write/admin token private for `art-business`.
- Deploy Studio from root `studio/`.
- Create/review `settings`, `navigation`, `homepage`, product supplements, artist docs, and series docs.
- Confirm every `productSupplement.shopifyHandle` matches Shopify exactly.

## Oxygen / GitHub Tasks

- Add GitHub secret: `OXYGEN_DEPLOYMENT_TOKEN`.
- Set Oxygen preview and production env vars.
- Deploy to Oxygen preview first.
- Connect `prints.kumachigallery.com`.
- Verify SSL.

## Final QA

- Test desktop and mobile.
- Test homepage, collections, product page, search, cart drawer, cart page.
- Test variant selection, add/update/remove cart item, and checkout redirect.
- Place one real test order.
- Confirm Shopify order, Printful receipt, tracking sync, and customer emails.
- Add Umami and Search Console only after checkout works.

*Last updated: 2026-06*
