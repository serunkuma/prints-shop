import {useEffect, useState} from 'react';
import {Link, useFetcher} from 'react-router';
import {motion} from 'framer-motion';
import {ShoppingBag} from 'lucide-react';
import {toast} from 'sonner';
import {formatPrice} from '~/lib/format';
import {useUIStore} from '~/lib/store';

interface ProductCardProps {
  product: any;
  index?: number;
  featured?: boolean;
}

export function ProductCard({product, index = 0, featured = false}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const fetcher = useFetcher();
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const defaultVariant = product.variants?.nodes?.find((variant: any) => variant.availableForSale);
  const fetcherData = fetcher.data as {cart?: unknown; error?: string} | undefined;
  const price = product.priceRange?.minVariantPrice;
  const compareAtPrice = defaultVariant?.compareAtPrice;
  const image = product.featuredImage;
  const genre = product.productType || product.collections?.nodes?.[0]?.title || 'Fine art print';

  useEffect(() => {
    if (fetcherData?.cart) {
      toast.success('Added to cart');
      setCartOpen(true);
    }
  }, [fetcherData, setCartOpen]);

  return (
    <motion.div
      initial={{opacity: 0, y: 40}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-40px'}}
      transition={{duration: 0.6, delay: index * 0.08, ease: [0.0, 0, 0.2, 1]}}
    >
      <article
        className="group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link to={`/products/${product.handle}`} className="block" style={{textDecoration: 'none'}}>
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: featured ? '4/5.4' : '4/5',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              boxShadow: hovered ? 'var(--shadow-soft)' : 'none',
              transition: 'box-shadow 300ms ease',
            }}
          >
            {image && (
              <motion.img
                src={image.url}
                alt={image.altText || product.title}
                className="h-full w-full object-cover"
                width={image.width || 600}
                height={image.height || 800}
                loading="lazy"
                animate={{scale: hovered ? 1.06 : 1}}
                transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
              />
            )}
            <motion.div
              className="absolute inset-0"
              style={{backgroundColor: 'var(--color-overlay)'}}
              initial={{opacity: 0}}
              animate={{opacity: hovered ? 1 : 0}}
              transition={{duration: 0.3}}
            />

            {defaultVariant && (
              <fetcher.Form method="post" action="/cart">
                <input type="hidden" name="intent" value="add" />
                <input type="hidden" name="variantId" value={defaultVariant.id} />
                <input type="hidden" name="quantity" value="1" />
                <motion.button
                  type="submit"
                  disabled={fetcher.state !== 'idle'}
                  className="absolute bottom-4 right-4 flex min-h-11 items-center gap-2 px-3 py-2 text-caption uppercase shadow-lg disabled:opacity-50"
                  style={{backgroundColor: 'var(--color-accent-ochre)', color: '#15120d'}}
                  initial={{opacity: 0, y: 8}}
                  animate={{opacity: hovered ? 1 : 0, y: hovered ? 0 : 8}}
                  whileFocus={{opacity: 1, y: 0}}
                  whileHover={{scale: 1.03}}
                  whileTap={{scale: 0.97}}
                  transition={{duration: 0.22, ease: 'easeOut'}}
                  onClick={(event) => event.stopPropagation()}
                >
                  <ShoppingBag size={14} />
                  {fetcher.state !== 'idle' ? 'Adding' : 'Add'}
                </motion.button>
              </fetcher.Form>
            )}

            <div className="absolute top-3 left-3 flex gap-1">
              {product.tags?.includes?.('New') && (
                <span className="px-2.5 py-1 text-caption uppercase" style={{color: '#15120d', backgroundColor: 'var(--color-accent-ochre)'}}>New</span>
              )}
              {compareAtPrice && (
                <span className="px-2.5 py-1 text-caption uppercase" style={{color: '#fffaf0', backgroundColor: 'var(--color-accent-crimson)'}}>Sale</span>
              )}
            </div>

            <div className="absolute bottom-3 left-3 max-w-[calc(100%-6.5rem)] truncate px-3 py-2 text-caption uppercase" style={{backgroundColor: 'var(--color-surface-deep)', color: 'var(--color-bg-primary)'}}>
              {genre}
            </div>
          </div>

          <div className="pb-2 pt-4">
            <p className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>
              {product.vendor || 'Kumachi Prints'}
            </p>
            <p className="text-h4 mt-1 truncate" style={{color: 'var(--color-text-primary)'}}>
              {product.title}
            </p>
            <div className="mt-2 flex items-center gap-2">
              {compareAtPrice && (
                <span className="text-body-small line-through" style={{color: 'var(--color-text-tertiary)'}}>
                  {formatPrice(parseFloat(compareAtPrice.amount) * 100)}
                </span>
              )}
              {price && (
                <span className="text-body-small font-bold" style={{color: compareAtPrice ? 'var(--color-accent-crimson)' : 'var(--color-text-primary)'}}>
                  {formatPrice(parseFloat(price.amount) * 100)}
                </span>
              )}
            </div>
          </div>
        </Link>
        {fetcherData?.error && <p className="mt-2 text-body-small text-crimson">{fetcherData.error}</p>}
      </article>
    </motion.div>
  );
}
