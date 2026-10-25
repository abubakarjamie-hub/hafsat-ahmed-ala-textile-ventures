import { asc } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  const catalog = await db.select().from(products).orderBy(asc(products.displayOrder));
  return Response.json(catalog, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
