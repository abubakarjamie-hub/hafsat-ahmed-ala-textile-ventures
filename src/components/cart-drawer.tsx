"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { formatNaira } from "@/lib/format";
import { IconClose, IconMinus, IconPlus } from "@/components/icons";

export function CartDrawer() {
  const isCartOpen = useCartStore((s) => s.isCartOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-black/40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden={!isCartOpen}
      />
      <aside
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold tracking-wide text-navy">
            Shopping Bag ({items.reduce((n, i) => n + i.quantity, 0)})
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="rounded-md p-2 text-navy hover:bg-soft-gray"
          >
            <IconClose />
          </button>
        </div>

        <div className="cart-scroll flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="text-sm text-gray-500">Your bag is empty</p>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-light"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.color}-${item.size}`}
                  className="flex gap-4"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-soft-gray">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-medium text-navy hover:text-gold"
                        >
                          {item.name}
                        </Link>
                        {(item.color || item.size) && (
                          <p className="mt-0.5 text-xs text-gray-500">
                            {[item.color, item.size].filter(Boolean).join(" · ")}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        className="text-xs text-gray-400 hover:text-red-500"
                        onClick={() =>
                          removeItem(item.productId, item.color, item.size)
                        }
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-md border border-gray-200">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="p-1.5 text-navy hover:bg-soft-gray"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity - 1,
                              item.color,
                              item.size
                            )
                          }
                        >
                          <IconMinus size={14} />
                        </button>
                        <span className="min-w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="p-1.5 text-navy hover:bg-soft-gray"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity + 1,
                              item.color,
                              item.size
                            )
                          }
                        >
                          <IconPlus size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-navy">
                        {formatNaira(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-navy">
                {formatNaira(subtotal)}
              </span>
            </div>
            <p className="mb-4 text-xs text-gray-400">
              Shipping calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="mb-2 flex w-full items-center justify-center rounded-md bg-navy py-3.5 text-sm font-semibold text-white transition hover:bg-navy-light"
            >
              Checkout
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="w-full py-2 text-sm text-navy underline-offset-2 hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
