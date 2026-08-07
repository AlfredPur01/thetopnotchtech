"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error ?? "Upload failed");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-brand-blue">{label}</label>

      <div className="mt-2 flex items-center gap-4">
        {value ? (
          <div className="relative h-20 w-28 overflow-hidden rounded-lg border border-gray-200">
            <Image src={value} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
              aria-label="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="flex h-20 w-28 items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-400">
            <Upload size={20} />
          </div>
        )}

        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-brand-blue transition-colors duration-200 hover:border-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? "Uploading..." : value ? "Replace Image" : "Upload Image"}
          </button>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
