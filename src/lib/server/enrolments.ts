import { backendFetch } from "@/lib/server/backend-client";
import { getStudentToken } from "@/lib/server/student-auth";

export interface EnrolmentCourse {
  id: string;
  title: string;
  slug: string;
  thumbnail_url: string | null;
  price: number;
  currency: "NGN" | "USD";
}

export interface Enrolment {
  id: string;
  status: "active" | "completed" | "cancelled";
  completed_at: string | null;
  created_at: string;
  courses: EnrolmentCourse | null;
}

/** The logged-in student's enrolments, or an empty list if not logged in. */
export async function getMyEnrolments(): Promise<Enrolment[]> {
  const token = await getStudentToken();
  if (!token) return [];

  try {
    const { enrolments } = await backendFetch<{ enrolments: Enrolment[] }>("/enrolments/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return enrolments;
  } catch {
    return [];
  }
}
