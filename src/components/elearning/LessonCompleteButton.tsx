"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

interface LessonCompleteButtonProps {
  lessonId: string;
  nextHref: string | null;
}

export function LessonCompleteButton({ lessonId, nextHref }: LessonCompleteButtonProps) {
  const router = useRouter();
  const [isDone, setIsDone] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function handleComplete() {
    setIsSaving(true);
    try {
      await fetch(`/api/elearning/lessons/${lessonId}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_completed: true }),
      });
      setIsDone(true);
      if (nextHref) {
        router.push(nextHref);
      }
    } finally {
      setIsSaving(false);
    }
  }

  if (isDone && !nextHref) {
    return (
      <span className="inline-flex items-center gap-2 rounded-md bg-green-100 px-4 py-2.5 text-sm font-medium text-green-700">
        <CheckCircle2 size={16} /> Completed
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleComplete}
      disabled={isSaving}
      className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-orange-600 disabled:opacity-60"
    >
      <CheckCircle2 size={16} />
      {isSaving ? "Saving..." : nextHref ? "Complete & Next" : "Mark Complete"}
    </button>
  );
}
