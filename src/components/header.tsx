"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import {
  IconBag,
  IconChevronDown,
  IconClose,
  IconMenu,
  IconSearch,
  IconUser,
} from "@/components/icons";

const navLinks = [
  { href: "/", label: "HOME" },
  {
    href: "/shop",
    label: "SHOP",
    children: [
      { href: "/shop?category=Ankara", label: "Ankara" },
      { href: "/shop?category=Lace", label: "Lace" },
      { href: "/shop?category=Brocade", label: "Brocade" },
      { href: "/shop?category=Traditional", label: "Traditional" },
      { href: "/shop?category=Silk", label: "Silk" },
    ],
  },
  { href: "/shop?filter=new", label: "NEW ARRIVALS" },
  { href: "/shop?filter=collections", label: "COLLECTIONS" },
  { href: "/shop?filter=sale", label: "SALE" },
  { href: "/about", label: "ABOUT US" },
];

export function Header() {
  const itemCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const openCart = useCartStore((s) => s.openCart);
  const isMobileNavOpen = useCartStore((s) => s.isMobileNavOpen);
  const openMobileNav = useCartStore((s) => s.openMobileNav);
  const closeMobileNav = useCartStore((s) => s.closeMobileNav);
  const [shopOpen, setShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Announcement bar */}
      <div className="bg-navy text-white">
        <div className="container-page flex h-9 items-center justify-between text-[11px] tracking-wide sm:text-xs">
          <p className="flex-1 text-center font-medium sm:text-left">
            Premium Fabrics • Quality You Can Trust
          </p>
          <div className="hidden items-center gap-1 sm:flex">
            <span className="opacity-80">NGN ₦</span>
            <IconChevronDown size={12} className="opacity-70" />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`border-b border-gray-100 bg-white transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          {/* Left: menu + logo */}
          <div className="flex items-center gap-3 lg:gap-4">
            <button
              type="button"
              aria-label="Open menu"
              className="rounded-md p-1.5 text-navy transition hover:bg-soft-gray lg:hidden"
              onClick={openMobileNav}
            >
              <IconMenu />
            </button>

            <Link href="/" className="flex shrink-0 items-center" aria-label="Hafsat Ahmed Ala Textile Ventures">
              <Image
                src="/images/brand/logo-header.png"
                alt="Hafsat Ahmed Ala Textile Ventures"
                width={200}
                height={68}
                className="h-9 w-auto max-w-[160px] object-contain object-left sm:h-11 sm:max-w-[200px] lg:h-12 lg:max-w-[220px]"
                priority
              />
            </Link>
          </div>

          {/* Center nav */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-[12px] font-medium tracking-[0.08em] text-navy transition hover:text-gold"
                  >
                    {link.label}
                    <IconChevronDown size={12} />
                  </Link>
                  {shopOpen && (
                    <div className="absolute left-0 top-full z-50 min-w-[180px] pt-3">
                      <div className="rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-navy transition hover:bg-soft-gray hover:text-gold"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[12px] font-medium tracking-[0.08em] text-navy transition hover:text-gold"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Search"
              className="rounded-md p-2 text-navy transition hover:bg-soft-gray"
            >
              <IconSearch size={18} />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden rounded-md p-2 text-navy transition hover:bg-soft-gray sm:inline-flex"
            >
              <IconUser size={18} />
            </Link>
            <button
              type="button"
              aria-label="Shopping bag"
              className="relative rounded-md p-2 text-navy transition hover:bg-soft-gray"
              onClick={openCart}
            >
              <IconBag size={18} />
              {mounted && itemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-white">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={closeMobileNav}
          />
          <div className="absolute left-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
              <Image
                src="/images/brand/logo-header.png"
                alt="Hafsat Ahmed Ala Textile Ventures"
                width={180}
                height={60}
                className="h-10 w-auto max-w-[180px] object-contain object-left"
              />
              <button
                type="button"
                aria-label="Close menu"
                className="rounded-md p-2 text-navy hover:bg-soft-gray"
                onClick={closeMobileNav}
              >
                <IconClose />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-4">
              {navLinks.map((link) => (
                <div key={link.label} className="mb-1">
                  <Link
                    href={link.href}
                    onClick={closeMobileNav}
                    className="block rounded-md px-3 py-3 text-sm font-medium tracking-wide text-navy hover:bg-soft-gray"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-3 border-l border-gray-100 pl-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMobileNav}
                          className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-soft-gray hover:text-navy"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="border-t border-gray-100 p-4 text-xs text-gray-500">
              Premium Fabrics • Elegant Style
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
