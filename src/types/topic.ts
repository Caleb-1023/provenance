import type { MaturityStage } from "@/types/shared";

export interface Topic {
  topic_id: string;
  title: string;
  description: string;
  maturity_stage: MaturityStage;
  total_award_funding: number;
  active_company_count: number;
  primary_agencies: string[];
}

export interface TransitionStageCount {
  stage: MaturityStage;
  count: number;
  label: string;
}

export interface TopicTransitionSignal {
  topic_id: string;
  title: string;
  stages: TransitionStageCount[];
  recommended_action: string;
}

export interface RelatedSamOpportunity {
  opportunity_id: string;
  title: string;
  agency: string;
  posted_date: string;
  relevance_score: number;
}
