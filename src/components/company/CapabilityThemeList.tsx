import type { CapabilityProfile } from "@/types/company";
import { MatchScoreBar } from "@/components/shared/MatchScoreBar";
import { StrengthLabel } from "@/components/company/StrengthLabel";
import { AwardChips } from "@/components/company/AwardChips";

export function CapabilityThemeList({
  companyId,
  profiles,
}: {
  companyId: string;
  profiles: CapabilityProfile[];
}) {
  return (
    <div className="space-y-3">
      {profiles.map((p) => (
        <div
          key={p.capability_cluster_id}
          className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {p.capability_label}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {p.award_count} awards · ${(p.total_award_amount / 1_000_000).toFixed(2)}M
                funded
              </div>
            </div>
            <StrengthLabel strength={p.strength} />
          </div>
          <div className="mt-3">
            <MatchScoreBar score={p.capability_strength_score} label="Strength score" />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
            {p.evidence_summary}
          </p>
          <div className="mt-3">
            <AwardChips companyId={companyId} awardIds={p.supporting_award_ids} />
          </div>
        </div>
      ))}
    </div>
  );
}
