import { CaseStudyForm } from "@/components/admin/case-studies/CaseStudyForm";

export default function NewCaseStudyPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-brand-blue">New Case Study</h1>
      <p className="mt-1 text-sm text-brand-muted">Document a client success story.</p>

      <div className="mt-6">
        <CaseStudyForm />
      </div>
    </div>
  );
}
