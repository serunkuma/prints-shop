import storefrontExport from '~/data/local-fallback/storefront-products.json';
import {genreToSlug, regionToSlug} from '~/lib/productFacets';

function sourceForHandle(handle: string) {
  return (storefrontExport as any)?.products?.find((item: any) => item.handle === handle);
}

export function launchProductFacets(handle: string) {
  const source = sourceForHandle(handle);
  if (!source) return null;

  return {
    colors: source.colors || [],
    region: source.region ? regionToSlug(source.region) : undefined,
    genre: genreToSlug(source.category_name || source.genre || ''),
    priceBand: null,
  };
}

export function enrichLaunchProduct(product: any) {
  if (!product?.handle) return product;
  const source = sourceForHandle(product.handle);
  if (!source) return product;

  return {
    ...product,
    vendor: product.vendor || source.artist?.name || 'Kuma',
    productType: product.productType || source.category_name || source.genre || 'Art Print',
    tags: product.tags || source.seo_tags || [],
    collections: product.collections || {nodes: [{title: source.category_name || source.genre || 'Art Print'}]},
    facets: {
      ...launchProductFacets(product.handle),
      ...(product.facets || {}),
    },
    _source: product._source || source,
  };
}
