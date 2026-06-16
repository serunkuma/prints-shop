# Kumachi Prints — Agent Guide

> **This file is the single source of truth for any AI agent working in this repo.**
> Read it fully before making any change. Keep it updated when you change anything significant.

---

## 1. What This System Does

Kumachi Prints is a premium headless e-commerce storefront for selling physical art prints — original and limited-edition artwork from the Kumachi catalogue, plus a forthcoming AI-generated print studio (Kumachi AI Studio). It serves a primary audience of diaspora buyers in USD markets who want quality art prints that tell cultural stories, positioning itself as gallery-adjacent (not a mass-market print shop). The differentiation is in the editorial layer: every print has context (artist, series, technique, inspiration), drops/series launches are curated editorial releases, and the AI Studio (post-launch) offers style-locked print generation. The store uses Printful for print-on-demand fulfilment — zero inventory risk, no physical product handled by Kumachi. It is the commerce arm of the Kumachi Empire, a four-property creative business ecosystem built by Ernest Serunkuma (Kampala, Uganda), co-launching alongside `kumachistudio.com`, `kumachigallery.com`, and `eserunkuma.com`.

The local WordPress/WooCommerce simulator lives outside this repo at `C:\wamp64\www\prints-local` and runs at `http://localhost/prints-local/`. Its `art-business` folder is the Python command center for catalog validation, Woo mirror sync, storefront export, Shopify/Printful planning, and Sanity sync. This repo owns the storefront implementation: the Vite bridge prototype in `sources/protoype` and the production Hydrogen + Sanity app in `apps/hydrogen`.

The simulator also has WPGraphQL enabled for local testing at `http://localhost/prints-local/graphql`. Use it to inspect local WordPress content shape or prototype GraphQL query ideas only. The bridge prototype still reads commerce data from the Woo Store API plus the safe `art-business` export, and production Hydrogen must read commerce from Shopify and editorial content from Sanity.

For selected launch products, `art-business` can generate `artifacts/exports/shopify-launch-products.json` with `python .\scripts\artbiz.py shopify launch-list --ids ...`. The Hydrogen app owns `apps/hydrogen/scripts/populate-products.mjs`, which dry-runs or creates Shopify `DRAFT` products from that selected export. Do not treat Hydrogen as a product database, and do not use Woo credentials in the production app.

A drop is a curated release event: selected art IDs, release story, Shopify collection, Sanity `series` document, and Hydrogen `/drops/:handle` page. The first sale should use `Opening Drop` as a `curated_open` drop with Shopify collection `opening-drop` and Sanity slug `opening-drop`. Do not confuse drops with categories, tags, SKU collection codes, or one-off uploads.

---

## 2. Repository Layout

```

Current production code lives under `apps/hydrogen`. When older documentation says `app/`, `root.tsx`, `shopify.config.ts`, or `.env.example` at the repository root, read that as the corresponding file under `apps/hydrogen` unless the document is explicitly marked historical. The root `studio/` directory is the canonical Sanity Studio; do not recreate or use `apps/hydrogen/studio`.

Root `studio/` is deployable with its own `package.json` and `sanity.cli.ts`. The local Hydrogen `.env` file is intentionally ignored and must contain private Shopify/Sanity values supplied by Ernest; never commit it or copy its values into docs.

Hydrogen intentionally does not import `@sanity/client` or `@sanity/image-url`. Use the small fetch-based GROQ client and local Sanity image URL helper in `apps/hydrogen/app/lib/sanity.server.ts` so MiniOxygen/Oxygen stays ESM-safe and `rxjs` stays out of the server runtime. The root Studio may keep Sanity's full authoring toolchain because it does not run inside Hydrogen.
prints-shop/
├── tests/                           ← Playwright BDD-style e2e tests
│   ├── sitemap.spec.ts              ← Sitemap XML validation
│   ├── robots.spec.ts               ← Robots.txt validation
│   └── pages.spec.ts                ← Homepage + PDP smoke tests
├── .github/
│   ├── workflows/
│   │   └── oxygen.yml              ← GitHub Actions CI/CD — pushes main → Oxygen production deploy
│   └── copilot-instructions.md     ← Thin pointer → AGENTS.md
├── .cursor/
│   └── rules/agents.mdc            ← Thin pointer → AGENTS.md
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          ← Site header, nav, cart icon
│   │   │   ├── Footer.tsx          ← Footer nav, social links, newsletter
│   │   │   └── AnnouncementBar.tsx  ← Optional promo bar from Sanity settings
│   │   ├── product/
│   │   │   ├── ProductCard.tsx      ← Grid card (image, title, price)
│   │   │   ├── ProductGrid.tsx      ← Renders a collection of ProductCards
│   │   │   ├── VariantSelector.tsx  ← Size + Frame option buttons
│   │   │   ├── AddToCart.tsx        ← Add to cart button + quantity
│   │   │   └── ProductMedia.tsx     ← Image gallery with thumbnail strip
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx       ← Slide-in cart (Sheet component)
│   │   │   ├── CartItem.tsx         ← Single line item in cart
│   │   │   └── CartSummary.tsx      ← Subtotal + checkout button
│   │   ├── editorial/
│   │   │   ├── SeriesCard.tsx       ← Drop/series thumbnail card
│   │   │   ├── ArtistCard.tsx       ← Artist profile card
│   │   │   └── PortableText.tsx     ← Sanity Portable Text renderer
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedCollectionSection.tsx
│   │   │   ├── EditorialBannerSection.tsx
│   │   │   ├── ProductGridSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   ├── TrustBar.tsx           ← Hardcoded trust signals
│   │   │   ├── AIPrintStudioTeaser.tsx ← Hardcoded AI Studio teaser
│   │   │   ├── CategoryTiles.tsx      ← Hardcoded category navigation
│   │   │   ├── EditorialProductRail.tsx ← Product marquee rail
│   │   │   ├── EditorialStorySection.tsx ← Hardcoded editorial story
│   │   │   └── ArtistSpotlightSection.tsx ← Hardcoded artist spotlight
│   │   ├── motion/
│   │   │   ├── AnimatedButton.tsx     ← Animated CTA button
│   │   │   ├── ClipRevealImage.tsx    ← Clip-path reveal image
│   │   │   └── MarqueeRow.tsx         ← Scrolling marquee
│   │   ├── shared/
│   │   │   ├── SanityImage.tsx       ← Sanity image with urlFor + responsive sizing
│   │   │   └── Seo.tsx              ← SEO meta tag helper
│   │   └── PathwaySwitch.tsx         ← AI / Gallery pathway toggle
│   ├── lib/
│   │   ├── queries.ts               ← All GROQ query constants
│   │   ├── queries/                 ← Directory for queries if they grow large
│   │   ├── sitemap.server.ts        ← Shared buildSitemap() for /sitemap + /sitemap.xml
│   │   ├── sanity.server.ts         ← Sanity client setup
│   │   ├── cart.server.ts           ← Server-side cart utilities
│   │   ├── animations.ts           ← Framer Motion Variants (fadeUp, staggerContainer, etc.)
│   │   ├── format.ts               ← formatPrice(), formatMoney()
│   │   ├── context.ts              ← createHydrogenRouterContext()
│   │   ├── session.ts              ← AppSession class
│   │   ├── store.ts                ← Zustand useUIStore (persist key: kumachi-ui)
│   │   ├── siteUrl.server.ts       ← getCanonicalSiteUrl() helper
│   │   └── useRootLoaderData.ts    ← useRootLoaderData() hook
│   ├── routes/
│   │   ├── _index.tsx               ← Homepage
│   │   ├── products.$handle.tsx     ← Product detail page (PDP)
│   │   ├── collections._index.tsx   ← Collections listing
│   │   ├── collections.$handle.tsx  ← Collection / category page
│   │   ├── cart.tsx                 ← Cart page + cart action handlers
│   │   ├── search.tsx               ← Search results
│   │   ├── pages.$handle.tsx        ← CMS-managed static pages (About, FAQ, etc.)
│   │   ├── drops._index.tsx         ← Drops listing page
│   │   ├── drops.$handle.tsx        ← Editorial drop landing page
│   │   ├── artists._index.tsx       ← Artists listing
│   │   ├── artists.$handle.tsx      ← Artist profile page
│   │   ├── account.tsx              ← Customer portal (login + dashboard)
│   │   ├── account.login.tsx        ← Redirect to /account
│   │   ├── account.authorize.tsx    ← OAuth callback handler
│   │   ├── account.orders.tsx       ← Order history
│   │   ├── account.orders.$orderId.tsx  ← Single order detail
│   │   ├── policies.$policyHandle.tsx   ← Store policies (privacy, ToS, refund)
│   │   ├── sitemap.xml.tsx          ← SEO sitemap (.xml compat alias)
│   │   ├── sitemap.tsx              ← SEO sitemap (canonical path)
│   │   ├── robots.txt.tsx           ← Crawler rules
│   │   ├── create.tsx               ← AI Studio landing page
│   │   ├── product.$handle.tsx      ← Redirect /product/:handle → /products/:handle
│   │   ├── chrome-devtools-json.tsx ← Chrome DevTools protocol handler
│   │   └── api.preview.ts           ← Sanity Preview route
│   ├── root.tsx                     ← HTML shell, global data, header, footer
│   └── entry.server.tsx             ← Server entry (Oxygen runtime)
├── studio/
│   ├── schemaTypes/
│   │   ├── index.ts                 ← Registers all schema types
│   │   ├── homepage.ts              ← Singleton page builder for /
│   │   ├── productSupplement.ts     ← Editorial supplement keyed to Shopify product
│   │   ├── artist.ts                ← Artist profile document
│   │   ├── series.ts                ← Drop/series release document
│   │   ├── page.ts                  ← Generic CMS page
│   │   ├── settings.ts              ← Singleton site-wide config
│   │   ├── navigation.ts            ← Singleton main navigation
│   │   └── objects/
│   │       ├── seoFields.ts
│   │       ├── imageWithAlt.ts
│   │       └── navItem.ts
│   └── sanity.config.ts
├── public/
│   └── images/                      ← Static images (favicon, logos, fallback images)
├── docs/                            ← All project documentation
│   ├── index.md                     ← File finder / navigation hub
│   ├── planning.md                  ← 5-phase project roadmap
│   ├── planning/                    ← Phase breakdowns (01–05)
│   ├── concepts/                    ← Design philosophy and rationale ("why")
│   ├── data/                        ← Data structures and specifications ("what")
│   ├── system/                      ← Architecture and configuration ("how")
│   └── research/                    ← Historical context, removed features
├── sources/                         ← Frozen input documents (Status: Historical)
├── scripts/
│   └── validate_scaffold.sh         ← Health check for placeholder content
├── AGENTS.md                        ← THIS FILE
├── CLAUDE.md                        ← Thin pointer → AGENTS.md
├── GEMINI.md                        ← Thin pointer → AGENTS.md
├── .cursorrules                     ← Thin pointer → AGENTS.md
├── .windsurfrules                   ← Thin pointer → AGENTS.md
├── .aider.conf.yml                  ← Thin pointer → AGENTS.md
├── README.md                        ← Project entry point (humans)
├── RUNBOOK.md                       ← Daily/weekly operational procedures (operators)
├── .env                             ← NOT committed (in .gitignore)
├── .env.example                     ← Template with all keys, no values
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── shopify.config.ts
```

---

## 3. How to Run / Setup

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10
- Shopify Partners account with a store on Basic plan or higher (Starter and Development stores do not support Oxygen)
- Sanity account (sanity.io)

### Local Development Setup

```bash
# 1. Clone and install
git clone https://github.com/serunkuma/prints-shop
cd prints-shop
cd apps/hydrogen
npm install

# 2. Link to Shopify store (first time only)
npx shopify hydrogen link
# Follow CLI prompts — creates/updates .env with Shopify env vars

# 3. Initialize Sanity (inside studio/ directory)
cd ..\..\studio
npx sanity init
# → Use existing project (if already created at sanity.io/manage) or create new
# → Name: "kumachi-prints"
# → Dataset: production
cd ..\apps\hydrogen

# 4. Complete .env with all variables (see env table below)
# Note: `npx shopify hydrogen link` only sets Shopify vars.
# Sanity vars must be added manually.

# 5. Start dev server
npm run dev
# → Opens at http://localhost:3000
# → Sanity Studio at http://localhost:3000/studio
```

### Commands

| Command | Purpose |
|---------|---------|
| `cd apps/hydrogen && npm run dev` | Start Hydrogen dev server (port 3000) |
| `cd apps/hydrogen && npm run build` | Build for production (Oxygen worker) |
| `cd apps/hydrogen && npm run preview` | Preview production build locally |
| `cd apps/hydrogen && npm run typecheck` | TypeScript type check |
| `cd apps/hydrogen && node scripts\populate-products.mjs --input C:\wamp64\www\prints-local\art-business\artifacts\exports\shopify-launch-products.json --dry-run` | Validate selected Shopify draft-product payload |
| `cd apps/hydrogen && npm run test:e2e` | Run Playwright e2e tests (headless) |
| `cd apps/hydrogen && npm run test:e2e:ui` | Run Playwright e2e tests (UI mode) |
| `cd apps/hydrogen && npm run test:e2e:headed` | Run Playwright e2e tests (headed browser) |
| `cd studio && npx sanity deploy` | Deploy Sanity Studio to production hosting |
| `cd studio && npm run build` | Build the canonical Sanity Studio |
| `cd studio && npm run deploy` | Deploy the canonical Sanity Studio |

### Environment Variables

| Key | Type | Source | Required | Notes |
|-----|------|--------|----------|-------|
| `PUBLIC_STORE_DOMAIN` | string | Shopify admin → Settings → Store → Store domain | Required | Public — safe in client bundle |
| `PUBLIC_STOREFRONT_API_TOKEN` | string | Shopify admin → Apps → Develop apps → custom app → Storefront API token | Required | Public — safe in client bundle |
| `PUBLIC_SITE_URL` | string | Your canonical domain | Required | Public — sitemap/robots. Fallback: `https://${PUBLIC_STORE_DOMAIN}` |
| `SESSION_SECRET` | string | Generate randomly (≥32 chars, `openssl rand -hex 32`) | Required | Server-only — rotating invalidates all sessions |
| `SANITY_PROJECT_ID` | string | Sanity manage → project settings | Required | Server-only |
| `SANITY_DATASET` | string | Sanity manage | Required | Default: `production` |
| `SANITY_API_VERSION` | string | Sanity docs | Required | Default: `2024-01-01` |
| `SANITY_API_READ_TOKEN` | string | Sanity manage → API → Tokens → add token (read-only) | Required | Server-only |
| `SANITY_PREVIEW_TOKEN` | string | Sanity manage → API → Tokens → add token (viewer) | Optional | Used for draft/preview content in Presentation |
| `SANITY_STUDIO_URL` | string | Your Studio host | Optional | Default: `http://localhost:3333`. Used for stega/visual editing |
| `SANITY_PREVIEW_SECRET` | string | Generate randomly (≥16 chars) | Optional | Used for Sanity Visual Editing preview mode |

### Sanity Studio Deployment

```bash
cd studio
npx sanity deploy
# → Deploys to https://kumachi-prints.sanity.studio (or your chosen project name)
# Must be re-run after every schema change — schema changes are invisible
# to editors until the Studio is redeployed.
```

---

## 4. System Architecture

### Data Source of Truth Split

This is the single most critical architectural decision in the project. It must never be violated:

```
SHOPIFY IS THE SOURCE OF TRUTH FOR:
  products, variants, prices, inventory, orders, cart, checkout,
  customer accounts, fulfilment status, Printful sync

SANITY IS THE SOURCE OF TRUTH FOR:
  homepage sections, editorial drop pages, artist profiles,
  product storytelling (story, technique, inspiration),
  site settings, navigation, SEO overrides, FAQs, static pages
```

- **Never store commerce data in Sanity.** Prices, inventory, and variants live in Shopify. If you find a price in a Sanity schema, it is wrong — remove it.
- **Never hardcode editorial content in React components.** All narrative content comes from Sanity.

### Data Flow Diagram

```
Browser
  └── Hydrogen route loader (server)
        ├── Shopify Storefront API  ──→  products, cart, collections
        └── Sanity GROQ query       ──→  editorial content, settings
              ↓
        Promise.all([shopify, sanity])   ← ALWAYS parallel, NEVER sequential
              ↓
        React component (SSR + hydration)
              ↓
        Shopify Oxygen (edge, global CDN)
```

### Printful Integration Flow

```
Ernest uploads art file to Printful (≥150 DPI at largest size)
  └── Printful creates product → syncs to Shopify via Printful app
        └── Ernest sets retail prices in Shopify (base cost × 2.5–4× markup)
              └── Hydrogen reads product from Shopify Storefront API
                    └── Customer orders → Shopify notifies Printful via webhook
                          └── Printful produces (1-3 business days) + ships → tracking back to Shopify
                                └── Customer receives Shopify shipping notification
```

Kumachi never touches the physical product. The Hydrogen storefront never calls the Printful API directly — all Printful interaction happens via the Shopify ↔ Printful integration.

### Key Components

| Component | Responsibility | Location |
|-----------|---------------|----------|
| Hydrogen storefront | SSR + hydration, route loaders, cart mutations | `app/` |
| Sanity Studio | Content authoring, Visual Editing, schema management | `studio/` |
| Shopify Storefront API | Product/commerce data API | External (via `context.storefront`) |
| Sanity API | Editorial content API (GROQ) | External (via `context.sanity`) |
| Printful | Print-on-demand production + fulfilment | External (via Shopify app) |
| Umami (self-hosted) | Web analytics | External (script tag in `root.tsx`) |
| GitHub Actions | CI/CD — push to main = Oxygen deploy | `.github/workflows/oxygen.yml` |

### State Management Model

- **Cart state** lives in the server session (Hydrogen's built-in session). Cart is fetched server-side in `root.tsx` and passed to the client via root loader data. Cart mutations use Remix fetchers (form submissions to `/cart` action). Never manage cart state in `useState` or client-side storage.
- **UI state** (cart drawer open/closed, mobile menu, etc.) uses Zustand with persistence (`zustand/middleware/persist`). The persist key is `kumachi-ui`. This is only for UI toggles, not for cart data.
- **No client-side cart state.** The server is the cart source of truth.

### Animation Strategy

Framer Motion variants defined in `app/lib/animations.ts`:
- `fadeUp` — opacity 0→1 + y 24→0, duration 0.5s, custom ease
- `fadeIn` — opacity 0→1, duration 0.4s
- `staggerContainer` — stagger children by 0.08s
- `scaleIn` — scale 0.95→1 + fade in
- `slideInRight` — x 100%→0 for slide-in panels (cart drawer, mobile nav)
- `pageTransition` — initial/animate/exit for route transitions

Always use `whileInView={{ once: true }}` for scroll-triggered animations. Use `AnimatePresence` for conditional renders. Use `layout` prop for layout reflow animations.

---

## 5. Configuration

See the environment variables table in Section 3 above.

### Configuration Files

| File | Purpose |
|------|---------|
| `.env` | Local environment variables (not committed) |
| `.env.example` | Template with all keys, no values (committed) |
| `shopify.config.ts` | Shopify store domain, storefront API version |
| `tailwind.config.ts` | Design tokens, colours, typography, spacing |
| `vite.config.ts` | Vite build settings, Hydrogen plugin |
| `tsconfig.json` | TypeScript configuration |
| `package.json` | Dependencies, scripts, project metadata |

### Tailwind Design Tokens

All colours use CSS custom properties defined in `app/index.css`. The Tailwind config maps these to utility classes. Never hardcode hex values in component files. Available token categories:

| Category | Tokens |
|----------|--------|
| Backgrounds | `bg-void`, `bg-surface`, `bg-surface-mid`, `bg-surface-raised` |
| Text | `text-text-primary`, `text-text-secondary`, `text-text-muted` |
| Accent | `text-gold`, `text-crimson`, `text-teal`, `text-blush`, `text-grove` |
| Border | `border-border`, `border-border-active` |

---

## 6. Key Domain Concepts

### Product Supplement

A Sanity `productSupplement` document type keyed exactly to a Shopify product handle. It adds editorial content that Shopify cannot carry — story, technique, inspiration, additional images, artist reference, series reference. It must never contain price, variants, or availability data. The `shopifyHandle` field must be byte-for-byte identical to the Shopify product handle. A mismatch produces a silently broken PDP — no Sanity content appears but no error is thrown.

### Series / Drop

An editorial release of prints. A Sanity `series` document (title, slug, heroImage, description, publishDate, status) maps to a Shopify collection via `shopifyCollectionHandle`. The `/drops/:handle` route renders the series page. Status enum: `draft` → `scheduled` → `live` → `archived`. Only `live` series appear on the `/drops` listing page.

### Edition Types

- **Open edition** — unlimited print run. Standard pricing. No edition count.
- **Limited edition** — fixed print run quantity documented in Shopify metafield `kumachi.edition_size` (e.g. "Limited to 50"). Higher pricing, premium positioning. Visible on PDP.

### Backfill Catalogue

Ernest has 3–5 years of existing artwork, photography, and cultural storytelling work. This is the launch inventory. No new content needs to be created before launch. The backfill inventory is an unfair advantage — content exists, it just needs to be uploaded and sold.

### AI Studio

A forthcoming feature (post-launch Phase 3+) where a user describes a print, the Kumachi AI generates it in the Kumachi visual style (style-locked to brand — not open-ended), the result is upscaled to print resolution (Real-ESRGAN), ordered via Printful custom product API, and ships as a physical print. Each AI print comes with a Certificate of Generation. Current status: UI stub exists in the Vite prototype. No real API call wired. Waitlist will be collected during Phases 1–3.

### Kumachi Empire

Four properties owned by Ernest Serunkuma:
- **kumachistudio.com** — creative agency (Astro + Sanity + Netlify)
- **kumachigallery.com** — gallery focusing on African diaspora narratives (Astro + Sanity + Netlify)
- **kumachiprints.com** — this store (Hydrogen + Sanity + Oxygen). Launches at `prints.kumachigallery.com` while domain is renewed
- **eserunkuma.com** — personal brand (HTML/CSS/JS on Netlify all three properties)

The prints store is the commerce arm. The gallery is the cultural arm. They share a design language and cross-link editorially but do not share a Sanity project or codebase. Each property has its own Sanity project ID.

### Format Price Utility

`app/lib/format.ts` exports `formatPrice(cents: number): string`. All prices in Shopify are in cents (integers). This function converts cents to USD display strings using `Intl.NumberFormat`. No raw numbers rendered as prices. No manual `$` concatenation.

### Quote
> **Shopify owns commerce data. Sanity owns editorial content. These never swap.**

---

## 7. Known Decisions & Rationale

### Decision Log

| Decision | What was chosen | What was rejected | Why |
|---|---|---|---|
| Frontend framework | Hydrogen (React Router v7) | Astro, Next.js | Real-time cart/checkout state requires server rendering; Hydrogen + Oxygen is free and purpose-built |
| CMS | Sanity | Shopify Metafields only | Page builder, Portable Text, Visual Editing, relational content (artist ↔ series ↔ product) |
| Fulfilment | Printful via Shopify app | Manual fulfilment, other POD services | Zero inventory risk; native Shopify sync; well-documented |
| Hosting | Shopify Oxygen | Netlify, Vercel | Free with paid Shopify plan; edge-deployed; GitHub CI/CD; zero server management |
| Analytics | Umami (self-hosted) | GA4 | GA4 deferred until Google Ads running; Umami covers all launch needs; owned infrastructure |
| Currency display | USD only | UGX only, dual currency | Primary market is diaspora buyers in USD markets; UGX-only pricing is invisible to them |
| Scaffold starter | frontvibe/fluid | Shopify demo-store | Fluid pre-wires Hydrogen + Sanity + Visual Editing; saves ~40 hours of scaffold work |
| Launch domain | prints.kumachigallery.com | kumachiprints.com (expired) | Domain renewal pending; subdomain lets launch proceed immediately |
| Loyalty/rewards | Deferred post-launch | Pointful, Yotpo | Inconsistent headless API support; no buyers to reward yet |
| Email marketing | Deferred post-launch | Klaviyo | No order volume to trigger flows against; added at 100 orders |

### Known Limitations

- Shopify hosted checkout is the only checkout option — custom checkout requires Shopify Plus
- Sanity content is cached on Oxygen — content publish should trigger revalidation but force-redeploy may be needed
- Product file quality is critical — files below 150 DPI at the largest print size will produce low-quality prints
- Domain renewal for `kumachiprints.com` is an external dependency outside the project's control

---

## 7a. Documentation Audiences

| Audience | Primary Docs | Purpose |
|----------|-------------|---------|
| **AI Agents & Developers** | AGENTS.md (this file) | Single source of truth; code-level architecture; what to implement |
| **Operators & Stakeholders** | README.md, RUNBOOK.md | How to run, setup, operate, troubleshoot |
| **System Designers** | docs/system/ | Current architecture, components, design decisions |
| **Learning & Context** | docs/research/ | Historical decisions, removed features, why we abandoned approaches |
| **Project Managers** | docs/planning/ | Timeline, phases, deliverables, roadmap |
| **Everyone** | docs/index.md | File finder and quick navigation |

---

## 7b. Removed Features

- [REMOVED: GA4 analytics at launch] — Reason: no Google Ads running; cross-channel attribution is GA4's primary value. Date: 2026-06.
- [REMOVED: Ayrshare social posting] — Reason: owned infrastructure preferred; native X/Meta/LinkedIn APIs built directly into God Dashboard via n8n. Date: 2026-06.
- [REMOVED: Brownfield migration path] — Reason: greenfield start from frontvibe/fluid; no existing Hydrogen codebase to migrate. Date: 2026-06.
- [REMOVED: Astro for prints store] — Reason: real-time cart/checkout state requires server rendering; Astro is static-first. Date: 2026-06.
- [REMOVED: UGX-only pricing] — Reason: primary diaspora market uses USD; UGX pricing is invisible to international buyers. Date: 2026-06.
- [REMOVED: WordPress/WooCommerce as production storefront] — Reason: legacy platform for the public store; retained as a local simulator in `C:\wamp64\www\prints-local`. Date: 2026-06.

---

## 8. Agent Rules

1. **Keep AGENTS.md current** — update when you fix bugs, change architecture, or add features
2. **Cross-reference source code** — include file paths and line numbers: `[app/lib/format.ts:1](../../app/lib/format.ts:1)`
3. **Follow doc conventions** — see `docs/concepts/README.md`, `docs/data/README.md`, `docs/system/README.md` for category-specific guidance
4. **Run tests after changes** — currently no test suite; `cd apps/hydrogen && npm run typecheck` and `cd apps/hydrogen && npm run build` are the minimum
5. **Upstream fix over workaround** — fix root causes, not symptoms
6. **Keep docs organised** — concepts for "why", data for "what", system for "how"
7. **No emojis unless meaningful** — `✅` completed, `🟡` in progress, `🔴` open issue only
8. **Numbered series for depth** — use `01_`, `02_`, `03_` prefixes when a category needs multiple docs
9. **All scripts in `scripts/`** — never in root
10. **Secrets never committed** — `.env`, credentials in `.gitignore`
11. **Maintain status labels** — All docs (except research/ and sources/) must start with `Status: Current`, `Status: Planning`, or `Status: Historical`. Update when superseded.
12. **Copy-paste ready commands** — Every command/code example in docs must be: complete, tested, use full paths (not abbreviations), include all flags. Test before committing.
13. ~~**Run the scaffold validator after structural changes** — deleted 2026-06. Validation scripts removed as they became limiting once the repo structure matured.~~
14. **`sources/` is frozen** — never edit files in `sources/`. To update knowledge, edit the relevant `docs/` file instead. `sources/` preserves the original inputs that informed scaffolding.
15. **Pointer files contain a condensed project summary** — `CLAUDE.md`, `GEMINI.md`, `.cursorrules`, `.windsurfrules`, `.github/copilot-instructions.md`, and `.cursor/rules/agents.mdc` each contain a self-contained summary of critical project rules so any agent tool gets consistent context. `AGENTS.md` remains the exhaustive single source of truth. Keep the summary in sync with AGENTS.md when architectural rules change.

### Project-Specific Rules

16. **Never store prices in Sanity.** Prices live in Shopify. If you find a price in a Sanity schema, it is wrong. Remove it.
17. **Always use `Promise.all` for data fetching in route loaders.** Never `await` Shopify and Sanity sequentially. Every millisecond of sequential latency is paid by the user.
18. **Product handles must match exactly.** The Sanity `productSupplement.shopifyHandle` field must be byte-for-byte identical to the Shopify product handle. A mismatch produces a silently broken PDP — no Sanity content appears but no error is thrown.
19. **All images need `alt` text.** No exceptions. `alt=""` only for decorative images with zero informational content.
20. **No hardcoded hex values in component files.** All colours use Tailwind tokens that reference CSS custom properties. If a colour isn't in `tailwind.config.ts`, it doesn't exist.
21. **`formatPrice()` everywhere.** The utility in `app/lib/format.ts` formats cents (integers) to USD display strings. No raw numbers rendered as prices. No manual `$` concatenation.
22. **`sources/` is frozen.** Never edit files in `sources/`. They are historical inputs. Update knowledge in `docs/` instead.
23. **Sanity Studio redeploy after every schema change.** `cd studio && npx sanity deploy`. Schema changes are invisible to editors until the Studio is redeployed.
24. **Shopify checkout is hosted.** Do not attempt to build a custom checkout. Shopify hosted checkout is the only checkout. Redirect to it with the cart's `checkoutUrl` from the Storefront API.
25. **Business context before technical implementation.** If a technical decision doesn't have a clear business rationale, question whether to make it.
26. **WPGraphQL is local testing infrastructure.** The local endpoint is `http://localhost/prints-local/graphql`; debug/introspection may be enabled there. Do not use it as the production product API, do not expose secrets through it, and do not replace Shopify Storefront API or Sanity GROQ with it in Hydrogen.

---

## 9. Change Log

```
- 2026-06 Initial documentation scaffold completed from 14 source documents + prototype spec.
  Reason: Greenfield Workflow B batch documentation pass before Hydrogen build begins.
  Impact: Full docs/ tree, AGENTS.md, RUNBOOK.md populated. Ready for build phase.
  (Ernest Serunkuma + AI agent)

- 2026-06 Build pass: typecheck + build fixed, routes completed.
  Reason: Env type augmentation fixed, missing routes created (account, policies, drops, artists),
  cache headers added, AGENTS.md route inventory updated.
  Impact: Build passes clean (0 TS errors, 0 missing standard routes). Full route map live.
  (Ernest Serunkuma + AI agent)

- 2026-06 Launch hardening pass: product variant selection, add-to-cart, cart update/create behavior,
  canonical root Sanity Studio, scaffold validator nested generated-folder exclusions, and launch gap docs.
  Impact: Hydrogen and Vite prototype builds pass; root studio/ is canonical; apps/hydrogen/studio removed.
  (Ernest Serunkuma + AI agent)

- 2026-06 Production launch foundation closeout: repo hygiene, cart fix, PDP hardening, docs update.
  Reason: Launch readiness — fix cart fall-through bug, add sold-out PDP state, improve homepage sections,
  refactor search to use ProductGrid, remove tracked tsbuildinfo, fix scaffold validator recursion,
  create 08_launch_gap_closure.md, update docs to reflect apps/hydrogen as production target.
  Impact: typecheck/build pass for both apps/hydrogen and sources/protoype; scaffold validator passes 15/15;
  no secrets in docs; launch blockers documented. (Ernest Serunkuma + AI agent)

- 2026-06 Launch setup handoff: root Sanity Studio deploy files, safe env placeholders,
  and external-account checklist added.
  Impact: repo can support Studio install/build/deploy; Ernest still owns private Shopify,
  Printful, Sanity, Oxygen, domain, and test-order setup.
  (Ernest Serunkuma + AI agent)

- 2026-06 MiniOxygen runtime cleanup: removed `@sanity/client` and `@sanity/image-url`
  from `apps/hydrogen`, replaced them with ESM-safe local Sanity fetch/image helpers,
  and switched `server.ts` to the React Router virtual server build import.
  Impact: Hydrogen dependency tree and built server bundle no longer include `rxjs`
  or Sanity CommonJS runtime packages; root Studio remains unchanged.
  (Ernest Serunkuma + AI agent)

- 2026-06 Launch product plan execution: 22-product opening-drop manifest with WooCommerce-resolved handles;
  Sanity schema extended with mockupImages, roomImages, videos, paper, ink, edition fields;
  Studio deployed to kumachi-prints.sanity.studio; 22 product images uploaded to Sanity CDN;
  22 productSupplement documents synced with Sanity CDN image URLs; series document (opening-drop) created;
  Shopify CSV generated with Sanity CDN URLs (import-ready, 0 blockers, 115 rows);
  Hydrogen PDP updated to render mockup/room/video from Sanity supplement;
  Created artbiz helper scripts: setup_sanity.py, generate_csv.py.
  Impact: First-sale launch data pipeline complete — WooCommerce identities, Sanity editorial,
  Shopify CSV, and Hydrogen PDP all aligned. (Ernest Serunkuma + AI agent)

- 2026-06 Env-configured sitemap, BDD tests, Sanity content seeding.
  Reason: SEO preparation, test coverage, and Sanity-driven content for launch.
  Changes:
  - Added PUBLIC_SITE_URL to .env.example and Env type (fallback: PUBLIC_STORE_DOMAIN)
  - Refactored sitemap into shared lib/sitemap.server.ts used by /sitemap and /sitemap.xml
  - Sitemap includes: /, /collections, /collections/{handle}, /products/{handle},
    /drops, /drops/{slug}, /artists, /artists/{slug}, /pages/{slug}, /search
  - Sitemap excludes: /account, /cart, /api/preview, private routes, duplicates
  - XML-escaped URLs, includes lastmod from source data
  - robots.txt uses PUBLIC_SITE_URL or falls back to prints.kumachigallery.com/sitemap
  - Added @playwright/test, playwright.config.ts, BDD-style tests for sitemap, robots, pages
  - Seeded Sanity production project (2wo9hx90) with published homepage, settings, navigation
  - Header reads mainNav from Sanity navigation document (fallback to hardcoded)
  - Footer reads socialLinks + siteDescription from Sanity settings (fallback to hardcoded)
  - root.tsx passes env data (PUBLIC_SITE_URL, PUBLIC_STORE_DOMAIN) to components
  Impact: typecheck + build pass; Sanity content live at kumachi-prints.sanity.studio.
  (Ernest Serunkuma + AI agent)
```

---

## 10. Last Updated

**2026-06 by Ernest Serunkuma + AI agent**

Update this whenever you make significant changes to AGENTS.md.
