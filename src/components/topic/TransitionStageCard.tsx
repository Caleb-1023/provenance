import { MaturityBadge } from "@/components/shared/MaturityBadge";
import type { TransitionStageCount } from "@/types/topic";

export function TransitionStageCard({ stage }: { stage: TransitionStageCount }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <MaturityBadge stage={stage.stage} />
        <span className="text-xs text-gray-600 dark:text-gray-300">{stage.label}</span>
      </div>
      <div className="font-mono text-sm text-gray-900 dark:text-white">{stage.count}</div>
    </div>
  );
}
