'use client';

import { useState } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import ProductFilters from '@/components/shop/ProductFilters';
import SortBar from '@/components/shop/SortBar';
import { X } from 'lucide-react';

// Placeholder data
const shopProducts = [
  { id: 1, name: 'Nargis Square Neck Kurti', price: 899, originalPrice: 1199, badge: 'New In', slug: 'nargis-square-neck-kurti' },
  { id: 2, name: 'Leher Straight Sleeves Kurti', price: 749, originalPrice: 1199, badge: 'New In', slug: 'leher-straight-sleeves-kurti' },
  { id: 3, name: 'Anaya Floral Print Kurti', price: 849, originalPrice: 1099, badge: 'Sale', slug: 'anaya-floral-print-kurti' },
  { id: 4, name: 'Meera Embroidered Kurti', price: 999, originalPrice: 1399, badge: 'Best Seller', slug: 'meera-embroidered-kurti' },
  { id: 5, name: 'Priya Cotton Kurti', price: 699, originalPrice: 999, badge: 'New In', slug: 'priya-cotton-kurti' },
  { id: 6, name: 'Radha Block Print Kurti', price: 949, originalPrice: 1299, badge: 'Best Seller', slug: 'radha-block-print-kurti' },
  { id: 7, name: 'Kavya Kantha Kurti', price: 1099, originalPrice: 1499, badge: 'New In', slug: 'kavya-kantha-kurti' },
  { id: 8, name: 'Sita Solid Kurti', price: 649, originalPrice: 899, badge: 'Sale', slug: 'sita-solid-kurti' },
  { id: 9, name: 'Gopi Designer Kurti', price: 1299, originalPrice: 1899, badge: 'Exclusive', slug: 'gopi-designer-kurti' },
];

export default function ShopPage() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb (Simplified) */}
      <div className="text-sm text-on-surface-variant mb-6">
        Home <span className="mx-2">/</span> <span className="text-foreground font-medium">All Products</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-24">
            <ProductFilters />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Banner (Optional for category pages) */}
          <div className="w-full bg-primary/5 rounded-2xl p-8 mb-8 border border-primary/10 flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-primary mb-2">
                All Collection
              </h1>
              <p className="text-on-surface-variant max-w-md">
                Discover our complete range of ethnic and modern kurtis crafted with care for your everyday style.
              </p>
            </div>
            <div className="hidden md:block text-6xl opacity-50">✨</div>
          </div>

          <SortBar
            totalResults={shopProducts.length}
            onMobileFilterClick={() => setMobileFilterOpen(true)}
          />

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {shopProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-on-surface-variant hover:bg-muted disabled:opacity-50" disabled>
                &larr;
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-medium shadow-md">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
                3
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
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
