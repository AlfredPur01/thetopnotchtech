import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { CTABanner } from "@/components/ui/CTABanner";
import { getPortfolioProjects } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <main>
      <PortfolioHero />
      <PortfolioGrid projects={projects} />
      <CTABanner
        heading="Have a project in mind?"
        subtext="Let's create something exceptional together — from strategy to launch."
        primaryLabel="Start Your Project"
        primaryHref="/contact"
        variant="navy"
      />
    </main>
  );
}
