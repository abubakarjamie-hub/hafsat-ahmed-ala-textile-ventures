import { NextResponse } from "next/server";
import { getAllProducts, ensureProductsSeeded } from "@/lib/db-products";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureProductsSeeded();
    const items = await getAllProducts();
    return NextResponse.json({ products: items });
  } catch (error) {
    console.error("Failed to load products", error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
