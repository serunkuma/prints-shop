import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

interface FeaturedCollectionSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export default function FeaturedCollectionSection({
  title,
  products,
  viewAllLink = "/collection",
}: FeaturedCollectionSectionProps) {
  return (
    <section
      className="kumachi-section"
      style={{
        backgroundColor: "var(--color-bg-primary)",
      }}
    >
      <div className="container-gallery">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-5"
        >
          <div>
            <p className="text-caption uppercase" style={{ color: "var(--color-accent-clay)" }}>
              Collector edit
            </p>
            <h2
              className="text-h2 mt-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              {title}
            </h2>
          </div>
          <Link
            to={viewAllLink}
            className="text-nav flex items-center gap-2 group"
            style={{ color: "var(--color-text-primary)" }}
          >
            <span className="group-hover:underline">View All</span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 mt-10">
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{
                marginTop: index === 1 || index === 4 ? "42px" : 0,
              }}
              className={`hidden lg:block ${
                index === 0 || index === 3 ? "lg:col-span-5" : "lg:col-span-3"
              } ${index === 2 ? "lg:col-span-4" : ""}`}
            >
              <ProductCard product={product} index={index} featured={index === 0 || index === 3} />
            </div>
          ))}
          {products.map((product, index) => (
            <div key={`mobile-${product.id}`} className="lg:hidden">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
