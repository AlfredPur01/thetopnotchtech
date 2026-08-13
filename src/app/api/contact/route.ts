import { NextResponse } from "next/server";
import { backendFetch, BackendError } from "@/lib/server/backend-client";

interface ContactRequestBody {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
}

function isValidBody(body: Partial<ContactRequestBody>): body is ContactRequestBody {
  return (
    typeof body.fullName === "string" &&
    body.fullName.trim().length > 0 &&
    typeof body.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) &&
    typeof body.phoneNumber === "string" &&
    body.phoneNumber.trim().length >= 7 &&
    Array.isArray(body.services) &&
    body.services.length > 0 &&
    typeof body.message === "string" &&
    body.message.trim().length > 0
  );
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as Partial<ContactRequestBody>;

  if (!isValidBody(body)) {
    return NextResponse.json({ error: "Invalid inquiry submission." }, { status: 400 });
  }

  // The backend's contact_submissions table only has name/email/phone/subject/message —
  // fold the service/budget/timeline picks into the message body.
  try {
    await backendFetch("/contact", {
      method: "POST",
      body: JSON.stringify({
        name: body.fullName,
        email: body.email,
        phone: `${body.countryCode}${body.phoneNumber}`,
        subject: `Project inquiry: ${body.services.join(", ")}`.slice(0, 255),
        message: `Budget: ${body.budget}\nTimeline: ${body.timeline}\n\n${body.message}`,
      }),
    });
  } catch (error) {
    const status = error instanceof BackendError ? error.status : 502;
    return NextResponse.json({ error: "Failed to send inquiry. Please try again." }, { status });
  }

  return NextResponse.json({ success: true });
}
