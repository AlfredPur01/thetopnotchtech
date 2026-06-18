import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/lib/case-studies";

interface CaseStudyPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return CASE_STUDIES.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export function generateMetadata({ params }: CaseStudyPageProps): Metadata {
  const caseStudy = getCaseStudyBySlug(params.slug);
  return { title: caseStudy ? `${caseStudy.title} | Topnotch Tech Case Studies` : "Case Study" };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetail caseStudy={caseStudy} />;
}
