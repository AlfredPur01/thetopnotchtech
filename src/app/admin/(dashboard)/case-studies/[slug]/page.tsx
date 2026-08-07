import { notFound } from "next/navigation";
import { getCaseStudyBySlugForAdmin } from "@/lib/case-studies";
import { CaseStudyForm } from "@/components/admin/case-studies/CaseStudyForm";

interface EditCaseStudyPageProps {
  params: { slug: string };
}

export default async function EditCaseStudyPage({ params }: EditCaseStudyPageProps) {
  const caseStudy = await getCaseStudyBySlugForAdmin(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-brand-blue">Edit Case Study</h1>
      <p className="mt-1 text-sm text-brand-muted">{caseStudy.title}</p>

      <div className="mt-6">
        <CaseStudyForm initialCaseStudy={caseStudy} />
      </div>
    </div>
  );
}
