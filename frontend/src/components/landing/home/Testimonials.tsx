'use client';

import { useState } from 'react';
import { Quote } from 'lucide-react';
import { StarRating } from '@/components/common/StarRating';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Jaipur, Rajasthan',
    rating: 5,
    review:
      'Amazing quality! The cotton fabric is so soft and comfortable. The design is exactly as shown in the photo. Will definitely order again from Rajvati!',
  },
  {
    id: 2,
    name: 'Meena Kumari',
    location: 'Delhi',
    rating: 5,
    review:
      'I ordered two kurtis and both fit perfectly. The stitching quality is excellent. Fast delivery and nicely packed. Highly recommend!',
  },
  {
    id: 3,
    name: 'Sunita Devi',
    location: 'Jodhpur, Rajasthan',
    rating: 4,
    review:
      'Beautiful ethnic wear at a very reasonable price. The colors are vibrant and don\'t fade after wash. Very happy with my purchase!',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-14 bg-surface">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            <StarRating rating={4.8} size={18} />
          </div>
          <p className="text-on-surface-variant text-sm">
            4.8/5 Based on 68+ Happy Customer Reviews
          </p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="glass-card rounded-2xl p-6 relative">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-primary/10">
                <Quote size={40} className="fill-current" />
              </div>

              <p className="text-on-surface-variant text-sm leading-relaxed mb-4 relative z-10">
                "{t.review}"
              </p>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                <StarRating rating={t.rating} />
              </div>

              {/* Reviewer info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-on-surface-variant">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="glass-card rounded-2xl p-6 relative">
            <div className="absolute top-4 right-4 text-primary/10">
              <Quote size={40} className="fill-current" />
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              "{testimonials[active].review}"
            </p>
            <div className="flex gap-0.5 mb-3">
              <StarRating rating={testimonials[active].rating} />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                {testimonials[active].name[0]}
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">{testimonials[active].name}</div>
                <div className="text-xs text-on-surface-variant">{testimonials[active].location}</div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === active ? 'bg-primary w-5' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
