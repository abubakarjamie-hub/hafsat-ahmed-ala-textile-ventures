import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/db-products";
import { ProductCard } from "@/components/product-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop Fabrics",
  description:
    "Browse premium Ankara, lace, brocade, silk, and traditional Hausa fabrics from Hafsat Ahmed Ala Textile Ventures.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; filter?: string }>;
}) {
  const params = await searchParams;
  const all = await getAllProducts();

  let products = all;
  let title = "All Fabrics";

  if (params.category) {
    products = all.filter(
      (p) => p.category.toLowerCase() === params.category!.toLowerCase()
    );
    title = params.category;
  } else if (params.filter === "new") {
    products = all.filter((p) => p.isNew);
    title = "New Arrivals";
  } else if (params.filter === "sale") {
    products = all.filter((p) => p.compareAtPrice);
    title = "Special Offers";
  } else if (params.filter === "bestsellers" || params.filter === "collections") {
    products = all.filter((p) => p.isFeatured);
    title = params.filter === "bestsellers" ? "Best Sellers" : "Collections";
  }

  const categories = Array.from(new Set(all.map((p) => p.category)));

  return (
    <div className="bg-white">
      <div className="border-b border-gray-50">
        <div className="container-page py-8 lg:py-10">
          <p className="mb-2 text-xs font-medium tracking-[0.15em] text-gold">
            SHOP
          </p>
          <h1 className="text-2xl font-semibold text-navy sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-gray-600">
            Premium fabrics selected for elegance, durability, and exceptional
            style.
          </p>
        </div>
      </div>

      <div className="container-page py-8 lg:py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          <FilterChip href="/shop" active={!params.category && !params.filter}>
            All
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c}
              href={`/shop?category=${encodeURIComponent(c)}`}
              active={params.category === c}
            >
              {c}
            </FilterChip>
          ))}
          <FilterChip
            href="/shop?filter=new"
            active={params.filter === "new"}
          >
            New Arrivals
          </FilterChip>
          <FilterChip
            href="/shop?filter=sale"
            active={params.filter === "sale"}
          >
            Sale
          </FilterChip>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500">No products found in this collection.</p>
            <Link
              href="/shop"
              className="mt-4 inline-block text-sm font-medium text-navy underline"
            >
              View all fabrics
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
        active
          ? "border-navy bg-navy text-white"
          : "border-gray-200 text-navy hover:border-navy"
      }`}
    >
      {children}
    </Link>
  );
}
