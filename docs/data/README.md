# Data — Structures, Schemas & Specifications

Status: Current

This directory answers the "what" questions about Kumachi Prints. Every document here defines a data structure, a field specification, or a data flow — the precise shape of the information that moves through the system.

**What belongs here:**
- Data models and type definitions
- Sanity schema specifications
- Shopify product structure and metafields
- GROQ query patterns
- Cart data model and state shape
- Printful file specifications

**What does NOT belong here:**
- Design philosophy (go in `docs/concepts/`)
- Implementation patterns (go in `docs/system/`)
- Task checklists (go in `docs/planning/`)

## Documents

| File | What it covers |
|------|----------------|
| `01_product_model.md` | Complete product data model — Shopify side and Sanity side |
| `02_sanity_schemas.md` | All Sanity document types, object types, and GROQ queries |
| `03_cart_and_checkout.md` | Cart data model, Zustand store, checkout flow |
| `04_printful_product_spec.md` | Printful file requirements, size/frame specs, pricing strategy |
| `05_woocommerce_mirror_bridge.md` | Local Woo mirror bridge contract for prototype/reference data |
| `06_drops_and_releases.md` | Drop/release data contract across Shopify, Sanity, Hydrogen, and art-business |

*Last updated: 2026-06*
