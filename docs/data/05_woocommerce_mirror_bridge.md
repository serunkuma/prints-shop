# WooCommerce Mirror Bridge

Status: Current

The Vite prototype can use the local WooCommerce mirror as its real product source during the bridge phase.

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

The bridge route remains:

```text
/product/:handle
```

The future Shopify/Hydrogen canonical route is:

```text
/products/:handle
```

Keep both working while the prototype is the bridge storefront.
