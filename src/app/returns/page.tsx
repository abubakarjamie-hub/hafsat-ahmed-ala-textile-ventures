import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns Policy",
  description:
    "Returns and exchange policy for Hafsat Ahmed Ala Textile Ventures.",
};

export default function ReturnsPage() {
  return (
    <div className="container-page py-12 lg:py-16">
      <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-gold">
        CUSTOMER SERVICE
      </p>
      <h1 className="mb-6 text-3xl font-semibold text-navy">Returns Policy</h1>
      <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-gray-600">
        <p>
          We want you to be satisfied with every fabric purchase. If you receive
          a defective or incorrect item, please contact us within 7 days of
          delivery with clear photos of the issue.
        </p>
        <h3 className="text-base font-semibold text-navy">Eligible returns</h3>
        <p>
          Faulty fabrics, incorrect items, or significant quality issues not
          described on the product page may be eligible for replacement or
          another agreed resolution.
        </p>
        <h3 className="text-base font-semibold text-navy">Non-returnable items</h3>
        <p>
          Custom-cut fabrics, cleared sale items, and products altered after
          delivery may not be eligible for return unless they are faulty.
        </p>
        <h3 className="text-base font-semibold text-navy">How to start a return</h3>
        <p>
          Contact our customer service team with your order number, product
          details, and photos. We will guide you through the next steps.
        </p>
      </div>
      <Link href="/contact" className="mt-10 inline-block text-sm font-medium text-navy underline">
        Contact customer service →
      </Link>
    </div>
  );
}
