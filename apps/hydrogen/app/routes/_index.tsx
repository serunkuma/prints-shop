import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheLong} from '@shopify/hydrogen';
import {HOMEPAGE_QUERY, FEATURED_PRODUCTS_QUERY, COLLECTION_PRODUCTS_QUERY} from '~/lib/queries';
import {HeroSection} from '~/components/sections/HeroSection';
import {FeaturedCollectionSection} from '~/components/sections/FeaturedCollectionSection';
import {ProductGridSection} from '~/components/sections/ProductGridSection';
import {EditorialBannerSection} from '~/components/sections/EditorialBannerSection';
import {TestimonialsSection} from '~/components/sections/TestimonialsSection';
import {NewsletterSection} from '~/components/sections/NewsletterSection';
import {TrustBar} from '~/components/sections/TrustBar';
import {AIPrintStudioTeaser} from '~/components/sections/AIPrintStudioTeaser';
import {CategoryTiles} from '~/components/sections/CategoryTiles';
import {EditorialProductRail} from '~/components/sections/EditorialProductRail';
import {EditorialStorySection} from '~/components/sections/EditorialStorySection';
import {ArtistSpotlightSection} from '~/components/sections/ArtistSpotlightSection';
import {PortableText} from '~/components/editorial/PortableText';
import {getFallbackProducts, getFallbackSiteDoc} from '~/lib/localFallback.server';
import {OPENING_DROP_HANDLES} from '~/lib/allowlist';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheLong()),
});

export const meta = () => [
  {title: 'Kumachi Prints'},
  {
    name: 'description',
    content:
      'African art prints from Kuma, beginning with the curated Opening Drop from Kumachi Prints.',
  },
];

export async function loader({context}: {context: any}) {
  const [homepage, featuredProducts, allPrints, fallbackHomepage, fallbackProducts] = await Promise.all([
    context.sanity.fetch(HOMEPAGE_QUERY).catch(() => null),
    context.storefront.query(FEATURED_PRODUCTS_QUERY).catch(() => null),
    context.storefront.query(COLLECTION_PRODUCTS_QUERY, {
      variables: {handle: 'all'},
    }).catch(() => null),
    getFallbackSiteDoc('homepage', context.env),
    getFallbackProducts(context.env),
  ]);

  return {homepage: homepage || fallbackHomepage, featuredProducts, allPrints, fallbackProducts};
}

function RichTextSection({section}: {section: any}) {
  if (!section.body) return null;
  return (
    <section className="container-gallery section-pad">
      <div className="max-w-3xl mx-auto">
        <PortableText value={section.body} />
      </div>
    </section>
  );
}

function sectionRenderer(section: any, index: number, products: any[]) {
  switch (section._type) {
    case 'hero':
      return <HeroSection key={index} section={section} />;
    case 'featuredCollection':
      return <FeaturedCollectionSection key={index} section={section} products={products} />;
    case 'productGrid':
      return <ProductGridSection key={index} section={section} products={products} />;
    case 'editorialBanner':
      return <EditorialBannerSection key={index} section={section} />;
    case 'testimonials':
      return <TestimonialsSection key={index} section={section} />;
    case 'newsletter':
      return <NewsletterSection key={index} section={section} />;
    case 'richText':
      return <RichTextSection key={index} section={section} />;
    default:
      return null;
  }
}

function firstSection(sections: any[], type: string) {
  return sections.find((section) => section?._type === type);
}

export default function Homepage() {
  const {homepage, featuredProducts, allPrints, fallbackProducts} = useLoaderData<typeof loader>();
  const sections = homepage?.sections || [];

  const products =
    (allPrints?.collection?.products?.nodes?.filter(Boolean) || fallbackProducts?.filter(Boolean) || [])
      .filter((p: any) => OPENING_DROP_HANDLES.has(p.handle));
  const featured =
    featuredProducts?.products?.nodes?.filter(Boolean)?.length > 0
      ? featuredProducts.products.nodes.filter(Boolean)
      : products.slice(0, 4);

  const heroSection = firstSection(sections, 'hero');
  const featuredSection =
    firstSection(sections, 'featuredCollection') || {
      _type: 'featuredCollection',
      title: 'Opening Drop',
      description: 'The first Kumachi Prints release: 22 curated open-drop artworks from Kuma.',
      collectionHandle: 'drop-opening-drop',
    };
  const productGridSection =
    firstSection(sections, 'productGrid') || {
      _type: 'productGrid',
      title: 'Featured Prints',
    };
  const newsletterSection = firstSection(sections, 'newsletter');
  const richTextSections = sections.filter((section: any) => section?._type === 'richText');

  return (
    <main>
      <HeroSection section={heroSection} />
      <TrustBar />
      <AIPrintStudioTeaser />
      <CategoryTiles />
      <EditorialProductRail products={products} />

      <FeaturedCollectionSection section={featuredSection} products={products.slice(0, 8)} />
      <ProductGridSection section={productGridSection} products={featured} />

      {sections
        .filter((section: any) => ['editorialBanner', 'testimonials'].includes(section?._type))
        .map((section: any, index: number) => sectionRenderer(section, index, products))}

      <EditorialStorySection />
      <ArtistSpotlightSection />

      {richTextSections.map((section: any, index: number) => (
        <RichTextSection key={section._key || index} section={section} />
      ))}

      <NewsletterSection section={newsletterSection} />
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
