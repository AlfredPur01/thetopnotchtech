import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface FooterLinkColumn {
  heading: string;
  links: { label: string; href: string }[];
}

const FOOTER_COLUMNS: FooterLinkColumn[] = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Careers", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Digital Marketing", href: "/services#digital-marketing" },
      { label: "Software Development", href: "/services#software-development" },
      { label: "Branding & Identity", href: "/services#branding-identity" },
      { label: "E-Learning", href: "/e-learning" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Guides & Insights", href: "/blog" },
      { label: "Free Tools", href: "/blog" },
      { label: "FAQ", href: "/contact#faq" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
];

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Image
              src="/logo/logo-white.svg"
              alt="Topnotch Tech Innovations logo"
              width={160}
              height={40}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm text-gray-300">
              Empowering startups and SMEs with the digital tools, strategies, and
              systems they need to grow, scale, and stand out.
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

          <div>
            <h3 className="text-sm font-semibold text-brand-orange">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              <li>info@topnotchtech.com</li>
              <li>+234 801 123 4567</li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Topnotch Tech Innovations Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
