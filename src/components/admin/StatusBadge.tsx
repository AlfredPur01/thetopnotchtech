import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: "draft" | "published" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
      )}
    >
      {status}
    </span>
  );
}
