# Prompt 6 Readiness Evidence

Status: Current

This file records the current Prompt 6 launch QA state when the real order test is intentionally deferred.

## Summary

Prompt 6 is **readiness complete, end-to-end order proof deferred**.

The production storefront, product pages, cart handoff, customer account entry points, contact capture, mobile smoke path, and SEO basics are ready for first-sale traffic. The real Shopify order, Printful receipt, tracking sync, shipping notification, and account order-history proof remain unverified until a real or controlled test order is placed.

## Verified on Production

Production URL: `https://prints.kumachigallery.com`

| Check | Result | Evidence |
|---|---|---|
| Production QA scan | PASS | `npm run qa:production` returned 0 failures |
| Launch routes | PASS | 17 routes checked |
| Internal links | PASS | 51 internal links discovered, 0 failures |
| Product pages | PASS | 22 Opening Drop PDPs checked |
| Add to Cart on PDPs | PASS | All 22 PDPs expose Add to Cart |
| Product page loads | PASS | `Majestic Monarch` opened successfully |
| Add to cart | PASS | Product added from production PDP |
| Cart page/drawer reachable | PASS | Cart content showed expected product/cart state |
| Checkout redirect | PASS | Redirect reached Shopify hosted checkout on `xsxf8h-wk.myshopify.com/checkouts/...` |
| Mobile smoke path | PASS | Product/cart/checkout handoff checked at 390px viewport |
| Account route `/account` | PASS | Returns 200 |
| Account route `/account/login` | PASS | Redirects to Shopify-hosted Customer Account OAuth |
| Account route `/account/authorize` direct visit | PASS | Returns 400 without OAuth state, as expected |
| Account route `/account/orders` unauthenticated | PASS | Returns 200 with sign-in state |
| Newsletter capture | PASS | Live submission saved to Sanity |
| AI Studio waitlist email-only capture | PASS | Live submission saved to Sanity |
| AI Studio waitlist phone/SMS capture | PASS | Live submission saved to Sanity |
| Consent rejection | PASS | Missing email consent returned 400 |
| Consent metadata | PASS | Sanity records include consent text, timestamps, source page, user agent, ipHash, and no raw IP |
| SEO basics | PASS | `sitemap.xml`, `robots.txt`, and canonical public routes return successfully |

## Deferred Proof

These items require a real or controlled order and are not proven yet:

| Check | Result | Reason |
|---|---|---|
| Place real/test order | DEFERRED | Owner chose to skip order placement for now |
| Shopify order exists | UNPROVEN | Requires placed order |
| Shopify order confirmation email | UNPROVEN | Requires placed order |
| Printful receives order | UNPROVEN | Requires placed order and Printful sync |
| Printful tracking syncs to Shopify | UNPROVEN | Requires fulfillment/shipping |
| Shopify shipping notification includes tracking | UNPROVEN | Requires tracking sync |
| `/account/orders` shows test order | UNPROVEN | Requires signed-in customer with order |
| `/account/orders/:orderId` shows test order detail | UNPROVEN | Requires signed-in customer with order |

## External Admin Items to Verify Before First Sale

These cannot be fully proven from the repo or public storefront:

- Shopify payments are active.
- Shopify shipping zones/rates are active.
- Shopify taxes are configured.
- Store password remains disabled.
- Customer Accounts are enabled.
- Customer Account API callback, JavaScript origin, and logout URI use `https://prints.kumachigallery.com`.
- Notification templates are active and branded:
  - order confirmation
  - fulfillment notification
  - shipping/tracking update
  - account login/recovery assistance
- Shopify sender email is authenticated with SPF/DKIM.
- Printful app is connected to the correct Shopify store.
- Printful launch products and variants are synced from Printful, not manually duplicated in Shopify.
- Printful return address and shipping settings are configured.

## Status Language

Use this status until a real or controlled order is placed:

```text
Prompt 6: READINESS COMPLETE, END-TO-END ORDER PROOF DEFERRED

The storefront, checkout handoff, customer accounts, notifications configuration path,
Printful configuration path, mobile, SEO, and contact capture are ready for first-sale traffic.
The real Shopify -> Printful -> tracking -> customer notification loop remains unproven until
the first real or controlled test order is placed.
```

## Next Required Proof Run

When ready to complete Prompt 6 fully:

1. Place one real or controlled test order.
2. Record Shopify order number and timestamp.
3. Confirm order confirmation email arrived.
4. Confirm Printful received the order.
5. Wait for fulfillment/tracking.
6. Confirm tracking syncs back to Shopify.
7. Confirm shipping notification email includes tracking.
8. Sign in as the test customer and confirm `/account/orders` and `/account/orders/:orderId`.

*Last updated: 2026-06*
