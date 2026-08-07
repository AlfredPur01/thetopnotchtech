"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  deleteUrl: string;
  confirmMessage: string;
}

export function DeleteButton({ deleteUrl, confirmMessage }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm(confirmMessage)) return;

    setIsDeleting(true);
    try {
      await fetch(deleteUrl, { method: "DELETE" });
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label="Delete"
      className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
    >
      <Trash2 size={16} />
    </button>
  );
}
