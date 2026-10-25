import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hafsat Ahmed Ala Textile Ventures | Premium Fabrics",
    template: "%s | Hafsat Ahmed Ala Textile Ventures",
  },
  description:
    "Premium quality fabrics for elegant style and endless possibilities. Shop Ankara, lace, brocade, and traditional Hausa textiles.",
  keywords: [
    "Ankara fabric",
    "lace fabric Nigeria",
    "brocade",
    "Hausa fabric",
    "textile ventures",
    "Hafsat Ahmed Ala",
  ],
  openGraph: {
    title: "Hafsat Ahmed Ala Textile Ventures",
    description:
      "Quality Fabrics · Elegant Style · Endless Possibilities. Premium textiles for traditional and contemporary fashion.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-ink antialiased">
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
