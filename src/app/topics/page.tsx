import Link from "next/link";

const TOPIC_IDS = [
  "topic-af-8812",
  "topic-navy-4421",
  "topic-darpa-ax",
  "topic-nasa-tps",
  "topic-doe-q",
];

export default function TopicsIndexPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Topics</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          SBIR topic cards with transition signals (mock index).
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {TOPIC_IDS.map((id) => (
          <Link
            key={id}
            href={`/topics/${id}`}
            className="rounded-xl border border-gray-200 bg-white p-4 text-sm font-mono text-blue-600 transition hover:border-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-blue-400 dark:hover:border-blue-600"
          >
            {id}
          </Link>
        ))}
      </div>
    </div>
  );
}
