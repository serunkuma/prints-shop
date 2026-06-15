import {useLoaderData, Form, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheNone} from '@shopify/hydrogen';
import {SEARCH_PRODUCTS_QUERY} from '~/lib/queries';
import {ProductGrid} from '~/components/product/ProductGrid';
import {OPENING_DROP_HANDLES} from '~/lib/allowlist';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheNone()),
});

export const meta = () => [{title: 'Search — Kumachi Prints'}];

export async function loader({request, context}: {request: Request; context: any}) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  if (!q) return {results: null, query: ''};

  const {products} = await context.storefront.query(SEARCH_PRODUCTS_QUERY, {
    variables: {query: q},
  });

  const nodes = (products?.nodes || []).filter((p: any) => OPENING_DROP_HANDLES.has(p.handle));
  return {results: nodes, query: q};
}

export default function SearchPage() {
  const {results, query} = useLoaderData<typeof loader>();

  return (
    <main className="container-gallery section-pad">
      <h1 className="text-h1 mb-8">Search</h1>

      <Form method="get" action="/search" className="mb-10">
        <div className="flex gap-3">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search prints..."
            className="flex-1 px-4 py-3 bg-surface-mid border border-border rounded-xs text-body placeholder:text-text-muted focus:outline-none focus:border-gold"
          />
          <button type="submit" className="px-6 py-3 bg-gold text-void text-button rounded-xs font-medium hover:opacity-90 transition-opacity">
            Search
          </button>
        </div>
      </Form>

      {query && results && (
        <>
          <p className="text-body-small text-text-muted mb-6">
            {results.length} result{results.length !== 1 && 's'} for &ldquo;{query}&rdquo;
          </p>
          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <p className="text-body text-text-secondary">No products found for &ldquo;{query}&rdquo;.</p>
          )}
        </>
      )}
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><h1 className="text-h1">Page not found</h1><a href="/" className="text-gold">Return home</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
