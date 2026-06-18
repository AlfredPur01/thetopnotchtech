"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeIn } from "@/styles/animations";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/e-learning", label: "Home" },
  { href: "/e-learning/courses", label: "Courses" },
  { href: "/e-learning/instructors", label: "Instructors" },
  { href: "/e-learning/how-it-works", label: "How It Works" },
  { href: "/e-learning/pricing", label: "Pricing" },
  { href: "/e-learning/about", label: "About Us" },
];

export function ELearningNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-brand-light">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-brand-blue hover:underline"
          >
            <ArrowLeft size={14} />
            Back to Topnotch Tech
          </Link>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/e-learning" aria-label="Topnotch Tech E-Learning home" className="relative z-10">
          <Image
            src="/logo/logo.svg"
            alt="Topnotch Tech E-Learning logo"
            width={160}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium text-brand-blue transition-colors duration-200 hover:text-brand-orange",
                    isActive && "text-brand-orange"
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
            href="/e-learning/login"
            className="rounded-md border border-brand-blue px-5 py-2.5 font-medium text-brand-blue transition-colors duration-200 hover:bg-brand-blue hover:text-white"
          >
            Log In
          </Link>
          <Link
            href="/e-learning/signup"
            className="rounded-md bg-brand-orange px-5 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
          >
            Sign Up Free
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeIn}
            className="fixed inset-0 top-[88px] z-40 flex flex-col bg-white px-6 pt-8 lg:hidden"
          >
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-brand-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3">
              <Link
                href="/e-learning/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-md border border-brand-blue px-6 py-3 text-center font-medium text-brand-blue"
              >
                Log In
              </Link>
              <Link
                href="/e-learning/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-md bg-brand-orange px-6 py-3 text-center font-medium text-white"
              >
                Sign Up Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
