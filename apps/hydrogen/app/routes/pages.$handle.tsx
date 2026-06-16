import {redirect, useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheLong} from '@shopify/hydrogen';
import {PAGE_QUERY} from '~/lib/queries';
import {PortableText} from '~/components/editorial/PortableText';
import {getFallbackPage} from '~/lib/localFallback.server';
import {ContentCallout, EditorialFrame, LinkRail, PageHero, PageShell} from '~/components/design/PageTemplates';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheLong()),
});

export async function loader({params, context}: {params: any; context: any}) {
  const {handle} = params;
  if (!handle) throw new Response('Not found', {status: 404});

  if (handle === 'about') {
    return redirect('/about', 301);
  }

  const livePage = await context.sanity.fetch(PAGE_QUERY, {slug: handle}).catch(() => null);
  const page = livePage || (await getFallbackPage(handle, context.env));
  if (!page) throw new Response('Not found', {status: 404});

  return {page};
}

export const meta = ({data}: any) => [
  {title: data?.page?.seo?.metaTitle || data?.page?.title || 'Kumachi Prints'},
  {
    name: 'description',
    content:
      data?.page?.seo?.metaDescription ||
      data?.page?.excerpt ||
      'Kumachi Prints collector information, support, and launch guidance.',
  },
];

function blockText(block: any) {
  return (block?.children || [])
    .map((child: any) => child?.text || '')
    .join('')
    .trim();
}

function pageBodyWithoutDuplicateTitle(page: any) {
  if (!Array.isArray(page?.body)) return page?.body;
  return page.body.filter((block: any, index: number) => {
    if (index !== 0) return true;
    return !(block?.style === 'h1' && blockText(block) === page.title);
  });
}

const pageMeta: Record<string, {eyebrow: string; intro: string; callout?: {title: string; body: string}}> = {
  contact: {
    eyebrow: 'Collector support',
    intro: 'A quiet place for order questions, print guidance, and custom inquiries before or after you buy.',
    callout: {
      title: 'For faster help',
      body: 'Include your order number, product title, size, and any shipping details that matter.',
    },
  },
  faq: {
    eyebrow: 'Buyer questions',
    intro: 'Clear answers for print quality, sizing, framing, shipping, returns, gifts, and the Opening Drop.',
  },
  'print-quality': {
    eyebrow: 'Materials and care',
    intro: 'How Kumachi Prints handles paper, pigment ink, production, and collector confidence.',
    callout: {
      title: 'Launch state',
      body: 'Opening Drop prints ship unframed so each collector can choose the frame and room treatment.',
    },
  },
  'shipping-returns': {
    eyebrow: 'Orders and arrival',
    intro: 'Production-before-shipping guidance, delivery expectations, damage handling, and return boundaries.',
  },
  'size-guide': {
    eyebrow: 'Sizing and framing',
    intro: 'Choose print size by wall, aspect ratio, frame confidence, and how much presence the room needs.',
  },
};

const supportLinks = [
  {label: 'Size Guide', href: '/pages/size-guide', description: 'Choose by ratio, wall, and frame.'},
  {label: 'Print Quality', href: '/pages/print-quality', description: 'Paper, ink, production, and care.'},
  {label: 'Shipping & Returns', href: '/pages/shipping-returns', description: 'Order timelines and damage support.'},
  {label: 'FAQ', href: '/pages/faq', description: 'Common buyer questions.'},
  {label: 'Contact', href: '/pages/contact', description: 'Collector help and inquiries.'},
];

export default function Page() {
  const {page} = useLoaderData<typeof loader>();
  const body = pageBodyWithoutDuplicateTitle(page);
  const handle = page?.slug?.current;
  const template = pageMeta[handle] || {
    eyebrow: 'Kumachi guide',
    intro: page.excerpt || 'Collector information from Kumachi Prints.',
  };

  return (
    <PageShell>
      <PageHero eyebrow={template.eyebrow} title={page.title} description={template.intro} />
      <EditorialFrame
        aside={<LinkRail title="Collector links" links={supportLinks.filter((link) => link.href !== `/pages/${handle}`)} />}
      >
        {template.callout ? (
          <ContentCallout title={template.callout.title}>{template.callout.body}</ContentCallout>
        ) : null}
        <PortableText value={body} />
      </EditorialFrame>
    </PageShell>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><h1 className="text-h1">Page not found</h1><a href="/" className="text-gold">Return home</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
