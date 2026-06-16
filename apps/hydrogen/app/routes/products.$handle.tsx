import {useMemo, useRef, useState} from 'react';
import {Link, isRouteErrorResponse, useLoaderData, useRouteError} from 'react-router';
import type {HeadersFunction, MetaArgs} from 'react-router';
import {CacheShort, generateCacheControlHeader} from '@shopify/hydrogen';
import {PRODUCT_QUERY, PRODUCT_SUPPLEMENT_QUERY} from '~/lib/queries';
import {OPENING_DROP_HANDLES} from '~/lib/allowlist';
import {getFallbackProduct, getFallbackProducts} from '~/lib/localFallback.server';
import {ProductGallery} from '~/components/product/ProductGallery';
import {ProductPurchasePanel} from '~/components/product/ProductPurchasePanel';
import {ProductStorySections} from '~/components/product/ProductStorySections';
import {ProductStickyMobileBar} from '~/components/product/ProductStickyMobileBar';
import {RelatedProductsRail} from '~/components/product/RelatedProductsRail';
import {RoomPlacementGallery} from '~/components/product/RoomPlacementGallery';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheShort()),
});

export const meta = ({data}: MetaArgs<typeof loader>) => {
  const product = data?.product;
  const supplement = data?.supplement;
  return [
    {
      title:
        supplement?.seo?.metaTitle ||
        (product?.title ? `${product.title} — Kumachi Prints` : 'Kumachi Prints'),
    },
    {
      name: 'description',
      content:
        supplement?.seo?.metaDescription ||
        product?.description?.slice(0, 160) ||
        'Archival art prints from Kumachi Prints.',
    },
  ];
};

function portableStory(product: any) {
  if (!product._source?.long_description) return [];
  return [
    {
      _key: `${product.handle}-fallback-story`,
      _type: 'block',
      style: 'normal',
      children: [
        {
          _key: `${product.handle}-fallback-story-span`,
          _type: 'span',
          text: product._source.long_description,
        },
      ],
    },
  ];
}

function roomMockups(product: any) {
  return (product._source?.room_mockups || []).map((url: string, index: number) => ({
    _key: `${product.handle}-room-${index}`,
    url,
    alt: `${product.title} shown in a styled room`,
    roomType: index === 0 ? 'Living room' : index === 1 ? 'Study' : 'Gallery wall',
    placementNote:
      index === 0
        ? 'A larger size gives the composition room to hold the wall.'
        : index === 1
          ? 'Works as a focused piece near books, desks, or consoles.'
          : 'Pair with quiet spacing so the print keeps its edge.',
  }));
}

function placementSuggestions(product: any) {
  const category = `${product._source?.category_name || product.productType || ''}`.toLowerCase();
  if (category.includes('landscape') || category.includes('nature')) {
    return ['Living room', 'Above console', 'Office'];
  }
  if (category.includes('abstract')) {
    return ['Gallery wall', 'Reading corner', 'Entryway'];
  }
  if (category.includes('portrait') || category.includes('figurative')) {
    return ['Study', 'Hallway', 'Bedroom'];
  }
  return ['Living room', 'Study', 'Hallway'];
}

function buildFallbackSupplement(product: any) {
  const source = product._source || {};
  const mockups = roomMockups(product);
  const printDetails = source.print_details || {};

  return {
    story: portableStory(product),
    technique: source.technique || source.medium || 'Digital archival print',
    paper: printDetails.paper || source.paper,
    ink: printDetails.ink || source.ink,
    edition: printDetails.edition || source.edition || 'Open edition',
    printDetails,
    galleryImages: [],
    mockupImages: mockups,
    roomMockups: mockups,
    roomImages: [],
    videos: [],
    sizeGuidance:
      source.product_faq ||
      (source.default_size
        ? `The default ${source.default_size} format is a strong starting point; go larger when the wall needs a single anchor.`
        : 'Choose a size that gives the composition enough breathing room for the wall.'),
    placementSuggestions: placementSuggestions(product),
    trustNotes: source.trust_notes || ['Archival paper', 'Pigment ink', 'Produced after ordering'],
    productFaq: source.product_faq,
    relatedLinks: source.related_links || [],
    shippingNote: source.shipping_note,
    returnsNote: source.returns_note,
    artist: source.artist
      ? {
          name: source.artist.name || 'Kuma',
          bio: source.artist.bio,
          featuredQuote: source.artist.featured_quote,
        }
      : {
          name: 'Kuma',
          bio: 'Kumachi Prints translates Kuma’s visual world into considered archival prints for homes, studios, and thoughtful collections.',
        },
    series: source.series ? {title: source.series} : {title: 'Opening Drop'},
    seo: product.seo,
  };
}

function normalizeSupplement(supplement: any, product: any, fallbackProduct?: any) {
  const fallbackSupplement = product?._fallback
    ? buildFallbackSupplement(product)
    : fallbackProduct
      ? buildFallbackSupplement(fallbackProduct)
      : null;
  if (supplement && fallbackSupplement) {
    return {
      ...fallbackSupplement,
      ...supplement,
      printDetails: supplement.printDetails || fallbackSupplement.printDetails,
      galleryImages: supplement.galleryImages?.length ? supplement.galleryImages : fallbackSupplement.galleryImages,
      mockupImages: supplement.mockupImages?.length ? supplement.mockupImages : fallbackSupplement.mockupImages,
      roomMockups: supplement.roomMockups?.length ? supplement.roomMockups : fallbackSupplement.roomMockups,
      roomImages: supplement.roomImages?.length ? supplement.roomImages : fallbackSupplement.roomImages,
      videos: supplement.videos?.length ? supplement.videos : fallbackSupplement.videos,
      placementSuggestions: supplement.placementSuggestions?.length
        ? supplement.placementSuggestions
        : fallbackSupplement.placementSuggestions,
      trustNotes: supplement.trustNotes?.length ? supplement.trustNotes : fallbackSupplement.trustNotes,
      relatedLinks: supplement.relatedLinks?.length ? supplement.relatedLinks : fallbackSupplement.relatedLinks,
      artist: supplement.artist || fallbackSupplement.artist,
      series: supplement.series || fallbackSupplement.series,
      shippingNote: supplement.shippingNote || fallbackSupplement.shippingNote,
      returnsNote: supplement.returnsNote || fallbackSupplement.returnsNote,
      productFaq: supplement.productFaq || fallbackSupplement.productFaq,
      sizeGuidance: supplement.sizeGuidance || fallbackSupplement.sizeGuidance,
    };
  }
  if (supplement) return supplement;
  if (fallbackSupplement) return fallbackSupplement;
  return null;
}

function relatedFallbackProducts(currentProduct: any, products: any[]) {
  if (!products?.length) return [];
  const currentCategory = currentProduct._source?.category_name || currentProduct.productType;
  const currentColors = new Set(currentProduct._source?.colors || []);

  const scored = products
    .filter((product) => product.handle !== currentProduct.handle)
    .map((product) => {
      const sameCategory = (product._source?.category_name || product.productType) === currentCategory;
      const colorOverlap = (product._source?.colors || []).some((color: string) => currentColors.has(color));
      return {product, score: Number(sameCategory) * 2 + Number(colorOverlap)};
    })
    .sort((a, b) => b.score - a.score || a.product.title.localeCompare(b.product.title));

  return scored.slice(0, 4).map((item) => item.product);
}

export async function loader({params, context}: {params: any; context: any}) {
  const {handle} = params;

  if (!handle || !OPENING_DROP_HANDLES.has(handle)) {
    throw new Response('Not found', {status: 404});
  }

  const [productData, supplementData, fallbackProduct, fallbackProducts] = await Promise.all([
    context.storefront.query(PRODUCT_QUERY, {variables: {handle}}).catch(() => null),
    context.sanity.fetch(PRODUCT_SUPPLEMENT_QUERY, {handle}).catch(() => null),
    getFallbackProduct(handle, context.env),
    getFallbackProducts(context.env),
  ]);

  const product = productData?.product || fallbackProduct;

  if (!product) {
    throw new Response('Not found', {status: 404});
  }

  const supplement = normalizeSupplement(supplementData, product, fallbackProduct);
  const relatedProducts = relatedFallbackProducts(fallbackProduct || product, fallbackProducts);

  return {product, supplement, relatedProducts};
}

export default function ProductPage() {
  const {product, supplement, relatedProducts} = useLoaderData<typeof loader>();
  const purchaseRef = useRef<HTMLDivElement | null>(null);
  const [quantity, setQuantity] = useState(1);

  const minPrice = product.priceRange?.minVariantPrice;
  const maxPrice = product.priceRange?.maxVariantPrice;
  const variants = product.variants?.nodes || [];
  const allUnavailable = variants.length > 0 && variants.every((variant: any) => !variant.availableForSale);
  const isFallbackProduct = Boolean(product._fallback);
  const initialVariant = useMemo(
    () => variants.find((variant: any) => variant.availableForSale) || variants[0],
    [variants],
  );
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    initialVariant?.id || null,
  );
  const selectedVariant =
    variants.find((variant: any) => variant.id === selectedVariantId) || initialVariant;
  const selectedPrice = selectedVariant?.price || minPrice;
  const optionSummary = selectedVariant?.selectedOptions
    ?.map((option: any) => option.value)
    .join(' / ');
  const roomImages = [
    ...(supplement?.roomMockups || []),
    ...(supplement?.mockupImages || []),
    ...(supplement?.roomImages || []),
  ];

  return (
    <main className="min-h-dvh pb-28 pt-24 md:pb-0" style={{backgroundColor: 'var(--color-bg-primary)'}}>
      <section className="container-gallery py-8">
        <nav className="flex flex-wrap items-center gap-2 text-caption uppercase text-text-muted">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/collection">Collection</Link>
          <span>/</span>
          <span className="text-text-primary">{product.title}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[58%_42%] lg:gap-14">
          <ProductGallery product={product} supplement={supplement} />

          <ProductPurchasePanel
            product={product}
            supplement={supplement}
            variants={variants}
            selectedVariant={selectedVariant}
            selectedVariantId={selectedVariant?.id || selectedVariantId}
            onVariantSelect={setSelectedVariantId}
            selectedPrice={selectedPrice}
            minPrice={minPrice}
            maxPrice={maxPrice}
            optionSummary={optionSummary}
            quantity={quantity}
            setQuantity={setQuantity}
            isFallbackProduct={isFallbackProduct}
            allUnavailable={allUnavailable}
            purchaseRef={purchaseRef}
          />
        </div>
      </section>

      <RoomPlacementGallery
        title={product.title}
        images={roomImages}
        sizeGuidance={supplement?.sizeGuidance}
        placementSuggestions={supplement?.placementSuggestions}
      />

      <ProductStorySections
        product={product}
        supplement={supplement}
        optionSummary={optionSummary}
        selectedVariant={selectedVariant}
      />

      <RelatedProductsRail products={relatedProducts} />

      <ProductStickyMobileBar
        product={product}
        optionSummary={optionSummary}
        selectedVariant={selectedVariant}
        quantity={quantity}
        isFallbackProduct={isFallbackProduct}
        allUnavailable={allUnavailable}
        purchaseRef={purchaseRef}
      />
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="container-gallery section-pad">
        <h1 className="text-h1">Product not found</h1>
        <a href="/" className="text-gold">Return home</a>
      </main>
    );
  }
  return (
    <main className="container-gallery section-pad">
      <h1 className="text-h1">Error</h1>
      <p className="text-body text-text-secondary">Something went wrong loading this product.</p>
    </main>
  );
}
