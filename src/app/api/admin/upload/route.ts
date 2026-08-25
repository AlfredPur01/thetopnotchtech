import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:5000/api";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

async function getBackendToken() {
  const email = process.env.BACKEND_ADMIN_EMAIL;
  const password = process.env.BACKEND_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("BACKEND_ADMIN_EMAIL and BACKEND_ADMIN_PASSWORD must be configured");
  }

  const loginRes = await fetch(`${BACKEND_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!loginRes.ok) {
    const text = await loginRes.text();
    throw new Error(`Backend login failed: ${loginRes.status} ${text}`);
  }

  const data = (await loginRes.json()) as { token?: string };

  if (!data.token) {
    throw new Error("Backend login response did not include a token");
  }

  return data.token;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File is larger than 5MB" }, { status: 400 });
  }

  try {
    const token = await getBackendToken();
    const backendFormData = new FormData();
    backendFormData.append("file", file, file.name);

    const uploadRes = await fetch(`${BACKEND_API_URL}/media/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: backendFormData,
    });

    const payload = await uploadRes.json().catch(() => null);

    if (!uploadRes.ok) {
      return NextResponse.json(
        { error: payload?.error ?? "Upload failed" },
        { status: uploadRes.status }
      );
    }

    return NextResponse.json({ url: payload?.url ?? payload?.secure_url ?? "" });
  } catch (err: any) {
    console.error("Upload proxy error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to save uploaded file" },
      { status: 500 }
    );
  }
}
