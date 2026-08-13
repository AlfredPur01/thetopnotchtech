import { NextResponse } from "next/server";
import { getCurrentStudent } from "@/lib/server/student-auth";

export async function GET(): Promise<NextResponse> {
  const user = await getCurrentStudent();
  return NextResponse.json({ user });
}
