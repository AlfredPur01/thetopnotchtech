import { backendFetch } from "@/lib/server/backend-client";

export interface CaseStudyResult {
  value: string;
  label: string;
}

export type CaseStudyStatus = "draft" | "published";

export interface CaseStudy {
  slug: string;
  industry: string;
  badge: string;
  title: string;
  description: string;
  challenges: string[];
  solutions: string[];
  results: CaseStudyResult[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
  };
  image: string;
  status: CaseStudyStatus;
  seoTitle?: string;
  seoDescription?: string;
}

interface BackendCaseStudy {
  id: string;
  slug: string;
  industry: string;
  badge: string;
  title: string;
  description: string;
  challenges: string[];
  solutions: string[];
  results: CaseStudyResult[];
  testimonial_quote: string | null;
  testimonial_name: string | null;
  testimonial_role: string | null;
  image: string | null;
  status: CaseStudyStatus;
  seo_title: string | null;
  seo_description: string | null;
}

function fromBackend(row: BackendCaseStudy): CaseStudy {
  return {
    slug: row.slug,
    industry: row.industry,
    badge: row.badge,
    title: row.title,
    description: row.description,
    challenges: row.challenges ?? [],
    solutions: row.solutions ?? [],
    results: row.results ?? [],
    testimonial: {
      quote: row.testimonial_quote ?? "",
      name: row.testimonial_name ?? "",
      role: row.testimonial_role ?? "",
    },
    image: row.image ?? "",
    status: row.status,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
  };
}

function toBackendPayload(caseStudy: Partial<CaseStudy>) {
  return {
    ...(caseStudy.slug !== undefined && { slug: caseStudy.slug }),
    ...(caseStudy.industry !== undefined && { industry: caseStudy.industry }),
    ...(caseStudy.badge !== undefined && { badge: caseStudy.badge }),
    ...(caseStudy.title !== undefined && { title: caseStudy.title }),
    ...(caseStudy.description !== undefined && { description: caseStudy.description }),
    ...(caseStudy.challenges !== undefined && { challenges: caseStudy.challenges }),
    ...(caseStudy.solutions !== undefined && { solutions: caseStudy.solutions }),
    ...(caseStudy.results !== undefined && { results: caseStudy.results }),
    ...(caseStudy.testimonial?.quote !== undefined && { testimonial_quote: caseStudy.testimonial.quote }),
    ...(caseStudy.testimonial?.name !== undefined && { testimonial_name: caseStudy.testimonial.name }),
    ...(caseStudy.testimonial?.role !== undefined && { testimonial_role: caseStudy.testimonial.role }),
    ...(caseStudy.image !== undefined && caseStudy.image && { image: caseStudy.image }),
    ...(caseStudy.status !== undefined && { status: caseStudy.status }),
    ...(caseStudy.seoTitle !== undefined && { seo_title: caseStudy.seoTitle }),
    ...(caseStudy.seoDescription !== undefined && { seo_description: caseStudy.seoDescription }),
  };
}

async function getBackendCaseStudyBySlug(slug: string): Promise<BackendCaseStudy | undefined> {
  try {
    return await backendFetch<BackendCaseStudy>(`/case-studies/${slug}`);
  } catch {
    return undefined;
  }
}

/** Published case studies only — for public site pages. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const { caseStudies } = await backendFetch<{ caseStudies: BackendCaseStudy[] }>(
    "/case-studies?status=published&limit=50"
  );
  return caseStudies.map(fromBackend);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const row = await getBackendCaseStudyBySlug(slug);
  return row && row.status === "published" ? fromBackend(row) : undefined;
}

/** All case studies regardless of status — for the admin dashboard only. */
export async function getAllCaseStudiesForAdmin(): Promise<CaseStudy[]> {
  const { caseStudies } = await backendFetch<{ caseStudies: BackendCaseStudy[] }>("/case-studies?limit=50");
  return caseStudies.map(fromBackend);
}

export async function getCaseStudyBySlugForAdmin(slug: string): Promise<CaseStudy | undefined> {
  const row = await getBackendCaseStudyBySlug(slug);
  return row ? fromBackend(row) : undefined;
}

export async function createCaseStudy(caseStudy: CaseStudy): Promise<CaseStudy> {
  const created = await backendFetch<BackendCaseStudy>("/case-studies", {
    method: "POST",
    auth: true,
    body: JSON.stringify(toBackendPayload(caseStudy)),
  });
  return fromBackend(created);
}

export async function updateCaseStudy(slug: string, updates: Partial<CaseStudy>): Promise<CaseStudy> {
  const existing = await getBackendCaseStudyBySlug(slug);
  if (!existing) {
    throw new Error(`Item with slug "${slug}" not found`);
  }

  const updated = await backendFetch<BackendCaseStudy>(`/case-studies/${existing.id}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify(toBackendPayload(updates)),
  });
  return fromBackend(updated);
}

export async function deleteCaseStudy(slug: string): Promise<void> {
  const existing = await getBackendCaseStudyBySlug(slug);
  if (!existing) return;

  await backendFetch(`/case-studies/${existing.id}`, { method: "DELETE", auth: true });
}
