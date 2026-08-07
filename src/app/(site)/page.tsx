import { HeroSection } from "@/components/home/HeroSection";
import { TrustedBy } from "@/components/home/TrustedBy";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyUs } from "@/components/home/WhyUs";
import { OurProcess } from "@/components/home/OurProcess";
import { Industries } from "@/components/home/Industries";
import { StatsBanner } from "@/components/home/StatsBanner";
import { CaseStudiesPreview } from "@/components/home/CaseStudiesPreview";
import { TeamPreview } from "@/components/home/TeamPreview";
import { LatestInsights } from "@/components/home/LatestInsights";
import { TestimonialsGrid } from "@/components/ui/TestimonialsGrid";
import { FAQAccordion, type FAQItem } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { getCaseStudies } from "@/lib/case-studies";
import { getBlogPosts } from "@/lib/blog";
import { getTestimonialsByPlacement } from "@/lib/testimonials";

const HOME_FAQ_ITEMS: FAQItem[] = [
  {
    question: "How much does a website cost?",
    answer:
      "Pricing depends on scope — a brochure site starts lower than a custom platform with integrations. After a discovery call, we send a fixed-price proposal so there are no surprises.",
  },
  {
    question: "How long does it take to complete a project?",
    answer:
      "Most websites take 3-6 weeks and software projects take 6-12 weeks depending on complexity. We'll give you a realistic timeline during our strategy call.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes. Every project includes a support window after launch, and we offer monthly maintenance plans for updates, monitoring, and improvements.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Absolutely. We audit your current site, identify what's holding back conversions and performance, and rebuild it with a modern, scalable foundation.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Yes, startups and SMEs are who we build for. We offer tailored packages that match early-stage budgets without compromising on quality.",
  },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [caseStudies, blogPosts, testimonials] = await Promise.all([
    getCaseStudies(),
    getBlogPosts(),
    getTestimonialsByPlacement("home"),
  ]);

  return (
    <main>
      <HeroSection />
      <TrustedBy />
      <ServicesOverview />
      <WhyUs />
      <OurProcess />
      <Industries />
      <StatsBanner />
      <CaseStudiesPreview caseStudies={caseStudies} />
      <TestimonialsGrid id="testimonials" heading="What Our Clients Say" testimonials={testimonials} />
      <TeamPreview />
      <LatestInsights posts={blogPosts} />
      <FAQAccordion id="faq" heading="Frequently Asked Questions" items={HOME_FAQ_ITEMS} />
      <CTABanner
        heading="Ready To Grow Your Business?"
        subtext="Whether you need marketing, software development, or branding, we'll help you build, launch, and scale with confidence."
        primaryLabel="Book Free Consultation"
        primaryHref="/contact"
        secondaryLabel="View Our Work"
        secondaryHref="/case-studies"
        variant="orange"
      />
    </main>
  );
}
