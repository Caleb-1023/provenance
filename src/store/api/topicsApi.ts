import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RelatedSamOpportunity, Topic, TopicTransitionSignal } from "@/types/topic";

const MOCK_TOPICS: Topic[] = [
  {
    topic_id: "topic-af-8812",
    title: "AFRL SBIR 24.2 — Contested sensing & autonomy",
    description:
      "Seeks layered sensing and autonomy stacks resilient to spectrum contest and intermittent cloud reach-back.",
    maturity_stage: "procurement_active",
    total_award_funding: 18_500_000,
    active_company_count: 14,
    primary_agencies: ["USAF", "AFRL", "AFWERX"],
  },
  {
    topic_id: "topic-navy-4421",
    title: "Navy STTR — Passive RF cueing for small UAS",
    description:
      "Focuses on passive RF cueing fused with shipboard EW data to cue kinetic and non-kinetic defeat.",
    maturity_stage: "procurement_emerging",
    total_award_funding: 6_200_000,
    active_company_count: 9,
    primary_agencies: ["Navy", "ONR"],
  },
  {
    topic_id: "topic-darpa-ax",
    title: "DARPA AX — Collaborative autonomy stack",
    description:
      "Explores heterogeneous autonomy agents with shared safety certificates across domains.",
    maturity_stage: "award_backed",
    total_award_funding: 22_000_000,
    active_company_count: 21,
    primary_agencies: ["DARPA"],
  },
  {
    topic_id: "topic-nasa-tps",
    title: "NASA SBIR 24.1 — Hypersonic TPS maturation",
    description:
      "Targets lightweight TPS concepts validated through arc jet and model-scale hypersonic tunnels.",
    maturity_stage: "award_backed",
    total_award_funding: 9_800_000,
    active_company_count: 11,
    primary_agencies: ["NASA"],
  },
  {
    topic_id: "topic-doe-q",
    title: "DOE SBIR — Quantum sensors for grid resilience",
    description:
      "Quantum-enhanced magnetometry and gradient sensing for anomaly detection in distribution networks.",
    maturity_stage: "research_only",
    total_award_funding: 1_400_000,
    active_company_count: 6,
    primary_agencies: ["DOE", "ARPA-E"],
  },
];

const MOCK_TRANSITIONS: Record<string, TopicTransitionSignal> = {
  "topic-af-8812": {
    topic_id: "topic-af-8812",
    title: "AFRL SBIR 24.2 — Contested sensing & autonomy",
    stages: [
      { stage: "research_only", count: 6, label: "Exploratory awards" },
      { stage: "award_backed", count: 11, label: "Maturing performers" },
      { stage: "procurement_emerging", count: 5, label: "CSO / OTAs emerging" },
      { stage: "procurement_active", count: 4, label: "Active program hooks" },
    ],
    recommended_action:
      "Prioritize performers with live integration events in the next two fiscal quarters.",
  },
  "topic-navy-4421": {
    topic_id: "topic-navy-4421",
    title: "Navy STTR — Passive RF cueing for small UAS",
    stages: [
      { stage: "research_only", count: 4, label: "Exploratory awards" },
      { stage: "award_backed", count: 7, label: "Maturing performers" },
      { stage: "procurement_emerging", count: 3, label: "CSO / OTAs emerging" },
      { stage: "procurement_active", count: 1, label: "Active program hooks" },
    ],
    recommended_action:
      "Watchlist for cross-deck opportunities with USMC Littoral Regiment experiments.",
  },
};

const MOCK_RELATED_OPPS: Record<string, RelatedSamOpportunity[]> = {
  "topic-af-8812": [
    {
      opportunity_id: "opp-001",
      title: "Open Topic: Autonomous sensing fusion for contested logistics corridors",
      agency: "Department of the Air Force",
      posted_date: "2025-04-02",
      relevance_score: 0.91,
    },
  ],
  "topic-nasa-tps": [
    {
      opportunity_id: "opp-002",
      title: "SBIR Phase I: Lightweight thermal protection materials for hypersonic test articles",
      agency: "NASA",
      posted_date: "2025-03-18",
      relevance_score: 0.94,
    },
  ],
};

export const topicsApi = createApi({
  reducerPath: "topicsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Topic", "TopicTransition"],
  endpoints: (builder) => ({
    getTopicById: builder.query<Topic, string>({
      queryFn: async (id) => {
        await new Promise((r) => setTimeout(r, 230));
        const found = MOCK_TOPICS.find((t) => t.topic_id === id);
        if (!found) return { error: { status: 404, data: "Not found" } };
        return { data: found };
      },
      providesTags: (_r, _e, id) => [{ type: "Topic", id }],
    }),
    getTopicTransition: builder.query<TopicTransitionSignal, string>({
      queryFn: async (id) => {
        await new Promise((r) => setTimeout(r, 210));
        const topic = MOCK_TOPICS.find((t) => t.topic_id === id);
        if (!topic) return { error: { status: 404, data: "Not found" } };
        const signal =
          MOCK_TRANSITIONS[id] ??
          ({
            topic_id: id,
            title: topic.title,
            stages: [
              { stage: "research_only", count: 3, label: "Exploratory awards" },
              { stage: "award_backed", count: 5, label: "Maturing performers" },
              { stage: "procurement_emerging", count: 2, label: "CSO / OTAs emerging" },
              { stage: "procurement_active", count: 1, label: "Active program hooks" },
            ],
            recommended_action: "Monitor performer pipeline for upcoming Phase II options.",
          } satisfies TopicTransitionSignal);
        return { data: signal };
      },
      providesTags: (_r, _e, id) => [{ type: "TopicTransition", id }],
    }),
    getRelatedOpportunitiesForTopic: builder.query<RelatedSamOpportunity[], string>({
      queryFn: async (id) => {
        await new Promise((r) => setTimeout(r, 160));
        return { data: MOCK_RELATED_OPPS[id] ?? [] };
      },
    }),
  }),
});

export const {
  useGetTopicByIdQuery,
  useGetTopicTransitionQuery,
  useGetRelatedOpportunitiesForTopicQuery,
} = topicsApi;
