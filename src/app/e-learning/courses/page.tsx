import { Suspense } from "react";
import { CoursesHero } from "@/components/elearning/CoursesHero";
import { CoursesCatalog } from "@/components/elearning/CoursesCatalog";
import { CTABanner } from "@/components/ui/CTABanner";

export default function CoursesPage() {
  return (
    <main>
      <CoursesHero />
      <Suspense fallback={null}>
        <CoursesCatalog />
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
