import { notFound } from "next/navigation";
import { getTestimonialById } from "@/lib/testimonials";
import { TestimonialForm } from "@/components/admin/testimonials/TestimonialForm";

interface EditTestimonialPageProps {
  params: { id: string };
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const testimonial = await getTestimonialById(params.id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-brand-blue">Edit Testimonial</h1>
      <p className="mt-1 text-sm text-brand-muted">{testimonial.name}</p>

      <div className="mt-6">
        <TestimonialForm initialTestimonial={testimonial} />
      </div>
    </div>
  );
}
