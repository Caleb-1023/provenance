export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-3 h-4 w-3/4 max-w-xl rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-2 h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-4 h-2 w-full rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
}
