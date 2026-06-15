import {useMemo} from 'react';
import {motion} from 'framer-motion';
import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {SERIES_LIST_QUERY} from '~/lib/queries';
import {fadeUp, staggerContainer} from '~/lib/animations';
import {PortableText} from '~/components/editorial/PortableText';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheShort()),
});

export const meta = () => [{title: 'Blog — Kumachi Prints'}];

export async function loader({context}: {context: any}) {
  const series = await context.sanity.fetch(SERIES_LIST_QUERY).catch(() => []);
  return {series};
}

export default function BlogDropsIndex() {
  const {series} = useLoaderData<typeof loader>();

  const hasContent = series.length > 0;

  return (
    <main className="min-h-dvh" style={{paddingTop: '96px', backgroundColor: 'var(--color-bg-primary)'}}>
      <motion.section className="container-gallery pb-12 pt-8" initial="hidden" animate="show" variants={staggerContainer}>
        <motion.p variants={fadeUp} className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>
          Kumachi Prints blog
        </motion.p>
        <motion.h1 variants={fadeUp} className="text-h1 mt-3" style={{color: 'var(--color-text-primary)'}}>
          Editorial drops.
        </motion.h1>
        <motion.p variants={fadeUp} className="text-body mt-4 max-w-xl" style={{color: 'var(--color-text-secondary)'}}>
          Curated releases, artist features, and print stories.
        </motion.p>
      </motion.section>

      <section className="container-gallery section-pad pt-0">
        {!hasContent ? (
          <div className="py-16 text-center">
            <p className="text-body" style={{color: 'var(--color-text-tertiary)'}}>
              No blog entries yet. Opening Drop launching soon.
            </p>
            <a
              href="/blog/drops/opening-drop"
              className="inline-flex h-11 px-6 items-center text-button mt-6"
              style={{backgroundColor: 'var(--color-accent-ochre)', color: '#15120d'}}
            >
              View Opening Drop
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {series.map((item: any, index: number) => (
              <motion.a
                key={item.slug?.current || index}
                href={`/blog/drops/${item.slug?.current}`}
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
                  {item.publishDate && (
                    <span className="text-caption block mb-2" style={{color: 'var(--color-text-tertiary)'}}>
                      {new Date(item.publishDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                    </span>
                  )}
                  <h3 className="text-h3 group-hover:opacity-80 transition-opacity" style={{color: 'var(--color-text-primary)'}}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <div className="text-body-small mt-2 line-clamp-2" style={{color: 'var(--color-text-secondary)'}}>
                      {typeof item.description === 'string'
                        ? item.description.slice(0, 160)
                        : item.description[0]?.children?.[0]?.text?.slice(0, 160) || ''}
                    </div>
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
