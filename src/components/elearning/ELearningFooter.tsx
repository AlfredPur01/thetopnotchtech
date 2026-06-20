import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

interface FooterLinkColumn {
  heading: string;
  links: { label: string; href: string }[];
}

const FOOTER_COLUMNS: FooterLinkColumn[] = [
  {
    heading: "Platform",
    links: [
      { label: "Courses", href: "/e-learning/courses" },
      { label: "Instructors", href: "/e-learning/instructors" },
      { label: "How It Works", href: "/e-learning/how-it-works" },
      { label: "Pricing", href: "/e-learning/pricing" },
      { label: "FAQs", href: "/e-learning/faqs" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/e-learning/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/contact" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Use", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund Policy", href: "/e-learning/refund-policy" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
];

export function ELearningFooter() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Image
              src="/logo/logo-white.svg"
              alt="Topnotch Tech E-Learning logo"
              width={160}
              height={40}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm text-gray-300">
              Empowering startups and SMEs with the digital tools, strategies, and systems
              they need to grow, scale, and stand out.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:bg-brand-orange hover:border-brand-orange"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold text-brand-orange">{column.heading}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Topnotch Tech Innovations Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
