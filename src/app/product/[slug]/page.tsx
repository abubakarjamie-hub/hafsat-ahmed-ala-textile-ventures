import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getFeaturedProducts,
  getProductBySlug,
  getAllProducts,
} from "@/lib/db-products";
import { ProductGallery } from "@/components/product-gallery";
import { ProductInfo } from "@/components/product-info";
import { ProductDetailsTabs } from "@/components/product-details-tabs";
import { ProductCard } from "@/components/product-card";
import { formatNaira } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [{ slug: "premium-ankara-fabric" }];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getFeaturedProducts(product.slug, 4);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-50">
        <div className="container-page flex flex-wrap items-center gap-2 py-3 text-xs text-gray-500">
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-navy">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-navy"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-navy">{product.name}</span>
        </div>
      </div>

      {/* Product main */}
      <section className="container-page py-6 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} name={product.name} />
          </div>
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* Details tabs */}
      <ProductDetailsTabs product={product} />

      {/* You may also like */}
      <section className="border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight text-navy sm:text-2xl">
              You May Also Like
            </h2>
            <Link
              href="/shop"
              className="text-sm font-medium text-navy underline-offset-4 transition hover:text-gold hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SEO helper text (visually subtle) */}
      <div className="sr-only">
        Buy {product.name} for {formatNaira(product.price)} at Hafsat Ahmed Ala
        Textile Ventures. Premium {product.category} fabric in Nigeria.
      </div>
    </div>
  );
}
