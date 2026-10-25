import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { getSessionId } from "@/lib/session";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      state,
      notes,
      items,
      subtotal,
      shippingFee = 0,
    } = body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !shippingAddress ||
      !city ||
      !state ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required checkout fields" },
        { status: 400 }
      );
    }

    const sessionId = await getSessionId();
    const orderNumber = `HAA-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`;
    const total = Number(subtotal) + Number(shippingFee);

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        sessionId,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city,
        state,
        notes: notes || null,
        subtotal: String(subtotal),
        shippingFee: String(shippingFee),
        total: String(total),
        status: "pending_payment",
        paymentProvider: null,
        paymentReference: null,
        items,
      })
      .returning();

    return NextResponse.json({
      order,
      message:
        "Order created. Payment gateway integration (Paystack/Flutterwave) is required to complete payment.",
      paymentRequired: true,
    });
  } catch (error) {
    console.error("Failed to create order", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
