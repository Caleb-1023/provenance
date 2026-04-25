export function WeakCoverageAlert() {
  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
      <div className="font-semibold">Weak supplier coverage</div>
      <p className="mt-1 text-xs leading-relaxed text-amber-900/90 dark:text-amber-100/90">
        Few high-confidence SBIR performers map to this opportunity&apos;s capability
        themes. Consider broadening cluster filters or reviewing adjacent topics.
      </p>
    </div>
  );
}
