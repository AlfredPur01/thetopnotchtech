import { ELearningHero } from "@/components/elearning/ELearningHero";
import { PopularCourses } from "@/components/elearning/PopularCourses";
import { WhyLearnWithUs } from "@/components/elearning/WhyLearnWithUs";
import { CategoryTabs } from "@/components/elearning/CategoryTabs";
import { TestimonialStatsBanner } from "@/components/elearning/TestimonialStatsBanner";
import { ReadyToTransformBanner } from "@/components/elearning/ReadyToTransformBanner";
import { HowItWorks } from "@/components/elearning/HowItWorks";
import { CTABanner } from "@/components/ui/CTABanner";

export default function ELearningPage() {
  return (
    <main>
      <ELearningHero />
      <PopularCourses />
      <WhyLearnWithUs />
      <CategoryTabs />
      <TestimonialStatsBanner />
      <ReadyToTransformBanner />
      <HowItWorks />
      <CTABanner
        heading="Still Have Questions?"
        subtext="We're here to help you on your learning journey."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        variant="navy"
      />
    </main>
  );
}
