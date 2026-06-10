"use client";

import { useRouter } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";

export default function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <header className="h-16 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between px-6 bg-[#080B14] shrink-0">
      <div />
      <div className="flex items-center gap-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-[#F0F0F8] transition-colors"
        >
          View Site
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-red-400 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>
    </header>
  );
}
