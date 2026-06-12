import {SITEMAP_PRODUCTS_QUERY, SITEMAP_COLLECTIONS_QUERY} from '~/lib/queries';

export async function loader({context}: {context: any}) {
  const [productsData, collectionsData] = await Promise.all([
    context.storefront.query(SITEMAP_PRODUCTS_QUERY),
    context.storefront.query(SITEMAP_COLLECTIONS_QUERY),
  ]);

  const domain = 'https://kumachiprints.com';
  const urls: string[] = [];

  urls.push(`  <url><loc>${domain}/</loc><priority>1.0</priority></url>`);

  for (const product of productsData?.products?.nodes || []) {
    urls.push(`  <url><loc>${domain}/products/${product.handle}</loc><lastmod>${product.updatedAt}</lastmod><priority>0.8</priority></url>`);
  }

  for (const collection of collectionsData?.collections?.nodes || []) {
    urls.push(`  <url><loc>${domain}/collections/${collection.handle}</loc><priority>0.6</priority></url>`);
  }

  urls.push(`  <url><loc>${domain}/search</loc><priority>0.3</priority></url>`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
}
