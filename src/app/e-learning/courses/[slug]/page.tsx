import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCourseBySlug } from "@/lib/courses";
import { getCurrentStudent } from "@/lib/server/student-auth";
import { getMyEnrolments } from "@/lib/server/enrolments";
import { EnrollButton } from "@/components/elearning/EnrollButton";
import { BLUR_DATA_URL } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface CourseDetailPageProps {
  params: { slug: string };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();

  const student = await getCurrentStudent();
  const enrolments = student ? await getMyEnrolments() : [];
  const alreadyEnrolled = enrolments.some((e) => e.courses?.id === course.id);
  const totalLessons = course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);

  return (
    <main>
      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-brand-orange">
              {course.category}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{course.title}</h1>
            <p className="mt-4 max-w-2xl text-white/80">{course.description}</p>

            <div className="mt-6 flex items-center gap-3">
              {course.instructor.avatar ? (
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  width={40}
                  height={40}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <span className="h-10 w-10 rounded-full bg-white/10" />
              )}
              <div>
                <p className="text-sm font-medium">{course.instructor.name}</p>
                <p className="text-xs text-white/60">{course.instructor.title}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-3 text-sm text-white/70">
              <span className="capitalize">{course.level}</span>
              <span>&middot;</span>
              <span>
                {course.modules.length} {course.modules.length === 1 ? "module" : "modules"}
              </span>
              <span>&middot;</span>
              <span>
                {totalLessons} {totalLessons === 1 ? "lesson" : "lessons"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 text-brand-blue shadow-lg">
            {course.image && (
              <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              </div>
            )}
            <p className="font-display text-3xl font-semibold">
              {course.price === 0 ? "Free" : `₦${course.price.toLocaleString("en-NG")}`}
            </p>
            <EnrollButton
              courseId={course.id}
              courseSlug={course.slug}
              price={course.price}
              currency={course.currency}
              isLoggedIn={Boolean(student)}
              alreadyEnrolled={alreadyEnrolled}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-brand-blue">Curriculum</h2>
          {course.modules.length === 0 ? (
            <p className="mt-6 text-sm text-brand-muted">Curriculum coming soon.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {course.modules.map((mod) => (
                <div key={mod.id} className="overflow-hidden rounded-xl border border-gray-200">
                  <div className="border-b border-gray-200 bg-brand-light px-5 py-3 font-medium text-brand-blue">
                    {mod.title}
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {mod.lessons.map((lesson) => {
                      const canOpen = alreadyEnrolled || lesson.isPreview;
                      const row = (
                        <span className="flex items-center justify-between px-5 py-3 text-sm">
                          <span className={canOpen ? "text-brand-blue" : "text-brand-muted"}>{lesson.title}</span>
                          <span className="text-xs uppercase tracking-wide text-brand-muted">
                            {lesson.isPreview ? "Preview" : lesson.type}
                          </span>
                        </span>
                      );
                      return (
                        <li key={lesson.id}>
                          {canOpen ? (
                            <Link
                              href={`/e-learning/courses/${course.slug}/learn/${lesson.id}`}
                              className="block hover:bg-brand-light"
                            >
                              {row}
                            </Link>
                          ) : (
                            row
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
