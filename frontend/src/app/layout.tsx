import type { Viewport, Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/provider/AppProviders";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: 'Rajvati Fashion — Elegance That Never Goes Out of Style',
    template: '%s | Rajvati Fashion',
  },
  description: 'Shop the finest cotton kurtis, co-ord sets, and ethnic wear. Free shipping above ₹1299. COD available. Made in India.',
  keywords: ['cotton kurtis', 'ethnic wear', 'women fashion', 'rajvati', 'kuchaman', 'rajasthan'],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg text-text font-body antialiased flex flex-col" suppressHydrationWarning>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
