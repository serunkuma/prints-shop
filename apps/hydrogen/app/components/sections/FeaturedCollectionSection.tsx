import {ProductGrid} from '~/components/product/ProductGrid';

interface FeaturedCollectionSectionProps {
  section: any;
  products?: any[];
}

export function FeaturedCollectionSection({section, products}: FeaturedCollectionSectionProps) {
  if (!section.title && !products?.length) return null;

  return (
    <section className="container-gallery section-pad">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-h2">{section.title || 'Featured'}</h2>
          {section.description && <p className="text-body text-text-secondary mt-4 max-w-xl">{section.description}</p>}
        </div>
        {section.collectionHandle && (
          <a href={`/collection/${section.collectionHandle}`} className="text-gold text-body-small hover:opacity-80 transition-opacity flex-shrink-0">
            View all &rarr;
          </a>
        )}
      </div>
      <ProductGrid products={products || []} />
    </section>
  );
}
