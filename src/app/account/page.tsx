import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account",
  description: "Customer account area for Hafsat Ahmed Ala Textile Ventures.",
};

export default function AccountPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-gray-100 p-8 text-center">
        <h1 className="mb-3 text-2xl font-semibold text-navy">My Account</h1>
        <p className="mb-6 text-sm text-gray-600">
          Customer accounts can be enabled with authentication when you are
          ready to launch member profiles, order history, and saved addresses.
        </p>
        <div className="space-y-3">
          <input
            disabled
            placeholder="Email"
            className="w-full rounded-md border border-gray-200 bg-soft-gray px-3 py-2.5 text-sm"
          />
          <input
            disabled
            type="password"
            placeholder="Password"
            className="w-full rounded-md border border-gray-200 bg-soft-gray px-3 py-2.5 text-sm"
          />
          <button
            type="button"
            disabled
            className="w-full rounded-md bg-navy/70 py-3 text-sm font-semibold text-white"
          >
            Sign In (Coming Soon)
          </button>
        </div>
        <Link href="/shop" className="mt-6 inline-block text-sm text-navy underline">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
