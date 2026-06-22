import { FAQsHero } from "@/components/elearning/FAQsHero";
import { FAQAccordion, type FAQItem } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";

const GETTING_STARTED_FAQ: FAQItem[] = [
  {
    question: "How do I enroll in a course?",
    answer: "Create an account, choose a course, and complete payment to get instant access.",
  },
  {
    question: "Do I need any special software?",
    answer: "No. You just need a device with a browser and an internet connection.",
  },
];

const PAYMENTS_FAQ: FAQItem[] = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept card payments and bank transfers in Nigerian Naira.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, within 7 days of purchase if you've completed less than 20% of the course. See our Refund Policy for full details.",
  },
];

const COURSES_FAQ: FAQItem[] = [
  {
    question: "How long do I have access to a course?",
    answer:
      "For the duration listed on the course page — most courses include lifetime access.",
  },
  {
    question: "Do I get a certificate?",
    answer: "Yes, once you complete all lessons and any required assessments in a course.",
  },
  {
    question: "Can I contact my instructor?",
    answer: "Yes, you can reach out through the platform for guidance on course content.",
  },
];

export default function ELearningFAQsPage() {
  return (
    <main>
      <FAQsHero />
      <FAQAccordion id="getting-started-faq" heading="Getting Started" items={GETTING_STARTED_FAQ} />
      <FAQAccordion id="payments-faq" heading="Payments & Refunds" items={PAYMENTS_FAQ} />
      <FAQAccordion id="courses-faq" heading="Courses & Certificates" items={COURSES_FAQ} />
      <CTABanner
        heading="Still have questions?"
        subtext="Our team is happy to help with anything not covered here."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        variant="navy"
      />
    </main>
  );
}
