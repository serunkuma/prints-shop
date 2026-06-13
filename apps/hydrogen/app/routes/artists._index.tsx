import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {ARTIST_LIST_QUERY} from '~/lib/queries';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheShort()),
});

export const meta = () => [{title: 'Artists — Kumachi Prints'}];

export async function loader({context}: {context: any}) {
  const artists = await context.sanity.fetch(ARTIST_LIST_QUERY).catch(() => []);
  return {artists};
}

export default function ArtistsIndex() {
  const {artists} = useLoaderData<typeof loader>();

  return (
    <main className="container-gallery section-pad">
      <h1 className="text-h1 mb-4">Artists</h1>
      <p className="text-body text-text-secondary max-w-2xl mb-10">
        The creative voices behind every print.
      </p>

      {artists.length === 0 ? (
        <p className="text-body text-text-muted">No artists yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {artists.map((artist: any) => (
            <a key={artist.slug?.current} href={`/artists/${artist.slug?.current}`} className="group">
              <div className="aspect-[1/1] bg-surface-mid rounded-xs overflow-hidden mb-4">
                {artist.portrait && (
                  <img
                    src={artist.portrait.asset?.url}
                    alt={artist.portrait.alt || artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
              </div>
              <h3 className="text-h3 mb-1">{artist.name}</h3>
              {artist.location && <p className="text-body-small text-text-muted">{artist.location}</p>}
              {artist.featuredQuote && (
                <p className="text-body-small text-text-secondary mt-2 italic">&ldquo;{artist.featuredQuote}&rdquo;</p>
              )}
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
