import { NextRequest, NextResponse } from "next/server";
import { createTestimonial, getAllTestimonials, type Testimonial } from "@/lib/testimonials";

export async function GET() {
  const testimonials = await getAllTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(request: NextRequest) {
  const testimonial = (await request.json()) as Testimonial;

  if (!testimonial.id || !testimonial.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const created = await createTestimonial(testimonial);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 409 });
  }
}
