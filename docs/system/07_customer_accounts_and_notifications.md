# Customer Accounts & Notifications

Status: Current

## Architecture

```
Hydrogen server/context
  └── createCustomerAccountClient()
        ├── uses PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID + SHOP_ID
        ├── starts Shopify Customer Account API OAuth login
        ├── handles /account/authorize callback
        ├── stores customer session server-side
        └── queries Customer Account API for profile + orders
```

## Data Ownership

| Data | Owner | Where it lives |
|------|-------|----------------|
| Customer identity | Shopify | Shopify Customer records |
| Customer email | Shopify | Shopify Customer records |
| Order history | Shopify | Shopify Order API |
| Fulfillment/tracking | Shopify (synced from Printful) | Shopify Order API |
| Marketing consent | Shopify | Shopify Customer `acceptsMarketing` field |
| Transactional notifications | Shopify | Shopify Notifications (email) |
| Campaign subscriptions | Listmonk | Listmonk database |

**Shopify owns launch commerce accounts, orders, checkout, transactional notifications, and fulfillment status.** Hydrogen account pages must use Shopify's current Customer Account API/OAuth flow, not the legacy Storefront API customer access token flow.

**Supabase Auth is deferred** for future AI Studio features only: generations, galleries, tokens, and AI API access. Do not use Supabase Auth for commerce accounts.

## Account Routes

| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/account` | `app/routes/account.tsx` | Account dashboard if authenticated; otherwise link/button into Shopify-hosted login | Implemented with Customer Account API |
| `/account/login` | `app/routes/account.login.tsx` | Starts Customer Account API login/OAuth redirect | Implemented |
| `/account/authorize` | `app/routes/account.authorize.tsx` | Customer Account API OAuth callback handler | Implemented |
| `/account/orders` | `app/routes/account.orders.tsx` | Order history list | Implemented with Customer Account API |
| `/account/orders/:orderId` | `app/routes/account.orders.$orderId.tsx` | Single order detail | Implemented with Customer Account API |

### Account Route Verification

Before launch, migrate or verify each account route against the current Customer Account API flow:

1. **Customer Account API client:** Hydrogen context passes `customerAccount` into route context through `createHydrogenContext()`.
2. **Environment:** Add `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID` and `SHOP_ID` locally and in Oxygen.
3. **Shopify admin:** In the Hydrogen sales channel Customer Account API settings, configure callback URI `https://<your-domain>/account/authorize`, JavaScript origin, and logout URI.
4. **`/account/login`:** Start the Customer Account API login/OAuth redirect.
5. **`/account/authorize`:** Complete the OAuth callback and persist the customer session through the Customer Account API client.
6. **`/account`:** Query authenticated customer profile from `context.customerAccount`; show account dashboard or login CTA.
7. **`/account/orders`:** Query Customer Account API order history.
8. **`/account/orders/:orderId`:** Query Customer Account API single-order detail with fulfillment status, totals, and line items.
9. **Logout:** Clear the Customer Account API session and return to the storefront.

### Common Issues

- **Localhost callback:** Customer Account API OAuth does not support plain localhost callbacks; use an HTTPS tunnel such as ngrok for local testing.
- **Missing env:** `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID` and `SHOP_ID` must be present in local `.env` and Oxygen.
- **Wrong route shape:** Do not reintroduce `customerAccessTokenCreate`, `customerRecover`, or local password reset routes; those belong to the legacy customer account flow.
- **Checkout context:** A customer may authenticate or opt into marketing during checkout. Ensure consent capture and welcome flows handle this case.

## Notifications

### Shopify Transactional Emails (Launch)

Shopify handles transactional notifications for the launch phase. These are configured in Shopify admin → Settings → Notifications:

| Notification | Trigger | Delivery | Launch Critical? |
|-------------|---------|----------|------------------|
| Order confirmation | Order placed | Email (Shopify) | Yes — test before launch |
| Fulfillment update | Printful fulfills order | Email (Shopify) | Yes — test before launch |
| Shipping update | Tracking number added | Email (Shopify) | Yes — test before launch |
| Delivery confirmation | Order marked delivered | Email (Shopify) | Nice to have |
| Customer account recovery/login assistance | User requests help from Shopify-hosted login | Email/hosted flow (Shopify) | Yes — test before launch |
| Account invite | Customer created manually | Email (Shopify) | Nice to have |

**Important:** These are separate from Listmonk marketing campaigns. Do not route transactional emails through Listmonk.

### Printful → Shopify → Customer Flow

```
1. Customer places order on Hydrogen → Shopify
2. Shopify triggers order confirmation email to customer
3. Shopify syncs to Printful (via Printful app)
4. Printful produces and ships
5. Printful writes tracking number back to Shopify order
6. Shopify triggers fulfillment notification email to customer
```

### Launch QA Checklist for Notifications

- [ ] Place test order → confirm Shopify sends order confirmation email
- [ ] Wait for Printful to begin production → confirm no additional customer email until fulfillment
- [ ] Confirm Printful fulfillment writes tracking to Shopify order
- [ ] Confirm Shopify sends fulfillment/shipping notification to customer
- [ ] Verify email content: order number, items, shipping address, tracking link
- [ ] Test Shopify-hosted customer account recovery/login assistance from the Customer Account API login flow
- [ ] Test with multiple email providers (Gmail, Outlook, Proton) to verify deliverability

### Listmonk/Resend Campaigns (Post-Launch)

See `docs/system/08_listmonk_resend_campaigns.md` for the campaign infrastructure.

Campaign emails are distinct from transactional emails:
- **Transactional:** order confirmation, fulfillment, shipping, customer account recovery/login assistance, account notifications
- **Campaign:** newsletters, promotional emails, welcome sequences, abandoned cart recovery, AI Studio launch announcement

Shopify transactional emails remain separate from Listmonk marketing campaigns.

*Last updated: 2026-06*
