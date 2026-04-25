import { STRENGTH_LABELS } from "@/lib/constants";
import type { CapabilityProfile } from "@/types/company";

const tone: Record<CapabilityProfile["strength"], string> = {
  very_strong: "text-green-700 dark:text-green-400",
  strong: "text-green-600 dark:text-green-300",
  moderate: "text-amber-700 dark:text-amber-300",
  adjacent: "text-gray-600 dark:text-gray-300",
  weak: "text-red-600 dark:text-red-400",
};

export function StrengthLabel({ strength }: { strength: CapabilityProfile["strength"] }) {
  return (
    <span className={`text-xs font-semibold uppercase tracking-wide ${tone[strength]}`}>
      {STRENGTH_LABELS[strength]}
    </span>
  );
}
