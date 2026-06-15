import {useLoaderData, type MetaFunction} from 'react-router';
import {getCanonicalSiteUrl} from '~/lib/siteUrl.server';
import {getFallbackProducts} from '~/lib/localFallback.server';

export const meta: MetaFunction = () => [
  {title: 'Sitemap | Kumachi Prints'},
  {
    name: 'description',
    content:
      'An HTML sitemap for Kumachi Prints — find every public page, collection, drop, product, and support link in one place. For the machine-readable XML sitemap visit /sitemap.xml.',
  },
];

type SitemapLink = {
  label: string;
  href: string;
  description?: string;
};

const mainPages: SitemapLink[] = [
  {label: 'Home', href: '/', description: 'Kumachi Prints landing page.'},
  {label: 'All Prints', href: '/collections', description: 'Browse the full collection of curated art prints.'},
  {label: 'Drops', href: '/drops', description: 'Editorial print releases and series drops.'},
  {label: 'Artists', href: '/artists', description: 'Meet the creators behind the collection.'},
  {label: 'Search', href: '/search', description: 'Search the Kumachi Prints catalogue.'},
];

const shopPages: SitemapLink[] = [
  {label: 'All Prints', href: '/collections/all', description: 'Every print in the Kumachi catalogue.'},
  {label: 'Opening Drop Collection', href: '/collections/drop-opening-drop', description: 'The first curated release.'},
];

const supportPages: SitemapLink[] = [
  {label: 'About', href: '/pages/about', description: 'The Kumachi Prints story.'},
  {label: 'Size Guide', href: '/pages/size-guide', description: 'Print size dimensions and framing info.'},
  {label: 'Print Quality', href: '/pages/print-quality', description: 'Materials, paper, and print standards.'},
  {label: 'Shipping & Returns', href: '/pages/shipping-returns', description: 'Delivery timelines and return policy.'},
  {label: 'FAQ', href: '/pages/faq', description: 'Frequently asked questions.'},
  {label: 'Contact', href: '/pages/contact', description: 'Get in touch with the Kumachi team.'},
];

const internalPages: SitemapLink[] = [
  {label: 'Component Showcase', href: '/components', description: 'Internal UI component reference.'},
  {label: 'Create Your Own', href: '/create', description: 'AI Studio preview and waitlist.'},
];

export async function loader({context}: {context: any}) {
  const fallbackProducts = await getFallbackProducts(context?.env || {});
  const productLinks: SitemapLink[] = fallbackProducts.map((p: any) => ({
    label: p.title,
    href: '/products/' + p.handle,
    description: p.productType || 'Art print',
  }));

  return {productLinks};
}

export default function SitemapPage() {
  const {productLinks} = useLoaderData<typeof loader>();
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <main style={{backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh', paddingTop: '100px'}}>
      <section className="container-gallery py-14 lg:py-20">
        <p className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>Site index</p>
        <h1 className="text-h1 mt-3" style={{color: 'var(--color-text-primary)'}}>Kumachi Prints sitemap.</h1>
        <p className="text-body mt-5 max-w-2xl" style={{color: 'var(--color-text-secondary)'}}>
          Every public page, collection, print, drop, and support link in one quiet place.
          For the machine-readable XML sitemap, visit{' '}
          <a href="/sitemap.xml" style={{color: 'var(--color-accent-ochre)', textDecoration: 'underline'}}>
            /sitemap.xml
          </a>.
        </p>
      </section>

      <section className="container-gallery grid gap-6 pb-20 lg:grid-cols-2">
        <SitemapSection title="Main Pages" count={mainPages.length} links={mainPages} />
        <SitemapSection title="Shop & Collections" count={shopPages.length} links={shopPages} />
        <SitemapSection title="Opening Drop" count={1} links={[{label: 'Opening Drop', href: '/drops/opening-drop', description: 'The first Kumachi Prints curated release.'}]} />
        <SitemapSection title="Product Pages" count={productLinks.length} links={productLinks} />
        <SitemapSection title="Support Pages" count={supportPages.length} links={supportPages} />
        <SitemapSection title="Internal Tools" count={internalPages.length} links={internalPages} />
      </section>

      <section className="container-gallery pb-20">
        <p className="text-caption" style={{color: 'var(--color-text-tertiary)'}}>
          Last updated: {lastUpdated}
        </p>
      </section>
    </main>
  );
}

function SitemapSection({title, count, links}: {title: string; count: number; links: SitemapLink[]}) {
  return (
    <article className="p-5 sm:p-6" style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)'}}>
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-h3" style={{color: 'var(--color-text-primary)'}}>{title}</h2>
        <span className="text-caption uppercase" style={{color: 'var(--color-text-tertiary)'}}>{count} links</span>
      </div>
      {links.length === 0 ? (
        <p className="text-body-small mt-5" style={{color: 'var(--color-text-secondary)'}}>No products available yet.</p>
      ) : (
        <ul className="mt-5 grid gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group flex min-h-11 items-start justify-between gap-4 p-3 transition-opacity hover:opacity-75"
                style={{border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', textDecoration: 'none'}}
              >
                <span>
                  <span className="text-body-small font-semibold">{link.label}</span>
                  {link.description && (
                    <span className="text-caption mt-1 block normal-case tracking-normal" style={{color: 'var(--color-text-secondary)'}}>
                      {link.description}
                    </span>
                  )}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
