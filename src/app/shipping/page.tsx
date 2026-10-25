import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping Information",
  description:
    "Delivery information for Hafsat Ahmed Ala Textile Ventures customers across Nigeria.",
};

export default function ShippingPage() {
  return (
    <PolicyLayout title="Shipping Information">
      <p>
        We offer reliable delivery options for customers across Nigeria. Orders
        are typically processed within 1–2 business days after confirmation.
      </p>
      <h3>Delivery timelines</h3>
      <p>
        Delivery times vary by city and courier availability. Estimated timelines
        will be shared at checkout and may be confirmed via phone or WhatsApp.
      </p>
      <h3>Shipping fees</h3>
      <p>
        Shipping fees depend on destination and order size. Orders above ₦50,000
        may qualify for free standard shipping where available.
      </p>
      <h3>Order tracking</h3>
      <p>
        Once your package is dispatched, tracking or courier details will be
        shared where supported by the delivery partner.
      </p>
    </PolicyLayout>
  );
}

function PolicyLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-page py-12 lg:py-16">
      <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-gold">
        CUSTOMER SERVICE
      </p>
      <h1 className="mb-6 text-3xl font-semibold text-navy">{title}</h1>
      <div className="prose-sm max-w-2xl space-y-4 text-sm leading-relaxed text-gray-600 [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-navy">
        {children}
      </div>
      <Link href="/contact" className="mt-10 inline-block text-sm font-medium text-navy underline">
        Contact us with questions →
      </Link>
    </div>
  );
}
