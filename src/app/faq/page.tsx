import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "FAQs about ordering fabrics from Hafsat Ahmed Ala Textile Ventures.",
};

const faqs = [
  {
    q: "What fabrics do you sell?",
    a: "We offer premium Ankara wax prints, luxury lace, brocade, silk blends, and traditional Hausa-inspired textiles.",
  },
  {
    q: "How is fabric sold?",
    a: "Most fabrics are sold by the yard (or multi-yard bundles). Available quantities are shown on each product page.",
  },
  {
    q: "Do you deliver nationwide in Nigeria?",
    a: "Delivery options are available for Nigerian customers. Timelines and fees depend on your location.",
  },
  {
    q: "Which payment methods are supported?",
    a: "Checkout is prepared for Nigerian payment providers such as Paystack or Flutterwave. Live payments require gateway credentials to be configured.",
  },
  {
    q: "Can I return a fabric?",
    a: "Defective or incorrect items can be reported within 7 days of delivery. See our Returns Policy for full details.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-page py-12 lg:py-16">
      <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-gold">
        CUSTOMER SERVICE
      </p>
      <h1 className="mb-8 text-3xl font-semibold text-navy">
        Frequently Asked Questions
      </h1>
      <div className="mx-auto max-w-2xl divide-y divide-gray-100 rounded-2xl border border-gray-100">
        {faqs.map((item) => (
          <details key={item.q} className="group p-5">
            <summary className="cursor-pointer list-none text-sm font-semibold text-navy marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {item.q}
                <span className="text-gray-400 transition group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-500">
        Still need help?{" "}
        <Link href="/contact" className="font-medium text-navy underline">
          Contact us
        </Link>
      </p>
    </div>
  );
}
