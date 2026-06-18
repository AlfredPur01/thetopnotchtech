"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeIn } from "@/styles/animations";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  return (
    <>
      <motion.header
        initial={false}
        animate={isScrolled ? "scrolled" : "top"}
        variants={{
          top: { backgroundColor: "rgba(255,255,255,0)", boxShadow: "0 0 0 rgba(0,0,0,0)" },
          scrolled: {
            backgroundColor: "rgba(255,255,255,1)",
            boxShadow: "0 4px 16px rgba(10,22,40,0.08)",
          },
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Topnotch Tech Innovations home" className="relative z-10">
            <Image
              src="/logo/logo.svg"
              alt="Topnotch Tech Innovations logo"
              width={160}
              height={40}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium text-brand-blue transition-colors duration-200 hover:text-brand-orange",
                      isActive && "text-brand-orange underline underline-offset-8"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/contact"
              className="rounded-md bg-brand-orange px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
            >
              Start Your Project
            </Link>
            <Link
              href="/e-learning"
              className="rounded-md bg-brand-navy px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-brand-blue"
            >
              E-Learning
            </Link>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="relative z-10 inline-flex items-center justify-center rounded-md p-2 text-brand-blue lg:hidden"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeIn}
            className="fixed inset-0 z-40 flex flex-col bg-white px-6 pt-24 lg:hidden"
          >
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium text-brand-blue",
                        isActive && "text-brand-orange underline underline-offset-8"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-md bg-brand-orange px-6 py-3 text-center font-medium text-white transition-colors duration-200 hover:bg-orange-600"
              >
                Start Your Project
              </Link>
              <Link
                href="/e-learning"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-md bg-brand-navy px-6 py-3 text-center font-medium text-white transition-colors duration-200 hover:bg-brand-blue"
              >
                E-Learning
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
