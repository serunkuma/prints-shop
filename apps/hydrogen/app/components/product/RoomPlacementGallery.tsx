import {Link} from 'react-router';

function imageSrc(image: any) {
  return image?.asset?.url || image?.url || image?.src;
}

export function RoomPlacementGallery({
  title,
  images,
  sizeGuidance,
  placementSuggestions,
}: {
  title: string;
  images?: any[];
  sizeGuidance?: string;
  placementSuggestions?: string[];
}) {
  const usableImages = (images || []).filter((image) => imageSrc(image));

  if (!usableImages.length && !sizeGuidance && !placementSuggestions?.length) {
    return null;
  }

  return (
    <section className="section-pad border-t border-border" aria-label="In Your Space">
      <div className="container-gallery">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-caption uppercase text-text-muted">In Your Space</p>
            <h2 className="mt-2 text-h2 font-display text-text-primary">
              See how {title} lives with a room.
            </h2>
            {sizeGuidance && (
              <p className="mt-4 max-w-lg text-body text-text-secondary">{sizeGuidance}</p>
            )}
            {placementSuggestions?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {placementSuggestions.map((item) => (
                  <span key={item} className="border border-border bg-surface px-3 py-2 text-caption uppercase text-text-secondary">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
            <Link
              to="/pages/size-guide"
              className="mt-6 inline-flex min-h-11 items-center border-b border-gold text-button text-text-primary transition-colors hover:text-gold"
            >
              Open the size guide
            </Link>
          </div>

          {usableImages.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {usableImages.slice(0, 4).map((image, index) => (
                <figure
                  key={image._key || imageSrc(image)}
                  className={index === 0 ? 'sm:col-span-2' : ''}
                >
                  <img
                    src={imageSrc(image)}
                    alt={image.alt || `${title} room placement ${index + 1}`}
                    className={`w-full border border-border bg-surface object-cover ${
                      index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'
                    }`}
                    loading="lazy"
                  />
                  {(image.placementNote || image.roomType || image.caption) && (
                    <figcaption className="mt-2 text-caption text-text-tertiary">
                      {image.placementNote || image.roomType || image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
