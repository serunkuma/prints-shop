# Kumachi Prints

**Premium headless art print storefront** — Hydrogen + Sanity + Printful on Shopify Oxygen.

> **Phase 1 — First sale in progress** · [prints.kumachigallery.com](https://prints.kumachigallery.com)

## Architecture

- **Hydrogen** (React Router v7) — server-rendered storefront with real-time cart and checkout
- **Sanity** — editorial content management (hompages, drops, artist profiles, site settings)
- **Printful** — print-on-demand fulfilment (zero inventory held by Kumachi)
- **Shopify Oxygen** — edge-deployed hosting, GitHub CI/CD, auto-scaling

### Critical Rule

> **Shopify owns commerce data. Sanity owns editorial content. These never swap.**

Products, prices, variants, inventory, orders, and cart live in Shopify. Editorial content, stories, artist bios, drop pages, and site settings live in Sanity.

## Quick Start

```bash
git clone https://github.com/serunkuma/prints-shop
cd prints-shop
npm install
npx shopify hydrogen link    # First time only — links to your Shopify store
npm run dev                   # Opens at http://localhost:3000
```

See [docs/system/05_deployment.md](docs/system/05_deployment.md) for the complete setup guide.

## Documentation

| File | Who it's for | What it covers |
|------|-------------|----------------|
| [AGENTS.md](AGENTS.md) | AI agents & developers | Single source of truth — architecture, rules, domain concepts |
| [RUNBOOK.md](RUNBOOK.md) | Ernest (store operator) | Daily procedures, adding products, troubleshooting |
| [docs/index.md](docs/index.md) | Everyone | File finder and navigation hub |
| [docs/planning.md](docs/planning.md) | Project managers | 5-phase roadmap with milestones |
| [docs/concepts/](docs/concepts/) | Design decision-makers | Why Hydrogen? Why Sanity? Design philosophy |
| [docs/data/](docs/data/) | Developers | Data structures, schemas, GROQ queries |
| [docs/system/](docs/system/) | Developers & operators | Architecture, configuration, deployment |

## Selected Product Population

The local Woo simulator remains upstream for launch product planning. To create selected Shopify draft products, generate a launch list in `art-business`, then run the Hydrogen population script:

```bash
cd C:\wamp64\www\prints-local\art-business
python .\scripts\artbiz.py shopify launch-list --ids 15,22

cd C:\Users\sirer\Documents\GitHub\prints-shop\apps\hydrogen
node scripts\populate-products.mjs --input C:\wamp64\www\prints-local\art-business\artifacts\exports\shopify-launch-products.json --dry-run
```

See [docs/system/06_selected_product_population.md](docs/system/06_selected_product_population.md) for the live draft-product workflow.

## Design Prototype

The complete interactive design prototype is at [github.com/serunkuma/prints-headless-shop-theme](https://github.com/serunkuma/prints-headless-shop-theme). This Hydrogen build is the production implementation of that prototype.

---

Part of the **Kumachi Empire** — [kumachistudio.com](https://kumachistudio.com) · [kumachigallery.com](https://kumachigallery.com) · [eserunkuma.com](https://eserunkuma.com)
