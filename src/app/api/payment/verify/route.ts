import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PaystackVerifyResponse = {
  status: boolean;
  message?: string;
  data?: {
    status?: string;
    reference?: string;
    amount?: number;
    currency?: string;
  };
};

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference")?.trim() ?? "";
  if (!/^HAA-[a-zA-Z0-9-]{8,100}$/.test(reference)) {
    return Response.json({ error: "A valid payment reference is required." }, { status: 400 });
  }

  const [order] = await db.select().from(orders).where(eq(orders.reference, reference)).limit(1);
  if (!order) {
    return Response.json({ error: "We couldn’t find this order." }, { status: 404 });
  }
  if (order.status === "paid") {
    return Response.json({ verified: true, status: "paid", reference });
  }
  if (!process.env.PAYSTACK_SECRET_KEY) {
    return Response.json({ error: "Payment verification is not configured." }, { status: 503 });
  }

  let response: Response;
  try {
    response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
      },
    );
  } catch {
    return Response.json({ error: "We could not confirm the payment yet. Please try again." }, { status: 502 });
  }

  const result = (await response.json().catch(() => null)) as PaystackVerifyResponse | null;
  const verified =
    response.ok &&
    result?.status === true &&
    result.data?.status === "success" &&
    result.data.reference === reference &&
    result.data.amount === order.total * 100 &&
    result.data.currency === "NGN";

  if (!verified) {
    return Response.json({ verified: false, status: result?.data?.status ?? "pending" });
  }

  await db.transaction(async (transaction) => {
    const [currentOrder] = await transaction
      .select()
      .from(orders)
      .where(eq(orders.id, order.id))
      .for("update");

    if (currentOrder?.status === "paid") return;

    const items = await transaction
      .select({ productId: orderItems.productId, quantity: orderItems.quantity })
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));

    for (const item of items) {
      await transaction
        .update(products)
        .set({ stock: sql`GREATEST(${products.stock} - ${item.quantity}, 0)` })
        .where(eq(products.id, item.productId));
    }

    await transaction
      .update(orders)
      .set({ status: "paid", paidAt: new Date() })
      .where(and(eq(orders.id, order.id), eq(orders.status, "pending")));
  });

  return Response.json({ verified: true, status: "paid", reference });
}
