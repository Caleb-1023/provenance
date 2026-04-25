export function ExplanationBlock({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm leading-relaxed text-gray-700 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200">
      {text}
    </div>
  );
}
