# System — Architecture, Configuration & Operations

Status: Current

This directory answers the "how" questions about Kumachi Prints. Every document here describes how a component works, how it is configured, how it is deployed, and how to operate it.

**What belongs here:**
- Architecture overviews and data flow diagrams
- Component responsibilities and interactions
- Configuration files and settings
- API integrations and endpoints
- Deployment procedures and CI/CD
- Operational runbooks and procedures

**What does NOT belong here:**
- Design philosophy (go in `docs/concepts/`)
- Data structures and field definitions (go in `docs/data/`)
- Task checklists (go in `docs/planning/`)

## Documents

| File | What it covers |
|------|----------------|
| `01_architecture.md` | System architecture, data flow, rendering model, state management |
| `02_shopify_configuration.md` | Shopify store setup, API scopes, metafields, DNS, Oxygen |
| `03_routes_and_components.md` | Route map, component hierarchy, data loading patterns, conventions |
| `04_operations.md` | Daily/weekly development workflow, adding products, publishing drops |
| `05_deployment.md` | Local dev, CI/CD, Oxygen deployment, domain migration, rollback |
| `06_selected_product_population.md` | Selected Woo mirror products to Shopify draft products through Hydrogen script |
| `07_customer_accounts_and_notifications.md` | Customer Account API OAuth flow, account routes, notification architecture |
| `08_listmonk_resend_campaigns.md` | Post-launch email campaign infrastructure with Listmonk + Resend |
| `09_notification_qa_runbook.md` | Step-by-step verification runbook for Shopify + Printful transactional notifications |

*Last updated: 2026-06*
