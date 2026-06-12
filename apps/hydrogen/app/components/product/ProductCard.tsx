import {Link} from 'react-router';
import {formatPrice} from '~/lib/format';

interface ProductCardProps {
  product: any;
}

export function ProductCard({product}: ProductCardProps) {
  return (
    <Link to={`/products/${product.handle}`} className="group">
      <div className="aspect-[3/4] bg-surface-mid rounded-xs overflow-hidden mb-4">
        {product.featuredImage && (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={product.featuredImage.width || 600}
            height={product.featuredImage.height || 800}
          />
        )}
      </div>
      <h3 className="text-h4 mb-1">{product.title}</h3>
      {product.priceRange?.minVariantPrice && (
        <p className="text-price text-gold">
          {formatPrice(parseFloat(product.priceRange.minVariantPrice.amount) * 100)}
        </p>
      )}
    </Link>
  );
}
