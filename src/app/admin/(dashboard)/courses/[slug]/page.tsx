import { notFound } from "next/navigation";
import { getCourseBySlugForAdmin } from "@/lib/courses";
import { CourseForm } from "@/components/admin/courses/CourseForm";
import { CurriculumEditor } from "@/components/admin/courses/CurriculumEditor";

export const dynamic = "force-dynamic";

interface EditCoursePageProps {
  params: { slug: string };
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const course = await getCourseBySlugForAdmin(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-brand-blue">Edit Course</h1>
      <p className="mt-1 text-sm text-brand-muted">{course.title}</p>

      <div className="mt-6 space-y-6">
        <CourseForm initialCourse={course} />
        <CurriculumEditor courseId={course.id} modules={course.modules} />
      </div>
    </div>
  );
}
