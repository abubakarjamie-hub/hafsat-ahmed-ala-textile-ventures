"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/db/schema";
import { useCartStore } from "@/store/cart-store";
import { calcDiscount, cn, formatNaira } from "@/lib/format";
import {
  IconBag,
  IconCheck,
  IconHeart,
  IconRuler,
  IconStar,
} from "@/components/icons";

export function ProductInfo({ product }: { product: Product }) {
  const colors = product.colors ?? [];
  const sizes = product.sizes ?? [];
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name ?? "");
  const [selectedSize, setSelectedSize] = useState(sizes[1] ?? sizes[0] ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isInWishlist = useCartStore((s) =>
    s.wishlist.some((w) => w.productId === product.id)
  );

  const price = parseFloat(product.price);
  const compare = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;
  const discount = calcDiscount(price, compare);
  const rating = product.rating ? parseFloat(product.rating) : 0;
  const image = product.images[0] ?? "/images/products/ankara-main.jpg";

  const stars = useMemo(() => {
    const full = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) => i < full);
  }, [rating]);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price,
      image,
      quantity: qty,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col">
      {product.badge && (
        <span className="mb-3 inline-flex w-fit rounded-full bg-soft-gray px-3 py-1 text-[11px] font-medium tracking-wide text-navy">
          {product.badge}
        </span>
      )}

      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl lg:text-[2rem] lg:leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-0.5 text-gold">
          {stars.map((filled, i) => (
            <IconStar key={i} size={14} filled={filled} className={filled ? "text-gold" : "text-gray-300"} />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {rating.toFixed(1)}{" "}
          <span className="text-gray-400">
            ({product.reviewCount ?? 0} reviews)
          </span>
        </span>
      </div>

      {/* Price */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-2xl font-semibold text-navy">
          {formatNaira(price)}
        </span>
        {compare && compare > price && (
          <>
            <span className="text-base text-gray-400 line-through">
              {formatNaira(compare)}
            </span>
            {discount && (
              <span className="rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
                {discount}% OFF
              </span>
            )}
          </>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-gray-600">
        {product.description}
      </p>

      <div className="my-6 h-px bg-gray-100" />

      {/* Color */}
      {colors.length > 0 && (
        <div className="mb-5">
          <p className="mb-2.5 text-sm text-gray-700">
            Color:{" "}
            <span className="font-medium text-navy">{selectedColor}</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {colors.map((c) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                aria-label={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={cn(
                  "h-8 w-8 rounded-full border-2 transition",
                  selectedColor === c.name
                    ? "border-navy ring-2 ring-navy/20 ring-offset-1"
                    : "border-gray-200 hover:border-gray-300"
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size / Yardage */}
      {sizes.length > 0 && (
        <div className="mb-5">
          <div className="mb-2.5 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Size:{" "}
              <span className="font-medium text-navy">{selectedSize}</span>
            </p>
            <Link
              href="#specifications"
              className="inline-flex items-center gap-1 text-xs text-gray-500 underline-offset-2 hover:text-navy hover:underline"
            >
              <IconRuler size={14} />
              Size Guide
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={cn(
                  "min-w-[3rem] rounded-md border px-3 py-2 text-sm transition",
                  selectedSize === s
                    ? "border-navy bg-navy text-white"
                    : "border-gray-200 bg-white text-navy hover:border-gray-300"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-5">
        <p className="mb-2.5 text-sm text-gray-700">Quantity</p>
        <div className="inline-flex items-center rounded-md border border-gray-200">
          <button
            type="button"
            className="px-3 py-2 text-navy hover:bg-soft-gray"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-10 text-center text-sm font-medium">{qty}</span>
          <button
            type="button"
            className="px-3 py-2 text-navy hover:bg-soft-gray"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-navy py-3.5 text-sm font-semibold text-white transition hover:bg-navy-light"
        >
          {added ? (
            <>
              <IconCheck size={18} /> Added to Cart
            </>
          ) : (
            <>
              <IconBag size={18} /> Add to Cart
            </>
          )}
        </button>
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={() =>
            toggleWishlist({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price,
              image,
            })
          }
          className={cn(
            "flex h-[50px] w-[50px] items-center justify-center rounded-md border transition",
            isInWishlist
              ? "border-gold bg-gold/10 text-gold"
              : "border-gray-200 text-gray-500 hover:border-navy hover:text-navy"
          )}
        >
          <IconHeart size={20} filled={isInWishlist} />
        </button>
      </div>

      {/* Trust row */}
      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3">
        <TrustItem
          icon="fabric"
          title="Quality Fabrics"
          subtitle="Carefully selected fabrics for lasting quality"
        />
        <TrustItem
          icon="delivery"
          title="Reliable Delivery"
          subtitle="Delivery options for Nigerian customers"
        />
        <TrustItem
          icon="secure"
          title="Secure Payment"
          subtitle="Secure checkout via supported providers"
        />
      </div>
    </div>
  );
}

function TrustItem({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: "fabric" | "delivery" | "secure";
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-navy">
        {icon === "fabric" && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 3v18" strokeLinecap="round" />
          </svg>
        )}
        {icon === "delivery" && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M1 7h11v10H1zM12 10h4l3 3v4h-7V10Z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="5.5" cy="18.5" r="1.2" />
            <circle cx="16.5" cy="18.5" r="1.2" />
          </svg>
        )}
        {icon === "secure" && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <div>
        <p className="text-xs font-semibold text-navy">{title}</p>
        <p className="text-[11px] leading-snug text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
