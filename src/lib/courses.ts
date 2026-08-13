import { backendFetch } from "@/lib/server/backend-client";

export const COURSE_CATEGORIES = [
  "Development",
  "Design",
  "Marketing",
  "Business",
  "Data Science",
  "IT & Software",
] as const;

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];
export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseStatus = "draft" | "published" | "archived";

export interface CourseInstructor {
  name: string;
  avatar: string;
  bio: string;
  title: string;
}

export interface Course {
  id: string;
  slug: string;
  category: CourseCategory;
  image: string;
  title: string;
  description: string;
  instructor: CourseInstructor;
  price: number;
  currency: "NGN" | "USD";
  level: CourseLevel;
  status: CourseStatus;
}

export interface CourseLesson {
  id: string;
  title: string;
  type: "video" | "article" | "quiz";
  contentUrl: string | null;
  durationMins: number | null;
  isPreview: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface CourseDetail extends Course {
  modules: CourseModule[];
}

interface BackendCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: CourseCategory;
  thumbnail_url: string | null;
  level: CourseLevel;
  price: number;
  currency: "NGN" | "USD";
  status: CourseStatus;
  instructors: {
    bio: string | null;
    title: string | null;
    users: { name: string; avatar_url: string | null };
  };
}

interface BackendLesson {
  id: string;
  title: string;
  type: CourseLesson["type"];
  content_url: string | null;
  duration_mins: number | null;
  is_preview: boolean;
}

interface BackendModule {
  id: string;
  title: string;
  lessons: BackendLesson[];
}

function fromBackend(row: BackendCourse): Course {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    image: row.thumbnail_url ?? "",
    title: row.title,
    description: row.description,
    instructor: {
      name: row.instructors.users.name,
      avatar: row.instructors.users.avatar_url ?? "",
      bio: row.instructors.bio ?? "",
      title: row.instructors.title ?? "",
    },
    price: Number(row.price),
    currency: row.currency,
    level: row.level,
    status: row.status,
  };
}

/** Published courses — for public site pages. */
export async function getCourses(): Promise<Course[]> {
  const { courses } = await backendFetch<{ courses: BackendCourse[] }>("/courses?status=published&limit=50");
  return courses.map(fromBackend);
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail | undefined> {
  try {
    const { course, modules } = await backendFetch<{ course: BackendCourse; modules: BackendModule[] }>(
      `/courses/${slug}`
    );
    if (course.status !== "published") return undefined;

    return {
      ...fromBackend(course),
      modules: modules.map((m) => ({
        id: m.id,
        title: m.title,
        lessons: m.lessons.map((l) => ({
          id: l.id,
          title: l.title,
          type: l.type,
          contentUrl: l.content_url,
          durationMins: l.duration_mins,
          isPreview: l.is_preview,
        })),
      })),
    };
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Admin — course metadata CRUD only. There's no visual curriculum
// (modules/lessons) editor here; those are managed via the backend API
// directly for now.
// ---------------------------------------------------------------------------

export interface CourseInput {
  title: string;
  slug: string;
  description: string;
  category: CourseCategory;
  image?: string;
  level: CourseLevel;
  price: number;
  currency: "NGN" | "USD";
  duration_hours?: number;
  status: CourseStatus;
}

/** Draft/published courses — for the admin dashboard only (archived = deleted). */
export async function getAllCoursesForAdmin(): Promise<Course[]> {
  const { courses } = await backendFetch<{ courses: BackendCourse[] }>("/courses?limit=50");
  return courses.filter((c) => c.status !== "archived").map(fromBackend);
}

export async function getCourseBySlugForAdmin(slug: string): Promise<CourseDetail | undefined> {
  try {
    const { course, modules } = await backendFetch<{ course: BackendCourse; modules: BackendModule[] }>(
      `/courses/${slug}`
    );
    return {
      ...fromBackend(course),
      modules: modules.map((m) => ({
        id: m.id,
        title: m.title,
        lessons: m.lessons.map((l) => ({
          id: l.id,
          title: l.title,
          type: l.type,
          contentUrl: l.content_url,
          durationMins: l.duration_mins,
          isPreview: l.is_preview,
        })),
      })),
    };
  } catch {
    return undefined;
  }
}

export async function createCourse(input: CourseInput): Promise<{ slug: string }> {
  const { instructor } = await backendFetch<{ instructor: { id: string } }>("/courses/instructors/me", {
    auth: true,
  });

  const course = await backendFetch<{ slug: string }>("/courses", {
    method: "POST",
    auth: true,
    body: JSON.stringify({
      title: input.title,
      slug: input.slug,
      description: input.description,
      category: input.category,
      ...(input.image && { thumbnail_url: input.image }),
      level: input.level,
      price: input.price,
      currency: input.currency,
      ...(input.duration_hours !== undefined && { duration_hours: input.duration_hours }),
      status: input.status,
      instructor_id: instructor.id,
    }),
  });

  return { slug: course.slug };
}

export async function updateCourse(slug: string, updates: Partial<CourseInput>): Promise<void> {
  const existing = await getCourseBySlugForAdmin(slug);
  if (!existing) {
    throw new Error(`Course with slug "${slug}" not found`);
  }

  const { image, ...rest } = updates;

  await backendFetch(`/courses/${existing.id}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify({
      ...rest,
      ...(image !== undefined && { thumbnail_url: image }),
    }),
  });
}

export function getPriceRange(courses: Course[]): { min: number; max: number } {
  if (courses.length === 0) return { min: 0, max: 0 };
  const prices = courses.map((course) => course.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getCourseCountByCategory(courses: Course[], category: CourseCategory): number {
  return courses.filter((course) => course.category === category).length;
}
