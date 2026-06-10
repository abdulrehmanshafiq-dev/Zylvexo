"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Star,
  Inbox,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-[#0E1220] border-r border-[rgba(255,255,255,0.08)] flex flex-col z-30">
      <div className="px-6 py-6">
        <h1 className="text-xl font-display font-bold text-[#7C3AED]">
          Zylvexo
        </h1>
        <p className="text-xs text-[#6B7280] mt-0.5">Manage your agency</p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#7C3AED]/20 text-[#A855F7] border-l-2 border-[#7C3AED]"
                  : "text-[#9CA3AF] hover:text-[#F0F0F8] hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.08)]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F0F0F8] transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Site
        </Link>
        <p className="text-xs text-[#6B7280] mt-2">v1.0</p>
      </div>
    </aside>
  );
}
