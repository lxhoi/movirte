import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import LenisProvider from "@/components/LenisProvider/LenisProvider";
import LayoutShell from "@/components/LayoutShell/LayoutShell";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://movirte.com"),
  title: {
    default: "MOVIRTE — British Luxury Fashion",
    template: "%s — MOVIRTE",
  },
  description:
    "Discover quiet luxury fashion from London. Hoodies, tees, trousers, and accessories crafted with meticulous attention to detail.",
  keywords: [
    "MOVIRTE",
    "luxury fashion",
    "British style",
    "London fashion",
    "quiet luxury",
    "contemporary fashion",
    "handcrafted",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "MOVIRTE",
    title: "MOVIRTE — British Luxury Fashion",
    description: "Discover quiet luxury fashion from London. Hoodies, tees, trousers, and accessories crafted with meticulous attention to detail.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOVIRTE — British Luxury Fashion",
    description: "Discover quiet luxury fashion from London.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfairDisplay.variable}>
      <body>
        <CartProvider>
          <WishlistProvider>
            <LenisProvider>
              <LayoutShell>{children}</LayoutShell>
              <Footer />
            </LenisProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
