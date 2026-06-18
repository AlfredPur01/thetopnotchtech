import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
