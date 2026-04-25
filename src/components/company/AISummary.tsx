function AiGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="text-blue-500"
      aria-hidden
    >
      <path
        d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function AISummary({ text }: { text: string }) {
  return (
    <div className="relative ml-1 border-l-2 border-blue-500/40 pl-4">
      <div className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
        <AiGlyph />
        <span>AI capability summary</span>
      </div>
      <p className="text-sm italic leading-relaxed text-gray-700 dark:text-gray-200">{text}</p>
    </div>
  );
}
