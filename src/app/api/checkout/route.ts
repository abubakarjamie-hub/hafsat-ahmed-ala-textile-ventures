import { randomUUID } from "node:crypto";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CartLine = { slug: string; quantity: number };
type PaystackInitializeResponse = {
  status: boolean;
  message?: string;
  data?: { authorization_url?: string; reference?: string };
};

function isEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Please review your checkout details and try again." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Please review your checkout details and try again." }, { status: 400 });
  }

  const payload = body as { email?: unknown; items?: unknown };
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!isEmail(email)) {
    return Response.json({ error: "Enter a valid email address to continue." }, { status: 400 });
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0 || payload.items.length > 30) {
    return Response.json({ error: "Your bag is empty. Add a fabric before checkout." }, { status: 400 });
  }

  const requested = new Map<string, number>();
  for (const line of payload.items as CartLine[]) {
    if (
      !line ||
      typeof line.slug !== "string" ||
      !/^[a-z0-9-]{1,100}$/.test(line.slug) ||
      !Number.isInteger(line.quantity) ||
      line.quantity < 1 ||
      line.quantity > 100
    ) {
      return Response.json({ error: "One or more bag items are invalid." }, { status: 400 });
    }
    requested.set(line.slug, (requested.get(line.slug) ?? 0) + line.quantity);
  }

  if (!process.env.PAYSTACK_SECRET_KEY) {
    return Response.json(
      { error: "Online checkout is not set up yet. Your bag is safe—please contact the store to arrange an order." },
      { status: 503 },
    );
  }

  const catalog = await db
    .select()
    .from(products)
    .where(inArray(products.slug, [...requested.keys()]));

  if (catalog.length !== requested.size) {
    return Response.json({ error: "A fabric in your bag is no longer available." }, { status: 409 });
  }

  for (const product of catalog) {
    const quantity = requested.get(product.slug) ?? 0;
    if (quantity > product.stock) {
      return Response.json(
        { error: `Only ${product.stock} ${product.quantityUnit}${product.stock === 1 ? "" : "s"} of ${product.name} remain.` },
        { status: 409 },
      );
    }
  }

  const total = catalog.reduce(
    (sum, product) => sum + product.price * (requested.get(product.slug) ?? 0),
    0,
  );
  const reference = `HAA-${Date.now()}-${randomUUID().slice(0, 8)}`;
  const [order] = await db
    .insert(orders)
    .values({ reference, email, total, status: "pending" })
    .returning({ id: orders.id });

  await db.insert(orderItems).values(
    catalog.map((product) => ({
      orderId: order.id,
      productId: product.id,
      productName: product.name,
      unitPrice: product.price,
      quantity: requested.get(product.slug) ?? 0,
    })),
  );

  let gatewayResponse: Response;
  try {
    gatewayResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({
        email,
        amount: total * 100,
        currency: "NGN",
        reference,
        callback_url: new URL("/payment/callback", request.url).toString(),
        metadata: { order_reference: reference },
      }),
    });
  } catch {
    await db.update(orders).set({ status: "initialization_failed" }).where(eq(orders.id, order.id));
    return Response.json({ error: "We could not reach the payment provider. Please try again shortly." }, { status: 502 });
  }

  const result = (await gatewayResponse.json().catch(() => null)) as PaystackInitializeResponse | null;
  const authorizationUrl = result?.data?.authorization_url;
  if (!gatewayResponse.ok || !result?.status || !authorizationUrl) {
    await db.update(orders).set({ status: "initialization_failed" }).where(eq(orders.id, order.id));
    return Response.json(
      { error: result?.message ?? "The payment provider could not start checkout. Please try again." },
      { status: 502 },
    );
  }

  await db
    .update(orders)
    .set({ authorizationUrl })
    .where(eq(orders.id, order.id));

  return Response.json({ authorizationUrl, reference });
}
