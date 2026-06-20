import { CareersHero } from "@/components/careers/CareersHero";
import { WhyWorkWithUs } from "@/components/careers/WhyWorkWithUs";
import { OpenRoles } from "@/components/careers/OpenRoles";
import { CultureSection } from "@/components/careers/CultureSection";
import { CTABanner } from "@/components/ui/CTABanner";

export default function CareersPage() {
  return (
    <main>
      <CareersHero />
      <WhyWorkWithUs />
      <OpenRoles />
      <CultureSection />
      <CTABanner
        heading="Don't see your role?"
        subtext="We're always happy to hear from talented people. Send us your CV and tell us how you'd like to contribute."
        primaryLabel="Send an Open Application"
        primaryHref="mailto:careers@topnotchtech.com?subject=Open%20Application"
        variant="orange"
      />
    </main>
  );
}
