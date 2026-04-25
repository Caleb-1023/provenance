"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAgency,
  setCapabilityCluster,
  setPhase,
  setYear,
} from "@/store/slices/filtersSlice";
import type { PhaseFilter } from "@/store/slices/filtersSlice";
import {
  AGENCY_FILTER_OPTIONS,
  CLUSTER_FILTER_OPTIONS,
  PHASE_FILTER_OPTIONS,
} from "@/lib/constants";

export type FilterBarVariant = "full" | "agencyOnly";

export function FilterBar({ variant = "full" }: { variant?: FilterBarVariant }) {
  const dispatch = useAppDispatch();
  const { agency, phase, year, capabilityCluster } = useAppSelector((s) => s.filters);

  const agencyOnly = variant === "agencyOnly";

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <label className="flex flex-col gap-1 text-xs font-medium text-gray-600 dark:text-gray-300">
        Agency
        <select
          value={agency ?? ""}
          onChange={(e) => dispatch(setAgency(e.target.value || null))}
          className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        >
          {AGENCY_FILTER_OPTIONS.map((o) => (
            <option key={o.value || "all"} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      {!agencyOnly ? (
        <>
          <label className="flex flex-col gap-1 text-xs font-medium text-gray-600 dark:text-gray-300">
            Phase
            <select
              value={phase}
              onChange={(e) => dispatch(setPhase(e.target.value as PhaseFilter))}
              className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            >
              {PHASE_FILTER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-gray-600 dark:text-gray-300">
            Year
            <select
              value={year ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                dispatch(setYear(v ? Number(v) : null));
              }}
              className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            >
              <option value="">Any</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-gray-600 dark:text-gray-300">
            Capability cluster
            <select
              value={capabilityCluster ?? ""}
              onChange={(e) =>
                dispatch(setCapabilityCluster(e.target.value || null))
              }
              className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            >
              {CLUSTER_FILTER_OPTIONS.map((o) => (
                <option key={o.value || "all"} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </>
      ) : null}
    </div>
  );
}
