function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

export default function SearchResultCard({ result }) {
  return (
    <article className="group block border border-[#c4c7c7] bg-[#fbf9f9] p-4 transition-colors hover:border-black">
      <div className="mb-2 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-block border border-[#c4c7c7] px-2 py-1 font-mono text-[10px] uppercase text-[#5d5f5d]">
            {result.typeLabel}
          </div>
          <h3 className="font-sans text-base leading-6 text-black decoration-1 underline-offset-4 group-hover:underline">
            {result.title || "Untitled"}
          </h3>
        </div>
        {result.date ? (
          <span className="shrink-0 font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#747878]">
            {formatDate(result.date)}
          </span>
        ) : null}
      </div>
      <p className="line-clamp-2 font-sans text-sm leading-6 text-[#444748]">
        {result.excerpt || "No additional details."}
      </p>
    </article>
  );
}

