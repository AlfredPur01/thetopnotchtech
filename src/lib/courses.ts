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

export const COURSES: Course[] = [];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((course) => course.slug === slug);
}

export function getCourseCountByCategory(category: CourseCategory): number {
  return COURSES.filter((course) => course.category === category).length;
}

export function getPriceRange(): { min: number; max: number } {
  if (COURSES.length === 0) return { min: 0, max: 0 };
  const prices = COURSES.map((course) => course.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
