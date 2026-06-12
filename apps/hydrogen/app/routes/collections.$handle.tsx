import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from '@shopify/remix-oxygen';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {COLLECTION_PRODUCTS_QUERY} from '~/lib/queries';
import {formatPrice} from '~/lib/format';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheShort()),
});

export const meta = ({data}: any) => [
  {title: data?.collection?.title
    ? `${data.collection.title} — Kumachi Prints`
    : 'Kumachi Prints'},
];

export async function loader({params, context}: {params: any; context: any}) {
  const {handle} = params;

  if (!handle) throw new Response('Not found', {status: 404});

  const {collection} = await context.storefront.query(
    COLLECTION_PRODUCTS_QUERY,
    {variables: {handle}},
  );

  if (!collection) throw new Response('Not found', {status: 404});

  return {collection};
}

export default function CollectionPage() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <main className="container-gallery section-pad">
      <h1 className="text-h1 mb-4">{collection.title}</h1>
      {collection.description && (
        <p className="text-body text-text-secondary max-w-2xl mb-10">
          {collection.description}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {collection.products?.nodes?.map((product: any) => (
          <a
            key={product.id}
            href={`/products/${product.handle}`}
            className="group"
          >
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
                {formatPrice(
                  parseFloat(product.priceRange.minVariantPrice.amount) * 100,
                )}
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
    return <main className="container-gallery section-pad"><h1 className="text-h1">Collection not found</h1><a href="/" className="text-gold">Return home</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
