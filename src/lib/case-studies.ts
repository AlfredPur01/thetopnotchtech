export interface CaseStudyResult {
  value: string;
  label: string;
}

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
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ecommerce-brand-growth",
    industry: "E-Commerce",
    badge: "E-Commerce",
    title: "E-Commerce Brand Growth",
    description:
      "A retail startup needed a stronger online presence and a brand that resonated with its audience.",
    challenges: ["Low website traffic", "Weak branding and identity", "Poor conversion rates"],
    solutions: [
      "Complete branding overhaul",
      "Comprehensive SEO optimization",
      "Targeted paid advertising strategy",
    ],
    results: [
      { value: "270%", label: "Growth in sales" },
      { value: "3x", label: "Increase in organic traffic" },
      { value: "2x", label: "Customer retention rate" },
    ],
    testimonial: {
      quote: "This transformation changed everything for our business. We finally feel seen.",
      name: "David A.",
      role: "Founder",
    },
    image: "/images/case-studies/ecommerce-brand-growth.jpg",
  },
  {
    slug: "booking-software-service-company",
    industry: "SaaS",
    badge: "SaaS / Software",
    title: "Booking Software for Service Company",
    description:
      "A service provider struggled with manual scheduling and needed automation to scale operations.",
    challenges: [
      "No centralized booking system",
      "Slow, error-prone manual processes",
      "High administrative workload",
    ],
    solutions: [
      "Custom booking system development",
      "Automated notifications and reminders",
      "Admin dashboard for central management",
    ],
    results: [
      { value: "40%", label: "Faster service delivery" },
      { value: "60%", label: "Reduced admin time" },
      { value: "Improved", label: "Customer satisfaction" },
    ],
    testimonial: {
      quote: "The software streamlined our entire business. Highly recommended.",
      name: "Chinwe O.",
      role: "Operations Manager",
    },
    image: "/images/case-studies/booking-software-service-company.jpg",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug);
}
