import { backendFetch } from "@/lib/server/backend-client";

export type TestimonialPlacement = "home" | "contact";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  placements: TestimonialPlacement[];
}

// ---------------------------------------------------------------------------
// Backend <-> frontend mapping. The admin UI here has no rating/status/company
// concept, so every testimonial created from this app is always published
// with a default rating (backend requires one, but nothing surfaces it).
// ---------------------------------------------------------------------------

interface BackendTestimonial {
  id: string;
  author_name: string;
  author_title: string | null;
  author_avatar: string | null;
  quote: string;
  status: "draft" | "published";
  placements: TestimonialPlacement[];
}

const DEFAULT_RATING = 5;

function fromBackend(row: BackendTestimonial): Testimonial {
  return {
    id: row.id,
    quote: row.quote,
    name: row.author_name,
    role: row.author_title ?? "",
    avatar: row.author_avatar ?? "",
    placements: row.placements ?? [],
  };
}

function toBackendPayload(testimonial: Partial<Testimonial>) {
  return {
    ...(testimonial.name !== undefined && { author_name: testimonial.name }),
    ...(testimonial.role !== undefined && { author_title: testimonial.role }),
    ...(testimonial.avatar !== undefined && testimonial.avatar && { author_avatar: testimonial.avatar }),
    ...(testimonial.quote !== undefined && { quote: testimonial.quote }),
    ...(testimonial.placements !== undefined && { placements: testimonial.placements }),
    rating: DEFAULT_RATING,
    status: "published" as const,
  };
}

async function listBackendTestimonials(): Promise<BackendTestimonial[]> {
  const { testimonials } = await backendFetch<{ testimonials: BackendTestimonial[] }>("/testimonials");
  return testimonials;
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const testimonials = await listBackendTestimonials();
  return testimonials.map(fromBackend);
}

export async function getTestimonialsByPlacement(placement: TestimonialPlacement): Promise<Testimonial[]> {
  const testimonials = await getAllTestimonials();
  return testimonials.filter((testimonial) => testimonial.placements.includes(placement));
}

export async function getTestimonialById(id: string): Promise<Testimonial | undefined> {
  const testimonials = await listBackendTestimonials();
  const match = testimonials.find((t) => t.id === id);
  return match ? fromBackend(match) : undefined;
}

export async function createTestimonial(testimonial: Testimonial): Promise<Testimonial> {
  const { testimonial: created } = await backendFetch<{ testimonial: BackendTestimonial }>("/testimonials", {
    method: "POST",
    auth: true,
    body: JSON.stringify(toBackendPayload(testimonial)),
  });
  return fromBackend(created);
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial> {
  const { testimonial: updated } = await backendFetch<{ testimonial: BackendTestimonial }>(`/testimonials/${id}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify(toBackendPayload(updates)),
  });
  return fromBackend(updated);
}

export async function deleteTestimonial(id: string): Promise<void> {
  await backendFetch(`/testimonials/${id}`, { method: "DELETE", auth: true });
}
