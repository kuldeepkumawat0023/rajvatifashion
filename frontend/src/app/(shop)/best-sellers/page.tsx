'use client';

import { useState } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import ProductFilters from '@/components/shop/ProductFilters';
import SortBar from '@/components/shop/SortBar';
import { X } from 'lucide-react';

const bestSellers = [
  { id: 4, name: 'Meera Embroidered Kurti', price: 999, originalPrice: 1399, badge: 'Best Seller', slug: 'meera-embroidered-kurti' },
  { id: 6, name: 'Radha Block Print Kurti', price: 949, originalPrice: 1299, badge: 'Best Seller', slug: 'radha-block-print-kurti' },
  { id: 10, name: 'Gopi Designer Kurti', price: 1299, originalPrice: 1899, badge: 'Best Seller', slug: 'gopi-designer-kurti' },
];

export default function BestSellersPage() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
      <div className="text-sm text-on-surface-variant mb-6">
        Home <span className="mx-2">/</span> <span className="text-foreground font-medium">Best Sellers</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-24">
            <ProductFilters />
          </div>
        </aside>

        <div className="flex-1">
          <div className="w-full bg-accent/10 rounded-2xl p-8 mb-8 border border-accent/20 flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-accent mb-2">
                Best Sellers
              </h1>
              <p className="text-on-surface-variant max-w-md">
                Our most loved styles, handpicked for you. Shop the trends everyone is talking about.
              </p>
            </div>
            <div className="hidden md:block text-6xl opacity-50">🏆</div>
          </div>

          <SortBar
            totalResults={bestSellers.length}
            onMobileFilterClick={() => setMobileFilterOpen(true)}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-80 bg-surface shadow-2xl flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border bg-surface sticky top-0 z-10">
              <h2 className="font-heading font-bold text-lg text-foreground">Filters</h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 hover:bg-muted rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <ProductFilters />
            </div>
            <div className="p-4 border-t border-border bg-surface sticky bottom-0">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full gradient-button py-3 rounded-xl font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
