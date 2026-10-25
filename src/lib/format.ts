export function formatNaira(amount: number | string): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  if (Number.isNaN(value)) return "₦0";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function calcDiscount(
  price: number | string,
  compareAt?: number | string | null
): number | null {
  if (!compareAt) return null;
  const p = typeof price === "string" ? parseFloat(price) : price;
  const c = typeof compareAt === "string" ? parseFloat(compareAt) : compareAt;
  if (!c || c <= p) return null;
  return Math.round(((c - p) / c) * 100);
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
