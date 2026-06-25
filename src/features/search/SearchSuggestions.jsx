"use client";

export default function SearchSuggestions({ suggestions, onSelect }) {
  if (!suggestions.length) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2 font-mono text-xs font-medium leading-none tracking-[0.05em]">
      <span className="mr-2 py-1 text-[#747878]">Suggestions:</span>
      {suggestions.map((suggestion) => (
        <button
          className="border border-[#c4c7c7] px-3 py-1 text-[#444748] transition-colors hover:bg-[#f5f3f3] hover:text-black"
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          type="button"
        >
          &quot;{suggestion}&quot;
        </button>
      ))}
    </div>
  );
}

