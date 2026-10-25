import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Hafsat Ahmed Ala Textile Ventures for fabric inquiries, orders, and customer support.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="container-page py-12 lg:py-16">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-gold">
          CUSTOMER SERVICE
        </p>
        <h1 className="mb-3 text-3xl font-semibold text-navy">Contact Us</h1>
        <p className="mb-10 max-w-xl text-sm text-gray-600">
          We would love to hear from you. Reach out using the placeholders below
          once your official contact details are added.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 rounded-2xl border border-gray-100 p-6 lg:p-8">
            <ContactRow label="Phone" value="[Your Phone Number]" />
            <ContactRow label="WhatsApp" value="[Your WhatsApp Number]" />
            <ContactRow label="Email" value="[your@email.com]" />
            <ContactRow
              label="Business Address"
              value="[Business Address, Nigeria]"
            />
            <ContactRow
              label="Social"
              value="Instagram · Facebook · TikTok (add your handles)"
            />
          </div>

          <form
            action="#"
            className="space-y-4 rounded-2xl border border-gray-100 p-6 lg:p-8"
          >
            <h2 className="text-sm font-semibold text-navy">Send a Message</h2>
            <input
              required
              placeholder="Your name"
              className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-navy"
            />
            <input
              required
              type="email"
              placeholder="Email address"
              className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-navy"
            />
            <textarea
              required
              rows={5}
              placeholder="How can we help?"
              className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-navy"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light"
            >
              Submit Inquiry
            </button>
            <p className="text-xs text-gray-400">
              Form submissions can be connected to your preferred inbox or CRM.
            </p>
          </form>
        </div>

        <div className="mt-10">
          <Link href="/shop" className="text-sm font-medium text-navy underline">
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-gold">{label}</p>
      <p className="mt-1 text-sm text-navy">{value}</p>
    </div>
  );
}
