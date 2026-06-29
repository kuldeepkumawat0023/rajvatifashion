import AnnouncementBar from '@/components/landing/layout/AnnouncementBar';
import Header from '@/components/landing/layout/Header';
import Footer from '@/components/landing/layout/Footer';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
