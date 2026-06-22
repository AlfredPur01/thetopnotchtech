import { AboutELearningHero } from "@/components/elearning/AboutELearningHero";
import { AboutELearningStory } from "@/components/elearning/AboutELearningStory";
import { CTABanner } from "@/components/ui/CTABanner";

export default function AboutELearningPage() {
  return (
    <main>
      <AboutELearningHero />
      <AboutELearningStory />
      <CTABanner
        heading="Ready to start learning?"
        subtext="Join thousands of learners building real, practical skills."
        primaryLabel="Explore Courses"
        primaryHref="/e-learning/courses"
        variant="blue"
      />
    </main>
  );
}
