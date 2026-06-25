"use client";

import { useMemo } from "react";
import { appStoreSelectors, useAppStore } from "@/store/appStore";

function toDate(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value.toDate === "function") {
    return value.toDate();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatCreatedDate(value) {
  const date = toDate(value);

  if (!date) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function excerpt(memory) {
  const content = memory.content || memory.note || "";

  if (!content) {
    return "No memory details.";
  }

  return content.length > 120 ? `${content.slice(0, 117)}...` : content;
}

export default function RecentMemories() {
  const memories = useAppStore((state) => state.memories);
  const recentMemories = useMemo(
    () => appStoreSelectors.recentMemories({ memories }),
    [memories],
  );

  return (
    <section className="mb-12">
      <h2 className="mb-6 font-mono text-xs font-medium uppercase leading-none tracking-widest text-black">
        Recent Memories
      </h2>

      {recentMemories.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {recentMemories.map((memory, index) => (
            <div
              className={`flex min-h-[120px] flex-col justify-between border border-[#c4c7c7] bg-white p-6 ${
                index === 2 ? "md:col-span-2" : ""
              }`}
              key={memory.id}
            >
              <div>
                <h3 className="mb-2 font-sans text-base font-medium leading-6 text-black">
                  {memory.title || "Untitled memory"}
                </h3>
                <p className="line-clamp-3 font-sans text-base leading-6 text-black">
                  {excerpt(memory)}
                </p>
              </div>
              <div className="mt-4 text-right font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#5d5f5d]">
                {formatCreatedDate(memory.createdAt)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="border border-[#c4c7c7] bg-white p-4 font-sans text-base leading-6 text-[#5d5f5d]">
          No memories yet.
        </p>
      )}
    </section>
  );
}
