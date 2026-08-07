import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllCaseStudiesForAdmin } from "@/lib/case-studies";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminCaseStudiesListPage() {
  const caseStudies = await getAllCaseStudiesForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand-blue">Case Studies</h1>
          <p className="mt-1 text-sm text-brand-muted">Showcase client success stories.</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="flex items-center gap-2 rounded-md bg-brand-orange px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
        >
          <Plus size={16} /> New Case Study
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
        {caseStudies.length === 0 ? (
          <p className="p-8 text-center text-sm text-brand-muted">
            No case studies yet. Create your first one to get started.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-xs uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Industry</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {caseStudies.map((caseStudy) => (
                <tr key={caseStudy.slug}>
                  <td className="px-6 py-4 font-medium text-brand-blue">{caseStudy.title}</td>
                  <td className="px-6 py-4 text-brand-muted">{caseStudy.industry}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={caseStudy.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/case-studies/${caseStudy.slug}`}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-brand-light hover:text-brand-blue"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteButton
                        deleteUrl={`/api/admin/case-studies/${caseStudy.slug}`}
                        confirmMessage={`Delete "${caseStudy.title}"? This cannot be undone.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
