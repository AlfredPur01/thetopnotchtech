"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

type VerifyStatus = "loading" | "success" | "failed" | "error";

export function PaymentCallback() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const [status, setStatus] = useState<VerifyStatus>("loading");

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      return;
    }

    fetch(`/api/elearning/checkout/verify?reference=${encodeURIComponent(reference)}`)
      .then((res) => res.json())
      .then((data: { status?: string }) => {
        setStatus(data.status === "success" ? "success" : "failed");
      })
      .catch(() => setStatus("error"));
  }, [reference]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-brand-light px-4 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto animate-spin text-brand-blue" size={40} />
            <p className="mt-4 text-sm text-brand-muted">Verifying your payment...</p>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto text-green-600" size={40} />
            <h1 className="mt-4 font-display text-xl font-semibold text-brand-blue">Payment Successful</h1>
            <p className="mt-2 text-sm text-brand-muted">
              You&apos;re enrolled! Head to your dashboard to start learning.
            </p>
            <Link
              href="/e-learning/dashboard"
              className="mt-6 inline-block rounded-md bg-brand-orange px-6 py-3 text-sm font-medium text-white hover:bg-orange-600"
            >
              Go to Dashboard
            </Link>
          </>
        )}
        {(status === "failed" || status === "error") && (
          <>
            <XCircle className="mx-auto text-red-600" size={40} />
            <h1 className="mt-4 font-display text-xl font-semibold text-brand-blue">Payment Not Confirmed</h1>
            <p className="mt-2 text-sm text-brand-muted">
              We couldn&apos;t confirm your payment. If you were charged, contact us and we&apos;ll sort it out.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-brand-blue hover:border-brand-blue"
            >
              Contact Support
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
