# Documentation Index

Status: Current

Quick reference for all documentation files. Organized by category with one-line descriptions.

---

## Concepts (Why We Built It This Way)

| File | Description | Status |
|------|-------------|--------|
| [README.md](concepts/README.md) | Guide to the concepts directory | Current |
| [01_project_vision.md](concepts/01_project_vision.md) | Business goals, empire context, revenue model, audience | Current |
| [02_stack_decisions.md](concepts/02_stack_decisions.md) | Why Hydrogen, Sanity, Printful, Oxygen — and what was rejected | Current |
| [03_design_system.md](concepts/03_design_system.md) | Colour tokens, typography, spacing, dark mode, animation variants | Current |
| [04_content_strategy.md](concepts/04_content_strategy.md) | Brand voice, three-beat description formula, gallery positioning | Current |
| [05_ai_studio_vision.md](concepts/05_ai_studio_vision.md) | AI Studio vision, style-locking rationale, Certificate of Generation | Planning |

## Data (What Flows Through the System)

| File | Description | Status |
|------|-------------|--------|
| [README.md](data/README.md) | Guide to the data directory | Current |
| [01_product_model.md](data/01_product_model.md) | Shopify product fields, variant structure, metafields, Sanity productSupplement | Current |
| [02_sanity_schemas.md](data/02_sanity_schemas.md) | All 7 Sanity doc types, 4 object types, 7 GROQ query patterns | Current |
| [03_cart_and_checkout.md](data/03_cart_and_checkout.md) | CartItem type, Zustand store shape, checkout flow, session secret | Current |
| [04_printful_product_spec.md](data/04_printful_product_spec.md) | File requirements, size/frame spec, pixel dimensions, pricing strategy | Current |
| [05_woocommerce_mirror_bridge.md](data/05_woocommerce_mirror_bridge.md) | Bridge data contract between local WooCommerce mirror and Vite prototype | Current |

## System (How We Built It)

| File | Description | Status |
|------|-------------|--------|
| [README.md](system/README.md) | Guide to the system directory | Current |
| [01_architecture.md](system/01_architecture.md) | Data flow, rendering model, component hierarchy, state management | Current |
| [02_shopify_configuration.md](system/02_shopify_configuration.md) | Store setup, API scopes, metafields, DNS, Oxygen, rollback | Current |
| [03_routes_and_components.md](system/03_routes_and_components.md) | Route map, data loading patterns, component directory, conventions | Current |
| [04_operations.md](system/04_operations.md) | Daily workflow, adding products, publishing drops, troubleshooting | Current |
| [05_deployment.md](system/05_deployment.md) | Local dev, CI/CD, Oxygen deployment, domain migration, .env.example | Current |

## Planning (How We're Building It)

| File | Description | Status |
|------|-------------|--------|
| [planning.md](planning.md) | 5-phase roadmap, dependency map, risks | Current |
| [00_launch_from_local_wordpress_simulator.md](planning/00_launch_from_local_wordpress_simulator.md) | Local WordPress simulator to Shopify/Sanity production launch plan | Current |
| [01_first_sale.md](planning/01_first_sale.md) | Phase 1 — production launch foundation, Shopify setup, Hydrogen scaffold | Current |
| [02_hydrogen_sanity_production.md](planning/02_hydrogen_sanity_production.md) | Phase 2 — Oxygen deploy, Sanity schemas, core routes | Current |
| [03_editorial_layer.md](planning/03_editorial_layer.md) | Phase 3 — drops, artists, editorial pages, component library | Planning |
| [04_domain_migration.md](planning/04_domain_migration.md) | Phase 4 — kumachiprints.com migration, 301 redirect, SEO | Planning |
| [05_growth_systems.md](planning/05_growth_systems.md) | Phase 5 — email marketing, reviews, God Dashboard integration | Planning |
| [06_ai_studio.md](planning/06_ai_studio.md) | Future — AI Studio, style-locked generation, Certificate of Generation | Planning |
| [07_production_build_handoff.md](planning/07_production_build_handoff.md) | Handoff for the Hydrogen + Sanity production build | Current |
| [08_launch_gap_closure.md](planning/08_launch_gap_closure.md) | Launch gap closure and remaining blockers | Current |
| [08_launch_gap_closure.md](planning/08_launch_gap_closure.md) | Current launch gaps after the Hydrogen app scaffold and hardening pass | Current |

## Research & Historical

| File | Description | Status |
|------|-------------|--------|
| [README.md](research/README.md) | Guide to historical documentation | Current |

## Operations

| File | Description |
|------|-------------|
| [RUNBOOK.md](../RUNBOOK.md) | Daily/weekly operational procedures (for Ernest) |
| [README.md](../README.md) | Project overview and getting started |
| [AGENTS.md](../AGENTS.md) | Single source of truth for AI agents and developers |

---

## Quick Find by Topic

| Question | Answer |
|----------|--------|
| What is the Sanity schema for a product? | [docs/data/02_sanity_schemas.md](data/02_sanity_schemas.md) |
| How do I add a new print product? | [docs/system/04_operations.md](system/04_operations.md) |
| Why Hydrogen and not Astro? | [docs/concepts/02_stack_decisions.md](concepts/02_stack_decisions.md) |
| What are the Shopify API scopes needed? | [docs/system/02_shopify_configuration.md](system/02_shopify_configuration.md) |
| How do I deploy Sanity Studio? | [docs/system/05_deployment.md](system/05_deployment.md) |
| What is the cart data model? | [docs/data/03_cart_and_checkout.md](data/03_cart_and_checkout.md) |
| What are the Tailwind colour tokens? | [docs/concepts/03_design_system.md](concepts/03_design_system.md) |
| How do I set up local dev? | [docs/system/05_deployment.md](system/05_deployment.md) |
| How do I publish a drop/series? | [docs/system/04_operations.md](system/04_operations.md) |
| What print sizes does Printful support? | [docs/data/04_printful_product_spec.md](data/04_printful_product_spec.md) |
| How do I roll back a bad deploy? | [docs/system/02_shopify_configuration.md](system/02_shopify_configuration.md) |
| What is the product supplement? | [docs/data/01_product_model.md](data/01_product_model.md) |
| How does the God Dashboard integrate? | [docs/concepts/01_project_vision.md](concepts/01_project_vision.md) |
| What are the Framer Motion variants? | [docs/system/01_architecture.md](system/01_architecture.md) |

---

## Status Legend

- **Status: Current** — Authoritative, use this
- **Status: Planning** — Upcoming, not yet implemented
- **Status: Historical** — Outdated, kept for reference

---

*Last updated: 2026-06*
