import { CaseStudiesHero } from "@/components/case-studies/CaseStudiesHero";
import { CaseStudiesList } from "@/components/case-studies/CaseStudiesList";
import { CTABanner } from "@/components/ui/CTABanner";
import { CASE_STUDIES } from "@/lib/case-studies";

export default function CaseStudiesPage() {
  return (
    <main>
      <CaseStudiesHero />
      <CaseStudiesList caseStudies={CASE_STUDIES} />
      <CTABanner
        heading="Ready to be our next success story?"
        subtext="Let's build something amazing together and drive measurable growth for your business."
        primaryLabel="Start Your Project Today"
        primaryHref="/contact"
        secondaryLabel="Schedule a Free Consultation"
        secondaryHref="/contact#contact-form"
        variant="blue"
      />
    </main>
  );
}
