"use client";

import { useMemo } from "react";
import { appStoreSelectors, useAppStore } from "@/store/appStore";

function formatReviewDate(value) {
  const date = toDate(value);

  if (!date) {
    return "No review date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

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

function confidenceLabel(confidence) {
  if (confidence === undefined || confidence === null || confidence === "") {
    return "Not set";
  }

  return `${confidence}/10`;
}

export default function RecentDecisions() {
  const decisions = useAppStore((state) => state.decisions);
  const recentDecisions = useMemo(
    () => appStoreSelectors.recentDecisions({ decisions }),
    [decisions],
  );

  return (
    <section className="mb-12">
      <h2 className="mb-6 font-mono text-xs font-medium uppercase leading-none tracking-widest text-black">
        Recent Decisions
      </h2>

      {recentDecisions.length ? (
        <div className="space-y-4">
          {recentDecisions.map((decision) => (
            <div
              className="group flex flex-col justify-between gap-4 border border-[#c4c7c7] bg-white p-4 transition-colors hover:border-black sm:flex-row sm:items-center"
              key={decision.id}
            >
              <div>
                <div className="mb-1 font-sans text-base font-medium leading-6 text-black">
                  {decision.title || "Untitled decision"}
                </div>
                <div className="font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#5d5f5d]">
                  Review: {formatReviewDate(decision.reviewDate)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#5d5f5d]">
                  Confidence:
                </span>
                <div className="border border-[#c4c7c7] bg-[#fbf9f9] px-2 py-1 font-mono text-xs font-medium leading-none tracking-[0.05em] text-black">
                  {confidenceLabel(decision.confidence)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="border border-[#c4c7c7] bg-white p-4 font-sans text-base leading-6 text-[#5d5f5d]">
          No decisions yet.
        </p>
      )}
    </section>
  );
}
