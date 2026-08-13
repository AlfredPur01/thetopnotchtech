import { Suspense } from "react";
import { CoursesHero } from "@/components/elearning/CoursesHero";
import { CoursesCatalog } from "@/components/elearning/CoursesCatalog";
import { CTABanner } from "@/components/ui/CTABanner";
import { getCourses } from "@/lib/courses";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main>
      <CoursesHero />
      <Suspense fallback={null}>
        <CoursesCatalog courses={courses} />
      </Suspense>
      <CTABanner
        heading="Can't find the right course?"
        subtext="Tell us what skill you want to build and we'll point you in the right direction."
        primaryLabel="Talk to Us"
        primaryHref="/contact"
        variant="blue"
      />
    </main>
  );
}
