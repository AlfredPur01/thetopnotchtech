import { HowItWorksHero } from "@/components/elearning/HowItWorksHero";
import { HowItWorks } from "@/components/elearning/HowItWorks";
import { FAQAccordion, type FAQItem } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";

const HOW_IT_WORKS_FAQ: FAQItem[] = [
  {
    question: "How long do I have access to a course?",
    answer:
      "Once you purchase a course, you have access to it for the duration listed on the course page, so you can revisit lessons whenever you need to.",
  },
  {
    question: "Can I learn on my phone?",
    answer:
      "Yes. Our platform works on any device with a browser, so you can learn on your phone, tablet, or computer.",
  },
  {
    question: "Do I need any prior experience?",
    answer:
      "It depends on the course. Each course page lists its level (beginner, intermediate, or advanced) so you can choose the right starting point.",
  },
  {
    question: "What if I get stuck on a lesson?",
    answer:
      "You can reach out to our support team or your instructor through the platform, and we'll help you get unstuck.",
  },
  {
    question: "How do certificates work?",
    answer:
      "When you complete all lessons and any required assessments in a course, you'll receive a verifiable certificate you can share or add to your CV.",
  },
];

export default function HowItWorksPage() {
  return (
    <main>
      <HowItWorksHero />
      <HowItWorks />
      <FAQAccordion id="how-it-works-faq" heading="Common Questions" items={HOW_IT_WORKS_FAQ} />
      <CTABanner
        heading="Ready to get started?"
        subtext="Pick a course and start building a skill you can actually use."
        primaryLabel="Explore Courses"
        primaryHref="/e-learning/courses"
        variant="orange"
      />
    </main>
  );
}
