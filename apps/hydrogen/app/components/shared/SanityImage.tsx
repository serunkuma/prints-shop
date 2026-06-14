import {useMemo} from 'react';
import {useImageUrl} from 'hydrogen-sanity';
import type {SanityImageSource} from '@sanity/image-url';

interface SanityImageProps {
  image: SanityImageSource;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function SanityImage({image, alt, width = 800, height, className, loading = 'lazy'}: SanityImageProps) {
  const imageUrl = useImageUrl(image);

  const src = useMemo(() => {
    if (!image) return '';
    return imageUrl.width(width).auto('format').url();
  }, [image, imageUrl, width]);

  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height || Math.round(width * 1.25)}
      className={className}
      loading={loading}
    />
  );
}
