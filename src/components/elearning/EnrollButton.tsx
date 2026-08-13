"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EnrollButtonProps {
  courseId: string;
  courseSlug: string;
  price: number;
  currency: "NGN" | "USD";
  isLoggedIn: boolean;
  alreadyEnrolled: boolean;
}

export function EnrollButton({
  courseId,
  courseSlug,
  price,
  currency,
  isLoggedIn,
  alreadyEnrolled,
}: EnrollButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (alreadyEnrolled) {
    return (
      <button
        type="button"
        onClick={() => router.push("/e-learning/dashboard")}
        className="mt-4 w-full rounded-md bg-green-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-green-700"
      >
        Go to Dashboard
      </button>
    );
  }

  async function handleClick() {
    setError(null);

    if (!isLoggedIn) {
      router.push(`/e-learning/login?returnTo=${encodeURIComponent(`/e-learning/courses/${courseSlug}`)}`);
      return;
    }

    setIsLoading(true);
    try {
      if (price === 0) {
        const res = await fetch("/api/elearning/enrolments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ course_id: courseId }),
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as { error?: string } | null;
          throw new Error(body?.error ?? "Failed to enrol");
        }
        router.push("/e-learning/dashboard");
        router.refresh();
      } else {
        const res = await fetch("/api/elearning/checkout/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ course_id: courseId, currency }),
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as { error?: string } | null;
          throw new Error(body?.error ?? "Failed to start checkout");
        }
        const { authorization_url } = (await res.json()) as { authorization_url: string };
        window.location.href = authorization_url;
      }
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="w-full rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600 disabled:opacity-60"
      >
        {isLoading ? "Please wait..." : price === 0 ? "Enrol for Free" : "Buy Now"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
