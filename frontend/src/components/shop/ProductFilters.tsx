'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const categories = ['All', 'Kurtis', 'Co-ord Sets', 'Suit Sets', 'Dresses'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductFilters() {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    size: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-full bg-surface p-5 rounded-xl border border-border">
      <h3 className="font-heading font-bold text-lg text-foreground mb-6">
        Filters
      </h3>

      {/* Categories */}
      <div className="mb-6 pb-6 border-b border-border">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full font-semibold text-sm text-foreground mb-4"
        >
          Categories
          {openSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.categories && (
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4 rounded border border-border bg-white group-hover:border-primary transition-colors">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="absolute inset-0 bg-primary rounded opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-border">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full font-semibold text-sm text-foreground mb-4"
        >
          Price Range
          {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.price && (
          <div className="space-y-4 px-1">
            <input
              type="range"
              min="0"
              max="5000"
              className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium">
              <span>₹0</span>
              <span>₹5,000+</span>
            </div>
          </div>
        )}
      </div>

      {/* Size */}
      <div>
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full font-semibold text-sm text-foreground mb-4"
        >
          Size
          {openSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSections.size && (
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <label key={size} className="cursor-pointer">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-10 h-10 flex items-center justify-center border border-border rounded-lg text-sm font-medium text-on-surface-variant peer-checked:bg-primary peer-checked:text-on-primary peer-checked:border-primary hover:border-primary transition-colors">
                  {size}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
