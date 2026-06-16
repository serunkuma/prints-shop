# Customer Contact & Consent Data Model

Status: Current

## Overview

Customer contact and consent data is captured at multiple points on the storefront. This document defines the data fields, capture points, consent rules, and audit trail requirements.

**Key rule:** Contact capture is a **launch requirement**. Campaign sending (via Listmonk/Resend) is post-launch. Launch scope is capture only.

## Capture Points

| Point | Fields | Required? | Consent Needed? |
|-------|--------|-----------|-----------------|
| Account login (`/account`) | handled by Shopify Customer Account API/OAuth | Shopify account identity required | Custom marketing consent is not assumed inside Shopify-hosted login |
| Account preferences (if built) | email, optional phone, preferences | Email: required | Email consent checkbox + SMS consent checkbox (if phone provided) |
| Checkout (Shopify hosted) | email, name, phone, shipping | Email: required | Shopify native consent |
| Newsletter (footer) | email | Required | Email consent checkbox |
| `/create` (AI Studio waitlist) | email, optional phone | Email: required | Email consent checkbox + SMS consent checkbox (if phone provided) |
| Homepage AI CTA | email | Required | Email consent checkbox |

## Fields

Every contact capture should collect (at minimum):

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `email` | string (email) | Yes | Primary identifier |
| `phone` | string | No | International format encouraged. Phone = NOT SMS consent. Separate SMS consent checkbox required |
| `firstName` | string | No | Optional but preferred for personalisation |
| `lastName` | string | No | |
| `source` | string | Yes | Where the contact was captured: `account_preferences`, `newsletter_footer`, `ai_studio_waitlist`, `homepage_ai_cta`, `checkout` |
| `interests` | string[] | No | Free-form interest tags: `opening_drop`, `ai_studio`, `tales_of_kuma`, `collectors` |
| `emailConsent` | boolean | Yes | `true` if user explicitly opted into email marketing |
| `emailConsentText` | string (text) | Yes | The exact consent text shown at time of opt-in |
| `emailConsentedAt` | datetime | Yes | ISO 8601 timestamp |
| `smsConsent` | boolean | No | `true` if user explicitly opted into SMS marketing. Default `false`. Only show this field if phone is provided |
| `smsConsentText` | string (text) | Yes (if sms checked) | The exact consent text shown at time of SMS opt-in |
| `smsConsentedAt` | datetime | Yes (if sms checked) | ISO 8601 timestamp |
| `sourcePage` | string | Yes | URL path where capture occurred |
| `ipAddress` | string | Yes | Captured server-side, not exposed to client |
| `userAgent` | string | Yes | Captured server-side, not exposed to client |
| `createdAt` | datetime | Yes | Auto-recorded on capture |
| `shopifyCustomerId` | string | No | Set if contact is linked to a Shopify customer record |

## Consent Rules

### Email Marketing Consent

- **Default:** unchecked/not consented
- **Required for:** sending any marketing/ promotional emails via Listmonk
- **Not required for:** Shopify transactional emails (order confirmation, fulfillment/shipping updates, password reset, account notifications)
- **Opt-out mechanism:** unsubscribe link in every campaign email (CAN-SPAM compliant)
- **Stored in:** captured contact record + Shopify customer record (via Customer API)

### SMS Marketing Consent

- **Default:** unchecked/not consented
- **Phone collection is NOT SMS consent.** A separate, explicit checkbox is always required
- **Required for:** sending any SMS marketing messages
- **Only shown when:** the user provides a phone number
- **Opt-out mechanism:** "Reply STOP to unsubscribe" in every SMS (TCPA-aware)
- **TCPA note:** This system captures the consent audit trail (consent text, timestamp, source). Actual SMS sending requires a documented provider and opt-out workflow. Do not send SMS until that is in place

### CAN-SPAM Compliance Notes

- Every marketing email must include a working unsubscribe link
- Unsubscribe must be processed within 10 business days
- Sender identity must be clear (from name + from address)
- Subject lines must not be deceptive
- Include physical mailing address in all commercial emails

### Consent Audit Trail

Every opt-in records:
1. The exact consent text that was shown to the user
2. The ISO 8601 timestamp of the opt-in
3. The page URL where the opt-in occurred
4. The user's IP address and user agent
5. The source identifier

This audit trail is stored alongside the contact record and is never deleted.

## Separation of Concerns

| Type | Provider | Scope | Launch? |
|------|----------|-------|---------|
| Transactional emails | Shopify (via Shopify Notifications) | Order confirmation, fulfillment, shipping, password reset, account invite | Launch scope |
| Marketing campaigns | Listmonk + Resend | Newsletters, promotional emails, welcome sequences, abandoned cart, AI Studio launch | Post-launch |
| SMS marketing | Listmonk (future) | Promotional SMS, order updates | Post-launch |

## Storage Strategy (Launch)

For launch, captured contacts are stored as:
1. **Shopify customer records** — created when a customer completes checkout or registers. Shopify tracks email marketing consent natively via `acceptsMarketing` field
2. **Exportable JSON** — for waitlist-only captures (AI Studio, standalone newsletter) that cannot create a Shopify customer record yet, store as a collection of flat JSON records exportable for future Listmonk import
3. **Sanity document collection (optional)** — as an alternative to JSON files, store waitlist entries as a Sanity document type with the fields above

Do not route captured contacts into any live sending system during launch. Capture only.

*Last updated: 2026-06*
