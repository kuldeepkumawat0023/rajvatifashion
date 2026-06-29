import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Best Sellers', href: '/best-sellers' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Co-Ord Sets', href: '/co-ord-sets' },
  { label: 'Solid Essentials', href: '/solid-essentials' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Track Order', href: '/track-order' },
];

const categories = [
  { label: 'All Products', href: '/shop' },
  { label: 'Best Sellers', href: '/best-sellers' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Co-Ord Sets', href: '/co-ord-sets' },
  { label: 'Solid Essentials', href: '/solid-essentials' },
  { label: 'Sale', href: '/sale' },
];

const legalLinks = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Return Policy', href: '/returns' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-on-secondary">
      {/* ── CTA Banner ── */}
      <div className="bg-primary py-8 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-on-primary mb-1">
          Find Your Perfect Kurti Today
        </h2>
        <p className="text-on-primary/70 text-sm mb-4">
          Elegance that never goes out of style
        </p>
        <Link
          href="/shop"
          className="inline-block bg-accent text-secondary font-semibold px-8 py-2.5 rounded-full text-sm hover:bg-accent/90 transition-colors"
        >
          Shop Collection
        </Link>
      </div>

      {/* ── Main Footer ── */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1: Brand + Contact */}
          <div className="space-y-4">
            <div className="font-heading font-bold text-2xl text-accent">RAJVATI</div>
            <p className="text-on-secondary/60 text-sm leading-relaxed">
              Discover beautifully crafted kurtis that bring tradition and modern
              fashion together. 100% Cotton. Made in India.
            </p>
            <div className="space-y-2 text-sm text-on-secondary/70">
              <div className="flex items-start gap-2">
                <Phone size={14} className="text-accent mt-0.5 flex-shrink-0" />
                <a href="tel:+919116415082" className="hover:text-accent transition-colors">
                  +91 91164-15082
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-accent mt-0.5 flex-shrink-0" />
                <span>Kuchaman City, Near BSNL Office,<br />Rajasthan — 341508</span>
              </div>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/rajvatifashion"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-secondary transition-all"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-secondary transition-all"
                aria-label="Facebook"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-secondary transition-all"
                aria-label="Twitter"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-accent mb-4 uppercase tracking-wider text-xs">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-on-secondary/60 hover:text-accent transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-accent/40">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="font-semibold text-accent mb-4 uppercase tracking-wider text-xs">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-on-secondary/60 hover:text-accent transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-accent/40">›</span>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-semibold text-accent mb-4 uppercase tracking-wider text-xs">
              Newsletter
            </h3>
            <p className="text-sm text-on-secondary/60 mb-4">
              Subscribe to get 10% OFF on your first order & exclusive updates!
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-on-secondary placeholder:text-on-secondary/40 text-sm focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="button"
                className="w-full gradient-button py-2.5 rounded-lg text-sm font-semibold"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-on-secondary/40 mt-2">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* ── Copyright Bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-on-secondary/50">
            © {new Date().getFullYear()} RAJVATI Fashion. All Rights Reserved.
            <span className="ml-2 text-on-secondary/30">GSTIN: 08GWEPP2534N1ZZ</span>
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-on-secondary/50 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
