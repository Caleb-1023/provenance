import type { CapabilityGapSignal } from "@/types/gap";
import { MatchScoreBar } from "@/components/shared/MatchScoreBar";

export function GapScoreRow({ row }: { row: CapabilityGapSignal }) {
  return (
    <div className="grid grid-cols-1 items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 md:grid-cols-12 dark:border-gray-700 dark:bg-gray-800">
      <div className="md:col-span-3">
        <div className="text-sm font-semibold text-gray-900 dark:text-white">
          {row.capability_label}
        </div>
        {row.agency ? (
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{row.agency}</div>
        ) : null}
      </div>
      <div className="md:col-span-3">
        <MatchScoreBar score={row.demand_score} label="Demand" />
      </div>
      <div className="md:col-span-3">
        <MatchScoreBar score={row.supply_score} label="Supply" />
      </div>
      <div className="md:col-span-3">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-2 dark:border-amber-900 dark:bg-amber-950/40">
          <div className="text-xs font-semibold text-amber-900 dark:text-amber-200">Gap score</div>
          <div className="font-mono text-xl font-bold text-amber-950 dark:text-amber-100">
            {row.gap_score}
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Top opportunities: {row.top_opportunity_count} · Companies: {row.top_company_count}
        </div>
      </div>
    </div>
  );
}
