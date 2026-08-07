import { PortfolioProjectForm } from "@/components/admin/portfolio/PortfolioProjectForm";

export default function NewPortfolioProjectPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-brand-blue">New Portfolio Project</h1>
      <p className="mt-1 text-sm text-brand-muted">Add a completed project to the portfolio.</p>

      <div className="mt-6">
        <PortfolioProjectForm />
      </div>
    </div>
  );
}
