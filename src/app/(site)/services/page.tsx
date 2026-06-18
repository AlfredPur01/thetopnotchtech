import { Code2, Megaphone, Palette } from "lucide-react";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceBlock } from "@/components/services/ServiceBlock";
import { CTABanner } from "@/components/ui/CTABanner";

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />

      <ServiceBlock
        id="digital-marketing"
        number="01"
        icon={<Megaphone size={20} />}
        title="Digital Marketing Acceleration"
        description="We develop data-driven marketing strategies that help you attract the right audience, convert leads, and grow sustainably."
        benefits={[
          "Increased brand visibility",
          "Better conversions & sales",
          "Higher-quality traffic",
          "Stronger customer engagement",
        ]}
        process={[
          "Discovery & Research",
          "Strategy Development",
          "Campaign Setup",
          "Optimization & Reporting",
        ]}
        stats={[
          { value: "3x", label: "More Traffic" },
          { value: "200%", label: "Lead Growth" },
          { value: "58%", label: "Conversion Rate" },
        ]}
        image="/images/services/digital-marketing-acceleration.jpg"
        imageLabel="Data Driving Market"
        ctaLabel="Boost Your Growth Today"
        ctaHref="/contact"
        imagePosition="right"
      />

      <ServiceBlock
        id="software-development"
        number="02"
        icon={<Code2 size={20} />}
        title="High-Performance Software Development"
        description="From websites to mobile apps and enterprise platforms, we build software that performs, scales, and delivers value."
        benefits={[
          "Custom-built solutions",
          "Scalable architecture",
          "Fast, responsive, and secure",
          "Seamless user experience",
        ]}
        process={[
          "Requirement Gathering",
          "UI/UX Design",
          "Development & Testing",
          "Deployment & Maintenance",
        ]}
        stats={[
          { value: "Secure", label: "Built with best security practices" },
          { value: "Scalable", label: "Architecture that grows with you" },
          { value: "Reliable", label: "Tested, optimized & future-ready" },
        ]}
        image="/images/services/software-development.jpg"
        imageLabel="Custom Software Code"
        ctaLabel="Build Your Product Today"
        ctaHref="/contact"
        imagePosition="left"
      />

      <ServiceBlock
        id="branding-identity"
        number="03"
        icon={<Palette size={20} />}
        title="Unforgettable Branding & Identity"
        description="Your brand is your identity. We create brands that attract, connect, and convert."
        benefits={[
          "Strong visual identity",
          "Increased customer trust",
          "Clear messaging",
          "Competitive positioning",
        ]}
        process={[
          "Brand Discovery & Strategy",
          "Logo & Identity Development",
          "Brand Messaging & Guidelines",
          "Launch Support",
        ]}
        stats={[
          { value: "Stronger", label: "Brand Recall" },
          { value: "More", label: "Engagement" },
          { value: "Higher", label: "Customer Loyalty" },
        ]}
        image="/images/services/branding-identity.jpg"
        imageLabel="Brand Identity Design"
        ctaLabel="Create Your Brand Identity"
        ctaHref="/contact"
        imagePosition="right"
      />

      <CTABanner
        heading="Let's Build Something Amazing Together"
        subtext="Tell us your goals and we'll craft a solution that drives real results for your business."
        primaryLabel="Book Free Consultation"
        primaryHref="/contact"
        secondaryLabel="View Case Studies"
        secondaryHref="/case-studies"
        variant="navy"
      />
    </main>
  );
}
