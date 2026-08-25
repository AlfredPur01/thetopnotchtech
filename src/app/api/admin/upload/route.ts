import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

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

  const extension = path.extname(file.name) || `.${file.type.split("/")[1]}`;
  const fileName = `${nanoid()}${extension}`;
  try {
    // Ensure upload directory exists and write the file.
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(UPLOAD_DIR, fileName), buffer);

    return NextResponse.json({ url: `/uploads/${fileName}` });
  } catch (err: any) {
    // Log the error server-side for diagnostics.
    // In production hosts with read-only filesystems (Vercel, some serverless
    // platforms), writing to `public/uploads` will fail — return a clear
    // message so the frontend user sees why uploads don't work.
    console.error("Upload error:", err);

    const isReadonlyFs = /EACCES|EPERM|EROFS|read-only file system/i.test(String(err?.code ?? err?.message ?? ""));

    if (process.env.NODE_ENV === "production" && isReadonlyFs) {
      return NextResponse.json({ error: "Server filesystem is read-only in production — configure external uploads (S3) or use the backend to store images)." }, { status: 500 });
    }

    return NextResponse.json({ error: "Failed to save uploaded file" }, { status: 500 });
  }
}
