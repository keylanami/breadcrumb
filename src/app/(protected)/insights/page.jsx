"use client";

import { useEffect, useMemo } from "react";
import AsciiDivider from "@/components/layout/AsciiDivider";
import InsightObservationCard from "@/features/insights/InsightObservationCard";
import InsightSection from "@/features/insights/InsightSection";
import InsightStat from "@/features/insights/InsightStat";
import InsightTagRow from "@/features/insights/InsightTagRow";
import InsightTopicList from "@/features/insights/InsightTopicList";
import { selectInsightsSummary } from "@/features/insights/insightsSelectors";
import { useAppStore } from "@/store/appStore";

function formatConfidence(value) {
  if (value === null || value === undefined) {
    return "N/A";
  }

  return value.toFixed(1);
}

function decisionTitle(decision) {
  return decision?.title || "N/A";
}

export default function InsightsPage() {
  const refreshAll = useAppStore((state) => state.refreshAll);
  const activities = useAppStore((state) => state.activities);
  const decisions = useAppStore((state) => state.decisions);
  const memories = useAppStore((state) => state.memories);
  const routines = useAppStore((state) => state.routines);
  const insights = useMemo(
    () =>
      selectInsightsSummary({
        activities,
        decisions,
        memories,
        routines,
      }),
    [activities, decisions, memories, routines],
  );

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  if (!insights.hasInsights) {
    return (
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-16 py-4 md:gap-24">
        <header className="text-center">
          <h1 className="mb-4 font-serif text-4xl font-semibold leading-[1.2] tracking-[-0.01em] text-black md:text-5xl">
            INSIGHTS
          </h1>
          <p className="font-serif text-2xl font-medium italic leading-[1.3] text-[#444748]">
            Patterns hidden in your daily life.
          </p>
        </header>
        <AsciiDivider />
        <p className="border border-[#c4c7c7] bg-white p-8 text-center font-sans text-base leading-6 text-[#5d5f5d]">
          No insights available yet.
        </p>
      </div>
    );
  }

  const {
    activityInsights,
    decisionInsights,
    routineInsights,
    memoryInsights,
    observations,
  } = insights;

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col gap-16 py-4 md:gap-24">
      <header className="text-center">
        <h1 className="mb-4 font-serif text-4xl font-semibold leading-[1.2] tracking-[-0.01em] text-black md:text-5xl">
          INSIGHTS
        </h1>
        <p className="font-serif text-2xl font-medium italic leading-[1.3] text-[#444748]">
          Patterns hidden in your daily life.
        </p>
      </header>

      <AsciiDivider />

      <InsightSection icon="A" title="Activity Insights">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <InsightStat
            label="Total Activities"
            value={activityInsights.totalActivities}
          />
          <InsightStat
            compact
            label="Most Active Category"
            value={activityInsights.mostCommonCategory || "N/A"}
          />
          <InsightStat
            compact
            label="Tracked Categories"
            value={activityInsights.categoryCounts.length}
          />
        </div>
        {activityInsights.categoryCounts.length ? (
          <div className="flex flex-col gap-3">
            <span className="border-b border-[#c4c7c7] pb-2 font-mono text-xs font-medium uppercase leading-none tracking-widest text-[#5d5f5d]">
              Activity Count By Category
            </span>
            <InsightTopicList items={activityInsights.categoryCounts} />
          </div>
        ) : null}
      </InsightSection>

      <AsciiDivider />

      <InsightSection icon="D" title="Decision Insights">
        <div className="mb-4 grid grid-cols-2 gap-8 md:grid-cols-3">
          <InsightStat
            bordered
            label="Total Decisions"
            value={decisionInsights.totalDecisions}
          />
          <InsightStat
            bordered
            label="Avg Confidence"
            value={formatConfidence(decisionInsights.averageConfidence)}
          />
          <InsightStat
            bordered
            label="Highest Confidence"
            value={
              decisionInsights.highestConfidenceValue === null
                ? "N/A"
                : decisionInsights.highestConfidenceValue
            }
          />
        </div>
        {decisionInsights.highestConfidenceDecision ? (
          <InsightObservationCard
            observation={`Highest confidence decision: ${decisionTitle(
              decisionInsights.highestConfidenceDecision,
            )}.`}
          />
        ) : null}
      </InsightSection>

      <AsciiDivider />

      <InsightSection icon="R" title="Routine Insights">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <span className="border-b border-[#c4c7c7] pb-2 font-mono text-xs font-medium uppercase leading-none tracking-widest text-[#5d5f5d]">
              Total Routines
            </span>
            <div className="flex items-center justify-between font-sans text-lg leading-[1.6] text-black">
              <span>{routineInsights.totalRoutines}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="border-b border-[#c4c7c7] pb-2 font-mono text-xs font-medium uppercase leading-none tracking-widest text-[#5d5f5d]">
              Overdue Routines
            </span>
            <div className="flex items-center gap-2 font-sans text-lg leading-[1.6] text-black">
              <span className="font-bold">
                {routineInsights.overdueRoutinesCount}
              </span>
              <span className="text-[#444748]">pending actions</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:col-span-2">
            <span className="border-b border-[#c4c7c7] pb-2 font-mono text-xs font-medium uppercase leading-none tracking-widest text-[#5d5f5d]">
              Completion Information
            </span>
            <div className="font-sans text-lg leading-[1.6] text-black">
              {routineInsights.completedRoutinesCount
                ? `${routineInsights.completedRoutinesCount} routine${
                    routineInsights.completedRoutinesCount === 1 ? "" : "s"
                  } include completion or last-performed information.`
                : "No completion information available yet."}
            </div>
          </div>
        </div>
      </InsightSection>

      <AsciiDivider />

      <InsightSection icon="M" title="Memory Insights">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-xs font-medium uppercase leading-none tracking-widest text-[#5d5f5d]">
              Most Used Tags
            </span>
            <div className="flex flex-col gap-4">
              {memoryInsights.mostCommonTags.length ? (
                memoryInsights.mostCommonTags
                  .slice(0, 5)
                  .map((tag) => (
                    <InsightTagRow
                      count={tag.count}
                      key={tag.label}
                      label={tag.label}
                    />
                  ))
              ) : (
                <p className="font-sans text-base leading-6 text-[#5d5f5d]">
                  No memory tags available yet.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span className="font-mono text-xs font-medium uppercase leading-none tracking-widest text-[#5d5f5d]">
              Memory Summary
            </span>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="select-none text-[#5d5f5d]">-</span>
                <span className="font-sans text-lg leading-[1.6] text-black">
                  {memoryInsights.totalMemories} total memories
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="select-none text-[#5d5f5d]">-</span>
                <span className="font-sans text-lg leading-[1.6] text-black">
                  {memoryInsights.recentMemoryCount} captured in the last 30 days
                </span>
              </li>
            </ul>
          </div>
        </div>
      </InsightSection>

      {observations.length ? (
        <>
          <AsciiDivider />
          <InsightSection icon="O" title="Observations">
            <div className="grid grid-cols-1 gap-6">
              {observations.map((observation) => (
                <InsightObservationCard
                  key={observation}
                  observation={observation}
                />
              ))}
            </div>
          </InsightSection>
        </>
      ) : null}
    </div>
  );
}
