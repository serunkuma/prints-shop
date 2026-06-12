import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface ProductGalleryImage {
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: ProductGalleryImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const safeImages = images.length ? images : [{ src: "", alt: "Product image" }];
  const [active, setActive] = useState(safeImages[0]);

  return (
    <div>
      <div
        className="relative aspect-[4/5] overflow-hidden"
        style={{ backgroundColor: "var(--color-bg-tertiary)" }}
      >
        <AnimatePresence mode="wait">
          {active.src && (
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
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto">
        {safeImages.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(image)}
            className="h-[72px] w-[72px] shrink-0 overflow-hidden border"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              borderColor: image.src === active.src ? "var(--color-border-active)" : "var(--color-border)",
            }}
            aria-label={`Show ${image.alt}`}
          >
            {image.src && <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />}
          </button>
        ))}
      </div>
    </div>
  );
}
