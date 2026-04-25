import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AgencyGapCardData, CapabilityGapSignal } from "@/types/gap";

const MOCK_GAPS: CapabilityGapSignal[] = [
  {
    capability_cluster_id: "c-uas",
    capability_label: "Counter-UAS passive RF fusion",
    demand_score: 88,
    supply_score: 41,
    gap_score: 72,
    top_opportunity_count: 26,
    top_company_count: 9,
    agency: "DOD",
  },
  {
    capability_cluster_id: "quantum-sensing",
    capability_label: "Quantum sensing for substation-scale anomalies",
    demand_score: 76,
    supply_score: 38,
    gap_score: 68,
    top_opportunity_count: 14,
    top_company_count: 6,
    agency: "DOE",
  },
  {
    capability_cluster_id: "trusted-ai",
    capability_label: "Trusted AI assurance for mission software",
    demand_score: 81,
    supply_score: 52,
    gap_score: 61,
    top_opportunity_count: 31,
    top_company_count: 17,
    agency: "DOD",
  },
  {
    capability_cluster_id: "hypersonics",
    capability_label: "Hypersonic TPS rapid test correlation",
    demand_score: 69,
    supply_score: 48,
    gap_score: 55,
    top_opportunity_count: 12,
    top_company_count: 8,
    agency: "NASA",
  },
  {
    capability_cluster_id: "space-ss",
    capability_label: "Commercial SSA data fusion",
    demand_score: 62,
    supply_score: 44,
    gap_score: 49,
    top_opportunity_count: 9,
    top_company_count: 11,
    agency: "USSF",
  },
];

const MOCK_AGENCY_GAPS: AgencyGapCardData[] = [
  {
    agency: "Department of the Air Force",
    weak_supplier_clusters: ["Counter-UAS passive RF fusion", "Trusted AI assurance"],
    narrative:
      "High SAM volume on contested sensing topics with a thin tail of repeat Phase II performers.",
    gap_index: 0.71,
  },
  {
    agency: "NASA",
    weak_supplier_clusters: ["Hypersonic TPS rapid test correlation"],
    narrative:
      "Strong materials science base but limited digitally integrated test correlation suppliers.",
    gap_index: 0.54,
  },
];

export type GapSignalsQueryArgs = { agency?: string | null };

export const gapsApi = createApi({
  reducerPath: "gapsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["GapSignals", "AgencyGaps"],
  endpoints: (builder) => ({
    getGapSignals: builder.query<CapabilityGapSignal[], GapSignalsQueryArgs>({
      queryFn: async (args) => {
        await new Promise((r) => setTimeout(r, 260));
        let data = [...MOCK_GAPS];
        if (args.agency) {
          const a = args.agency.toUpperCase();
          data = data.filter((g) => (g.agency ?? "").toUpperCase().includes(a) || a === "DOD");
        }
        data.sort((x, y) => y.gap_score - x.gap_score);
        return { data };
      },
      providesTags: [{ type: "GapSignals", id: "LIST" }],
    }),
    getAgencyGapCards: builder.query<AgencyGapCardData[], GapSignalsQueryArgs>({
      queryFn: async (args) => {
        await new Promise((r) => setTimeout(r, 200));
        let rows = [...MOCK_AGENCY_GAPS];
        if (args.agency) {
          rows = rows.filter((r) =>
            r.agency.toLowerCase().includes(args.agency!.toLowerCase()),
          );
        }
        return { data: rows.length ? rows : MOCK_AGENCY_GAPS };
      },
      providesTags: [{ type: "AgencyGaps", id: "LIST" }],
    }),
  }),
});

export const { useGetGapSignalsQuery, useGetAgencyGapCardsQuery } = gapsApi;
