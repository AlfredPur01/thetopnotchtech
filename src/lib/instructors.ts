import { getCourses } from "@/lib/courses";

export interface Instructor {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  courseCount: number;
}

/**
 * There's no standalone instructor directory in the backend — instructors
 * are derived from whoever teaches at least one published course.
 */
export async function getInstructors(): Promise<Instructor[]> {
  const courses = await getCourses();

  const byName = new Map<string, Instructor>();
  for (const course of courses) {
    const existing = byName.get(course.instructor.name);
    if (existing) {
      existing.courseCount += 1;
    } else {
      byName.set(course.instructor.name, { ...course.instructor, courseCount: 1 });
    }
  }

  return Array.from(byName.values());
}
