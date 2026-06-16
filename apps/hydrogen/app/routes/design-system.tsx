import type {MetaFunction} from 'react-router';
import {requireInternalAccess} from '~/lib/internalAccess.server';
import {
  ContentCallout,
  DesignSwatch,
  EditorialFrame,
  InfoGrid,
  LinkRail,
  PageHero,
  PageShell,
} from '~/components/design/PageTemplates';

export const meta: MetaFunction = () => [
  {title: 'Design System | Kumachi Prints'},
  {name: 'description', content: 'Private Kumachi Prints design system reference.'},
  {name: 'robots', content: 'noindex,nofollow'},
];

export async function loader({request, context}: {request: Request; context: any}) {
  requireInternalAccess(request, context?.env || {});
  return null;
}

const swatches = [
  {name: 'Page', token: '--color-bg-primary'},
  {name: 'Warm Band', token: '--color-bg-secondary'},
  {name: 'Surface', token: '--color-surface'},
  {name: 'Ink', token: '--color-text-primary'},
  {name: 'Secondary Text', token: '--color-text-secondary'},
  {name: 'Golden Yellow', token: '--color-accent-ochre'},
  {name: 'Clay', token: '--color-accent-clay'},
  {name: 'Emerald', token: '--color-accent-emerald'},
];

const principles = [
  {
    title: 'Gallery Calm',
    body: 'Use quiet surfaces, generous gutters, and one clear image or content priority per section.',
  },
  {
    title: 'Golden Signal',
    body: 'Use golden yellow for focus, accents, rules, and primary moments; do not flood whole pages with it.',
  },
  {
    title: 'Editorial Commerce',
    body: 'Let blog and support pages educate, while collection and product pages keep buying paths clear.',
  },
  {
    title: 'Light And Dark Ready',
    body: 'Build with tokens only so the same layout survives theme changes without hard-coded contrast fixes.',
  },
  {
    title: 'Image-Led When It Matters',
    body: 'Use real product, room, or editorial images for first impressions; avoid decorative filler.',
  },
  {
    title: 'Readable Before Clever',
    body: 'Long copy should sit in a narrow measure with strong headings, visible links, and scannable callouts.',
  },
];

export default function DesignSystemPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Private design reference"
        title="Kumachi design system."
        description="The working source for page rhythm, tokens, templates, and content patterns as the storefront grows beyond the original prototype."
      />

      <section className="container-gallery grid gap-10 pb-20">
        <section>
          <p className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>Foundation</p>
          <h2 className="text-h2 mt-2" style={{color: 'var(--color-text-primary)'}}>Tokens</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {swatches.map((swatch) => (
              <DesignSwatch key={swatch.token} name={swatch.name} token={swatch.token} />
            ))}
          </div>
        </section>

        <section>
          <p className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>Voice in layout</p>
          <h2 className="text-h2 mt-2" style={{color: 'var(--color-text-primary)'}}>Design principles</h2>
          <div className="mt-6">
            <InfoGrid items={principles} />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <p className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>Approved template</p>
            <h2 className="text-h2 mt-2" style={{color: 'var(--color-text-primary)'}}>Editorial support page</h2>
            <div className="mt-6">
              <EditorialFrame
                aside={
                  <LinkRail
                    title="Companion links"
                    links={[
                      {label: 'Size Guide', href: '/pages/size-guide', description: 'Ratio and room guidance.'},
                      {label: 'Print Quality', href: '/pages/print-quality', description: 'Paper, ink, and care.'},
                      {label: 'Contact', href: '/pages/contact', description: 'Collector support.'},
                    ]}
                  />
                }
              >
                <h2 className="text-h2">How content pages should feel</h2>
                <p className="text-body">
                  A Kumachi support page should read like a calm gallery note, then become practical quickly. The
                  heading gives the promise, the body explains the decision, and the rail gives the next useful step.
                </p>
                <ContentCallout title="Pattern rule">
                  Use one strong callout per page when the buyer needs confidence before choosing a print.
                </ContentCallout>
              </EditorialFrame>
            </div>
          </div>

          <LinkRail
            title="Internal tools"
            links={[
              {label: 'Component Showcase', href: '/components', description: 'Reusable parts and live product cards.'},
              {label: 'Public Sitemap', href: '/sitemap', description: 'Customer-facing index.'},
              {label: 'Collection', href: '/collection', description: 'Commerce landing page.'},
            ]}
          />
        </section>
      </section>
    </PageShell>
  );
}

