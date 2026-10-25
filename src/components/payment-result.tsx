"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";

type VerifyState = "checking" | "paid" | "pending" | "error";

export function PaymentResult({ reference }: { reference: string }) {
  const [state, setState] = useState<VerifyState>(reference ? "checking" : "error");
  const [message, setMessage] = useState("Checking your payment securely with Paystack…");

  const verify = useCallback(async () => {
    if (!reference) {
      setState("error");
      setMessage("We couldn’t find a payment reference for this visit.");
      return;
    }
    setState("checking");
    setMessage("Checking your payment securely with Paystack…");
    try {
      const response = await fetch(`/api/payment/verify?reference=${encodeURIComponent(reference)}`, {
        cache: "no-store",
      });
      const result = (await response.json()) as { verified?: boolean; status?: string; error?: string };
      if (response.ok && result.verified) {
        setState("paid");
        setMessage("Your payment has been verified. Thank you for shopping with us.");
        window.localStorage.removeItem("haa-textile-cart");
      } else if (response.status === 503 || response.status === 404) {
        setState("error");
        setMessage(result.error ?? "We couldn’t verify this payment. Please contact the store before trying again.");
      } else {
        setState("pending");
        setMessage("This payment has not been confirmed yet. If you completed payment, check again in a moment. Please don’t place a second order while it is pending.");
      }
    } catch {
      setState("error");
      setMessage("We couldn’t reach the verification service. Please try checking again.");
    }
  }, [reference]);

  useEffect(() => {
    void verify();
  }, [verify]);

  return (
    <main className="payment-result-page">
      <section className="payment-result-card" aria-live="polite">
        <span className={`payment-result-icon payment-result-icon--${state}`}>
          {state === "paid" ? <Icon name="check" size={27} /> : state === "checking" ? <span className="loading-ring" /> : <Icon name="shield" size={27} />}
        </span>
        <p className="eyebrow">Hafsat Ahmed Ala Textile Ventures</p>
        <h1>{state === "paid" ? "Thank you for your order" : state === "checking" ? "Confirming your payment" : state === "pending" ? "Payment is pending" : "Payment status unavailable"}</h1>
        <p>{message}</p>
        {reference && <p className="payment-reference">Reference <span>{reference}</span></p>}
        <div className="payment-result-actions">
          {(state === "pending" || state === "error") && <button className="button button--navy" onClick={() => void verify()}>Check payment again</button>}
          <Link href="/" className="button button--light">Return to the shop</Link>
        </div>
        <p className="payment-assurance"><Icon name="shield" size={15} /> Payment status is only marked complete after provider verification.</p>
      </section>
    </main>
  );
}
