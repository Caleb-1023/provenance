import type { AgencyGapCardData } from "@/types/gap";

export function AgencyGapCard({ data }: { data: AgencyGapCardData }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="text-sm font-semibold text-gray-900 dark:text-white">{data.agency}</div>
      <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">{data.narrative}</div>
      <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Weak supplier clusters
      </div>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-gray-700 dark:text-gray-200">
        {data.weak_supplier_clusters.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Gap index:{" "}
        <span className="font-mono text-gray-900 dark:text-white">
          {data.gap_index.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
