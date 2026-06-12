import {useFetcher} from 'react-router';
import {formatPrice} from '~/lib/format';

interface CartItemProps {
  line: any;
}

export function CartItem({line}: CartItemProps) {
  const fetcher = useFetcher();
  const product = line.merchandise?.product;
  const options = line.merchandise?.selectedOptions || [];

  return (
    <div className="flex gap-4 py-4 border-b border-border">
      {product?.featuredImage && (
        <div className="w-20 h-20 bg-surface-mid rounded-xs overflow-hidden flex-shrink-0">
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            className="w-full h-full object-cover"
            width={80}
            height={80}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <a href={`/products/${product.handle}`} className="text-body font-medium hover:text-gold transition-colors line-clamp-1">
          {product.title}
        </a>
        <p className="text-body-small text-text-muted">
          {options.map((o: any) => o.value).join(' / ')}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <fetcher.Form method="post" action="/cart">
            <input type="hidden" name="intent" value="update" />
            <input type="hidden" name="lineId" value={line.id} />
            <input
              type="number"
              name="quantity"
              defaultValue={line.quantity}
              min="0"
              className="w-16 px-2 py-1 bg-surface-mid border border-border rounded-xs text-body-small text-center"
              onChange={(e) => {
                if (parseInt(e.target.value) === 0) {
                  fetcher.submit({intent: 'remove', lineId: line.id}, {method: 'post', action: '/cart'});
                } else {
                  fetcher.submit(e.target.form, {method: 'post'});
                }
              }}
            />
          </fetcher.Form>
          <fetcher.Form method="post" action="/cart">
            <input type="hidden" name="intent" value="remove" />
            <input type="hidden" name="lineId" value={line.id} />
            <button type="submit" className="text-body-small text-text-muted hover:text-crimson transition-colors">
              Remove
            </button>
          </fetcher.Form>
        </div>
      </div>
      <div className="text-price flex-shrink-0">
        {formatPrice(parseFloat(line.merchandise.price.amount) * 100)}
      </div>
    </div>
  );
}
