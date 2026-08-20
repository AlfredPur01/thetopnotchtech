import Link from "next/link";
import { FileText, Briefcase, FolderKanban, Quote, GraduationCap, Plus } from "lucide-react";
import { getAllBlogPostsForAdmin } from "@/lib/blog";
import { getAllCaseStudiesForAdmin } from "@/lib/case-studies";
import { getAllPortfolioProjectsForAdmin } from "@/lib/portfolio";
import { getAllTestimonials } from "@/lib/testimonials";
import { getAllCoursesForAdmin } from "@/lib/courses";

export const dynamic = "force-dynamic";

function countByStatus<T extends { status: string }>(items: T[]) {
  return {
    published: items.filter((item) => item.status === "published").length,
    draft: items.filter((item) => item.status === "draft").length,
  };
}

export default async function AdminOverviewPage() {
  const [blogPosts, caseStudies, portfolioProjects, testimonials, courses] = await Promise.all([
    getAllBlogPostsForAdmin(),
    getAllCaseStudiesForAdmin(),
    getAllPortfolioProjectsForAdmin(),
    getAllTestimonials(),
    getAllCoursesForAdmin(),
  ]);

  const cards = [
    {
      label: "Blog Posts",
      icon: FileText,
      total: blogPosts.length,
      ...countByStatus(blogPosts),
      href: "/admin/blog",
      newHref: "/admin/blog/new",
    },
    {
      label: "Case Studies",
      icon: Briefcase,
      total: caseStudies.length,
      ...countByStatus(caseStudies),
      href: "/admin/case-studies",
      newHref: "/admin/case-studies/new",
    },
    {
      label: "Portfolio Projects",
      icon: FolderKanban,
      total: portfolioProjects.length,
      ...countByStatus(portfolioProjects),
      href: "/admin/portfolio",
      newHref: "/admin/portfolio/new",
    },
    {
      label: "Testimonials",
      icon: Quote,
      total: testimonials.length,
      published: testimonials.length,
      draft: 0,
      href: "/admin/testimonials",
      newHref: "/admin/testimonials/new",
    },
    {
      label: "Courses",
      icon: GraduationCap,
      total: courses.length,
      ...countByStatus(courses),
      href: "/admin/courses",
      newHref: "/admin/courses/new",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-brand-blue">Dashboard</h1>
      <p className="mt-1 text-sm text-brand-muted">Overview of your site&apos;s content.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                  <Icon size={20} />
                </span>
                <Link
                  href={card.newHref}
                  className="flex items-center gap-1 text-xs font-medium text-brand-orange hover:underline"
                >
                  <Plus size={14} /> New
                </Link>
              </div>
              <p className="mt-4 font-display text-3xl font-semibold text-brand-blue">{card.total}</p>
              <Link href={card.href} className="text-sm font-medium text-brand-blue hover:underline">
                {card.label}
              </Link>
              {card.href !== "/admin/testimonials" && (
                <p className="mt-2 text-xs text-brand-muted">
                  {card.published} published &middot; {card.draft} draft
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
