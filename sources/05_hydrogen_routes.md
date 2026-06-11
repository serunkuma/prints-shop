# Hydrogen Routes & Page Architecture

Status: Current

## Framework

Hydrogen is built on React Router v7 (formerly Remix). Every route is a file in `app/routes/`. Each route file exports a `loader` function (server-side data fetching) and a default React component (render).

## Route Map

### Launch-critical routes (must exist before going live)

| File | URL pattern | Data sources | Notes |
|---|---|---|---|
| `app/routes/_index.tsx` | `/` | Sanity (sections) + Shopify (featured products) | Homepage |
| `app/routes/collections.$handle.tsx` | `/collections/:handle` | Shopify collection + products | Collection/category page |
| `app/routes/products.$handle.tsx` | `/products/:handle` | Shopify product + Sanity productSupplement | Product detail page (PDP) |
| `app/routes/cart.tsx` | `/cart` | Shopify cart API | Cart page (fallback to drawer) |
| `app/routes/search.tsx` | `/search` | Shopify Storefront Search API | Search results |
| `app/routes/pages.$handle.tsx` | `/pages/:handle` | Sanity page documents | CMS-managed static pages |

### Pre-launch routes (add before full launch)

| File | URL pattern | Data sources | Notes |
|---|---|---|---|
| `app/routes/drops._index.tsx` | `/drops` | Sanity series (all live) | Drops listing page |
| `app/routes/drops.$handle.tsx` | `/drops/:handle` | Sanity series + Shopify products | Editorial drop landing page |
| `app/routes/artists._index.tsx` | `/artists` | Sanity artist (all) | Artists listing |
| `app/routes/artists.$handle.tsx` | `/artists/:handle` | Sanity artist + their products | Artist profile page |

### Post-launch routes

| File | URL pattern | Data sources | Notes |
|---|---|---|---|
| `app/routes/account.tsx` | `/account` | Shopify Customer Account API | Customer portal |
| `app/routes/account.orders.tsx` | `/account/orders` | Shopify orders | Order history |
| `app/routes/sitemap.xml.tsx` | `/sitemap.xml` | Shopify + Sanity | SEO sitemap |
| `app/routes/robots.txt.tsx` | `/robots.txt` | Static | Crawler rules |

## Data Loading Pattern

Every route that needs both Shopify and Sanity data uses this pattern:

```typescript
// app/routes/products.$handle.tsx
export async function loader({ params, context }: LoaderFunctionArgs) {
  const { handle } = params;

  // Parallel fetch — do not await sequentially
  const [shopifyProduct, sanitySupplement] = await Promise.all([
    context.storefront.query(PRODUCT_QUERY, { variables: { handle } }),
    context.sanity.fetch(PRODUCT_SUPPLEMENT_QUERY, { handle })
  ]);

  if (!shopifyProduct) throw new Response(null, { status: 404 });

  return json({ shopifyProduct, sanitySupplement });
}
```

Always fetch Shopify and Sanity data in parallel using `Promise.all`. Never await them sequentially.

## Cart Architecture

Cart state is managed server-side via Shopify's Cart API. The cart drawer is a client-side React component that fetches from the `/cart` route. Cart mutations (add, update, remove) use Remix `fetcher` to call cart action routes without page navigation.

Key files:
- `app/components/CartDrawer.tsx` — slide-in cart UI
- `app/routes/cart.tsx` — cart page + cart action handlers
- `app/lib/cart.server.ts` — server-side cart utilities

## Layout Architecture

```
app/root.tsx                  ← HTML shell, global providers, header, footer
  └── app/routes/_index.tsx   ← Homepage
  └── app/routes/collections.$handle.tsx
  └── app/routes/products.$handle.tsx
  └── (all other routes)
```

`root.tsx` loads site-wide data once:
- Sanity `settings` document (announcement bar, footer nav, social links)
- Cart (to show cart item count in header)

This data is available to all routes via `useRootLoaderData()`.

## Error Boundaries

Every route should export an `ErrorBoundary` component:

```typescript
export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }
  return <GeneralError />;
}
```

404 and 500 states must be handled gracefully with on-brand error pages, not naked browser errors.

## SEO

Every route exports a `meta` function:

```typescript
export function meta({ data }: MetaArgs) {
  const sanityMeta = data?.sanitySupplement?.seo;
  const shopifyMeta = data?.shopifyProduct;
  return [
    { title: sanityMeta?.metaTitle || shopifyProduct?.title + " — Kumachi Prints" },
    { name: "description", content: sanityMeta?.metaDescription || shopifyProduct?.description?.slice(0, 160) },
    { property: "og:image", content: sanityMeta?.ogImage?.url || shopifyProduct?.featuredImage?.url },
  ];
}
```

Sanity SEO fields override Shopify defaults when present.

## Image Handling

- Shopify product images: use Hydrogen's `<Image>` component which handles Shopify CDN URLs, responsive sizes, and lazy loading
- Sanity images: use `@sanity/image-url` builder with `urlFor(image).width(800).auto('format').url()`
- All `<img>` elements must have meaningful `alt` text

*Last updated: 2026-06-10*
