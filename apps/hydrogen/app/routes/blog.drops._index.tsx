import {useMemo} from 'react';
import {motion} from 'framer-motion';
import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {SERIES_LIST_QUERY} from '~/lib/queries';
import {fadeUp, staggerContainer} from '~/lib/animations';
import {LinkRail, PageHero, PageShell} from '~/components/design/PageTemplates';

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
    <PageShell>
      <motion.div initial="hidden" animate="show" variants={staggerContainer}>
        <motion.div variants={fadeUp}>
          <PageHero
            eyebrow="Kumachi Prints blog"
            title="Editorial drops."
            description="Theme notes, behind-the-scenes selection, artist context, and print stories that help the collection sell without pretending the blog is the shop."
          />
        </motion.div>
      </motion.div>

      <section className="container-gallery section-pad pt-0">
        {!hasContent ? (
          <div
            className="mx-auto max-w-2xl p-8 text-center"
            style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)'}}
          >
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
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
                  style={{border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)'}}
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
                    <span className="text-caption block mb-2 uppercase" style={{color: 'var(--color-accent-clay)'}}>
                      Drops
                    </span>
                    {item.publishDate && (
                      <span className="text-caption block mb-2" style={{color: 'var(--color-text-tertiary)'}}>
                        {new Date(item.publishDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                      </span>
                    )}
                    <h3 className="text-h3 group-hover:opacity-80 transition-opacity" style={{color: 'var(--color-text-primary)'}}>
                      {item.title}
                    </h3>
                    {item.description && (
                      <div className="text-body-small mt-2 line-clamp-3" style={{color: 'var(--color-text-secondary)'}}>
                        {typeof item.description === 'string'
                          ? item.description.slice(0, 180)
                          : item.description[0]?.children?.[0]?.text?.slice(0, 180) || ''}
                      </div>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
            <LinkRail
              title="Shop after reading"
              links={[
                {label: 'All Prints', href: '/collection', description: 'Browse the 22 launch pieces.'},
                {label: 'Size Guide', href: '/pages/size-guide', description: 'Choose the right wall presence.'},
                {label: 'Print Quality', href: '/pages/print-quality', description: 'Understand paper and ink.'},
              ]}
            />
          </div>
        )}
      </section>
    </PageShell>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Page not found.</p></main>;
  }
  return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
