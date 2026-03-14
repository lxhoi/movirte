import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
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
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "MOVIRTE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfairDisplay.variable}>
      <body>{children}</body>
    </html>
  );
}
