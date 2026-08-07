import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllPortfolioProjectsForAdmin } from "@/lib/portfolio";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioListPage() {
  const projects = await getAllPortfolioProjectsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand-blue">Portfolio</h1>
          <p className="mt-1 text-sm text-brand-muted">Showcase completed client projects.</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="flex items-center gap-2 rounded-md bg-brand-orange px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
        >
          <Plus size={16} /> New Project
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
        {projects.length === 0 ? (
          <p className="p-8 text-center text-sm text-brand-muted">
            No portfolio projects yet. Create your first one to get started.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-xs uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project) => (
                <tr key={project.slug}>
                  <td className="px-6 py-4 font-medium text-brand-blue">{project.name}</td>
                  <td className="px-6 py-4 text-brand-muted">{project.client}</td>
                  <td className="px-6 py-4 text-brand-muted">{project.category}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/portfolio/${project.slug}`}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-brand-light hover:text-brand-blue"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteButton
                        deleteUrl={`/api/admin/portfolio/${project.slug}`}
                        confirmMessage={`Delete "${project.name}"? This cannot be undone.`}
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
