# Component & UI Conventions

Status: Current

## Base Component Library

The Fluid starter includes shadcn/ui and Radix UI as component primitives. Use these rather than building custom UI primitives from scratch.

Available shadcn/ui components in Fluid: Button, Dialog, Sheet (for cart drawer), Separator, Badge, Select, Accordion (for FAQs and product details), Tabs, ScrollArea.

Add additional shadcn/ui components as needed: `npx shadcn-ui@latest add [component-name]`

## Component Directory Structure

```
app/components/
├── layout/
│   ├── Header.tsx           ← Site header, nav, cart icon
│   ├── Footer.tsx           ← Footer nav, social links, newsletter
│   └── AnnouncementBar.tsx  ← Optional promo bar from Sanity settings
├── product/
│   ├── ProductCard.tsx      ← Grid card (image, title, price)
│   ├── ProductGrid.tsx      ← Renders a collection of ProductCards
│   ├── VariantSelector.tsx  ← Size + Frame option buttons
│   ├── AddToCart.tsx        ← Add to cart button + quantity
│   └── ProductMedia.tsx     ← Image gallery with thumbnail strip
├── cart/
│   ├── CartDrawer.tsx       ← Slide-in cart (Sheet component)
│   ├── CartItem.tsx         ← Single line item in cart
│   └── CartSummary.tsx      ← Subtotal + checkout button
├── editorial/
│   ├── SeriesCard.tsx       ← Drop/series thumbnail card
│   ├── ArtistCard.tsx       ← Artist profile card
│   └── PortableText.tsx     ← Sanity Portable Text renderer
├── sections/
│   ← One component per Sanity homepage section type
│   ├── HeroSection.tsx
│   ├── FeaturedCollectionSection.tsx
│   ├── EditorialBannerSection.tsx
│   ├── ProductGridSection.tsx
│   ├── TestimonialsSection.tsx
│   └── NewsletterSection.tsx
└── shared/
    ├── SanityImage.tsx      ← Sanity image with urlFor + responsive sizing
    └── Seo.tsx              ← SEO meta tag helper
```

## Naming Conventions

- Component files: PascalCase (`ProductCard.tsx`)
- Route files: lowercase with dots (`products.$handle.tsx`)
- Utility files: camelCase (`cart.server.ts`)
- Sanity schema files: camelCase (`productSupplement.ts`)
- GROQ query constants: SCREAMING_SNAKE_CASE (`PRODUCT_QUERY`)

## Server vs Client Components

Hydrogen uses React Router v7. The distinction is:

- **Route loaders** (`export async function loader`) — always server-side. Fetch data here.
- **Route default export** — renders on server (SSR) then hydrates on client
- Components with `"use client"` — client-side only (avoid unless necessary for interactivity)
- Cart mutations — use Remix `fetcher` to submit forms without full page navigation

Keep client-side JavaScript minimal. The storefront should be largely server-rendered for performance and SEO.

## Image Component Usage

**Shopify images** (product photos, collection thumbnails):
```tsx
import {Image} from '@shopify/hydrogen';

<Image
  data={product.featuredImage}
  sizes="(min-width: 768px) 50vw, 100vw"
  className="w-full h-full object-cover"
/>
```

**Sanity images** (editorial content, artist portraits, series heroes):
```tsx
import {urlFor} from '~/lib/sanity';

<img
  src={urlFor(image).width(800).auto('format').url()}
  alt={image.alt}
  width={800}
  height={600}
  loading="lazy"
/>
```

Never use raw Sanity CDN URLs without `urlFor()` — the builder handles format conversion and responsive sizing.

## Cart State Pattern

Cart state lives in the server session (Hydrogen's default). The cart is fetched server-side in `root.tsx` and passed to the client via the root loader.

Cart mutations use Remix actions:
```tsx
// In CartDrawer.tsx
const fetcher = useFetcher();

function handleRemove(lineId: string) {
  fetcher.submit(
    { lineId, intent: 'remove' },
    { method: 'post', action: '/cart' }
  );
}
```

Never manage cart state in React `useState` or client-side storage. The server is the source of truth.

## Accessible Patterns

- All interactive elements must be keyboard-accessible
- All images must have meaningful `alt` text (not empty `alt=""` unless decorative)
- Colour contrast must meet WCAG AA (4.5:1 for normal text, 3:1 for large text)
- The cart drawer must trap focus when open
- Variant selectors must communicate selected/unavailable state to screen readers via `aria-pressed` and `aria-disabled`

## Tailwind Configuration

The design system tokens (from `sources/design-system.md` when added) go in `tailwind.config.ts`. See the design source files for exact values. Agents: do not hardcode hex values in component files — always use Tailwind tokens.

*Last updated: 2026-06-10*
