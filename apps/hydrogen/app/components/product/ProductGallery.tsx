import {useMemo, useState} from 'react';
import {Play} from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';

type GalleryItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
  label: string;
  mimeType?: string;
};

function imageSrc(image: any) {
  return image?.asset?.url || image?.url || image?.src;
}

function videoSrc(video: any) {
  return video?.asset?.url || video?.url || video?.src;
}

function dedupe(items: GalleryItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.type}:${item.src}`;
    if (!item.src || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function ProductGallery({
  product,
  supplement,
}: {
  product: any;
  supplement?: any;
}) {
  const items = useMemo(() => {
    const gallery: GalleryItem[] = [];

    if (product.featuredImage?.url) {
      gallery.push({
        id: product.featuredImage.id || `${product.handle}-featured`,
        type: 'image',
        src: product.featuredImage.url,
        alt: product.featuredImage.altText || product.title,
        label: 'Artwork',
      });
    }

    for (const [index, image] of product.images?.nodes?.entries?.() || []) {
      if (!image?.url) continue;
      gallery.push({
        id: image.id || `${product.handle}-image-${index}`,
        type: 'image',
        src: image.url,
        alt: image.altText || `${product.title} artwork view ${index + 1}`,
        label: index === 0 ? 'Artwork' : `Artwork ${index + 1}`,
      });
    }

    for (const [index, image] of supplement?.galleryImages?.entries?.() || []) {
      const src = imageSrc(image);
      gallery.push({
        id: image._key || `${product.handle}-gallery-${index}`,
        type: 'image',
        src,
        alt: image.alt || `${product.title} ${image.role || 'detail'} view`,
        label: image.caption || image.role || 'Detail',
      });
    }

    for (const [index, image] of supplement?.additionalImages?.entries?.() || []) {
      const src = imageSrc(image);
      gallery.push({
        id: image._key || `${product.handle}-additional-${index}`,
        type: 'image',
        src,
        alt: image.alt || `${product.title} detail ${index + 1}`,
        label: image.caption || 'Detail',
      });
    }

    const roomImages = [
      ...(supplement?.roomMockups || []),
      ...(supplement?.mockupImages || []),
      ...(supplement?.roomImages || []),
    ];

    for (const [index, image] of roomImages.entries()) {
      const src = imageSrc(image);
      gallery.push({
        id: image._key || `${product.handle}-room-${index}`,
        type: 'image',
        src,
        alt: image.alt || `${product.title} shown in a room`,
        label: image.roomType || image.caption || 'Room view',
      });
    }

    for (const [index, video] of supplement?.videos?.entries?.() || []) {
      const src = videoSrc(video);
      const poster = video.poster?.asset?.url || video.poster?.url;
      gallery.push({
        id: video._key || `${product.handle}-video-${index}`,
        type: 'video',
        src,
        poster,
        alt: video.caption || `${product.title} video`,
        label: video.caption || 'Video',
        mimeType: video.asset?.mimeType || video.mimeType || 'video/mp4',
      });
    }

    return dedupe(gallery);
  }, [product, supplement]);

  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const selected = items.find((item) => item.id === selectedId) || items[0];

  if (!selected) return null;

  return (
    <section className="lg:sticky lg:top-24 lg:self-start" aria-label="Product media gallery">
      <div className="grid gap-4 lg:grid-cols-[88px_minmax(0,1fr)]">
        <div className="order-2 flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:max-h-[720px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden border bg-surface transition-all ${
                selected.id === item.id ? 'border-[var(--color-border-active)]' : 'border-border hover:border-text-muted'
              }`}
              aria-label={`Show ${item.label}`}
              aria-pressed={selected.id === item.id}
            >
              <img
                src={item.poster || item.src}
                alt=""
                className="h-full w-full object-cover"
                loading={index < 3 ? 'eager' : 'lazy'}
              />
              {item.type === 'video' && (
                <span className="absolute inset-0 grid place-items-center bg-void/30 text-paper">
                  <Play size={18} fill="currentColor" />
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="order-1 overflow-hidden border border-border bg-surface lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{opacity: 0, scale: 0.985}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 1.01}}
              transition={{duration: 0.22}}
              className="relative aspect-[4/5] w-full"
            >
              {selected.type === 'video' ? (
                <video
                  className="h-full w-full bg-void object-contain"
                  controls
                  poster={selected.poster}
                  aria-label={selected.alt}
                >
                  <source src={selected.src} type={selected.mimeType} />
                </video>
              ) : (
                <img
                  src={selected.src}
                  alt={selected.alt}
                  className="h-full w-full object-contain"
                  loading="eager"
                />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-3">
            <p className="text-caption uppercase text-text-muted">{selected.label}</p>
            <p className="text-caption text-text-tertiary">
              {items.findIndex((item) => item.id === selected.id) + 1} / {items.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
