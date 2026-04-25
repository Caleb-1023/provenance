"use client";

import { useState } from "react";
import Link from "next/link";
import type { CompanyMatch } from "@/types/shared";
import { MatchScoreBar } from "@/components/shared/MatchScoreBar";
import { EvidenceChips } from "@/components/shared/EvidenceChips";
import { ExplanationBlock } from "@/components/shared/ExplanationBlock";

export function CompanyMatchRow({ match }: { match: CompanyMatch }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 p-4 text-left"
      >
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/companies/${match.company_id}`}
              className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
              onClick={(e) => e.stopPropagation()}
            >
              {match.company_name}
            </Link>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {(match.match_confidence * 100).toFixed(0)}% confidence
            </span>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">
            {match.capability_label}
          </div>
          <MatchScoreBar score={match.match_score} />
        </div>
        <span className="text-xs text-gray-400">{open ? "▾" : "▸"}</span>
      </button>
      {open ? (
        <div className="space-y-3 border-t border-gray-100 p-4 dark:border-gray-700">
          <ExplanationBlock text={match.explanation_facts} />
          <EvidenceChips
            awardIds={match.supporting_award_ids}
            topicIds={match.supporting_topic_ids}
            companyId={match.company_id}
          />
        </div>
      ) : null}
    </div>
  );
}
