import storefrontExport from '~/data/local-fallback/storefront-products.json';
import siteContentExport from '~/data/local-fallback/sanity-site-content.ndjson?raw';
import {OPENING_DROP_HANDLES} from '~/lib/allowlist';
import {genreToSlug, regionToSlug} from '~/lib/productFacets';
import {enrichLaunchProduct} from '~/lib/launchProductMeta';

let storefrontCache: any[] | null = null;
let siteContentCache: Record<string, any> | null = null;

function fallbackEnabled(env: any = {}) {
  return env?.ENABLE_LOCAL_CONTENT_FALLBACK === 'true' || process.env.NODE_ENV !== 'production';
}

async function readStorefrontProducts(env: any = {}): Promise<any[]> {
  if (!fallbackEnabled(env)) return [];
  if (storefrontCache) return storefrontCache;

  try {
    const payload = storefrontExport as any;
    storefrontCache = Array.isArray(payload?.products) ? payload.products : [];
  } catch {
    storefrontCache = [];
  }

  return storefrontCache || [];
}

async function readSiteContent(env: any = {}): Promise<Record<string, any>> {
  if (!fallbackEnabled(env)) return {};
  if (siteContentCache) return siteContentCache;

  const docs: Record<string, any> = {};
  try {
    for (const line of siteContentExport.split(/\r?\n/)) {
      if (!line.trim()) continue;
      const doc = JSON.parse(line);
      if (doc?._id) docs[doc._id] = doc;
    }
  } catch {
    // Missing local exports should never break live storefront rendering.
  }

  siteContentCache = docs;
  return siteContentCache || {};
}

function fallbackImage(product: any) {
  const image = product?.image || product?.images?.[0];
  if (!image?.src) return null;
  return {
    id: `fallback-image-${product.handle}`,
    url: image.src,
    altText: image.alt || product.title,
    width: 1200,
    height: 1500,
  };
}

function fallbackVariant(product: any, size: string, index: number) {
  return {
    id: `fallback-${product.sku}-${size}`,
    title: size,
    availableForSale: false,
    selectedOptions: [{name: 'Size', value: size}],
    price: {amount: '0.00', currencyCode: 'USD'},
    compareAtPrice: null,
    sku: `${product.sku}-${size}`,
    _fallback: true,
    _position: index,
  };
}

export function toHydrogenProduct(product: any) {
  const featuredImage = fallbackImage(product);
  const variants = (product?.sizes || []).map((size: string, index: number) =>
    fallbackVariant(product, size, index + 1),
  );

  return {
    id: `fallback-product-${product.handle}`,
    handle: product.handle,
    title: product.title,
    vendor: product.artist?.name || 'Kuma',
    productType: product.category_name || product.genre || 'Art Print',
    description: product.short_description || product.description || '',
    descriptionHtml: product.long_description || product.description || '',
    featuredImage,
    images: {nodes: featuredImage ? [featuredImage] : []},
    priceRange: {
      minVariantPrice: {amount: '0.00', currencyCode: 'USD'},
      maxVariantPrice: {amount: '0.00', currencyCode: 'USD'},
    },
    variants: {nodes: variants},
    tags: product.seo_tags || [],
    collections: {nodes: [{title: product.category_name || product.genre || 'Art Print'}]},
    seo: {
      title: product.title ? `${product.title} | Kumachi Prints` : 'Kumachi Prints',
      description: product.short_description || product.description || '',
    },
    facets: {
      colors: product.colors || [],
      region: product.region ? regionToSlug(product.region) : undefined,
      genre: genreToSlug(product.category_name || product.genre || ''),
      priceBand: null,
    },
    _fallback: true,
    _source: product,
  };
}

export async function getFallbackProduct(handle: string, env: any = {}) {
  const products = await readStorefrontProducts(env);
  const product = products.find((item) => item.handle === handle);
  return product ? toHydrogenProduct(product) : null;
}

export async function getFallbackProducts(env: any = {}) {
  const products = await readStorefrontProducts(env);
  return products.filter((p) => OPENING_DROP_HANDLES.has(p.handle)).map(toHydrogenProduct).map(enrichLaunchProduct);
}

export async function getFallbackCollection(handle: string, env: any = {}) {
  const products = await readStorefrontProducts(env);
  if (!products.length) return null;

  const filtered =
    handle === 'all'
      ? products
      : handle === 'opening-drop'
        ? products.filter((item) => OPENING_DROP_HANDLES.has(item.handle))
        : products.filter((item) => {
            const slug = (item.category_name || item.genre || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            return slug === handle;
          });

  if (!filtered.length) return null;

  const title =
    handle === 'all'
      ? 'All Prints'
      : handle === 'opening-drop'
        ? 'Opening Drop'
        : filtered[0].category_name || filtered[0].genre || 'Collection';

  return {
    id: `fallback-collection-${handle}`,
    handle,
    title,
    description:
      handle === 'opening-drop'
        ? 'The first Kumachi Prints release: 22 curated open-drop artworks from Kuma.'
        : 'African art prints from Kumachi Prints.',
    image: fallbackImage(filtered[0]),
    products: {nodes: filtered.map(toHydrogenProduct).map(enrichLaunchProduct)},
    _fallback: true,
  };
}

export async function getFallbackSiteDoc(id: string, env: any = {}) {
  const docs = await readSiteContent(env);
  return docs[id] || null;
}

export async function getFallbackPage(slug: string, env: any = {}) {
  return getFallbackSiteDoc(`page-${slug}`, env);
}

export async function getFallbackSeries(slug: string, env: any = {}) {
  return getFallbackSiteDoc(`series-${slug}`, env);
}
