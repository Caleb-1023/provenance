"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { useGetAgencyGapCardsQuery, useGetGapSignalsQuery } from "@/store/api/gapsApi";
import { FilterBar } from "@/components/shared/FilterBar";
import { GapScoreRow } from "@/components/gap/GapScoreRow";
import { AgencyGapCard } from "@/components/gap/AgencyGapCard";
import { ListSkeleton } from "@/components/shared/ListSkeleton";

export default function GapsPage() {
  const agency = useAppSelector((s) => s.filters.agency);
  const args = useMemo(() => ({ agency }), [agency]);

  const gapsQ = useGetGapSignalsQuery(args);
  const agencyQ = useGetAgencyGapCardsQuery(args);

  const loading = gapsQ.isLoading || agencyQ.isLoading;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Capability gaps
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Demand vs SBIR supply concentration by capability cluster.
        </p>
      </div>
      <FilterBar variant="agencyOnly" />
      {loading ? (
        <ListSkeleton rows={5} />
      ) : (
        <>
          <div className="grid gap-3 md:grid-cols-2">
            {agencyQ.data?.map((a) => (
              <AgencyGapCard key={a.agency} data={a} />
            ))}
          </div>
          <div className="space-y-3">
            {gapsQ.data?.map((row) => (
              <GapScoreRow key={row.capability_cluster_id} row={row} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
