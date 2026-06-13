import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

interface ProductMediaProps {
  featuredImage: any;
  images: any[];
  title: string;
}

export function ProductMedia({featuredImage, images, title}: ProductMediaProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const allImages = [featuredImage, ...images.filter((i: any) => i.id !== featuredImage?.id)].filter(Boolean);
  const current = allImages[selectedIndex];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden" style={{backgroundColor: 'var(--color-bg-tertiary)'}}>
        <AnimatePresence mode="wait">
          {current && (
            <motion.img
              key={current.url}
              src={current.url}
              alt={current.altText || title}
              className="absolute inset-0 h-full w-full object-cover"
              width={current.width || 800}
              height={current.height || 1000}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
            />
          )}
        </AnimatePresence>
      </div>
      {allImages.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto">
          {allImages.map((img: any, i: number) => (
            <button
              key={img.id || img.url || i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className="h-[72px] w-[72px] shrink-0 overflow-hidden border"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: i === selectedIndex ? 'var(--color-border-active)' : 'var(--color-border)',
              }}
              aria-label={`Show ${img.altText || `${title} view ${i + 1}`}`}
            >
              <img src={img.url} alt={img.altText || `${title} view ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
