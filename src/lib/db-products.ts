import { db } from "@/db";
import { products, type Product } from "@/db/schema";
import { eq, ne, desc, sql } from "drizzle-orm";
import { seedProducts } from "@/lib/products-data";

export async function ensureProductsSeeded(): Promise<void> {
  const existing = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products);
  if ((existing[0]?.count ?? 0) > 0) return;

  for (const p of seedProducts) {
    await db.insert(products).values({
      slug: p.slug,
      name: p.name,
      description: p.description,
      longDescription: p.longDescription,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      currency: p.currency,
      category: p.category,
      badge: p.badge,
      rating: p.rating,
      reviewCount: p.reviewCount,
      images: p.images,
      colors: p.colors,
      sizes: p.sizes,
      materials: p.materials,
      specifications: p.specifications,
      features: p.features,
      stock: p.stock,
      isFeatured: p.isFeatured,
      isNew: p.isNew,
    });
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await ensureProductsSeeded();
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getFeaturedProducts(
  excludeSlug?: string,
  limit = 4
): Promise<Product[]> {
  await ensureProductsSeeded();
  if (excludeSlug) {
    return db
      .select()
      .from(products)
      .where(ne(products.slug, excludeSlug))
      .orderBy(desc(products.isFeatured), desc(products.createdAt))
      .limit(limit);
  }
  return db
    .select()
    .from(products)
    .orderBy(desc(products.isFeatured), desc(products.createdAt))
    .limit(limit);
}

export async function getAllProducts(): Promise<Product[]> {
  await ensureProductsSeeded();
  return db.select().from(products).orderBy(desc(products.createdAt));
}

export async function getProductById(id: number): Promise<Product | null> {
  await ensureProductsSeeded();
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return rows[0] ?? null;
}
