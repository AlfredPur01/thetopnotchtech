import { InstructorsHero } from "@/components/elearning/InstructorsHero";
import { InstructorsGrid } from "@/components/elearning/InstructorsGrid";
import { CTABanner } from "@/components/ui/CTABanner";
import { getInstructors } from "@/lib/instructors";

export const dynamic = "force-dynamic";

export default async function InstructorsPage() {
  const instructors = await getInstructors();

  return (
    <main>
      <InstructorsHero />
      <InstructorsGrid instructors={instructors} />
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
