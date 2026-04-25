export type MaturityStage =
  | "research_only"
  | "award_backed"
  | "procurement_emerging"
  | "procurement_active";

export interface CompanyMatch {
  company_id: string;
  company_name: string;
  match_score: number;
  match_confidence: number;
  capability_label: string;
  explanation_facts: string;
  supporting_award_ids: string[];
  supporting_topic_ids: string[];
}

export interface CapabilityTheme {
  theme_id: string;
  label: string;
  relevance_score: number;
}

export interface TopicMatch {
  topic_id: string;
  title: string;
  match_score: number;
  maturity_stage: MaturityStage;
  synopsis: string;
}

export interface EvidenceRef {
  id: string;
  kind: "award" | "topic";
}
