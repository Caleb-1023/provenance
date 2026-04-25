"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { useAppSelector } from "@/store/hooks";

export function MainShell({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Sidebar />
      <div
        className={`flex min-h-screen flex-1 flex-col transition-[margin] duration-200 ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        <TopBar />
        <main className="flex-1 space-y-4 p-4">{children}</main>
      </div>
    </div>
  );
}
