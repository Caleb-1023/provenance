import { SCORE_THRESHOLDS } from "@/lib/constants";

function band(score: number): "weak" | "mid" | "strong" {
  if (score < 40) return "weak";
  if (score <= SCORE_THRESHOLDS.midMax) return "mid";
  return "strong";
}

export function MatchScoreBar({
  score,
  label,
}: {
  score: number;
  label?: string;
}) {
  const b = band(score);
  const fill =
    b === "weak"
      ? "bg-gradient-to-r from-red-600 to-red-400"
      : b === "mid"
        ? "bg-gradient-to-r from-amber-600 to-amber-400"
        : "bg-gradient-to-r from-green-600 to-green-400";
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <div className="w-full">
      {label ? (
        <div className="mb-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{label}</span>
          <span className="font-mono text-gray-800 dark:text-gray-100">{clamped}</span>
        </div>
      ) : null}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <div
          className={`h-full rounded-full transition-all ${fill}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
