import { InstructorsHero } from "@/components/elearning/InstructorsHero";
import { InstructorsGrid } from "@/components/elearning/InstructorsGrid";
import { CTABanner } from "@/components/ui/CTABanner";

export default function InstructorsPage() {
  return (
    <main>
      <InstructorsHero />
      <InstructorsGrid />
      <CTABanner
        heading="Want to teach with us?"
        subtext="We're always looking for practitioners to share their expertise with our learners."
        primaryLabel="Get In Touch"
        primaryHref="mailto:careers@topnotchtech.com?subject=Instructor%20Application"
        variant="navy"
      />
    </main>
  );
}
