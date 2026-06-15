# Sanity CMS — Schema Definitions & GROQ Queries

Status: Current

## Document Types

### 1. `homepage` (singleton)

One document. Controls all sections on the `/` route.

```
Fields:
  sections: array of:
    - hero (object)
    - featuredCollection (object)
    - editorialBanner (object)
    - productGrid (object)
    - testimonials (object)
    - newsletter (object)
    - richText (object)
  seo: seoFields
```

The sections array is the page builder. Each section type is its own object type.

### 2. `productSupplement`

Keyed to a Shopify product handle. Adds editorial content to a product — never stores prices, variants, or inventory.

```
Fields:
  _id: string (= "supplement-" + shopifyHandle)
  shopifyHandle: string (required, unique)
  artistRef: reference → artist (optional)
  story: portableText
  technique: string
  inspiration: portableText
  paper: string                # e.g. "310gsm archival matte paper"
  ink: string                  # e.g. "Archival pigment ink"
  edition: string              # e.g. "Open edition" or "Limited to 50"
  additionalImages: array of imageWithAlt
  mockupImages: array of imageWithAlt   # lifestyle mockups (in-space renders)
  roomImages: array of imageWithAlt     # room-view photos
  videos: array of object { asset: file, poster: image, url: string }
  seriesRef: reference → series (optional)
  seo: seoFields
```

### 3. `artist`

One document per artist.

```
Fields:
  name: string (required)
  slug: slug (required, source: name)
  portrait: imageWithAlt
  bio: portableText
  location: string
  website: url
  instagramHandle: string (without @)
  featuredQuote: string
```

### 4. `series`

One document per print drop/release.

```
Fields:
  title: string (required)
  slug: slug (required)
  heroImage: imageWithAlt (required)
  publishDate: datetime
  status: string (enum: "draft" | "scheduled" | "live" | "archived")
  description: portableText
  artistRef: reference → artist (optional)
  shopifyCollectionHandle: string
  featuredProducts: array of strings (Shopify product handles)
  seo: seoFields
```

### 5. `page` (generic CMS page)

For About, Shipping, FAQ, Privacy Policy, Returns, etc.

```
Fields:
  title: string (required)
  slug: slug (required)
  body: portableText (required)
  seo: seoFields
```

### 6. `settings` (singleton)

Site-wide configuration.

```
Fields:
  siteName: string
  siteDescription: string
  announcementBar: object { enabled: boolean, text: string, link: url }
  footerNavigation: array of navItem
  socialLinks: object { instagram: url, twitter: url, facebook: url }
  defaultSeo: seoFields
  cookieBanner: object { enabled: boolean, text: portableText }
```

### 7. `navigation` (singleton)

Main navigation structure.

```
Fields:
  mainNav: array of navItem
```

## Section Object Types (Page Builder)

These object types are used exclusively within the `homepage.sections` array.

### `hero`
```
heading: string
subheading: string
backgroundImage: imageWithAlt     # faded as bg behind content
cta: object { label: string, url: url }
```

### `featuredCollection`
```
title: string
description: string
collectionHandle: string          # Shopify collection handle
seriesRef: reference → series    # optional, links to editorial series
maxProducts: number               # limit count
```

### `editorialBanner`
```
heading: string
body: string
image: imageWithAlt               # full-width editorial image
cta: object { label: string, url: url }
```

### `productGrid`
```
title: string
products: array of string         # Shopify product handles (optional)
collectionHandle: string          # fallback: fetch from collection
maxProducts: number               # limit count
```

### `testimonials`
```
title: string
testimonials: array of object { quote: string, author: string }
```

### `newsletter`
```
heading: string
description: string
```

### `richText`
```
body: portableText                # freeform rich text block
```

## Scaffold Document Types (from frontvibe/fluid)

These types are inherited from the frontvibe/fluid Hydrogen scaffold and are not actively used in the storefront. They exist in the Studio schema for backward compatibility.

| Type | Intended Use | Status |
|------|-------------|--------|
| `product` | Shopify product mirror | Not used — Shopify is source of truth |
| `productVariant` | Shopify variant mirror | Not used — Shopify is source of truth |
| `collection` | Shopify collection mirror | Not used — Shopify is source of truth |
| `colorTheme` | Theme customization | Not used — Tailwind tokens used instead |

**Do not remove these from the schema** — the Studio deploy will fail if the schema references a removed type. They are kept as empty shells.

## Shared Object Types

### `seoFields`
```
metaTitle: string (max 60 chars)
metaDescription: string (max 160 chars)
ogImage: imageWithAlt
```

### `imageWithAlt`
```
asset: reference → sanity image asset
alt: string (required — accessibility)
hotspot: boolean (enable Sanity hotspot cropping)
```

### `portableText`
Standard Sanity Portable Text with:
- Marks: strong, em, underline, link
- Block types: normal, h2, h3, h4, blockquote
- Custom block types: productEmbed (embed a Shopify product card), imageBlock (full-width image with caption)

### `navItem`
```
label: string
type: string (enum: "internal" | "external" | "collection" | "series")
internalPath: string (for type: "internal", e.g. "/about")
externalUrl: url (for type: "external")
collectionHandle: string (for type: "collection")
seriesRef: reference → series (for type: "series")
```

## GROQ Query Patterns

All query constants live in `app/lib/queries.ts`.

### Homepage sections
```groq
*[_type == "homepage"][0]{
  sections[]{
    _type,
    ...,
    "seriesRef": seriesRef->{
      title, slug, heroImage, shopifyCollectionHandle
    }
  },
  seo
}
```

### Product supplement by Shopify handle
```groq
*[_type == "productSupplement" && shopifyHandle == $handle][0]{
  story,
  technique,
  inspiration,
  additionalImages,
  "artist": artistRef->{name, slug, portrait, bio, featuredQuote},
  "series": seriesRef->{title, slug}
}
```

### All live series (for drops listing)
```groq
*[_type == "series" && status == "live"] | order(publishDate desc){
  title, slug, heroImage, publishDate, description,
  "artist": artistRef->{name, slug}
}
```

### Artist by slug
```groq
*[_type == "artist" && slug.current == $slug][0]{
  name,
  slug,
  portrait,
  bio,
  location,
  website,
  instagramHandle,
  featuredQuote
}
```

### Site settings
```groq
*[_type == "settings"][0]{
  siteName, siteDescription, announcementBar, footerNavigation, socialLinks, defaultSeo
}
```

### Navigation
```groq
*[_type == "navigation"][0]{
  mainNav[]{
    label,
    type,
    internalPath,
    externalUrl,
    collectionHandle,
    "seriesRef": seriesRef->{title, slug}
  }
}
```

### Page by slug
```groq
*[_type == "page" && slug.current == $slug][0]{
  title,
  body,
  seo
}
```

*Last updated: 2026-06*
