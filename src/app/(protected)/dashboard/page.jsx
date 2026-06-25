"use client";

import { useEffect, useMemo } from "react";
import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import AsciiDivider from "@/components/layout/AsciiDivider";
import DashboardSnapshotGrid from "@/features/dashboard/DashboardSnapshotGrid";
import DueMaintenance from "@/features/dashboard/DueMaintenance";
import RecentDecisions from "@/features/dashboard/RecentDecisions";
import RecentMemories from "@/features/dashboard/RecentMemories";
import { timelineSelectors } from "@/features/timeline/timelineSelectors";
import { useAppStore } from "@/store/appStore";

export default function DashboardPage() {
  const refreshAll = useAppStore((state) => state.refreshAll);
  const activities = useAppStore((state) => state.activities);
  const decisions = useAppStore((state) => state.decisions);
  const memories = useAppStore((state) => state.memories);
  const routines = useAppStore((state) => state.routines);
  const recentTimelineEvents = useMemo(
    () =>
      timelineSelectors.recentTimelineEvents({
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

  return (
    <div data-timeline-event-count={recentTimelineEvents.length}>
      <section className="mb-12">
        <DashboardGreeting />
        <p className="mt-2 font-sans text-base leading-6 text-[#5d5f5d]">
          A snapshot of your life today.
        </p>
      </section>

      <DashboardSnapshotGrid />

      <AsciiDivider />
      <RecentDecisions />

      <AsciiDivider />
      <DueMaintenance />

      <AsciiDivider />
      <RecentMemories />
    </div>
  );
}
