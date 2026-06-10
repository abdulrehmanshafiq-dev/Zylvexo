"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { ToastProvider } from "@/components/admin/Toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <ToastProvider>
      <div className="flex h-screen bg-[#080B14]">
        <AdminSidebar />
        <div className="flex-1 flex flex-col ml-[240px]">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
