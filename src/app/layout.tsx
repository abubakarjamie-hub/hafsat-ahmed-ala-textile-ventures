import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hafsat Ahmed Ala Textile Ventures | Premium Fabrics",
  description:
    "Discover thoughtfully selected Ankara, lace, brocade, and heritage textiles from Hafsat Ahmed Ala Textile Ventures.",
  applicationName: "Hafsat Ahmed Ala Textile Ventures",
  openGraph: {
    title: "Hafsat Ahmed Ala Textile Ventures",
    description: "Quality fabrics. Elegant style. Endless possibilities.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-[#111111] antialiased">{children}</body>
    </html>
  );
}
