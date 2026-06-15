import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {PortableText} from '~/components/editorial/PortableText';
import {SERIES_BY_SLUG_QUERY, COLLECTION_PRODUCTS_QUERY} from '~/lib/queries';
import {formatPrice} from '~/lib/format';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheShort()),
});

export const meta = ({data}: any) => [
  {title: data?.series?.title ? `${data.series.title} — Kumachi Prints` : 'Kumachi Prints'},
];

export async function loader({params, context}: {params: any; context: any}) {
  const {handle} = params;
  if (!handle) throw new Response('Not found', {status: 404});

  const series = await context.sanity.fetch(SERIES_BY_SLUG_QUERY, {slug: handle});
  if (!series) throw new Response('Not found', {status: 404});

  let collectionProducts = null;
  if (series.shopifyCollectionHandle) {
    const data = await context.storefront.query(COLLECTION_PRODUCTS_QUERY, {
      variables: {handle: series.shopifyCollectionHandle},
    }).catch(() => null);
    collectionProducts = data?.collection;
  }

  return {series, collectionProducts};
}

export default function DropPage() {
  const {series, collectionProducts} = useLoaderData<typeof loader>();
  const products = collectionProducts?.products?.nodes || [];

  return (
    <main className="container-gallery section-pad">
      {series.heroImage && (
        <div className="aspect-[21/9] bg-surface-mid rounded-xs overflow-hidden mb-10">
          <img
            src={series.heroImage.asset?.url}
            alt={series.heroImage.alt || series.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-h1 mb-4">{series.title}</h1>
      {series.artist && <p className="text-body text-text-muted mb-6">By {series.artist.name}</p>}
      {series.publishDate && (
        <p className="text-body-small text-text-muted mb-6">
          {new Date(series.publishDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
        </p>
      )}

      {series.description && (
        <div className="max-w-3xl text-body text-text-secondary leading-relaxed mb-10">
          <PortableText value={series.description} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {products.map((product: any) => (
          <a key={product.id} href={`/products/${product.handle}`} className="group">
            <div className="aspect-[3/4] bg-surface-mid rounded-xs overflow-hidden mb-4">
              {product.featuredImage && (
                <img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={product.featuredImage.width || 600}
                  height={product.featuredImage.height || 800}
                />
              )}
            </div>
            <h3 className="text-h4 mb-1">{product.title}</h3>
            {product.priceRange?.minVariantPrice && (
              <p className="text-price text-gold">
                {formatPrice(parseFloat(product.priceRange.minVariantPrice.amount) * 100)}
              </p>
            )}
          </a>
        ))}
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><h1 className="text-h1">Drop not found</h1><a href="/drops" className="text-gold">View all drops</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
