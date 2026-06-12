# WooCommerce Mirror Bridge

Status: Current

The Vite prototype can use the local WooCommerce mirror as its real product source during local preview. The mirror lives inside the local WordPress simulator at `C:\wamp64\www\prints-local`; `art-business` is the command center that keeps this simulator and the exported storefront data current.

## Source URLs

Commerce fields come from the public Woo Store API:

```text
http://localhost/prints-local/wp-json/wc/store/v1/products?slug=:handle
http://localhost/prints-local/wp-json/wc/store/v1/products/:variationId
```

Editorial supplement fields come from the safe `art-business` export:

```text
http://localhost/prints-local/art-business/artifacts/exports/storefront-products.json
```

No WooCommerce consumer key or secret may be used in browser code.

## Field Split

Woo supplies title, slug, SKU, descriptions, images, categories, tags, price range, size terms, variation IDs, and variation prices.

The export supplies artist, region, genre, series, color palette, material policy, frame policy, room mockups, image alt text, print details, and trust copy.

## Prototype Routes

The prototype route remains:

```text
/product/:handle
```

The future Shopify/Hydrogen canonical route is:

```text
/products/:handle
```

Keep both working while the prototype is used as a local preview/reference.

## Production Handoff

The prototype exists to prove product content before and during the Hydrogen build. Production Hydrogen should fetch commerce from Shopify and editorial supplements from Sanity by the same product handle. The local Woo mirror remains a simulator and planning environment, not a browser-facing production API.
