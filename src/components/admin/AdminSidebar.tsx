"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Briefcase, FolderKanban, Quote, GraduationCap, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/case-studies", label: "Case Studies", icon: Briefcase },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/courses", label: "Courses", icon: GraduationCap },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex items-center gap-2 px-6 py-6">
        <Image src="/logo/logo.svg" alt="Topnotch Tech Innovations logo" width={140} height={36} className="h-8 w-auto" />
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-brand-blue text-white"
                  : "text-brand-muted hover:bg-brand-light hover:text-brand-blue"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-brand-muted transition-colors duration-200 hover:bg-brand-light hover:text-brand-blue"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
