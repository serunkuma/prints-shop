import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from '@shopify/remix-oxygen';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {SERIES_LIST_QUERY} from '~/lib/queries';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheShort()),
});

export const meta = () => [{title: 'Drops — Kumachi Prints'}];

export async function loader({context}: {context: any}) {
  const series = await context.sanity.fetch(SERIES_LIST_QUERY).catch(() => []);
  return {series};
}

export default function DropsIndex() {
  const {series} = useLoaderData<typeof loader>();

  return (
    <main className="container-gallery section-pad">
      <h1 className="text-h1 mb-4">Drops</h1>
      <p className="text-body text-text-secondary max-w-2xl mb-10">
        Curated releases of new prints, each with its own story.
      </p>

      {series.length === 0 ? (
        <p className="text-body text-text-muted">No drops yet. Coming soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {series.map((s: any) => (
            <a key={s.slug?.current} href={`/drops/${s.slug?.current}`} className="group">
              <div className="aspect-[16/9] bg-surface-mid rounded-xs overflow-hidden mb-4">
                {s.heroImage && (
                  <img
                    src={s.heroImage.asset?.url}
                    alt={s.heroImage.alt || s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
              </div>
              <h3 className="text-h3 mb-1">{s.title}</h3>
              {s.artist && <p className="text-body-small text-text-muted mb-2">{s.artist.name}</p>}
              <p className="text-body-small text-text-secondary">{new Date(s.publishDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Page not found.</p></main>;
  }
  return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
