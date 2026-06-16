# Listmonk + Resend Campaign Infrastructure

Status: Planning

## Overview

Kumachi Prints uses an owned email marketing stack:
- **Listmonk** — self-hosted newsletter and mailing list manager (Go + Postgres)
- **Resend** — email delivery service configured as Listmonk's SMTP provider
- **Fly.io** — hosting platform for Listmonk and its Postgres database

## Why This Stack

| Choice | Reason |
|--------|--------|
| Listmonk over Klaviyo/Mailchimp | Self-hosted, owns subscriber data, no per-subscriber cost, full control over consent/audit, single binary deploy |
| Resend over SendGrid/SES | Modern API, good deliverability, simple SMTP integration, scales with Listmonk |
| Fly.io over self-hosted VPS | Deploy from single config file, built-in Postgres, global regions, predictable pricing |

## Deployment

### Deploy Listmonk on Fly.io

```bash
# Install flyctl if not already installed
# Windows (PowerShell):
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

# Login
fly auth login

# Create the app
fly launch --name kumachi-listmonk --region iad

# Create a Postgres database
fly postgres create --name kumachi-listmonk-db --region iad

# Attach to app
fly postgres attach kumachi-listmonk-db --app kumachi-listmonk

# Deploy
fly deploy
```

### Expected `fly.toml`

```toml
app = "kumachi-listmonk"
primary_region = "iad"

[build]
  image = "listmonk/listmonk:latest"

[http_service]
  internal_port = 9000
  force_https = true
  auto_stop_machines = false
  auto_start_machines = true
  min_machines_running = 1

[env]
  TZ = "UTC"
```

### Post-Deploy Setup

1. SSH into the app to run the initial setup:
   ```bash
   fly ssh console -a kumachi-listmonk
   # Inside the container:
   ./listmonk --new-config
   # Edit config.toml with SMTP settings
   ./listmonk --install
   # Create admin account
   ./listmonk --id
   ```

2. Access the Listmonk admin UI at `https://kumachi-listmonk.fly.dev`

3. Configure Resend SMTP in Listmonk settings:
   - SMTP Host: `smtp.resend.com`
   - SMTP Port: `587`
   - SMTP Username: `smtp` (literal string)
   - SMTP Password: `re_<your-resend-api-key>`
   - From email: `studio@kumachiprints.com` (must be verified in Resend)
   - From name: `Kumachi Prints`

### Resend Setup

1. Create account at resend.com
2. Verify sending domain (add DNS TXT record for domain verification + DKIM)
3. Create API key with sending permission
4. Configure Resend SMTP credentials in Listmonk

### Warm the Sending Domain

Start with small volumes and gradually increase:
- Week 1: Send only to most engaged subscribers (those who opted in via checkout)
- Week 2: Expand to newsletter subscribers
- Week 3: Full send volume

## Listmonk Configuration

### Lists

| List | Purpose | Source | Consent Required |
|------|---------|--------|-----------------|
| **Opening Drop** | Notified about the first drop launch and future drops | Newsletter footer, account sign-up | Email consent |
| **AI Studio Waitlist** | Notified when AI Studio launches | `/create` waitlist | Email consent + (optional) SMS consent |
| **Tales of Kuma** | Mythology stories, cultural content, editorial | Newsletter footer, editorial pages | Email consent |
| **Collectors** | Repeat buyers, limited edition drops, collectors' notes | Post-purchase opt-in | Email consent |

### Subscriber Attributes

Each subscriber in Listmonk should have these custom attributes:

| Attribute | Type | Example | Notes |
|-----------|------|---------|-------|
| `source` | text | `newsletter_footer`, `ai_studio_waitlist`, `checkout` | Capture point |
| `phone` | text | `+256701234567` | Optional, international format |
| `phone_country` | text | `UG` | Optional, for SMS opt-out |
| `sms_consent` | boolean | `true` | Separate SMS marketing consent |
| `email_consent` | boolean | `true` | Email marketing consent |
| `consented_at` | datetime | `2026-06-15T10:30:00Z` | When consent was given |
| `consent_text` | text | `"I agree to receive marketing emails..."` | Exact text shown |
| `interests` | text (comma-sep) | `opening_drop, ai_studio, tales_of_kuma` | Interest tags |
| `shopify_customer_id` | text | `gid://shopify/Customer/12345` | Linked Shopify record |

## Subscriber Sync Flow

### From Hydrogen to Listmonk

```
Hydrogen route (capture form submission)
  └── Server action handler
        ├── Validate + sanitize input
        ├── Record consent audit metadata
        ├── Store locally (JSON export / Sanity doc)
        └── POST to Listmonk API (async, non-blocking)
              └── Listmonk checks for duplicate email
                    └── Create subscriber or update attributes
                          └── Subscribe to specified list(s)
```

### Listmonk API Example

```http
POST https://kumachi-listmonk.fly.dev/api/subscribers
Content-Type: application/json
Authorization: token <listmonk-api-token>

{
  "email": "user@example.com",
  "name": "Jane Doe",
  "attribs": {
    "source": "ai_studio_waitlist",
    "phone": "+256701234567",
    "sms_consent": false,
    "email_consent": true,
    "consented_at": "2026-06-15T10:30:00Z",
    "consent_text": "I agree to receive marketing emails from Kumachi Prints..."
  },
  "lists": [2],
  "preconfirm_subscriptions": true
}
```

### Consent Sync with Shopify

When a customer completes checkout with email marketing consent:
1. Shopify customer record updates `acceptsMarketing` = true
2. The same email should be pushed to Listmonk's Opening Drop list
3. The `consented_at` timestamp should match Shopify records

When a customer unsubscribes from a Listmonk campaign:
1. Update Shopify customer record's `acceptsMarketing` = false (optional, via Admin API)
2. Update local consent record with unsubscribed timestamp
3. Do NOT delete the subscriber — unsubscribe them in Listmonk

## Campaign Flows

### Welcome Sequence (Opening Drop list)

| Email | Timing | Content |
|-------|--------|---------|
| Welcome | Instant | "You're on the list. Here's what to expect." |
| Story | Day 3 | "The story behind Kumachi Prints" |
| Collection | Day 7 | "What's coming in Opening Drop" |

### Abandoned Cart Recovery

Trigger: Shopify webhook `carts/update` → n8n → Listmonk API

| Email | Timing | Content |
|-------|--------|---------|
| Reminder | 1 hour after abandonment | "Still thinking about it?" |
| Urgency | 24 hours | "Your cart is waiting — limited edition prints" |
| Final | 72 hours | "Last chance before this drop closes" |

Implementation note: Abandoned cart requires Shopify Storefront API cart ID tracking and a webhook/API bridge from Shopify to n8n to Listmonk. Deferred post-launch unless explicitly pulled earlier.

### Post-Purchase Sequence

| Email | Timing | Content |
|-------|--------|---------|
| Thank you | Instant (via Shopify) | Order confirmation — sent by Shopify, not Listmonk |
| Fulfillment | When shipped (via Shopify) | Tracking notification — sent by Shopify, not Listmonk |
| Review request | 14 days after delivery | "How does your print look?" (+ link to leave review) |
| Collectors invite | 30 days after delivery | "You're now a collector. Here's what that means." |

Transactional order/shipping emails ship via Shopify. Listmonk handles only the post-delivery review request and collectors invite.

## CAN-SPAM Compliance

- Every campaign email must include an unsubscribe link (Listmonk handles this automatically)
- Unsubscribe must be processed within 10 business days (Listmonk processes immediately)
- Sender identity (from name + from address) must be clear
- Subject lines must not be deceptive
- Include physical mailing address in every commercial email (configure in Listmonk settings)

## TCPA Compliance for SMS

- SMS consent must be separate from email consent (always)
- Phone collection is NOT SMS consent
- Opt-out mechanism: "Reply STOP to unsubscribe" required in every SMS
- Consent audit trail must include: exact consent text, consentedAt, source page, IP, user agent
- Do NOT send SMS marketing until a documented SMS provider and opt-out workflow are in place
- Listmonk supports SMS via messenger/webhook, but this requires additional configuration

## Future: SMS via Listmonk

Listmonk supports SMS sending via its messenger system. To enable:

1. Configure an SMS provider (Twilio, Africa's Talking, etc.) in Listmonk settings
2. Create an SMS campaign type
3. Add SMS subscriber attributes (phone, sms_consent)
4. Document opt-out workflow ("Reply STOP" processing)

This is explicitly deferred from launch scope.

## Dependencies

- Fly.io account with billing set up
- Resend account with verified sending domain
- Listmonk API token
- n8n instance (Ernest's infrastructure) for abandoned cart webhook bridge

*Last updated: 2026-06*
