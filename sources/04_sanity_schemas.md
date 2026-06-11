# Sanity CMS — Schema Definitions

Status: Current

## Overview

Sanity runs as an embedded studio at `/studio` in the Hydrogen app during development. In production, the studio is deployed separately (Sanity-managed hosting at `your-project.sanity.studio` or self-hosted).

All Sanity schema files live in `studio/schemaTypes/`.

## Document Types

### 1. `homepage` (singleton)

One document. Controls all sections on the `/` route.

```typescript
// Fields
sections: array of:
  - hero (object)
  - featuredCollection (object)
  - editorialBanner (object)
  - productGrid (object)
  - testimonials (object)
  - newsletter (object)
  - richText (object)
seo: seoFields (object, see below)
```

The `sections` array is the page builder. Each section type is its own object type with its own fields. Sections can be reordered, enabled/disabled, and have their content edited from Sanity Studio.

### 2. `productSupplement`

Keyed to a Shopify product handle. Adds editorial content that Shopify cannot carry.

```typescript
// Fields
_id: string (= "supplement-" + shopifyHandle)
shopifyHandle: string (required, unique — must match Shopify product handle exactly)
artistRef: reference → artist (optional)
story: portableText (the narrative behind this print)
technique: string (e.g. "Giclée print on 300gsm archival paper")
inspiration: portableText (what inspired this piece)
additionalImages: array of imageWithAlt (lifestyle shots, framing mockups)
seriesRef: reference → series (optional)
seo: seoFields (overrides Shopify product SEO if set)
```

### 3. `artist`

One document per artist whose work appears in the store.

```typescript
// Fields
name: string (required)
slug: slug (required, source: name)
portrait: imageWithAlt
bio: portableText
location: string (e.g. "Kampala, Uganda")
website: url
instagramHandle: string (without @)
featuredQuote: string (used in editorial layouts)
```

### 4. `series`

One document per print drop / release series.

```typescript
// Fields
title: string (required)
slug: slug (required)
heroImage: imageWithAlt (required)
publishDate: datetime
status: string (enum: "draft" | "scheduled" | "live" | "archived")
description: portableText
artistRef: reference → artist (optional — series can feature multiple artists)
shopifyCollectionHandle: string (the Shopify collection this series maps to)
featuredProducts: array of strings (Shopify product handles, for curated ordering)
seo: seoFields
```

### 5. `page` (generic CMS page)

Covers About, Shipping, FAQ, Privacy Policy, Returns, etc.

```typescript
// Fields
title: string (required)
slug: slug (required)
body: portableText (required)
seo: seoFields
```

### 6. `settings` (singleton)

Site-wide configuration. One document.

```typescript
// Fields
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

```typescript
// Fields
mainNav: array of navItem
  navItem: object { label: string, link: string | reference → page | series }
```

## Shared Object Types

### `seoFields`
```typescript
metaTitle: string (max 60 chars)
metaDescription: string (max 160 chars)
ogImage: imageWithAlt
```

### `imageWithAlt`
```typescript
asset: reference → sanity image asset
alt: string (required — accessibility)
hotspot: boolean (enable Sanity hotspot cropping)
```

### `portableText`
Standard Sanity Portable Text with marks: strong, em, underline, link. Block types: normal, h2, h3, h4, blockquote. Custom block types: productEmbed (embed a Shopify product card inline), imageBlock (full-width image with caption).

### `navItem`
```typescript
label: string
type: string (enum: "internal" | "external" | "collection" | "series")
internalPath: string (for type: internal, e.g. "/about")
externalUrl: url (for type: external)
collectionHandle: string (for type: collection)
seriesRef: reference → series (for type: series)
```

## GROQ Query Patterns

### Fetch homepage sections with referenced data
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

### Fetch product supplement by Shopify handle
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

### Fetch all series (for drops listing page)
```groq
*[_type == "series" && status == "live"] | order(publishDate desc){
  title, slug, heroImage, publishDate, description,
  "artist": artistRef->{name, slug}
}
```

### Fetch site settings
```groq
*[_type == "settings"][0]{
  siteName, siteDescription, announcementBar, footerNavigation, socialLinks, defaultSeo
}
```

## Visual Editing

Sanity Visual Editing is pre-configured in the Fluid starter. It enables:
- Overlay editing: click any content element on the live page to edit it in the Sanity pane
- Live preview: content changes reflect in the storefront instantly without saving
- Preview mode is activated via a secret URL parameter: `?sanity-preview=true&sanity-preview-secret=YOUR_SECRET`

The preview secret is stored in `SANITY_PREVIEW_SECRET` environment variable.

*Last updated: 2026-06-10*
