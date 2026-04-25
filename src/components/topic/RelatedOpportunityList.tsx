import Link from "next/link";
import type { RelatedSamOpportunity } from "@/types/topic";
import { MatchScoreBar } from "@/components/shared/MatchScoreBar";

export function RelatedOpportunityList({ items }: { items: RelatedSamOpportunity[] }) {
  if (!items.length) {
    return (
      <p className="text-xs text-gray-500 dark:text-gray-400">
        No live SAM opportunities linked for this topic in the mock dataset.
      </p>
    );
  }
  return (
    <div className="space-y-3">
      {items.map((o) => (
        <Link
          key={o.opportunity_id}
          href={`/opportunities/${o.opportunity_id}`}
          className="block rounded-xl border border-gray-200 bg-white p-3 transition hover:border-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
        >
          <div className="text-xs text-gray-500 dark:text-gray-400">{o.agency}</div>
          <div className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{o.title}</div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Posted {o.posted_date}
          </div>
          <div className="mt-3">
            <MatchScoreBar score={Math.round(o.relevance_score * 100)} label="Relevance" />
          </div>
        </Link>
      ))}
    </div>
  );
}
