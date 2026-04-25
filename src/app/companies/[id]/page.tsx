"use client";

import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useGetCompanyByIdQuery } from "@/store/api/companiesApi";
import { AISummary } from "@/components/company/AISummary";
import { CapabilityThemeList } from "@/components/company/CapabilityThemeList";
import { PhaseBreakdown } from "@/components/company/PhaseBreakdown";
import { AgencyDistribution } from "@/components/company/AgencyDistribution";
import { ListSkeleton } from "@/components/shared/ListSkeleton";

function CompanyDetailInner() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const highlight = searchParams.get("highlight");
  const id = params.id;

  const { data, isLoading } = useGetCompanyByIdQuery(id ?? "", { skip: !id });

  if (!id) return null;

  if (isLoading) {
    return <ListSkeleton rows={3} />;
  }

  if (!data) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm dark:border-gray-700 dark:bg-gray-800">
        Company not found in the mock catalog.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {data.company_name}
            </h1>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {data.state} · {data.employee_count} employees
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {data.website}
            </div>
          </div>
          <div className="text-right text-xs text-gray-500 dark:text-gray-400">
            Highlighted award
            <div className="mt-1 font-mono text-sm text-gray-900 dark:text-white">
              {highlight ?? "—"}
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-900/40">
          <AISummary text={data.ai_summary} />
        </div>
      </section>

      <div>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Capability themes
        </h2>
        <CapabilityThemeList companyId={data.company_id} profiles={data.capabilities} />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <PhaseBreakdown breakdown={data.phase_breakdown} />
        <AgencyDistribution agencies={data.top_agencies} />
      </div>
    </div>
  );
}

export default function CompanyDetailPage() {
  return (
    <Suspense fallback={<ListSkeleton rows={3} />}>
      <CompanyDetailInner />
    </Suspense>
  );
}
