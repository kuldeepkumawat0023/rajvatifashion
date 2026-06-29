'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: connect to email API
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-accent/10 pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail size={22} className="text-on-primary" />
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-on-primary mb-2">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-on-primary/70 text-sm mb-6">
          Get <span className="text-accent font-semibold">10% OFF</span> on your first order!
          Exclusive deals, new arrivals & sale alerts straight to your inbox.
        </p>

        {submitted ? (
          <div className="bg-white/10 rounded-2xl px-8 py-6 text-on-primary">
            <div className="text-3xl mb-2">🎉</div>
            <p className="font-semibold">You're subscribed!</p>
            <p className="text-sm text-on-primary/70 mt-1">
              Your 10% coupon code will be sent to your email shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 rounded-full bg-white/20 border border-white/30 text-on-primary placeholder:text-on-primary/50 text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-secondary font-semibold text-sm rounded-full hover:bg-accent/90 transition-all hover:shadow-lg whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
        )}

        <p className="text-on-primary/40 text-xs mt-4">
          No spam ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
