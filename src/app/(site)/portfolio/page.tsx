import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { CTABanner } from "@/components/ui/CTABanner";

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioHero />
      <PortfolioGrid />
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
