"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    await fetch("/api/elearning/auth/logout", { method: "POST" });
    router.push("/e-learning");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-brand-blue hover:border-brand-blue disabled:opacity-60"
    >
      {isLoading ? "Logging out..." : "Log Out"}
    </button>
  );
}
