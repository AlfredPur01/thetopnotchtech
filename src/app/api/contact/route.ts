import { NextResponse } from "next/server";

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

  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Topnotch Tech <inquiries@topnotchtech.com>",
        to: "info@topnotchtech.com",
        subject: `New project inquiry from ${body.fullName}`,
        text: `${body.fullName} (${body.email}, ${body.countryCode}${body.phoneNumber}) is interested in: ${body.services.join(", ")}. Budget: ${body.budget}. Timeline: ${body.timeline}.\n\n${body.message}`,
      }),
    });
  } else {
    console.log("New contact inquiry:", body);
  }

  return NextResponse.json({ success: true });
}
