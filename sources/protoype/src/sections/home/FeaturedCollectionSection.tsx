import { Link } from "react-router";
import { motion } from "framer-motion";
import { products } from "@/data/mockData";
import ProductCard from "@/components/product/ProductCard";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function FeaturedCollectionSection() {
  const featured = products.filter((product) => product.isFeatured);

  return (
    <motion.section className="section-pad bg-void" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
      <div className="container-gallery">
        <motion.div variants={fadeUp} className="flex items-end justify-between gap-5">
          <div>
            <h2 className="font-display text-4xl text-text-primary">The Collection</h2>
            <p className="mt-2 text-sm text-text-secondary">Curated prints from the Kumachi catalogue. Each one made to last.</p>
          </div>
          <Link to="/shop" className="flex items-center gap-2 text-sm font-semibold text-gold">
            Browse all prints →</Link>
        </motion.div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <motion.div key={product.handle} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
