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
| `/account` | `app/routes/account.tsx` | Account dashboard if authenticated; otherwise link/button into Shopify-hosted login | Existing implementation uses legacy customer access token flow — must migrate before launch |
| `/account/login` | `app/routes/account.login.tsx` | Starts Customer Account API login/OAuth redirect | Existing redirect is placeholder — must migrate before launch |
| `/account/authorize` | `app/routes/account.authorize.tsx` | Customer Account API OAuth callback handler | Existing implementation uses legacy `customerAccessTokenCreate` incorrectly — must migrate before launch |
| `/account/recover` | `app/routes/account.recover.tsx` | Password recovery/account access support | Verify against selected Shopify customer account mode |
| `/account/orders` | `app/routes/account.orders.tsx` | Order history list | Existing implementation queries legacy customer token — must migrate before launch |
| `/account/orders/:orderId` | `app/routes/account.orders.$orderId.tsx` | Single order detail | Existing implementation queries legacy customer token — must migrate before launch |

### Account Route Verification

Before launch, migrate or verify each account route against the current Customer Account API flow:

1. **Customer Account API client:** Add `createCustomerAccountClient()` to Hydrogen server/context and pass `customerAccount` into route context.
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
- **Wrong route shape:** Existing `customerAccessTokenCreate` code is the legacy flow and should not be treated as the launch implementation.
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
| Password reset | User requests reset | Email (Shopify) | Yes — test before launch |
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
- [ ] Test password reset flow: `/account/recover` → email arrives → reset works
- [ ] Test with multiple email providers (Gmail, Outlook, Proton) to verify deliverability

### Listmonk/Resend Campaigns (Post-Launch)

See `docs/system/08_listmonk_resend_campaigns.md` for the campaign infrastructure.

Campaign emails are distinct from transactional emails:
- **Transactional:** order confirmation, fulfillment, shipping, password reset, account notifications
- **Campaign:** newsletters, promotional emails, welcome sequences, abandoned cart recovery, AI Studio launch announcement

Shopify transactional emails remain separate from Listmonk marketing campaigns.

*Last updated: 2026-06*
