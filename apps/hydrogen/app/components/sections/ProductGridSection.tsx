import {ProductGrid} from '~/components/product/ProductGrid';

interface ProductGridSectionProps {
  section: any;
  products?: any[];
}

export function ProductGridSection({section, products}: ProductGridSectionProps) {
  if (!products?.length) return null;

  return (
    <section className="container-gallery section-pad">
      {section.title && <h2 className="text-h2 mb-10">{section.title}</h2>}
      <ProductGrid products={products} columns={4} />
    </section>
  );
}
