"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery } from "@/store/slices/filtersSlice";
import { toggleSidebar } from "@/store/slices/uiSlice";

export function TopBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((s) => s.filters.searchQuery);
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);
  const [local, setLocal] = useState(searchQuery);

  useEffect(() => {
    setLocal(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (local !== searchQuery) dispatch(setSearchQuery(local));
    }, 300);
    return () => window.clearTimeout(t);
  }, [dispatch, local, searchQuery]);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-gray-200 bg-gray-50/95 px-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
      {!sidebarOpen && (
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-300"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Open sidebar"
        >
          Menu
        </button>
      )}
      <div className="relative flex-1">
        <input
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder="Search opportunities, notices, descriptions…"
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <span className="pointer-events-none absolute left-3 top-2.5 text-gray-400">⌕</span>
      </div>
    </header>
  );
}
