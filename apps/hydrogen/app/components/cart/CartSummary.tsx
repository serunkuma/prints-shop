import {formatPrice} from '~/lib/format';

interface CartSummaryProps {
  cost: any;
  checkoutUrl: string;
}

export function CartSummary({cost, checkoutUrl}: CartSummaryProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">Subtotal</span>
        <span className="text-sm font-semibold text-text-primary">
          {cost?.subtotalAmount && formatPrice(parseFloat(cost.subtotalAmount.amount) * 100)}
        </span>
      </div>
      <p className="mt-2 text-xs text-text-muted">Shipping and taxes are calculated at checkout.</p>
      <a
        href={checkoutUrl}
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-gold text-sm font-semibold uppercase tracking-wider text-void transition-opacity hover:opacity-90"
      >
        Checkout
      </a>
    </div>
  );
}
