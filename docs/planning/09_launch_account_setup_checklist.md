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
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=
SHOP_ID=
SESSION_SECRET=
SANITY_PROJECT_ID=2wo9hx90
SANITY_ORGANIZATION_ID=o9GdYjNoE
SANITY_DATASET=production
SANITY_API_VERSION=2026-06-01
SANITY_API_READ_TOKEN=
SANITY_PREVIEW_SECRET=
SHOPIFY_STORE_DOMAIN=
SHOPIFY_ADMIN_ACCESS_TOKEN=
SHOPIFY_API_VERSION=2026-04
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
- Create collection `opening-drop` for `Opening Drop`.
- Use `art-business` to generate a selected launch list, then use `apps/hydrogen/scripts/populate-products.mjs --dry-run` before any `--live` Shopify draft population.
- Confirm Shopify product handles match the `art-business` Woo mirror/export handles.

### Customer Account & Contact Setup (Shopify)

- [ ] Enable Shopify Customer Accounts in admin: Settings → Checkout → Customer accounts → "Accounts are required" or "Accounts are optional"
- [ ] Configure Customer Account API in the Hydrogen sales channel:
  - Callback URI: `https://<your-domain>/account/authorize`
  - JavaScript origin: `https://<your-domain>`
  - Logout URI: `https://<your-domain>`
  - Client type: Public
- [ ] Copy Customer Account API credentials into env:
  - `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID`
  - `SHOP_ID`
- [ ] Configure transactional email settings in Shopify admin: Settings → Notifications
  - Verify order confirmation email template is active and customised
  - Verify fulfillment notification email template is active
  - Verify shipping update email template is active
  - Verify customer account invite/welcome email is configured
  - Verify Shopify-hosted customer account recovery/login assistance messaging is configured
- [ ] Configure Shopify marketing consent fields: Shopify captures email marketing consent at checkout; custom consent should be captured through checkout, newsletter, `/create`, or a separate account preferences surface, not assumed inside Shopify-hosted login
- [ ] Test complete customer flow end-to-end:
  1. Customer starts login via `/account/login`
  2. Customer completes Shopify-hosted Customer Account API login
  3. Customer returns through `/account/authorize`
  4. Customer can view order history at `/account/orders`
  5. Customer can view single order detail at `/account/orders/:orderId`
  6. Customer can access Shopify-hosted recovery/login assistance from the Customer Account API login flow
- [ ] Verify consent audit: Shopify customer records and local waitlist/contact records should show marketing consent status with timestamps where applicable

## Printful Tasks

- Connect Printful to Shopify.
- Pick at least 5 launch products.
- Upload final print files and resolve DPI warnings.
- Configure variants, retail prices, fulfillment settings, and return address.
- Confirm Printful-to-Shopify SKU/variant mapping.

## Contact Capture & Consent Tasks (Launch Scope)

- [ ] Add account preferences/contact capture surface if account customers need to manage email/SMS consent outside checkout
- [ ] Add newsletter capture in footer with email field + email marketing consent checkbox
- [x] Add AI Studio waitlist capture on `/create` with:
  - Email (required)
  - Phone (optional, with note: "for SMS updates if consented")
  - Separate email marketing consent checkbox (default unchecked)
  - Separate SMS marketing consent checkbox (default unchecked, only if phone provided)
- [ ] Record consent metadata with every opt-in: consent text shown, consentedAt (ISO timestamp), source page, IP address, user agent
- [x] Store captured contacts as Sanity `contactCapture` documents for future Listmonk import
- [ ] Do NOT route captured contacts to any live sending system in launch scope — capture only

## Listmonk/Resend Campaigns (Post-Launch — Not a Launch Blocker)

- [ ] Deploy Listmonk on Fly.io with Postgres (see `docs/system/08_listmonk_resend_campaigns.md`)
- [ ] Configure Resend SMTP in Listmonk
- [ ] Warm sending domain with Resend
- [ ] Create Lists: Opening Drop, AI Studio Waitlist, Tales of Kuma, Collectors
- [ ] Create API endpoint in Hydrogen to push subscribers → Listmonk
- [ ] Import launch-phase captured subscribers
- [ ] Create welcome, post-purchase, and abandoned cart campaign flows
- [ ] Confirm transactional Shopify emails remain separate from Listmonk campaigns

## Sanity Tasks

- Confirm project `2wo9hx90`, organization `o9GdYjNoE`, dataset `production`.
- Create Hydrogen read-only token.
- Keep any write/admin token private for `art-business`.
- Deploy Studio from root `studio/`.
- Create/review `settings`, `navigation`, `homepage`, product supplements, artist docs, and series docs.
- Create/review Sanity `series` document `opening-drop` with `shopifyCollectionHandle=opening-drop`.
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
- **Test customer account flow:** register/sign in through Shopify-hosted customer accounts, order history, order detail, recovery/login assistance.
- **Test consent capture:** email consent checkbox persists, SMS consent checkbox only shows with phone, consent metadata is recorded.
- **Test AI Studio waitlist:** submit on `/create` with email only, with email + phone, with both consents, with no consents.
- Place one real test order.
- Confirm Shopify order, Printful receipt, tracking sync, and customer emails.
- **Confirm customer receives:** Shopify order confirmation, Printful/shipping notification, tracking number.
- Add Umami and Search Console only after checkout works.

*Last updated: 2026-06*
