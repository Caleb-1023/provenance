import Link from "next/link";

export function EvidenceChips({
  awardIds,
  topicIds,
  companyId,
}: {
  awardIds: string[];
  topicIds: string[];
  companyId: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {awardIds.map((id) => (
        <Link
          key={`a-${id}`}
          href={`/companies/${companyId}?highlight=${encodeURIComponent(id)}`}
          className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-900 dark:text-blue-400 dark:hover:border-blue-700 dark:hover:bg-gray-800"
        >
          {id}
        </Link>
      ))}
      {topicIds.map((id) => (
        <Link
          key={`t-${id}`}
          href={`/topics/${id}`}
          className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-900 dark:text-blue-400 dark:hover:border-blue-700 dark:hover:bg-gray-800"
        >
          {id}
        </Link>
      ))}
    </div>
  );
}
