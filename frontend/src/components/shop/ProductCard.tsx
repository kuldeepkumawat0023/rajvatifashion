import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    badge?: string;
    slug: string;
    img?: string | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [inWishlist, setInWishlist] = useState(false);

  const getBadgeVariant = (badge: string) => {
    if (badge === 'Sale') return 'destructive';
    if (badge === 'Best Seller') return 'accent';
    return 'primary';
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="glass-card rounded-xl overflow-hidden group flex flex-col h-full">
      {/* Product Image */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden flex-shrink-0">
        <Image
          src={product.img || '/assets/images/product-img-01.jpg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <Badge
            variant={getBadgeVariant(product.badge)}
            className="absolute top-2 left-2"
          >
            {product.badge}
          </Badge>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <Badge variant="accent" className="absolute top-2 right-2">
            -{discount}%
          </Badge>
        )}

        {/* Hover overlay: Add to Cart */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
          <Button className="w-full gap-2">
            <ShoppingCart size={15} />
            Add to Cart
          </Button>
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setInWishlist(!inWishlist);
          }}
          className="absolute top-8 right-2 mt-6 w-7 h-7 bg-surface/90 rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
          aria-label="Add to wishlist"
        >
          <Heart
            size={14}
            className={
              inWishlist ? 'fill-primary text-primary' : 'text-on-surface-variant'
            }
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-3 flex flex-col flex-grow justify-between">
        <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-2">
          <Link
            href={`/product/${product.slug}`}
            className="hover:text-primary transition-colors"
          >
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2 mt-auto">
          <span className="font-bold text-primary text-sm">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-on-surface-variant text-xs line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
