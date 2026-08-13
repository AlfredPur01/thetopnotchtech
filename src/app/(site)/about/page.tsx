import { AboutHero } from "@/components/about/AboutHero";
import { CoreValues } from "@/components/about/CoreValues";
import { TeamGrid } from "@/components/about/TeamGrid";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { CTABanner } from "@/components/ui/CTABanner";
import { getTeamMembers } from "@/lib/team";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const members = await getTeamMembers();

  return (
    <main>
      <AboutHero />
      <CoreValues />
      <TeamGrid members={members} />
      <WhyChooseUs />
      <CTABanner
        heading="Ready to elevate your business?"
        subtext="Let's turn your ideas into impactful digital solutions."
        primaryLabel="Let's Build Together"
        primaryHref="/contact"
        variant="blue"
      />
    </main>
  );
}
