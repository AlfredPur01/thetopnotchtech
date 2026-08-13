import { PricingHero } from "@/components/elearning/PricingHero";
import { PricingOverview } from "@/components/elearning/PricingOverview";
import { FAQAccordion, type FAQItem } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { getCourses } from "@/lib/courses";

export const dynamic = "force-dynamic";

const PRICING_FAQ: FAQItem[] = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept card payments and bank transfers in Nigerian Naira.",
  },
  {
    question: "Do you offer discounts for teams?",
    answer:
      "Yes. If you're enrolling multiple people from the same organization, contact us for bulk pricing.",
  },
  {
    question: "Can I get a refund if a course isn't right for me?",
    answer:
      "Yes, within the terms of our refund policy. See our Refund Policy page for full details.",
  },
  {
    question: "Will prices change after I purchase a course?",
    answer:
      "No. Once you've purchased a course, your access and price are locked in regardless of future price changes.",
  },
];

export default async function PricingPage() {
  const courses = await getCourses();

  return (
    <main>
      <PricingHero courses={courses} />
      <PricingOverview />
      <FAQAccordion id="pricing-faq" heading="Pricing Questions" items={PRICING_FAQ} />
      <CTABanner
        heading="Ready to invest in your skills?"
        subtext="Browse our courses and find the one that fits your goals and budget."
        primaryLabel="Browse Courses"
        primaryHref="/e-learning/courses"
        variant="orange"
      />
    </main>
  );
}
