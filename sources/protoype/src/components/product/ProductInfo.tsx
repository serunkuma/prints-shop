import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Artist, Product } from "@/data/mockData";
import { useCartStore } from "@/store/useCartStore";
import { formatMoney } from "@/lib/format";

interface ProductInfoProps {
  product: Product;
  artist: Artist;
}

export default function ProductInfo({ product, artist }: ProductInfoProps) {
  const firstAvailableSize = product.sizes.find((size) => size.available) ?? product.sizes[0];
  const firstAvailableFrame = product.frames.find((frame) => frame.available) ?? product.frames[0];
  const [selectedSize, setSelectedSize] = useState(firstAvailableSize);
  const [selectedFrame, setSelectedFrame] = useState(firstAvailableFrame);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const price = useMemo(() => selectedSize.price, [selectedSize]);

  function addToCart() {
    addItem({
      productId: product.id,
      handle: product.handle,
      title: product.title,
      artist: product.artist,
      size: selectedSize.label,
      frame: selectedFrame.label,
      price,
      currency: product.currency,
      quantity: 1,
      image: product.images[0].src,
    });
    openCart();
    toast("Added to cart.");
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">{product.series}</p>
      <h1 className="mt-3 font-display text-5xl leading-none text-text-primary md:text-6xl">{product.title}</h1>
      <p className="mt-3 text-sm text-text-secondary">by {product.artist} · {artist.location}</p>
      <div className="my-6 h-px bg-[var(--border-mid)]" />
      <motion.p key={price} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-medium text-text-primary">
        {formatMoney(price, product.currency)}
      </motion.p>

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-secondary">Size</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {product.sizes.map((size) => (
            <button
              key={size.label}
              type="button"
              disabled={!size.available}
              onClick={() => setSelectedSize(size)}
              className={`min-h-11 rounded-sm border px-3 py-2 text-sm font-medium transition-colors ${
                selectedSize.label === size.label ? "border-gold bg-surface text-gold" : "border-[var(--border-mid)] text-text-primary hover:border-text-muted"
              } ${!size.available ? "cursor-not-allowed opacity-40 line-through" : ""}`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-secondary">Frame</p>
        <div className="flex gap-3">
          {product.frames.map((frame) => (
            <button
              key={frame.label}
              type="button"
              disabled={!frame.available}
              onClick={() => setSelectedFrame(frame)}
              className={`h-11 w-11 rounded-full border-2 transition-all ${
                selectedFrame.label === frame.label ? "border-gold ring-2 ring-gold ring-offset-2 ring-offset-void" : "border-transparent"
              } ${!frame.available ? "cursor-not-allowed opacity-30" : ""}`}
              style={{ background: frame.color }}
              aria-label={frame.label}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-text-secondary">{selectedFrame.label}</p>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={addToCart}
        className="mt-7 h-12 w-full rounded-sm bg-gold text-sm font-semibold uppercase tracking-wider text-void"
      >
        Add to Cart
      </motion.button>

      <Accordion type="single" collapsible className="mt-8 border-y border-[var(--border-mid)]">
        <AccordionItem value="about">
          <AccordionTrigger className="text-text-primary">About this print</AccordionTrigger>
          <AccordionContent className="text-text-secondary">{product.description}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="details">
          <AccordionTrigger className="text-text-primary">Print details</AccordionTrigger>
          <AccordionContent className="text-text-secondary">
            {product.technique}. Open edition unless marked limited. Printed with archival pigment inks.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger className="text-text-primary">Shipping & Returns</AccordionTrigger>
          <AccordionContent className="text-text-secondary">
            Prints are made to order. Shipping is calculated at checkout. Production errors or transit damage are handled with reprint support.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-8 flex items-center gap-4 rounded-md border border-[var(--border-mid)] bg-surface p-4">
        <img src={artist.portrait} alt={`${artist.name} portrait`} className="h-12 w-12 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="font-display text-xl leading-none text-text-primary">{artist.name}</p>
          <p className="text-xs text-text-secondary">{artist.location}</p>
          <Link to={`/artists/${artist.handle}`} className="text-xs font-medium text-gold">
            View artist
          </Link>
        </div>
      </div>
    </div>
  );
}
