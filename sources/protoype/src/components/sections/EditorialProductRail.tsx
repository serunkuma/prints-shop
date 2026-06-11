import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import MarqueeRow from "@/components/motion/MarqueeRow";
import type { Product } from "@/data/products";

interface EditorialProductRailProps {
  products: Product[];
}

export default function EditorialProductRail({ products }: EditorialProductRailProps) {
  return (
    <section style={{ backgroundColor: "var(--color-surface-deep)", overflow: "hidden" }}>
      <div
        className="py-5"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.14)",
          borderBottom: "1px solid rgba(255,255,255,0.14)",
        }}
      >
        <MarqueeRow speed={38}>
          {products.concat(products).map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              to={`/product/${product.handle}`}
              className="group flex items-center gap-4 px-3"
              style={{ textDecoration: "none" }}
            >
              <span className="h-16 w-12 overflow-hidden border border-white/20">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span>
                <span className="block text-h4 whitespace-nowrap" style={{ color: "#fffaf0" }}>
                  {product.title}
                </span>
                <span className="flex items-center gap-2 text-caption normal-case tracking-normal" style={{ color: "#d8cbb7" }}>
                  {product.artist} <ArrowRight size={12} />
                </span>
              </span>
            </Link>
          ))}
        </MarqueeRow>
      </div>
    </section>
  );
}
