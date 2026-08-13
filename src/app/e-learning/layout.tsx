import { ELearningNavbar } from "@/components/elearning/ELearningNavbar";
import { ELearningFooter } from "@/components/elearning/ELearningFooter";
import { getCurrentStudent } from "@/lib/server/student-auth";

interface ELearningLayoutProps {
  children: React.ReactNode;
}

export default async function ELearningLayout({ children }: ELearningLayoutProps) {
  const student = await getCurrentStudent();

  return (
    <>
      <ELearningNavbar studentName={student?.name} />
      {children}
      <ELearningFooter />
    </>
  );
}
