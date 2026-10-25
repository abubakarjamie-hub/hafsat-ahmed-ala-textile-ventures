"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { calcDiscount, formatNaira } from "@/lib/format";
import { IconHeart } from "@/components/icons";
import type { Product } from "@/db/schema";

export function ProductCard({ product }: { product: Product }) {
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isInWishlist = useCartStore((s) =>
    s.wishlist.some((w) => w.productId === product.id)
  );
  const price = parseFloat(product.price);
  const compare = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;
  const discount = calcDiscount(price, compare);
  const image = product.images[0] ?? "/images/products/ankara-main.jpg";

  return (
    <article className="group relative">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-soft-gray">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-navy shadow-sm">
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      <button
        type="button"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute right-3 top-3 rounded-full bg-white/95 p-2 shadow-sm transition hover:text-gold ${
          isInWishlist ? "text-gold" : "text-gray-400"
        }`}
        onClick={() =>
          toggleWishlist({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price,
            image,
          })
        }
      >
        <IconHeart size={16} filled={isInWishlist} />
      </button>
      <div className="mt-3 px-0.5">
        <Link
          href={`/product/${product.slug}`}
          className="text-sm font-medium text-navy transition hover:text-gold"
        >
          {product.name}
        </Link>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-navy">
            {formatNaira(price)}
          </span>
          {compare && compare > price && (
            <>
              <span className="text-xs text-gray-400 line-through">
                {formatNaira(compare)}
              </span>
              {discount && (
                <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-600">
                  {discount}% OFF
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
