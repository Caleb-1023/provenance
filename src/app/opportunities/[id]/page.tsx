"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useGetOpportunityByIdQuery,
  useGetOpportunityMatchesQuery,
} from "@/store/api/opportunitiesApi";
import { CapabilityThemeTags } from "@/components/opportunity/CapabilityThemeTags";
import { CompanyMatchRow } from "@/components/opportunity/CompanyMatchRow";
import { WeakCoverageAlert } from "@/components/opportunity/WeakCoverageAlert";
import { MaturityBadge } from "@/components/shared/MaturityBadge";
import { ListSkeleton } from "@/components/shared/ListSkeleton";

export default function OpportunityDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const oppQuery = useGetOpportunityByIdQuery(id, { skip: !id });
  const matchesQuery = useGetOpportunityMatchesQuery(id, { skip: !id });

  const loading = oppQuery.isLoading || matchesQuery.isLoading;
  const o = oppQuery.data;
  const matches = matchesQuery.data;

  if (!id) return null;

  if (loading) {
    return (
      <div className="space-y-4">
        <ListSkeleton rows={3} />
      </div>
    );
  }

  if (!o) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm dark:border-gray-700 dark:bg-gray-800">
        Opportunity not found in the mock catalog.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="rounded-full bg-blue-500/10 px-2 py-0.5 font-medium text-blue-700 dark:text-blue-300">
            Posted {o.posted_date}
          </span>
          <span>{o.notice_id}</span>
        </div>
        <h1 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">{o.title}</h1>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {o.agency} · {o.office}
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Response due {o.response_date}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
          {o.description}
        </p>
        <div className="mt-4">
          <CapabilityThemeTags themes={o.capability_themes} />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          {o.coverage_strength === "weak" ? <WeakCoverageAlert /> : null}
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Ranked company matches
          </div>
          <div className="space-y-3">
            {(matches ?? o.top_company_matches).map((m) => (
              <CompanyMatchRow key={m.company_id} match={m} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Top SBIR topic alignment
            </div>
            <div className="mt-3 space-y-3">
              {o.top_topic_matches.map((t) => (
                <Link
                  key={t.topic_id}
                  href={`/topics/${t.topic_id}`}
                  className="block rounded-lg border border-gray-100 p-3 transition hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-600"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {t.title}
                    </div>
                    <MaturityBadge stage={t.maturity_stage} />
                  </div>
                  <div className="mt-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                    {t.topic_id}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                    {t.synopsis}
                  </p>
                  <div className="mt-2 text-xs font-semibold text-gray-800 dark:text-gray-100">
                    Match score: {t.match_score}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
