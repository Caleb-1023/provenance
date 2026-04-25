export interface CapabilityProfile {
  capability_cluster_id: string;
  capability_label: string;
  strength: "very_strong" | "strong" | "moderate" | "adjacent" | "weak";
  capability_strength_score: number;
  award_count: number;
  total_award_amount: number;
  supporting_award_ids: string[];
  supporting_topic_ids: string[];
  evidence_summary: string;
}

export interface Company {
  company_id: string;
  company_name: string;
  state: string;
  employee_count: number;
  website: string;
  capabilities: CapabilityProfile[];
  top_agencies: string[];
  phase_breakdown: { phase1: number; phase2: number; phase2plus: number };
  ai_summary: string;
}
