# System Architecture

Status: Current

## Data Flow (Browser to Rendered Page)

```
Browser request
  │
  ▼
Shopify Oxygen edge (Cloudflare workerd)
  │
  ▼
Hydrogen route loader (server-side)
  ├── context.storefront.query()  →  Shopify Storefront API
  │     └── products, variants, prices, cart, collections
  └── context.sanity.fetch()      →  Sanity GROQ API
        └── homepage sections, editorial content, settings, artist/series data
  │
  Promise.all([shopifyData, sanityData])   ← ALWAYS parallel
  │
  ▼
React component (SSR on Oxygen edge)
  │  layout.tsx (Header, Footer, AnnouncementBar)
  │  route component (page sections)
  │  shared components (SanityImage, Seo)
  │
  ▼
HTML streamed to browser
  │
  ▼
Hydration (client-side React)
  │  Zustand for UI state (cart drawer open/close)
  │  Framer Motion for animations
  │  Remix fetchers for cart mutations
```

## Rendering Model

Hydrogen uses React Router v7 (formerly Remix). Every route file exports:

1. **`loader` function** — runs server-side on every request. Fetches data from Shopify and Sanity. Returns JSON.
2. **Default component** — renders the UI. Runs on server (SSR) and client (hydration).
3. **`meta` function** — sets SEO tags (title, description, OG tags).
4. **`ErrorBoundary`** — handles 404, 500, and other error states.

## Oxygen Edge Deployment

Oxygen runs on Shopify's global CDN using the Cloudflare workerd runtime. Key characteristics:
- Serverless — no Node.js server to manage
- Edge-deployed — requests are served from the nearest data centre
- Cold starts — minimal, but first request from a new region may be slightly slower
- Auto-scaling — handles traffic spikes without configuration
- Preview deployments — every PR branch gets a unique `.oxygen.myshopify.com` URL

## Sanity Visual Editing

Visual Editing allows Ernest to click on any content element on the live page and edit it in Sanity Studio. Architecture:

1. The Fluid starter includes `@sanity/visual-editing` and `@sanity/preview-kit`
2. Preview mode is activated by URL parameters: `?sanity-preview=true&sanity-preview-secret=SECRET`
3. When preview mode is active, the Sanity client uses the `SANITY_API_READ_TOKEN` to fetch unpublished drafts
4. Content changes in Sanity Studio are reflected on the page in real time via GROQ subscriptions
5. When the content is published, a webhook can trigger Oxygen cache revalidation

## Component Hierarchy

```
root.tsx
  ├── QueryClientProvider (React Query)
  ├── CartProvider (server cart context)
  ├── AnnouncementBar (from Sanity settings)
  ├── Header (navigation from Sanity)
  │
  ├── Route component (page-specific content)
  │   ├── Sections (from Sanity homepage builder)
  │   │   ├── HeroSection
  │   │   ├── FeaturedCollectionSection
  │   │   ├── EditorialBannerSection
  │   │   ├── ProductGridSection
  │   │   ├── TestimonialsSection
  │   │   └── NewsletterSection
  │   └── Product components (on product pages)
  │       ├── ProductMedia (image gallery)
  │       ├── VariantSelector (size + frame)
  │       ├── AddToCart (quantity + button)
  │       └── Editorial content (story, technique, inspiration)
  │
  ├── CartDrawer (slide-in, Sheet component)
  └── Footer (from Sanity settings)
```

## State Management Model

| What | Where | How |
|------|-------|-----|
| Cart data | Server session | Shopify Storefront API Cart; fetched in root.tsx loader |
| Cart mutations | Server | Remix fetcher → POST to `/cart` action |
| UI state (drawer, menu) | Client | Zustand with persist (`kumachi-cart` key) |
| Product data | Server | Shopify Storefront API via route loaders |
| Editorial content | Server | Sanity GROQ via route loaders |
| Animations | Client | Framer Motion variants from `app/lib/animations.ts` |
| Search | Server | Shopify Storefront Search API |

## Component Decision Rules

| Type | Location | When to use |
|------|----------|-------------|
| Route loader | `app/routes/*.tsx` | Always server-side for data fetching |
| Route component | `app/routes/*.tsx` | Server-rendered, client-hydrated |
| Section component | `app/components/sections/` | Homepage section from Sanity page builder |
| Shared component | `app/components/shared/` | Reusable across multiple routes |
| shadcn/ui primitive | `@/components/ui/` | Base UI primitives (Button, Sheet, etc.) |
| "use client" component | any | Only when browser APIs or interactivity are required |

## Image Handling

**Shopify images:** Use Hydrogen's `<Image>` component for product photos, collection thumbnails, etc.
```tsx
<Image data={product.featuredImage} sizes="(min-width: 768px) 50vw, 100vw" />
```

**Sanity images:** Use `urlFor()` builder for editorial images, artist portraits, series heroes.
```tsx
<img src={urlFor(image).width(800).auto('format').url()} alt={image.alt} />
```

Never use raw CDN URLs without the builder — `urlFor()` handles format conversion and responsive sizing.

## Animation Strategy

Framer Motion variants defined in `app/lib/animations.ts`:

| Variant | Effect | Duration | Ease | Used for |
|---------|--------|----------|------|----------|
| `fadeUp` | opacity 0→1 + y 24→0 | 0.5s | [0.22, 1, 0.36, 1] | Section entrance |
| `fadeIn` | opacity 0→1 | 0.4s | default | Simple reveals |
| `staggerContainer` | staggerChildren 0.08s | — | — | Grids, lists |
| `scaleIn` | scale 0.95→1 + fade in | 0.4s | [0.22, 1, 0.36, 1] | Cards, modals |
| `slideInRight` | x 100%→0 | 0.35s | [0.22, 1, 0.36, 1] | Cart drawer, mobile nav |
| `pageTransition` | initial/animate/exit | 0.72s | [0.22, 1, 0.36, 1] | Route transitions |

Always use `whileInView={{ once: true }}` for scroll-triggered animations. Use `AnimatePresence` for conditional renders. Respect `prefers-reduced-motion: reduce`.

*Last updated: 2026-06*
