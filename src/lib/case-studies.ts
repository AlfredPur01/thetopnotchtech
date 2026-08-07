import { createContentStore } from "@/lib/server/content-store";

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

const store = createContentStore<CaseStudy>("case-studies.json", "slug");

/** Published case studies only — for public site pages. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const caseStudies = await store.getAll();
  return caseStudies.filter((caseStudy) => caseStudy.status === "published");
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const caseStudy = await store.getByKey(slug);
  return caseStudy?.status === "published" ? caseStudy : undefined;
}

/** All case studies regardless of status — for the admin dashboard only. */
export async function getAllCaseStudiesForAdmin(): Promise<CaseStudy[]> {
  return store.getAll();
}

export async function getCaseStudyBySlugForAdmin(slug: string): Promise<CaseStudy | undefined> {
  return store.getByKey(slug);
}

export async function createCaseStudy(caseStudy: CaseStudy): Promise<CaseStudy> {
  return store.create(caseStudy);
}

export async function updateCaseStudy(
  slug: string,
  updates: Partial<CaseStudy>
): Promise<CaseStudy> {
  return store.update(slug, updates);
}

export async function deleteCaseStudy(slug: string): Promise<void> {
  return store.remove(slug);
}
