import {useState} from 'react';

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
      <div className="aspect-[3/4] bg-surface-mid rounded-xs overflow-hidden mb-4">
        {current && (
          <img
            src={current.url}
            alt={current.altText || title}
            className="w-full h-full object-cover"
            width={current.width || 800}
            height={current.height || 1067}
          />
        )}
      </div>
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {allImages.map((img: any, i: number) => (
            <button
              key={img.id || i}
              onClick={() => setSelectedIndex(i)}
              className={`aspect-square bg-surface-mid rounded-xs overflow-hidden border transition-colors ${
                i === selectedIndex ? 'border-gold' : 'border-border hover:border-text-muted'
              }`}
            >
              <img
                src={img.url}
                alt={img.altText || `${title} view ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                width={img.width || 200}
                height={img.height || 200}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
