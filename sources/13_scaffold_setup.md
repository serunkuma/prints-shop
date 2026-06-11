# Starter Scaffold & Repository Setup

Status: Current

## Greenfield Approach

This is a greenfield project. There is no brownfield Hydrogen codebase to migrate. The starting point is the `frontvibe/fluid` open-source Hydrogen + Sanity starter.

## Why Fluid (Not Shopify's Own Demo Store)

Shopify's official `demo-store` template provides a minimal Hydrogen scaffold with no Sanity integration. Adding Sanity manually would require:
- Installing `hydrogen-sanity`
- Wiring the Sanity client into the Hydrogen context
- Setting up Visual Editing
- Building a page-section system from scratch

Fluid (`frontvibe/fluid`) provides all of this pre-configured. It is actively maintained, open-source (MIT), and built specifically for production Hydrogen + Sanity projects.

Fluid stack:
- Shopify Hydrogen (React Router v7)
- Sanity CMS with Visual Editing
- Tailwind CSS
- Radix UI + shadcn/ui
- Motion (animations)
- Embla Carousel

## Repository Setup Steps

```bash
# 1. Clone Fluid starter into the prints-shop repo
git clone https://github.com/frontvibe/fluid prints-shop
cd prints-shop

# 2. Remove Fluid's git history and start fresh
rm -rf .git
git init
git remote add origin https://github.com/serunkuma/prints-shop.git

# 3. Install dependencies
npm install

# 4. Link to Shopify store
npx shopify hydrogen link
# CLI will prompt for store domain and create/update .env

# 5. Initialise Sanity (inside the studio/ directory)
cd studio
npx sanity init
# → Choose "Use existing project" if already created in sanity.io/manage
# → Or "Create new project" → name: "kumachi-prints"
# → Dataset: production
cd ..

# 6. Complete .env with Sanity variables (CLI doesn't add these)
# See sources/03_shopify_configuration.md for full variable list

# 7. Verify dev server
npm run dev
# Expected: http://localhost:3000 shows Fluid demo store
# Expected: http://localhost:3000/studio shows Sanity Studio

# 8. Initial commit
git add .
git commit -m "Initial scaffold from frontvibe/fluid"
git push -u origin main
```

## Post-Scaffold Customisation Checklist

After the scaffold is running, these are the first changes to make before building features:

- [ ] Replace Fluid's demo Sanity schema with Kumachi Prints schemas (see `sources/04_sanity_schemas.md`)
- [ ] Add Kumachi Prints Tailwind design tokens to `tailwind.config.ts` (add from design source files when available)
- [ ] Remove Fluid's placeholder demo content from Sanity Studio
- [ ] Update `package.json` name, description, homepage fields
- [ ] Confirm `shopify.config.ts` has correct store domain
- [ ] Confirm `.env` has all required variables

## Project File Tree (target state)

```
prints-shop/
├── .github/
│   ├── workflows/
│   │   └── oxygen.yml              ← GitHub Actions CI/CD for Oxygen
│   └── copilot-instructions.md     ← Thin pointer → AGENTS.md
├── .cursor/
│   └── rules/agents.mdc            ← Thin pointer → AGENTS.md
├── app/
│   ├── components/                 ← See sources/11_component_conventions.md
│   │   ├── layout/
│   │   ├── product/
│   │   ├── cart/
│   │   ├── editorial/
│   │   ├── sections/
│   │   └── shared/
│   ├── lib/
│   │   ├── queries.ts              ← All GROQ query constants
│   │   ├── sanity.server.ts        ← Sanity client setup
│   │   ├── cart.server.ts          ← Cart utilities
│   │   └── utils.ts                ← Shared utility functions
│   ├── routes/                     ← See sources/05_hydrogen_routes.md
│   │   ├── _index.tsx
│   │   ├── products.$handle.tsx
│   │   ├── collections.$handle.tsx
│   │   ├── cart.tsx
│   │   ├── search.tsx
│   │   ├── pages.$handle.tsx
│   │   ├── drops._index.tsx
│   │   ├── drops.$handle.tsx
│   │   ├── artists._index.tsx
│   │   ├── artists.$handle.tsx
│   │   ├── sitemap.xml.tsx
│   │   └── robots.txt.tsx
│   ├── root.tsx                    ← HTML shell, global data, header, footer
│   └── entry.server.tsx            ← Server entry (Oxygen runtime)
├── studio/                         ← Sanity Studio project
│   ├── schemaTypes/
│   │   ├── index.ts
│   │   ├── homepage.ts
│   │   ├── productSupplement.ts
│   │   ├── artist.ts
│   │   ├── series.ts
│   │   ├── page.ts
│   │   ├── settings.ts
│   │   ├── navigation.ts
│   │   └── objects/
│   │       ├── seoFields.ts
│   │       ├── imageWithAlt.ts
│   │       └── navItem.ts
│   └── sanity.config.ts
├── public/
│   └── favicon.svg
├── docs/                           ← Populated by scaffold system
├── sources/                        ← THIS DIRECTORY — frozen input docs
├── scripts/
│   └── validate_scaffold.sh
├── AGENTS.md
├── CLAUDE.md
├── .cursorrules
├── .windsurfrules
├── GEMINI.md
├── .aider.conf.yml
├── README.md
├── RUNBOOK.md
├── .env                            ← NOT committed (in .gitignore)
├── .env.example                    ← Committed — template with all keys, no values
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── shopify.config.ts
```

## `.env.example` Template

Commit this file (no real values):

```
PUBLIC_STORE_DOMAIN=
PUBLIC_STOREFRONT_API_TOKEN=
SESSION_SECRET=

SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=
SANITY_PREVIEW_SECRET=
```

*Last updated: 2026-06-10*
