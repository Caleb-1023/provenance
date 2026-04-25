import type { CapabilityTheme, CompanyMatch, TopicMatch } from "@/types/shared";

export type CoverageStrength = "strong" | "moderate" | "weak";

export interface Opportunity {
  opportunity_id: string;
  notice_id: string;
  agency: string;
  office: string;
  posted_date: string;
  response_date: string;
  title: string;
  description: string;
  capability_themes: CapabilityTheme[];
  top_topic_matches: TopicMatch[];
  top_company_matches: CompanyMatch[];
  coverage_strength: CoverageStrength;
}
