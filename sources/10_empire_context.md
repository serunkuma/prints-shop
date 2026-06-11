# Kumachi Empire Context & Cross-Property Principles

Status: Current

## The Four Properties

| Property | Domain | Purpose | Stack |
|---|---|---|---|
| Kumachi Studio | kumachistudio.com | Creative agency — "an agency for agencies, a studio for artists" | Astro + Tailwind v4 + Sanity + Netlify |
| Kumachi Gallery | kumachigallery.com | Gallery — original art, cultural storytelling, African diaspora narratives, pop-up tours | Astro + Tailwind v4 + Sanity + Netlify |
| Kumachi Prints | kumachiprints.com (launching on prints.kumachigallery.com) | Print-on-demand e-commerce | Hydrogen + Tailwind v4 + Sanity + Oxygen |
| Ernest Serunkuma | eserunkuma.com | Ernest's personal brand — expatriate consultant, self-taught engineer | Astro + Tailwind v4 + Netlify (currently HTML/CSS/JS) |

The prints store uses Hydrogen instead of Astro because it has real-time commerce requirements (cart, checkout, variant selection). All other properties use Astro.

## Shared Principles

### Owned infrastructure over SaaS dependency

Ernest consistently chooses to build and own integrations rather than pay for ongoing SaaS tools. Examples:
- Building native social API connections (X, Meta, LinkedIn) into the God Dashboard instead of using Ayrshare
- Self-hosting Umami analytics instead of using paid analytics SaaS
- Building Printful integration via Shopify's native connection rather than a third-party middleware

Apply this principle when evaluating any new tool: is there a buildable alternative that we own? If so, and if the build cost is reasonable, prefer it.

### Concurrent over phased (for the Empire, not within this store)

Across the four properties, Ernest launches all four simultaneously rather than doing them sequentially. This means the prints store should not wait for other properties to be "done" before it launches. Each property moves in parallel.

Within this store's own phases, there is a natural dependency sequence (Phase 1 must precede Phase 2). But this store's Phase 1 should not wait for kumachistudio.com to be complete.

### Backfill as unfair advantage

Ernest has 3–5 years of existing art, travel, case studies, and cultural work. This is the content inventory. The prints store does not need new content before launch. The existing back catalogue is the launch catalogue.

### Analytics tools serve specific business questions

Each analytics question maps to exactly one tool. Do not install redundant tools.

### Business context before technical implementation

Every technical decision should be grounded in business rationale. The WHY before the HOW. Avoid technical choices that don't serve a clear business outcome.

## Kumachi God Dashboard

The God Dashboard is a unified agency operating system built in Notion with n8n as the orchestration layer. It is the command centre for the entire Kumachi Empire.

Relevant to this project:
- Shopify order data from the prints store flows into the God Dashboard via n8n webhook (Phase 5)
- New drop launches can be triggered from the God Dashboard with n8n automating Sanity document creation and social post scheduling
- Revenue across all four properties is visible in a single Notion database

The God Dashboard is a separate project. This store's responsibility is to expose data (via Shopify webhooks) and receive instructions (via n8n webhooks). The prints store does not build the dashboard — it integrates with it.

## Shared Sanity Projects

Each property has its own Sanity project (separate project IDs, separate datasets). They are not shared. Ernest manages content for the prints store at `kumachi-prints.sanity.studio` and content for other properties at their respective studios.

## Shared Umami Instance

Ernest runs one Umami instance that tracks all four domains. The prints store is one tracked site within that instance. The integration is a simple script tag — no shared infrastructure to manage.

## Cross-Linking Between Properties

The prints store should link back to:
- `kumachigallery.com` — on artist pages and series pages ("See this series in the gallery")
- `kumachistudio.com` — in the footer under "Kumachi"

The gallery site should link forward to:
- `prints.kumachigallery.com` / `kumachiprints.com` — on artist pages and exhibition pages ("Buy prints from this exhibition")

This cross-linking is editorial work, not a technical integration. It is managed via Sanity content.

*Last updated: 2026-06-10*
