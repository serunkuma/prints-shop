import {useMemo} from 'react';
import type {SanityImageSource} from '~/lib/sanity.server';
import {useRootLoaderData} from '~/lib/useRootLoaderData';

interface SanityImageProps {
  image: SanityImageSource;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function SanityImage({image, alt, width = 800, height, className, loading = 'lazy'}: SanityImageProps) {
  const rootData = useRootLoaderData();
  const sanity = rootData?.sanity;

  const src = useMemo(() => {
    if (!sanity?.urlFor || !image) return '';
    return sanity.urlFor(image).width(width).auto('format').url();
  }, [sanity, image, width]);

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
