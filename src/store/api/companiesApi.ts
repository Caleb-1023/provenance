import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CapabilityProfile, Company } from "@/types/company";

const MOCK_COMPANIES: Company[] = [
  {
    company_id: "co-aurora",
    company_name: "Aurora Edge Systems, Inc.",
    state: "CO",
    employee_count: 42,
    website: "https://example.com/aurora-edge",
    top_agencies: ["USAF", "DARPA", "Navy"],
    phase_breakdown: { phase1: 4, phase2: 3, phase2plus: 1 },
    ai_summary:
      "Aurora Edge couples low-SWAP passive RF front-ends with on-vehicle fusion models trained on contested logistics telemetry; SBIR narratives emphasize fieldable inference under spectrum denial.",
    capabilities: [
      {
        capability_cluster_id: "c-uas",
        capability_label: "Counter-UAS passive sensing",
        strength: "very_strong",
        capability_strength_score: 91,
        award_count: 6,
        total_award_amount: 4_200_000,
        supporting_award_ids: ["FA8650-23-C-1204", "FA8650-22-C-0911", "N68335-21-C-0401"],
        supporting_topic_ids: ["topic-af-8812", "topic-navy-4421"],
        evidence_summary:
          "Multiple Phase II awards cite distributed RF mesh trials with operational units.",
      },
      {
        capability_cluster_id: "trusted-ai",
        capability_label: "Trusted AI at the tactical edge",
        strength: "strong",
        capability_strength_score: 78,
        award_count: 3,
        total_award_amount: 1_850_000,
        supporting_award_ids: ["FA8750-23-C-0102"],
        supporting_topic_ids: ["topic-darpa-ax"],
        evidence_summary:
          "Explainability and assurance work packages appear across two AFRL topics.",
      },
      {
        capability_cluster_id: "space-ss",
        capability_label: "Space situational awareness adjunct",
        strength: "adjacent",
        capability_strength_score: 52,
        award_count: 1,
        total_award_amount: 225_000,
        supporting_award_ids: ["FA9453-20-C-0110"],
        supporting_topic_ids: [],
        evidence_summary: "Single Phase I with limited on-orbit validation claims.",
      },
    ],
  },
  {
    company_id: "co-helio",
    company_name: "HelioSpectra Labs",
    state: "CA",
    employee_count: 28,
    website: "https://example.com/helio",
    top_agencies: ["NASA", "Navy", "USAF"],
    phase_breakdown: { phase1: 5, phase2: 2, phase2plus: 0 },
    ai_summary:
      "HelioSpectra focuses on stabilized micro-gimbal EO/IR stacks with embedded change detection; NASA SBIR dominates but DoD Phase I extensions reference logistics corridor monitoring.",
    capabilities: [
      {
        capability_cluster_id: "eo-ir",
        capability_label: "EO/IR micro-gimbal analytics",
        strength: "strong",
        capability_strength_score: 80,
        award_count: 4,
        total_award_amount: 2_100_000,
        supporting_award_ids: ["NNX22CA45C", "80NSSC23P0123"],
        supporting_topic_ids: ["topic-af-8812"],
        evidence_summary:
          "Abstracts highlight convoy overwatch and pier-side perimeter monitoring pilots.",
      },
    ],
  },
  {
    company_id: "co-river",
    company_name: "Riverstone Autonomy",
    state: "TX",
    employee_count: 55,
    website: "https://example.com/riverstone",
    top_agencies: ["Army", "DARPA"],
    phase_breakdown: { phase1: 3, phase2: 4, phase2plus: 2 },
    ai_summary:
      "Riverstone delivers swarm coordination layers with formal safety monitors; strongest evidence in ground robotics with growing airborne demos.",
    capabilities: [
      {
        capability_cluster_id: "swarm",
        capability_label: "Swarm coordination & safety monitors",
        strength: "moderate",
        capability_strength_score: 66,
        award_count: 5,
        total_award_amount: 3_300_000,
        supporting_award_ids: ["W911QY-21-C-0044"],
        supporting_topic_ids: ["topic-darpa-ax"],
        evidence_summary:
          "SBIR technical volumes emphasize interoperable autonomy buses over sensing stacks.",
      },
    ],
  },
  {
    company_id: "co-ceramic",
    company_name: "CeramicSky Materials LLC",
    state: "OH",
    employee_count: 19,
    website: "https://example.com/ceramic",
    top_agencies: ["NASA", "USAF"],
    phase_breakdown: { phase1: 2, phase2: 2, phase2plus: 0 },
    ai_summary:
      "CeramicSky develops CMC TPS coupons with rapid digital twin correlation; NASA wind tunnel partners cited across Phase II reporting.",
    capabilities: [
      {
        capability_cluster_id: "hypersonics",
        capability_label: "Hypersonic TPS materials",
        strength: "very_strong",
        capability_strength_score: 93,
        award_count: 4,
        total_award_amount: 3_900_000,
        supporting_award_ids: ["80NSSC22C0123", "FA8650-24-C-0300"],
        supporting_topic_ids: ["topic-nasa-tps"],
        evidence_summary:
          "Award abstracts reference arc jet campaigns and digital twin calibration loops.",
      },
    ],
  },
  {
    company_id: "co-lattice",
    company_name: "LatticeField Technologies",
    state: "MA",
    employee_count: 33,
    website: "https://example.com/lattice",
    top_agencies: ["DOE", "NSF"],
    phase_breakdown: { phase1: 6, phase2: 1, phase2plus: 0 },
    ai_summary:
      "LatticeField packages NV-center magnetometry for substation-scale anomaly detection; strongest in lab demonstrations with nascent field trials.",
    capabilities: [
      {
        capability_cluster_id: "quantum",
        capability_label: "Quantum-enhanced grid sensing",
        strength: "moderate",
        capability_strength_score: 69,
        award_count: 3,
        total_award_amount: 1_200_000,
        supporting_award_ids: ["DE-SC0024123"],
        supporting_topic_ids: ["topic-doe-q"],
        evidence_summary:
          "Phase I metrics emphasize sensitivity gains; deployment logistics still emerging.",
      },
    ],
  },
];

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Company", "CompanyCapabilities"],
  endpoints: (builder) => ({
    getCompanyById: builder.query<Company, string>({
      queryFn: async (id) => {
        await new Promise((r) => setTimeout(r, 240));
        const found = MOCK_COMPANIES.find((c) => c.company_id === id);
        if (!found) return { error: { status: 404, data: "Not found" } };
        return { data: found };
      },
      providesTags: (_r, _e, id) => [{ type: "Company", id }],
    }),
    getCompanyCapabilities: builder.query<CapabilityProfile[], string>({
      queryFn: async (id) => {
        await new Promise((r) => setTimeout(r, 180));
        const found = MOCK_COMPANIES.find((c) => c.company_id === id);
        if (!found) return { error: { status: 404, data: "Not found" } };
        return { data: found.capabilities };
      },
      providesTags: (_r, _e, id) => [{ type: "CompanyCapabilities", id }],
    }),
    searchCompanies: builder.query<Company[], string>({
      queryFn: async (query) => {
        await new Promise((r) => setTimeout(r, 200));
        const q = query.trim().toLowerCase();
        const data = MOCK_COMPANIES.filter(
          (c) =>
            !q ||
            c.company_name.toLowerCase().includes(q) ||
            c.company_id.toLowerCase().includes(q),
        );
        return { data };
      },
    }),
  }),
});

export const {
  useGetCompanyByIdQuery,
  useGetCompanyCapabilitiesQuery,
  useSearchCompaniesQuery,
} = companiesApi;
