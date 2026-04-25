export interface CapabilityGapSignal {
  capability_cluster_id: string;
  capability_label: string;
  demand_score: number;
  supply_score: number;
  gap_score: number;
  top_opportunity_count: number;
  top_company_count: number;
  agency?: string;
}

export interface AgencyGapCardData {
  agency: string;
  weak_supplier_clusters: string[];
  narrative: string;
  gap_index: number;
}
