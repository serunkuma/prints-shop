import {useFetcher} from 'react-router';
import {motion} from 'framer-motion';
import {Minus, Plus} from 'lucide-react';
import {formatPrice} from '~/lib/format';

interface CartItemProps {
  line: any;
}

export function CartItem({line}: CartItemProps) {
  const fetcher = useFetcher();
  const product = line.merchandise?.product;
  const options = line.merchandise?.selectedOptions || [];

  const updateQuantity = (quantity: number) => {
    if (quantity <= 0) {
      fetcher.submit({intent: 'remove', lineId: line.id}, {method: 'post', action: '/cart'});
      return;
    }
    fetcher.submit({intent: 'update', lineId: line.id, quantity: String(quantity)}, {method: 'post', action: '/cart'});
  };

  return (
    <motion.div
      layout
      initial={{opacity: 0, x: 40}}
      animate={{opacity: 1, x: 0}}
      exit={{opacity: 0, scale: 0.96}}
      transition={{duration: 0.28, ease: [0.22, 1, 0.36, 1]}}
      className="grid grid-cols-[64px_1fr] gap-4 border-b border-[var(--border-token)] py-4"
    >
      {product?.featuredImage && (
        <img
          src={product.featuredImage.url}
          alt={product.featuredImage.altText || product.title}
          className="h-16 w-16 rounded-sm object-cover"
          width={64}
          height={64}
        />
      )}
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <a href={`/products/${product.handle}`} className="truncate font-display text-lg leading-none text-text-primary">
              {product.title}
            </a>
            <p className="mt-1 text-xs uppercase tracking-widest text-text-secondary">Kumachi Prints</p>
            <p className="mt-1 text-xs text-text-muted">{options.map((o: any) => o.value).join(' / ')}</p>
          </div>
          <p className="shrink-0 text-sm font-medium text-text-primary">
            {formatPrice(parseFloat(line.merchandise.price.amount) * 100 * line.quantity)}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex h-8 items-center border border-[var(--border-mid)] bg-surface-mid">
            <button type="button" aria-label="Decrease quantity" className="flex h-8 w-8 items-center justify-center text-text-primary" onClick={() => updateQuantity(line.quantity - 1)}>
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm text-text-primary">{line.quantity}</span>
            <button type="button" aria-label="Increase quantity" className="flex h-8 w-8 items-center justify-center text-text-primary" onClick={() => updateQuantity(line.quantity + 1)}>
              <Plus size={14} />
            </button>
          </div>
          <button type="button" onClick={() => updateQuantity(0)} className="min-h-8 px-2 text-xs font-medium text-text-muted hover:text-text-primary">
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
}
