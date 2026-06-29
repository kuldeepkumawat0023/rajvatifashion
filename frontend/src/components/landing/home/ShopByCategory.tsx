'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/shop/ProductCard';

type Tab = 'all' | 'bestsellers' | 'newarrivals' | 'sale';

// Placeholder products — will be replaced with API data
const demoProducts = [
  { id: 1, name: 'Nargis Square Neck Kurti', price: 899, originalPrice: 1199, badge: 'New In', slug: 'nargis-square-neck-kurti', img: null },
  { id: 2, name: 'Leher Straight Sleeves Kurti', price: 749, originalPrice: 1199, badge: 'New In', slug: 'leher-straight-sleeves-kurti', img: null },
  { id: 3, name: 'Anaya Floral Print Kurti', price: 849, originalPrice: 1099, badge: 'Sale', slug: 'anaya-floral-print-kurti', img: null },
  { id: 4, name: 'Meera Embroidered Kurti', price: 999, originalPrice: 1399, badge: 'Best Seller', slug: 'meera-embroidered-kurti', img: null },
  { id: 5, name: 'Priya Cotton Kurti', price: 699, originalPrice: 999, badge: 'New In', slug: 'priya-cotton-kurti', img: null },
  { id: 6, name: 'Radha Block Print Kurti', price: 949, originalPrice: 1299, badge: 'Best Seller', slug: 'radha-block-print-kurti', img: null },
  { id: 7, name: 'Kavya Kantha Kurti', price: 1099, originalPrice: 1499, badge: 'New In', slug: 'kavya-kantha-kurti', img: null },
  { id: 8, name: 'Sita Solid Kurti', price: 649, originalPrice: 899, badge: 'Sale', slug: 'sita-solid-kurti', img: null },
];

const tabs: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'bestsellers', label: 'Best Sellers' },
  { key: 'newarrivals', label: 'New Arrivals' },
  { key: 'sale', label: 'Sale' },
];

const getBadgeClass = (badge: string) => {
  if (badge === 'Sale') return 'bg-destructive text-destructive-foreground';
  if (badge === 'Best Seller') return 'bg-accent text-secondary';
  return 'bg-primary text-on-primary';
};

export default function ShopByCategory() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredProducts = demoProducts.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'bestsellers') return p.badge === 'Best Seller';
    if (activeTab === 'newarrivals') return p.badge === 'New In';
    if (activeTab === 'sale') return p.badge === 'Sale';
    return true;
  });

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const discount = (original: number, sale: number) =>
    Math.round(((original - sale) / original) * 100);

  return (
    <section className="py-14 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Shop By Category
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? tab.key === 'sale'
                    ? 'bg-destructive text-destructive-foreground shadow-md'
                    : 'bg-primary text-on-primary shadow-md'
                  : 'bg-muted text-on-surface-variant hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {tab.label}
              {tab.key === 'sale' && activeTab !== 'sale' && (
                <span className="ml-1.5 text-destructive font-bold">🔥</span>
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/shop"
            className="gradient-button px-10 py-3 rounded-full font-semibold text-sm tracking-wide hover:shadow-lg transition-all"
          >
            Shop Now
          </Link>
          <Link
            href="/shop"
            className="px-10 py-3 rounded-full font-semibold text-sm tracking-wide border-2 border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-all"
          >
            All Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
