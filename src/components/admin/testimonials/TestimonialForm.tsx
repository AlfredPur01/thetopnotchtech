"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";
import type { Testimonial, TestimonialPlacement } from "@/lib/testimonials";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface TestimonialFormProps {
  initialTestimonial?: Testimonial;
}

const PLACEMENT_OPTIONS: { value: TestimonialPlacement; label: string }[] = [
  { value: "home", label: "Home Page" },
  { value: "contact", label: "Contact Page" },
];

const EMPTY_TESTIMONIAL: Testimonial = {
  id: "",
  quote: "",
  name: "",
  role: "",
  avatar: "",
  placements: [],
};

export function TestimonialForm({ initialTestimonial }: TestimonialFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialTestimonial);
  const [testimonial, setTestimonial] = useState<Testimonial>(initialTestimonial ?? EMPTY_TESTIMONIAL);
  const [idTouched, setIdTouched] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof Testimonial>(key: K, value: Testimonial[K]) {
    setTestimonial((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    update("name", name);
    if (!idTouched) update("id", slugify(name));
  }

  function togglePlacement(placement: TestimonialPlacement) {
    const placements = testimonial.placements.includes(placement)
      ? testimonial.placements.filter((p) => p !== placement)
      : [...testimonial.placements, placement];
    update("placements", placements);
  }

  async function handleSubmit() {
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch(
        isEditing ? `/api/admin/testimonials/${initialTestimonial!.id}` : "/api/admin/testimonials",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testimonial),
        }
      );

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Failed to save testimonial");
        return;
      }

      router.push("/admin/testimonials");
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-sm lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-brand-blue">Name</label>
          <input
            type="text"
            value={testimonial.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-blue">Role / Company</label>
          <input
            type="text"
            value={testimonial.role}
            onChange={(e) => update("role", e.target.value)}
            placeholder="Founder, Company"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-brand-blue">Quote</label>
          <textarea
            value={testimonial.quote}
            onChange={(e) => update("quote", e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="lg:col-span-2">
          <ImageUploadField label="Avatar" value={testimonial.avatar} onChange={(url) => update("avatar", url)} />
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-brand-blue">Show On</label>
          <div className="mt-2 flex flex-wrap gap-4">
            {PLACEMENT_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center gap-2 text-sm text-brand-blue">
                <input
                  type="checkbox"
                  checked={testimonial.placements.includes(option.value)}
                  onChange={() => togglePlacement(option.value)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={isSaving || !testimonial.name || !testimonial.quote}
          onClick={handleSubmit}
          className="rounded-md bg-brand-orange px-6 py-3 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Create Testimonial"}
        </button>
      </div>
    </div>
  );
}
