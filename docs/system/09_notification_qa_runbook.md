# Notification QA Runbook

Status: Current

This runbook documents the step-by-step verification path for Shopify + Printful transactional notifications before launch.

## 1. Pre-Verification: Shopify Notification Templates

### 1.1 Navigate

Shopify admin → Settings → Notifications

### 1.2 Required Templates

Verify every template below is active (green status indicator). Open each and confirm the subject line and body contain the correct store name, branding, and no placeholder text.

| Template | Trigger | Active | Subject Verified | Body Verified |
|----------|---------|--------|------------------|---------------|
| Order confirmation | Customer places order | [ ] | [ ] | [ ] |
| Fulfillment notification | Printful fulfills order | [ ] | [ ] | [ ] |
| Shipping update / tracking | Tracking number written to Shopify | [ ] | [ ] | [ ] |
| Delivery confirmation | Order marked delivered | [ ] | [ ] | [ ] |
| Customer account recovery | User requests help from Shopify-hosted login | [ ] | [ ] | [ ] |
| Account invite | Customer created manually | [ ] | [ ] | [ ] |

### 1.3 Template Content Checklist

For each active template, confirm:

- [ ] Store logo appears (uploaded in Settings → Brand)
- [ ] Store name is correct ("Kumachi Prints")
- [ ] Order number is present in subject / body
- [ ] Line items with titles, quantities, prices render
- [ ] Shipping address renders (if applicable)
- [ ] Tracking link renders and is clickable (shipping update template)
- [ ] Footer includes store contact info
- [ ] No liquid errors or raw {{ variable }} text visible
- [ ] Mobile rendering: preview in mobile viewport

### 1.4 Branding / Sender Settings

Shopify admin → Settings → Notifications → Sender email

| Setting | Expected Value | Verified |
|---------|---------------|----------|
| Sender email address | `notifications@` your domain | [ ] |
| Sender name | "Kumachi Prints" | [ ] |
| Reply-to email | A monitored inbox | [ ] |
| Sender domain authentication | SPF/DKIM verified (green check) | [ ] |

**To verify domain authentication:**
1. Shopify admin → Settings → Notifications → Sender email
2. Look for "Your domain is authenticated" green checkmark next to the sender email
3. If absent, follow Shopify's SPF/DKIM setup guide for your domain provider

If using `myshopify.com` email, upgrade to a custom domain before launch. Emails from `myshopify.com` have higher spam rates and lower deliverability.

---

## 2. Test Order Prerequisites

Before placing a test order, confirm these are in place:

### 2.1 Storefront Readiness

- [ ] Hydrogen is deployed to Oxygen (preview or production)
- [ ] `cart.checkoutUrl` resolves and redirects to Shopify hosted checkout
- [ ] At least one product has `status: ACTIVE` in Shopify (not DRAFT)
- [ ] The product has at least one variant with `availableForSale: true`
- [ ] Shipping rates are configured in Shopify admin → Settings → Shipping and delivery
- [ ] Payment provider is active (Shopify Payments or third-party)
- [ ] Taxes are configured (or set to manual $0 for test order)
- [ ] Store password is disabled, or you have the password

### 2.2 Printful Readiness

- [ ] Printful app is installed and connected to Shopify
- [ ] At least one Printful product is synced to Shopify with `Printful` fulfillment service
- [ ] Product files are ≥150 DPI at the largest size (check Printful dashboard for warnings)
- [ ] Variants and retail prices are set in Shopify
- [ ] Printful return address is configured
- [ ] Printful shipping settings are configured

### 2.3 Account Readiness

- [ ] Customer Account API is configured (see `docs/system/07_customer_accounts_and_notifications.md`)
- [ ] `/account/login` redirects to Shopify-hosted OAuth
- [ ] `/account/authorize` completes the callback
- [ ] `/account/orders` renders order history (even if empty)

---

## 3. Place Test Order

### 3.1 Prepare

- Open an incognito browser window
- Have a test email address ready (preferably not the store owner's email)
- Open the browser devtools Network tab (filter to `email` or `shopify`)

### 3.2 Execution Steps

```
Step 1: Open the storefront at your Oxygen URL
Step 2: Navigate to /collection or /collection/opening-drop
Step 3: Click a product with ACTIVE status and Printful fulfillment
Step 4: Select a Size variant
Step 5: Click "Add to Cart"
Step 6: Verify cart drawer opens and shows the item
Step 7: Click "Checkout" in the cart drawer
  → Expected: Redirect to Shopify hosted checkout (checkout.shopify.com or custom domain)
Step 8: Fill in shipping details with a real, deliverable address
  (Use your own address or a known test address)
Step 9: Select a shipping method
Step 10: Fill in payment details:
  → Use a real credit card for a $0-value order or real small order,
    OR use Shopify's Bogus Gateway for testing:
    - Card: 1, Exp: any future date, CVV: 111
Step 11: Click "Place Order"
  → Expected: Order confirmation page with order number
```

### 3.3 Record

| Field | Value |
|-------|-------|
| Test order date/time (UTC) | |
| Test email used | |
| Product purchased | |
| Product variant (size) | |
| Order total | |
| Order number (from Shopify) | |
| Incognito window used? | |
| Shopify hosted checkout URL | |

---

## 4. Order Confirmation Email

### 4.1 Expected Behavior

Within 1–5 minutes of order placement, the customer email address should receive an order confirmation from Shopify.

### 4.2 Verification Steps

```
1. Check the test email inbox (including spam/junk folder)
2. Look for email from: "Kumachi Prints" <notifications@your-domain.com>
3. Subject should contain: "Order #XXXX confirmed"
4. Open the email
```

### 4.3 Content Checklist

- [ ] Email arrived (timestamp: _________ UTC)
- [ ] From name: "Kumachi Prints"
- [ ] Subject line contains the order number
- [ ] Store logo is visible at top
- [ ] Order number is displayed
- [ ] Line items listed: title, quantity, price
- [ ] Shipping address shown (correct)
- [ ] Order total shown
- [ ] "View your order" or link to Shopify order status page / customer account flow
- [ ] Footer has store physical address or contact
- [ ] No liquid errors, raw variables, or broken images
- [ ] Not in spam folder

### 4.4 Pass Criteria

All of the above checked = PASS
Any missing element = FAIL (note which and fix before next test)

---

## 5. Printful Fulfillment Sync

### 5.1 Expected Behavior

After the order is placed:
1. Shopify sends the order to Printful (via the Printful app)
2. Printful acknowledges receipt (typically 1–60 minutes)
3. Printful begins production (status: "In progress" in Printful dashboard)

### 5.2 Verification Steps

```
1. Log in to Printful dashboard (printful.com/dashboard)
2. Navigate to Orders → All Orders
3. Find the test order (search by order number)
4. Check the status column
```

### 5.3 Status Timeline

| Time Since Order | Expected Status | Actual Status | Verified |
|------------------|-----------------|---------------|----------|
| 5 minutes | Received / Pending | | [ ] |
| 15 minutes | Received / Pending | | [ ] |
| 1 hour | In progress (or still Pending) | | [ ] |
| 24 hours | In progress or Shipped | | [ ] |
| 1–3 business days | Shipped | | [ ] |

### 5.4 Shopify Order Status Cross-Check

```
1. Shopify admin → Orders → [test order]
2. Check Fulfillment section
```

- [ ] Fulfillment service shows "Printful"
- [ ] Fulfillment status: "Fulfilled" (when Printful ships)
- [ ] Tracking number appears when Printful ships

### 5.5 Pass Criteria

Printful receives the order within 1 hour = PASS
Printful shows "In progress" within 24 hours = PASS
Order appears in Printful dashboard = PASS
Order not received by Printful after 24 hours = FAIL (check Printful app connection)

---

## 6. Tracking Number Sync

### 6.1 Expected Behavior

When Printful ships the order, it writes the tracking number and carrier back to the Shopify order automatically.

### 6.2 Verification Steps

```
1. Wait for Printful to ship the order (check Printful dashboard → order status → "Shipped")
2. Note the tracking number shown in Printful
3. Go to Shopify admin → Orders → [test order]
4. Check the Fulfillment section for tracking number
```

### 6.3 Cross-Check

| Field | Printful Value | Shopify Value | Match? |
|-------|----------------|---------------|--------|
| Tracking number | | | [ ] YES / [ ] NO |
| Carrier | | | [ ] YES / [ ] NO |
| Tracking URL | | | [ ] YES / [ ] NO |

### 6.4 Pass Criteria

Tracking number appears in Shopify within 30 minutes of Printful marking as shipped = PASS
Tracking number in Shopify matches Printful = PASS
Tracking URL is clickable and resolves = PASS

---

## 7. Shipping Notification Email

### 7.1 Expected Behavior

When the tracking number is written to the Shopify order, Shopify automatically triggers the shipping update notification to the customer.

### 7.2 Verification Steps

```
1. Check the test email inbox (including spam)
2. Look for email from: "Kumachi Prints" <notifications@your-domain.com>
3. Subject should contain: "Order #XXXX shipped" or "Your order has shipped"
4. Open the email
```

### 7.3 Content Checklist

- [ ] Email arrived within 30 minutes of tracking sync (timestamp: _________ UTC)
- [ ] From name: "Kumachi Prints"
- [ ] Subject mentions shipped/dispatched
- [ ] Order number visible
- [ ] Tracking number displayed (clickable link)
- [ ] Carrier name displayed
- [ ] Line items summary present
- [ ] Shipping address shown
- [ ] Footer elements correct
- [ ] Not in spam folder

### 7.4 Pass Criteria

Customer receives shipping email = PASS
Email contains working tracking link = PASS
Tracking link shows real-time carrier status = PASS
No email received within 1 hour of Printful "Shipped" status = FAIL

---

## 8. Customer Account Order Visibility

### 8.1 Expected Behavior

The customer can sign in at `/account/login` and view the order in their order history at `/account/orders`.

### 8.2 Verification Steps

```
Precondition: The customer used during checkout must have an account
(may need to ensure they signed in before checkout, or the email matches
an existing customer record).

Step 1: Open incognito browser
Step 2: Navigate to /account/login
  → Expected: Redirect to Shopify-hosted Customer Account API login
Step 3: Sign in with the test customer email using Shopify-hosted Customer Accounts
  (Modern Shopify Customer Accounts are hosted by Shopify and may be passwordless;
  follow the one-time code or recovery/login assistance flow shown by Shopify.)
Step 4: Complete OAuth — should redirect back to /account/authorize
  → Expected: Redirect to /account
Step 5: Verify the account dashboard shows customer name and email
Step 6: Click "Order History" → /account/orders
  → Expected: The test order appears in the list
Step 7: Verify order list shows:
  - Order number
  - Order date
  - Order total
  - Fulfillment status
  - Product line items
Step 8: Click the order → /account/orders/:orderId
  → Expected: Full order detail page
Step 9: Verify order detail shows:
  - Order number
  - Order date
  - Fulfillment status
  - Financial status (paid)
  - Line items with quantities
  - Price summary (subtotal, tax, total)
  - Shipping address
```

### 8.3 Pass Criteria

Order appears in `/account/orders` list = PASS
Order detail page renders all required fields = PASS
Fulfillment status matches Shopify admin = PASS
Tracking number from shipping notification is NOT required on the account page
  (it appears in the notification email, not necessarily in the Customer Account API response)

---

## 9. Account Recovery / Login Assistance Flow

### 9.1 Expected Behavior

If a customer needs help signing in, the Shopify-hosted Customer Account API login flow provides the current Shopify account recovery or login assistance path. Do not add a local `/account/recover` route.

### 9.2 Verification Steps

```
Step 1: Navigate to /account/login
  → Expected: Redirect to Shopify-hosted Customer Account API login page
Step 2: Use the recovery, resend code, or login assistance option shown by Shopify
Step 3: Enter the test customer email if prompted
Step 4: Check email for Shopify account login/recovery message
Step 5: Complete the Shopify-hosted login assistance flow
Step 6: Sign in or complete the one-time code flow
Step 7: Redirect back to /account → dashboard shows customer data
```

### 9.3 Pass Criteria

Shopify login/recovery email sent = PASS
Shopify-hosted login assistance works = PASS
Can sign in or complete one-time code flow = PASS
Session persists across pages = PASS

---

## 10. Multi-Provider Email Deliverability

Test with at least 3 email providers to verify deliverability:

| Provider | Order Confirmation | Shipping Notification | Account Recovery |
|----------|-------------------|----------------------|------------------|
| Gmail | [ ] arrived / [ ] spam | [ ] arrived / [ ] spam | [ ] arrived / [ ] spam |
| Outlook / Hotmail | [ ] arrived / [ ] spam | [ ] arrived / [ ] spam | [ ] arrived / [ ] spam |
| Proton Mail | [ ] arrived / [ ] spam | [ ] arrived / [ ] spam | [ ] arrived / [ ] spam |
| A custom domain email | [ ] arrived / [ ] spam | [ ] arrived / [ ] spam | [ ] arrived / [ ] spam |

If any provider reports spam, check SPF/DKIM/DMARC records and sender reputation before launch.

---

## 11. Transactional vs Campaign Email Boundary

**This is a launch-critical policy. Do not violate it.**

| Channel | Content | Timing | Sender |
|---------|---------|--------|--------|
| Shopify Notifications | Order confirmation, fulfillment, shipping, delivery, account recovery | Transaction-triggered | `notifications@your-domain.com` |
| Listmonk / Resend | Newsletters, promotions, welcome sequences, abandoned cart, AI Studio launch | Campaign-triggered | `hello@your-domain.com` or campaign-specific |

- Do not send campaign emails through Shopify Notifications.
- Do not send transactional emails through Listmonk.
- Do not configure the Shopify notification sender email as a Listmonk campaign sender.
- Do not import Shopify customer records into Listmonk for campaign sending during launch scope
  (capture-only during launch; campaign sending is post-launch per `docs/system/08_listmonk_resend_campaigns.md`).

---

## 12. Pass/Fail Evidence Log

For each test run, record in this table:

| # | Check | Result | Evidence | Date |
|---|-------|--------|----------|------|
| 1 | Order confirmation email sent | PASS / FAIL / SKIP | Screenshot / timestamp | |
| 2 | Email content complete | PASS / FAIL / SKIP | Screenshot | |
| 3 | Printful received order | PASS / FAIL / SKIP | Printful dashboard screenshot | |
| 4 | Printful fulfilled order | PASS / FAIL / SKIP | Printful dashboard screenshot | |
| 5 | Tracking written to Shopify | PASS / FAIL / SKIP | Shopify admin screenshot | |
| 6 | Shipping notification sent | PASS / FAIL / SKIP | Screenshot / timestamp | |
| 7 | Tracking link works | PASS / FAIL / SKIP | Carrier page screenshot | |
| 8 | `/account/orders` shows order | PASS / FAIL / SKIP | Browser screenshot | |
| 9 | Order detail page renders | PASS / FAIL / SKIP | Browser screenshot | |
| 10 | Account recovery email sent | PASS / FAIL / SKIP | Screenshot / timestamp | |
| 11 | Account recovery flow works | PASS / FAIL / SKIP | Browser screenshot | |
| 12 | Gmail deliverable | PASS / FAIL / SKIP | Inbox check | |
| 13 | Outlook deliverable | PASS / FAIL / SKIP | Inbox check | |
| 14 | Proton deliverable | PASS / FAIL / SKIP | Inbox check | |

**Overall Notification QA Result:** PASS / FAIL with blockers / FAIL with non-blockers

If FAIL with blockers, resolve blockers and re-run the full test sequence. Partial re-runs are not sufficient — a change to one template or setting can affect others.

---

## 13. Rollback / Remediation

If a notification fails after launch:

| Issue | Remediation | Re-test Required |
|-------|-------------|------------------|
| Email not sent | Check Shopify Notifications → template active; check Sender email authentication | Yes (place new test order) |
| Email went to spam | Fix SPF/DKIM/DMARC; warm sending domain | Yes (7-day warm-up then re-test) |
| Broken template | Edit template in Notifications → preview → save | No (use Preview/Test in Shopify) |
| Tracking link broken | Check Printful connection → resync tracking | Yes (wait for new Printful shipment) |
| Printful not receiving order | Disconnect and re-connect Printful app | Yes (place new test order) |
| Account page not showing order | Check Customer Account API config; check Customer Account API scopes | Yes (sign in and verify) |

For any batch of order-related re-tests, use a different product and variant than the previous test to avoid confusion.

---

## 14. Document History

| Date | Author | Change |
|------|--------|--------|
| 2026-06 | Ernest Serunkuma + AI agent | Initial runbook created for Shopify + Printful notification QA |
