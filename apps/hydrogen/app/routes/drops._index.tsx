import {useMemo} from 'react';
import {motion} from 'framer-motion';
import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {SERIES_LIST_QUERY} from '~/lib/queries';
import {fadeUp, staggerContainer} from '~/lib/animations';

const statusOrder: Record<string, number> = {live: 0, scheduled: 1, draft: 2, archived: 3};

export const headers = () => ({
  'Cache-Control': 'max-age=300, stale-while-revalidate=600',
});

export const meta = () => [{title: 'Drops — Kumachi Prints'}];

export async function loader({context}: {context: any}) {
  const series = await context.sanity.fetch(SERIES_LIST_QUERY).catch(() => []);
  return {series};
}

export default function DropsIndex() {
  const {series} = useLoaderData<typeof loader>();

  const sortedDrops = useMemo(
    () => [...series].sort((a, b) => {
      const aOrder = statusOrder[a.status] ?? 3;
      const bOrder = statusOrder[b.status] ?? 3;
      return aOrder - bOrder;
    }),
    [series],
  );

  const liveCount = series.filter((d: any) => d.status === 'live').length;
  const scheduledCount = series.filter((d: any) => d.status === 'scheduled').length;
  const draftCount = series.filter((d: any) => d.status === 'draft').length;

  const hasDrops = series.length > 0;

  return (
    <main className="min-h-dvh" style={{paddingTop: '96px', backgroundColor: 'var(--color-bg-primary)'}}>
      <motion.section className="container-gallery pb-12 pt-8" initial="hidden" animate="show" variants={staggerContainer}>
        <motion.p variants={fadeUp} className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>
          Kumachi Prints drops
        </motion.p>
        <motion.h1 variants={fadeUp} className="text-h1 mt-3" style={{color: 'var(--color-text-primary)'}}>
          The Drops.
        </motion.h1>
        <motion.p variants={fadeUp} className="text-body mt-4 max-w-xl" style={{color: 'var(--color-text-secondary)'}}>
          Limited series. Each one tells a story and leads back into the collection.
        </motion.p>
        <motion.p variants={fadeUp} className="text-sm mt-4" style={{color: 'var(--color-text-secondary)'}}>
          {series.length} drop{series.length !== 1 ? 's' : ''}: {liveCount} live &middot; {scheduledCount} scheduled &middot; {draftCount} in development
        </motion.p>
      </motion.section>

      <section className="container-gallery section-pad pt-0">
        {!hasDrops ? (
          <div className="py-16 text-center">
            <p className="text-body" style={{color: 'var(--color-text-tertiary)'}}>
              No drops yet. Opening Drop launching soon.
            </p>
            <a
              href="/drops/opening-drop"
              className="inline-flex h-11 px-6 items-center text-button mt-6"
              style={{backgroundColor: 'var(--color-accent-ochre)', color: '#15120d'}}
            >
              View Opening Drop
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {sortedDrops.map((item: any, index: number) => (
              <motion.a
                key={item.slug?.current || index}
                href={`/drops/${item.slug?.current}`}
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.45, delay: index * 0.08}}
                className="group relative block overflow-hidden"
                style={{border: '1px solid var(--color-border)'}}
              >
                {item.heroImage?.asset?.url ? (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={item.heroImage.asset.url}
                      alt={item.heroImage.alt || item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] flex items-center justify-center" style={{backgroundColor: 'var(--color-bg-secondary)'}}>
                    <p className="text-caption" style={{color: 'var(--color-text-tertiary)'}}>{item.title}</p>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="px-2 py-0.5 text-caption uppercase rounded-sm"
                      style={{
                        backgroundColor: item.status === 'live' ? 'var(--color-accent-emerald)' : item.status === 'scheduled' ? 'var(--color-accent-ochre)' : 'var(--color-bg-secondary)',
                        color: item.status === 'live' || item.status === 'scheduled' ? '#fffaf0' : 'var(--color-text-secondary)',
                      }}
                    >
                      {item.status}
                    </span>
                    {item.publishDate && (
                      <span className="text-caption" style={{color: 'var(--color-text-tertiary)'}}>
                        {new Date(item.publishDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                      </span>
                    )}
                  </div>
                  <h3 className="text-h3 group-hover:opacity-80 transition-opacity" style={{color: 'var(--color-text-primary)'}}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-body-small mt-2 line-clamp-2" style={{color: 'var(--color-text-secondary)'}}>
                      {typeof item.description === 'string'
                        ? item.description.slice(0, 160)
                        : item.description[0]?.children?.[0]?.text?.slice(0, 160) || ''}
                    </p>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </section>
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
