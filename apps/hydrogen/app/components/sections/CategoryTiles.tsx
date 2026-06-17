import {Link} from 'react-router';
import {motion} from 'framer-motion';
import {ArrowUpRight} from 'lucide-react';

const categories = [
  {label: 'New Arrivals', detail: 'Fresh releases', image: '/images/hero-lion-print.jpg', tone: 'dark', to: '/collection?sort=newest'},
  {label: 'Portraits', detail: 'Faces and identity', image: '/images/collection-print-02.jpg', tone: 'light', to: '/collection?genre=figurative-and-portrait-art'},
  {label: 'Abstract', detail: 'Gesture and color', image: '/images/collection-print-01.jpg', tone: 'light', to: '/collection?genre=abstract-art'},
  {label: 'Patterns', detail: 'Textile rhythm', image: '/images/collection-print-04.jpg', tone: 'dark', to: '/collection?genre=abstract-art'},
  {label: 'Landscape', detail: 'Atmospheric rooms', image: '/images/pdp-room-mockup-01.jpg', tone: 'light', to: '/collection?genre=landscape-and-nature'},
  {label: 'Afrofuturism', detail: 'Future memory', image: '/images/collection-print-03.jpg', tone: 'dark', to: '/collection?genre=contemporary-african-art'},
];

export function CategoryTiles() {
  return (
    <section className="kumachi-section" style={{backgroundColor: 'var(--color-bg-primary)'}}>
      <div className="container-gallery">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>Browse by mood</p>
            <h2 className="text-h2 mt-2 max-w-3xl" style={{color: 'var(--color-text-primary)'}}>
              Find the print that fits the room and the story.
            </h2>
          </div>
          <p className="text-body max-w-[420px]" style={{color: 'var(--color-text-secondary)'}}>
            Shop curated pathways across Kumachi Prints, then refine by color, region, genre, or price.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {categories.map((category, index) => (
            <motion.div key={category.label} initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.45, delay: index * 0.05}} className={index < 2 ? 'lg:col-span-2' : 'lg:col-span-1'}>
              <Link to={category.to} className="group relative block overflow-hidden" style={{minHeight: index < 2 ? 300 : 240, border: '1px solid var(--color-border)', textDecoration: 'none'}}>
                <img src={category.image} alt={category.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0" style={{background: category.tone === 'dark' ? 'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.72))' : 'linear-gradient(180deg, rgba(255,250,240,0.25), rgba(21,18,13,0.58))'}} />
                <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center bg-[var(--color-accent-ochre)] text-[#15120d]">
                  <ArrowUpRight size={18} />
                </span>
                <span className="absolute bottom-4 left-4 right-4">
                  <span className="block text-h4" style={{color: '#fffaf0'}}>{category.label}</span>
                  <span className="mt-1 block text-caption normal-case tracking-normal" style={{color: '#eadbc4'}}>{category.detail}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
