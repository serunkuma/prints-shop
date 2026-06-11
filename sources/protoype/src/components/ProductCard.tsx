import { Link } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
  featured?: boolean;
}

export default function ProductCard({ product, index = 0, featured = false }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.0, 0, 0.2, 1],
      }}
    >
      <Link
        to={`/product/${product.handle}`}
        className="block group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ textDecoration: "none" }}
      >
        {/* Image Area */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: featured ? "4/5.4" : "4/5",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
            boxShadow: hovered ? "var(--shadow-soft)" : "none",
            transition: "box-shadow 300ms ease",
          }}
        >
          <motion.img
            src={product.image}
            alt={`${product.title} — ${product.artist}`}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--color-overlay)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="px-4 py-2 text-caption uppercase"
              style={{
                backgroundColor: "var(--color-accent-ochre)",
                color: "#15120d",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: hovered ? 1 : 0,
                y: hovered ? 0 : 8,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              Quick View
            </motion.div>
          </motion.div>

          {/* Tags */}
          <div className="absolute top-3 left-3 flex gap-1">
            {(product.isNew || product.tags.includes("New")) && (
              <span
                className="text-caption px-2.5 py-1 uppercase"
                style={{
                  color: "#15120d",
                  backgroundColor: "var(--color-accent-ochre)",
                }}
              >
                New
              </span>
            )}
            {(product.originalPrice || product.tags.includes("Sale")) && (
              <span
                className="text-caption px-2.5 py-1 uppercase"
                style={{
                  color: "#fffaf0",
                  backgroundColor: "var(--color-accent-crimson)",
                }}
              >
                Sale
              </span>
            )}
          </div>
          <div
            className="absolute right-3 bottom-3 px-3 py-2 text-caption uppercase"
            style={{
              backgroundColor: "var(--color-surface-deep)",
              color: "var(--color-bg-primary)",
            }}
          >
            {product.genre}
          </div>
        </div>

        {/* Info Area */}
        <div className="pt-4 pb-2">
          <p
            className="text-caption uppercase"
            style={{ color: "var(--color-accent-clay)" }}
          >
            {product.artist}
          </p>
          <p
            className="text-h4 truncate mt-1"
            style={{ color: "var(--color-text-primary)" }}
          >
            {product.title}
          </p>
          <div className="flex items-center gap-2 mt-2">
            {product.originalPrice && (
              <span
                className="text-body-small line-through"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span
              className="text-body-small font-bold"
              style={{
                color: product.originalPrice
                  ? "var(--color-accent-crimson)"
                  : "var(--color-text-primary)",
              }}
            >
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
