export const COURSE_CATEGORIES = [
  "Development",
  "Design",
  "Marketing",
  "Business",
  "Data Science",
  "IT & Software",
] as const;

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];

export type CourseBadge = "Bestseller" | "Popular" | "Trending";

export interface Course {
  slug: string;
  badge?: CourseBadge;
  category: CourseCategory;
  image: string;
  title: string;
  description: string;
  instructorSlug: string;
  rating: number;
  reviews: number;
  price: number;
  featured?: boolean;
}

export const COURSES: Course[] = [
  {
    slug: "digital-marketing-masterclass",
    badge: "Bestseller",
    category: "Marketing",
    image: "/images/elearning/digital-marketing-masterclass.jpg",
    title: "Digital Marketing Masterclass",
    description: "Learn strategies to grow brands, generate leads and boost sales.",
    instructorSlug: "david-okoro",
    rating: 4.8,
    reviews: 1200,
    price: 25000,
    featured: true,
  },
  {
    slug: "full-stack-web-development",
    badge: "Popular",
    category: "Development",
    image: "/images/elearning/full-stack-web-development.jpg",
    title: "Full Stack Web Development",
    description: "Build modern websites and web apps from scratch.",
    instructorSlug: "jane-doe",
    rating: 4.7,
    reviews: 980,
    price: 35000,
    featured: true,
  },
  {
    slug: "ui-ux-design-fundamentals",
    badge: "Trending",
    category: "Design",
    image: "/images/elearning/ui-ux-design-fundamentals.jpg",
    title: "UI/UX Design Fundamentals",
    description: "Design beautiful, user-friendly interfaces and experiences.",
    instructorSlug: "patrick-u",
    rating: 4.6,
    reviews: 756,
    price: 20000,
    featured: true,
  },
  {
    slug: "python-for-beginners",
    category: "IT & Software",
    image: "/images/elearning/python-for-beginners.jpg",
    title: "Python for Beginners",
    description: "Master Python programming from the ground up.",
    instructorSlug: "chinedu-a",
    rating: 4.9,
    reviews: 1100,
    price: 18000,
    featured: true,
  },
  {
    slug: "mobile-app-development",
    category: "IT & Software",
    image: "/images/elearning/mobile-app-development.jpg",
    title: "Mobile App Development",
    description: "Build and publish apps for Android & iOS.",
    instructorSlug: "fevi-d",
    rating: 4.6,
    reviews: 640,
    price: 30000,
    featured: true,
  },
  {
    slug: "javascript-fundamentals",
    category: "Development",
    image: "/images/elearning/javascript-fundamentals.jpg",
    title: "JavaScript Fundamentals",
    description: "Learn core JavaScript skills used in almost every modern web app.",
    instructorSlug: "jane-doe",
    rating: 4.7,
    reviews: 540,
    price: 15000,
  },
  {
    slug: "backend-development-with-nodejs",
    category: "Development",
    image: "/images/elearning/backend-development-nodejs.jpg",
    title: "Backend Development with Node.js",
    description: "Build APIs and server-side applications with Node.js and Express.",
    instructorSlug: "chinedu-a",
    rating: 4.7,
    reviews: 410,
    price: 28000,
  },
  {
    slug: "graphic-design-essentials",
    category: "Design",
    image: "/images/elearning/graphic-design-essentials.jpg",
    title: "Graphic Design Essentials",
    description: "Learn the principles of layout, color, and typography for real client work.",
    instructorSlug: "ngozi-eze",
    rating: 4.6,
    reviews: 320,
    price: 17000,
  },
  {
    slug: "figma-for-product-designers",
    category: "Design",
    image: "/images/elearning/figma-for-product-designers.jpg",
    title: "Figma for Product Designers",
    description: "Design, prototype, and hand off product interfaces using Figma.",
    instructorSlug: "patrick-u",
    rating: 4.8,
    reviews: 290,
    price: 19000,
  },
  {
    slug: "social-media-marketing-strategy",
    category: "Marketing",
    image: "/images/elearning/social-media-marketing-strategy.jpg",
    title: "Social Media Marketing Strategy",
    description: "Plan and run social campaigns that build audiences and drive sales.",
    instructorSlug: "david-okoro",
    rating: 4.6,
    reviews: 480,
    price: 16000,
  },
  {
    slug: "copywriting-that-converts",
    category: "Marketing",
    image: "/images/elearning/copywriting-that-converts.jpg",
    title: "Copywriting That Converts",
    description: "Write headlines, ads, and emails that turn readers into customers.",
    instructorSlug: "segun-adeyemi",
    rating: 4.7,
    reviews: 365,
    price: 14000,
  },
  {
    slug: "business-strategy-for-startups",
    category: "Business",
    image: "/images/elearning/business-strategy-for-startups.jpg",
    title: "Business Strategy for Startups",
    description: "Build a resilient business model and growth plan from day one.",
    instructorSlug: "tunde-bakare",
    rating: 4.7,
    reviews: 275,
    price: 22000,
  },
  {
    slug: "project-management-essentials",
    category: "Business",
    image: "/images/elearning/project-management-essentials.jpg",
    title: "Project Management Essentials",
    description: "Plan, run, and deliver projects on time and within budget.",
    instructorSlug: "tunde-bakare",
    rating: 4.6,
    reviews: 198,
    price: 20000,
  },
  {
    slug: "data-analysis-with-excel",
    category: "Data Science",
    image: "/images/elearning/data-analysis-with-excel.jpg",
    title: "Data Analysis with Excel",
    description: "Turn spreadsheets into clear, actionable business insight.",
    instructorSlug: "amara-chukwu",
    rating: 4.8,
    reviews: 410,
    price: 15000,
  },
  {
    slug: "introduction-to-data-science",
    category: "Data Science",
    image: "/images/elearning/introduction-to-data-science.jpg",
    title: "Introduction to Data Science",
    description: "Learn the fundamentals of data analysis, statistics, and visualization.",
    instructorSlug: "amara-chukwu",
    rating: 4.7,
    reviews: 305,
    price: 24000,
  },
  {
    slug: "it-support-fundamentals",
    category: "IT & Software",
    image: "/images/elearning/it-support-fundamentals.jpg",
    title: "IT Support Fundamentals",
    description: "Build the troubleshooting and systems skills IT support roles need.",
    instructorSlug: "fevi-d",
    rating: 4.5,
    reviews: 210,
    price: 12000,
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((course) => course.slug === slug);
}

export function getCourseCountByCategory(category: CourseCategory): number {
  return COURSES.filter((course) => course.category === category).length;
}

export function getPriceRange(): { min: number; max: number } {
  const prices = COURSES.map((course) => course.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
