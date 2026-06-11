# Analytics & SEO

Status: Current

## Analytics Stack

Ernest uses a strict one-question-one-tool analytics philosophy. Each business question maps to exactly one tool with no overlap.

| Business question | Tool | Status |
|---|---|---|
| How many visitors? Which pages? What traffic sources? | Umami (self-hosted) | Required at launch |
| Is the site indexed? Which queries drive clicks? | Google Search Console | Required at launch |
| How are Google Ads performing? Cross-channel attribution? | GA4 | Deferred — only installed when Google Ads are running |

Do not install GA4 before Google Ads are actively running. It adds no value without cross-channel attribution data and adds page weight unnecessarily.

## Umami Setup

Ernest runs a single Umami instance tracking all four Kumachi properties. The prints store is one of the tracked sites.

### Adding the prints store to Umami

1. Log into Umami admin
2. Settings → Websites → Add website
3. Name: `Kumachi Prints`, Domain: `prints.kumachigallery.com`
4. Copy the tracking script tag

### Installing in Hydrogen

Add the Umami script to `app/root.tsx` inside the `<head>` section via Remix's `<Links>` or directly in the HTML:

```tsx
// app/root.tsx
export function links() {
  return [
    // other links
  ];
}

// In the root component, add to <head>:
<script
  async
  defer
  data-website-id="YOUR_UMAMI_WEBSITE_ID"
  src="https://your-umami-instance.com/script.js"
/>
```

Replace `YOUR_UMAMI_WEBSITE_ID` with the ID from Umami admin.

### What Umami tracks (automatically)

- Page views and unique visitors
- Referral sources
- Device types (desktop/mobile/tablet)
- Countries
- Browser and OS
- Bounce rate

### Custom events (add for e-commerce context)

Track these events using `window.umami.track()`:

| Event name | When to fire |
|---|---|
| `add_to_cart` | When a product is added to cart |
| `checkout_started` | When user clicks "Checkout" in cart |
| `product_viewed` | On every PDP view (with product handle as data) |
| `collection_viewed` | On every collection page view |
| `drop_viewed` | When an editorial drop page is viewed |
| `search_performed` | When a search query is submitted |

## Google Search Console

Verify `prints.kumachigallery.com` before launch.

Verification method: DNS TXT record (preferred — does not require any code change in Hydrogen).

In Google Search Console → Add property → Domain → copy TXT record value → add to DNS for `kumachigallery.com` domain.

When the store migrates to `kumachiprints.com`, add that property to Search Console separately. Do not remove the gallery subdomain property — maintain both.

### Sitemap

The `app/routes/sitemap.xml.tsx` route must generate and serve a valid XML sitemap. It should include:

- All Shopify product URLs: `/products/:handle`
- All Shopify collection URLs: `/collections/:handle`
- All Sanity series URLs: `/drops/:handle`
- All Sanity page URLs: `/pages/:handle`
- All Sanity artist URLs: `/artists/:handle`
- Homepage: `/`

Submit the sitemap URL to Google Search Console after launch: `https://prints.kumachigallery.com/sitemap.xml`

### robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://prints.kumachigallery.com/sitemap.xml
```

No pages should be disallowed at launch.

## SEO Metadata Requirements

Every page must have:
- `<title>` tag — unique per page, max 60 characters
- `<meta name="description">` — unique per page, max 160 characters
- `<meta property="og:title">` — for social sharing
- `<meta property="og:description">` — for social sharing
- `<meta property="og:image">` — for social sharing (1200×630px recommended)
- `<link rel="canonical">` — pointing to the canonical URL

SEO priority:
1. Sanity `seoFields` override (when set on a document)
2. Shopify product title/description (for product pages)
3. Auto-generated fallback from page content

## Core Web Vitals

Oxygen + Hydrogen is optimised for performance, but these must be actively maintained:

- Images must use the `<Image>` component (Hydrogen) or `urlFor().auto('format')` (Sanity) — never raw `<img>` with unoptimised URLs
- Avoid importing large client-side libraries. The JavaScript bundle must stay lean.
- No layout shift: all images must have explicit `width` and `height` props or `aspect-ratio` CSS

*Last updated: 2026-06-10*
