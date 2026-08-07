import { NextRequest, NextResponse } from "next/server";
import { deleteTestimonial, getTestimonialById, updateTestimonial, type Testimonial } from "@/lib/testimonials";

interface RouteParams {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const testimonial = await getTestimonialById(params.id);
  if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(testimonial);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const updates = (await request.json()) as Partial<Testimonial>;

  try {
    const updated = await updateTestimonial(params.id, updates);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  await deleteTestimonial(params.id);
  return NextResponse.json({ ok: true });
}
