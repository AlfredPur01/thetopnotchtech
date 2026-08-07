import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail";
import { getCaseStudyBySlug } from "@/lib/case-studies";

interface CaseStudyPageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = await getCaseStudyBySlug(params.slug);
  return {
    title: caseStudy ? `${caseStudy.seoTitle ?? caseStudy.title} | Topnotch Tech Case Studies` : "Case Study",
    description: caseStudy?.seoDescription ?? caseStudy?.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = await getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetail caseStudy={caseStudy} />;
}
