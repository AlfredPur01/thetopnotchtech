import { notFound } from "next/navigation";
import { getPortfolioProjectBySlugForAdmin } from "@/lib/portfolio";
import { PortfolioProjectForm } from "@/components/admin/portfolio/PortfolioProjectForm";

interface EditPortfolioProjectPageProps {
  params: { slug: string };
}

export default async function EditPortfolioProjectPage({ params }: EditPortfolioProjectPageProps) {
  const project = await getPortfolioProjectBySlugForAdmin(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-brand-blue">Edit Portfolio Project</h1>
      <p className="mt-1 text-sm text-brand-muted">{project.name}</p>

      <div className="mt-6">
        <PortfolioProjectForm initialProject={project} />
      </div>
    </div>
  );
}
