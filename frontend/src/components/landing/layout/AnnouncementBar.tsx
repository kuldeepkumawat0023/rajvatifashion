'use client';

import { useState } from 'react';

const messages = [
  'Free Shipping Above ₹1299',
  'COD Available on All Orders',
  'Made in India 🇮🇳',
  'Return & Exchange within 7 Days',
];

export default function AnnouncementBar() {

  return (
    <div className="bg-primary text-on-primary text-xs sm:text-sm py-2 relative overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-scroll">
        <div className="flex gap-16 pr-16 items-center">
          {messages.map((msg, i) => (
            <span key={`first-${i}`} className="flex items-center gap-2 font-medium tracking-wide">
              <span className="text-accent">✦</span>
              {msg}
            </span>
          ))}
        </div>
        {/* Duplicate for seamless looping */}
        <div className="flex gap-16 pr-16 items-center">
          {messages.map((msg, i) => (
            <span key={`second-${i}`} className="flex items-center gap-2 font-medium tracking-wide">
              <span className="text-accent">✦</span>
              {msg}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
