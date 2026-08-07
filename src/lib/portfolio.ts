import { createContentStore } from "@/lib/server/content-store";
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

const store = createContentStore<PortfolioProject>("portfolio.json", "slug");

/** Published projects only — for public site pages. */
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const projects = await store.getAll();
  return projects.filter((project) => project.status === "published");
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | undefined> {
  const project = await store.getByKey(slug);
  return project?.status === "published" ? project : undefined;
}

/** All projects regardless of status — for the admin dashboard only. */
export async function getAllPortfolioProjectsForAdmin(): Promise<PortfolioProject[]> {
  return store.getAll();
}

export async function getPortfolioProjectBySlugForAdmin(
  slug: string
): Promise<PortfolioProject | undefined> {
  return store.getByKey(slug);
}

export async function createPortfolioProject(project: PortfolioProject): Promise<PortfolioProject> {
  return store.create(project);
}

export async function updatePortfolioProject(
  slug: string,
  updates: Partial<PortfolioProject>
): Promise<PortfolioProject> {
  return store.update(slug, updates);
}

export async function deletePortfolioProject(slug: string): Promise<void> {
  return store.remove(slug);
}
