'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface SortBarProps {
  totalResults: number;
  onMobileFilterClick: () => void;
}

export default function SortBar({ totalResults, onMobileFilterClick }: SortBarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('Featured');

  const sortOptions = [
    'Featured',
    'Best Selling',
    'Price: Low to High',
    'Price: High to Low',
    'Newest Arrivals',
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-border mb-6">
      {/* Results Count */}
      <div className="text-sm text-on-surface-variant font-medium">
        Showing <span className="text-foreground font-semibold">{totalResults}</span> results
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        {/* Mobile Filter Button */}
        <button
          onClick={onMobileFilterClick}
          className="lg:hidden flex items-center gap-2 text-sm font-medium border border-border px-4 py-2 rounded-lg hover:bg-muted"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 text-sm font-medium border border-border px-4 py-2 rounded-lg hover:bg-muted min-w-[160px] justify-between"
          >
            <span className="text-on-surface-variant">Sort by:</span> {activeSort}
            <svg
              className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {sortOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setSortOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-lg z-20 py-2">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setActiveSort(option);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                      activeSort === option ? 'text-primary font-semibold' : 'text-foreground'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
