export interface Instructor {
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
}

export const INSTRUCTORS: Instructor[] = [
  {
    slug: "david-okoro",
    name: "David Okoro",
    title: "Digital Marketing Expert",
    bio: "David has spent over 8 years helping brands grow through performance marketing and has trained thousands of students on building campaigns that convert.",
    avatar: "/images/team/instructor-david-okoro.jpg",
  },
  {
    slug: "jane-doe",
    name: "Jane Doe",
    title: "Full Stack Engineer",
    bio: "Jane builds production web applications for clients across Africa and loves breaking down complex engineering concepts into practical, hands-on lessons.",
    avatar: "/images/team/instructor-jane-doe.jpg",
  },
  {
    slug: "patrick-u",
    name: "Patrick U.",
    title: "Product Designer",
    bio: "Patrick designs digital products for startups and SMEs, with a focus on usability and conversion-friendly interfaces.",
    avatar: "/images/team/instructor-patrick-u.jpg",
  },
  {
    slug: "chinedu-a",
    name: "Chinedu A.",
    title: "Software Engineer",
    bio: "Chinedu has built backend systems for fintech and e-commerce platforms and enjoys mentoring beginners into confident developers.",
    avatar: "/images/team/instructor-chinedu-a.jpg",
  },
  {
    slug: "fevi-d",
    name: "Fevi D.",
    title: "Mobile Engineer",
    bio: "Fevi has shipped apps to the App Store and Play Store for clients across multiple industries and teaches with a project-first approach.",
    avatar: "/images/team/instructor-fevi-d.jpg",
  },
  {
    slug: "ngozi-eze",
    name: "Ngozi Eze",
    title: "Brand & Graphic Designer",
    bio: "Ngozi has designed visual identities for startups and established brands, and teaches design fundamentals with an emphasis on real client work.",
    avatar: "/images/team/instructor-ngozi-eze.jpg",
  },
  {
    slug: "tunde-bakare",
    name: "Tunde Bakare",
    title: "Business Strategist",
    bio: "Tunde advises founders on growth strategy and operations, and teaches practical frameworks for building resilient businesses.",
    avatar: "/images/team/instructor-tunde-bakare.jpg",
  },
  {
    slug: "amara-chukwu",
    name: "Amara Chukwu",
    title: "Data Analyst",
    bio: "Amara turns raw business data into actionable insight and teaches data skills with real-world datasets and practical exercises.",
    avatar: "/images/team/instructor-amara-chukwu.jpg",
  },
  {
    slug: "segun-adeyemi",
    name: "Segun Adeyemi",
    title: "Copywriter",
    bio: "Segun has written campaigns for brands across e-commerce and fintech, and teaches copywriting that's grounded in conversion psychology.",
    avatar: "/images/team/instructor-segun-adeyemi.jpg",
  },
];

export function getInstructorBySlug(slug: string): Instructor | undefined {
  return INSTRUCTORS.find((instructor) => instructor.slug === slug);
}
