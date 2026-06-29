import Link from 'next/link';
import Image from 'next/image';

const trendingProducts = [
  { id: 1, name: 'Nargis Square Neck Kurti', price: 899, originalPrice: 1199, slug: 'nargis-square-neck-kurti' },
  { id: 2, name: 'Leher Straight Sleeves Kurti', price: 749, originalPrice: 1199, slug: 'leher-straight-sleeves-kurti' },
  { id: 3, name: 'Anaya Floral Print Kurti', price: 849, originalPrice: 1099, slug: 'anaya-floral-kurti' },
  { id: 4, name: 'Meera Embroidered Kurti', price: 999, originalPrice: 1399, slug: 'meera-embroidered-kurti' },
  { id: 5, name: 'Priya Cotton Kurti', price: 699, originalPrice: 999, slug: 'priya-cotton-kurti' },
  { id: 6, name: 'Kavya Kantha Kurti', price: 1099, originalPrice: 1499, slug: 'kavya-kantha-kurti' },
];

export default function TrendingNow() {
  return (
    <section className="py-14 bg-background overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Trending Now
            </h2>
            <p className="text-on-surface-variant text-sm mt-1">
              Fresh styles just added – explore the latest trends in ethnic fashion.
            </p>
          </div>
          <Link
            href="/new-arrivals"
            className="hidden sm:inline-block text-sm text-primary font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Horizontal scroll carousel */}
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x snap-mandatory">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="flex-none w-44 sm:w-52 snap-start glass-card rounded-xl overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] bg-muted">
                <Image
                  src="/assets/images/product-img-02.jpg"
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details */}
              <div className="p-3">
                <h3 className="text-xs font-medium text-foreground line-clamp-2 mb-1.5">
                  <Link href={`/product/${product.slug}`} className="hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary text-sm">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-on-surface-variant text-xs line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: View All button */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/new-arrivals"
            className="text-sm text-primary font-semibold hover:underline"
          >
            View All Trending →
          </Link>
        </div>
      </div>
    </section>
  );
}
