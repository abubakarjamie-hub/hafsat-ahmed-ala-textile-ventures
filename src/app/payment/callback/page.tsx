import { PaymentResult } from "@/components/payment-result";

export const dynamic = "force-dynamic";

type CallbackPageProps = {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
};

export default async function PaymentCallbackPage({ searchParams }: CallbackPageProps) {
  const params = await searchParams;
  const reference = params.reference ?? params.trxref ?? "";
  return <PaymentResult reference={reference} />;
}
