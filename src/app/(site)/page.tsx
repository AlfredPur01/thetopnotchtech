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
import { TestimonialsGrid, type Testimonial } from "@/components/ui/TestimonialsGrid";
import { FAQAccordion, type FAQItem } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";

const HOME_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Topnotch Tech transformed our brand and helped our online sales in just 6 months. Their team is incredible.",
    name: "David A.",
    role: "Founder, Odeumu",
    avatar: "/images/team/testimonial-david.jpg",
  },
  {
    quote:
      "The software they built streamlined our operations completely. Communication was smooth and results were amazing.",
    name: "Chinwe O.",
    role: "Operations Manager",
    avatar: "/images/team/testimonial-chinwe.jpg",
  },
  {
    quote:
      "Our new brand identity elevated our entire business. Customers immediately noticed the difference.",
    name: "Samuel T.",
    role: "CEO, Playvista",
    avatar: "/images/team/testimonial-samuel.jpg",
  },
];

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

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustedBy />
      <ServicesOverview />
      <WhyUs />
      <OurProcess />
      <Industries />
      <StatsBanner />
      <CaseStudiesPreview />
      <TestimonialsGrid id="testimonials" heading="What Our Clients Say" testimonials={HOME_TESTIMONIALS} />
      <TeamPreview />
      <LatestInsights />
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
