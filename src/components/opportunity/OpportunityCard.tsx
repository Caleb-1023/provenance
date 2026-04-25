import Link from "next/link";
import type { Opportunity } from "@/types/opportunity";
import { MatchScoreBar } from "@/components/shared/MatchScoreBar";

export function OpportunityCard({ o }: { o: Opportunity }) {
  const topScore =
    o.top_company_matches[0]?.match_score ??
    o.top_topic_matches[0]?.match_score ??
    0;

  return (
    <Link
      href={`/opportunities/${o.opportunity_id}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
    >
      <div className="flex flex-col gap-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">{o.notice_id}</div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{o.title}</h3>
        <div className="text-xs text-gray-600 dark:text-gray-300">
          {o.agency} · {o.office}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Posted {o.posted_date} · Due {o.response_date}
        </div>
        <MatchScoreBar score={topScore} label="Best match score" />
      </div>
    </Link>
  );
}
