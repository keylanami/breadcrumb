import SearchResultCard from "@/features/search/SearchResultCard";

const SECTION_META = {
  activities: {
    icon: "A",
    label: "Activities",
  },
  decisions: {
    icon: "D",
    label: "Decisions",
  },
  memories: {
    icon: "M",
    label: "Memories",
  },
  routines: {
    icon: "R",
    label: "Routines",
  },
};

export default function SearchResultSection({ type, results }) {
  if (!results.length) {
    return null;
  }

  const meta = SECTION_META[type];

  return (
    <section>
      <div className="mb-4 flex items-center font-mono text-xs font-medium uppercase leading-none tracking-widest text-[#444748]">
        <span className="mr-2 text-sm">{meta.icon}</span>
        {meta.label}
        <div className="ml-4 flex-grow border-t border-dashed border-[#c4c7c7]" />
      </div>
      <div className="space-y-4">
        {results.map((result) => (
          <SearchResultCard key={result.id} result={result} />
        ))}
      </div>
    </section>
  );
}

