import {SITEMAP_PRODUCTS_QUERY, SITEMAP_COLLECTIONS_QUERY, SITEMAP_SERIES_QUERY, SITEMAP_ARTISTS_QUERY, SITEMAP_PAGES_QUERY} from '~/lib/queries';
import {getCanonicalSiteUrl} from '~/lib/siteUrl.server';
import {getFallbackProducts} from '~/lib/localFallback.server';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function buildSitemap(context: any): Promise<string> {
  const env = context?.env || {};
  const sanity = context?.sanity;
  const storefront = context?.storefront;
  const siteUrl = getCanonicalSiteUrl(env);

  const [productsData, collectionsData, seriesData, artistsData, pagesData, fallbackProducts] = await Promise.all([
    storefront?.query(SITEMAP_PRODUCTS_QUERY).catch(() => null) || null,
    storefront?.query(SITEMAP_COLLECTIONS_QUERY).catch(() => null) || null,
    sanity?.fetch(SITEMAP_SERIES_QUERY).catch(() => []) || [],
    sanity?.fetch(SITEMAP_ARTISTS_QUERY).catch(() => []) || [],
    sanity?.fetch(SITEMAP_PAGES_QUERY).catch(() => []) || [],
    getFallbackProducts(env),
  ]);

  const seen = new Set<string>();
  const urls: string[] = [];

  function addUrl(loc: string, lastmod?: string, priority?: string) {
    const escaped = escapeXml(loc);
    if (seen.has(escaped)) return;
    seen.add(escaped);
    const lastmodTag = lastmod ? '<lastmod>' + escapeXml(lastmod.split('T')[0]) + '</lastmod>' : '';
    const priorityTag = priority ? '<priority>' + escapeXml(priority) + '</priority>' : '';
    urls.push('  <url><loc>' + escaped + '</loc>' + lastmodTag + priorityTag + '</url>');
  }

  addUrl(siteUrl + '/', undefined, '1.0');
  addUrl(siteUrl + '/collections', undefined, '0.9');
  addUrl(siteUrl + '/collections/all', undefined, '0.9');
  addUrl(siteUrl + '/collections/drop-opening-drop', undefined, '0.9');
  addUrl(siteUrl + '/drops', undefined, '0.9');
  addUrl(siteUrl + '/drops/opening-drop', undefined, '0.9');
  addUrl(siteUrl + '/artists', undefined, '0.9');
  addUrl(siteUrl + '/search', undefined, '0.3');

  for (const slug of ['about', 'size-guide', 'print-quality', 'shipping-returns', 'faq', 'contact']) {
    addUrl(siteUrl + '/pages/' + slug, undefined, '0.7');
  }

  const products = productsData?.products?.nodes || [];
  for (const product of products) {
    addUrl(siteUrl + '/products/' + product.handle, product.updatedAt, '0.8');
  }

  if (!products.length && Array.isArray(fallbackProducts)) {
    for (const product of fallbackProducts) {
      addUrl(siteUrl + '/products/' + product.handle, undefined, '0.8');
    }
  }

  const collections = collectionsData?.collections?.nodes || [];
  for (const collection of collections) {
    addUrl(siteUrl + '/collections/' + collection.handle, collection.updatedAt, '0.6');
  }

  if (Array.isArray(seriesData)) {
    for (const series of seriesData) {
      const slug = series.slug?.current || series.slug;
      if (slug) addUrl(siteUrl + '/drops/' + slug, series._updatedAt, '0.7');
    }
  }

  if (Array.isArray(artistsData)) {
    for (const artist of artistsData) {
      const slug = artist.slug?.current || artist.slug;
      if (slug) addUrl(siteUrl + '/artists/' + slug, artist._updatedAt, '0.5');
    }
  }

  if (Array.isArray(pagesData)) {
    for (const page of pagesData) {
      const slug = page.slug?.current || page.slug;
      if (slug) addUrl(siteUrl + '/pages/' + slug, page._updatedAt, '0.5');
    }
  }

  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.join('\n') + '\n</urlset>';
}
