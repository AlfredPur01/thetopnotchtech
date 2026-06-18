import { ELearningNavbar } from "@/components/elearning/ELearningNavbar";
import { ELearningFooter } from "@/components/elearning/ELearningFooter";

interface ELearningLayoutProps {
  children: React.ReactNode;
}

export default function ELearningLayout({ children }: ELearningLayoutProps) {
  return (
    <>
      <ELearningNavbar />
      {children}
      <ELearningFooter />
    </>
  );
}
