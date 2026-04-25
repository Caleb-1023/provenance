export function PhaseBreakdown({
  breakdown,
}: {
  breakdown: { phase1: number; phase2: number; phase2plus: number };
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        SBIR phase mix
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {breakdown.phase1}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Phase I</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {breakdown.phase2}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Phase II</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {breakdown.phase2plus}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Phase II+</div>
        </div>
      </div>
    </div>
  );
}
