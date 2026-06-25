"use client";

export default function SearchInput({ query, onQueryChange }) {
  return (
    <div className="relative flex w-full items-center">
      <span
        aria-hidden="true"
        className="absolute left-4 font-mono text-xs font-medium text-[#747878]"
      >
        ?
      </span>
      <input
        autoComplete="off"
        autoFocus
        className="w-full border-0 border-b border-[#c4c7c7] bg-transparent py-4 pl-12 pr-4 font-sans text-base leading-6 text-[#1b1c1c] outline-none transition-all duration-200 focus:border-b-2 focus:border-black"
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search memories, decisions, activities..."
        type="text"
        value={query}
      />
    </div>
  );
}

