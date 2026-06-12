import {Link} from 'react-router';

interface SeriesCardProps {
  series: any;
}

export function SeriesCard({series}: SeriesCardProps) {
  return (
    <Link to={`/drops/${series.slug?.current}`} className="group">
      <div className="aspect-[16/9] bg-surface-mid rounded-xs overflow-hidden mb-4">
        {series.heroImage && (
          <img
            src={series.heroImage.asset?.url}
            alt={series.heroImage.alt || series.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
      </div>
      <h3 className="text-h3 mb-1">{series.title}</h3>
      {series.artist && <p className="text-body-small text-text-muted mb-2">{series.artist.name}</p>}
      {series.publishDate && (
        <p className="text-body-small text-text-secondary">
          {new Date(series.publishDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
        </p>
      )}
    </Link>
  );
}
