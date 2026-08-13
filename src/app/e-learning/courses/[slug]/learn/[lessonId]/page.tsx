import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { PlayCircle, FileText, HelpCircle, Lock, ChevronRight } from "lucide-react";
import { getCourseBySlug } from "@/lib/courses";
import { getCurrentStudent } from "@/lib/server/student-auth";
import { getMyEnrolments } from "@/lib/server/enrolments";
import { getYouTubeVideoId } from "@/lib/youtube";
import { cn } from "@/lib/utils";
import { LessonCompleteButton } from "@/components/elearning/LessonCompleteButton";
import { YouTubePlayer } from "@/components/elearning/YouTubePlayer";

export const dynamic = "force-dynamic";

interface LessonPageProps {
  params: { slug: string; lessonId: string };
}

const TYPE_ICONS = { video: PlayCircle, article: FileText, quiz: HelpCircle };

export default async function LessonPage({ params }: LessonPageProps) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();

  const allLessons = course.modules.flatMap((mod) => mod.lessons);
  const currentLesson = allLessons.find((lesson) => lesson.id === params.lessonId);
  if (!currentLesson) notFound();

  const student = await getCurrentStudent();
  if (!student) {
    redirect(
      `/e-learning/login?returnTo=${encodeURIComponent(
        `/e-learning/courses/${params.slug}/learn/${params.lessonId}`
      )}`
    );
  }

  const enrolments = await getMyEnrolments();
  const isEnrolled = enrolments.some((e) => e.courses?.id === course.id);

  if (!isEnrolled && !currentLesson.isPreview) {
    redirect(`/e-learning/courses/${params.slug}`);
  }

  const currentIndex = allLessons.findIndex((lesson) => lesson.id === params.lessonId);
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const videoId =
    currentLesson.type === "video" && currentLesson.contentUrl
      ? getYouTubeVideoId(currentLesson.contentUrl)
      : null;

  return (
    <main className="bg-brand-light">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-brand-orange">
            <Link href={`/e-learning/courses/${params.slug}`} className="hover:underline">
              {course.title}
            </Link>
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold text-brand-blue sm:text-3xl">
            {currentLesson.title}
          </h1>

          <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
            {currentLesson.type === "video" && (
              <>
                {videoId && currentLesson.contentUrl ? (
                  <YouTubePlayer
                    videoId={videoId}
                    watchUrl={currentLesson.contentUrl}
                    title={currentLesson.title}
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-brand-navy text-white/70">
                    No video has been added to this lesson yet.
                  </div>
                )}
              </>
            )}

            {currentLesson.type === "article" && (
              <div className="p-8">
                {currentLesson.contentUrl ? (
                  <div
                    className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-brand-blue prose-a:text-brand-blue"
                    dangerouslySetInnerHTML={{ __html: currentLesson.contentUrl }}
                  />
                ) : (
                  <p className="text-sm text-brand-muted">This article hasn&apos;t been written yet.</p>
                )}
              </div>
            )}

            {currentLesson.type === "quiz" && (
              <div className="p-8 text-center">
                <HelpCircle className="mx-auto text-brand-muted" size={32} />
                <p className="mt-3 text-sm text-brand-muted">Quizzes are coming soon.</p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <LessonCompleteButton
              lessonId={currentLesson.id}
              nextHref={nextLesson ? `/e-learning/courses/${params.slug}/learn/${nextLesson.id}` : null}
            />
          </div>
        </div>

        <aside className="rounded-2xl bg-white p-4 shadow-sm lg:h-fit">
          <h2 className="px-2 py-2 font-display text-sm font-semibold text-brand-blue">Course Content</h2>
          <div className="space-y-4">
            {course.modules.map((mod) => (
              <div key={mod.id}>
                <p className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-brand-muted">
                  {mod.title}
                </p>
                <ul>
                  {mod.lessons.map((lesson) => {
                    const Icon = TYPE_ICONS[lesson.type];
                    const locked = !isEnrolled && !lesson.isPreview;
                    const isActive = lesson.id === currentLesson.id;

                    const content = (
                      <span
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-2 text-sm",
                          isActive
                            ? "bg-brand-blue text-white"
                            : locked
                              ? "text-gray-400"
                              : "text-brand-blue hover:bg-brand-light"
                        )}
                      >
                        {locked ? <Lock size={14} /> : <Icon size={14} />}
                        <span className="flex-1 truncate">{lesson.title}</span>
                        {!isActive && !locked && <ChevronRight size={14} />}
                      </span>
                    );

                    return (
                      <li key={lesson.id}>
                        {locked ? (
                          content
                        ) : (
                          <Link href={`/e-learning/courses/${params.slug}/learn/${lesson.id}`}>{content}</Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
