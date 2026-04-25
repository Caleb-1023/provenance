import Link from "next/link";

export function AwardChips({
  companyId,
  awardIds,
}: {
  companyId: string;
  awardIds: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {awardIds.map((id) => (
        <Link
          key={id}
          href={`/companies/${companyId}?highlight=${encodeURIComponent(id)}`}
          className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-900 dark:text-blue-400 dark:hover:border-blue-700 dark:hover:bg-gray-800"
        >
          {id}
        </Link>
      ))}
    </div>
  );
}
