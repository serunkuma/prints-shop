import {ProductCard} from '~/components/product/ProductCard';

export function RelatedProductsRail({products}: {products?: any[]}) {
  if (!products?.length) return null;

  return (
    <section className="section-pad border-t border-border" aria-label="Related Prints">
      <div className="container-gallery">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-caption uppercase text-text-muted">Related Prints</p>
            <h2 className="mt-2 text-h2 font-display text-text-primary">
              Keep looking in the same current.
            </h2>
          </div>
          <p className="max-w-md text-body-small text-text-secondary">
            Prints selected by neighboring subject, tone, or room presence.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id || product.handle} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
