import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllTestimonials } from "@/lib/testimonials";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsListPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand-blue">Testimonials</h1>
          <p className="mt-1 text-sm text-brand-muted">Client quotes shown across the site.</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 rounded-md bg-brand-orange px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
        >
          <Plus size={16} /> New Testimonial
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
        {testimonials.length === 0 ? (
          <p className="p-8 text-center text-sm text-brand-muted">
            No testimonials yet. Create your first one to get started.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-xs uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Quote</th>
                <th className="px-6 py-3 font-medium">Shown On</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id}>
                  <td className="px-6 py-4 font-medium text-brand-blue">
                    {testimonial.name}
                    <p className="text-xs font-normal text-brand-muted">{testimonial.role}</p>
                  </td>
                  <td className="max-w-sm truncate px-6 py-4 text-brand-muted">{testimonial.quote}</td>
                  <td className="px-6 py-4 text-brand-muted capitalize">
                    {testimonial.placements.length > 0 ? testimonial.placements.join(", ") : "Not shown"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/testimonials/${testimonial.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-brand-light hover:text-brand-blue"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteButton
                        deleteUrl={`/api/admin/testimonials/${testimonial.id}`}
                        confirmMessage={`Delete testimonial from "${testimonial.name}"? This cannot be undone.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
