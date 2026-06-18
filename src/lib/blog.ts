export interface BlogHighlight {
  number: string;
  title: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  highlights?: BlogHighlight[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "5-digital-marketing-strategies-every-sme-should-use",
    category: "Marketing Tips",
    title: "5 Digital Marketing Strategies Every SME Should Use",
    excerpt:
      "Digital marketing can feel overwhelming, but it doesn't have to be. With the right strategies, small businesses can compete with bigger brands and win.",
    author: "Topnotch Tech Team",
    date: "May 10, 2025",
    readTime: "8 min read",
    image: "/images/blog/5-digital-marketing-strategies.jpg",
    featured: true,
    highlights: [
      {
        number: "01",
        title: "Optimize Your Website",
        description: "Make it fast, mobile-friendly, and easy to navigate.",
      },
      {
        number: "02",
        title: "Use Social Media Strategically",
        description: "Focus on platforms where your audience spends time.",
      },
      {
        number: "03",
        title: "Invest in SEO",
        description: "Rank higher and drive consistent organic traffic.",
      },
      {
        number: "04",
        title: "Run Targeted Ads",
        description: "Reach the right audience with the right message.",
      },
      {
        number: "05",
        title: "Build an Email List",
        description: "Email marketing remains one of the highest ROI channels.",
      },
    ],
  },
  {
    slug: "how-to-build-a-scalable-software-product-from-scratch",
    category: "Software Building",
    title: "How to Build a Scalable Software Product From Scratch",
    excerpt:
      "A step-by-step guide for founders looking to build products that scale and solve real problems.",
    author: "Topnotch Tech Team",
    date: "May 8, 2025",
    readTime: "7 min read",
    image: "/images/blog/scalable-software-product.jpg",
  },
  {
    slug: "branding-essentials-for-startups-what-really-matters",
    category: "Branding Guides",
    title: "Branding Essentials for Startups: What Really Matters",
    excerpt:
      "Discover the branding elements that attract customers and build trust from day one.",
    author: "Topnotch Tech Team",
    date: "May 6, 2025",
    readTime: "6 min read",
    image: "/images/blog/branding-essentials.jpg",
  },
  {
    slug: "seo-for-small-businesses-simple-techniques-that-work",
    category: "SEO Tips",
    title: "SEO for Small Businesses: Simple Techniques That Work",
    excerpt:
      "Easy ways to improve your Google ranking and visibility without spending a fortune.",
    author: "Topnotch Tech Team",
    date: "May 3, 2025",
    readTime: "5 min read",
    image: "/images/blog/seo-small-businesses.jpg",
  },
  {
    slug: "why-every-business-needs-a-strong-digital-footprint",
    category: "Digital Presence",
    title: "Why Every Business Needs a Strong Digital Footprint",
    excerpt:
      "The impact of digital presence on growth, credibility and customer perception.",
    author: "Topnotch Tech Team",
    date: "May 1, 2025",
    readTime: "6 min read",
    image: "/images/blog/digital-footprint.jpg",
  },
  {
    slug: "how-ai-is-transforming-digital-marketing-for-smes",
    category: "Marketing Tips",
    title: "How AI is Transforming Digital Marketing for SMEs",
    excerpt:
      "AI tools are helping small businesses personalize campaigns and compete with bigger brands.",
    author: "Topnotch Tech Team",
    date: "May 10, 2025",
    readTime: "5 min read",
    image: "/images/blog/ai-digital-marketing.jpg",
  },
  {
    slug: "top-7-website-trends-to-watch-in-2025",
    category: "Digital Presence",
    title: "Top 7 Website Trends To Watch in 2025",
    excerpt: "From bold typography to AI-driven personalization, here's what's shaping web design.",
    author: "Topnotch Tech Team",
    date: "May 6, 2025",
    readTime: "4 min read",
    image: "/images/blog/website-trends-2025.jpg",
  },
  {
    slug: "5-digital-marketing-mistakes-that-cost-you-customers",
    category: "Marketing Tips",
    title: "5 Digital Marketing Mistakes That Cost You Customers",
    excerpt: "Avoid these common pitfalls that quietly drive potential customers away.",
    author: "Topnotch Tech Team",
    date: "May 3, 2025",
    readTime: "4 min read",
    image: "/images/blog/digital-marketing-mistakes.jpg",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
