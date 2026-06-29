import AnnouncementBar from '@/components/landing/layout/AnnouncementBar';
import Header from '@/components/landing/layout/Header';
import Footer from '@/components/landing/layout/Footer';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1 bg-background">{children}</main>
      <Footer />
    </>
  );
}
