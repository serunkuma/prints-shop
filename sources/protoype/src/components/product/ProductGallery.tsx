import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductImage } from "@/data/mockData";

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [active, setActive] = useState(images[0]);

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-mid">
        <AnimatePresence mode="wait">
          <motion.img
            key={active.src}
            src={active.src}
            alt={active.alt}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto">
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(image)}
            className="h-[72px] w-[72px] shrink-0 border bg-surface-mid"
            style={{ borderColor: image.src === active.src ? "var(--gold)" : "var(--border-mid)" }}
            aria-label={`Show ${image.alt}`}
          >
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
