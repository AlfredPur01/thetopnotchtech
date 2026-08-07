export interface Instructor {
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
}

export const INSTRUCTORS: Instructor[] = [];

export function getInstructorBySlug(slug: string): Instructor | undefined {
  return INSTRUCTORS.find((instructor) => instructor.slug === slug);
}
