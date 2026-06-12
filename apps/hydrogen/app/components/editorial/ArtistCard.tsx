import {Link} from 'react-router';

interface ArtistCardProps {
  artist: any;
}

export function ArtistCard({artist}: ArtistCardProps) {
  return (
    <Link to={`/artists/${artist.slug?.current}`} className="group">
      <div className="aspect-[1/1] bg-surface-mid rounded-xs overflow-hidden mb-4">
        {artist.portrait && (
          <img
            src={artist.portrait.asset?.url}
            alt={artist.portrait.alt || artist.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
      </div>
      <h3 className="text-h3 mb-1">{artist.name}</h3>
      {artist.location && <p className="text-body-small text-text-muted">{artist.location}</p>}
      {artist.featuredQuote && (
        <p className="text-body-small text-text-secondary mt-2 italic">&ldquo;{artist.featuredQuote}&rdquo;</p>
      )}
    </Link>
  );
}
