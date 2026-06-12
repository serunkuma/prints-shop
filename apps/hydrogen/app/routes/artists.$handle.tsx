import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from '@shopify/remix-oxygen';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {ARTIST_BY_SLUG_QUERY} from '~/lib/queries';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheShort()),
});

export const meta = ({data}: any) => [
  {title: data?.artist?.name ? `${data.artist.name} — Kumachi Prints` : 'Kumachi Prints'},
];

export async function loader({params, context}: {params: any; context: any}) {
  const {handle} = params;
  if (!handle) throw new Response('Not found', {status: 404});

  const artist = await context.sanity.fetch(ARTIST_BY_SLUG_QUERY, {slug: handle});
  if (!artist) throw new Response('Not found', {status: 404});

  return {artist};
}

export default function ArtistPage() {
  const {artist} = useLoaderData<typeof loader>();

  return (
    <main className="container-gallery section-pad">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl mb-12">
        <div className="lg:col-span-1">
          {artist.portrait && (
            <div className="aspect-[3/4] bg-surface-mid rounded-xs overflow-hidden">
              <img
                src={artist.portrait.asset?.url}
                alt={artist.portrait.alt || artist.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="lg:col-span-2">
          <h1 className="text-h1 mb-4">{artist.name}</h1>
          {artist.location && <p className="text-body text-text-muted mb-6">{artist.location}</p>}
          {artist.website && (
            <a href={artist.website} target="_blank" rel="noopener noreferrer" className="text-gold hover:opacity-80 transition-opacity inline-block mb-6">
              Website &rarr;
            </a>
          )}
          {artist.instagramHandle && (
            <a href={`https://instagram.com/${artist.instagramHandle}`} target="_blank" rel="noopener noreferrer" className="text-gold hover:opacity-80 transition-opacity inline-block ml-4 mb-6">
              Instagram &rarr;
            </a>
          )}
          {artist.bio && (
            <div className="text-body text-text-secondary leading-relaxed">
              {artist.bio}
            </div>
          )}
          {artist.featuredQuote && (
            <blockquote className="mt-8 pl-6 border-l-2 border-gold text-h4 text-text-primary italic">
              &ldquo;{artist.featuredQuote}&rdquo;
            </blockquote>
          )}
        </div>
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><h1 className="text-h1">Artist not found</h1><a href="/artists" className="text-gold">View all artists</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
