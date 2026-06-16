import {Link} from 'react-router';
import {motion} from 'framer-motion';
import {ArrowRight} from 'lucide-react';

type FeaturedDropSectionProps = {
  products: any[];
};

function getImage(product: any) {
  return product?.featuredImage || product?.images?.nodes?.[0] || null;
}

export function FeaturedDropSection({products}: FeaturedDropSectionProps) {
  if (!products.length) return null;

  return (
    <section
      aria-labelledby="featured-drop-heading"
      className="kumachi-section"
      style={{backgroundColor: 'var(--color-bg-primary)'}}
    >
      <div className="container-gallery">
        <motion.div
          className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          initial={{opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-80px'}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
        >
          <div className="max-w-3xl">
            <span className="accent-rule" />
            <p className="text-caption mt-5 uppercase" style={{color: 'var(--color-accent-clay)'}}>
              Featured Drop
            </p>
            <h2 id="featured-drop-heading" className="text-h2 mt-3" style={{color: 'var(--color-text-primary)'}}>
              Eight images that set the tone.
            </h2>
            <p className="text-body mt-5 max-w-2xl" style={{color: 'var(--color-text-secondary)'}}>
              The Opening Drop begins with witness, animal presence, youth, silence, and command. These are the pieces that hold the release together.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/collection"
              className="inline-flex min-h-11 items-center gap-2 px-4 text-button"
              style={{
                backgroundColor: 'var(--color-accent-ochre)',
                color: '#15120d',
                textDecoration: 'none',
              }}
            >
              Shop the drop <ArrowRight size={14} />
            </Link>
            <Link
              to="/blog/drops/opening-drop"
              className="inline-flex min-h-11 items-center gap-2 px-4 text-button"
              style={{
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
              }}
            >
              Read the story <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {products.map((product, index) => {
            const image = getImage(product);
            const isLarge = index === 0 || index === 4;
            const lgSpan = isLarge ? 'lg:col-span-5' : index === 2 || index === 7 ? 'lg:col-span-4' : 'lg:col-span-3';

            return (
              <motion.article
                key={product.handle}
                className={lgSpan}
                style={{marginTop: index === 1 || index === 5 ? 'clamp(0px, 4vw, 42px)' : 0}}
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-60px'}}
                transition={{duration: 0.48, delay: index * 0.04, ease: [0.16, 1, 0.3, 1]}}
              >
                <Link to={`/products/${product.handle}`} className="group block" style={{textDecoration: 'none'}}>
                  <div
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: isLarge ? '4 / 5.35' : '4 / 5',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      boxShadow: isLarge ? 'var(--shadow-soft)' : 'none',
                    }}
                  >
                    {image ? (
                      <img
                        src={image.url}
                        alt={image.altText || product.title}
                        width={image.width || 800}
                        height={image.height || 1000}
                        loading={index < 2 ? 'eager' : 'lazy'}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                      />
                    ) : null}
                    <div
                      className="absolute inset-x-0 bottom-0 p-4"
                      style={{
                        background:
                          'linear-gradient(to top, color-mix(in srgb, var(--color-surface-deep) 88%, transparent), transparent)',
                      }}
                    >
                      <p className="text-caption uppercase" style={{color: 'var(--color-accent-ochre)'}}>
                        Opening Drop
                      </p>
                      <h3 className="text-h4 mt-1" style={{color: '#fffaf0'}}>
                        {product.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
