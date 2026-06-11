import { motion } from "framer-motion";
import type { Product } from "@/data/mockData";
import ProductCard from "@/components/product/ProductCard";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <motion.section
      className="container-gallery section-pad"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
    >
      <motion.h2 variants={fadeUp} className="font-display text-4xl text-text-primary">
        From the same series
      </motion.h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <motion.div key={product.handle} variants={fadeUp}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
