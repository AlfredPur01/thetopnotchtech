import { CourseForm } from "@/components/admin/courses/CourseForm";

export default function NewCoursePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-brand-blue">New Course</h1>
      <p className="mt-1 text-sm text-brand-muted">Add a new course to the catalog.</p>

      <div className="mt-6">
        <CourseForm />
      </div>
    </div>
  );
}
