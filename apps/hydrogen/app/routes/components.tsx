import type {ReactNode} from 'react';
import {useLoaderData, type MetaFunction} from 'react-router';
import {ArrowRight} from 'lucide-react';
import {ProductCard} from '~/components/product/ProductCard';
import {CategoryTiles} from '~/components/sections/CategoryTiles';
import {AIPrintStudioTeaser} from '~/components/sections/AIPrintStudioTeaser';
import {NewsletterSection} from '~/components/sections/NewsletterSection';
import {getFallbackProducts} from '~/lib/localFallback.server';
import PathwaySwitch from '~/components/PathwaySwitch';

export const meta: MetaFunction = () => [
  {title: 'Component Showcase | Kumachi Prints'},
  {name: 'description', content: 'Internal component reference for Kumachi Prints.'},
];

export async function loader({context}: {context: any}) {
  const fallbackProducts = await getFallbackProducts(context?.env || {});
  return {products: fallbackProducts};
}

const colorTokens = [
  {name: 'gold', value: 'var(--color-gold)'},
  {name: 'void', value: 'var(--color-void)'},
  {name: 'surface', value: 'var(--color-surface)'},
  {name: 'grove', value: 'var(--color-grove)'},
  {name: 'crimson', value: 'var(--color-crimson)'},
  {name: 'teal', value: 'var(--color-teal)'},
  {name: 'blush', value: 'var(--color-blush)'},
];

function getBorderStyle(tokenName: string): string | undefined {
  const dark = ['void', 'grove', 'crimson'];
  return dark.includes(tokenName) ? '1px solid var(--color-border)' : '1px solid var(--color-border)';
}

export default function ComponentShowcasePage() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <main style={{backgroundColor: 'var(--color-bg-primary)', paddingTop: '100px', minHeight: '100vh'}}>
      <section className="container-gallery py-14">
        <p className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>Internal</p>
        <h1 className="text-h1 mt-3" style={{color: 'var(--color-text-primary)'}}>Component Showcase</h1>
        <p className="text-body mt-5 max-w-2xl" style={{color: 'var(--color-text-secondary)'}}>
          Live examples of the reusable Kumachi Prints commerce components.
        </p>
      </section>

      <section className="container-gallery grid gap-8 pb-20">

        <ShowcaseBlock label="COLOR TOKENS" title="Palette"
          description="Design-system colour tokens mapped to CSS custom properties">
          <div className="flex flex-wrap gap-6">
            {colorTokens.map((token) => (
              <div key={token.name} className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-lg"
                  style={{backgroundColor: token.value, border: getBorderStyle(token.name)}} />
                <span className="text-caption" style={{color: 'var(--color-text-secondary)'}}>{token.name}</span>
              </div>
            ))}
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock label="TYPOGRAPHY" title="Type Ramp"
          description="font-display (headings) and font-body (body) at each token size">
          <div className="space-y-5">
            <div><p className="text-h1 font-display" style={{color: 'var(--color-text-primary)'}}>Heading 1</p><p className="text-caption mt-1" style={{color: 'var(--color-text-muted)'}}>text-h1 · font-display</p></div>
            <div><p className="text-h2 font-display" style={{color: 'var(--color-text-primary)'}}>Heading 2</p><p className="text-caption mt-1" style={{color: 'var(--color-text-muted)'}}>text-h2 · font-display</p></div>
            <div><p className="text-h3 font-display" style={{color: 'var(--color-text-primary)'}}>Heading 3</p><p className="text-caption mt-1" style={{color: 'var(--color-text-muted)'}}>text-h3 · font-display</p></div>
            <div><p className="text-body font-body" style={{color: 'var(--color-text-primary)'}}>Body — The quick brown fox jumps over the lazy dog.</p><p className="text-caption mt-1" style={{color: 'var(--color-text-muted)'}}>text-body · font-body</p></div>
            <div><p className="text-body-small font-body" style={{color: 'var(--color-text-primary)'}}>Body small — The quick brown fox jumps over the lazy dog.</p><p className="text-caption mt-1" style={{color: 'var(--color-text-muted)'}}>text-body-small · font-body</p></div>
            <div><p className="text-caption" style={{color: 'var(--color-text-primary)'}}>Caption — UPPERCASE LETTERING</p><p className="text-caption mt-1" style={{color: 'var(--color-text-muted)'}}>text-caption · font-body</p></div>
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock label="BUTTONS" title="Button Variants"
          description="Custom-styled buttons using token utility classes">
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-gold text-void px-6 py-2 rounded-md text-button font-medium hover:opacity-90 transition-opacity">Primary</button>
            <button className="px-6 py-2 rounded-md text-button font-medium transition-colors"
              style={{border: '1px solid var(--color-border)', color: 'var(--color-text-primary)'}}>Outline</button>
            <button className="px-2 py-2 rounded-md text-button font-medium transition-colors"
              style={{color: 'var(--color-text-secondary)'}}>Ghost</button>
            <button className="flex items-center justify-center h-10 w-10 rounded-md transition-colors"
              style={{color: 'var(--color-text-primary)'}}>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Pathway Switch">
          <PathwaySwitch />
        </ShowcaseBlock>

        <ShowcaseBlock title="Product Cards"
          description="Fallback product cards rendered before Shopify products are live">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.length > 0 ? (
              products.slice(0, 4).map((product: any, index: number) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))
            ) : (
              <p className="text-body col-span-full" style={{color: 'var(--color-text-secondary)'}}>No products available yet.</p>
            )}
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Category Tiles">
          <CategoryTiles />
        </ShowcaseBlock>

        <ShowcaseBlock title="AI Print Studio Teaser">
          <AIPrintStudioTeaser />
        </ShowcaseBlock>

        <ShowcaseBlock title="Newsletter Signup">
          <NewsletterSection />
        </ShowcaseBlock>

      </section>
    </main>
  );
}

function ShowcaseBlock({label, title, description, children}: {label?: string; title: string; description?: string; children: ReactNode}) {
  return (
    <article>
      {label && <p className="text-caption uppercase mb-1" style={{color: 'var(--color-accent-clay)'}}>{label}</p>}
      <h2 className="text-h3" style={{color: 'var(--color-text-primary)'}}>{title}</h2>
      {description && <p className="text-body-small mt-2 mb-5" style={{color: 'var(--color-text-secondary)'}}>{description}</p>}
      {!description && <div className="mb-5" />}
      {children}
    </article>
  );
}
