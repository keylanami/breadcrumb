"use client";

import { useEffect, useMemo, useState } from "react";
import SearchInput from "@/features/search/SearchInput";
import SearchResultSection from "@/features/search/SearchResultSection";
import SearchSuggestions from "@/features/search/SearchSuggestions";
import {
  hasSearchResults,
  selectSearchResults,
  selectSearchSuggestions,
} from "@/features/search/searchSelectors";
import { useAppStore } from "@/store/appStore";

export default function SearchPage() {
  const refreshAll = useAppStore((state) => state.refreshAll);
  const activities = useAppStore((state) => state.activities);
  const decisions = useAppStore((state) => state.decisions);
  const memories = useAppStore((state) => state.memories);
  const routines = useAppStore((state) => state.routines);
  const [query, setQuery] = useState("");
  const searchState = useMemo(
    () => ({ activities, decisions, memories, routines }),
    [activities, decisions, memories, routines],
  );
  const results = useMemo(
    () => selectSearchResults(searchState, query),
    [searchState, query],
  );
  const suggestions = useMemo(
    () => selectSearchSuggestions(searchState),
    [searchState],
  );
  const hasQuery = query.trim().length > 0;
  const hasResults = hasSearchResults(results);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-[720px] flex-col items-center py-4">
      <header className="mb-12 w-full text-center">
        <h1 className="mb-4 font-serif text-4xl font-semibold leading-[1.2] tracking-[-0.01em] text-black md:text-5xl">
          SEARCH
        </h1>
        <p className="font-sans text-lg leading-[1.6] text-[#444748]">
          Find anything you&apos;ve ever captured.
        </p>
      </header>

      <section className="relative mb-16 w-full">
        <SearchInput query={query} onQueryChange={setQuery} />
        <SearchSuggestions suggestions={suggestions} onSelect={setQuery} />
      </section>

      <div className="w-full space-y-12">
        {hasQuery && hasResults ? (
          <>
            <SearchResultSection type="activities" results={results.activities} />
            <SearchResultSection type="decisions" results={results.decisions} />
            <SearchResultSection type="memories" results={results.memories} />
            <SearchResultSection type="routines" results={results.routines} />
          </>
        ) : null}

        {hasQuery && !hasResults ? (
          <p className="border border-[#c4c7c7] bg-white p-6 text-center font-sans text-base leading-6 text-[#5d5f5d]">
            No results found.
          </p>
        ) : null}
      </div>
    </div>
  );
}

