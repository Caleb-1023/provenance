import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Opportunity } from "@/types/opportunity";
import type { CompanyMatch } from "@/types/shared";

/**
 * Mock `queryFn` responses today. For production, replace `fakeBaseQuery()` with
 * `fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000" })`
 * (see `src/lib/apiBase.ts`).
 */

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    opportunity_id: "opp-001",
    notice_id: "SAM-2025-88421",
    agency: "Department of the Air Force",
    office: "AFWERX",
    posted_date: "2025-04-02",
    response_date: "2025-05-15",
    title:
      "Open Topic: Autonomous sensing fusion for contested logistics corridors",
    description:
      "Seeks dual-use technologies that fuse passive RF, EO/IR, and onboard analytics to detect and classify low-signature threats along expeditionary supply routes.",
    capability_themes: [
      { theme_id: "th-c-uas", label: "Counter-UAS sensing", relevance_score: 0.91 },
      {
        theme_id: "th-trusted-ai",
        label: "Trusted AI at the edge",
        relevance_score: 0.84,
      },
      {
        theme_id: "th-space-ss",
        label: "Space situational awareness",
        relevance_score: 0.62,
      },
    ],
    top_topic_matches: [
      {
        topic_id: "topic-af-8812",
        title: "AFRL SBIR 24.2 — Contested sensing & autonomy",
        match_score: 88,
        maturity_stage: "procurement_active",
        synopsis:
          "Active Phase II cohort with multiple field exercises tied to mobility wings.",
      },
      {
        topic_id: "topic-navy-4421",
        title: "Navy STTR — Passive RF cueing for small UAS",
        match_score: 76,
        maturity_stage: "procurement_emerging",
        synopsis:
          "Emerging transition pathway with recent CSO awards in the ISR portfolio.",
      },
      {
        topic_id: "topic-darpa-ax",
        title: "DARPA AX — Collaborative autonomy stack",
        match_score: 71,
        maturity_stage: "award_backed",
        synopsis: "Strong publication trail and SBIR awards, limited procurement hooks.",
      },
    ],
    top_company_matches: [
      {
        company_id: "co-aurora",
        company_name: "Aurora Edge Systems, Inc.",
        match_score: 86,
        match_confidence: 0.82,
        capability_label: "Passive RF mesh + edge inference",
        explanation_facts:
          "Three Phase II awards cite distributed RF fusion; PI cited in recent AFWERX pitch days.",
        supporting_award_ids: ["FA8650-23-C-1204", "FA8650-22-C-0911"],
        supporting_topic_ids: ["topic-af-8812", "topic-navy-4421"],
      },
      {
        company_id: "co-helio",
        company_name: "HelioSpectra Labs",
        match_score: 74,
        match_confidence: 0.71,
        capability_label: "EO/IR micro-gimbal analytics",
        explanation_facts:
          "Portfolio skews NASA SBIR but includes two DoD Phase I extensions on logistics ISR.",
        supporting_award_ids: ["NNX22CA45C", "80NSSC23P0123"],
        supporting_topic_ids: ["topic-af-8812"],
      },
      {
        company_id: "co-river",
        company_name: "Riverstone Autonomy",
        match_score: 63,
        match_confidence: 0.64,
        capability_label: "Swarm coordination & safety monitors",
        explanation_facts:
          "Adjacent autonomy stack; limited direct RF sensing evidence in SBIR abstracts.",
        supporting_award_ids: ["W911QY-21-C-0044"],
        supporting_topic_ids: ["topic-darpa-ax"],
      },
    ],
    coverage_strength: "strong",
  },
  {
    opportunity_id: "opp-002",
    notice_id: "SAM-2025-77102",
    agency: "NASA",
    office: "Langley Research Center",
    posted_date: "2025-03-18",
    response_date: "2025-04-30",
    title: "SBIR Phase I: Lightweight thermal protection materials for hypersonic test articles",
    description:
      "Calls for innovative TPS concepts compatible with rapid ground test cycles and digital twin validation.",
    capability_themes: [
      {
        theme_id: "th-hypersonics",
        label: "Hypersonics & thermal protection",
        relevance_score: 0.95,
      },
      { theme_id: "th-digital-twin", label: "Digital twin validation", relevance_score: 0.7 },
    ],
    top_topic_matches: [
      {
        topic_id: "topic-nasa-tps",
        title: "NASA SBIR 24.1 — Hypersonic TPS maturation",
        match_score: 92,
        maturity_stage: "award_backed",
        synopsis: "Award-backed portfolio with wind tunnel partners but limited DoD procurement.",
      },
    ],
    top_company_matches: [
      {
        company_id: "co-ceramic",
        company_name: "CeramicSky Materials LLC",
        match_score: 81,
        match_confidence: 0.79,
        capability_label: "Ceramic matrix composites for TPS",
        explanation_facts:
          "Two NASA Phase II awards and one USAF Phase I on high-Mach thermal cycling.",
        supporting_award_ids: ["80NSSC22C0123", "FA8650-24-C-0300"],
        supporting_topic_ids: ["topic-nasa-tps"],
      },
    ],
    coverage_strength: "weak",
  },
  {
    opportunity_id: "opp-003",
    notice_id: "SAM-2025-66001",
    agency: "Department of Energy",
    office: "ARPA-E",
    posted_date: "2025-02-10",
    response_date: "2025-04-01",
    title: "OPEN 2025: Grid-scale quantum-enhanced sensors for anomaly detection",
    description:
      "Explores quantum sensing modalities that can be fielded within existing substation infrastructure.",
    capability_themes: [
      {
        theme_id: "th-quantum",
        label: "Quantum sensing for infrastructure",
        relevance_score: 0.89,
      },
    ],
    top_topic_matches: [
      {
        topic_id: "topic-doe-q",
        title: "DOE SBIR — Quantum sensors for grid resilience",
        match_score: 85,
        maturity_stage: "research_only",
        synopsis: "Early-stage topic with strong lab partnerships and few awards to date.",
      },
    ],
    top_company_matches: [
      {
        company_id: "co-lattice",
        company_name: "LatticeField Technologies",
        match_score: 68,
        match_confidence: 0.66,
        capability_label: "NV-center magnetometry packaging",
        explanation_facts:
          "Phase I awards across DOE and NSF; limited operational utility demonstrations.",
        supporting_award_ids: ["DE-SC0024123"],
        supporting_topic_ids: ["topic-doe-q"],
      },
    ],
    coverage_strength: "moderate",
  },
];

export type OpportunitiesQueryArgs = {
  agency?: string | null;
  cluster?: string | null;
  phase?: string | null;
  year?: number | null;
  search?: string | null;
};

function agencyMatchesFilter(agencyFilter: string, opportunityAgency: string): boolean {
  const o = opportunityAgency.toLowerCase();
  switch (agencyFilter.toUpperCase()) {
    case "DOD":
      return o.includes("defense") || o.includes("air force") || o.includes("army") || o.includes("navy");
    case "NASA":
      return o.includes("nasa");
    case "DOE":
      return o.includes("energy");
    case "HHS":
      return o.includes("health");
    case "USAF":
      return o.includes("air force");
    default:
      return true;
  }
}

function clusterMatches(cluster: string, o: Opportunity): boolean {
  const c = cluster.toLowerCase();
  return o.capability_themes.some((t) => {
    const id = t.theme_id.toLowerCase();
    const label = t.label.toLowerCase();
    if (c === "c-uas" || c.includes("uas")) return id.includes("uas") || label.includes("uas");
    if (c.includes("space")) return id.includes("space") || label.includes("space");
    if (c.includes("hyperson")) return id.includes("hyperson") || label.includes("hyperson");
    if (c.includes("quantum")) return id.includes("quantum") || label.includes("quantum");
    if (c.includes("trusted") || c.includes("ai"))
      return id.includes("trusted") || label.includes("trusted") || label.includes("ai");
    return id.includes(c) || label.toLowerCase().includes(c);
  });
}

function filterOpportunities(args: OpportunitiesQueryArgs): Opportunity[] {
  return MOCK_OPPORTUNITIES.filter((o) => {
    if (args.agency && !agencyMatchesFilter(args.agency, o.agency)) return false;
    if (args.cluster && !clusterMatches(args.cluster, o)) return false;
    if (args.search) {
      const q = args.search.toLowerCase();
      if (
        !o.title.toLowerCase().includes(q) &&
        !o.description.toLowerCase().includes(q) &&
        !o.notice_id.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });
}

export const opportunitiesApi = createApi({
  reducerPath: "opportunitiesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Opportunity", "OpportunityMatches"],
  endpoints: (builder) => ({
    getOpportunities: builder.query<Opportunity[], OpportunitiesQueryArgs>({
      queryFn: async (args) => {
        await new Promise((r) => setTimeout(r, 280));
        const data = filterOpportunities(args);
        return { data };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((o) => ({ type: "Opportunity" as const, id: o.opportunity_id })),
              { type: "Opportunity", id: "LIST" },
            ]
          : [{ type: "Opportunity", id: "LIST" }],
    }),
    getOpportunityById: builder.query<Opportunity, string>({
      queryFn: async (id) => {
        await new Promise((r) => setTimeout(r, 220));
        const found = MOCK_OPPORTUNITIES.find((o) => o.opportunity_id === id);
        if (!found) return { error: { status: 404, data: "Not found" } };
        return { data: found };
      },
      providesTags: (_r, _e, id) => [{ type: "Opportunity", id }],
    }),
    getOpportunityMatches: builder.query<CompanyMatch[], string>({
      queryFn: async (id) => {
        await new Promise((r) => setTimeout(r, 200));
        const found = MOCK_OPPORTUNITIES.find((o) => o.opportunity_id === id);
        if (!found) return { error: { status: 404, data: "Not found" } };
        return { data: found.top_company_matches };
      },
      providesTags: (_r, _e, id) => [{ type: "OpportunityMatches", id }],
    }),
  }),
});

export const {
  useGetOpportunitiesQuery,
  useGetOpportunityByIdQuery,
  useGetOpportunityMatchesQuery,
} = opportunitiesApi;
