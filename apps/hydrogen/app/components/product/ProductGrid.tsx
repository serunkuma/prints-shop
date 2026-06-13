import {ProductCard} from './ProductCard';

interface ProductGridProps {
  products: any[];
  columns?: 2 | 3 | 4;
}

const colClasses = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};

export function ProductGrid({products, columns = 4}: ProductGridProps) {
  if (!products?.length) return null;

  return (
    <div className={`grid grid-cols-1 ${colClasses[columns]} gap-gutter`}>
      {products.map((product: any, index: number) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
