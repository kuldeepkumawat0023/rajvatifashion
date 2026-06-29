import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 0 to 5
  max?: number;
  size?: number;
}

export function StarRating({ rating, max = 5, size = 14 }: StarRatingProps) {
  // 🐴 ponytail: direct array mapping, no complex math or half-star SVG logic for now
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.floor(rating)
              ? 'fill-accent text-accent'
              : 'fill-border text-border'
          }
        />
      ))}
    </div>
  );
}
