import type { CapabilityTheme } from "@/types/shared";

export function CapabilityThemeTags({ themes }: { themes: CapabilityTheme[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((t) => (
        <span
          key={t.theme_id}
          className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        >
          {t.label}
          <span className="ml-1 font-mono text-[10px] text-gray-500 dark:text-gray-400">
            {(t.relevance_score * 100).toFixed(0)}%
          </span>
        </span>
      ))}
    </div>
  );
}
