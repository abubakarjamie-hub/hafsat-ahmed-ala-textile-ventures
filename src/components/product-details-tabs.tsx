"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/db/schema";
import { cn } from "@/lib/format";
import {
  IconCheck,
  IconFabric,
} from "@/components/icons";

const tabs = [
  { id: "details", label: "Details" },
  { id: "materials", label: "Materials" },
  { id: "specifications", label: "Specifications" },
  { id: "shipping", label: "Shipping & Returns" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProductDetailsTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<TabId>("details");
  const features = product.features ?? [];
  const specs = product.specifications ?? {};
  const detailImage =
    product.images[product.images.length - 1] ??
    product.images[0] ??
    "/images/products/texture-closeup.jpg";

  return (
    <section className="border-t border-gray-100 py-12 lg:py-16" id="details">
      <div className="container-page">
        {/* Tabs */}
        <div className="mb-8 flex gap-6 overflow-x-auto border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "shrink-0 border-b-2 pb-3 text-sm font-medium transition",
                active === tab.id
                  ? "border-navy text-navy"
                  : "border-transparent text-gray-500 hover:text-navy"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="min-h-[200px]">
            {active === "details" && (
              <div>
                <p className="text-sm leading-relaxed text-gray-600">
                  {product.longDescription}
                </p>
                {features.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-navy">
                        <span className="mt-0.5 text-gold">
                          <IconCheck size={16} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {active === "materials" && (
              <div className="space-y-4 text-sm leading-relaxed text-gray-600">
                <p>{product.materials}</p>
                <div className="rounded-lg bg-soft-gray p-4">
                  <p className="mb-1 flex items-center gap-2 font-medium text-navy">
                    <IconFabric size={16} /> Fabric Care
                  </p>
                  <p className="text-gray-600">
                    Follow the care instructions above to preserve color
                    vibrancy and fabric integrity for years of beautiful wear.
                  </p>
                </div>
              </div>
            )}

            {active === "specifications" && (
              <div id="specifications">
                <dl className="divide-y divide-gray-100 rounded-lg border border-gray-100">
                  {Object.entries(specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                    >
                      <dt className="text-gray-500">{key}</dt>
                      <dd className="font-medium text-navy">{value}</dd>
                    </div>
                  ))}
                  {colorsRow(product)}
                  <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                    <dt className="text-gray-500">Available Quantity</dt>
                    <dd className="font-medium text-navy">
                      {product.stock} in stock
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            {active === "shipping" && (
              <div className="space-y-4 text-sm leading-relaxed text-gray-600">
                <div>
                  <h4 className="mb-1 font-semibold text-navy">Delivery</h4>
                  <p>
                    We offer reliable delivery options across Nigeria. Orders
                    are typically processed within 1–2 business days. Delivery
                    timelines vary by location and will be confirmed at
                    checkout. Shipping fees are calculated based on destination
                    and order size.
                  </p>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-navy">Returns</h4>
                  <p>
                    If you receive a defective or incorrect item, please contact
                    us within 7 days of delivery with photos of the issue. We
                    will arrange a suitable resolution. Custom-cut fabrics and
                    cleared sale items may not be eligible for return unless
                    faulty.
                  </p>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-navy">Payment</h4>
                  <p>
                    Secure checkout is prepared for Nigerian payment providers
                    such as Paystack or Flutterwave. Payment gateway credentials
                    must be configured before live transactions can be
                    processed.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-soft-gray lg:aspect-[5/4]">
            <Image
              src={detailImage}
              alt={`${product.name} fabric texture detail`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function colorsRow(product: Product) {
  const colors = product.colors ?? [];
  if (!colors.length) return null;
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
      <dt className="text-gray-500">Available Colors</dt>
      <dd className="font-medium text-navy text-right">
        {colors.map((c) => c.name).join(", ")}
      </dd>
    </div>
  );
}
