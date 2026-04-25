import { MATURITY_LABELS } from "@/lib/constants";
import type { MaturityStage } from "@/types/shared";

const styles: Record<MaturityStage, string> = {
  research_only: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
  award_backed: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  procurement_emerging:
    "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  procurement_active:
    "bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-200",
};

export function MaturityBadge({ stage }: { stage: MaturityStage }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[stage]}`}
    >
      {MATURITY_LABELS[stage]}
    </span>
  );
}
