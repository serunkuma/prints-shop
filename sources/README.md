# Sources — Input Documents

Status: Historical

This directory contains the frozen source documents that were used to scaffold the Kumachi Prints project documentation. These are the raw inputs: requirements, decisions, context, and domain knowledge as captured at the start of the project.

## Do Not Edit These Files

Files in `sources/` are historical inputs. They preserve the original knowledge base that informed the generated `docs/` tree, `AGENTS.md`, and `RUNBOOK.md`.

If knowledge needs updating, update the relevant file in `docs/` or `AGENTS.md` — not here.

## File Index

| File | Contents |
|---|---|
| `01_project_vision.md` | Business goals, revenue model, audience, launch strategy |
| `02_stack_decisions.md` | Why Hydrogen, Sanity, Printful, Oxygen — and what was rejected |
| `03_shopify_configuration.md` | Store setup, Storefront API scopes, product structure, metafields, domain setup, env vars |
| `04_sanity_schemas.md` | All Sanity document types, object types, and GROQ query patterns |
| `05_hydrogen_routes.md` | Route map, data loading patterns, cart architecture, SEO, image handling |
| `06_printful_integration.md` | Printful ↔ Shopify integration architecture, file requirements, variant naming |
| `07_deployment.md` | Oxygen hosting setup, GitHub Actions CI/CD, local dev, domain migration |
| `08_analytics_seo.md` | Umami setup, GA4 deferral rationale, Search Console, sitemap, robots.txt |
| `09_roadmap.md` | 5-phase project roadmap with task checklists and acceptance criteria |
| `10_empire_context.md` | Kumachi Empire overview, cross-property principles, God Dashboard context |
| `11_component_conventions.md` | Component directory structure, naming, server/client split, accessibility |
| `12_agent_rules.md` | Immutable principles for AI agents and developers |
| `13_scaffold_setup.md` | Greenfield setup from frontvibe/fluid, repo structure, .env.example |
| `14_operations.md` | Daily workflow, adding products, publishing drops, rotating secrets, troubleshooting |
| `protoype/` | Vite prototype (full interactive design theme from prints-headless-shop-theme) |
| `README-sources.md` | Original README for the sources directory |

## Usage

These sources were consumed by the batch scaffold prompt to generate the populated `docs/` tree. They are kept here for traceability. If a `docs/` document seems to contradict a source, the `docs/` document is authoritative (it reflects current decisions, not initial inputs).

*Last updated: 2026-06*
