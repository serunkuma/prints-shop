import {Link} from 'react-router';
import {ArrowRight} from 'lucide-react';
import MarqueeRow from '~/components/motion/MarqueeRow';

const fallbackProducts = [
  {id: 'lion', handle: 'lion-of-judah', title: 'Lion of Judah', artist: 'Kumachi Prints', image: '/images/hero-lion-print.jpg'},
  {id: 'figures', handle: 'three-sisters', title: 'Three Sisters', artist: 'Kumachi Prints', image: '/images/hero-figures-print.jpg'},
  {id: 'abstract', handle: 'abstract-rhythm', title: 'Abstract Rhythm', artist: 'Kumachi Prints', image: '/images/collection-print-01.jpg'},
  {id: 'portrait', handle: 'portrait-study', title: 'Portrait Study', artist: 'Kumachi Prints', image: '/images/collection-print-02.jpg'},
];

export function EditorialProductRail({products = []}: {products?: any[]}) {
  const items = products.length
    ? products.map((product: any) => ({
        id: product.id,
        handle: product.handle,
        title: product.title,
        artist: product.vendor || 'Kumachi Prints',
        image: product.featuredImage?.url || '/images/hero-lion-print.jpg',
      }))
    : fallbackProducts;

  return (
    <section aria-label="Featured product marquee" style={{backgroundColor: 'var(--color-surface-deep)', overflow: 'hidden'}}>
      <div className="py-5" style={{borderTop: '1px solid rgba(255,255,255,0.14)', borderBottom: '1px solid rgba(255,255,255,0.14)'}}>
        <MarqueeRow speed={38}>
          {items.concat(items).map((product, index) => (
            <Link key={`${product.id}-${index}`} to={`/products/${product.handle}`} className="group flex items-center gap-4 px-3" style={{textDecoration: 'none'}}>
              <span className="h-16 w-12 overflow-hidden border border-white/20">
                <img src={product.image} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </span>
              <span>
                <span className="block whitespace-nowrap text-h4" style={{color: '#fffaf0'}}>{product.title}</span>
                <span className="flex items-center gap-2 text-caption normal-case tracking-normal" style={{color: '#d8cbb7'}}>
                  {product.artist} <ArrowRight size={12} />
                </span>
              </span>
            </Link>
          ))}
        </MarqueeRow>
      </div>
    </section>
  );
}
