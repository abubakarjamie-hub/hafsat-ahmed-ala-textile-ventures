"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { formatNaira } from "@/lib/format";

type FormState = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  notes: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );
  const shippingFee = subtotal > 50000 ? 0 : 2500;
  const total = subtotal + shippingFee;

  const [form, setForm] = useState<FormState>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    city: "",
    state: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<{
    orderNumber: string;
    message: string;
  } | null>(null);

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: String(i.price),
            quantity: i.quantity,
            color: i.color,
            size: i.size,
            image: i.image,
          })),
          subtotal,
          shippingFee,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      setOrderResult({
        orderNumber: data.order.orderNumber,
        message: data.message,
      });
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (orderResult) {
    return (
      <div className="container-page py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-gold">
            ORDER RECEIVED
          </p>
          <h1 className="mb-3 text-2xl font-semibold text-navy">
            Thank you for your order
          </h1>
          <p className="mb-2 text-sm text-gray-600">
            Order number:{" "}
            <span className="font-semibold text-navy">
              {orderResult.orderNumber}
            </span>
          </p>
          <div className="my-6 rounded-lg bg-amber-50 p-4 text-left text-sm text-amber-900">
            <p className="font-semibold">Payment gateway required</p>
            <p className="mt-1 text-amber-800/90">{orderResult.message}</p>
            <p className="mt-2 text-amber-800/90">
              To accept live payments for Nigerian customers, configure Paystack
              or Flutterwave API keys. No payment has been charged.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-navy-light"
            >
              Continue Shopping
            </Link>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-md border border-gray-200 px-5 py-3 text-sm font-medium text-navy hover:bg-soft-gray"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="mb-3 text-2xl font-semibold text-navy">
          Your bag is empty
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Add fabrics to your bag before checking out.
        </p>
        <Link
          href="/shop"
          className="inline-flex rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-light"
        >
          Browse Fabrics
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-soft-gray/40">
      <div className="container-page py-8 lg:py-12">
        <h1 className="mb-8 text-2xl font-semibold text-navy">Checkout</h1>
        <div className="grid gap-8 lg:grid-cols-12">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 lg:col-span-7 lg:p-8"
          >
            <h2 className="text-sm font-semibold tracking-wide text-navy">
              Shipping Details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Full Name"
                required
                value={form.customerName}
                onChange={(v) => update("customerName", v)}
              />
              <Field
                label="Phone / WhatsApp"
                required
                value={form.customerPhone}
                onChange={(v) => update("customerPhone", v)}
              />
              <Field
                label="Email"
                type="email"
                required
                value={form.customerEmail}
                onChange={(v) => update("customerEmail", v)}
                className="sm:col-span-2"
              />
              <Field
                label="Street Address"
                required
                value={form.shippingAddress}
                onChange={(v) => update("shippingAddress", v)}
                className="sm:col-span-2"
              />
              <Field
                label="City"
                required
                value={form.city}
                onChange={(v) => update("city", v)}
              />
              <Field
                label="State"
                required
                value={form.state}
                onChange={(v) => update("state", v)}
              />
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Order Notes (optional)
                </label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-navy"
                  placeholder="Delivery instructions, preferred contact time..."
                />
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-semibold">Payment notice</p>
              <p className="mt-1 text-amber-800/90">
                Checkout will create your order and mark it as pending payment.
                Live card/bank payments require Paystack or Flutterwave setup.
                No real payment will be processed at this stage.
              </p>
            </div>

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-navy py-3.5 text-sm font-semibold text-white transition hover:bg-navy-light disabled:opacity-60"
            >
              {submitting ? "Placing Order..." : `Place Order · ${formatNaira(total)}`}
            </button>
          </form>

          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 lg:col-span-5 lg:p-8">
            <h2 className="mb-5 text-sm font-semibold tracking-wide text-navy">
              Order Summary
            </h2>
            <ul className="mb-5 space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.color}-${item.size}`}
                  className="flex gap-3"
                >
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md bg-soft-gray">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-navy">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty {item.quantity}
                      {item.color ? ` · ${item.color}` : ""}
                      {item.size ? ` · ${item.size}` : ""}
                    </p>
                    <p className="text-sm font-semibold text-navy">
                      {formatNaira(item.price * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? "Free" : formatNaira(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-semibold text-navy">
                <span>Total</span>
                <span>{formatNaira(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-navy"
      />
    </div>
  );
}
