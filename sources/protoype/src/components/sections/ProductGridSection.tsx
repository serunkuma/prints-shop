import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

interface ProductGridSectionProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export default function ProductGridSection({
  products,
  columns = 3,
}: ProductGridSectionProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
