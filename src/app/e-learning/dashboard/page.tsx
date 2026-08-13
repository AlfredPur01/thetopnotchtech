import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { getCurrentStudent } from "@/lib/server/student-auth";
import { getMyEnrolments } from "@/lib/server/enrolments";
import { BLUR_DATA_URL } from "@/lib/utils";
import { LogoutButton } from "@/components/elearning/LogoutButton";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  active: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default async function DashboardPage() {
  const student = await getCurrentStudent();
  if (!student) {
    redirect("/e-learning/login?returnTo=/e-learning/dashboard");
  }

  const enrolments = await getMyEnrolments();

  return (
    <main className="bg-brand-light py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-brand-blue sm:text-3xl">
              Welcome back, {student.name.split(" ")[0]}
            </h1>
            <p className="mt-1 text-sm text-brand-muted">Your enrolled courses.</p>
          </div>
          <LogoutButton />
        </div>

        {enrolments.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm">
            <GraduationCap className="mx-auto text-brand-muted" size={40} />
            <p className="mt-4 text-sm text-brand-muted">
              You haven&apos;t enrolled in any courses yet.
            </p>
            <Link
              href="/e-learning/courses"
              className="mt-6 inline-block rounded-md bg-brand-orange px-6 py-3 text-sm font-medium text-white hover:bg-orange-600"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enrolments.map((enrolment) => (
              <Link
                key={enrolment.id}
                href={enrolment.courses ? `/e-learning/courses/${enrolment.courses.slug}` : "#"}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div className="relative aspect-video bg-brand-light">
                  {enrolment.courses?.thumbnail_url ? (
                    <Image
                      src={enrolment.courses.thumbnail_url}
                      alt={enrolment.courses.title}
                      fill
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-brand-muted">
                      <GraduationCap size={28} />
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold text-brand-blue">
                    {enrolment.courses?.title ?? "Course"}
                  </h3>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-brand-orange">
                    {STATUS_LABELS[enrolment.status] ?? enrolment.status}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
