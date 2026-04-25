"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setThemeMode, toggleSidebar } from "@/store/slices/uiSlice";

const nav = [
  { href: "/opportunities", label: "Opportunities" },
  { href: "/companies", label: "Companies" },
  { href: "/topics", label: "Topics" },
  { href: "/gaps", label: "Gaps" },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);
  const themeMode = useAppSelector((s) => s.ui.themeMode);

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform dark:border-gray-800 dark:bg-gray-900 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
        <div>
          <div className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            Provenance
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Procurement intelligence
          </div>
        </div>
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => dispatch(toggleSidebar())}
        >
          «
        </button>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {nav.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-200 p-3 dark:border-gray-800">
        <button
          type="button"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          onClick={() =>
            dispatch(setThemeMode(themeMode === "dark" ? "light" : "dark"))
          }
        >
          {themeMode === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </aside>
  );
}
