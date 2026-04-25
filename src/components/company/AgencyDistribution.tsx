export function AgencyDistribution({ agencies }: { agencies: string[] }) {
  const total = agencies.length || 1;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Agency mix
      </div>
      <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-900">
        {agencies.map((a, i) => (
          <div
            key={a}
            title={a}
            className="bg-blue-500/80"
            style={{ width: `${100 / total}%`, opacity: 0.35 + (0.65 * (i + 1)) / total }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {agencies.map((a) => (
          <span
            key={a}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-900 dark:text-gray-100"
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}
