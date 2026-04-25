"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { useGetOpportunitiesQuery } from "@/store/api/opportunitiesApi";
import { FilterBar } from "@/components/shared/FilterBar";
import { OpportunityCard } from "@/components/opportunity/OpportunityCard";
import { ListSkeleton } from "@/components/shared/ListSkeleton";

export default function OpportunitiesPage() {
  const filters = useAppSelector((s) => s.filters);
  const queryArgs = useMemo(
    () => ({
      agency: filters.agency,
      cluster: filters.capabilityCluster,
      phase: filters.phase === "all" ? null : filters.phase,
      year: filters.year,
      search: filters.searchQuery || null,
    }),
    [
      filters.agency,
      filters.capabilityCluster,
      filters.phase,
      filters.year,
      filters.searchQuery,
    ],
  );

  const { rows, isLoading, isFetching } = useGetOpportunitiesQuery(queryArgs, {
    selectFromResult: ({ data, isLoading, isFetching }) => ({
      rows: data,
      isLoading,
      isFetching,
    }),
  });

  const showSkeleton = isLoading || (isFetching && !rows?.length);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Opportunities
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          SAM.gov notices matched to SBIR capability themes and performers.
        </p>
      </div>
      <FilterBar variant="full" />
      {showSkeleton ? (
        <ListSkeleton rows={5} />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {rows?.map((o) => <OpportunityCard key={o.opportunity_id} o={o} />)}
        </div>
      )}
    </div>
  );
}
