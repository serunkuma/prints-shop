import {formatPrice} from '~/lib/format';

interface CartSummaryProps {
  cost: any;
  checkoutUrl: string;
}

export function CartSummary({cost, checkoutUrl}: CartSummaryProps) {
  return (
    <div className="border-t border-border pt-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-h4">Subtotal</span>
        <span className="text-price text-gold">
          {cost?.subtotalAmount && formatPrice(parseFloat(cost.subtotalAmount.amount) * 100)}
        </span>
      </div>
      <p className="text-body-small text-text-muted mb-4">Shipping &amp; taxes calculated at checkout.</p>
      <a
        href={checkoutUrl}
        className="inline-block w-full text-center py-4 px-8 bg-gold text-void text-button rounded-xs font-medium hover:opacity-90 transition-opacity"
      >
        Checkout
      </a>
    </div>
  );
}
