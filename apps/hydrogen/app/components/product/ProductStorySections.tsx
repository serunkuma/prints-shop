import {Link} from 'react-router';
import {PortableText} from '~/components/editorial/PortableText';

function detailRows({
  supplement,
  product,
  optionSummary,
  selectedVariant,
}: {
  supplement?: any;
  product: any;
  optionSummary?: string;
  selectedVariant?: any;
}) {
  const printDetails = supplement?.printDetails || product._source?.print_details || {};
  return [
    {label: 'Format', value: optionSummary || product._source?.default_size || 'Choose size'},
    {label: 'Paper', value: printDetails.paper || supplement?.paper || 'Archival matte paper'},
    {label: 'Ink', value: printDetails.ink || supplement?.ink || 'Archival pigment ink'},
    {label: 'Edition', value: printDetails.edition || supplement?.edition || 'Open edition'},
    {label: 'SKU', value: selectedVariant?.sku || printDetails.sku || product._source?.sku || product.handle},
  ].filter((row) => row.value);
}

export function ProductStorySections({
  product,
  supplement,
  optionSummary,
  selectedVariant,
}: {
  product: any;
  supplement?: any;
  optionSummary?: string;
  selectedVariant?: any;
}) {
  const hasStory = Array.isArray(supplement?.story) && supplement.story.length > 0;
  const hasInspiration = Array.isArray(supplement?.inspiration) && supplement.inspiration.length > 0;
  const placements = supplement?.placementSuggestions || [];
  const rows = detailRows({supplement, product, optionSummary, selectedVariant});

  return (
    <section className="section-pad border-t border-border">
      <div className="container-gallery space-y-14">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-caption uppercase text-text-muted">Story</p>
            <h2 className="mt-2 text-h2 font-display text-text-primary">
              The reason this print belongs in the Opening Drop.
            </h2>
          </div>
          <div className="max-w-3xl">
            {hasStory ? (
              <PortableText value={supplement.story} />
            ) : (
              <p className="text-body leading-relaxed text-text-secondary">
                {product.description || `${product.title} is part of the first Kumachi Prints release.`}
              </p>
            )}
            {hasInspiration && (
              <div className="mt-8 border-l-2 border-gold pl-5">
                <p className="mb-3 text-caption uppercase text-text-muted">Inspiration</p>
                <PortableText value={supplement.inspiration} />
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <section className="border border-border bg-surface p-6" aria-labelledby="size-placement-heading">
            <h3 id="size-placement-heading" className="text-h3 font-display text-text-primary">
              Size & Placement
            </h3>
            <p className="mt-3 text-body-small text-text-secondary">
              {supplement?.productFaq ||
                supplement?.sizeGuidance ||
                'Choose a size that gives the composition enough breathing room for the wall.'}
            </p>
            {placements.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {placements.map((item: string) => (
                  <span key={item} className="border border-border px-3 py-2 text-caption uppercase text-text-secondary">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
            <Link to="/pages/size-guide" className="mt-6 inline-flex text-caption uppercase text-text-primary underline decoration-gold underline-offset-4">
              Size guide
            </Link>
          </section>

          <section className="border border-border bg-surface p-6" aria-labelledby="print-details-heading">
            <h3 id="print-details-heading" className="text-h3 font-display text-text-primary">
              Print Details
            </h3>
            <dl className="mt-4 space-y-3">
              {rows.map(({label, value}) => (
                <div key={label} className="grid grid-cols-[92px_minmax(0,1fr)] gap-3">
                  <dt className="text-caption uppercase text-text-muted">{label}</dt>
                  <dd className="text-body-small text-text-primary">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="border border-border bg-surface p-6" aria-labelledby="shipping-returns-heading">
            <h3 id="shipping-returns-heading" className="text-h3 font-display text-text-primary">
              Shipping & Returns
            </h3>
            <p className="mt-3 text-body-small text-text-secondary">
              {supplement?.shippingNote ||
                product._source?.shipping_note ||
                'Produced after ordering, then packed for careful delivery.'}
            </p>
            <p className="mt-3 text-body-small text-text-secondary">
              {supplement?.returnsNote ||
                product._source?.returns_note ||
                'If a print arrives damaged, contact us with photos so we can help quickly.'}
            </p>
            <Link to="/pages/shipping-returns" className="mt-6 inline-flex text-caption uppercase text-text-primary underline decoration-gold underline-offset-4">
              Read policy
            </Link>
          </section>
        </div>

        <div className="grid gap-8 border-t border-border pt-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-caption uppercase text-text-muted">About Kuma</p>
            <h2 className="mt-2 text-h2 font-display text-text-primary">
              A print line built from myth, memory, and a sharp eye for the wall.
            </h2>
          </div>
          <div className="max-w-3xl">
            {supplement?.artist?.featuredQuote && (
              <blockquote className="border-l-2 border-gold pl-5 text-h3 font-display text-text-primary">
                {supplement.artist.featuredQuote}
              </blockquote>
            )}
            <p className="mt-5 text-body leading-relaxed text-text-secondary">
              {supplement?.artist?.bio ||
                product._source?.artist?.bio ||
                'Kumachi Prints translates Kuma’s visual world into considered archival prints for homes, studios, and thoughtful collections.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/about" className="inline-flex min-h-11 items-center border border-border px-5 text-button text-text-primary transition-colors hover:border-gold">
                Read the story
              </Link>
              <Link to="/blog/drops/opening-drop" className="inline-flex min-h-11 items-center border-b border-gold text-button text-text-primary transition-colors hover:text-gold">
                Opening Drop notes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
