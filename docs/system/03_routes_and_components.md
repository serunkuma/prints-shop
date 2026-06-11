# Routes & Components

Status: Current

## Full Route Map

### Launch-Critical Routes

| File | URL | Data Sources | Notes |
|------|-----|-------------|-------|
| `app/routes/_index.tsx` | `/` | Sanity sections + Shopify featured products | Homepage |
| `app/routes/products.$handle.tsx` | `/products/:handle` | Shopify product + Sanity productSupplement | PDP |
| `app/routes/collections.$handle.tsx` | `/collections/:handle` | Shopify collection + products | Collection/category page |
| `app/routes/cart.tsx` | `/cart` | Shopify cart API | Cart page + action handlers |
| `app/routes/search.tsx` | `/search` | Shopify Storefront Search API | Search results |
| `app/routes/pages.$handle.tsx` | `/pages/:handle` | Sanity page documents | CMS static pages |

### Pre-Launch Routes

| File | URL | Data Sources | Notes |
|------|-----|-------------|-------|
| `app/routes/drops._index.tsx` | `/drops` | Sanity series (all live) | Drops listing |
| `app/routes/drops.$handle.tsx` | `/drops/:handle` | Sanity series + Shopify products | Drop landing page |
| `app/routes/artists._index.tsx` | `/artists` | Sanity artists (all) | Artists listing |
| `app/routes/artists.$handle.tsx` | `/artists/:handle` | Sanity artist + their products | Artist profile |

### Post-Launch Routes

| File | URL | Data Sources | Notes |
|------|-----|-------------|-------|
| `app/routes/account.tsx` | `/account` | Shopify Customer Account API | Customer portal |
| `app/routes/account.orders.tsx` | `/account/orders` | Shopify orders | Order history |
| `app/routes/sitemap.xml.tsx` | `/sitemap.xml` | Shopify + Sanity | SEO sitemap |
| `app/routes/robots.txt.tsx` | `/robots.txt` | Static | Crawler rules |

## Data Loading Pattern

```typescript
// app/routes/products.$handle.tsx
export async function loader({ params, context }: LoaderFunctionArgs) {
  const { handle } = params;

  // Parallel fetch — NEVER await sequentially
  const [shopifyProduct, sanitySupplement] = await Promise.all([
    context.storefront.query(PRODUCT_QUERY, { variables: { handle } }),
    context.sanity.fetch(PRODUCT_SUPPLEMENT_QUERY, { handle })
  ]);

  if (!shopifyProduct) throw new Response(null, { status: 404 });

  return json({ shopifyProduct, sanitySupplement });
}
```

## Cart Architecture

Cart state is managed server-side via Shopify's Cart API (Storefront API). The cart is fetched in `root.tsx` and passed to all routes via `useRootLoaderData()`.

```
root.tsx loader
  └── Get cart from session → fetch from Storefront API
        └── Pass cart data via useRootLoaderData()
              └── CartDrawer reads from context
```

Cart mutations use Remix fetchers:
```tsx
// app/components/cart/CartDrawer.tsx
const fetcher = useFetcher();

function handleAddToCart(variantId: string, quantity: number) {
  fetcher.submit(
    { variantId, quantity, intent: 'add' },
    { method: 'post', action: '/cart' }
  );
}
```

All cart actions are handled in `app/routes/cart.tsx`:
- `intent: 'add'` — add item to cart
- `intent: 'update'` — update item quantity
- `intent: 'remove'` — remove item from cart

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

| Type | Convention | Examples |
|------|-----------|----------|
| Component files | PascalCase | `ProductCard.tsx` |
| Route files | lowercase with dots | `products.$handle.tsx` |
| Utility files | camelCase | `cart.server.ts`, `format.ts` |
| Sanity schema files | camelCase | `productSupplement.ts` |
| GROQ query constants | SCREAMING_SNAKE_CASE | `PRODUCT_QUERY`, `SITE_SETTINGS_QUERY` |
| Zustand stores | camelCase | `useCartStore`, `useUIStore` |

## Server vs Client Components

| Type | File Suffix | Runs On | Use For |
|------|-------------|---------|---------|
| Route loader | — | Server only | All data fetching |
| Route component | — | Server + client | Page rendering |
| Client component | `"use client"` directive | Client only | Interactivity, browser APIs, animations |

Keep client-side JavaScript minimal. The storefront should be largely server-rendered.

## SEO Meta Function Pattern

```typescript
export function meta({ data }: MetaArgs) {
  const sanityMeta = data?.sanitySupplement?.seo;
  const shopifyProduct = data?.shopifyProduct;

  return [
    {
      title: sanityMeta?.metaTitle
        || shopifyProduct?.title + " — Kumachi Prints"
    },
    {
      name: "description",
      content: sanityMeta?.metaDescription
        || shopifyProduct?.description?.slice(0, 160)
    },
    {
      property: "og:image",
      content: sanityMeta?.ogImage?.url || shopifyProduct?.featuredImage?.url
    },
  ];
}
```

Sanity SEO fields override Shopify defaults when present.

## Error Boundary Pattern

```typescript
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }

  return <GeneralError />;
}
```

Every route should export an ErrorBoundary. Both `NotFound` and `GeneralError` components must be on-brand, not browser-default error pages.

## Image Handling Summary

| Image Source | Component | Library | Props |
|-------------|-----------|---------|-------|
| Shopify product | `<Image>` | `@shopify/hydrogen` | `data`, `sizes`, `className` |
| Sanity editorial | `<img>` | `@sanity/image-url` | `src={urlFor(image).width(800).auto('format').url()}`, `alt` |

All `<img>` elements must have meaningful `alt` text. `alt=""` only for decorative images with zero informational content.

*Last updated: 2026-06*
