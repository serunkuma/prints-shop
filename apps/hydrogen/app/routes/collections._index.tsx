import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from '@shopify/remix-oxygen';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheShort()),
});

export const meta = () => [{title: 'Collections — Kumachi Prints'}];

export async function loader({context}: {context: any}) {
  const {collections} = await context.storefront.query(COLLECTIONS_LIST_QUERY);
  return {collections: collections?.nodes || []};
}

export default function CollectionsIndex() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <main className="container-gallery section-pad">
      <h1 className="text-h1 mb-8">Collections</h1>

      {collections.length === 0 ? (
        <p className="text-body text-text-secondary">No collections yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {collections.map((collection: any) => (
            <a key={collection.id} href={`/collections/${collection.handle}`} className="group">
              <div className="aspect-[16/9] bg-surface-mid rounded-xs overflow-hidden mb-4">
                {collection.image && (
                  <img
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={collection.image.width || 800}
                    height={collection.image.height || 450}
                  />
                )}
              </div>
              <h3 className="text-h3 mb-1">{collection.title}</h3>
              {collection.description && (
                <p className="text-body-small text-text-secondary">{collection.description.slice(0, 120)}</p>
              )}
            </a>
          ))}
        </div>
      )}
    </main>
  );
}

const COLLECTIONS_LIST_QUERY = `#graphql
  query CollectionsList {
    collections(first: 50) {
      nodes {
        id
        handle
        title
        description
        image {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
`;

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Page not found.</p></main>;
  }
  return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
