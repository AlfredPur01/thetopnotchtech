import { Suspense } from "react";
import { PaymentCallback } from "@/components/elearning/PaymentCallback";

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={null}>
      <PaymentCallback />
    </Suspense>
  );
}
