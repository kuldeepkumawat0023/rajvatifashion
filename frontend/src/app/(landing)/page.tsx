import type { Metadata } from 'next';
import HeroSection from '@/components/landing/home/HeroSection';
import ShopByCategory from '@/components/landing/home/ShopByCategory';
import TrendingNow from '@/components/landing/home/TrendingNow';
import WhyChooseUs from '@/components/landing/home/WhyChooseUs';
import Testimonials from '@/components/landing/home/Testimonials';
import InstagramFeed from '@/components/landing/home/InstagramFeed';
import Newsletter from '@/components/landing/home/Newsletter';

export const metadata: Metadata = {
  title: 'Rajvati Fashion — Elegance That Never Goes Out of Style',
  description:
    'Shop the finest cotton kurtis, co-ord sets, and ethnic wear. Free shipping above ₹1299. COD available. Made in India. GSTIN: 08GWEPP2534N1ZZ',
  keywords: [
    'cotton kurtis', 'ethnic wear', 'women fashion', 'rajvati',
    'kuchaman', 'rajasthan', 'co-ord sets', 'kurti online',
  ],
  openGraph: {
    title: 'Rajvati Fashion — Cotton Kurtis & Ethnic Wear',
    description: 'Discover beautifully crafted kurtis that bring tradition and modern fashion together.',
    url: 'https://rajvatifashion.com',
    siteName: 'Rajvati Fashion',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. Why Choose Us (Features Bar) */}
      <WhyChooseUs />

      {/* 3. Shop By Category with Filter Tabs */}
      <ShopByCategory />

      {/* 4. Trending Now Carousel */}
      <TrendingNow />

      {/* 5. Testimonials */}
      <Testimonials />

      {/* 6. Instagram Feed */}
      <InstagramFeed />

      {/* 7. Newsletter */}
      <Newsletter />
    </>
  );
}
