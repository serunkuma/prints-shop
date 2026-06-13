import {Link} from 'react-router';
import AnimatedButton from '~/components/motion/AnimatedButton';

export function ArtistSpotlightSection() {
  return (
    <section className="kumachi-section" style={{backgroundColor: 'var(--color-bg-secondary)'}}>
      <div className="container-gallery grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="overflow-hidden" style={{border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-soft)'}}>
          <img src="/images/artist-portrait.jpg" alt="Kumachi artist portrait" className="aspect-[4/5] h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>Artist spotlight</p>
          <h2 className="text-h2 mt-3" style={{color: 'var(--color-text-primary)'}}>Ernest Serunkuma</h2>
          <p className="text-body mt-5 max-w-[620px]" style={{color: 'var(--color-text-secondary)'}}>
            Kumachi Prints carries the visual memory of the gallery into a practical print shop: bold forms, layered stories, and art that can live with you every day.
          </p>
          <Link to="/artists" className="mt-7 inline-flex" style={{textDecoration: 'none'}}>
            <AnimatedButton variant="outline">View Artist Prints</AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
