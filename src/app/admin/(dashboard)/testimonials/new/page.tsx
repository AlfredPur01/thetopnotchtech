import { TestimonialForm } from "@/components/admin/testimonials/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-brand-blue">New Testimonial</h1>
      <p className="mt-1 text-sm text-brand-muted">Add a client quote to display on the site.</p>

      <div className="mt-6">
        <TestimonialForm />
      </div>
    </div>
  );
}
