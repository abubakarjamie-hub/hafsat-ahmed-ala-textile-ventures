import { asc } from "drizzle-orm";
import { db } from "@/db";
import { products as productTable } from "@/db/schema";
import { Storefront } from "@/components/storefront";
import { fallbackProducts, type StoreProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let catalog: StoreProduct[] = fallbackProducts;
  try {
    const databaseProducts = await db.select().from(productTable).orderBy(asc(productTable.displayOrder));
    if (databaseProducts.length > 0) catalog = databaseProducts;
  } catch {
    // Keep the storefront browsable with its typed fallback catalog if the database is unavailable.
  }

  return <Storefront products={catalog} checkoutReady={Boolean(process.env.PAYSTACK_SECRET_KEY)} />;
}
