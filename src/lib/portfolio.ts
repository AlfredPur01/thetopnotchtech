import { backendFetch } from "@/lib/server/backend-client";
import { PORTFOLIO_FILTERS, type PortfolioCategory } from "@/lib/portfolio-constants";

export { PORTFOLIO_FILTERS };
export type { PortfolioCategory };

export type PortfolioStatus = "draft" | "published";

export interface PortfolioProject {
  slug: string;
  name: string;
  client: string;
  category: Exclude<PortfolioCategory, "All">;
  description: string;
  image: string;
  status: PortfolioStatus;
  seoTitle?: string;
  seoDescription?: string;
}

interface BackendPortfolioProject {
  id: string;
  slug: string;
  name: string;
  client: string;
  category: Exclude<PortfolioCategory, "All">;
  description: string;
  image: string | null;
  status: PortfolioStatus;
  seo_title: string | null;
  seo_description: string | null;
}

function fromBackend(row: BackendPortfolioProject): PortfolioProject {
  return {
    slug: row.slug,
    name: row.name,
    client: row.client,
    category: row.category,
    description: row.description,
    image: row.image ?? "",
    status: row.status,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
  };
}

function toBackendPayload(project: Partial<PortfolioProject>) {
  return {
    ...(project.slug !== undefined && { slug: project.slug }),
    ...(project.name !== undefined && { name: project.name }),
    ...(project.client !== undefined && { client: project.client }),
    ...(project.category !== undefined && { category: project.category }),
    ...(project.description !== undefined && { description: project.description }),
    ...(project.image !== undefined && project.image && { image: project.image }),
    ...(project.status !== undefined && { status: project.status }),
    ...(project.seoTitle !== undefined && { seo_title: project.seoTitle }),
    ...(project.seoDescription !== undefined && { seo_description: project.seoDescription }),
  };
}

async function getBackendProjectBySlug(slug: string): Promise<BackendPortfolioProject | undefined> {
  try {
    return await backendFetch<BackendPortfolioProject>(`/portfolio/${slug}`);
  } catch {
    return undefined;
  }
}

/** Published projects only — for public site pages. */
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const { projects } = await backendFetch<{ projects: BackendPortfolioProject[] }>(
    "/portfolio?status=published&limit=50"
  );
  return projects.map(fromBackend);
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | undefined> {
  const row = await getBackendProjectBySlug(slug);
  return row && row.status === "published" ? fromBackend(row) : undefined;
}

/** All projects regardless of status — for the admin dashboard only. */
export async function getAllPortfolioProjectsForAdmin(): Promise<PortfolioProject[]> {
  const { projects } = await backendFetch<{ projects: BackendPortfolioProject[] }>("/portfolio?limit=50");
  return projects.map(fromBackend);
}

export async function getPortfolioProjectBySlugForAdmin(slug: string): Promise<PortfolioProject | undefined> {
  const row = await getBackendProjectBySlug(slug);
  return row ? fromBackend(row) : undefined;
}

export async function createPortfolioProject(project: PortfolioProject): Promise<PortfolioProject> {
  const created = await backendFetch<BackendPortfolioProject>("/portfolio", {
    method: "POST",
    auth: true,
    body: JSON.stringify(toBackendPayload(project)),
  });
  return fromBackend(created);
}

export async function updatePortfolioProject(
  slug: string,
  updates: Partial<PortfolioProject>
): Promise<PortfolioProject> {
  const existing = await getBackendProjectBySlug(slug);
  if (!existing) {
    throw new Error(`Item with slug "${slug}" not found`);
  }

  const updated = await backendFetch<BackendPortfolioProject>(`/portfolio/${existing.id}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify(toBackendPayload(updates)),
  });
  return fromBackend(updated);
}

export async function deletePortfolioProject(slug: string): Promise<void> {
  const existing = await getBackendProjectBySlug(slug);
  if (!existing) return;

  await backendFetch(`/portfolio/${existing.id}`, { method: "DELETE", auth: true });
}
