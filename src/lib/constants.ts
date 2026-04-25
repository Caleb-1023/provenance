import type { MaturityStage } from "@/types/shared";

export const MATURITY_LABELS: Record<MaturityStage, string> = {
  research_only: "Research only",
  award_backed: "Award backed",
  procurement_emerging: "Procurement emerging",
  procurement_active: "Procurement active",
};

export const STRENGTH_LABELS: Record<
  "very_strong" | "strong" | "moderate" | "adjacent" | "weak",
  string
> = {
  very_strong: "Very strong",
  strong: "Strong",
  moderate: "Moderate",
  adjacent: "Adjacent",
  weak: "Weak",
};

export const AGENCY_FILTER_OPTIONS = [
  { value: "", label: "All agencies" },
  { value: "DOD", label: "Department of Defense" },
  { value: "NASA", label: "NASA" },
  { value: "HHS", label: "Health & Human Services" },
  { value: "DOE", label: "Department of Energy" },
  { value: "USAF", label: "U.S. Air Force" },
];

export const CLUSTER_FILTER_OPTIONS = [
  { value: "", label: "All clusters" },
  { value: "c-uas", label: "Counter-UAS" },
  { value: "space-situational", label: "Space situational awareness" },
  { value: "hypersonics", label: "Hypersonics & thermal protection" },
  { value: "quantum-sensing", label: "Quantum sensing" },
  { value: "trusted-ai", label: "Trusted AI for mission systems" },
];

export const PHASE_FILTER_OPTIONS: {
  value: "all" | "phase1" | "phase2" | "phase2plus";
  label: string;
}[] = [
  { value: "all", label: "All phases" },
  { value: "phase1", label: "Phase I" },
  { value: "phase2", label: "Phase II" },
  { value: "phase2plus", label: "Phase II+" },
];

export const SCORE_THRESHOLDS = {
  weakMax: 39,
  midMax: 69,
  strongMin: 70,
} as const;
