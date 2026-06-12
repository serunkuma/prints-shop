import type { MouseEvent } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/mockData";
import { useCartStore } from "@/store/useCartStore";
import { formatMoney } from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const defaultSize = product.sizes.find((size) => size.available) ?? product.sizes[0];
  const defaultFrame = product.frames.find((frame) => frame.available && frame.label === "No Frame") ?? product.frames[0];

  function quickAdd(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    addItem({
      productId: product.id,
      handle: product.handle,
      title: product.title,
      artist: product.artist,
      size: defaultSize.label,
      frame: defaultFrame.label,
      price: defaultSize.price,
      currency: product.currency,
      quantity: 1,
      image: product.images[0].src,
    });
    openCart();
    toast.success("Added to cart");
  }

  const badge = !defaultSize.available
    ? "SOLD OUT"
    : product.isNew
      ? "NEW"
      : product.isLimited
        ? "LIMITED"
        : null;

  return (
    <motion.article layout whileHover="hover" className="group cursor-pointer">
      <Link to={`/product/${product.handle}`} className="block no-underline">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-mid">
          <motion.img
            src={product.images[0].src}
            alt={product.images[0].alt}
            className="h-full w-full object-cover"
            variants={{ hover: { scale: 1.04 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            loading="lazy"
          />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundColor: "color-mix(in srgb, var(--void) 30%, transparent)" }}
          />
          <motion.button
            type="button"
            onClick={quickAdd}
            initial={{ opacity: 0, y: 8 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            variants={{ hover: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.22 }}
            className="absolute bottom-4 right-4 flex min-h-11 items-center gap-2 rounded-sm bg-gold px-3 py-2 text-xs font-semibold uppercase tracking-widest text-void"
          >
            <ShoppingBag size={14} />
            Add
          </motion.button>
          {badge && (
            <span
              className={`absolute left-3 top-3 rounded-sm px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-void ${
                badge === "NEW" ? "bg-gold" : badge === "LIMITED" ? "bg-blush" : "bg-surface-mid text-text-muted"
              }`}
            >
              {badge}
            </span>
          )}
        </div>
        <footer className="pb-1 pt-3">
          <p className="text-xs font-medium uppercase tracking-widest text-text-secondary">{product.artist}</p>
          <h3 className="mt-1 font-display text-xl leading-snug text-text-primary">{product.title}</h3>
          <div className="mt-1 flex items-baseline justify-between gap-3">
            <p className="text-sm font-medium text-text-primary">{formatMoney(product.price, product.currency)}</p>
            {product.compareAtPrice && (
              <p className="text-xs text-text-muted line-through">{formatMoney(product.compareAtPrice, product.currency)}</p>
            )}
          </div>
        </footer>
      </Link>
    </motion.article>
  );
}
