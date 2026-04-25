"use client";

import { useParams } from "next/navigation";
import {
  useGetRelatedOpportunitiesForTopicQuery,
  useGetTopicByIdQuery,
  useGetTopicTransitionQuery,
} from "@/store/api/topicsApi";
import { MaturityBadge } from "@/components/shared/MaturityBadge";
import { TransitionStageCard } from "@/components/topic/TransitionStageCard";
import { RelatedOpportunityList } from "@/components/topic/RelatedOpportunityList";
import { ListSkeleton } from "@/components/shared/ListSkeleton";

export default function TopicDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const topicQ = useGetTopicByIdQuery(id ?? "", { skip: !id });
  const transitionQ = useGetTopicTransitionQuery(id ?? "", { skip: !id });
  const relatedQ = useGetRelatedOpportunitiesForTopicQuery(id ?? "", { skip: !id });

  if (!id) return null;

  if (topicQ.isLoading || transitionQ.isLoading) {
    return <ListSkeleton rows={4} />;
  }

  const topic = topicQ.data;
  const transition = transitionQ.data;

  if (!topic || !transition) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm dark:border-gray-700 dark:bg-gray-800">
        Topic not found in the mock catalog.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-wrap items-center gap-2">
          <MaturityBadge stage={topic.maturity_stage} />
          <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
            {topic.topic_id}
          </span>
        </div>
        <h1 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">{topic.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
          {topic.description}
        </p>
        <div className="mt-4 grid gap-3 text-xs text-gray-600 dark:text-gray-300 sm:grid-cols-3">
          <div>
            <div className="text-gray-500 dark:text-gray-400">Active companies</div>
            <div className="font-mono text-sm text-gray-900 dark:text-white">
              {topic.active_company_count}
            </div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400">Award funding (mock)</div>
            <div className="font-mono text-sm text-gray-900 dark:text-white">
              ${(topic.total_award_funding / 1_000_000).toFixed(1)}M
            </div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400">Primary agencies</div>
            <div className="text-sm text-gray-900 dark:text-white">
              {topic.primary_agencies.join(", ")}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Transition signal
        </h2>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">{transition.recommended_action}</p>
        <div className="mt-4 space-y-2">
          {transition.stages.map((s) => (
            <TransitionStageCard key={s.stage} stage={s} />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Live SAM opportunities (mock)
        </h2>
        <div className="mt-3">
          {relatedQ.isLoading ? (
            <ListSkeleton rows={2} />
          ) : (
            <RelatedOpportunityList items={relatedQ.data ?? []} />
          )}
        </div>
      </section>
    </div>
  );
}
