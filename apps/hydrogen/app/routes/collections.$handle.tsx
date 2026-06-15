import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {COLLECTION_PRODUCTS_QUERY} from '~/lib/queries';
import {ProductGrid} from '~/components/product/ProductGrid';
import {getFallbackCollection} from '~/lib/localFallback.server';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheShort()),
});

export const meta = ({data}: any) => [
  {title: data?.collection?.title
    ? `${data.collection.title} — Kumachi Prints`
    : 'Kumachi Prints'},
  {
    name: 'description',
    content:
      data?.collection?.description ||
      'Browse Kumachi Prints collections and African art prints by Kuma.',
  },
];

export async function loader({params, context}: {params: any; context: any}) {
  const {handle} = params;

  if (!handle) throw new Response('Not found', {status: 404});

  const data = await context.storefront.query(
    COLLECTION_PRODUCTS_QUERY,
    {variables: {handle}},
  ).catch(() => null);
  const fallbackCollection = await getFallbackCollection(handle, context.env);
  const collection = data?.collection || fallbackCollection;

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

      <ProductGrid products={collection.products?.nodes || []} />
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
