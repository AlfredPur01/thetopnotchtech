import { createContentStore } from "@/lib/server/content-store";

export type TestimonialPlacement = "home" | "contact";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  placements: TestimonialPlacement[];
}

const store = createContentStore<Testimonial>("testimonials.json", "id");

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return store.getAll();
}

export async function getTestimonialsByPlacement(
  placement: TestimonialPlacement
): Promise<Testimonial[]> {
  const testimonials = await store.getAll();
  return testimonials.filter((testimonial) => testimonial.placements.includes(placement));
}

export async function getTestimonialById(id: string): Promise<Testimonial | undefined> {
  return store.getByKey(id);
}

export async function createTestimonial(testimonial: Testimonial): Promise<Testimonial> {
  return store.create(testimonial);
}

export async function updateTestimonial(
  id: string,
  updates: Partial<Testimonial>
): Promise<Testimonial> {
  return store.update(id, updates);
}

export async function deleteTestimonial(id: string): Promise<void> {
  return store.remove(id);
}
