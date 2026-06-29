'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search, ShoppingCart, User, ChevronDown,
  Heart, X, Menu, Sun, Moon
} from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Best Sellers', href: '/best-sellers' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Co-Ord Sets', href: '/co-ord-sets' },
  { label: 'Solid Essentials', href: '/solid-essentials' },
  { label: 'Categories', href: '/shop', hasDropdown: true },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);

    // Sync theme state with DOM on mount
    if (typeof document !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      setTheme('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Cart count (placeholder — will be replaced with Zustand store)
  const cartCount = 0;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'shadow-lg' : ''
          } glass-navbar`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-6 lg:gap-10">

          {/* Left: Logo */}
          <div className="w-[140px] sm:w-[200px] flex-shrink-0 flex items-center">
            <Link href="/" className="block w-full">
              <Image
                src="/assets/images/logo.png"
                alt="Rajvati Logo"
                width={200}
                height={80}
                className="w-full h-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right Side (Desktop & Mobile combined layout logic) */}
          <div className="flex-1 flex flex-col justify-center w-full">

            {/* ── TOP ROW: GSTIN + Phone + Search + Icons ── */}
            <div className="lg:border-b lg:border-border lg:pb-3 lg:mb-3 flex items-center justify-between gap-4">

              {/* Center: GSTIN + Phone (Desktop Only) */}
              <div className="hidden lg:flex items-center gap-6 text-xs text-on-surface-variant font-medium">
                <span><strong className="text-foreground">GSTIN</strong>: 08GWEPP2534N1ZZ</span>
                <span>
                  Call Us:{' '}
                  <a href="tel:+919116415082" className="text-primary hover:underline font-semibold">
                    +91 91164-15082
                  </a>
                </span>
              </div>

              {/* Right: Search + Wishlist + Account + Theme + Cart (Push to end on mobile) */}
              <div className="flex flex-1 lg:flex-none items-center justify-end gap-1 sm:gap-3">
                {/* Search */}
                <div className="relative">
                  {searchOpen ? (
                    <div className="flex items-center gap-2 glass-input rounded-full px-3 py-1.5 w-48 sm:w-64">
                      <Search size={16} className="text-on-surface-variant flex-shrink-0" />
                      <input
                        ref={searchRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search kurtis..."
                        className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-on-surface-variant"
                      />
                      <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
                        <X size={14} className="text-on-surface-variant hover:text-foreground" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSearchOpen(true)}
                      className="p-2 rounded-full hover:bg-muted transition-colors"
                      aria-label="Search"
                    >
                      <Search size={20} className="text-foreground" />
                    </button>
                  )}
                </div>

                {/* Wishlist */}
                <Link href="/wishlist" className="p-2 rounded-full hover:bg-muted transition-colors hidden sm:flex" aria-label="Wishlist">
                  <Heart size={20} className="text-foreground" />
                </Link>

                {/* Account */}
                <Link href="/account" className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="My Account">
                  <User size={20} className="text-foreground" />
                </Link>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-muted transition-colors hidden sm:flex items-center justify-center"
                  aria-label="Toggle Dark Mode"
                >
                  {theme === 'dark' 
                    ? <Sun size={20} className="text-accent" />  
                    : <Moon size={20} className="text-primary" />
                  }
                </button>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label={`Cart (${cartCount} items)`}
                >
                  <ShoppingCart size={20} className="text-foreground" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-on-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>

                {/* Mobile hamburger */}
                <button
                  className="lg:hidden p-2 rounded-full hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu size={22} className="text-foreground" />
                </button>
              </div>
            </div>

            {/* ── BOTTOM ROW: Navigation Links (Desktop Only) ── */}
            <div className="hidden lg:flex items-center justify-between">
              <nav className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md hover:bg-muted transition-all duration-200"
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown size={14} className="opacity-60" />}
                  </Link>
                ))}
              </nav>

              {/* Shop Now CTA */}
              <Link
                href="/shop"
                className="gradient-button px-5 py-1.5 rounded-full text-sm font-semibold hover:shadow-md transition-all duration-200"
              >
                Shop Now
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-72 bg-surface shadow-2xl flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Image
                src="/assets/images/logo.png"
                alt="Rajvati Logo"
                width={120}
                height={32}
                className="h-7 w-auto object-contain"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bottom info */}
            <div className="p-4 border-t border-border space-y-2 text-xs text-on-surface-variant">
              <p><strong>GSTIN</strong>: 08GWEPP2534N1ZZ</p>
              <p>📞 <a href="tel:+919116415082" className="text-primary">+91 91164-15082</a></p>
              <p>📍 Kuchaman City, Rajasthan</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
